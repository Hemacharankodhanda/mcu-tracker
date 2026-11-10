/* =============================================================
   MCU Tracker — Tracker Page (tracker.js)
   Watch tracker logic, filtering, ordering, UI rendering
   ============================================================= */

let currentOrder = typeof getWatchOrder === 'function' ? getWatchOrder() : 'release';
let searchQuery = '';
let currentPhase = 'all';   // 'all', '1', '2', '3', '4', '5', '6'
let currentType = 'all';    // 'all', 'movie', 'series'
let currentStatus = 'all';  // 'all', 'watched', 'unwatched'
let lastToggledTitleId = null;
let searchDebounceTimer = null;

function initTracker() {
  currentOrder = typeof getWatchOrder === 'function' ? getWatchOrder() : 'release';
  renderTrackerControls();
  renderTrackerList();
}

function renderTrackerControls() {
  const controls = document.getElementById('tracker-controls');
  if (!controls) return;
  
  controls.innerHTML = `
    <!-- Segmented Order Toggle -->
    <div class="order-toggle" role="group" aria-label="Sort order">
      <button class="order-toggle__btn ${currentOrder === 'release' ? 'order-toggle__btn--active' : ''}" 
              onclick="setOrder('release')" 
              id="order-release" 
              aria-pressed="${currentOrder === 'release'}">Release Order</button>
      <button class="order-toggle__btn ${currentOrder === 'chronological' ? 'order-toggle__btn--active' : ''}" 
              onclick="setOrder('chronological')" 
              id="order-chrono" 
              aria-pressed="${currentOrder === 'chronological'}">Chronological Order</button>
    </div>

    <!-- Search Input -->
    <div class="tracker-search-wrap">
      <span class="tracker-search-icon"><i data-lucide="search"></i></span>
      <input type="search" 
             class="tracker-search-input" 
             id="tracker-search-input" 
             placeholder="Search titles (e.g. Iron Man, Loki)..." 
             value="${escapeTrackerText(searchQuery)}"
             aria-label="Search titles"
             oninput="onTrackerSearch(this.value)">
      <button class="tracker-search-clear" 
              id="tracker-search-clear" 
              onclick="clearTrackerSearch()" 
              aria-label="Clear search" 
              style="display: ${searchQuery ? 'flex' : 'none'}">✕</button>
    </div>

    <!-- Filter Chips -->
    <div class="tracker-filters-container">
      <div class="tracker-filter-group">
        <span class="tracker-filter-label">Phase</span>
        <div class="tracker-filter-chips" role="group" aria-label="Filter by Phase">
          <button class="filter-btn ${currentPhase === 'all' ? 'filter-btn--active' : ''}" 
                  onclick="setPhaseFilter('all')" 
                  aria-pressed="${currentPhase === 'all'}">All</button>
          ${[1, 2, 3, 4, 5, 6].map(p => `
            <button class="filter-btn ${currentPhase === String(p) ? 'filter-btn--active' : ''}" 
                    onclick="setPhaseFilter('${p}')" 
                    aria-pressed="${currentPhase === String(p)}">Phase ${p}</button>
          `).join('')}
        </div>
      </div>
      
      <div class="tracker-filter-row">
        <div class="tracker-filter-group" style="flex: 1; min-width: 170px;">
          <span class="tracker-filter-label">Type</span>
          <div class="tracker-filter-chips" role="group" aria-label="Filter by Type">
            <button class="filter-btn ${currentType === 'all' ? 'filter-btn--active' : ''}" 
                    onclick="setTypeFilter('all')" 
                    aria-pressed="${currentType === 'all'}">All</button>
            <button class="filter-btn ${currentType === 'movie' ? 'filter-btn--active' : ''}" 
                    onclick="setTypeFilter('movie')" 
                    aria-pressed="${currentType === 'movie'}">Movies</button>
            <button class="filter-btn ${currentType === 'series' ? 'filter-btn--active' : ''}" 
                    onclick="setTypeFilter('series')" 
                    aria-pressed="${currentType === 'series'}">Series</button>
          </div>
        </div>
        
        <div class="tracker-filter-group" style="flex: 1; min-width: 170px;">
          <span class="tracker-filter-label">Status</span>
          <div class="tracker-filter-chips" role="group" aria-label="Filter by Status">
            <button class="filter-btn ${currentStatus === 'all' ? 'filter-btn--active' : ''}" 
                    onclick="setStatusFilter('all')" 
                    aria-pressed="${currentStatus === 'all'}">All</button>
            <button class="filter-btn ${currentStatus === 'watched' ? 'filter-btn--active' : ''}" 
                    onclick="setStatusFilter('watched')" 
                    aria-pressed="${currentStatus === 'watched'}">Watched</button>
            <button class="filter-btn ${currentStatus === 'unwatched' ? 'filter-btn--active' : ''}" 
                    onclick="setStatusFilter('unwatched')" 
                    aria-pressed="${currentStatus === 'unwatched'}">Unwatched</button>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

function escapeTrackerText(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setOrder(order) {
  currentOrder = order;
  if (typeof setWatchOrder === 'function') {
    setWatchOrder(order);
  }
  renderTrackerControls();
  renderTrackerList();
}

function onTrackerSearch(val) {
  searchQuery = val;
  const clearBtn = document.getElementById('tracker-search-clear');
  if (clearBtn) {
    clearBtn.style.display = val.trim() ? 'flex' : 'none';
  }
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    renderTrackerList();
  }, 200);
}

function clearTrackerSearch() {
  searchQuery = '';
  const input = document.getElementById('tracker-search-input');
  if (input) input.value = '';
  const clearBtn = document.getElementById('tracker-search-clear');
  if (clearBtn) clearBtn.style.display = 'none';
  renderTrackerList();
}

function setPhaseFilter(phase) {
  currentPhase = phase;
  renderTrackerControls();
  renderTrackerList();
}

function setTypeFilter(type) {
  currentType = type;
  renderTrackerControls();
  renderTrackerList();
}

function setStatusFilter(status) {
  currentStatus = status;
  renderTrackerControls();
  renderTrackerList();
}

function resetTrackerFilters() {
  searchQuery = '';
  currentPhase = 'all';
  currentType = 'all';
  currentStatus = 'all';
  renderTrackerControls();
  renderTrackerList();
}

function getFilteredTitles() {
  let titles = getTitlesByOrder(currentOrder);

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    titles = titles.filter(t => t.name.toLowerCase().includes(q));
  }

  if (currentPhase !== 'all') {
    const p = parseInt(currentPhase, 10);
    titles = titles.filter(t => t.phase === p);
  }

  if (currentType === 'movie') {
    titles = titles.filter(t => t.type === 'movie');
  } else if (currentType === 'series') {
    titles = titles.filter(t => t.type === 'series' || t.type === 'special');
  }

  if (currentStatus === 'watched') {
    titles = titles.filter(t => getWatchStatus(t.id) !== 'unwatched');
  } else if (currentStatus === 'unwatched') {
    titles = titles.filter(t => getWatchStatus(t.id) === 'unwatched');
  }

  return titles;
}

function renderTrackerList() {
  const container = document.getElementById('tracker-list');
  if (!container) return;
  
  const titles = getFilteredTitles();

  if (titles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <div class="empty-state__text">No titles found</div>
        <p class="micro" style="color: var(--color-text-muted)">No MCU releases match your current search and filter criteria.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetTrackerFilters()" style="margin-top: var(--space-4)">Reset Filters</button>
      </div>
    `;
    return;
  }

  const isFiltered = searchQuery.trim() !== '' || currentPhase !== 'all' || currentType !== 'all' || currentStatus !== 'all';
  const metaHtml = isFiltered ? `
    <div class="tracker-meta-bar" style="margin-bottom: var(--space-4)">
      <span>Showing ${titles.length} of ${MCU_TITLES.length} titles</span>
      <button class="btn-ghost micro" onclick="resetTrackerFilters()" style="color: var(--color-hero-red); cursor: pointer;">Reset all</button>
    </div>
  ` : '';

  if (currentOrder === 'chronological') {
    // True chronological sequence
    const watchStats = getWatchStats();
    container.innerHTML = `
      ${metaHtml}
      <div class="saga-section">
        ${!isFiltered ? `
          <div class="saga-section__header">
            <h2 class="saga-section__title">MCU In-Universe Chronology</h2>
            <span class="saga-section__progress">${watchStats.watched}/${watchStats.totalTitles} · ${watchStats.percentComplete}%</span>
          </div>
          <div class="progress-bar progress-bar--lg" style="margin-bottom: var(--space-5)">
            <div class="progress-bar__fill" style="width: ${watchStats.percentComplete}%"></div>
          </div>
        ` : ''}
        <div class="stack">
          ${titles.map(t => renderTitleCard(t, t.chronologicalOrder)).join('')}
        </div>
      </div>
    `;
  } else {
    // Release order: grouped by saga → phase
    const grouped = groupBySaga(titles);
    container.innerHTML = `
      ${metaHtml}
      ${Object.entries(grouped).map(([sagaId, phases]) => {
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
                  ${phaseTitles.map(t => renderTitleCard(t, t.releaseOrder)).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }).join('')}
    `;
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
    <div class="card title-card" id="title-${title.id}" 
         onclick="navigateTo('details/${title.id}')" 
         tabindex="0" 
         role="button"
         aria-label="${title.name}, ${typeLabel}, released ${year}, Phase ${title.phase}"
         onkeydown="if(event.key==='Enter'||event.key===' '){if(event.target===this){event.preventDefault();navigateTo('details/${title.id}');}}" 
         style="cursor: pointer;">
      <div class="title-card__poster" style="background: ${gradient}; position: relative; overflow: hidden;">
        ${orderNum ? `<span style="opacity:0.85; font-size: 10px; font-weight: 700; position: absolute; top: 4px; left: 8px; z-index: 3; text-shadow: 0 1px 2px rgba(0,0,0,0.9);">#${orderNum}</span>` : ''}
        ${posterUrl ? `
          <div class="skeleton-shimmer"></div>
          <img src="${posterUrl}" 
               alt="${title.name} poster" 
               width="80" 
               height="120" 
               loading="lazy" 
               class="poster-img" 
               onload="this.classList.add('loaded'); this.parentElement.querySelector('.skeleton-shimmer')?.remove();" 
               onerror="this.style.display='none'; this.parentElement.querySelector('.skeleton-shimmer')?.remove();">
        ` : ''}
        <div class="poster-fallback-text">${title.name.split(':')[0]}</div>
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
                  onkeydown="if(event.key==='Enter'||event.key===' '){event.stopPropagation(); event.preventDefault(); toggleWatch('${title.id}');}"
                  aria-label="Mark ${title.name} as ${status === 'unwatched' ? 'watched' : status === 'watched' ? 'rewatched' : 'unwatched'}">
            <span class="watch-chip__icon">${statusIcon}</span>
            ${statusLabel}
            ${rippleHtml}
          </button>
          <div class="star-rating" data-title-id="${title.id}">
            ${[1,2,3,4,5].map(s => `
              <button class="star-rating__star ${s <= rating ? 'star-rating__star--filled' : ''}" 
                      onclick="event.stopPropagation(); rateTitleStar('${title.id}', ${s})"
                      onkeydown="if(event.key==='Enter'||event.key===' '){event.stopPropagation(); event.preventDefault(); rateTitleStar('${title.id}', ${s});}"
                      aria-label="Rate ${title.name} ${s} star${s > 1 ? 's' : ''}">
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
  if (typeof checkBadges === 'function') checkBadges(true);
  // Also refresh dashboard and profile if they exist
  if (typeof initDashboard === 'function') initDashboard();
}

function rateTitleStar(titleId, stars) {
  const current = getRating(titleId);
  if (current === stars) {
    setRating(titleId, 0);
  } else {
    setRating(titleId, stars);
  }
  renderTrackerList();
}
