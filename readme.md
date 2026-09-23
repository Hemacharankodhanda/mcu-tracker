# MCU Tracker — Premium Marvel Companion App

MCU Tracker is a companion web application for Marvel Cinematic Universe fans to track their watch progress, discover viewing orders, test their knowledge with quizzes, and explore interactive roadmaps of the MCU. Think "Letterboxd for the MCU" combined with a trivia hub.

---

## 🎯 Target Audience & Goals

**Audience Segments:**
- **Casual trackers:** Want a simple checklist with minimal friction.
- **Completionists:** Want stats, badges, % completion, and rewatch tracking.
- **Newcomers:** Need a guided "start here" roadmap.
- **Trivia fans:** Want daily quizzes, leaderboards, and challenges.

**Project Goals:**
- Drive daily/weekly return visits (via daily quizzes).
- Make tracking feel rewarding and community-driven.
- Provide a clear, guided experience for newcomers intimidated by the massive 55+ title MCU catalog.

---

## 🚀 Core Features & Pages

The application is a Single-Page Application (SPA) divided into five main sections:

### 1. Dashboard
- Displays overall completion percentage via an SVG progress ring.
- Quick action links and stats (Titles Watched, Watch Time, Quizzes Taken, Day Streak).
- Highlights the Daily Quiz and tracks Saga progress (Infinity vs. Multiverse).
- Shows the latest released titles.

### 2. Watch Tracker
- Full catalog of MCU films, Disney+ series, and specials.
- **Order Toggles:** Switch between Release Order, Chronological Order, and Recommended Order.
- **Filters:** By All / Movies / Series / Unwatched / Watched.
- **Watch States:** Unwatched (○) → Watched (✓) → Rewatched (↻).
- **Ratings:** 1-5 star personal ratings for each title.

### 3. Interactive MCU Timeline
- Visual timeline with a signature **Phase Rail** (a vertical gold line connecting nodes).
- Expandable cards for each title to view synopses, runtimes, phase info, and post-credit scene counts.
- Era/Saga groupings for better orientation.

### 4. Quizzes & Trivia
- **Daily Quiz:** 5 questions daily, tying into a streak counter.
- **Categories:** General Knowledge, Guess the Villain, Guess the Quote, Phases & Sagas, Character Deep Dive.
- Tracks player scores and visualizes correct/incorrect answers with subtle edge borders.

### 5. User Profile
- Customizable display name and emoji avatar.
- Detailed stats on Watch Progress (overall, per saga, and per phase) and Quiz Stats.
- **Badges:** 12 unlockable achievements (e.g., "True Believer", "Infinity Saga", "Perfect Score", "7 Day Streak").

---

## 🏗️ Architecture & Tech Stack

The app is built as a highly optimized, dependency-free vanilla web application.

- **Stack:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla ES6). No frameworks (React/Vue) and no build steps (Webpack/Vite).
- **Persistence:** All data is saved in the browser's `localStorage` (No backend required for MVP).
- **Routing:** Hash-based SPA router (`#dashboard`, `#tracker`, `#timeline`, `#quizzes`, `#profile`).

**Script Loading Flow (Synchronous):**
1. `data.js`: MCU title catalog & quiz data.
2. `storage.js`: LocalStorage abstraction layer.
3. `tracker.js`, `timeline.js`, `quiz.js`, `profile.js`: Page-specific logic.
4. `app.js`: Router, dashboard rendering, and app initialization.

**Data Schema (`localStorage`):**
- `mcu_watch_status`: Watch state per title (`unwatched`, `watched`, `rewatched`).
- `mcu_ratings`: 1-5 star ratings per title.
- `mcu_rewatch`: Rewatch counts.
- `mcu_quiz_scores` & `mcu_streak`: Quiz history and daily streaks.

---

## 🎨 Design System

The app purposefully avoids loud "comic book" clichés (e.g., halftones, red-to-gold gradients). Instead, it aims for a premium, cinematic streaming app aesthetic. 

**Color Palette:**
- **Primary Background (`--color-void`):** `#0B0B0F` (near-black, cool).
- **Surfaces (`--color-surface`):** `#16161D`.
- **Action/Progress (`--color-hero-red`):** `#ED1D24` (Used strictly for action buttons, watched indicators).
- **Rewards/Achievements (`--color-infinity-gold`):** `#C9A227` (Used sparingly for badges, star ratings, and the timeline phase rail).

**Typography:**
- **Display/Headlines:** `Barlow Condensed` (Structural, militaristic, similar to MCU marketing).
- **Body Text:** `Inter` (Highly legible for data-dense areas).
- **Numerals/Stats:** `JetBrains Mono` or `IBM Plex Mono` (Tabular figures for stats and countdowns).

---

## 🛠️ How to Run Locally

Because the project uses vanilla web technologies and localStorage, no build server is required.

1. **Option A (Direct Open):** Simply double-click `index.html` to open it in any modern browser.
2. **Option B (Local Server):** If you prefer using a server, run:
   ```bash
   npx serve .
   ```
   Then visit `http://localhost:3000`.

*Note: To reset your progress entirely, clear your browser's local storage for the site.*

---

## 🚀 Future Roadmap (Post-MVP)

- **Phase 2:** Backend authentication via Supabase, server-synced data, global leaderboards, and a Character Hub.
- **Phase 3:** Watch Party (group tracking), countdown timers for upcoming releases, and deeper polish/animations.

---

## ⚖️ Legal Disclaimer

*This is an unofficial fan project. Not affiliated with, endorsed by, or sponsored by Marvel Studios or The Walt Disney Company. No official logos, movie posters, or copyrighted character art are used within this repository. All synopses and quiz questions are originally written fan-created content.*
