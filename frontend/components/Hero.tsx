"use client";

import type { CSSProperties, ComponentType, SVGProps } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MOODS, type MoodId } from "@/lib/moods";
import {
  HeartIcon,
  MoonIcon,
  NotebookIcon,
  TargetIcon,
  TimerIcon,
  WavesIcon,
} from "./Icons";

type Spot = {
  id: MoodId;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Tilt in degrees; left cards lean left, right cards lean right. */
  tilt: number;
  /** Centre offsets from the stage's middle-top, per breakpoint, in px. */
  sm: [number, number];
  md: [number, number];
  xl: [number, number];
};

// 3 cards on the left and 3 on the right of the mascot, in a tilted arc.
const SPOTS: Spot[] = [
  { id: "stressed", icon: WavesIcon, tilt: -12, sm: [-106, 26], md: [-218, 46], xl: [-365, 121] },
  { id: "sleep", icon: MoonIcon, tilt: -17, sm: [-116, 80], md: [-252, 150], xl: [-515, 276] },
  { id: "exam", icon: NotebookIcon, tilt: -20, sm: [-122, 134], md: [-280, 254], xl: [-585, 466] },
  { id: "focus", icon: TargetIcon, tilt: 13, sm: [106, 28], md: [218, 54], xl: [365, 136] },
  { id: "low", icon: HeartIcon, tilt: 17, sm: [116, 84], md: [252, 158], xl: [470, 301] },
  { id: "quick", icon: TimerIcon, tilt: 20, sm: [122, 138], md: [280, 262], xl: [570, 476] },
];

function spotStyle(spot: Spot) {
  return {
    "--dx": `${spot.sm[0]}px`,
    "--dy": `${spot.sm[1]}px`,
    "--dx-md": `${spot.md[0]}px`,
    "--dy-md": `${spot.md[1]}px`,
    "--dx-xl": `${spot.xl[0]}px`,
    "--dy-xl": `${spot.xl[1]}px`,
  } as CSSProperties;
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#fbf3ea_0%,#f7ede3_60%)] pb-20 md:pb-24"
    >
      {/* Faint circle arcs centred on the mascot. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
        {[560, 980, 1500].map((size) => (
          <div
            key={size}
            className="absolute left-1/2 top-[90px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/70 md:top-[150px] xl:top-[200px]"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-3 sm:px-6 md:pt-4">
        {/* Stage: mascot in the middle, mood cards around it. */}
        <div className="relative mx-auto h-[160px] md:h-[290px] xl:h-[370px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-1/2 top-3 size-[120px] -translate-x-1/2 overflow-hidden rounded-[22px] bg-surface shadow-soft ring-1 ring-line/60 md:top-4 md:size-[240px] md:rounded-[30px] xl:top-6 xl:size-[320px] xl:rounded-[36px]"
          >
            <Image
              src="/mascot.png"
              alt="A calm cartoon sage meditating cross-legged"
              width={356}
              height={368}
              priority
              className="size-full object-cover"
            />
          </motion.div>

          {SPOTS.map((spot, i) => {
            const mood = MOODS.find((m) => m.id === spot.id)!;
            const Icon = spot.icon;
            return (
              <div key={spot.id} className="mood-spot z-10" style={spotStyle(spot)}>
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                  transition={{
                    duration: 5 + (i % 3) * 0.8,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <a
                    href="#try"
                    style={{ rotate: `${spot.tilt}deg` }}
                    className="flex items-center gap-3 whitespace-nowrap rounded-xl bg-card px-2.5 py-1.5 shadow-soft ring-1 ring-line/60 transition-shadow hover:ring-clay/40 md:rounded-2xl md:px-4 md:py-3"
                  >
                    <Icon className="hidden size-5 shrink-0 text-clay md:block" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[11px] font-semibold text-ink md:text-[15px]">
                        {mood.label}
                      </span>
                      <span className="hidden text-[13px] text-muted md:block">
                        {mood.hint}
                      </span>
                    </span>
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative mt-8 text-center md:mt-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
            Your AI meditation guide
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-[35px] font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl xl:text-[68px]">
            Tell us how you feel.
            <span className="block text-clay">Get a meditation made for you.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Share your mood and how much time you have. MediAI creates a guided
            meditation just for this moment, with a calm voice and a breathing
            guide.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href="#try"
              className="inline-flex min-h-12 items-center rounded-full bg-clay px-7 text-[15px] font-semibold text-white shadow-soft transition-colors hover:bg-clay-dark"
            >
              Start a free session →
            </a>
            <a
              href="#how"
              className="inline-flex min-h-12 items-center px-2 text-[15px] font-semibold text-ink hover:text-clay"
            >
              See how it works →
            </a>
          </div>
          <p className="mt-5 text-sm text-muted">
            Free to start · No app download needed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
