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
        <button class="btn btn--primary" onclick="navigateTo('tracker')" style="margin-top: var(--space-4)">Back to Tracker</button>
      </div>
    `;
    return;
  }
  
  const status = getWatchStatus(title.id);
  const statusIcon = status === 'unwatched' ? '○' : status === 'watched' ? '✓' : '↻';
  const statusLabel = status === 'unwatched' ? 'Mark Watched' : status === 'watched' ? 'Watched' : 'Rewatched';
  const statusClass = status === 'watched' ? 'watch-chip--watched' : status === 'rewatched' ? 'watch-chip--rewatched' : 'watch-chip--unwatched';

  // Render initial skeleton / loading state with what we know from data.js
  const posterUrl = getPosterUrl(title.id);
  const typeStr = title.type === 'movie' ? 'Film' : title.type === 'series' ? 'Series' : 'Special';
  const year = new Date(title.releaseDate).getFullYear();
  
  let html = `
    <div class="details-page">
      <button class="details-back btn" onclick="navigateTo('tracker')" aria-label="Go back">
        <i data-lucide="arrow-left"></i> Back
      </button>
      
      <div class="details-hero" id="details-hero-${title.id}">
        <!-- Backdrop will be injected here -->
        <div class="details-hero__gradient"></div>
        <div class="details-hero__content">
          <div class="details-hero__poster" style="background: ${getPhaseGradient(title.phase)}">
            ${posterUrl ? `<img src="${posterUrl}" alt="${title.name} poster">` : ''}
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
        <section class="details-section">
          <h2 class="details-section__title">Synopsis</h2>
          <p class="details-section__text" id="details-overview">${title.synopsis}</p>
        </section>
        
        <section class="details-section" id="details-cast-section" style="display: none;">
          <h2 class="details-section__title">Top Cast</h2>
          <div class="cast-rail" id="details-cast-rail">
            <!-- Cast will be injected here -->
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
      
      // Render cast
      if (tmdbData.credits && tmdbData.credits.cast && tmdbData.credits.cast.length > 0) {
        const castSection = document.getElementById('details-cast-section');
        const castRail = document.getElementById('details-cast-rail');
        
        if (castSection && castRail) {
          const topCast = tmdbData.credits.cast.slice(0, 10);
          castRail.innerHTML = topCast.map(actor => {
            const profileUrl = actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
            return `
              <div class="cast-card">
                <div class="cast-card__img" style="${!actor.profile_path ? 'background: var(--color-surface); padding: 12px; color: var(--color-text-muted)' : ''}">
                  <img src="${profileUrl}" alt="${actor.name}" loading="lazy" style="${!actor.profile_path ? 'object-fit: contain' : ''}">
                </div>
                <div class="cast-card__name">${actor.name}</div>
                <div class="cast-card__character">${actor.character}</div>
              </div>
            `;
          }).join('');
          castSection.style.display = 'block';
        }
      }
    }
  }
}

function toggleWatchFromDetails(titleId) {
  const newStatus = cycleWatchStatus(titleId);
  const btn = document.getElementById('details-watch-btn');
  if (btn) {
    const icon = newStatus === 'unwatched' ? '○' : newStatus === 'watched' ? '✓' : '↻';
    const label = newStatus === 'unwatched' ? 'Mark Watched' : newStatus === 'watched' ? 'Watched' : 'Rewatched';
    const btnClass = newStatus === 'watched' ? 'watch-chip watch-chip--watched' : newStatus === 'rewatched' ? 'watch-chip watch-chip--rewatched' : 'watch-chip watch-chip--unwatched';
    
    btn.className = btnClass;
    btn.innerHTML = `<span class="watch-chip__icon">${icon}</span> ${label}`;
  }
}
