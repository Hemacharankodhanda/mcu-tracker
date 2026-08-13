# MCU Tracker — Project Context & Documentation

**Version:** 1.0 MVP  
**Created:** August 2026  
**Stack:** Vanilla HTML / CSS / JavaScript (no framework, no build step)  
**Persistence:** localStorage (no backend)

---

## 1. What Is This?

MCU Tracker is a premium companion web app for Marvel Cinematic Universe fans. It lets users:

- **Track** what they've watched across 55 MCU titles (movies, series, specials)
- **Explore** interactive timelines in chronological or release order
- **Test** their knowledge with trivia quizzes and daily challenges
- **Earn** badges and track streaks, stats, and progress across sagas and phases

The design follows a "premium streaming app" aesthetic — dark, editorial, cinematic — using Marvel red (`#ED1D24`) and gold (`#C9A227`) as restrained accent colors, not decoration.

---

## 2. Project Structure

```
marvel-tracker/
├── index.html                  # Single-page HTML entry point (SPA)
├── MCU-Tracker-PRD.md          # Product Requirements Document
├── MCU-Tracker-design.md       # Design System & UI Guidelines
├── PROJECT-CONTEXT.md          # This file
│
├── css/
│   ├── variables.css           # Design tokens (colors, typography, spacing, radii, transitions)
│   ├── base.css                # CSS reset, typography defaults, focus styles, scrollbar, reduced-motion
│   ├── components.css          # Reusable UI components (buttons, cards, chips, badges, progress bars, etc.)
│   ├── layout.css              # App shell, grid system, navigation, responsive breakpoints
│   └── pages.css               # Page-specific styles (Dashboard, Tracker, Timeline, Quizzes, Profile)
│
├── js/
│   ├── data.js                 # MCU title catalog (55 titles) + quiz data (50 questions across 5 categories)
│   ├── storage.js              # localStorage abstraction for all persistence
│   ├── app.js                  # Hash-based SPA router, dashboard rendering, initialization
│   ├── tracker.js              # Watch tracker page logic (ordering, filtering, title cards, ratings)
│   ├── timeline.js             # Interactive timeline with phase rail
│   ├── quiz.js                 # Quiz engine (categories, player, daily quiz, scoring, streaks)
│   └── profile.js              # Profile page (stats, badges, progress bars)
│
└── assets/                     # (reserved for future generated images/icons)
```

---

## 3. Architecture

### Single-Page Application (SPA)

The app is a single `index.html` file with 5 `<section>` elements (one per page), toggled via CSS class `page--active`. Navigation uses hash-based routing (`#dashboard`, `#tracker`, `#timeline`, `#quizzes`, `#profile`).

```
URL hash change → handleRoute() → hide all pages → show target page → call page init function
```

### Script Loading Order

Scripts are loaded synchronously at the bottom of `index.html` in dependency order:

1. **data.js** — Static data (no dependencies)
2. **storage.js** — Persistence layer (depends on data.js for `MCU_TITLES`)
3. **tracker.js** — Tracker page (depends on data.js + storage.js)
4. **timeline.js** — Timeline page (depends on data.js + storage.js)
5. **quiz.js** — Quiz page (depends on data.js + storage.js)
6. **profile.js** — Profile page (depends on data.js + storage.js)
7. **app.js** — Router & dashboard (depends on everything above)

All functions are global (no ES modules) — this keeps the app runnable from `file://` without a server.

### Data Flow

```
User action (click watch chip, select quiz answer, etc.)
  → Update localStorage via storage.js
  → Re-render the current page section
  → Progress/stats recalculated from localStorage on each render
```

---

## 4. Pages in Detail

### 4.1 Dashboard (`#dashboard`)

**Rendered by:** `app.js → initDashboard() → renderDashboard()`

| Section | Description |
|---|---|
| Hero | "MCU TRACKER" eyebrow, "Your Marvel Journey" title, subtitle, circular SVG progress ring showing overall % completion |
| Quick Actions | 4-card grid linking to Tracker, Timeline, Quizzes, Profile |
| Stats Row | 4 stat cards: Titles Watched, Watch Time (hours), Quizzes Taken, Day Streak |
| Daily Quiz Banner | CTA to start daily challenge (or "Completed!" state with score) |
| Saga Progress | Horizontal progress bars for Infinity Saga and Multiverse Saga |
| Latest Releases | 5 most recently released titles with mini title cards |

### 4.2 Watch Tracker (`#tracker`)

**Rendered by:** `tracker.js → initTracker() → renderTrackerList()`

| Feature | Description |
|---|---|
| Order Toggle | Release Order / Chronological / Recommended — 3-button segmented control |
| Filters | All / Movies / Series / Unwatched / Watched — pill filter bar |
| Title Cards | Each title shows: gradient poster placeholder, title name, metadata (type, year, phase, runtime, post-credits), watch status chip, 5-star rating |
| Grouping | In Release/Chronological modes: grouped by Saga → Phase with progress bars. In Recommended mode: flat numbered list |
| Watch Status Cycling | Click chip: Unwatched → Watched → Rewatched → Unwatched. Rewatched increments a rewatch counter |
| Star Ratings | Click to rate 1–5 stars (gold). Click same star to clear. Uses `--color-infinity-gold` |

**Watch Status Chip Styles:**
- **Unwatched:** Outline, muted text, `○` icon
- **Watched:** Filled red (`--color-hero-red`), white text, `✓` icon
- **Rewatched:** Filled gold (`--color-infinity-gold`), dark text, `↻` icon

### 4.3 MCU Timeline (`#timeline`)

**Rendered by:** `timeline.js → initTimeline() → renderTimeline()`

| Feature | Description |
|---|---|
| View Toggle | In-Universe Order / Release Order |
| Phase Rail | Vertical gold line (`--color-infinity-gold`, 30% opacity) with circular nodes at each title |
| Node States | Hollow circle = unwatched, filled red = watched, filled gold = rewatched |
| Era Labels | Saga names in gold-tinted pill labels |
| Phase Labels | "PHASE 01 · 1/6" in micro typography |
| Expandable Cards | Click any title to expand: synopsis, runtime, phase, post-credit count, and watch status toggle |

### 4.4 Quizzes (`#quizzes`)

**Rendered by:** `quiz.js → initQuizzes() → renderQuizPage()`

**Three view states:**

1. **Categories View** — Daily quiz banner + 5 category cards with best scores
2. **Player View** — Question text, 4 answer options (A/B/C/D), progress bar, score counter
3. **Result View** — Final score with percentage, message, streak display, retry/back buttons

**Quiz Categories (5 total, 10 questions each):**

| Category | Icon | Difficulty |
|---|---|---|
| General MCU Knowledge | 🎬 | Casual |
| Guess the Villain | 😈 | Die-hard |
| Guess the Quote | 💬 | Die-hard |
| MCU Phases & Sagas | 🗂️ | Casual |
| Character Deep Dive | 🦸 | Die-hard |

**Daily Quiz:**
- 5 questions selected deterministically based on the date (same questions for everyone on the same day)
- One attempt per day
- Completing it updates the streak counter
- Streak breaks if a day is missed

**Answer States:**
- Default: `--color-surface` background, `--color-border` left border
- Selected: `--color-surface-raised`, red left border
- Correct (after submit): Green left border + green tint background
- Incorrect (after submit): Red left border + red tint background (subtle, ~8% opacity)

### 4.5 Profile (`#profile`)

**Rendered by:** `profile.js → initProfile() → renderProfile()`

| Section | Description |
|---|---|
| Avatar & Name | Emoji avatar, editable display name (click to edit via prompt, saved to localStorage) |
| Watch Progress | 4 stat cards: % Complete (red), Watched count, Rewatched count, Hours Watched |
| Saga Progress | Horizontal progress bars per saga (Infinity Saga, Multiverse Saga) |
| Phase Breakdown | 6 progress bars (Phase 1–6) with watched/total counts |
| Quiz Stats | 4 stat cards: Quizzes Taken, Avg Score (gold), Perfect Scores, Current Streak |
| Badges | 12-badge grid, earned (gold border + icon) vs. locked (muted + grayscale) |

**Badge Definitions (12 total):**

| Badge | Criteria |
|---|---|
| Phase 1–3 Complete | Watched all titles in that phase |
| Infinity Saga | Watched entire Infinity Saga |
| Multiverse Saga | Watched entire Multiverse Saga |
| True Believer | Watched every MCU title |
| Perfect Score | Scored 100% on any quiz |
| Quiz Master | Completed 10+ quizzes |
| 3 Day Streak | Maintained a 3-day daily quiz streak |
| 7 Day Streak | Maintained a 7-day daily quiz streak |
| First Watch | Marked at least 1 title as watched |
| Halfway There | Watched 50% of all MCU titles |

---

## 5. Design System Implementation

### Color Tokens

All colors from the design document are mapped as CSS custom properties in `css/variables.css`. Key design rules enforced:

- **Red is for action and progress** — watch chips, active nav, CTAs, progress fills
- **Gold is earned, not given** — badges, star ratings, rewatched state, streak indicator
- **No red-to-gold gradients** — per design doc §9
- **No pure black** — background is `#0B0B0F` (slightly blue-cool near-black)

### Typography

| Role | Font | Usage |
|---|---|---|
| Display / Headlines | Barlow Condensed (600/700) | Page titles, section headers, phase labels |
| Body | Inter (400/500/600) | Paragraph text, UI elements |
| Data / Numerals | JetBrains Mono (400/500) | Stats, scores, countdowns, progress values |

Loaded via Google Fonts in `variables.css`.

### Component Library

`css/components.css` defines reusable components matching the design document §6:

- **Buttons:** Primary (red fill), Secondary (outline), Small variant, Icon-only
- **Cards:** Surface background, 1px border, top-highlight (`rgba(255,255,255,0.06)`), no drop shadows
- **Watch Chips:** Pill-shaped (999px radius), 3 states with icons for colorblind accessibility
- **Star Rating:** 5 clickable SVG stars, gold when filled
- **Progress Bars:** Animated fill (400ms ease-out), standard and large sizes
- **Phase Tags:** Micro typography, surface-raised background
- **Badges:** Circular with gold border (earned) or muted/grayscale (locked)
- **Quiz Options:** Full-width cards with colored left border indicating state
- **Category Cards:** Centered icon + title + count, hover lift effect
- **Stat Cards:** Centered large monospace value + micro label
- **Modals:** Overlay with surface background and close button
- **Filter Buttons:** Pill-shaped toggle with active state (red fill)

### Layout & Responsive

- **Grid:** 12-column, max-width 1200px, 24px gutters (desktop); single column with 16px padding (mobile)
- **Navigation:**
  - Mobile/tablet (< 1024px): Fixed bottom nav bar with blur backdrop
  - Desktop (≥ 1024px): Fixed left side rail (240px) with brand, vertical nav items
- **Breakpoints:** 768px (tablet), 1024px (desktop), 1440px (large desktop)
- **Page transitions:** 150ms fade-in animation on page switch

### Motion & Accessibility

- Progress bar fills animate on load (400ms ease-out)
- Watch chip toggle: scale(0.95) on click (120ms)
- Page transitions: simple fade (150ms)
- `prefers-reduced-motion`: All animations disabled
- Focus ring: 2px `--color-infinity-gold` outline, 2px offset on all interactive elements
- Watch chips include text icons (○/✓/↻) alongside labels for colorblind users

---

## 6. Data Layer

### MCU Catalog (`data.js`)

55 titles total:
- **23 movies** across Phases 1–6
- **17 series** (Disney+)
- **2 specials** (Werewolf by Night, Guardians Holiday Special)
- **13 additional** (Phase 5–6 including upcoming titles)

Each title object:
```javascript
{
  id: 'iron-man',           // Unique slug
  name: 'Iron Man',         // Display name
  type: 'movie',            // 'movie' | 'series' | 'special'
  phase: 1,                 // 1–6
  saga: 'infinity',         // 'infinity' | 'multiverse'
  releaseDate: '2008-05-02',
  releaseOrder: 1,          // Theatrical/streaming sequence
  chronologicalOrder: 3,    // In-universe position
  runtime: 126,             // Minutes
  synopsis: '...',          // Original synopsis (not copied from official sources)
  postCreditCount: 1        // Number of post-credit scenes
}
```

Three ordering systems:
1. **Release Order** — sorted by `releaseOrder`
2. **Chronological Order** — sorted by `chronologicalOrder`
3. **Recommended Order** — curated array of title IDs for newcomers

### localStorage Schema (`storage.js`)

| Key | Type | Description |
|---|---|---|
| `mcu_watch_status` | `{ [titleId]: 'unwatched'|'watched'|'rewatched' }` | Watch state per title |
| `mcu_ratings` | `{ [titleId]: 1-5 }` | Star rating per title |
| `mcu_rewatch` | `{ [titleId]: number }` | Rewatch count per title |
| `mcu_quiz_scores` | `[{ categoryId, score, total, date }]` | All quiz attempt history |
| `mcu_streak` | `{ current, best, lastDate }` | Daily quiz streak tracker |
| `mcu_daily_quiz` | `{ [YYYY-MM-DD]: { score, total, completedAt } }` | Daily quiz completion per date |
| `mcu_username` | `string` | Display name (default: "MCU Fan") |

### Computed Stats Functions

- `getWatchStats()` — Total watched, rewatched, % complete, hours watched
- `getSagaStats(sagaId)` — Watched/total/percent for a saga
- `getPhaseStats(phase)` — Watched/total/percent for a phase
- `getQuizStats()` — Total quizzes, avg score, perfect scores, streaks

---

## 7. Legal & IP Compliance

Per the PRD §9 and Design §9:

- **No official Marvel/Disney logos, posters, or character images** are used anywhere
- Title posters are replaced with **gradient placeholders** using phase-specific color palettes
- All synopses are **originally written** (not copied from official sources)
- Quiz questions are **original content** (factual trivia, not reproduced dialogue)
- Footer disclaimer: *"This is an unofficial fan project. Not affiliated with, endorsed by, or sponsored by Marvel Studios or The Walt Disney Company."*

---

## 8. How to Run

No build step required. Two options:

1. **Direct file open:** Open `index.html` in any modern browser
2. **Local server:** Run `npx serve .` and visit `http://localhost:3000`

All data persists in the browser's localStorage. Clear localStorage to reset all progress.

---

## 9. What's NOT Built (Future Phases)

Per the PRD rollout plan, the following are deferred:

### P1 — Fast Follow
- Backend auth (Supabase integration)
- Server-synced data (currently localStorage only)
- Global and friends-only leaderboards
- Character Hub (bios, power stats, relationship web)
- Watch Party / Group Tracker
- News/Release Countdown timers

### P2 — Nice-to-Have
- Comic-to-screen comparison notes
- Fan theories discussion board
- Easter egg tracker per film
- "Which MCU character are you?" personality quiz
- Rewatch scheduler / reminders
- Crowd-sourced quiz questions

---

*End of document.*
