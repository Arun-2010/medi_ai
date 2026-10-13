"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CloseIcon, PauseIcon, PlayIcon, SlidersIcon } from "@/components/Icons";
import { WellnessNote } from "@/components/WellnessNote";
import { breathAt, PHASE_LABEL } from "@/lib/breathing";
import { sessionLines, type Meditation, type VoiceStyle } from "@/lib/meditations";
import { createRain } from "@/lib/rain";

const SKIP = 15;
/** Circle size while paused or with reduced motion. */
const RESTING_SCALE = 0.86;

type Voice = "on" | "off";
type Sound = "rain" | "off";

function speak(line: string, style: VoiceStyle, volume: number) {
  if (!("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(line);
  const voices = synth.getVoices();
  const voice =
    voices.find((v) => v.lang === "en-IN") ?? voices.find((v) => v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? "en-IN";
  utterance.rate = style.rate;
  utterance.pitch = style.pitch;
  utterance.volume = volume;
  synth.speak(utterance);
}

function stopVoice() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SessionPlayer({
  meditation,
  minutes,
  variant,
  onFinish,
}: {
  meditation: Meditation;
  minutes: number;
  variant: number;
  onFinish: (secondsListened: number) => void;
}) {
  const total = minutes * 60;
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [voice, setVoice] = useState<Voice>("on");
  const [sound, setSound] = useState<Sound>("rain");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [rain] = useState(createRain);
  const reduceMotion = useReducedMotion();

  // Keep the latest callback without restarting the timer.
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  // Each script line gets an equal share of the session.
  const [lines] = useState(() => sessionLines(meditation, variant));
  const lineIndex = Math.min(lines.length - 1, Math.floor((elapsed / total) * lines.length));
  const breath = breathAt(meditation.breathing, elapsed);
  // Sleep voices get quieter toward the end of the session.
  const volume = meditation.voice.fadeOut ? 1 - 0.6 * (lineIndex / Math.max(1, lines.length - 1)) : 1;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setElapsed((e) => Math.min(total, e + 1)), 1000);
    return () => window.clearInterval(id);
  }, [playing, total]);

  useEffect(() => {
    if (elapsed >= total) onFinishRef.current(total);
  }, [elapsed, total]);

  // Read each line aloud when it comes up.
  useEffect(() => {
    if (playing && voice === "on") speak(lines[lineIndex], meditation.voice, volume);
    else stopVoice();
  }, [playing, voice, lineIndex, lines, meditation.voice, volume]);

  useEffect(() => {
    if (playing && sound === "rain") rain.start();
    else rain.stop();
  }, [playing, sound, rain]);

  // Clean up voice and sound when leaving the screen.
  useEffect(
    () => () => {
      stopVoice();
      rain.close();
    },
    [rain],
  );

  const seek = (by: number) => setElapsed((e) => Math.max(0, Math.min(total - 1, e + by)));
  const progress = (elapsed / total) * 100;

  return (
    <main className="flex flex-1 flex-col bg-night text-cream">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-5 pb-8 pt-6 text-center sm:px-6">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/home"
            aria-label="Close session"
            className="inline-flex size-12 items-center justify-center rounded-full bg-night-card transition-colors hover:bg-white/10"
          >
            <CloseIcon className="size-5" />
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-light">
            {minutes} min · {meditation.shortLabel}
          </p>
          <button
            type="button"
            aria-label="Session settings"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex size-12 items-center justify-center rounded-full bg-night-card transition-colors hover:bg-white/10"
          >
            <SlidersIcon className="size-5" />
          </button>
        </div>

        <h1 className="mt-8 font-serif text-[32px] font-medium leading-tight tracking-tight">
          {meditation.title}
        </h1>
        <p className="mt-2 text-[15px] font-semibold text-clay-light">{meditation.breathing.name}</p>
        <p className="mt-1 text-sm text-cream/75">
          {meditation.eyesOpen ? "Keep your eyes open" : "Close your eyes if you like"}
        </p>

        <div className="relative mt-6 flex size-64 items-center justify-center rounded-full ring-1 ring-white/12">
          <motion.div
            aria-hidden="true"
            className="absolute size-56 rounded-full bg-[radial-gradient(circle_at_50%_40%,#e3925c_0%,#c96a32_60%,#b4581f_100%)] shadow-[0_0_70px_rgba(224,135,79,0.25)]"
            animate={{
              scale: playing && !reduceMotion ? breath.targetScale : RESTING_SCALE,
            }}
            transition={
              playing && !reduceMotion
                ? { duration: breath.phase.seconds, ease: "easeInOut" }
                : { duration: reduceMotion ? 0 : 0.8 }
            }
          />
          <div className="relative text-ink">
            <p className="font-serif text-[26px] font-semibold">
              {playing ? PHASE_LABEL[breath.phase.kind] : "Paused"}
            </p>
            <p className="text-sm font-medium">
              {!playing
                ? "tap play to go on"
                : (breath.phase.cue ??
                  (breath.count ? `count ${breath.count}` : `${breath.secondsLeft}`))}
            </p>
          </div>
        </div>

        <p className="mt-8 min-h-[5.25rem] max-w-sm text-lg leading-relaxed text-cream/90">
          {lines[lineIndex]}
        </p>

        <div className="mt-6 w-full">
          <div
            role="progressbar"
            aria-label="Session progress"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={elapsed}
            aria-valuetext={`${formatTime(elapsed)} of ${formatTime(total)}`}
            className="h-1.5 w-full overflow-hidden rounded-full bg-white/12"
          >
            <div
              className="h-full rounded-full bg-clay-light transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm tabular-nums text-cream/80">
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(total)}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-7">
          <button
            type="button"
            aria-label={`Back ${SKIP} seconds`}
            onClick={() => seek(-SKIP)}
            className="inline-flex size-14 items-center justify-center rounded-full bg-night-card text-[15px] font-bold transition-colors hover:bg-white/10"
          >
            −15
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex size-20 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-soft"
          >
            {playing ? <PauseIcon className="size-7" /> : <PlayIcon className="ml-1 size-7" />}
          </button>
          <button
            type="button"
            aria-label={`Forward ${SKIP} seconds`}
            onClick={() => seek(SKIP)}
            className="inline-flex size-14 items-center justify-center rounded-full bg-night-card text-[15px] font-bold transition-colors hover:bg-white/10"
          >
            +15
          </button>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex min-h-11 items-center rounded-full bg-night-card px-4 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Voice: {voice === "on" ? `${meditation.voice.name} · English` : "Off"}
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex min-h-11 items-center rounded-full bg-night-card px-4 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Sound: {sound === "rain" ? "Rain" : "Off"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onFinish(elapsed)}
          className="mt-5 inline-flex min-h-11 items-center text-[15px] font-semibold text-clay-light underline underline-offset-4 hover:text-cream"
        >
          End session
        </button>

        <WellnessNote dark className="mt-auto pt-10" />
      </div>

      {settingsOpen && (
        <SettingsSheet
          voice={voice}
          voiceName={meditation.voice.name}
          sound={sound}
          onVoice={setVoice}
          onSound={setSound}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </main>
  );
}

function SettingsSheet({
  voice,
  voiceName,
  sound,
  onVoice,
  onSound,
  onClose,
}: {
  voice: Voice;
  voiceName: string;
  sound: Sound;
  onVoice: (v: Voice) => void;
  onSound: (s: Sound) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-[28px] bg-night-card px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 text-cream"
      >
        <div className="flex items-center justify-between">
          <h2 id="settings-title" className="font-serif text-2xl font-medium">
            Session settings
          </h2>
          <button
            type="button"
            aria-label="Close settings"
            autoFocus
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <Choice
          label="Voice"
          value={voice}
          options={[
            { id: "on", label: `${voiceName} · English` },
            { id: "off", label: "Off" },
          ]}
          onChange={onVoice}
        />
        <p className="mt-2 text-sm text-cream/75">Hindi and Telugu voices are coming soon.</p>
        <Choice
          label="Background sound"
          value={sound}
          options={[
            { id: "rain", label: "Rain" },
            { id: "off", label: "Off" },
          ]}
          onChange={onSound}
        />
      </div>
    </div>
  );
}

function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-sm font-semibold text-cream/80">{label}</legend>
      <div className="mt-2.5 flex gap-2.5">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors ${
              value === o.id ? "bg-cream text-ink" : "ring-1 ring-white/20 hover:bg-white/10"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
