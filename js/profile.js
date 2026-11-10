/* =============================================================
   MCU Tracker — Profile Page (profile.js)
   Stats, badges, per-saga progress, per-phase breakdown, quiz history
   ============================================================= */

// Badge definitions
const BADGES = [
  { id: 'first-watch', name: 'First Watch', icon: '👁️', description: 'Marked your first title as watched', check: () => getWatchStats().watched >= 1 },
  { id: 'phase1', name: 'Phase 1 Complete', icon: '🛡️', description: 'Watched all Phase 1 titles', check: () => getPhaseStats(1).percent === 100 },
  { id: 'phase2', name: 'Phase 2 Complete', icon: '⚡', description: 'Watched all Phase 2 titles', check: () => getPhaseStats(2).percent === 100 },
  { id: 'phase3', name: 'Phase 3 Complete', icon: '💎', description: 'Watched all Phase 3 titles', check: () => getPhaseStats(3).percent === 100 },
  { id: 'phase4', name: 'Phase 4 Complete', icon: '🌌', description: 'Watched all Phase 4 titles', check: () => getPhaseStats(4).percent === 100 },
  { id: 'phase5', name: 'Phase 5 Complete', icon: '🪐', description: 'Watched all Phase 5 titles', check: () => getPhaseStats(5).percent === 100 },
  { id: 'phase6', name: 'Phase 6 Complete', icon: '⏳', description: 'Watched all Phase 6 titles', check: () => getPhaseStats(6).percent === 100 },
  { id: 'half-way', name: '50% Club', icon: '🎯', description: 'Watched 50% or more of all MCU titles', check: () => getWatchStats().percentComplete >= 50 },
  { id: 'completionist', name: 'Completionist', icon: '✨', description: 'Watched 100% of all MCU titles', check: () => getWatchStats().percentComplete === 100 },
  { id: 'infinity', name: 'Infinity Saga', icon: '🏆', description: 'Watched the entire Infinity Saga', check: () => getSagaStats('infinity').percent === 100 },
  { id: 'multiverse', name: 'Multiverse Saga', icon: '🌀', description: 'Watched the entire Multiverse Saga', check: () => getSagaStats('multiverse').percent === 100 },
  { id: 'streak-7', name: '7-Day Quiz Streak', icon: '🔥', description: 'Maintained a 7-day quiz streak', check: () => getStreak().best >= 7 },
  { id: 'streak-3', name: '3-Day Streak', icon: '⚡', description: 'Maintained a 3-day quiz streak', check: () => getStreak().best >= 3 },
  { id: 'quiz-perfect', name: 'Perfect Score', icon: '💯', description: 'Scored 100% on any quiz', check: () => getQuizStats().perfectScores > 0 },
  { id: 'quiz-master', name: 'Quiz Master', icon: '🧠', description: 'Completed 10+ quizzes', check: () => getQuizStats().totalQuizzes >= 10 }
];

function initProfile() {
  renderProfile();
}

function checkBadges(triggerToast = true) {
  const previouslyEarned = typeof getUnlockedBadges === 'function' ? getUnlockedBadges() : [];
  const newlyEarned = [];
  const currentEarned = [];

  BADGES.forEach(badge => {
    let earned = false;
    try {
      earned = badge.check();
    } catch(e) {}
    
    if (earned) {
      currentEarned.push(badge.id);
      if (!previouslyEarned.includes(badge.id)) {
        newlyEarned.push(badge);
      }
    }
  });

  if (typeof setUnlockedBadges === 'function') {
    setUnlockedBadges(currentEarned);
  }

  if (triggerToast && newlyEarned.length > 0) {
    newlyEarned.forEach((badge, idx) => {
      setTimeout(() => showBadgeToast([badge]), 300 + idx * 3200);
    });
  }

  return { currentEarned, newlyEarned };
}

function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!container) return;
  
  const watchStats = getWatchStats();
  const quizStats = getQuizStats();
  const streak = getStreak();
  const username = getUsername();

  // Completion ring calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (watchStats.percentComplete / 100) * circumference;

  // Phase milestone dots on ring
  const phaseDots = [1, 2, 3, 4, 5, 6].map((p, i) => {
    const pStats = getPhaseStats(p);
    const angle = (i / 6) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const cx = 80 + radius * Math.cos(rad);
    const cy = 80 + radius * Math.sin(rad);
    const isDone = pStats.percent === 100;
    const fill = isDone ? 'var(--color-infinity-gold)' : 'var(--color-surface)';
    const stroke = isDone ? 'var(--color-infinity-gold)' : 'var(--color-border)';
    return `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />`;
  }).join('');

  // Hours and minutes calculation
  const watchedHours = Math.floor(watchStats.totalRuntime / 60);
  const watchedMins = watchStats.totalRuntime % 60;
  const remHours = Math.floor(watchStats.runtimeRemaining / 60);
  const remMins = watchStats.runtimeRemaining % 60;

  // Check badges state
  const { currentEarned, newlyEarned } = checkBadges(false);

  container.innerHTML = `
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-avatar" style="border: 2px solid var(--color-infinity-gold); background: var(--color-surface-raised); color: var(--color-text-primary); font-family: var(--font-display); display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="editUsername()" title="Click to change name">
        ${escapeProfileText(username.charAt(0).toUpperCase())}
      </div>
      <div class="profile-name" id="profile-name-display" onclick="editUsername()" style="cursor: pointer;" title="Click to edit name">
        ${escapeProfileText(username)}
      </div>
      <div class="profile-subtitle">MCU Fan · Click name to edit</div>
      
      <!-- Share button container (populated in Task 7) -->
      <div id="profile-share-container" style="margin-top: var(--space-4);"></div>
    </div>
    
    <!-- Overall Completion Ring Section -->
    <div class="section" style="text-align: center;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: var(--space-4);">
        <div class="circular-progress" style="margin: 0 auto var(--space-3)">
          <svg viewBox="0 0 160 160">
            <circle class="circular-progress__track" cx="80" cy="80" r="${radius}" />
            <circle class="circular-progress__fill" cx="80" cy="80" r="${radius}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${strokeDashoffset}" />
            ${phaseDots}
          </svg>
          <div class="circular-progress__text">
            <div class="circular-progress__percent"><span id="anim-prof-percent">0</span>%</div>
            <div class="circular-progress__label">Completed</div>
          </div>
        </div>
        <div class="micro" style="color: var(--color-text-secondary); max-width: 280px; margin: 0 auto;">
          ${watchStats.watched} of ${watchStats.totalTitles} titles watched
          ${watchStats.rewatched > 0 ? `· ${watchStats.rewatched} rewatched` : ''}
        </div>
      </div>
    </div>

    <!-- Watch & Runtime Stats Grid -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Watch & Runtime Stats</h2>
      </div>
      <div class="grid grid--stats">
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--red mono">
            <span id="anim-prof-watched">0</span><span style="font-size: var(--text-small); color: var(--color-text-muted)">/${watchStats.totalTitles}</span>
          </div>
          <div class="stat-card__label">Titles Watched</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">${watchStats.unwatched} to go</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono">
            <span id="anim-prof-rewatched">0</span>
          </div>
          <div class="stat-card__label">Rewatched</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">Encore viewings</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono">
            <span id="anim-prof-hours">0</span>h <span id="anim-prof-mins" style="font-size: var(--text-body)">0m</span>
          </div>
          <div class="stat-card__label">Runtime Watched</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">${watchStats.totalRuntime.toLocaleString()} minutes</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--gold mono">
            <span id="anim-prof-rem-hours">0</span>h <span id="anim-prof-rem-mins" style="font-size: var(--text-body)">0m</span>
          </div>
          <div class="stat-card__label">Runtime Remaining</div>
          <div class="micro" style="color: var(--color-text-muted); margin-top: 2px;">${watchStats.runtimeRemaining.toLocaleString()} minutes left</div>
        </div>
      </div>
    </div>
    
    <!-- Per-Phase Breakdown with Animated Progress Bars -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Phase Breakdown</h2>
        <span class="micro" style="color: var(--color-text-muted)">Phases 1–6</span>
      </div>
      <div class="saga-progress-list">
        ${[1, 2, 3, 4, 5, 6].map(p => {
          const stats = getPhaseStats(p);
          const pWatchedHours = Math.floor(stats.runtimeWatched / 60);
          const pWatchedMins = stats.runtimeWatched % 60;
          const pRemHours = Math.floor(stats.runtimeRemaining / 60);
          return `
            <div class="progress-group">
              <div class="progress-group__header">
                <span class="progress-group__label">Phase ${p}</span>
                <span class="progress-group__value">${stats.watched}/${stats.total} · ${stats.percent}%</span>
              </div>
              <div class="progress-bar progress-bar--lg">
                <div class="progress-bar__fill" data-width="${stats.percent}" style="width: 0%"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: var(--text-micro); color: var(--color-text-muted); margin-top: 4px;">
                <span>${pWatchedHours}h ${pWatchedMins}m watched</span>
                <span>${pRemHours}h remaining</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Saga Progress -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Saga Progress</h2>
      </div>
      <div class="saga-progress-list">
        ${renderSagaProgress('infinity')}
        ${renderSagaProgress('multiverse')}
      </div>
    </div>
    
    <!-- Quiz Stats -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Quiz Stats</h2>
      </div>
      <div class="grid grid--stats">
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-quizzes">0</span></div>
          <div class="stat-card__label">Quizzes Taken</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--gold mono"><span id="anim-prof-score">0</span>%</div>
          <div class="stat-card__label">Avg Score</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-perfect">0</span></div>
          <div class="stat-card__label">Perfect Scores</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-streak">0</span><i data-lucide="flame" style="width:20px; height:20px; margin-left: 4px; display:inline-block; vertical-align:middle;"></i></div>
          <div class="stat-card__label">Current Streak</div>
        </div>
      </div>
    </div>
    
    <!-- Achievements / Badges -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Achievements & Badges</h2>
        <span class="micro" style="color: var(--color-infinity-gold); font-weight: 600;">
          ${currentEarned.length}/${BADGES.length} earned
        </span>
      </div>
      <div class="grid grid--badges" id="badges-container">
        ${BADGES.map(badge => {
          const earned = currentEarned.includes(badge.id);
          return `
            <div class="badge ${earned ? '' : 'badge--locked'}" 
                 onclick="showBadgeDetails('${badge.id}')"
                 style="cursor: pointer;"
                 tabindex="0"
                 role="button"
                 aria-label="${badge.name}: ${badge.description}. Status: ${earned ? 'Unlocked' : 'Locked'}"
                 title="${badge.name} — ${badge.description} (${earned ? 'Unlocked' : 'Locked'})">
              <div class="badge__icon">${badge.icon}</div>
              <div class="badge__label">${badge.name}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Init Share button (Task 7 integration hook)
  if (typeof initShareButton === 'function') {
    initShareButton();
  }
  
  // Trigger badge unlock toasts if any
  if (newlyEarned.length > 0) {
    setTimeout(() => showBadgeToast(newlyEarned), 500);
  }
  
  // Animate progress bars
  requestAnimationFrame(() => {
    container.querySelectorAll('.progress-bar__fill[data-width]').forEach(bar => {
      requestAnimationFrame(() => {
        bar.style.width = bar.dataset.width + '%';
      });
    });
  });
  
  // Animate counters
  setTimeout(() => {
    if (typeof animateCounter === 'function') {
      animateCounter('anim-prof-percent', watchStats.percentComplete, 1200);
      animateCounter('anim-prof-watched', watchStats.watched, 1000);
      animateCounter('anim-prof-rewatched', watchStats.rewatched, 1000);
      animateCounter('anim-prof-hours', watchedHours, 1000);
      animateCounter('anim-prof-mins', watchedMins, 800);
      animateCounter('anim-prof-rem-hours', remHours, 1000);
      animateCounter('anim-prof-rem-mins', remMins, 800);
      
      animateCounter('anim-prof-quizzes', quizStats.totalQuizzes, 800);
      animateCounter('anim-prof-score', quizStats.avgScore, 1000);
      animateCounter('anim-prof-perfect', quizStats.perfectScores, 800);
      animateCounter('anim-prof-streak', streak.current, 800);
    }
  }, 50);
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

function escapeProfileText(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderSagaProgress(sagaId) {
  const saga = SAGAS[sagaId];
  const stats = getSagaStats(sagaId);
  
  const phaseNodes = saga.phases.map((p, i) => {
    const phaseStats = getPhaseStats(p);
    const left = ((i + 1) / saga.phases.length) * 100;
    
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
    return `<div style="position: absolute; left: ${left}%; top: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; border-radius: 50%; background: ${fill}; border: 2px solid ${stroke}; z-index: 2;" title="Phase ${p}: ${phaseStats.percent}%"></div>`;
  }).join('');
  
  return `
    <div class="progress-group">
      <div class="progress-group__header">
        <span class="progress-group__label">${saga.name}</span>
        <span class="progress-group__value">${stats.watched}/${stats.total} · ${stats.percent}%</span>
      </div>
      <div class="progress-bar progress-bar--lg" style="position: relative;">
        <div class="progress-bar__fill" data-width="${stats.percent}" style="width: 0%"></div>
        ${phaseNodes}
      </div>
    </div>
  `;
}

function editUsername() {
  const current = getUsername();
  const name = prompt('Enter your display name:', current);
  if (name && name.trim()) {
    setUsername(name.trim());
    renderProfile();
  }
}

function showBadgeDetails(badgeId) {
  const badge = BADGES.find(b => b.id === badgeId);
  if (!badge) return;
  const earned = typeof getUnlockedBadges === 'function' ? getUnlockedBadges().includes(badgeId) : badge.check();
  
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast__content">
      <div class="badge-toast__icon">${badge.icon}</div>
      <div class="badge-toast__text">
        <div class="micro" style="color: ${earned ? 'var(--color-infinity-gold)' : 'var(--color-text-muted)'}; margin-bottom: 4px;">
          ${earned ? 'Badge Unlocked' : 'Badge Locked'}
        </div>
        <div style="font-size: var(--text-h2); font-weight: bold; margin-bottom: 2px;">${badge.name}</div>
        <div class="micro" style="color: var(--color-text-secondary);">${badge.description}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('badge-toast--visible'));
  const dismiss = () => {
    toast.classList.remove('badge-toast--visible');
    setTimeout(() => toast.remove(), 300);
  };
  toast.addEventListener('click', dismiss);
  setTimeout(dismiss, 3500);
}

function showBadgeToast(badges) {
  if (!badges || badges.length === 0) return;
  const badge = badges[0];
  
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast__content">
      <div class="badge-toast__icon">${badge.icon}</div>
      <div class="badge-toast__text">
        <div class="micro" style="color: var(--color-infinity-gold); margin-bottom: 4px;">Badge Unlocked!</div>
        <div style="font-size: var(--text-h2); font-weight: bold; margin-bottom: 2px;">${badge.name}</div>
        <div class="micro" style="color: var(--color-text-secondary);">${badge.description}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('badge-toast--visible'));
  const dismiss = () => {
    toast.classList.remove('badge-toast--visible');
    setTimeout(() => toast.remove(), 300);
  };
  toast.addEventListener('click', dismiss);
  setTimeout(dismiss, 3500);
}
