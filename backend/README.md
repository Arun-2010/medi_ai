# MediAI backend

Not built yet. This folder will hold the server-side code (build steps 2 and 3 in `CLAUDE.md`):

- AI route: takes mood + minutes and returns a meditation script
- Distress check: serious-distress text gets the Tele-MANAS (14416) message, not a meditation
- Supabase: login, mood journal, streaks

AI API keys live only here, in `.env.local`, never in the frontend.
