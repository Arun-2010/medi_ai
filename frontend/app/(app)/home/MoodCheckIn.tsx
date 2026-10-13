"use client";

import {
  useRef,
  useState,
  type ComponentType,
  type FormEvent,
  type KeyboardEvent,
  type SVGProps,
} from "react";
import { useRouter } from "next/navigation";
import { HelplineNote } from "@/components/HelplineNote";
import {
  BookIcon,
  EyeIcon,
  HeartIcon,
  MoonIcon,
  NotebookIcon,
  TargetIcon,
  TimerIcon,
  WavesIcon,
} from "@/components/Icons";
import { DRIVING_MESSAGE, guessMood, mentionsDriving, showsDistress } from "@/lib/checkin";
import {
  DEFAULT_MINUTE_OPTIONS,
  findMeditation,
  MOODS,
  TASKS,
  type Meditation,
  type MeditationId,
} from "@/lib/meditations";

const ICONS: Record<MeditationId, ComponentType<SVGProps<SVGSVGElement>>> = {
  stressed: WavesIcon,
  sleep: MoonIcon,
  exam: NotebookIcon,
  focus: TargetIcon,
  low: HeartIcon,
  quick: TimerIcon,
  studying: BookIcon,
  bedtime: MoonIcon,
  break: EyeIcon,
};

const TABS = [
  { id: "mood", label: "How I feel", heading: "How are you feeling right now?", items: MOODS },
  { id: "task", label: "What I'm doing", heading: "What are you doing right now?", items: TASKS },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Rotates through a meditation's scripts so the same one doesn't repeat back to back. */
function nextScript(m: Meditation): number {
  const key = `mediai:last-script:${m.id}`;
  try {
    const last = Number(window.localStorage.getItem(key));
    const next = Number.isInteger(last) ? (last + 1) % m.scripts.length : 0;
    window.localStorage.setItem(key, String(next));
    return next;
  } catch {
    return Math.floor(Math.random() * m.scripts.length);
  }
}

export function MoodCheckIn() {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("mood");
  const [selected, setSelected] = useState<MeditationId | null>(null);
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [stop, setStop] = useState<"distress" | "driving" | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = TABS.find((t) => t.id === tab)!;
  const minuteOptions = findMeditation(selected)?.minuteOptions ?? DEFAULT_MINUTE_OPTIONS;

  function pick(m: Meditation) {
    setSelected(m.id);
    setMinutes(m.minutes);
    setHint(null);
  }

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (index + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  function createMeditation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const line = text.trim();

    // Safety first: distress, then driving (see CLAUDE.md).
    if (line && showsDistress(line)) return setStop("distress");
    if (line && mentionsDriving(line)) return setStop("driving");
    if (!selected && !line) {
      setHint(
        tab === "mood"
          ? "Pick a mood or write a line about how you feel."
          : "Pick what you're doing or write a line about it.",
      );
      return;
    }

    const meditation = findMeditation(selected ?? guessMood(line))!;
    // Typed text alone keeps the time picked on the general picker.
    const length = meditation.minuteOptions.includes(minutes) ? minutes : meditation.minutes;
    router.push(`/session?id=${meditation.id}&min=${length}&v=${nextScript(meditation)}`);
  }

  const goBack = () => {
    setStop(null);
    setText("");
  };

  if (stop === "distress") {
    return (
      <div className="mt-6">
        <HelplineNote onBack={goBack} />
      </div>
    );
  }

  if (stop === "driving") {
    return (
      <div role="alert" className="mt-6 rounded-3xl bg-card px-6 py-7 text-center ring-1 ring-line">
        <h2 className="font-serif text-2xl font-medium text-ink">Let&apos;s pause for now</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{DRIVING_MESSAGE}</p>
        <button
          type="button"
          onClick={goBack}
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-soft px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-line"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={createMeditation} className="mt-6">
      <div role="tablist" aria-label="Choose by" className="grid grid-cols-2 gap-1 rounded-full bg-soft p-1.5">
        {TABS.map((t, i) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active}
              aria-controls="checkin-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`min-h-11 rounded-full text-[15px] font-semibold transition-colors ${
                active ? "bg-card text-ink shadow-[0_4px_12px_rgba(120,70,30,0.12)]" : "text-link"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="checkin-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <h1 className="mt-7 font-serif text-[32px] font-medium leading-[1.12] tracking-tight text-ink">
          {current.heading}
        </h1>

        <div
          role="group"
          aria-label={current.label}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          {current.items.map((m) => {
            const Icon = ICONS[m.id];
            const active = m.id === selected;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => pick(m)}
                className={`flex min-h-16 items-center gap-3 rounded-2xl px-3.5 text-left text-[15px] font-semibold text-ink transition-colors ${
                  active
                    ? "bg-[#FBE3D3] ring-[1.5px] ring-clay"
                    : "bg-card ring-1 ring-line hover:bg-surface"
                }`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-soft">
                  <Icon className="size-4.5 text-clay" />
                </span>
                {m.shortLabel}
              </button>
            );
          })}
        </div>
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
        <div
          className="mt-2.5 grid gap-1 rounded-full bg-soft p-1.5"
          style={{ gridTemplateColumns: `repeat(${minuteOptions.length}, minmax(0, 1fr))` }}
        >
          {minuteOptions.map((t) => (
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
