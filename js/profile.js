/* =============================================================
   MCU Tracker — Profile Page (profile.js)
   Stats, badges, per-saga progress, quiz history
   ============================================================= */

// Badge definitions
const BADGES = [
  { id: 'phase1', name: 'Phase 1 Complete', icon: '🛡️', description: 'Watched all Phase 1 titles', check: () => getPhaseStats(1).percent === 100 },
  { id: 'phase2', name: 'Phase 2 Complete', icon: '⚡', description: 'Watched all Phase 2 titles', check: () => getPhaseStats(2).percent === 100 },
  { id: 'phase3', name: 'Phase 3 Complete', icon: '💎', description: 'Watched all Phase 3 titles', check: () => getPhaseStats(3).percent === 100 },
  { id: 'infinity', name: 'Infinity Saga', icon: '🏆', description: 'Watched the entire Infinity Saga', check: () => getSagaStats('infinity').percent === 100 },
  { id: 'multiverse', name: 'Multiverse Saga', icon: '🌀', description: 'Watched the entire Multiverse Saga', check: () => getSagaStats('multiverse').percent === 100 },
  { id: 'completionist', name: 'True Believer', icon: '✨', description: 'Watched every MCU title', check: () => getWatchStats().percentComplete === 100 },
  { id: 'quiz-perfect', name: 'Perfect Score', icon: '💯', description: 'Scored 100% on any quiz', check: () => getQuizStats().perfectScores > 0 },
  { id: 'quiz-master', name: 'Quiz Master', icon: '🧠', description: 'Completed 10+ quizzes', check: () => getQuizStats().totalQuizzes >= 10 },
  { id: 'streak-3', name: '3 Day Streak', icon: '🔥', description: 'Maintained a 3-day quiz streak', check: () => getStreak().best >= 3 },
  { id: 'streak-7', name: '7 Day Streak', icon: '💫', description: 'Maintained a 7-day quiz streak', check: () => getStreak().best >= 7 },
  { id: 'first-watch', name: 'First Watch', icon: '👁️', description: 'Marked your first title as watched', check: () => getWatchStats().watched >= 1 },
  { id: 'half-way', name: 'Halfway There', icon: '🎯', description: 'Watched 50% of all MCU titles', check: () => getWatchStats().percentComplete >= 50 },
];

function initProfile() {
  renderProfile();
}

function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!container) return;
  
  const watchStats = getWatchStats();
  const quizStats = getQuizStats();
  const streak = getStreak();
  const username = getUsername();
  
  container.innerHTML = `
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-avatar" style="border: 2px solid var(--color-infinity-gold); background: var(--color-surface-raised); color: var(--text-primary); font-family: var(--font-display); display: flex; align-items: center; justify-content: center;">
        ${username.charAt(0).toUpperCase()}
      </div>
      <div class="profile-name" id="profile-name-display" onclick="editUsername()">${username}</div>
      <div class="profile-subtitle">MCU Fan · Click name to edit</div>
    </div>
    
    <!-- Watch Stats -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Watch Progress</h2>
      </div>
      <div class="grid grid--stats">
        <div class="stat-card">
          <div class="stat-card__value stat-card__value--red mono"><span id="anim-prof-percent">0</span>%</div>
          <div class="stat-card__label">Complete</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-watched">0</span></div>
          <div class="stat-card__label">Watched</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-rewatched">0</span></div>
          <div class="stat-card__label">Rewatched</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value mono"><span id="anim-prof-hours">0</span>h</div>
          <div class="stat-card__label">Hours Watched</div>
        </div>
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
    
    <!-- Phase Breakdown -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Phase Breakdown</h2>
      </div>
      <div class="saga-progress-list">
        ${[1, 2, 3, 4, 5, 6].map(p => {
          const stats = getPhaseStats(p);
          return `
            <div class="progress-group">
              <div class="progress-group__header">
                <span class="progress-group__label">Phase ${p}</span>
                <span class="progress-group__value">${stats.watched}/${stats.total} · ${stats.percent}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar__fill" data-width="${stats.percent}" style="width: 0%"></div>
              </div>
            </div>
          `;
        }).join('')}
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
          <div class="stat-card__value mono"><span id="anim-prof-streak">0</span><i data-lucide="flame" style="width:24px; height:24px; margin-left: 4px;"></i></div>
          <div class="stat-card__label">Current Streak</div>
        </div>
      </div>
    </div>
    
    <!-- Badges -->
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Badges</h2>
        <span class="micro">${BADGES.filter(b => b.check()).length}/${BADGES.length} earned</span>
      </div>
      <div class="grid grid--badges" id="badges-container">
      </div>
    </div>
  `;
  
  // Render badges and track unlocks
  const badgesContainer = container.querySelector('#badges-container');
  const previouslyEarned = JSON.parse(localStorage.getItem('mcu_earned_badges') || '[]');
  const newlyEarned = [];
  const currentEarned = [];
  
  let badgesHtml = '';
  BADGES.forEach(badge => {
    const earned = badge.check();
    if (earned) {
      currentEarned.push(badge.id);
      if (!previouslyEarned.includes(badge.id)) {
        newlyEarned.push(badge);
      }
    }
    badgesHtml += `
      <div class="badge ${earned ? '' : 'badge--locked'}" title="${badge.description}">
        <div class="badge__icon">${badge.icon}</div>
        <div class="badge__label">${badge.name}</div>
      </div>
    `;
  });
  
  badgesContainer.innerHTML = badgesHtml;
  localStorage.setItem('mcu_earned_badges', JSON.stringify(currentEarned));
  
  // Trigger badge unlock toasts
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
      animateCounter('anim-prof-hours', watchStats.hoursWatched, 1000);
      
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
    return `<div style="position: absolute; left: ${left}%; top: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; border-radius: 50%; background: ${fill}; border: 2px solid ${stroke}; z-index: 2;"></div>`;
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
  const name = prompt('Enter your display name:', getUsername());
  if (name && name.trim()) {
    setUsername(name.trim());
    renderProfile();
  }
}

function showBadgeToast(badges) {
  const badge = badges[0]; // Show first one if multiple
  
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast__content">
      <div class="badge-toast__icon">${badge.icon}</div>
      <div class="badge-toast__text">
        <div class="micro" style="color: var(--color-infinity-gold); margin-bottom: 4px;">Badge Unlocked</div>
        <div class="h2" style="font-size: var(--text-h2); font-weight: bold;">${badge.name}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.classList.add('badge-toast--visible');
  });
  
  // Dismiss handler
  const dismiss = () => {
    toast.classList.remove('badge-toast--visible');
    setTimeout(() => toast.remove(), 300);
  };
  
  toast.addEventListener('click', dismiss);
  setTimeout(dismiss, 3000);
}
