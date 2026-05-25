Original prompt: Làm sao làm cho webgame này chạy được nhỉ?

## Notes
- Repo originally only contained `index.jsx`, a React component using Tailwind utility classes.
- Added a minimal Vite + React + Tailwind scaffold so it can run locally with `npm run dev`.
- User preference: do not use Playwright unless explicitly requested.
- Verified `npm install`, `npm run build`, and local dev server HTML response at `http://localhost:5174/`.
- Updated the user's new `index.jsx` game version: restored quiz question generation/answer handling, added state export for the new pet/parents/whack-game flows, persisted pet evolution, and moved custom animations into `src/index.css`.
- Verified `npm run build` and local dev server HTML response again without browser automation.

## TODO
- Keep verification to build and non-browser terminal checks unless the user explicitly asks for browser automation.
- Keep `window.render_game_to_text` aligned when adding new game modes or parent controls.
