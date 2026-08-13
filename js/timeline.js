/* =============================================================
   MCU Tracker — Timeline Page (timeline.js)
   Editorial sticky-scroll layout with IntersectionObserver
   ============================================================= */

let timelineView = 'chronological'; // 'chronological' | 'release'

// ── Observer state ──
let _activeObserver = null;
let _revealObserver = null;
let _currentPosterUrl = '';
let _activePosterIdx = 1; // toggles between 1 and 2 for crossfade
let _scrollRafId = null;

const _prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Init & cleanup ─────────────────────────────────────────

function initTimeline() {
  _cleanupTimeline();
  renderTimelineControls();
  renderTimeline();
  _setupScrollBehavior();
}

function _cleanupTimeline() {
  if (_activeObserver) { _activeObserver.disconnect(); _activeObserver = null; }
  if (_revealObserver) { _revealObserver.disconnect(); _revealObserver = null; }
  if (_scrollRafId) { cancelAnimationFrame(_scrollRafId); _scrollRafId = null; }
  _currentPosterUrl = '';
}

// ── Controls ────────────────────────────────────────────────

function renderTimelineControls() {
  const controls = document.getElementById('timeline-controls');
  if (!controls) return;
  
  // Notice we made this sticky in CSS
  controls.innerHTML = `
    <div class="timeline-controls-inner">
      <div class="order-toggle" role="group" aria-label="Timeline order">
        <button class="order-toggle__btn ${timelineView === 'chronological' ? 'order-toggle__btn--active' : ''}" 
                onclick="setTimelineView('chronological')" id="tl-chrono">In-Universe Order</button>
        <button class="order-toggle__btn ${timelineView === 'release' ? 'order-toggle__btn--active' : ''}" 
                onclick="setTimelineView('release')" id="tl-release">Release Order</button>
      </div>
      <div class="timeline-legend" role="group" aria-label="Legend">
        <span class="timeline-legend__item micro" style="color: var(--color-text-muted)">
          <span class="timeline-legend__dot" style="border: 2px solid var(--color-hero-red);"></span> Unwatched
        </span>
        <span class="timeline-legend__item micro" style="color: var(--color-text-muted)">
          <span class="timeline-legend__dot" style="background:var(--color-hero-red);"></span> Watched
        </span>
        <span class="timeline-legend__item micro" style="color: var(--color-text-muted)">
          <span class="timeline-legend__dot" style="background:var(--color-infinity-gold);"></span> Rewatched
        </span>
      </div>
    </div>
  `;
}

function setTimelineView(view) {
  timelineView = view;
  _cleanupTimeline();
  renderTimelineControls();
  renderTimeline();
  _setupScrollBehavior();
  window.scrollTo(0, 0);
}

// ── Render ──────────────────────────────────────────────────

function renderTimeline() {
  const container = document.getElementById('timeline-content');
  if (!container) return;
  
  const titles = getTitlesByOrder(timelineView);
  
  // Group by saga and phase
  const phaseGroups = {};
  titles.forEach(t => {
    if (!phaseGroups[t.saga]) phaseGroups[t.saga] = {};
    if (!phaseGroups[t.saga][t.phase]) phaseGroups[t.saga][t.phase] = [];
    phaseGroups[t.saga][t.phase].push(t);
  });
  
  const sagaOrder = ['infinity', 'multiverse'];
  
  // Build wrapper
  let html = `
    <div class="timeline-editorial">
  `;
  
  sagaOrder.forEach(sagaId => {
    const saga = SAGAS[sagaId];
    if (!phaseGroups[sagaId]) return;
    
    const phases = Object.keys(phaseGroups[sagaId]).sort((a, b) => a - b);
    phases.forEach(phase => {
      const phaseTitles = phaseGroups[sagaId][phase];
      const ordered = timelineView === 'chronological'
        ? phaseTitles.sort((a, b) => a.chronologicalOrder - b.chronologicalOrder)
        : phaseTitles.sort((a, b) => a.releaseOrder - b.releaseOrder);
      
      const phaseStats = getPhaseStats(parseInt(phase));
      const eyebrowText = `${saga.name} &mdash; Phase ${String(phase).padStart(2, '0')} (${phaseStats.watched}/${phaseStats.total})`;
      
      ordered.forEach(title => {
        const status = getWatchStatus(title.id);
        const statusClass = status === 'watched' ? 'indicator--watched'
                          : status === 'rewatched' ? 'indicator--rewatched'
                          : 'indicator--unwatched';
        
        const year = new Date(title.releaseDate).getFullYear();
        const typeIcon = title.type === 'movie' ? '🎬' : title.type === 'series' ? '📺' : '✨';
        const typeStr = title.type === 'movie' ? 'Film' : title.type === 'series' ? 'Series' : 'Special';
        const posterUrl = getPosterUrl(title.id);
        const gradient = getPhaseGradient(title.phase);
        html += `
          <div class="timeline-section" id="tl-${title.id}" data-title-id="${title.id}" onclick="navigateTo('details/${title.id}')" style="cursor: pointer;">
            <div class="timeline-section__indicator ${statusClass}" id="ind-${title.id}"></div>
            <div class="timeline-section__poster" style="background: ${gradient}">
              ${posterUrl ? `<img src="${posterUrl}" loading="lazy" alt="${title.name} poster" onerror="this.style.display='none';">` : ''}
            </div>
            
            <div class="timeline-section__content">
              <div class="timeline-section__eyebrow">${eyebrowText}</div>
              
              <div class="timeline-section__title-row">
                <h2 class="timeline-section__title">${title.name}</h2>
              </div>
              
              <div class="timeline-section__meta">
                <span>${year}</span>
                <span class="meta-sep">&bull;</span>
                <span>${title.runtime} min</span>
                <span class="meta-sep">&bull;</span>
                <span>${typeIcon} ${typeStr}</span>
                ${title.postCreditCount > 0 ? `
                  <span class="meta-sep">&bull;</span>
                  <span>${title.postCreditCount} post-credit${title.postCreditCount > 1 ? 's' : ''}</span>
                ` : ''}
              </div>
              
              <p class="timeline-section__synopsis">${title.synopsis}</p>
              
              <div class="timeline-section__actions">
                ${renderWatchButton(title.id, status)}
              </div>
            </div>
          </div>
        `;
      });
    });
  });
  
  html += `
    </div>
  `;
  container.innerHTML = html;
}

// ── Watch toggle (Surgical DOM update to avoid scroll jank) ──

function renderWatchButton(titleId, status) {
  const icon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const label = status === 'unwatched' ? 'Mark Watched' : status === 'watched' ? 'Watched' : 'Rewatched';
  const btnClass = status === 'watched' ? 'watch-chip watch-chip--watched' 
                 : status === 'rewatched' ? 'watch-chip watch-chip--rewatched'
                 : 'watch-chip watch-chip--unwatched';
  
  return `
    <button class="${btnClass}" id="watch-btn-${titleId}"
            onclick="event.stopPropagation(); toggleTimelineWatch('${titleId}')"
            aria-label="Mark as ${status === 'unwatched' ? 'watched' : status === 'watched' ? 'rewatched' : 'unwatched'}">
      <span class="watch-chip__icon">${icon}</span>
      ${label}
    </button>
  `;
}

function toggleTimelineWatch(titleId) {
  const newStatus = cycleWatchStatus(titleId);
  
  // Update button HTML
  const btnContainer = document.getElementById(`watch-btn-${titleId}`).parentNode;
  if (btnContainer) {
    btnContainer.innerHTML = renderWatchButton(titleId, newStatus);
    // Add pop effect to newly rendered button if it was marked watched/rewatched
    if (newStatus !== 'unwatched') {
      const btn = document.getElementById(`watch-btn-${titleId}`);
      if (btn) {
        btn.classList.add('chip-pop');
        btn.innerHTML += '<span class="chip-ripple"></span>';
      }
    }
  }
  
  // Update indicator dot
  const ind = document.getElementById(`ind-${titleId}`);
  if (ind) {
    ind.className = 'timeline-section__indicator'; // clear previous
    if (newStatus === 'watched') ind.classList.add('indicator--watched');
    else if (newStatus === 'rewatched') ind.classList.add('indicator--rewatched');
    else ind.classList.add('indicator--unwatched');
    
    if (newStatus !== 'unwatched' && !_prefersReducedMotion()) {
      ind.classList.add('indicator-ignite');
      setTimeout(() => ind.classList.remove('indicator-ignite'), 1000);
    }
  }
  
  // Optionally update the eyebrow stats if we want to be perfectly accurate,
  // but it requires a lot of DOM querying. For now, the stats will naturally
  // update on the next full render (e.g. view toggle or page reload).
}

// ── Scroll-driven behavior setup ────────────────────────────

function _setupScrollBehavior() {
  const reduced = _prefersReducedMotion();
  const sections = document.querySelectorAll('.timeline-section');
  if (sections.length === 0) return;
  
  if (reduced) {
    sections.forEach(sec => sec.classList.add('is-visible', 'is-active'));
  } else {
    // 1. Text Reveal Observer
    _revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      rootMargin: '-10% 0px -20% 0px',
      threshold: 0
    });
    
    // Active Section Observer to highlight active text
    _activeObserver = new IntersectionObserver((entries) => {
      let bestEntry = null;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        } else {
          entry.target.classList.remove('is-active');
        }
      });
      
      if (bestEntry) {
        document.querySelectorAll('.timeline-section.is-active').forEach(el => el.classList.remove('is-active'));
        bestEntry.target.classList.add('is-active');
      }
    }, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.1, 0.5, 1.0]
    });
    
    sections.forEach(sec => {
      _revealObserver.observe(sec);
      _activeObserver.observe(sec);
    });
  }
}
