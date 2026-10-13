import type { MoodId } from "./moods";

/**
 * Phrases that suggest serious distress. When one appears we do not make a
 * meditation; we show the Tele-MANAS helpline instead (see CLAUDE.md).
 */
const DISTRESS_PATTERNS = [
  /suicid/,
  /kill (my ?self|me)/,
  /end (my|it all)( life)?/,
  /want(ed)? to die/,
  /better off dead/,
  /no (reason|point) (to|in) (live|living)/,
  /self[- ]?harm/,
  /hurt(ing)? my ?self/,
  /cut(ting)? my ?self/,
  /don'?t want to (live|be alive|wake up)/,
];

export function showsDistress(text: string): boolean {
  const t = text.toLowerCase();
  return DISTRESS_PATTERNS.some((p) => p.test(t));
}

const MOOD_KEYWORDS: [MoodId, RegExp][] = [
  ["exam", /exam|test|study|studying|result|interview|marks|board/],
  ["sleep", /sleep|insomnia|awake|bed|night|tired|restless/],
  ["focus", /focus|concentrat|distract|procrastinat|work|deadline/],
  ["low", /sad|low|lonely|alone|down|cry|upset|hurt|heavy/],
  ["quick", /quick|busy|no time|short|rush|minute/],
  ["stressed", /stress|anxious|anxiety|nervous|worr|overwhelm|panic|angry/],
];

/** Picks the closest mood for a line of free text. */
export function guessMood(text: string): MoodId {
  const t = text.toLowerCase();
  return MOOD_KEYWORDS.find(([, p]) => p.test(t))?.[0] ?? "stressed";
}

export const TIME_OPTIONS = [1, 5, 10, 15] as const;
