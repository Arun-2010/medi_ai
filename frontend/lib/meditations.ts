/**
 * Every mood and task MediAI offers, with its own breathing pattern, practice,
 * voice and scripts. See "Meditation types" in CLAUDE.md. Read from here;
 * never hardcode these in components.
 */

export type MeditationId =
  // Moods (home tab "How I feel")
  | "stressed"
  | "sleep"
  | "exam"
  | "focus"
  | "low"
  | "quick"
  // Tasks (home tab "What I'm doing")
  | "studying"
  | "bedtime"
  | "break";

export type BreathPhase = {
  kind: "in" | "hold" | "out";
  seconds: number;
  /** Small line under "Breathe in" etc., e.g. "a little more". */
  cue?: string;
};

export type Breathing = {
  /** Technique name shown under the session title. */
  name: string;
  /** One cycle; it repeats for the whole session. */
  phases: BreathPhase[];
  /** Count breaths 1..countTo, then start again at 1. */
  countTo?: number;
};

export type VoiceStyle = {
  /** Shown on the player's voice chip, e.g. "Calm". */
  name: string;
  rate: number;
  pitch: number;
  /** Voice gets quieter toward the end (for falling asleep). */
  fadeOut?: boolean;
};

export type Meditation = {
  id: MeditationId;
  type: "mood" | "task";
  /** Full label, e.g. on the hero cards. */
  label: string;
  /** Short label on buttons and the player. */
  shortLabel: string;
  /** Small line under the label on the hero cards. */
  hint: string;
  title: string;
  category: string;
  breathing: Breathing;
  /** The main practice, in a few words. Also sent to the AI. */
  practice: string;
  voice: VoiceStyle;
  minutes: number;
  minuteOptions: number[];
  eyesOpen: boolean;
  /** Prewritten fallback scripts, each using this technique. */
  scripts: string[][];
};

/** Said once in any session whose pattern has a hold (see CLAUDE.md). */
export const HOLD_NOTE = "If holding your breath feels uncomfortable, just breathe slowly.";

/** Time choices when nothing is picked yet. */
export const DEFAULT_MINUTE_OPTIONS = [1, 5, 10, 15];

const BREATHING = {
  longExhale: {
    name: "Long exhale breathing",
    phases: [
      { kind: "in", seconds: 4 },
      { kind: "out", seconds: 6 },
    ],
  },
  fourSevenEight: {
    name: "4-7-8 breathing",
    phases: [
      { kind: "in", seconds: 4 },
      { kind: "hold", seconds: 7 },
      { kind: "out", seconds: 8 },
    ],
  },
  box: {
    name: "Box breathing",
    phases: [
      { kind: "in", seconds: 4 },
      { kind: "hold", seconds: 4 },
      { kind: "out", seconds: 4 },
      { kind: "hold", seconds: 4 },
    ],
  },
  counting: {
    name: "Counting breaths",
    phases: [
      { kind: "in", seconds: 4 },
      { kind: "out", seconds: 5 },
    ],
    countTo: 10,
  },
  slowNatural: {
    name: "Slow, natural breathing",
    phases: [
      { kind: "in", seconds: 5 },
      { kind: "out", seconds: 6 },
    ],
  },
  doubleSigh: {
    name: "Two quick sighs",
    phases: [
      { kind: "in", seconds: 2 },
      { kind: "in", seconds: 1, cue: "a little more" },
      { kind: "out", seconds: 6, cue: "long sigh out" },
    ],
  },
} satisfies Record<string, Breathing>;

const VOICES = {
  calm: { name: "Calm", rate: 0.85, pitch: 0.95 },
  sleepy: { name: "Slow and soft", rate: 0.72, pitch: 0.9, fadeOut: true },
  steady: { name: "Steady", rate: 0.88, pitch: 1 },
  clear: { name: "Clear", rate: 0.9, pitch: 1 },
  warm: { name: "Warm", rate: 0.8, pitch: 0.95 },
  bright: { name: "Bright", rate: 0.95, pitch: 1.05 },
} satisfies Record<string, VoiceStyle>;

export const MEDITATIONS: Meditation[] = [
  {
    id: "stressed",
    type: "mood",
    label: "Feeling stressed",
    shortLabel: "Stressed",
    hint: "Let it settle",
    title: "Let It Settle",
    category: "Stress relief",
    breathing: BREATHING.longExhale,
    practice: "Relax the body part by part: jaw, shoulders, hands",
    voice: VOICES.calm,
    minutes: 5,
    minuteOptions: DEFAULT_MINUTE_OPTIONS,
    eyesOpen: false,
    scripts: [
      [
        "Sit comfortably and let your eyes close, or rest them on one spot.",
        "Breathe in for four, and out slowly for six. Let the long breath out do the work.",
        "Bring your attention to your jaw. Let your teeth part a little, and your tongue rest.",
        "Now your shoulders. As you breathe out, let them drop away from your ears.",
        "Now your hands. Open your fingers, then let them rest, soft and heavy.",
        "Each long breath out lets a little more tension go.",
        "Notice how your body feels now. Carry this softness with you.",
      ],
      [
        "Let's slow things down together. Breathe in for four, and out for six.",
        "Start with your forehead. Let it smooth out, as if someone gently brushed it.",
        "Soften the space between your eyebrows. Let your jaw hang loose.",
        "Roll your shoulders back once, then let them settle.",
        "Feel your arms grow heavy, all the way down to your fingertips.",
        "With each breath out, say quietly in your mind: let it go.",
        "Stay here for a few more breaths. You are doing well.",
      ],
      [
        "Place both feet on the floor and feel the ground hold you.",
        "Breathe in for four. Breathe out for six, slower than you breathed in.",
        "Squeeze your hands into fists for a moment. Now let them open and relax.",
        "Lift your shoulders up toward your ears. Hold for a moment, then let them fall.",
        "Press your lips together, then let your jaw go loose.",
        "Notice the difference between tight and soft. Choose soft.",
        "Keep this slow breath for as long as you like.",
      ],
    ],
  },
  {
    id: "sleep",
    type: "mood",
    label: "Can't sleep",
    shortLabel: "Can't sleep",
    hint: "Drift off gently",
    title: "Drift Into Sleep",
    category: "Sleep",
    breathing: BREATHING.fourSevenEight,
    practice: "Body scan from toes to head, then a slow fading story",
    voice: VOICES.sleepy,
    minutes: 10,
    minuteOptions: DEFAULT_MINUTE_OPTIONS,
    eyesOpen: false,
    scripts: [
      [
        "Lie down and let the bed hold your whole weight.",
        "We will breathe in for four, hold for seven, and breathe out for eight. Slow and easy.",
        "Bring your attention to your toes. Let them soften and grow warm.",
        "Now your feet and ankles. Heavy and relaxed.",
        "Let the softness move up through your legs, your hips and your belly.",
        "Feel your chest rise and fall. Let your shoulders sink into the bed.",
        "Let your arms, your neck and your face grow still and heavy.",
        "Imagine a quiet path by a lake at night. The water is still, and the air is cool.",
        "You walk slowly. Each step is softer than the last.",
        "There is nowhere to go. Just rest, and let sleep come when it is ready.",
      ],
      [
        "Let your body settle. There is nothing more to do today.",
        "Breathe in for four. Hold for seven. Breathe out slowly for eight.",
        "Start at your toes. Notice them, then let them go.",
        "Your calves and knees grow loose and heavy.",
        "Your back melts into the mattress, one part at a time.",
        "Your hands rest open. Your face is soft.",
        "Picture a small boat drifting on a slow river under the stars.",
        "It rocks gently. The sound of the water grows quieter and quieter.",
        "You are safe, warm and still.",
      ],
      [
        "Get comfortable, and let your eyes close.",
        "Breathe in through your nose for four. Hold gently for seven. Let it all out for eight.",
        "Feel your toes, your feet, your heels. Let them become heavy.",
        "Let the heaviness rise through your legs, like warm water filling a bath.",
        "It reaches your belly, your chest, your shoulders.",
        "Your neck lets go. Your jaw lets go. Even your eyelids feel heavy.",
        "Imagine light rain on a window, far away.",
        "Each drop is slower. Each breath is longer.",
        "Let the day fade, and drift.",
      ],
    ],
  },
  {
    id: "exam",
    type: "mood",
    label: "Exam nerves",
    shortLabel: "Exam nerves",
    hint: "Calm in 5 minutes",
    title: "Calm Before the Exam",
    category: "Exam calm",
    breathing: BREATHING.box,
    practice: "5-4-3-2-1 grounding, then calm, confident reminders",
    voice: VOICES.steady,
    minutes: 5,
    minuteOptions: DEFAULT_MINUTE_OPTIONS,
    eyesOpen: false,
    scripts: [
      [
        "Sit up tall and place your feet flat on the floor.",
        "Let's do box breathing. In for four, hold for four, out for four, hold for four.",
        "Look around and name five things you can see.",
        "Now four things you can feel, like your feet on the floor or the chair behind you.",
        "Three things you can hear. Two things you can smell. And one slow breath.",
        "You have prepared for this. Your mind knows more than it feels like right now.",
        "When you begin, read each question slowly, and take one question at a time.",
      ],
      [
        "Take a moment. This breath belongs to you.",
        "Breathe in for four. Hold for four. Out for four. Hold for four. Like drawing a square.",
        "Notice five things you can see around you. Let your eyes rest on each one.",
        "Four things you can touch. Three sounds, near or far.",
        "Two things you can smell, and one thing you are grateful for today.",
        "Nervous energy is just energy. You can use it to stay sharp.",
        "You don't need to know everything. Just do your best, one step at a time.",
      ],
      [
        "Feel the weight of your body in the chair.",
        "Let's breathe in a square. In for four, hold, out for four, hold.",
        "Find five colours around you. Four things you can touch.",
        "Three sounds. Two smells. One deep, easy breath.",
        "Remember a time you were nervous, and it turned out fine.",
        "You have done hard things before. You can do this too.",
        "Keep this steady breath with you as you walk into the room.",
      ],
    ],
  },
  {
    id: "focus",
    type: "mood",
    label: "Need focus",
    shortLabel: "Need focus",
    hint: "Clear your mind",
    title: "One Clear Task",
    category: "Focus",
    breathing: BREATHING.counting,
    practice: "Count breaths from 1 to 10, and restart at 1 when the mind wanders",
    voice: VOICES.clear,
    minutes: 7,
    minuteOptions: DEFAULT_MINUTE_OPTIONS,
    eyesOpen: false,
    scripts: [
      [
        "Sit comfortably. Let your breath be natural.",
        "Count each breath out. One, two, and so on, up to ten.",
        "If your mind wanders, that is normal. Gently go back to one.",
        "There is no score. Coming back is the practice.",
        "Each time you return, your focus grows a little stronger.",
        "Keep counting softly up to ten, and begin again.",
        "When you are ready, pick one task and start with that one thing.",
      ],
      [
        "Let your shoulders relax and your eyes rest.",
        "Breathe normally. On the first breath out, count one.",
        "Keep counting each breath out, up to ten.",
        "Lost count? Smile, and start again at one.",
        "Thoughts will come. Let them pass like cars on a road. You don't need to follow them.",
        "Back to your breath. Back to your count.",
        "Now open your eyes, and give your full attention to one thing.",
      ],
      [
        "Choose a spot in front of you, or close your eyes.",
        "Don't change your breath. Just notice it, and count it.",
        "One, as you breathe out. Two, on the next one.",
        "If you reach ten, start again at one. If you get lost, start again at one.",
        "Notice how busy the mind is. That's fine. Just count.",
        "Your attention is like a muscle. Every return makes it stronger.",
        "Carry this clear, simple attention into your next task.",
      ],
    ],
  },
  {
    id: "low",
    type: "mood",
    label: "Feeling low",
    shortLabel: "Feeling low",
    hint: "Be gentle with yourself",
    title: "Be Gentle With Yourself",
    category: "Kindness",
    breathing: BREATHING.slowNatural,
    practice: "Kindness practice: hand on chest, gentle words to yourself",
    voice: VOICES.warm,
    minutes: 8,
    minuteOptions: DEFAULT_MINUTE_OPTIONS,
    eyesOpen: false,
    scripts: [
      [
        "Place a hand on your chest, and feel it rise and fall.",
        "Breathe slowly and naturally. There is no right way to do this.",
        "Notice how you feel, without trying to change it.",
        "Speak to yourself the way you would speak to a good friend.",
        "Say quietly in your mind: this is hard right now, and I am doing my best.",
        "Breathe in a little warmth. Breathe out a little heaviness.",
        "You deserve kindness, especially from yourself.",
      ],
      [
        "Let your hand rest gently over your heart.",
        "Feel the warmth of your own hand. Breathe slowly.",
        "It's okay to feel low. Feelings come and go, like weather.",
        "Think of someone who cares about you. Imagine them sitting beside you.",
        "Let their kindness reach you. You don't have to earn it.",
        "Say to yourself: may I be gentle with myself today.",
        "Stay with this warmth for a few more breaths.",
      ],
      [
        "Sit or lie down, wherever you feel safe.",
        "Put one hand on your chest and one on your belly.",
        "Breathe slowly, and let your hands move with your breath.",
        "If thoughts are heavy, let them be there. You don't have to fix them now.",
        "Try these words: may I be kind to myself. May I rest when I need to.",
        "Breathe in softness. Breathe out tightness.",
        "One small, kind thing you can do next is enough.",
      ],
    ],
  },
  {
    id: "quick",
    type: "mood",
    label: "Short on time",
    shortLabel: "Short on time",
    hint: "Calm in 60 seconds",
    title: "Calm in 60 Seconds",
    category: "Quick reset",
    breathing: BREATHING.doubleSigh,
    practice: "Three double-inhale sighs, then look around the room",
    voice: VOICES.bright,
    minutes: 1,
    minuteOptions: DEFAULT_MINUTE_OPTIONS,
    eyesOpen: true,
    scripts: [
      [
        "Breathe in through your nose, then sip in a little more air.",
        "Now one long, slow breath out through your mouth.",
        "Again. In, a little more, and a long sigh out.",
        "One more time. Let your shoulders drop as you breathe out.",
        "Now look around the room. Find three things you can see.",
        "You're ready for what comes next.",
      ],
      [
        "Pause for one minute. That's all this takes.",
        "Breathe in, top it up with a second small breath, then sigh it all out.",
        "Twice more. In, in, and out.",
        "Let your eyes move around the room. Notice something you hadn't seen before.",
        "Feel your feet on the floor.",
        "Good. Carry this calm with you.",
      ],
      [
        "Keep your eyes open and soften your gaze.",
        "Double breath in through the nose. Long breath out, like a sigh.",
        "Again, slower this time.",
        "And a third. Let the breath out be the longest.",
        "Look at one thing near you, and one thing far away.",
        "That's your reset. Well done.",
      ],
    ],
  },
  {
    id: "studying",
    type: "task",
    label: "Before studying",
    shortLabel: "Before studying",
    hint: "Set one goal",
    title: "Ready to Study",
    category: "Study focus",
    breathing: BREATHING.counting,
    practice: "Set one study goal, then count breaths from 1 to 10",
    voice: VOICES.clear,
    minutes: 5,
    minuteOptions: [5, 10],
    eyesOpen: false,
    scripts: [
      [
        "Before you open your books, let's set one clear goal.",
        "Think of one thing you want to finish in this study time. Keep it small.",
        "Say it in your mind, like: I will finish this one chapter.",
        "Now breathe naturally, and count each breath out, from one to ten.",
        "If your mind runs to other work, return to one.",
        "Keep counting, calm and steady.",
        "Now open your eyes. Start with your one goal.",
      ],
      [
        "Sit up comfortably, and put your phone face down.",
        "Choose one goal for this session. Picture yourself finishing it.",
        "Now count your breaths. One on the breath out, then two, up to ten.",
        "Lost count? Start again at one. That's the practice.",
        "Each count brings your mind back to this room, this desk, this task.",
        "When you're ready, begin with the first small step of your goal.",
      ],
      [
        "Take a moment to arrive at your desk.",
        "What is the one thing you want to learn or finish? Hold it in mind.",
        "Let your breath be natural. Count each breath out, up to ten.",
        "If a worry comes, note it for later, and go back to one.",
        "Your mind is settling, like dust settling in still water.",
        "Keep the count going for a few more breaths.",
        "Now start, one page at a time.",
      ],
    ],
  },
  {
    id: "bedtime",
    type: "task",
    label: "Before sleep",
    shortLabel: "Before sleep",
    hint: "Wind down for bed",
    title: "Settle Into Sleep",
    category: "Sleep",
    breathing: BREATHING.fourSevenEight,
    practice: "Body scan, then a slow fading story",
    voice: VOICES.sleepy,
    minutes: 10,
    minuteOptions: [10, 15],
    eyesOpen: false,
    scripts: [
      [
        "Lie down and switch off the lights. The day is done.",
        "Breathe in for four, hold for seven, and breathe out for eight.",
        "Let your toes, feet and ankles grow heavy and warm.",
        "Now your legs and hips. Let them sink into the bed.",
        "Your belly softens. Your chest rises and falls slowly.",
        "Your shoulders, arms and hands let go.",
        "Your neck, your jaw and your eyes rest.",
        "Imagine walking through a quiet garden in the moonlight.",
        "The air smells of jasmine. Your steps grow slow and soft.",
        "You find a bench, and sit, and let the night hold you.",
      ],
      [
        "Let your head sink into the pillow.",
        "Breathe in for four. Hold for seven. Breathe out for eight, slow and long.",
        "Starting at your toes, let each part of you switch off, like lights in a house.",
        "Feet off. Legs off. Hips off.",
        "Back and belly, off. Chest, shoulders and arms, off.",
        "Neck and face, off. Only your breath is still awake.",
        "Picture a hill under a sky full of stars.",
        "A soft wind moves the grass. Far away, a bell rings once.",
        "Everything grows quiet, and you drift.",
      ],
      [
        "Get warm and comfortable under your blanket.",
        "In for four. Hold for seven. Out for eight.",
        "Notice your toes. Let them relax.",
        "Your legs grow heavy, as if made of warm sand.",
        "Your back, your belly and your chest settle.",
        "Your hands rest open. Your face is calm.",
        "Imagine a train moving slowly through the countryside at night.",
        "The carriage rocks gently. The windows show quiet fields and small lights.",
        "The sound of the wheels grows softer and softer.",
        "Let it carry you to sleep.",
      ],
    ],
  },
  {
    id: "break",
    type: "task",
    label: "Study break",
    shortLabel: "Study break",
    hint: "Rest your eyes",
    title: "Rest Your Eyes",
    category: "Study break",
    breathing: BREATHING.doubleSigh,
    practice: "Relax the eyes, neck and shoulders",
    voice: VOICES.bright,
    minutes: 2,
    minuteOptions: [2, 3],
    eyesOpen: false,
    scripts: [
      [
        "Step away from the screen for a moment.",
        "Breathe in through your nose, sip in a little more, then sigh it out.",
        "Close your eyes, or look at something far away. Let your eyes soften.",
        "Slowly tilt your head toward one shoulder, then the other.",
        "Roll your shoulders back three times, slow and easy.",
        "One more double breath in, and a long sigh out.",
        "Well done. Go back feeling a little lighter.",
      ],
      [
        "Time for a short break. You've earned it.",
        "Two quick breaths in, one long breath out.",
        "Rub your palms together until they're warm, and rest them over your closed eyes.",
        "Let your neck be loose. Nod slowly, yes, and then no.",
        "Lift your shoulders up, hold, and drop them.",
        "Breathe in, in again, and sigh it out.",
        "Now stretch your arms up, and go back to your work.",
      ],
      [
        "Put down your pen and sit back.",
        "Double breath in through the nose. Long sigh out through the mouth.",
        "Blink slowly a few times. Then look out of a window or across the room.",
        "Drop your chin toward your chest, and feel the back of your neck stretch.",
        "Let your shoulders fall away from your ears.",
        "One more sigh. Let the tension leave with it.",
        "Your break is done. Start again, fresh.",
      ],
    ],
  },
];

export const MOODS = MEDITATIONS.filter((m) => m.type === "mood");
export const TASKS = MEDITATIONS.filter((m) => m.type === "task");

export function findMeditation(id: string | null | undefined): Meditation | undefined {
  return MEDITATIONS.find((m) => m.id === id);
}

export function hasHold(m: Meditation): boolean {
  return m.breathing.phases.some((p) => p.kind === "hold");
}

/** Seconds in one full breathing cycle. */
export function cycleSeconds(b: Breathing): number {
  return b.phases.reduce((sum, p) => sum + p.seconds, 0);
}

/**
 * The lines the voice reads for one script. Patterns with a hold get the
 * comfort note once, right after the opening line.
 */
export function sessionLines(m: Meditation, variant: number): string[] {
  const script = m.scripts[((variant % m.scripts.length) + m.scripts.length) % m.scripts.length];
  return hasHold(m) ? [script[0], HOLD_NOTE, ...script.slice(1)] : script;
}

/** First line of the first script, for previews. */
export function previewLine(m: Meditation): string {
  return m.scripts[0][0];
}

// Walking meditations (planned) must always keep the eyes open (CLAUDE.md).
for (const m of MEDITATIONS) {
  if (/walk/i.test(m.id) && !m.eyesOpen) {
    throw new Error(`Meditation "${m.id}" is a walking practice and must set eyesOpen: true.`);
  }
}
