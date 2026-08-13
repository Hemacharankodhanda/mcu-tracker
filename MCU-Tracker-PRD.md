# Product Requirements Document
## MCU Tracker — Watch Progress, Quizzes & Roadmaps for Marvel Fans

**Version:** 1.0
**Author:** [Your Name]
**Date:** August 2026
**Status:** Draft

---

## 1. Overview

A companion web app for Marvel Cinematic Universe fans to track what they've watched, discover the "right" viewing order, test their knowledge with quizzes, and explore interactive roadmaps/timelines of the MCU. Think "Letterboxd for the MCU" combined with a trivia hub.

## 2. Problem Statement

MCU fans face three recurring pain points:
1. **"What have I actually watched?"** — With 35+ films and 15+ Disney+ series, it's hard to track progress, especially for casual fans or people introducing friends/family to the universe.
2. **"What order should I watch this in?"** — Release order vs. chronological order vs. "recommended" order is a constant debate; existing lists are static blog posts, not interactive.
3. **"I want to nerd out."** — Fans want a low-stakes way to engage between releases: trivia, quizzes, timelines, character/power comparisons.

## 3. Target Audience

| Segment | Description |
|---|---|
| Casual trackers | Want a simple checklist, minimal friction |
| Completionists | Want stats, badges, % completion, rewatch tracking |
| Newcomers | Want a guided "start here" roadmap |
| Trivia fans | Want quizzes, leaderboards, daily challenges |

## 4. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Drive daily/weekly return visits | DAU/MAU ratio, daily quiz completion rate |
| Make tracking feel rewarding | % of users who complete onboarding tracker setup |
| Build a fan community loop | Quiz shares, leaderboard participation |
| Retention around big releases | Spike in signups/activity tied to new movie/show launches |

---

## 5. Core Features

### P0 — MVP (must-have)

**5.1 Watch Tracker**
- Full catalog of MCU films + Disney+ series (+ specials/shorts)
- Mark as: Not Watched / Watched / Rewatched (with count)
- Toggle between **Release Order**, **Chronological (in-universe) Order**, and **Recommended/"Best" Order**
- Progress bar / % complete per saga (Infinity Saga, Multiverse Saga, etc.)
- Personal rating (1–5 stars) + optional short review per title

**5.2 MCU Roadmap / Timeline**
- Interactive visual timeline (in-universe chronology) showing where each film/show sits, with era groupings (e.g., "Infinity Saga," "Multiverse Saga")
- "Suggested watch path" for newcomers vs. completionists
- Click into a title to see synopsis, phase, saga, runtime, post-credit scene count

**5.3 Quizzes**
- Category-based quizzes: by movie, by character, by phase, "guess the quote," "guess the villain"
- Difficulty levels (Casual / Die-hard / Comic-accurate)
- Score tracking + streaks
- Daily quiz (one per day, resets at midnight) to drive daily return visits

**5.4 Auth & Profile**
- Sign up / login (email or OAuth)
- Personal profile: watch stats, quiz stats, badges earned, favorite characters/movies

### P1 — Fast follow

- **Badges/Achievements** — "Watched all of Phase 1," "Perfect quiz score," "10-day streak"
- **Leaderboards** — global and friends-only, for quiz scores
- **Character Hub** — bios, power stats, appearances, relationship web
- **Watch Party / Group Tracker** — shared list for tracking with friends/family
- **News/Release Countdown** — upcoming MCU release dates with countdown timers

### P2 — Nice-to-have / future

- Comic-to-screen comparison notes
- Fan theories board / discussion threads
- Easter egg tracker (per-film checklist of references)
- Personalized "which MCU character are you" quiz (shareable result card)
- Rewatch scheduler / reminders before new releases

---

## 6. User Stories (sample)

- *As a newcomer*, I want a clear "start here" order so I don't get lost in 35+ movies.
- *As a completionist*, I want to see my % watched per saga and phase so I feel a sense of progress.
- *As a trivia fan*, I want a daily quiz so I have a reason to open the app every day.
- *As a competitive user*, I want a leaderboard so I can compare my score with friends.
- *As a casual fan*, I want one-tap "mark as watched" with no friction.

---

## 7. Suggested Tech Stack

Given your existing pattern of building fast with React + Supabase, this maps well:

| Layer | Recommendation |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| State | Zustand or React Query for server state |
| Backend / DB | Supabase (Postgres + Auth + Realtime + Storage) |
| Realtime use case | Live leaderboard updates, group watch tracking |
| Hosting | Vercel / Netlify |
| Quiz content | Seed via Supabase tables; admin script or simple CMS for adding questions |
| Images/posters | **Do not host official Marvel poster/promo art directly** — see Legal section |

### Suggested Data Model (simplified)

```
users (id, email, username, avatar_url, created_at)
titles (id, name, type[movie/series], phase, saga, release_date,
        chronological_order, runtime, synopsis, post_credit_count)
user_watch_status (user_id, title_id, status, rating, rewatch_count, review_text)
quizzes (id, title, category, difficulty)
quiz_questions (id, quiz_id, question, options[], correct_answer, explanation)
user_quiz_attempts (user_id, quiz_id, score, completed_at)
badges (id, name, description, criteria)
user_badges (user_id, badge_id, earned_at)
```

---

## 8. Non-Functional Requirements

- **Performance:** Timeline/roadmap view should render smoothly with 50+ nodes (consider virtualization if using rich visuals)
- **Mobile-first:** Majority of casual browsing (quizzes especially) will happen on mobile
- **Accessibility:** Quiz UI keyboard-navigable, sufficient color contrast for glassmorphism-style UI
- **Offline-friendly (stretch):** Cache watch status locally, sync when online

---

## 9. Legal / IP Considerations ⚠️

This is important for a public-facing MCU fan site:

- **Do not use official Marvel/Disney logos, movie posters, or character images** without a license — this is trademarked and copyrighted material. Use original illustrations, minimal placeholder art, or user-generated content instead.
- **Do not reproduce dialogue, scripts, or substantial plot summaries** copied from official sources — write original synopses in your own words.
- Consider adding a disclaimer: *"This is an unofficial fan project. Not affiliated with, endorsed by, or sponsored by Marvel Studios or The Walt Disney Company."*
- If monetizing later (ads, premium tier), get comfortable with fair-use boundaries — commercial fan projects using copyrighted IP carry more legal risk than a personal/non-commercial project.

---

## 10. Rollout Plan

| Phase | Scope | Timeline (suggested) |
|---|---|---|
| Phase 1 — MVP | Tracker + basic timeline + 3–5 quiz categories + auth | 3–4 weeks |
| Phase 2 | Badges, leaderboard, character hub | +2–3 weeks |
| Phase 3 | Group tracking, countdown, polish/animations | +2 weeks |

---

## 11. Open Questions

- Do you want this to support **only movies**, or movies + Disney+ series + specials?
- Should quizzes be **crowd-sourced** (users submit questions) or curated by you?
- Any monetization plan (ads, premium badges, no monetization)? This affects the IP risk calculus.
- Solo project or hackathon/competition submission? (Affects how much polish vs. speed matters for MVP)

---

*End of document.*
