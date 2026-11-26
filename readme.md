<p align="center">
  <img src="icons/icon-192.png" alt="MCU Tracker" width="80" height="80" style="border-radius: 16px;" />
</p>

<h1 align="center">MCU Tracker</h1>

<p align="center">
  <strong>The definitive companion app for the Marvel Cinematic Universe.</strong><br/>
  Track every film, series, and special — explore interactive timelines — test your knowledge — earn achievements.
</p>

<p align="center">
  <a href="https://mcu-tracker-pi.vercel.app/">Live App</a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#features">Features</a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#getting-started">Getting Started</a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#architecture">Architecture</a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#contributing">Contributing</a>
</p>

<br/>

---

## Why MCU Tracker?

The MCU now spans **55+ titles** across films, Disney+ series, and specials. Keeping track of what you've watched, figuring out the right viewing order, and remembering where each story fits in the timeline shouldn't require a spreadsheet.

MCU Tracker is a **free, privacy-first** web app that runs entirely in your browser. No account required. No data leaves your device. Just open the app, start tracking, and pick up right where you left off — on any device.

---

<h2 id="features">Features</h2>

### Watch Tracker
- Complete catalog of all MCU films, Disney+ series, and specials
- Toggle between **Release Order** and **Chronological Order**
- Three-state watch tracking: **Unwatched → Watched → Rewatched**
- 1–5 star personal ratings for every title
- Filter by watch status with instant search across all titles
- TMDB-sourced high-resolution posters for every entry

### Interactive Timeline
- Full editorial timeline with scroll-driven reveal animations
- Switch between **In-Universe Order** and **Release Order**
- Phase and Saga groupings with per-phase completion tracking
- Inline synopses, runtimes, and post-credit scene counts

### MCU Quizzes
- **Daily Challenge** — 5 new questions every day with streak tracking
- Category quizzes: General Knowledge, Guess the Villain, Guess the Quote, Phases & Sagas, Character Deep Dive
- Score history and best-score tracking per category

### Profile & Stats
- Personalized onboarding — set your name or hero alias on first visit
- Overall completion ring with per-phase milestone indicators
- Detailed per-phase progress bars with animated fill
- Total runtime watched vs. remaining
- **Shareable progress card** — generates a branded PNG on `<canvas>` with your stats, downloadable or shareable via the Web Share API

### Achievements
- 15 unlockable badges computed from your activity:
  - *First Watch*, *Phase 1–6 Complete*, *50% Club*, *Completionist*, *7-Day Quiz Streak*, and more
- Toast notifications on unlock
- Locked/unlocked visual states on Profile

### Upcoming Releases
- Live countdown to the next MCU premiere (days, hours, minutes)
- Powered by TMDB data with a 24-hour cache and hardcoded fallback list

### Progressive Web App
- **Installable** on desktop and mobile (Add to Home Screen)
- **Offline-capable** — full app shell cached via Service Worker
- Stale-while-revalidate caching for TMDB poster images
- Standalone display with native app-like experience

### Accessibility & Performance
- Full keyboard navigation with visible focus indicators
- ARIA labels and semantic HTML throughout
- Respects `prefers-reduced-motion` for all animations
- WCAG AA color contrast compliance
- Lazy-loaded images with skeleton loaders and graceful fallbacks
- Targeting Lighthouse 90+ across Performance, Accessibility, Best Practices, and SEO

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6) — zero frameworks, zero build tools |
| **Persistence** | `localStorage` — all data stays on-device |
| **Routing** | Hash-based SPA router (`#dashboard`, `#tracker`, `#timeline`, `#quizzes`, `#profile`) |
| **Posters & Data** | [TMDB API](https://www.themoviedb.org/) with client-side caching |
| **Icons** | [Lucide Icons](https://lucide.dev/) via CDN |
| **Typography** | Barlow Condensed · Inter · JetBrains Mono (Google Fonts) |
| **PWA** | `manifest.webmanifest` + Service Worker with precached app shell |
| **Hosting** | [Vercel](https://vercel.com/) |

---

<h2 id="getting-started">Getting Started</h2>

### Use it now

**[→ Open MCU Tracker](https://mcu-tracker-pi.vercel.app/)**

No sign-up. No install. Works in any modern browser.

### Run locally

The project is entirely static — no build step, no `npm install` required.

**Option A — Open directly**
```
Open index.html in any modern browser.
```

**Option B — Local dev server**
```bash
npx serve .
# → http://localhost:3000
```

**Option C — Python**
```bash
python -m http.server 8000
# → http://localhost:8000
```

> **Note:** A TMDB API key is included for poster fetching. For production forks, replace it with your own key from [themoviedb.org](https://www.themoviedb.org/settings/api) and consider proxying requests through a serverless function (e.g., Vercel API Routes) to avoid client-side key exposure.

---

<h2 id="architecture">Architecture</h2>

### Project Structure

```
marvel-tracker/
├── index.html                 # Single-page application shell
├── manifest.webmanifest       # PWA manifest
├── sw.js                      # Service Worker (precache + poster caching)
│
├── css/
│   ├── variables.css          # Design tokens (colors, typography, spacing)
│   ├── base.css               # Reset, global styles
│   ├── components.css         # Reusable UI components
│   ├── layout.css             # Navigation, page container, responsive grid
│   └── pages.css              # Page-specific styles (tracker, timeline, quiz, profile)
│
├── js/
│   ├── data.js                # MCU title catalog (55 titles) + quiz question bank
│   ├── tmdb.js                # TMDB API integration + poster cache + known poster map
│   ├── storage.js             # localStorage abstraction (all read/write operations)
│   ├── tracker.js             # Watch Tracker page (filters, search, ordering)
│   ├── timeline.js            # Interactive Timeline (IntersectionObserver, scroll behavior)
│   ├── quiz.js                # Quiz engine (daily challenge, categories, scoring)
│   ├── profile.js             # Profile page (stats, badges, phase bars)
│   ├── share.js               # Canvas-based progress card generation + Web Share API
│   ├── upcoming.js            # Upcoming releases with live countdown
│   ├── details.js             # Title detail view (cast, crew, backdrop)
│   ├── animations.js          # Animated counter utilities
│   ├── pwa.js                 # Service Worker registration + install prompt
│   └── app.js                 # SPA router, dashboard, navigation, onboarding
│
└── icons/
    ├── icon.svg               # Source icon
    ├── icon-192.png            # PWA icon (192×192)
    └── icon-512.png            # PWA icon (512×512)
```

### Data Persistence

All user data is stored in `localStorage` under namespaced keys:

| Key | Purpose |
|---|---|
| `mcu_watch_status` | Watch state per title (`unwatched` / `watched` / `rewatched`) |
| `mcu_ratings` | 1–5 star ratings per title |
| `mcu_rewatch` | Rewatch count per title |
| `mcu_username` | User's display name or hero alias |
| `mcu_onboarded` | Whether onboarding has been completed |
| `mcu_watch_order` | Preferred sort order (`release` / `chronological`) |
| `mcu_quiz_scores` | Quiz attempt history (category, score, date) |
| `mcu_daily_quiz` | Daily quiz completion log |
| `mcu_streak` | Current and best quiz streak |
| `mcu_unlocked_badges` | Array of earned badge IDs |

### Design System

The visual language is intentionally cinematic and restrained — no comic-book clichés, no halftones, no gratuitous gradients.

| Token | Value | Usage |
|---|---|---|
| `--color-void` | `#0B0B0F` | Primary background |
| `--color-surface` | `#16161D` | Card and panel backgrounds |
| `--color-hero-red` | `#E21B22` | Actions, watched state, primary buttons |
| `--color-infinity-gold` | `#C9A227` | Achievements, rewards, phase indicators |
| `--color-text-primary` | `#F5F5F7` | Headings and primary content |
| `--color-text-secondary` | `#9B9BA5` | Supporting text |
| `--color-border` | `#2A2A34` | Subtle dividers and card borders |

**Typography:** Barlow Condensed (display), Inter (body), JetBrains Mono (stats & numerals).

---

## Browser Support

| Browser | Minimum Version |
|---|---|
| Chrome / Edge | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Mobile Safari (iOS) | 15+ |
| Chrome for Android | 90+ |

---

<h2 id="contributing">Contributing</h2>

Contributions are welcome. Please keep the following constraints in mind:

1. **No frameworks or build tools.** The project is intentionally vanilla HTML/CSS/JS.
2. **No external runtime dependencies.** CDN-loaded assets (fonts, icons) are acceptable; npm packages are not.
3. **Preserve the existing `localStorage` keys.** Users should never lose their data after an update.
4. **Maintain WCAG AA compliance.** All text must meet minimum contrast ratios; interactive elements must be keyboard-accessible.
5. **Test across pages.** Changes to shared modules (`storage.js`, `tmdb.js`, `data.js`) affect every section of the app.

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/marvel-tracker.git
cd marvel-tracker

# Start a local server
npx serve .

# Open in browser
# → http://localhost:3000
```

---

## Roadmap

- [ ] Vercel serverless proxy for TMDB API key
- [ ] Cloud sync (optional sign-in to back up progress)
- [ ] Social sharing — compare progress with friends
- [ ] Spoiler-free mode for newcomers
- [ ] Multi-language support
- [ ] Advanced stats (average rating, genre breakdown, director stats)

---

## Acknowledgements

- **[TMDB](https://www.themoviedb.org/)** — This product uses the TMDB API but is not endorsed or certified by TMDB. Poster images, cast data, and release information are sourced from their public API.
- **[Lucide](https://lucide.dev/)** — Beautiful, consistent open-source icons.
- **[Google Fonts](https://fonts.google.com/)** — Barlow Condensed, Inter, and JetBrains Mono typefaces.
- **[Vercel](https://vercel.com/)** — Hosting and deployment.

---

## License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  <sub>
    <strong>Disclaimer:</strong> This is an unofficial fan project. Not affiliated with, endorsed by, or sponsored by Marvel Studios, The Walt Disney Company, or any of their subsidiaries. No official logos, movie posters, or copyrighted character art are stored in this repository. All synopses and quiz questions are originally written fan-created content. TMDB poster images are fetched at runtime via their public API and are not bundled with this project.
  </sub>
</p>
