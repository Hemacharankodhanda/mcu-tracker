/* =============================================================
   MCU Tracker — TMDB API (tmdb.js)
   Fetching and caching posters
   ============================================================= */

// User provided TMDB API key
const TMDB_API_KEY = '9816fd193bb1751d9e634e1999380bd7';

async function fetchPostersFromTMDB() {
  if (TMDB_API_KEY === 'YOUR_API_KEY_HERE' || !TMDB_API_KEY) {
    console.warn('TMDB API Key missing. Skipping poster fetch.');
    return;
  }
  
  // Read existing cache
  let cache = {};
  try {
    const raw = localStorage.getItem('mcu_poster_cache_v7');
    if (raw) cache = JSON.parse(raw);
  } catch(e) {}
  
  let updated = false;
  
  // Fetch missing posters
  for (const title of MCU_TITLES) {
    if (!title.tmdbId) continue;
    if (cache[title.id]) continue;
    
    try {
      const type = title.tmdbType === 'tv' ? 'tv' : 'movie';
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${title.tmdbId}?api_key=${TMDB_API_KEY}`);
      if (response.ok) {
        const data = await response.json();
        if (data.poster_path) {
          cache[title.id] = data.poster_path;
          updated = true;
          // Dispatch event for progressive DOM update
          document.dispatchEvent(new CustomEvent('posterFetched', {
            detail: { titleId: title.id, url: `https://image.tmdb.org/t/p/w500${data.poster_path}` }
          }));
        }
      }
    } catch(err) {
      console.error(`Failed to fetch TMDB data for ${title.name}`, err);
    }
  }
  
  if (updated) {
    localStorage.setItem('mcu_poster_cache_v7', JSON.stringify(cache));
  }
}

function getPosterUrl(titleId) {
  try {
    const raw = localStorage.getItem('mcu_poster_cache_v7');
    if (raw) {
      const cache = JSON.parse(raw);
      if (cache[titleId]) {
        return `https://image.tmdb.org/t/p/w500${cache[titleId]}`;
      }
    }
  } catch(e) {}
  return null;
}

// Fetch deep details (cast, crew, backdrop, overview)
async function fetchTitleDetails(tmdbId, type = 'movie') {
  if (!TMDB_API_KEY || TMDB_API_KEY === 'YOUR_API_KEY_HERE') return null;
  
  const cacheKey = `mcu_details_${tmdbId}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch(e) {}
  
  try {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
    if (res.ok) {
      const data = await res.json();
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch(e) {}
      return data;
    }
  } catch(err) {
    console.error('Failed to fetch TMDB details', err);
  }
  return null;
}

function getBackdropUrl(backdropPath, size = 'w1280') {
  if (!backdropPath) return null;
  return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
}
