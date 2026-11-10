/* =============================================================
   MCU Tracker — Upcoming Releases (upcoming.js)
   Live countdown, TMDB discovery, 24h caching, fallback slate
   ============================================================= */

const UPCOMING_CACHE_KEY = 'mcu_upcoming_cache_v2';
const UPCOMING_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const FALLBACK_UPCOMING_SLATE = [
  {
    id: 1003596,
    title: 'Avengers: Doomsday',
    release_date: '2026-12-16',
    poster_path: '/9jlZ59UALLLOE279HMT19rP9XQs.jpg',
    overview: 'The Avengers face Doctor Doom as the multiverse collides.'
  },
  {
    id: 1003598,
    title: 'Avengers: Secret Wars',
    release_date: '2027-12-15',
    poster_path: '/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg',
    overview: 'The culmination of the Multiverse Saga.'
  },
  {
    id: 1293690,
    title: 'Untitled X-Men Film',
    release_date: '2028-05-04',
    poster_path: '/jSn3jOzI91dOx4aVdfMrirWXH6R.jpg',
    overview: 'The mutants make their Marvel Cinematic Universe debut.'
  }
];

let upcomingCountdownTimer = null;

async function getUpcomingReleases() {
  // 1. Check localStorage 24h cache
  try {
    const raw = localStorage.getItem(UPCOMING_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < UPCOMING_TTL_MS) && Array.isArray(parsed.data) && parsed.data.length > 0) {
        return parsed.data;
      }
    }
  } catch (e) {
    console.warn('Error reading upcoming cache:', e);
  }

  // 2. Fetch from TMDB if API key available
  if (typeof TMDB_API_KEY !== 'undefined' && TMDB_API_KEY && TMDB_API_KEY !== 'YOUR_API_KEY_HERE') {
    try {
      const today = new Date().toISOString().split('T')[0];
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_companies=420&primary_release_date.gte=${today}&sort_by=primary_release_date.asc`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const formatted = data.results.slice(0, 5).map(m => ({
            id: m.id,
            title: m.title,
            release_date: m.release_date,
            poster_path: m.poster_path,
            overview: m.overview
          }));
          localStorage.setItem(UPCOMING_CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: formatted
          }));
          return formatted;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch upcoming TMDB releases:', err);
    }
  }

  // 3. Fallback
  return FALLBACK_UPCOMING_SLATE;
}

function calculateCountdown(releaseDateStr) {
  if (!releaseDateStr) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  const target = new Date(releaseDateStr + 'T00:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, passed: false };
}

function renderUpcomingReleases() {
  const container = document.getElementById('upcoming-releases-content');
  if (!container) return;

  if (upcomingCountdownTimer) {
    clearInterval(upcomingCountdownTimer);
    upcomingCountdownTimer = null;
  }

  // Load and render
  getUpcomingReleases().then(releases => {
    if (!releases || releases.length === 0) return;
    const next = releases[0];
    const later = releases.slice(1);

    const posterUrl = next.poster_path ? `https://image.tmdb.org/t/p/w300${next.poster_path}` : '';
    const dateFormatted = new Date(next.release_date + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    container.innerHTML = `
      <div class="upcoming-card">
        <div class="upcoming-card__hero">
          ${posterUrl ? `
            <img src="${posterUrl}" 
                 alt="${next.title} poster" 
                 class="upcoming-card__poster" 
                 loading="lazy"
                 onerror="this.style.display='none';">
          ` : `
            <div class="upcoming-card__poster" style="display:flex;align-items:center;justify-content:center;text-align:center;padding:4px;font-size:10px;color:var(--color-text-muted);">
              ${next.title}
            </div>
          `}
          <div class="upcoming-card__info">
            <div class="micro" style="color: var(--color-infinity-gold); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: 2px;">Next Release</div>
            <h3 class="upcoming-card__title">${next.title}</h3>
            <div class="upcoming-card__date">🗓️ ${dateFormatted}</div>
            <p class="micro" style="color: var(--color-text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${next.overview || 'Upcoming MCU adventure coming to theatres.'}
            </p>
          </div>
        </div>

        <!-- Live Countdown -->
        <div>
          <div class="micro" style="color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px;">Countdown To Premiere</div>
          <div class="countdown-grid" id="upcoming-countdown-grid" aria-live="polite">
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-days">00</div>
              <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-hours">00</div>
              <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-mins">00</div>
              <div class="countdown-label">Mins</div>
            </div>
            <div class="countdown-cell">
              <div class="countdown-num" id="cd-secs">00</div>
              <div class="countdown-label">Secs</div>
            </div>
          </div>
        </div>

        ${later.length > 0 ? `
          <div class="upcoming-slate-list">
            <div class="micro" style="color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px;">Also On The Slate</div>
            ${later.map(m => {
              const dStr = new Date(m.release_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              return `
                <div class="upcoming-slate-item">
                  <span>${m.title}</span>
                  <span class="mono micro" style="color: var(--color-infinity-gold);">${dStr}</span>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // Function to tick countdown
    const tick = () => {
      const cd = calculateCountdown(next.release_date);
      const daysEl = document.getElementById('cd-days');
      const hoursEl = document.getElementById('cd-hours');
      const minsEl = document.getElementById('cd-mins');
      const secsEl = document.getElementById('cd-secs');

      if (!daysEl) {
        clearInterval(upcomingCountdownTimer);
        upcomingCountdownTimer = null;
        return;
      }

      daysEl.textContent = String(cd.days).padStart(2, '0');
      hoursEl.textContent = String(cd.hours).padStart(2, '0');
      minsEl.textContent = String(cd.minutes).padStart(2, '0');
      secsEl.textContent = String(cd.seconds).padStart(2, '0');
    };

    tick();
    upcomingCountdownTimer = setInterval(tick, 1000);
  });
}

