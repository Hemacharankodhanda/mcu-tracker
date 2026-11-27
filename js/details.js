/* =============================================================
   MCU Tracker — Title Details (details.js)
   Fetches rich TMDB info and renders the details page
   ============================================================= */

async function initDetails(titleId) {
  const container = document.getElementById('details-content');
  if (!container) return;
  
  window.scrollTo(0, 0); // scroll to top when navigating to details
  
  const title = MCU_TITLES.find(t => t.id === titleId);
  if (!title) {
    container.innerHTML = `
      <div style="padding: var(--space-8); text-align: center;">
        <h2>Title not found</h2>
        <button class="btn btn-primary" onclick="navigateTo('tracker')" style="margin-top: var(--space-4)">Back to Tracker</button>
      </div>
    `;
    return;
  }
  
  const status = getWatchStatus(title.id);
  const statusIcon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const statusLabel = status === 'unwatched' ? 'Mark Watched' : status === 'watched' ? 'Watched' : 'Rewatched';
  const statusClass = status === 'watched' ? 'watch-chip--watched' : status === 'rewatched' ? 'watch-chip--rewatched' : 'watch-chip--unwatched';

  // Format dates and metadata
  const posterUrl = getPosterUrl(title.id);
  const typeStr = title.type === 'movie' ? 'Film' : title.type === 'series' ? 'Series' : 'Special';
  const releaseDateObj = new Date(title.releaseDate);
  const releaseDateFormatted = releaseDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const year = releaseDateObj.getFullYear();
  const sagaName = title.saga === 'infinity' ? 'The Infinity Saga' : 'The Multiverse Saga';
  
  let html = `
    <div class="details-page">
      <button class="details-back btn btn-secondary" onclick="navigateTo('tracker')" aria-label="Go back">
        <i data-lucide="arrow-left"></i> Back
      </button>
      
      <div class="details-hero" id="details-hero-${title.id}">
        <div class="details-hero__gradient"></div>
        <div class="details-hero__content">
          <div class="details-hero__poster" style="background: ${getPhaseGradient(title.phase)}; position: relative; overflow: hidden;">
            ${posterUrl ? `
              <div class="skeleton-shimmer"></div>
              <img src="${posterUrl}" 
                   alt="${title.name} poster" 
                   loading="lazy" 
                   class="poster-img"
                   onload="this.classList.add('loaded'); this.parentElement.querySelector('.skeleton-shimmer')?.remove();"
                   onerror="this.style.display='none'; this.parentElement.querySelector('.skeleton-shimmer')?.remove();">
            ` : ''}
            <div class="poster-fallback-text">${title.name.split(':')[0]}</div>
          </div>
          <div class="details-hero__info">
            <h1 class="details-hero__title">${title.name}</h1>
            <div class="details-hero__meta">
              <span>${year}</span>
              <span class="meta-sep">&bull;</span>
              <span>Phase ${title.phase}</span>
              <span class="meta-sep">&bull;</span>
              <span>${title.runtime} min</span>
              <span class="meta-sep">&bull;</span>
              <span>${typeStr}</span>
            </div>
            <div class="details-hero__actions">
              <button class="watch-chip ${statusClass}" onclick="toggleWatchFromDetails('${title.id}')" id="details-watch-btn">
                <span class="watch-chip__icon">${statusIcon}</span>
                ${statusLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="details-body">
        <!-- Quick Specs Grid -->
        <section class="details-section">
          <div class="grid grid--stats" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-6);">
            <div class="stat-card">
              <div class="stat-card__label">Release Date</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">${releaseDateFormatted}</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Timeline Placement</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-infinity-gold); margin-top: 4px;">#${title.chronologicalOrder} in Chronology</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Saga</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">${sagaName}</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__label">Post-Credits</div>
              <div style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">${title.postCreditCount > 0 ? `${title.postCreditCount} Scene${title.postCreditCount > 1 ? 's' : ''}` : 'None'}</div>
            </div>
            <div class="stat-card" id="details-director-card" style="display: none;">
              <div class="stat-card__label" id="details-director-label">Director</div>
              <div id="details-director-name" style="font-weight: 600; font-size: var(--text-small); color: var(--color-text-primary); margin-top: 4px;">—</div>
            </div>
          </div>
        </section>

        <!-- Synopsis -->
        <section class="details-section">
          <h2 class="details-section__title">Synopsis</h2>
          <p class="details-section__text" id="details-overview">${title.synopsis}</p>
        </section>
        
        <!-- Top Cast Rail -->
        <section class="details-section" id="details-cast-section">
          <h2 class="details-section__title">Top Cast</h2>
          <div class="cast-rail" id="details-cast-rail">
            <div class="cast-loading-state" style="color: var(--color-text-muted); font-size: var(--text-small); padding: var(--space-3) 0;">
              Loading cast & crew...
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
  container.innerHTML = html;
  if (window.lucide) lucide.createIcons();
  
  // Fetch rich TMDB data
  if (title.tmdbId) {
    const type = title.tmdbType === 'tv' ? 'tv' : 'movie';
    const tmdbData = await fetchTitleDetails(title.tmdbId, type);
    
    if (tmdbData) {
      // Update backdrop
      if (tmdbData.backdrop_path) {
        const heroEl = document.getElementById(`details-hero-${title.id}`);
        if (heroEl) {
          const bgUrl = getBackdropUrl(tmdbData.backdrop_path);
          heroEl.style.backgroundImage = `url('${bgUrl}')`;
        }
      }
      
      // Update synopsis if TMDB overview is longer/better
      if (tmdbData.overview && tmdbData.overview.length > title.synopsis.length) {
        const overviewEl = document.getElementById('details-overview');
        if (overviewEl) overviewEl.textContent = tmdbData.overview;
      }

      // Director or Series Creator
      if (tmdbData.credits && tmdbData.credits.crew) {
        const director = tmdbData.credits.crew.find(c => c.job === 'Director');
        const directorCard = document.getElementById('details-director-card');
        const directorName = document.getElementById('details-director-name');
        const directorLabel = document.getElementById('details-director-label');
        if (director && directorCard && directorName) {
          directorName.textContent = director.name;
          directorLabel.textContent = 'Director';
          directorCard.style.display = 'block';
        } else if (tmdbData.created_by && tmdbData.created_by.length > 0) {
          directorName.textContent = tmdbData.created_by.map(c => c.name).join(', ');
          directorLabel.textContent = 'Creator';
          directorCard.style.display = 'block';
        }
      }
      
      // Render cast
      const castRail = document.getElementById('details-cast-rail');
      if (castRail) {
        if (tmdbData.credits && tmdbData.credits.cast && tmdbData.credits.cast.length > 0) {
          const topCast = tmdbData.credits.cast.slice(0, 10);
          castRail.innerHTML = topCast.map(actor => {
            const profileUrl = actor.profile_path 
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` 
              : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
            return `
              <div class="cast-card">
                <div class="cast-card__img" style="${!actor.profile_path ? 'background: var(--color-surface); padding: 12px; color: var(--color-text-muted)' : ''}">
                  <img src="${profileUrl}" alt="${actor.name}" width="64" height="64" loading="lazy" style="${!actor.profile_path ? 'object-fit: contain' : ''}">
                </div>
                <div class="cast-card__name">${actor.name}</div>
                <div class="cast-card__character">${actor.character || 'Cast'}</div>
              </div>
            `;
          }).join('');
        } else {
          castRail.innerHTML = '<p class="micro" style="color: var(--color-text-muted); padding: var(--space-2) 0;">No cast information listed.</p>';
        }
      }
    } else {
      const castRail = document.getElementById('details-cast-rail');
      if (castRail) {
        castRail.innerHTML = '<p class="micro" style="color: var(--color-text-muted); padding: var(--space-2) 0;">Cast information will load once connected to the network.</p>';
      }
    }
  }
}

function toggleWatchFromDetails(titleId) {
  const newStatus = cycleWatchStatus(titleId);
  if (typeof checkBadges === 'function') {
    checkBadges(true);
  }
  const btn = document.getElementById('details-watch-btn');
  if (btn) {
    const icon = newStatus === 'unwatched' ? '○' : newStatus === 'watched' ? '✓' : '↻';
    const label = newStatus === 'unwatched' ? 'Mark Watched' : newStatus === 'watched' ? 'Watched' : 'Rewatched';
    const btnClass = newStatus === 'watched' ? 'watch-chip watch-chip--watched' : newStatus === 'rewatched' ? 'watch-chip watch-chip--rewatched' : 'watch-chip watch-chip--unwatched';
    
    btn.className = btnClass;
    btn.innerHTML = `<span class="watch-chip__icon">${icon}</span> ${label}`;
  }
}
