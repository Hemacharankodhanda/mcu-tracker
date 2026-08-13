/* =============================================================
   MCU Tracker — App Shell (app.js)
   Hash-based SPA router, page init, navigation
   ============================================================= */

const PAGES = ['dashboard', 'tracker', 'timeline', 'quizzes', 'profile', 'details'];
let currentPage = 'dashboard';

// ── Router ──────────────────────────────────────────────────

function navigateTo(page) {
  const basePage = page.split('/')[0];
  if (!PAGES.includes(basePage)) page = 'dashboard';
  window.location.hash = page;
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  
  // Handle dynamic routes like details/iron-man
  const parts = hash.split('/');
  let page = parts[0];
  const param = parts[1];
  
  if (!PAGES.includes(page)) page = 'dashboard';
  
  currentPage = page;
  
  // Hide all pages, show current
  PAGES.forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (el) {
      el.classList.toggle('page--active', p === page);
    }
  });
  
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('nav-item--active', item.dataset.page === page);
  });
  
  // Hide/Show bottom nav on details page
  const nav = document.querySelector('.bottom-nav');
  if (nav) {
    if (page === 'details') nav.style.display = 'none';
    else nav.style.display = '';
  }
  
  // Initialize page
  switch (page) {
    case 'dashboard': initDashboard(); break;
    case 'tracker':   initTracker();   break;
    case 'timeline':  initTimeline();  break;
    case 'quizzes':   initQuizzes();   break;
    case 'profile':   initProfile();   break;
    case 'details':   if(typeof initDetails === 'function') initDetails(param); break;
  }
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ── Dashboard ───────────────────────────────────────────────

function initDashboard() {
  renderDashboard();
}

function renderDashboard() {
  const container = document.getElementById('dashboard-content');
  if (!container) return;
  
  const stats = getWatchStats();
  const quizStats = getQuizStats();
  const streak = getStreak();
  const dailyStatus = getDailyQuizStatus();
  
  // Circular progress calculations
  const circumference = 2 * Math.PI * 68; // r=68
  const offset = circumference - (stats.percentComplete / 100) * circumference;
  
  // Phase nodes on the circle
  const phaseNodes = [1, 2, 3, 4, 5, 6].map((p, i) => {
    const phaseStats = getPhaseStats(p);
    const angle = (i / 6) * 360 - 90; // Start at top
    const rad = (angle * Math.PI) / 180;
    const x = 80 + 68 * Math.cos(rad);
    const y = 80 + 68 * Math.sin(rad);
    
    let fill = 'var(--color-surface)';
    let stroke = 'var(--color-border)';
    if (phaseStats.percent === 100) {
      if (phaseStats.rewatched === phaseStats.total) {
        fill = 'var(--color-infinity-gold)';
        stroke = 'var(--color-infinity-gold)';
      } else {
        fill = 'var(--color-hero-red)';
        stroke = 'var(--color-hero-red)';
      }
    }
    return `<circle cx="${x}" cy="${y}" r="3" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
  }).join('');
  
  container.innerHTML = `
    <!-- Hero -->
    <div class="hero">
      <div class="hero__eyebrow rise-in rise-in-1">MCU Tracker</div>
      <h1 class="hero__title rise-in rise-in-2">Your Marvel<br>Journey</h1>
      <p class="hero__subtitle rise-in rise-in-3">Track, discover, and test your knowledge across the Marvel Cinematic Universe.</p>
      
      <div class="hero-progress rise-in rise-in-4">
        <div class="circular-progress">
          <svg viewBox="0 0 160 160">
            <circle class="circular-progress__track" cx="80" cy="80" r="68"/>
            <circle class="circular-progress__fill" cx="80" cy="80" r="68"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${offset}"/>
            ${phaseNodes}
          </svg>
          <div class="circular-progress__text">
            <div class="circular-progress__percent"><span id="anim-percent">0</span>%</div>
            <div class="circular-progress__label">Complete</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="quick-actions">
      <div class="quick-action" onclick="navigateTo('tracker')" id="qa-tracker">
        <div class="quick-action__icon"><i data-lucide="list-checks"></i></div>
        <div class="quick-action__label">Tracker</div>
      </div>
      <div class="quick-action" onclick="navigateTo('timeline')" id="qa-timeline">
        <div class="quick-action__icon"><i data-lucide="route"></i></div>
        <div class="quick-action__label">Timeline</div>
      </div>
      <div class="quick-action" onclick="navigateTo('quizzes')" id="qa-quizzes">
        <div class="quick-action__icon"><i data-lucide="brain"></i></div>
        <div class="quick-action__label">Quizzes</div>
      </div>
      <div class="quick-action" onclick="navigateTo('profile')" id="qa-profile">
        <div class="quick-action__icon"><i data-lucide="user"></i></div>
        <div class="quick-action__label">Profile</div>
      </div>
    </div>
    
    <!-- Stats Row -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Your Stats</h2>
      </div>
      <div class="grid grid--stats">
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-watched">0</span><span style="font-size: var(--text-small); color: var(--color-text-muted)">/${stats.totalTitles}</span></div>
          <div class="stat-card__label">Titles Watched</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-hours">0</span>h</div>
          <div class="stat-card__label">Watch Time</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--gold mono"><span id="anim-quizzes">0</span></div>
          <div class="stat-card__label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-streak">0</span>🔥</div>
          <div class="stat-card__label">Day Streak</div>
        </div>
      </div>
    </div>
    
    <!-- Daily Quiz Banner -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Daily Challenge</h2>
      </div>
      <div class="daily-banner" onclick="${dailyStatus ? '' : "navigateTo('quizzes'); setTimeout(() => startDailyQuiz(), 100)"}" 
           id="dash-daily"
           ${dailyStatus ? 'style="border-left-color: var(--color-success)"' : ''}>
        <div class="daily-banner__icon"><i data-lucide="${dailyStatus ? 'check-circle' : 'zap'}"></i></div>
        <div class="daily-banner__content">
          <div class="daily-banner__title">${dailyStatus ? 'Challenge Complete!' : 'Today\'s Quiz'}</div>
          <div class="daily-banner__subtitle">
            ${dailyStatus 
              ? `You scored ${dailyStatus.score}/${dailyStatus.total} today` 
              : '5 questions to test your MCU knowledge'}
          </div>
        </div>
        ${!dailyStatus ? `
          <div class="daily-banner__action">
            <span class="btn btn-primary btn-sm">Play</span>
          </div>
        ` : ''}
      </div>
    </div>
    
    <!-- Saga Progress -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Saga Progress</h2>
        <span class="section__action" onclick="navigateTo('tracker')">View All →</span>
      </div>
      <div class="saga-progress-list">
        ${renderDashSagaProgress('infinity')}
        ${renderDashSagaProgress('multiverse')}
      </div>
    </div>
    
    <!-- Recently Added -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Latest Releases</h2>
      </div>
      <div class="stack">
        ${getLatestTitles(5).map(t => renderMiniTitleCard(t)).join('')}
      </div>
    </div>
  `;
  
  // Trigger animations
  setTimeout(() => {
    if (typeof animateCounter === 'function') {
      animateCounter('anim-percent', stats.percentComplete, 1200);
      animateCounter('anim-watched', stats.watched, 1000);
      animateCounter('anim-hours', stats.hoursWatched, 1000);
      animateCounter('anim-quizzes', quizStats.totalQuizzes, 800);
      animateCounter('anim-streak', streak.current, 800);
    }
  }, 50);
}

function renderDashSagaProgress(sagaId) {
  const saga = SAGAS[sagaId];
  const stats = getSagaStats(sagaId);
  
  return `
    <div class="progress-group">
      <div class="progress-group__header">
        <span class="progress-group__label">${saga.name}</span>
        <span class="progress-group__value">${stats.watched}/${stats.total} · ${stats.percent}%</span>
      </div>
      <div class="progress-bar progress-bar--lg">
        <div class="progress-bar__fill" style="width: ${stats.percent}%"></div>
      </div>
    </div>
  `;
}

function renderMiniTitleCard(title) {
  const status = getWatchStatus(title.id);
  const gradient = getPhaseGradient(title.phase);
  const year = new Date(title.releaseDate).getFullYear();
  const statusClass = status === 'watched' ? 'watch-chip--watched'
                    : status === 'rewatched' ? 'watch-chip--rewatched'
                    : 'watch-chip--unwatched';
  const statusIcon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const statusLabel = status === 'unwatched' ? 'Not Watched' : status === 'watched' ? 'Watched' : 'Rewatched';
  
  const posterUrl = getPosterUrl(title.id);
  
  return `
    <div class="card title-card card-compact">
      <div class="title-card__poster" style="background: ${gradient}; width: 56px; height: 80px; font-size: 9px; position: relative; overflow: hidden;">
        ${posterUrl ? `<img src="${posterUrl}" alt="${title.name} poster" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; z-index: 1;" onerror="this.style.display='none';">` : ''}
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2px; z-index: 0;">${title.name.split(':')[0]}</div>
      </div>
      <div class="title-card__info">
        <div class="title-card__name" style="font-size: var(--text-body)">${title.name}</div>
        <div class="title-card__meta">
          <span>${year}</span>
          <span>Phase ${title.phase}</span>
        </div>
      </div>
      <button class="watch-chip ${statusClass}" onclick="dashToggleWatch('${title.id}')" style="flex-shrink:0">
        <span class="watch-chip__icon">${statusIcon}</span>
        ${statusLabel}
      </button>
    </div>
  `;
}

function dashToggleWatch(titleId) {
  cycleWatchStatus(titleId);
  renderDashboard();
}

function getLatestTitles(count) {
  return [...MCU_TITLES]
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, count);
}

// ── Init ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Set up navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(item.dataset.page);
    });
  });
  
  // Handle hash changes
  window.addEventListener('hashchange', handleRoute);
  
  // Initial route
  handleRoute();
  
  // Fetch posters in the background
  fetchPostersFromTMDB();
});

// Progressive poster loading
document.addEventListener('posterFetched', (e) => {
  const { titleId, url } = e.detail;
  const imgHtml = `<img src="${url}" loading="lazy" alt="poster" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; z-index: 1;" onerror="this.style.display='none';">`;
  
  // Dashboard / Profile Cards
  const dashCards = document.querySelectorAll(`.card[onclick*="'${titleId}'"] .card__poster, .title-card[id="title-${titleId}"] .title-card__poster`);
  dashCards.forEach(container => {
    if (!container.querySelector('img')) container.insertAdjacentHTML('beforeend', imgHtml);
  });
  
  // Timeline Sections
  const timelineSections = document.querySelectorAll(`.timeline-section[data-title-id="${titleId}"] .timeline-section__poster`);
  timelineSections.forEach(container => {
    if (!container.querySelector('img')) container.insertAdjacentHTML('beforeend', imgHtml);
  });
});
