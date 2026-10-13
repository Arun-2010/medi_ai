# MediAI — Project Guide for Claude

This file gives Claude the full context of the MediAI project. Read it before making changes.

## What MediAI is

MediAI is an **AI meditation website**. The user shares how they feel (mood) and how much time they have, and MediAI creates a guided meditation for that moment, with a calm voice and a breathing guide.

- **It is a meditation and relaxation app, NOT a medical or health app.**
- Never add features or copy about symptoms, medicines, diagnosis, treatment, "health questions", "reliable guidance" or "24/7 support".
- Tagline: "Your AI meditation guide"
- Hero headline: "Tell us how you feel. Get a meditation made for you."

## Safety rules (always follow)

- Every page footer shows: "MediAI is for relaxation and everyday stress. It is not medical advice or a replacement for professional care. If you are in distress, call Tele-MANAS at 14416."
- If a user's mood text shows serious distress (for example self-harm or suicidal thoughts), do NOT generate a meditation. Show a calm, kind message with the Tele-MANAS helpline (14416, India) instead.
- If the user's text mentions driving, do NOT start a meditation. Show: "Please wait until you've stopped safely, then come back."
- Walking meditations (later) must always be eyes open (`eyesOpen: true`).
- Never put AI API keys in frontend code. All AI calls go through server-side API routes, with keys in `.env.local` (never committed to Git).

## Target users

1. Students with exam stress (main focus, India)
2. Working professionals with stress and poor sleep
3. Beginners who find meditation boring or confusing

## Features

1. **Mood check-in → custom meditation.** User picks a mood or types a line; AI writes a session for that mood and length.
2. **Calm voice guide.** Browser text-to-speech reads the session. Planned languages: English, Hindi, Telugu.
3. **Breathing coach.** Animated circle that grows and shrinks (box breathing, 4-7-8 breathing).
4. **Sleep mode.** Bedtime stories and body scans that fade out slowly.
5. **Mood journal.** One line after each session; show patterns over weeks.
6. **60-second calm.** One-tap quick reset.
7. Streaks and gentle reminders (later).

## Moods (used in hero cards and the "Try it" picker)

| id | Label | Session title | Length |
|---|---|---|---|
| stressed | Feeling stressed | Let It Settle | 5 min |
| sleep | Can't sleep | Drift Into Sleep | 10 min |
| exam | Exam nerves | Calm Before the Exam | 5 min |
| focus | Need focus | One Clear Task | 7 min |
| low | Feeling low | Be Gentle With Yourself | 8 min |
| quick | Short on time | Calm in 60 Seconds | 1 min |

## Meditation types

Every session uses its own breathing pattern and practice. It is never plain "breathe in, breathe out".
All of this lives in `lib/meditations.ts` (one config per mood and task). Read it from there; never hardcode
patterns, titles or lengths in components.

**Moods** (home tab "How I feel")

| Mood | Breathing pattern | Main practice | Length |
|---|---|---|---|
| Feeling stressed | in 4, out 6 | relax body part by part (jaw, shoulders, hands) | 5 min |
| Can't sleep | 4-7-8 (in 4, hold 7, out 8), very slow | body scan toes to head, then slow fading story | 10 min |
| Exam nerves | box (in 4, hold 4, out 4, hold 4) | 5-4-3-2-1 grounding + calm confident reminders | 5 min |
| Need focus | natural, count 1 to 10 | count breaths, restart at 1 when mind wanders | 7 min |
| Feeling low | slow natural | kindness practice, hand on chest, gentle words | 8 min |
| Short on time | two quick sighs (double in, long out) | 3 breaths + look around the room | 1 min |

**Tasks** (home tab "What I'm doing")

| Task | Breathing pattern | Main practice | Length |
|---|---|---|---|
| Before studying | natural, count 1 to 10 | set one goal, then count breaths | 5 min |
| Before sleep | 4-7-8, very slow | body scan + slow fading story | 10–15 min |
| Study break | two quick sighs | relax eyes, neck, shoulders | 2–3 min |

Later tasks (do not build yet): Before exam/interview, Waking up, Walking (eyes open), After an argument.

**Rules**
- The breathing circle follows the exact pattern: grows on "in", stays still on "hold", shrinks on "out",
  with the exact seconds. The text inside reads "Breathe in" / "Hold" / "Breathe out". The technique name
  (for example "Box breathing") shows under the session title. With `prefers-reduced-motion`, the circle
  stays still and only the text changes.
- Each mood and task has 3 prewritten fallback scripts, each using its own technique. Sessions rotate
  through them so the same script does not repeat back to back.
- Any pattern with a hold (4-7-8, box) must say once: "If holding your breath feels uncomfortable, just
  breathe slowly." The app adds this line automatically; do not write it into scripts.
- AI prompt (when AI is added): include the mood or task, technique, breathing pattern, minutes and the
  user's own words, so each session is fresh but follows the right technique. See `lib/prompt.ts`.

## Tech stack

- **Framework:** Next.js (App Router) + React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (breathing circle, floating cards)
- **Voice:** Web Speech API (`speechSynthesis`), free and built into browsers
- **Backend:** Next.js API routes (`app/api/.../route.ts`). No separate server.
- **AI:** An AI API with a free tier (for example Gemini or Groq), called only from API routes
- **Database + login (step 3):** Supabase (auth, journal, streaks, session history)
- **Hosting:** Vercel (free hobby plan), deployed from GitHub
- **App:** PWA (manifest + service worker) so users can "Add to Home Screen". Play Store later via Capacitor.

## Budget

The founder has no budget. Prefer free tools and free tiers. Avoid paid services unless asked. As a no-cost fallback for AI, keep 20–30 prewritten meditation scripts and pick one by mood.

## Build order

1. **Landing page + core experience:** mood picker, breathing circle, voice reading prewritten scripts. No AI or backend yet.
2. **AI:** API route that takes mood + minutes and returns a meditation script.
3. **Supabase:** login, mood journal, streaks.
4. **PWA + deploy** on Vercel.

## Design system

Warm, calm, cream-and-clay look.

**Colors**
- Background (cream): `#F7EDE3`
- Soft surface: `#FBF4EC`
- Card: `#FFF9F3`, border `#EBD9C8`
- Text (dark brown): `#2B1B12`
- Muted text: `#6E5646`, secondary links `#5A4436`
- Accent (clay): `#B4531F`, hover `#8E3F15`
- Accent light (on dark): `#F0A877`
- Button soft: `#EFDCCB`
- Dark section background: `#2B1B12`, dark card `#3A2619`

**Fonts** (Google Fonts)
- Headings: **Fraunces** (serif), weight 500–600
- Body: **Figtree** (sans), weight 400–700

**Shapes**
- Cards: rounded 20–24px, soft brown shadow `0 14px 34px rgba(120,70,30,0.09)`
- Buttons: pill shape (fully rounded), primary = clay background + white text
- Icons: simple line (stroke) icons in clay color. No emoji.

**Mascot**
- A calm cartoon sage (guru) meditating cross-legged, shown in a rounded cream box in the hero. File: `public/mascot.png`.

## Landing page structure

1. **Nav:** MediAI logo (Medi + "AI" in clay) · How it works · Features · Try a session · Sign in · Get started
2. **Hero:** Guru mascot in the center, with **6 floating mood cards in a tilted arc, 3 on the LEFT and 3 on the RIGHT of the image** (never below it). Left: Feeling stressed, Can't sleep, Exam nerves. Right: Need focus, Feeling low, Short on time. Cards tilt outward (about 14–20°). Faint circle arcs in the background. Then: eyebrow, headline, subtext, "Start a free session →" button, "See how it works →" link, "Free to start · No app download needed".
   - On phones the cards stay on both sides, smaller, showing title only.
3. **How it works:** 3 steps: Share your mood → AI creates your session → Breathe and listen.
4. **Features:** 6 cards (see Features list).
5. **Try it now** (dark section): mood buttons; clicking one updates a session preview card with a breathing circle, length, title and first line.
6. **Final call to action:** "Take one calm breath with us today"
7. **Footer:** logo, wellness note with Tele-MANAS 14416, links (How it works, Privacy, Contact)

## Writing style for app text

- Short, calm, kind sentences. Simple English.
- No invented numbers, user counts or fake testimonials.
- No medical promises.

## Coding conventions

- TypeScript, functional React components.
- Accessibility: real `<button>` and `<a>` elements, `aria-label` on icon-only buttons, text contrast at least 4.5:1, touch targets at least 44px.
- Respect `prefers-reduced-motion` (stop the breathing and floating animations).
- Mobile-first and responsive. No horizontal scrolling on phones.
- Keep secrets in `.env.local`; add it to `.gitignore`.
