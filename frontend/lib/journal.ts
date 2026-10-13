import "server-only";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import type { Feeling } from "@/lib/feelings";
import type { MeditationId } from "@/lib/meditations";
import { createClient } from "@/lib/supabase/server";

export type JournalEntry = {
  id: string;
  meditation_id: MeditationId;
  minutes: number;
  feeling: Feeling;
  note: string | null;
  created_at: string;
};

export type JournalData = {
  entries: JournalEntry[];
  /** Days in a row with at least one session, ending today or yesterday. */
  streak: number;
  /** Monday to Sunday of this week: did the user do a session that day? */
  week: boolean[];
  /** Today's date key, e.g. "2026-10-14". */
  today: string;
  /** False when the journal table has not been created in Supabase yet. */
  ready: boolean;
};

/**
 * Days are counted in India time, so the server and the browser agree on
 * what "today" is. Most MediAI users are in India.
 */
const TIME_ZONE = "Asia/Kolkata";

export function dayKey(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
}

export function addDays(key: string, days: number): string {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** "Today", "Yesterday", "Wednesday" or "12 Oct". */
export function dayLabel(createdAt: string, today: string): string {
  const key = dayKey(new Date(createdAt));
  if (key === today) return "Today";
  if (key === addDays(today, -1)) return "Yesterday";
  const date = new Date(`${key}T00:00:00Z`);
  if (key > addDays(today, -7)) {
    return date.toLocaleDateString("en-IN", { weekday: "long", timeZone: "UTC" });
  }
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
}

/** The signed-in user's journal. Reads cookies, so call it inside <Suspense>. */
export const getJournal = cache(async (): Promise<JournalData> => {
  await getCurrentUser();
  const supabase = await createClient();
  const today = dayKey(new Date());

  // Row-level security limits this to the signed-in user's own rows.
  const { data, error } = await supabase
    .from("journal_entries")
    .select("id, meditation_id, minutes, feeling, note, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("Could not load journal entries:", error.message);
    return { entries: [], streak: 0, week: Array(7).fill(false), today, ready: false };
  }

  const entries = data as JournalEntry[];
  const days = new Set(entries.map((e) => dayKey(new Date(e.created_at))));

  // A streak stays alive until the end of today, so start from yesterday
  // if there is no session yet today.
  let streak = 0;
  let day = days.has(today) ? today : addDays(today, -1);
  while (days.has(day)) {
    streak += 1;
    day = addDays(day, -1);
  }

  const weekday = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7; // Monday = 0
  const monday = addDays(today, -weekday);
  const week = Array.from({ length: 7 }, (_, i) => days.has(addDays(monday, i)));

  return { entries, streak, week, today, ready: true };
});
