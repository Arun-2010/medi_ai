"use server";

import { FEELINGS, NOTE_MAX, type Feeling } from "@/lib/feelings";
import { findMeditation, type MeditationId } from "@/lib/meditations";
import { createClient } from "@/lib/supabase/server";

export type SaveResult = { ok: true } | { ok: false; reason: "signin" | "invalid" | "failed" };

export async function saveJournalEntry(input: {
  meditationId: MeditationId;
  minutes: number;
  feeling: Feeling;
  note: string;
}): Promise<SaveResult> {
  // Never trust the browser: check the session and every field again here.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, reason: "signin" };

  const note = input.note.trim().slice(0, NOTE_MAX);
  const minutes = Math.round(input.minutes);
  if (
    !findMeditation(input.meditationId) ||
    !FEELINGS.some((f) => f.id === input.feeling) ||
    !(minutes >= 1 && minutes <= 60)
  ) {
    return { ok: false, reason: "invalid" };
  }

  const { error } = await supabase.from("journal_entries").insert({
    user_id: user.id,
    meditation_id: input.meditationId,
    minutes,
    feeling: input.feeling,
    note: note || null,
  });

  if (error) {
    console.error("Could not save journal entry:", error.message);
    return { ok: false, reason: "failed" };
  }
  return { ok: true };
}
