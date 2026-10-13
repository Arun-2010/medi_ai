"use client";

import { useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import { useRouter } from "next/navigation";
import { HelplineNote } from "@/components/HelplineNote";
import {
  HeartIcon,
  MoonIcon,
  NotebookIcon,
  TargetIcon,
  TimerIcon,
  WavesIcon,
} from "@/components/Icons";
import { guessMood, showsDistress, TIME_OPTIONS } from "@/lib/checkin";
import { MOODS, type MoodId } from "@/lib/moods";

const MOOD_ICONS: Record<MoodId, ComponentType<SVGProps<SVGSVGElement>>> = {
  stressed: WavesIcon,
  sleep: MoonIcon,
  exam: NotebookIcon,
  focus: TargetIcon,
  low: HeartIcon,
  quick: TimerIcon,
};

export function MoodCheckIn() {
  const router = useRouter();
  const [mood, setMood] = useState<MoodId | null>(null);
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState<number>(5);
  const [needsHelp, setNeedsHelp] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  function pickMood(id: MoodId) {
    setMood(id);
    setHint(null);
    if (id === "quick") setMinutes(1);
  }

  function createMeditation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const line = text.trim();

    if (line && showsDistress(line)) {
      setNeedsHelp(true);
      return;
    }
    if (!mood && !line) {
      setHint("Pick a mood or write a line about how you feel.");
      return;
    }

    const chosen = mood ?? guessMood(line);
    router.push(`/session?mood=${chosen}&min=${minutes}`);
  }

  if (needsHelp) {
    return (
      <div className="mt-6">
        <HelplineNote
          onBack={() => {
            setNeedsHelp(false);
            setText("");
          }}
        />
      </div>
    );
  }

  return (
    <form onSubmit={createMeditation} className="mt-6">
      <div role="group" aria-label="Pick a mood" className="grid grid-cols-2 gap-3">
        {MOODS.map((m) => {
          const Icon = MOOD_ICONS[m.id];
          const active = m.id === mood;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={active}
              onClick={() => pickMood(m.id)}
              className={`flex min-h-16 items-center gap-3 rounded-2xl px-3.5 text-left text-[15px] font-semibold text-ink transition-colors ${
                active
                  ? "bg-[#FBE3D3] ring-[1.5px] ring-clay"
                  : "bg-card ring-1 ring-line hover:bg-surface"
              }`}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-soft">
                <Icon className="size-[18px] text-clay" />
              </span>
              {m.shortLabel}
            </button>
          );
        })}
      </div>

      <label htmlFor="feeling" className="mt-7 block text-sm font-bold text-ink">
        Or tell us in your own words
      </label>
      <textarea
        id="feeling"
        rows={2}
        maxLength={300}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setHint(null);
        }}
        placeholder="e.g. I have an exam tomorrow and feel nervous"
        className="mt-2.5 w-full resize-none rounded-2xl bg-card px-4 py-3.5 text-[15px] leading-relaxed text-ink ring-1 ring-line placeholder:text-muted/80 focus:outline-none focus:ring-2 focus:ring-clay"
      />

      <fieldset className="mt-6">
        <legend className="text-sm font-bold text-ink">How much time do you have?</legend>
        <div className="mt-2.5 grid grid-cols-4 gap-1 rounded-full bg-soft p-1.5">
          {TIME_OPTIONS.map((t) => (
            <label key={t} className="relative">
              <input
                type="radio"
                name="minutes"
                value={t}
                checked={minutes === t}
                onChange={() => setMinutes(t)}
                className="peer sr-only"
              />
              <span className="flex min-h-11 cursor-pointer items-center justify-center rounded-full text-[15px] font-semibold text-link transition-colors peer-checked:bg-card peer-checked:text-ink peer-checked:shadow-[0_4px_12px_rgba(120,70,30,0.12)] peer-focus-visible:outline-2 peer-focus-visible:outline-clay">
                {t} min
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {hint && (
        <p role="alert" className="mt-5 text-center text-sm font-medium text-clay-dark">
          {hint}
        </p>
      )}

      <button
        type="submit"
        className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-clay px-6 text-base font-semibold text-white shadow-[0_14px_30px_rgba(180,83,31,0.28)] transition-colors hover:bg-clay-dark"
      >
        Create my meditation →
      </button>
    </form>
  );
}
