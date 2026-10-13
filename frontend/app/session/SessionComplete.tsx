"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HelplineNote } from "@/components/HelplineNote";
import { CheckIcon } from "@/components/Icons";
import { WellnessNote } from "@/components/WellnessNote";
import { showsDistress } from "@/lib/checkin";
import { FEELINGS, NOTE_MAX, type Feeling } from "@/lib/feelings";
import type { Mood } from "@/lib/moods";
import { saveJournalEntry } from "./actions";

const ERRORS = {
  invalid: "Something went wrong. Please try again.",
  failed: "We could not save this right now. Please try again.",
};

export function SessionComplete({ mood, seconds }: { mood: Mood; seconds: number }) {
  const router = useRouter();
  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [needsHelp, setNeedsHelp] = useState(false);
  const [saving, startSaving] = useTransition();

  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!feeling) {
      setMessage("Pick how you feel now.");
      return;
    }
    setMessage(null);
    startSaving(async () => {
      const result = await saveJournalEntry({
        moodId: mood.id,
        minutes: Math.max(1, Math.round(seconds / 60)),
        feeling,
        note,
      });
      if (!result.ok) {
        if (result.reason === "signin") setNeedsSignIn(true);
        else setMessage(ERRORS[result.reason]);
        return;
      }
      if (showsDistress(note)) setNeedsHelp(true);
      else router.push("/journal");
    });
  }

  if (needsHelp) {
    return (
      <main className="mx-auto w-full max-w-md flex-1 px-5 py-10 sm:px-6">
        <HelplineNote onBack={() => router.push("/journal")} />
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-14 sm:px-6">
      <form onSubmit={save} className="flex flex-1 flex-col">
        <div className="text-center">
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-soft">
            <CheckIcon className="size-8 text-clay" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
            Session complete
          </p>
          <h1 className="mt-2 font-serif text-[32px] font-medium leading-tight tracking-tight text-ink">
            How do you feel now?
          </h1>
        </div>

        <div role="group" aria-label="How do you feel now?" className="mt-6 flex flex-col gap-3">
          {FEELINGS.map((f) => {
            const active = feeling === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFeeling(f.id);
                  setMessage(null);
                }}
                className={`min-h-14 rounded-2xl text-base font-semibold text-ink transition-colors ${
                  active
                    ? "bg-[#FBE3D3] ring-[1.5px] ring-clay"
                    : "bg-card ring-1 ring-line hover:bg-surface"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <label htmlFor="note" className="mt-7 block text-sm font-bold text-ink">
          One line for your journal <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="note"
          rows={3}
          maxLength={NOTE_MAX}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. My shoulders finally relaxed."
          className="mt-2.5 w-full resize-none rounded-2xl bg-card px-4 py-3.5 text-[15px] leading-relaxed text-ink ring-1 ring-line placeholder:text-muted/80 focus:outline-none focus:ring-2 focus:ring-clay"
        />

        <div className="mt-auto pt-10">
          {message && (
            <p role="alert" className="mb-4 text-center text-sm font-medium text-clay-dark">
              {message}
            </p>
          )}
          {needsSignIn && (
            <p role="alert" className="mb-4 text-center text-sm font-medium text-ink">
              <Link href="/login" className="font-semibold text-clay underline underline-offset-4">
                Sign in
              </Link>{" "}
              to save sessions to your journal.
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-clay px-6 text-base font-semibold text-white transition-colors hover:bg-clay-dark disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save to journal"}
          </button>
          <Link
            href="/home"
            className="mx-auto mt-3 flex min-h-11 w-fit items-center text-[15px] font-semibold text-link hover:text-ink"
          >
            Skip for now
          </Link>
          <WellnessNote className="mt-6" />
        </div>
      </form>
    </main>
  );
}
