/* =============================================================
   MCU Tracker — Tracker Page (tracker.js)
   Watch tracker logic, filtering, ordering, UI rendering
   ============================================================= */

let currentOrder = 'release';
let currentFilter = 'all'; // 'all', 'movie', 'series', 'unwatched', 'watched'
let lastToggledTitleId = null;

function initTracker() {
  renderTrackerControls();
  renderTrackerList();
}

function renderTrackerControls() {
  const controls = document.getElementById('tracker-controls');
  if (!controls) return;
  
  controls.innerHTML = `
    <div class="order-toggle" role="group" aria-label="Sort order">
      <button class="order-toggle__btn ${currentOrder === 'release' ? 'order-toggle__btn--active' : ''}" 
              onclick="setOrder('release')" id="order-release">Release</button>
      <button class="order-toggle__btn ${currentOrder === 'chronological' ? 'order-toggle__btn--active' : ''}" 
              onclick="setOrder('chronological')" id="order-chrono">Chronological</button>
      <button class="order-toggle__btn ${currentOrder === 'recommended' ? 'order-toggle__btn--active' : ''}" 
              onclick="setOrder('recommended')" id="order-recommended">Recommended</button>
    </div>
    <div class="filter-bar" role="group" aria-label="Filter">
      <button class="filter-btn ${currentFilter === 'all' ? 'filter-btn--active' : ''}" 
              onclick="setFilter('all')" id="filter-all">All</button>
      <button class="filter-btn ${currentFilter === 'movie' ? 'filter-btn--active' : ''}" 
              onclick="setFilter('movie')" id="filter-movies">Movies</button>
      <button class="filter-btn ${currentFilter === 'series' ? 'filter-btn--active' : ''}" 
              onclick="setFilter('series')" id="filter-series">Series</button>
      <button class="filter-btn ${currentFilter === 'unwatched' ? 'filter-btn--active' : ''}" 
              onclick="setFilter('unwatched')" id="filter-unwatched">Unwatched</button>
      <button class="filter-btn ${currentFilter === 'watched' ? 'filter-btn--active' : ''}" 
              onclick="setFilter('watched')" id="filter-watched">Watched</button>
    </div>
  `;
}

function setOrder(order) {
  currentOrder = order;
  renderTrackerControls();
  renderTrackerList();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTrackerControls();
  renderTrackerList();
}

function renderTrackerList() {
  const container = document.getElementById('tracker-list');
  if (!container) return;
  
  let titles = getTitlesByOrder(currentOrder);
  
  // Apply filter
  if (currentFilter === 'movie') {
    titles = titles.filter(t => t.type === 'movie');
  } else if (currentFilter === 'series') {
    titles = titles.filter(t => t.type === 'series' || t.type === 'special');
  } else if (currentFilter === 'unwatched') {
    titles = titles.filter(t => getWatchStatus(t.id) === 'unwatched');
  } else if (currentFilter === 'watched') {
    titles = titles.filter(t => getWatchStatus(t.id) !== 'unwatched');
  }
  
  if (currentOrder === 'recommended') {
    // Flat list for recommended
    container.innerHTML = `
      <div class="stack">
        ${titles.map((t, i) => renderTitleCard(t, i + 1)).join('')}
      </div>
    `;
  } else {
    // Group by saga → phase
    const grouped = groupBySaga(titles);
    container.innerHTML = Object.entries(grouped).map(([sagaId, phases]) => {
      const saga = SAGAS[sagaId];
      const sagaStats = getSagaStats(sagaId);
      return `
        <div class="saga-section">
          <div class="saga-section__header">
            <h2 class="saga-section__title">${saga.name}</h2>
            <span class="saga-section__progress">${sagaStats.watched}/${sagaStats.total} · ${sagaStats.percent}%</span>
          </div>
          <div class="progress-bar progress-bar--lg" style="margin-bottom: var(--space-5)">
            <div class="progress-bar__fill" style="width: ${sagaStats.percent}%"></div>
          </div>
          ${Object.entries(phases).map(([phase, phaseTitles]) => `
            <div style="margin-bottom: var(--space-5)">
              <div class="micro" style="margin-bottom: var(--space-4); color: var(--color-text-muted)">
                Phase ${phase} · ${getPhaseStats(parseInt(phase)).watched}/${getPhaseStats(parseInt(phase)).total}
              </div>
              <div class="stack">
                ${phaseTitles.map(t => renderTitleCard(t)).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  }
  
  // Animate progress bars
  requestAnimationFrame(() => {
    container.querySelectorAll('.progress-bar__fill').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        bar.style.width = width;
      });
    });
  });
}

function groupBySaga(titles) {
  const grouped = {};
  titles.forEach(t => {
    if (!grouped[t.saga]) grouped[t.saga] = {};
    if (!grouped[t.saga][t.phase]) grouped[t.saga][t.phase] = [];
    grouped[t.saga][t.phase].push(t);
  });
  return grouped;
}

function renderTitleCard(title, orderNum) {
  const status = getWatchStatus(title.id);
  const rating = getRating(title.id);
  const rewatchCount = getRewatchCount(title.id);
  const gradient = getPhaseGradient(title.phase);
  
  const statusClass = status === 'watched' ? 'watch-chip--watched'
                    : status === 'rewatched' ? 'watch-chip--rewatched'
                    : 'watch-chip--unwatched';
  
  const statusIcon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const statusLabel = status === 'unwatched' ? 'Not Watched'
                    : status === 'watched' ? 'Watched'
                    : `Rewatched${rewatchCount > 0 ? ' ×' + rewatchCount : ''}`;
  
  let chipClassExtras = '';
  let rippleHtml = '';
  if (title.id === lastToggledTitleId && status !== 'unwatched') {
    chipClassExtras = ' chip-pop';
    rippleHtml = '<span class="chip-ripple"></span>';
  }
  
  const typeLabel = title.type === 'movie' ? 'Film' : title.type === 'series' ? 'Series' : 'Special';
  const year = new Date(title.releaseDate).getFullYear();
  
  const posterUrl = getPosterUrl(title.id);
  
  return `
    <div class="card title-card" id="title-${title.id}" onclick="navigateTo('details/${title.id}')" style="cursor: pointer;">
      <div class="title-card__poster" style="background: ${gradient}; position: relative; overflow: hidden;">
        ${orderNum ? `<span style="opacity:0.8; font-size: 10px; position: absolute; top: 4px; left: 8px; z-index: 2; text-shadow: 0 1px 2px rgba(0,0,0,0.8);">#${orderNum}</span>` : ''}
        ${posterUrl ? `<img src="${posterUrl}" alt="${title.name} poster" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; z-index: 1;" onerror="this.style.display='none';">` : ''}
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; padding: 8px; z-index: 0;">${title.name.split(':')[0]}</div>
      </div>
      <div class="title-card__info">
        <div class="title-card__name">${title.name}</div>
        <div class="title-card__meta">
          <span>${typeLabel}</span>
          <span>${year}</span>
          <span>Phase ${title.phase}</span>
          <span>${title.runtime} min</span>
          ${title.postCreditCount > 0 ? `<span>${title.postCreditCount} post-credit${title.postCreditCount > 1 ? 's' : ''}</span>` : ''}
        </div>
        <div class="title-card__actions">
          <button class="watch-chip ${statusClass}${chipClassExtras}" 
                  onclick="event.stopPropagation(); toggleWatch('${title.id}')"
                  aria-label="Mark ${title.name} as ${status === 'unwatched' ? 'watched' : status === 'watched' ? 'rewatched' : 'unwatched'}">
            <span class="watch-chip__icon">${statusIcon}</span>
            ${statusLabel}
            ${rippleHtml}
          </button>
          <div class="star-rating" data-title-id="${title.id}">
            ${[1,2,3,4,5].map(s => `
              <button class="star-rating__star ${s <= rating ? 'star-rating__star--filled' : ''}" 
                      onclick="event.stopPropagation(); rateTitleStar('${title.id}', ${s})"
                      aria-label="Rate ${s} star${s > 1 ? 's' : ''}">
                <svg viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleWatch(titleId) {
  const newStatus = cycleWatchStatus(titleId);
  lastToggledTitleId = titleId;
  renderTrackerList();
  lastToggledTitleId = null;
  // Also refresh dashboard and profile if they exist
  if (typeof initDashboard === 'function') initDashboard();
}

function rateTitleStar(titleId, stars) {
  const current = getRating(titleId);
  // If clicking same star, toggle off
  if (current === stars) {
    setRating(titleId, 0);
  } else {
    setRating(titleId, stars);
  }
  renderTrackerList();
}
