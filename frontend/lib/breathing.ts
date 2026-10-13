import type { BreathPhase, Breathing } from "./meditations";
import { cycleSeconds } from "./meditations";

/** Circle size when the lungs are empty and full. */
export const SCALE_EMPTY = 0.72;
export const SCALE_FULL = 1;

export type BreathState = {
  phase: BreathPhase;
  /** Index of the phase in the cycle; changes every phase. */
  phaseIndex: number;
  /** Seconds left in this phase. */
  secondsLeft: number;
  /** Size the circle should reach by the end of this phase. */
  targetScale: number;
  /** 1..countTo for counting patterns, otherwise null. */
  count: number | null;
};

/**
 * Where we are in the breathing pattern after `elapsed` seconds.
 * "in" grows the circle, "hold" keeps it still, "out" shrinks it.
 * A double inhale grows it in two steps.
 */
export function breathAt(breathing: Breathing, elapsed: number): BreathState {
  const { phases, countTo } = breathing;
  const cycle = cycleSeconds(breathing);
  const inCycle = elapsed % cycle;
  const totalIn = phases.filter((p) => p.kind === "in").reduce((s, p) => s + p.seconds, 0);

  let start = 0;
  let scale = SCALE_EMPTY;
  for (let i = 0; i < phases.length; i++) {
    const p = phases[i];
    if (p.kind === "in") scale += ((SCALE_FULL - SCALE_EMPTY) * p.seconds) / totalIn;
    if (p.kind === "out") scale = SCALE_EMPTY;
    if (inCycle < start + p.seconds) {
      const cycleNo = Math.floor(elapsed / cycle);
      return {
        phase: p,
        phaseIndex: i,
        secondsLeft: start + p.seconds - inCycle,
        targetScale: Math.min(SCALE_FULL, scale),
        count: countTo ? (cycleNo % countTo) + 1 : null,
      };
    }
    start += p.seconds;
  }
  // Unreachable: inCycle is always inside the cycle.
  return { phase: phases[0], phaseIndex: 0, secondsLeft: phases[0].seconds, targetScale: SCALE_FULL, count: null };
}

export const PHASE_LABEL: Record<BreathPhase["kind"], string> = {
  in: "Breathe in",
  hold: "Hold",
  out: "Breathe out",
};
