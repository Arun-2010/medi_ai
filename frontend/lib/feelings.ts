export type Feeling = "calmer" | "same" | "not_better";

/** Answers to "How do you feel now?" after a session. */
export const FEELINGS: { id: Feeling; label: string; tag: string }[] = [
  { id: "calmer", label: "Calmer", tag: "Calmer" },
  { id: "same", label: "About the same", tag: "Same" },
  { id: "not_better", label: "Not better", tag: "Not better" },
];

export const NOTE_MAX = 300;
