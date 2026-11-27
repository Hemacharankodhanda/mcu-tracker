<div align="center">
  <img src="icons/icon-192.png" alt="MCU Tracker Logo" width="84" height="84" />
  <h1>MCU Tracker</h1>
  <p>
    <strong>The privacy-first companion app for the Marvel Cinematic Universe.</strong><br />
    Track every film, series, and special — explore interactive timelines — test your trivia knowledge — unlock achievements.
  </p>

  <p>
    <a href="https://mcu-tracker-pi.vercel.app/">
      <img src="https://img.shields.io/badge/Live_App-mcu--tracker--pi.vercel.app-E21B22?style=flat-square&logo=vercel&logoColor=white" alt="Live App on Vercel" />
    </a>
    <img src="https://img.shields.io/badge/Stack-Vanilla_HTML%2FCSS%2FJS-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="Vanilla JS" />
    <img src="https://img.shields.io/badge/PWA-Offline_Ready-C9A227?style=flat-square&logo=pwa&logoColor=white" alt="PWA Ready" />
    <img src="https://img.shields.io/badge/Accessibility-WCAG_AA-2FAE66?style=flat-square" alt="WCAG AA" />
    <img src="https://img.shields.io/badge/Data-TMDB_API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white" alt="TMDB API" />
  </p>

  <p>
    <a href="https://mcu-tracker-pi.vercel.app/"><strong>Launch App</strong></a>
    &nbsp;&middot;&nbsp;
    <a href="#features">Features</a>
    &nbsp;&middot;&nbsp;
    <a href="#getting-started">Getting Started</a>
    &nbsp;&middot;&nbsp;
    <a href="#architecture">Architecture</a>
    &nbsp;&middot;&nbsp;
    <a href="#accessibility--performance">Performance</a>
    &nbsp;&middot;&nbsp;
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## Overview

Spanning **55 titles** across **6 Phases** and **2 Sagas** (**39 Movies**, **14 Series**, and **2 Specials**), keeping up with the Marvel Cinematic Universe shouldn't require juggling spreadsheets or ads-heavy wikis.

**MCU Tracker** is a fast, zero-framework, installable Progressive Web App (PWA) designed with a restrained dark streaming aesthetic (`#0B0B0F`). Every watch status, rewatch count, quiz score, and achievement is stored locally in your browser — **no sign-up, no tracking accounts, and full offline support after your first visit**.

---

## Features

### Home Dashboard (`#dashboard`)
- **Personalized Hero & Progress Ring:** Displays your chosen hero alias, overall MCU completion percentage, and per-phase milestone indicators around the progress ring.
- **At-a-Glance Stats:** Animated counters for Titles Watched, Watch Time (hours), Quizzes Taken, and current Day Streak.
- **Upcoming MCU Release Countdown:** Live countdown timer (days, hours, minutes) to the next theatrical premiere, backed by TMDB discovery with a 24-hour local cache and curated fallback slate.
- **Saga Progress & Recent Releases:** Live progress bars for the *Infinity Saga* and *Multiverse Saga*, plus quick access to the latest releases.

### Watch Tracker (`#tracker`)
- **Dual Watch Orders:** Instant segmented toggle between **Release Order** and **Chronological Order**, persisted across sessions while sharing a single watch-state map keyed by title ID.
- **Three-State Tracking:** Cycle effortlessly through **Unwatched (`○`) → Watched (`✓`) → Rewatched (`↻`)** with automatic rewatch counting.
- **Instant Search & Filtering:** Debounced, case-insensitive title search paired with **Status** filters (`All`, `Watched`, `Unwatched`) and clear empty states.
- **Instant Posters:** All 55 verified TMDB poster paths bundled for immediate first-frame rendering with skeleton loaders and graceful fallbacks.

### Interactive Timeline (`#timeline`)
- **Scroll-Driven Editorial Layout:** `IntersectionObserver`-powered reveal and active-focus transitions across all 55 titles.
- **Order Switching:** Toggle between **In-Universe Order** and **Release Order**.
- **Rich Context:** Phase and Saga groupings, release years, runtimes, post-credit scene counts, synopses, and inline watch toggles.

### Title Details (`#details/<id>`)
- **Deep TMDB Metadata:** Cast, crew, high-resolution backdrops, runtime, synopsis, post-credit count, and quick watch toggling for every title.

### Quizzes & Trivia (`#quizzes`)
- **Daily Challenge:** 5 fresh questions every day tied to your current and best **Day Streak**.
- **5 Topic Categories:** *General MCU Knowledge*, *Guess the Villain*, *Guess the Quote*, *MCU Phases & Sagas*, and *Character Deep Dive*.
- **Score Tracking:** Tracks attempts, averages, perfect scores, and best score per category.

### Profile, Achievements & Sharing (`#profile`)
- **First-Visit Onboarding:** Prompts for your name or hero alias on launch (with quick-select hero suggestions) and personalizes your Dashboard, Profile, and Share Card. Click your profile name anytime to update it.
- **Detailed Runtime & Phase Analytics:** Overall completion ring, total runtime watched vs. remaining, and animated progress bars for Phases 1–6.
- **15 Unlockable Badges:** Computed automatically from your progress (*First Watch*, *Phase 1–6 Complete*, *50% Club*, *Completionist*, *Infinity Saga*, *Multiverse Saga*, *3-Day Streak*, *7-Day Quiz Streak*, *Perfect Score*, and *Quiz Master*) with unlock toast notifications.
- **Shareable Progress Card:** Renders a custom 800×1000 PNG summary card natively on `<canvas>` (no external libraries) with one-click **Download PNG** and **Web Share API** support where available.

### Collapsible Navigation & PWA
- **Responsive Navigation:** Collapsible desktop sidebar (`Ctrl+B` shortcut) and collapsible mobile bottom bar with persistent state.
- **Installable App:** `manifest.webmanifest` (`standalone` mode, `#0B0B0F` theme color, `192×192` & `512×512` icons) with an **Install App** trigger on `beforeinstallprompt`.
- **Offline Ready:** Service Worker (`sw.js`) precaches the app shell using a Network-First strategy (with Cache Fallback) and serves TMDB posters via Stale-While-Revalidate.

---

## Tech Stack

| Layer | Implementation |
|---|---|
| **Core** | Vanilla HTML5, CSS3, JavaScript (ES6) — zero UI frameworks, zero build step |
| **State & Persistence** | Browser `localStorage` & `sessionStorage` — 100% client-side, zero backend required |
| **Routing** | Hash-based SPA router (`#dashboard`, `#tracker`, `#timeline`, `#quizzes`, `#profile`, `#details/<id>`) |
| **Media & Metadata** | [TMDB API](https://www.themoviedb.org/) via secure Vercel Serverless proxy (`/api/tmdb`) + bundled poster mapping |
| **Graphics & Sharing** | Native HTML5 `<canvas>` generator + Web Share API |
| **Icons & Fonts** | [Lucide Icons](https://lucide.dev/), Barlow Condensed, Inter, JetBrains Mono |
| **PWA & Caching** | Web App Manifest + Service Worker (`sw.js`) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## Getting Started

### Use Online

Open the live deployment directly in any modern desktop or mobile browser:
**[https://mcu-tracker-pi.vercel.app/](https://mcu-tracker-pi.vercel.app/)**

### Run Locally

Because the application ships pure static HTML, CSS, and JS with no build pipeline, you can serve the directory directly with any static HTTP server (recommended so Service Worker and ES/asset paths resolve cleanly):

```bash
# 1. Clone the repository
git clone https://github.com/Hemacharankodhanda/mcu-tracker.git
cd mcu-tracker

# 2. Serve locally (choose any static server)
npx serve .
# -> http://localhost:3000
```

Or with Python:

```bash
python -m http.server 8000
# -> http://localhost:8000
```

> **TMDB API Key Configuration:** For production deployments on Vercel, set your TMDB API key in **Vercel Project Settings → Environment Variables** as `TMDB_API_KEY`. The serverless function at `/api/tmdb` securely attaches this key on Vercel's servers so it is never exposed in client bundles. For local static development without Vercel CLI, all 55 verified posters and upcoming releases use bundled data and curated fallbacks automatically.

---

## Architecture

### Project Structure

```text
mcu-tracker/
├── api/
│   └── tmdb.js                # Vercel Serverless Function (secure TMDB API proxy + Edge cache)
├── index.html                 # App shell, navigation, SPA sections & onboarding modal
├── manifest.webmanifest       # PWA manifest (standalone, theme #0B0B0F, icons)
├── sw.js                      # Service Worker (app shell precache + TMDB poster caching)
├── package.json               # Optional Vercel Analytics dependency metadata
├── update_data.js             # Utility script used to map TMDB IDs into data.js
│
├── css/
│   ├── variables.css          # Design tokens (palette, typography scale, spacing)
│   ├── base.css               # CSS reset, accessibility focus styles, base rules
│   ├── components.css         # Cards, chips, modals, progress rings, skeleton loaders
│   ├── layout.css             # Collapsible sidebar/bottom nav & responsive page layout
│   └── pages.css              # Page-specific styles (Dashboard, Tracker, Timeline, Quiz, Profile)
│
├── js/
│   ├── data.js                # Catalog of 55 MCU titles + 5 quiz categories & questions
│   ├── tmdb.js                # TMDB poster & details fetching, cache & known poster map
│   ├── storage.js             # localStorage abstraction, watch stats & HTML escaping
│   ├── tracker.js             # Watch Tracker (Release/Chronological order, search, status filter)
│   ├── timeline.js            # Editorial Timeline (IntersectionObserver & scroll reveal)
│   ├── quiz.js                # Daily Challenge & category quiz engine
│   ├── profile.js             # Profile stats, runtime breakdown & 15 achievement badges
│   ├── share.js               # Native <canvas> progress card renderer, PNG export & Web Share
│   ├── upcoming.js            # Upcoming MCU release countdown + 24h TMDB cache
│   ├── details.js             # Title detail view (cast, crew, backdrop, post-credits)
│   ├── animations.js          # Counter & progress bar animations
│   ├── pwa.js                 # Service Worker registration & install prompt UI
│   └── app.js                 # Hash router, Dashboard, collapsible nav & onboarding flow
│
└── icons/
    ├── icon.svg               # Vector source icon
    ├── icon-192.png            # PWA icon (192x192)
    └── icon-512.png            # PWA icon (512x512)
```

### Local Storage Schema

All user progress is persisted locally under stable keys:

| Key | Type | Description |
|---|---|---|
| `mcu_watch_status` | `JSON Object` | Per-title watch state (`unwatched` \| `watched` \| `rewatched`) |
| `mcu_ratings` | `JSON Object` | Per-title 1–5 star ratings |
| `mcu_rewatch` | `JSON Object` | Per-title rewatch counts |
| `mcu_username` | `String` | User's chosen name or hero alias |
| `mcu_onboarded` | `String` | Onboarding completion flag (`"true"`) |
| `mcu_watch_order` | `String` | Selected Tracker order (`"release"` \| `"chronological"`) |
| `mcu_quiz_scores` | `JSON Array` | Quiz attempt history (`categoryId`, `score`, `total`, `date`) |
| `mcu_daily_quiz` | `JSON Object` | Daily Challenge completion log keyed by `YYYY-MM-DD` |
| `mcu_streak` | `JSON Object` | Current streak, best streak, and last active date |
| `mcu_unlocked_badges` | `JSON Array` | Unlocked achievement badge IDs |
| `mcu_nav_collapsed` | `String` | Navigation bar collapse state (`"true"` \| `"false"`) |
| `mcu_poster_cache_v8` | `JSON Object` | Cached TMDB poster paths keyed by title ID |
| `mcu_upcoming_cache_v2` | `JSON Object` | Cached upcoming MCU releases with 24-hour TTL |

### Design Tokens

MCU Tracker avoids loud comic-book clichés in favor of a focused, cinema-grade dark UI:

| Token | Hex | Role |
|---|---|---|
| `--color-void` | `#0B0B0F` | Primary canvas & PWA theme color |
| `--color-surface` | `#16161D` | Elevated card & panel surfaces |
| `--color-surface-raised` | `#1F1F29` | Interactive controls & modal fields |
| `--color-hero-red` | `#E21B22` | Primary actions, watched state & active indicators |
| `--color-infinity-gold` | `#C9A227` | Achievements, star ratings, streaks & rewatched accents |
| `--color-text-primary` | `#F5F5F7` | Primary headings & copy |
| `--color-text-secondary` | `#9B9BA5` | Secondary metadata |
| `--color-text-muted` | `#8A8A96` | Captions & labels (WCAG AA compliant) |
| `--color-border` | `#2A2A34` | Hairline dividers & container borders |

---

## Accessibility & Performance

- **Keyboard Navigation:** Full keyboard support across navigation, filters, title cards, and `Enter` / `Space` watch toggles with clear focus rings.
- **Screen Readers:** Semantic landmarks (`<nav>`, `<main>`, `<section>`), `aria-label`, `aria-pressed`, `aria-modal`, and `role` attributes.
- **Reduced Motion:** Honors `@media (prefers-reduced-motion: reduce)` across animations, progress bars, and timeline transitions.
- **Contrast & Layout Stability:** WCAG AA contrast palette (`#8A8A96`+ on `#0B0B0F`/`#16161D`), explicit image dimensions (`width` / `height`), `loading="lazy"`, and shimmer skeletons to prevent layout shift.

---

## Browser Support

| Browser | Supported Versions |
|---|---|
| Google Chrome / Microsoft Edge | 90+ (Desktop & Android) |
| Mozilla Firefox | 90+ |
| Apple Safari | 15+ (macOS & iOS) |

---

## Contributing

Contributions, bug reports, and catalog updates for upcoming MCU phases are welcome.

1. Fork the repository and create a feature branch (`git checkout -b feat/your-feature`).
2. Keep the codebase **pure vanilla HTML, CSS, and JS** — do not introduce frameworks or build steps.
3. **Never rename or break existing `localStorage` keys** (`mcu_watch_status`, `mcu_ratings`, etc.) so returning users keep their history intact.
4. Ensure any new UI meets **WCAG AA contrast** and supports keyboard navigation + `prefers-reduced-motion`.
5. Verify all sections (`#dashboard`, `#tracker`, `#timeline`, `#quizzes`, `#profile`, `#details`) load with **zero browser console errors** before opening a pull request.

---

## Acknowledgements

- **[TMDB](https://www.themoviedb.org/)** — Movie & series posters, cast, crew, backdrops, and upcoming release data. *This product uses the TMDB API but is not endorsed or certified by TMDB.*
- **[Lucide](https://lucide.dev/)** — Clean open-source iconography.
- **[Google Fonts](https://fonts.google.com/)** — *Barlow Condensed*, *Inter*, and *JetBrains Mono*.
- **[Vercel](https://vercel.com/)** — Production hosting and deployment.

---

<p align="center">
  <sub>
    <strong>Disclaimer:</strong> This is an unofficial fan project. Not affiliated with, endorsed by, or sponsored by Marvel Studios, The Walt Disney Company, or any of their subsidiaries. No copyrighted media is stored in this repository; poster artwork and metadata are retrieved at runtime from TMDB, and all quiz questions and editorial synopses are fan-written.
  </sub>
</p>
