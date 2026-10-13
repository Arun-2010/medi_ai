# MediAI frontend

Landing page for MediAI, built with Next.js (App Router), Tailwind CSS and Framer Motion.

## Run it

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Layout

- `app/` — layout, global styles (design tokens in `globals.css`) and the home page
- `components/` — `Nav`, `Hero`, `TryItNow` (client components) and the static sections in `Sections.tsx`
- `lib/moods.ts` — the six moods, their session titles and the short prewritten scripts read by the voice guide
- `public/mascot.png` — the meditating sage
