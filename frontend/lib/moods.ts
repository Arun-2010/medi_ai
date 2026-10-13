export type MoodId = "stressed" | "sleep" | "exam" | "focus" | "low" | "quick";

export type Mood = {
  id: MoodId;
  /** Full label used on the hero cards. */
  label: string;
  /** Short label used on the "Try it now" buttons. */
  shortLabel: string;
  /** Small line under the label on the hero cards. */
  hint: string;
  title: string;
  minutes: number;
  category: string;
  firstLine: string;
  /** Short prewritten script read aloud by the voice guide. */
  script: string[];
};

export const MOODS: Mood[] = [
  {
    id: "stressed",
    label: "Feeling stressed",
    shortLabel: "Stressed",
    hint: "Let it settle",
    title: "Let It Settle",
    minutes: 5,
    category: "Stress relief",
    firstLine:
      "Breathe in slowly through your nose. As you breathe out, let your shoulders drop.",
    script: [
      "Breathe in slowly through your nose.",
      "As you breathe out, let your shoulders drop.",
      "Notice where you feel tight, and let that place soften a little.",
      "There is nothing to fix right now. Just this breath, and the next one.",
    ],
  },
  {
    id: "sleep",
    label: "Can't sleep",
    shortLabel: "Can't sleep",
    hint: "Drift off gently",
    title: "Drift Into Sleep",
    minutes: 10,
    category: "Sleep",
    firstLine:
      "Let your body sink into the bed. Each breath out makes you a little heavier.",
    script: [
      "Let your body sink into the bed.",
      "Each breath out makes you a little heavier.",
      "Feel your feet relax, then your legs, then your back.",
      "You do not need to sleep right now. Just rest, and let the day go.",
    ],
  },
  {
    id: "exam",
    label: "Exam nerves",
    shortLabel: "Exam nerves",
    hint: "Calm in 5 minutes",
    title: "Calm Before the Exam",
    minutes: 5,
    category: "Exam calm",
    firstLine:
      "Place your feet flat on the floor. You have prepared, and this breath is yours.",
    script: [
      "Place your feet flat on the floor.",
      "You have prepared, and this breath is yours.",
      "Breathe in for four counts, and out for four counts.",
      "When you begin, take one question at a time.",
    ],
  },
  {
    id: "focus",
    label: "Need focus",
    shortLabel: "Need focus",
    hint: "Clear your mind",
    title: "One Clear Task",
    minutes: 7,
    category: "Focus",
    firstLine:
      "Pick one small task. Hold it in your mind as you breathe in and out.",
    script: [
      "Pick one small task.",
      "Hold it in your mind as you breathe in and out.",
      "When other thoughts come, notice them, and set them aside for later.",
      "Come back to your one task, and your next breath.",
    ],
  },
  {
    id: "low",
    label: "Feeling low",
    shortLabel: "Feeling low",
    hint: "Be gentle with yourself",
    title: "Be Gentle With Yourself",
    minutes: 8,
    category: "Kindness",
    firstLine:
      "Place a hand on your chest. Speak to yourself the way you would speak to a friend.",
    script: [
      "Place a hand on your chest.",
      "Speak to yourself the way you would speak to a friend.",
      "It is okay to feel this way today.",
      "Breathe in a little warmth, and breathe out a little heaviness.",
    ],
  },
  {
    id: "quick",
    label: "Short on time",
    shortLabel: "Short on time",
    hint: "Calm in 60 seconds",
    title: "Calm in 60 Seconds",
    minutes: 1,
    category: "Quick reset",
    firstLine:
      "Three slow breaths. In through the nose, a long, easy breath out.",
    script: [
      "Three slow breaths.",
      "In through the nose, and a long, easy breath out.",
      "Again. In, and out.",
      "One more. You are ready for what comes next.",
    ],
  },
];
