Original prompt: Làm sao làm cho webgame này chạy được nhỉ?

## Notes
- Repo originally only contained `index.jsx`, a React component using Tailwind utility classes.
- Added a minimal Vite + React + Tailwind scaffold so it can run locally with `npm run dev`.
- User preference: do not use Playwright unless explicitly requested.
- Verified `npm install`, `npm run build`, and local dev server HTML response at `http://localhost:5174/`.

## TODO
- Keep verification to build and non-browser terminal checks unless the user explicitly asks for browser automation.
- Added `window.render_game_to_text` and a fallback `window.advanceTime` hook for lightweight state inspection.
