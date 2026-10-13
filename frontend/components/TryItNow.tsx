"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MOODS, previewLine, sessionLines, type Meditation } from "@/lib/meditations";

function speak(mood: Meditation, onEnd: () => void) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const lines = sessionLines(mood, 0);
  lines.forEach((line, i) => {
    const utterance = new SpeechSynthesisUtterance(line);
    utterance.rate = mood.voice.rate;
    utterance.pitch = mood.voice.pitch;
    if (i === lines.length - 1) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }
    synth.speak(utterance);
  });
}

export function TryItNow() {
  const [mood, setMood] = useState<Meditation>(MOODS[0]);
  const [playing, setPlaying] = useState(false);
  const [canSpeak, setCanSpeak] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only check
    setCanSpeak("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function pickMood(next: Meditation) {
    if (playing) window.speechSynthesis.cancel();
    setPlaying(false);
    setMood(next);
  }

  function togglePlay() {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    speak(mood, () => setPlaying(false));
  }

  return (
    <section id="try" className="scroll-mt-16 bg-night py-20 text-cream md:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-light">
            Try it now
          </p>
          <h2 className="mt-4 font-serif text-[32px] font-medium leading-tight tracking-tight md:text-[42px]">
            How are you feeling right now?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#DCC7B5]">
            Pick a mood and see the kind of session MediAI would make for you.
          </p>

          <div role="group" aria-label="Pick a mood" className="mt-8 flex flex-wrap gap-2.5">
            {MOODS.map((m) => {
              const active = m.id === mood.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pickMood(m)}
                  className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-cream text-ink"
                      : "text-cream ring-1 ring-white/25 hover:bg-white/10"
                  }`}
                >
                  {m.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div
          aria-live="polite"
          className="flex flex-col items-center rounded-3xl bg-night-card px-6 py-10 text-center ring-1 ring-white/10 md:px-10 md:py-12"
        >
          <div className="flex size-36 items-center justify-center">
            <motion.div
              aria-hidden="true"
              className="size-28 rounded-full bg-[radial-gradient(circle_at_40%_35%,#e0874f_0%,#c4652c_55%,#a8501f_100%)] shadow-[0_0_60px_rgba(224,135,79,0.35)]"
              animate={reduceMotion ? undefined : { scale: [1, 1.22, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mood.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-clay-light">
                {mood.minutes} min · {mood.category}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium md:text-[28px]">
                {mood.title}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[15px] italic leading-relaxed text-[#DCC7B5]">
                “{previewLine(mood)}”
              </p>
            </motion.div>
          </AnimatePresence>

          {canSpeak ? (
            <button
              type="button"
              onClick={togglePlay}
              className="mt-7 inline-flex min-h-11 items-center rounded-full bg-cream px-6 text-sm font-semibold text-ink transition-colors hover:bg-soft"
            >
              {playing ? "Stop session" : "Play this session"}
            </button>
          ) : (
            <p className="mt-7 text-sm text-[#DCC7B5]">
              Voice is not available in this browser. Follow the circle and breathe.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
