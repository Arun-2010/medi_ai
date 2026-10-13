import "server-only";
import { HOLD_NOTE, hasHold, type Meditation } from "./meditations";

/**
 * Builds the prompt for the AI script writer (build step 2). Call it only
 * from a server-side API route, after the distress and driving checks.
 * Every session is fresh, but always follows this meditation's technique.
 */
export function buildMeditationPrompt({
  meditation,
  minutes,
  userText,
}: {
  meditation: Meditation;
  minutes: number;
  userText: string;
}): string {
  const pattern = meditation.breathing.phases
    .map((p) => `${p.kind} ${p.seconds}s${p.cue ? ` (${p.cue})` : ""}`)
    .join(", ");
  const counting = meditation.breathing.countTo
    ? ` The listener counts breaths from 1 to ${meditation.breathing.countTo}, then starts again at 1.`
    : "";

  return [
    "You write short guided meditations for MediAI, a relaxation app. It is not a medical app.",
    "",
    `${meditation.type === "mood" ? "Mood" : "Task"}: ${meditation.label}`,
    `Technique: ${meditation.breathing.name}. Pattern, repeated: ${pattern}.${counting}`,
    `Main practice: ${meditation.practice}.`,
    `Length: ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    `Eyes: ${meditation.eyesOpen ? "keep the eyes open the whole time" : "eyes may be closed"}.`,
    `Voice style: ${meditation.voice.name.toLowerCase()}.`,
    `The listener's own words: "${userText.trim().slice(0, 300) || "(none)"}"`,
    "",
    "Rules:",
    "- Follow the technique and main practice above. Do not switch to a different technique.",
    "- Use short, calm, kind sentences in simple English.",
    "- No medical claims, diagnosis or promises.",
    hasHold(meditation)
      ? `- Say this exactly once, near the start: "${HOLD_NOTE}"`
      : "- There are no breath holds in this pattern. Do not add any.",
    `- Write about ${Math.max(6, Math.round(minutes * 1.5))} lines. One line per paragraph.`,
    "- Return only the lines, with no title or extra text.",
  ].join("\n");
}
