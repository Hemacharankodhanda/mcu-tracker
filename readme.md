
# MCU Tracker

A premium, fully client-side companion app for Marvel Cinematic Universe fans. Track what you've watched, scroll through an editorial-style interactive timeline, test your knowledge with quizzes, and unlock badges across all 55 titles in the MCU.

> This is an unofficial fan project. Not affiliated with, endorsed by, or sponsored by Marvel Studios or The Walt Disney Company.

---

## Features

- **Watch Tracker** — Mark all 55 MCU titles as Unwatched, Watched, or Rewatched, rate each one 1–5 stars, and browse by Release Order, Chronological Order, or a curated Recommended order for newcomers.
- **Interactive Timeline** — A sticky-scroll, editorial-style layout: a pinned poster crossfades on the left while large kinetic typography scrolls past on the right.
- **Quizzes** — Five trivia categories, a daily challenge with streak tracking, and full score history.
- **Profile & Badges** — Watch stats, saga/phase progress bars, quiz performance, and a 12-badge achievement grid.
- **Real poster art** — Pulled from [TMDB](https://www.themoviedb.org/) and cached locally, so each title is only fetched once.
- **Fully client-side** — No backend, no build step. All progress lives in `localStorage`.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Structure | Vanilla HTML — single-page app with hash-based routing |
| Styling | Vanilla CSS — design tokens via custom properties, no framework |
| Logic | Vanilla JavaScript — no bundler, no build step |
| Data | Static MCU catalog (`data.js`) + [TMDB API](https://developers.themoviedb.org/3) for posters |
| Persistence | Browser `localStorage` — no backend or database |
| Fonts | Barlow Condensed (display), Inter (body), JetBrains Mono (stats/numerals) — via Google Fonts |

No `npm install`, no build pipeline — it just runs in a browser.

---

## Getting Started

### Run it locally

**Option A — Open directly**
```bash
open index.html
```
Zero setup required, but poster fetching and other fetch-based features behave more reliably over `http(s)://` than `file://`.

**Option B — Local server (recommended)**
```bash
npx serve .
```
Then visit `http://localhost:3000`.

### Set up poster images (TMDB)

Posters are fetched from TMDB and cached in `localStorage` after the first load.

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/).
2. Go to **Settings → API → Request an API Key** (choose "Developer" for free, non-commercial use).
3. Copy your **API Key (v3 auth)**.
4. Add it to `js/tmdb.js`:
   ```javascript
   const TMDB_API_KEY = 'YOUR_KEY_HERE';
   ```
5. On first load, the app looks up and caches a poster for each title. Every visit after that reads from the cache — no repeat API calls.

If a poster fails to fetch (offline, rate-limited, no match found), the app falls back to a gradient placeholder instead of breaking the layout.

---

## Project Structure

```
marvel-tracker/
├── index.html                  # Single-page HTML entry point (SPA)
├── README.md                   # This file
├── MCU-Tracker-PRD.md          # Product Requirements Document
├── MCU-Tracker-design.md       # Design system & UI guidelines
├── PROJECT-CONTEXT.md          # Detailed architecture & data reference
│
├── css/
│   ├── variables.css           # Design tokens (colors, typography, spacing, radii, transitions)
│   ├── base.css                # Reset, typography defaults, focus styles, reduced-motion rules
│   ├── components.css          # Reusable UI components (buttons, cards, chips, badges, etc.)
│   ├── layout.css              # App shell, grid system, navigation, responsive breakpoints
│   └── pages.css                # Page-specific styles (Dashboard, Tracker, Timeline, Quizzes, Profile)
│
├── js/
│   ├── data.js                  # MCU title catalog (55 titles) + quiz data (50+ questions)
│   ├── storage.js               # localStorage abstraction for all persistence
│   ├── tmdb.js                  # TMDB API integration + poster caching
│   ├── animations.js            # Shared animation helpers (counters, reveal-on-scroll, etc.)
│   ├── app.js                   # Hash-based SPA router, dashboard rendering, initialization
│   ├── tracker.js               # Watch tracker page logic
│   ├── timeline.js              # Sticky-scroll interactive timeline
│   ├── quiz.js                  # Quiz engine (categories, player, daily quiz, scoring, streaks)
│   └── profile.js               # Profile page (stats, badges, progress bars)
│
└── assets/                      # Reserved for icons/generated assets
```

---

## Data & Persistence

Everything lives in the browser — there's no server or database. Clearing this site's `localStorage` resets all progress.

| Key | Description |
|---|---|
| `mcu_watch_status` | Watch state (unwatched/watched/rewatched) per title |
| `mcu_ratings` | Star rating per title |
| `mcu_rewatch` | Rewatch count per title |
| `mcu_quiz_scores` | Quiz attempt history |
| `mcu_streak` | Daily quiz streak (current, best, last completed date) |
| `mcu_daily_quiz` | Daily quiz completion record, per date |
| `mcu_username` | Display name |
| `mcu_poster_cache` | Cached TMDB poster paths per title |

---

## Roadmap

Currently a fully client-side MVP. Planned next (see `MCU-Tracker-PRD.md` for full detail):

- **P1** — Supabase backend for auth and cross-device sync, global/friends leaderboards, Character Hub, group watch tracking, release countdowns
- **P2** — Crowd-sourced quiz questions, easter egg tracker, fan theories board, personality quiz, rewatch scheduler

---

## Legal & Attribution

- No official Marvel/Disney logos, posters, or trademarked assets are bundled with this project — poster art is fetched live from TMDB at runtime.
- This product uses the TMDB API but is not endorsed or certified by TMDB.
- All quiz questions and title synopses are original content, not copied from official sources.
- This is an unofficial, non-commercial fan project.

---

## License

Personal project — no license specified yet. Add one (e.g. MIT) if you plan to make the repo public and want to clarify reuse terms.
