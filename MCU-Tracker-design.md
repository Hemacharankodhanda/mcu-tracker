# Design System
## MCU Tracker — Visual Identity & UI Guidelines

**Version:** 1.0
**Companion to:** MCU-Tracker-PRD.md

---

## 1. Design Philosophy

The instinct with an MCU-themed product is to go loud — comic halftones, explosion textures, Avengers-logo red everywhere. We're doing the opposite: **treat it like a premium streaming/companion app** (closer to Disney+'s restraint than a comic book cover). Marvel red and gold are used as *signal*, not wallpaper — sparingly, on the things that matter (actions, progress, key stats), against a calm, dark, editorial base.

The bar: it should feel like something Marvel Studios' own design team would ship — confident, uncluttered, a little cinematic — not like fan-art.

---

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-void` | `#0B0B0F` | Primary background (near-black, slightly blue-cool, not pure #000) |
| `--color-surface` | `#16161D` | Card/panel background |
| `--color-surface-raised` | `#1F1F29` | Hover states, modals, elevated surfaces |
| `--color-hero-red` | `#ED1D24` | Primary accent — CTAs, active states, "watched" indicator |
| `--color-red-dim` | `#8C1116` | Pressed/hover state of red, subtle red borders |
| `--color-infinity-gold` | `#C9A227` | Secondary accent — badges, achievements, ratings, premium/highlight moments only |
| `--color-text-primary` | `#F5F5F7` | Headlines, primary text on dark |
| `--color-text-secondary` | `#9B9BA5` | Body copy, metadata, timestamps |
| `--color-text-muted` | `#5C5C66` | Disabled states, placeholder text |
| `--color-border` | `#2A2A34` | Hairline dividers, card borders |
| `--color-success` | `#2FAE66` | Confirmation states (kept desaturated, not neon — stays out of red/gold's way) |

**Rules of use:**
- **Red is for action and progress**, not decoration. A "Mark as watched" button, a filled progress ring, an active nav item — yes. A section background — no.
- **Gold is earned, not given.** Reserve it for badges, achievements, and star ratings. If gold shows up on every screen, it stops meaning "special."
- Never place red text on a red-tinted background — pair red only with `void`/`surface` neutrals for contrast and legibility (WCAG AA minimum, 4.5:1 for body text).
- No gradients between red and gold — it's the single most "generic superhero template" move available and it will make the product look like a fan kit, not a product. If a gradient is ever used, keep it monochrome (e.g., surface → void) for depth on hero sections only.

---

## 3. Typography

| Role | Typeface | Notes |
|---|---|---|
| Display / Headlines | **Barlow Condensed** (Semibold/Bold) | Tall, structural, slightly militaristic — echoes the condensed titling used across MCU marketing without directly copying Marvel's actual wordmark (avoid legal/trademark lookalikes) |
| Body | **Inter** | Neutral, highly legible at small sizes, works well for dense data (watch stats, quiz text) |
| Data / Numerals (stats, scores, countdowns) | **JetBrains Mono** or **IBM Plex Mono** | Tabular figures for stat blocks and countdown timers — gives the "mission-control" precision feel without extra ornamentation |

**Type scale (base 16px):**

| Level | Size | Weight | Use |
|---|---|---|---|
| Display XL | 56px | 700 | Landing hero headline |
| Display | 36px | 700 | Section headers |
| H1 | 28px | 600 | Page titles |
| H2 | 20px | 600 | Card/section titles |
| Body | 16px | 400 | Paragraph text |
| Small | 14px | 400 | Metadata, captions |
| Micro | 12px | 500, uppercase, +0.04em tracking | Eyebrows, labels, phase tags |

Headlines use **Barlow Condensed** in all-caps sparingly — for section titles and phase labels only, not full paragraphs (all-caps body text hurts readability and reads as shouty).

---

## 4. Layout & Spacing

- **Grid:** 12-column, max content width 1200px, 24px gutters (desktop); single column with 16px side padding (mobile)
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px — no arbitrary values
- **Corner radius:** 8px for cards/buttons, 4px for inputs/tags, 999px (pill) only for badges and status chips — keep radius consistent, don't mix sharp and heavily rounded in the same view
- **Cards:** `--color-surface` background, 1px `--color-border`, 8px radius, no drop shadows on dark backgrounds (use a subtle top-highlight border instead — `border-top: 1px solid rgba(255,255,255,0.06)` — shadows read poorly on near-black)

---

## 5. Signature Element: The Phase Marker

Every MCU release genuinely belongs to a **Phase** (Phase 1, 2, 3... Multiverse Saga) — this is real, meaningful sequence data, not decoration for decoration's sake. Make it the app's one recurring, ownable motif:

- A slim vertical **phase rail** alongside the timeline/roadmap view — a thin gold line with red circular nodes at each title, hollow when unwatched, filled solid red when watched
- Phase labels use the Micro type style (uppercase, tracked): `PHASE 01 — AVENGERS ASSEMBLED`
- This same rail motif reduces down to a **horizontal progress bar** on the user's profile page (per-saga completion), keeping one consistent visual language for "progress through the MCU" everywhere it appears

This is the one place we spend visual boldness — everywhere else stays quiet so this reads as intentional, not just "another progress bar."

---

## 6. Components

**Buttons**
- Primary: solid `--color-hero-red` fill, white text, 8px radius, no border. Hover: darken to `--color-red-dim`.
- Secondary: transparent fill, 1px `--color-border`, `--color-text-primary` text. Hover: `--color-surface-raised` fill.
- Never use gold for buttons — it's reserved for achievement/reward moments, not routine actions.

**Watch status chip** (pill, 999px radius)
- Not watched: outline only, `--color-text-muted`
- Watched: filled `--color-hero-red`, white text
- Rewatched: filled `--color-infinity-gold`, `--color-void` text (this is the one place gold appears as a fill — signals "you went above and beyond")

**Quiz UI**
- Answer options as full-width cards, `--color-surface`, hover → `--color-surface-raised`
- Correct answer on submit: left border flips to `--color-success`, subtle background tint
- Incorrect: left border `--color-hero-red`, subtle background tint — red here means "miss," not brand, so keep the tint very subtle (8–10% opacity) to avoid alarm-red overload

**Badges**
- Circular, gold outline, icon in `--color-infinity-gold`, dark fill — treated like a medal, not a sticker

---

## 7. Motion

Minimal and purposeful — no idle/ambient animation, no parallax for its own sake:
- Progress bar fills animate on load (400ms ease-out) — the one moment worth a flourish
- Watch-status toggle: quick scale-tap feedback (120ms) on click, no bounce
- Page transitions: simple 150ms fade, no slide/zoom
- Respect `prefers-reduced-motion` — disable all non-essential motion when set

---

## 8. Accessibility & Quality Floor

- All text meets WCAG AA contrast against its background (verify red-on-void and gold-on-void specifically — both can dip below 4.5:1 at small sizes; use `--color-text-primary` for text, reserve red/gold for large text, icons, and fills only)
- Visible keyboard focus ring on all interactive elements: 2px `--color-infinity-gold` outline, 2px offset
- Never convey status by color alone — pair the watched/unwatched chip with an icon (check vs. outline circle) for colorblind users
- Responsive down to 360px width without horizontal scroll

---

## 9. What We're Deliberately Avoiding

- Comic-book halftone textures, torn-paper edges, "POW!" burst shapes — reads as fan-kit, not product
- Red-to-gold gradients — the single most overused "superhero brand" cliché
- Marvel's actual wordmark/logo or any trademarked character art — legal risk (see PRD §9); typography and color evoke the *feeling* without copying protected assets
- Pure black (`#000000`) backgrounds — slightly warmed/cooled near-blacks feel more considered and reduce eye strain

---

*End of document.*
