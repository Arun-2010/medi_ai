import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BulbIcon, CheckIcon } from "@/components/Icons";
import { FEELINGS } from "@/lib/feelings";
import { dayLabel, getJournal } from "@/lib/journal";
import { findMeditation } from "@/lib/meditations";

export const metadata: Metadata = {
  title: "Journal · MediAI",
};

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEKDAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function JournalPage() {
  return (
    <>
      <h1 className="font-serif text-[34px] font-medium tracking-tight text-ink">Your journal</h1>

      {/* Reads the session, so it streams in behind its own boundary. */}
      <Suspense fallback={<JournalSkeleton />}>
        <JournalContent />
      </Suspense>

      <div className="mt-6 flex gap-3 rounded-3xl bg-soft px-5 py-5">
        <BulbIcon className="mt-0.5 size-5 shrink-0 text-clay" />
        <p className="text-[15px] leading-relaxed text-link">
          After a few weeks, MediAI will show your patterns here, like which time of day helps you
          feel calmest.
        </p>
      </div>
    </>
  );
}

async function JournalContent() {
  const { entries, streak, week, today, ready } = await getJournal();

  return (
    <>
      <section
        aria-label="Your streak"
        className="mt-6 rounded-3xl bg-card px-5 pb-5 pt-6 shadow-soft ring-1 ring-line/70"
      >
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-serif text-[26px] font-semibold tracking-tight text-ink">
            {streak > 0 ? `${streak}-day streak` : "No streak yet"}
          </h2>
          <p className="text-sm text-muted">This week</p>
        </div>
        <ul className="mt-5 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d, i) => (
            <li key={i} className="flex flex-col items-center gap-2">
              <span
                className={`flex size-9 items-center justify-center rounded-full ${
                  week[i] ? "bg-clay text-white" : "bg-soft"
                }`}
              >
                {week[i] && <CheckIcon className="size-4" strokeWidth={2.5} />}
              </span>
              <span className="text-xs font-semibold text-muted">
                <span aria-hidden="true">{d}</span>
                <span className="sr-only">
                  {WEEKDAY_NAMES[i]}: {week[i] ? "session done" : "no session"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <h2 className="mt-8 text-base font-bold text-ink">Recent sessions</h2>

      {!ready ? (
        <p className="mt-3 rounded-3xl bg-card px-5 py-5 text-[15px] leading-relaxed text-muted ring-1 ring-line">
          Your journal is not ready yet. Please try again a little later.
        </p>
      ) : entries.length === 0 ? (
        <div className="mt-3 rounded-3xl bg-card px-5 py-6 text-center ring-1 ring-line">
          <p className="text-[15px] leading-relaxed text-muted">
            Finish a session and write one line about how you feel. It will show up here.
          </p>
          <Link
            href="/home"
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-clay px-6 text-[15px] font-semibold text-white transition-colors hover:bg-clay-dark"
          >
            Start a session
          </Link>
        </div>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {entries.slice(0, 20).map((entry) => {
            const meditation = findMeditation(entry.meditation_id);
            const feeling = FEELINGS.find((f) => f.id === entry.feeling);
            return (
              <li key={entry.id} className="rounded-3xl bg-card px-5 py-4 ring-1 ring-line">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-ink">{meditation?.title ?? "Meditation"}</h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {dayLabel(entry.created_at, today)} · {entry.minutes} min
                    </p>
                  </div>
                  {feeling && (
                    <span className="shrink-0 rounded-full bg-soft px-3 py-1 text-xs font-bold text-clay-dark">
                      {feeling.tag}
                    </span>
                  )}
                </div>
                {entry.note && (
                  <p className="mt-2 text-[15px] italic leading-relaxed text-link">
                    “{entry.note}”
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function JournalSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="mt-6 h-36 rounded-3xl bg-card ring-1 ring-line/70" />
      <div className="mt-8 h-5 w-36 rounded bg-soft" />
      <div className="mt-3 h-24 rounded-3xl bg-card ring-1 ring-line" />
    </div>
  );
}
