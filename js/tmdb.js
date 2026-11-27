/* =============================================================
   MCU Tracker — TMDB API & Metadata (tmdb.js)
   Fetching, caching posters & title metadata via /api/tmdb proxy
   ============================================================= */

const POSTER_CACHE_KEY = 'mcu_poster_cache_v8';

// Known high-res TMDB poster paths for all 55 titles (instant zero-delay first paint)
const KNOWN_POSTERS = {
  'iron-man': '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
  'incredible-hulk': '/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg',
  'iron-man-2': '/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',
  'thor': '/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg',
  'captain-america-tfa': '/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg',
  'avengers': '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  'iron-man-3': '/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg',
  'thor-dark-world': '/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg',
  'captain-america-ws': '/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg',
  'guardians-1': '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
  'avengers-aou': '/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg',
  'ant-man': '/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg',
  'captain-america-cw': '/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg',
  'doctor-strange': '/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg',
  'guardians-2': '/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg',
  'spider-man-hc': '/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
  'thor-ragnarok': '/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  'black-panther': '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
  'avengers-iw': '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'ant-man-wasp': '/cFQEO687n1K6umXbInzocxcnAQz.jpg',
  'captain-marvel': '/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg',
  'avengers-endgame': '/jtDv3lCnST0fZRvdYFwR5CVwK2x.jpg',
  'spider-man-ffh': '/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
  'wandavision': '/glKDfE6btIRcVB5zrjspRIs4r52.jpg',
  'falcon-ws': '/6kbAMLteGO8yyewYau6bJ683sw7.jpg',
  'loki-s1': '/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'black-widow': '/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
  'what-if-s1': '/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg',
  'shang-chi': '/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg',
  'eternals': '/lFByFSLV5WDJEv3KabbdAF959F2.jpg',
  'hawkeye': '/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg',
  'spider-man-nwh': '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'moon-knight': '/9K3lbMf8TKvL9xGEbzi7TggWCNQ.jpg',
  'doctor-strange-mom': '/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg',
  'ms-marvel': '/3HWWh92kZbD7odwJX7nKmXNZsYo.jpg',
  'thor-love-thunder': '/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
  'she-hulk': '/5xz2orV8f0usyrfGNshcoXHmiaV.jpg',
  'werewolf-by-night': '/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg',
  'black-panther-wf': '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
  'gotg-holiday': '/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg',
  'ant-man-quantumania': '/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
  'guardians-3': '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
  'secret-invasion': '/3rINdUPSy9AklJg74jWHOyUXuZd.jpg',
  'loki-s2': '/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
  'the-marvels': '/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg',
  'echo': '/vFyJH630cF68LohVYjQW49074Sy.jpg',
  'deadpool-wolverine': '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  'agatha-all-along': '/2HKBc5UiFw8JrruHq8S1Y7TnlW0.jpg',
  'captain-america-bnw': '/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
  'thunderbolts': '/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
  'ironheart': '/dOh6MJpdlQhYpLBhzhNQeYGKTZ5.jpg',
  'daredevil-ba': '/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg',
  'fantastic-four': '/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg',
  'avengers-doomsday': '/1zqWkLwC1zLBBBtIWzmkmWeMWnT.jpg',
  'avengers-secret-wars': '/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg'
};

async function fetchPostersFromTMDB() {
  // Read existing cache, pre-seeding from KNOWN_POSTERS if empty
  let cache = {};
  try {
    const raw = localStorage.getItem(POSTER_CACHE_KEY);
    if (raw) cache = JSON.parse(raw);
  } catch(e) {}
  
  // Seed missing cache keys from KNOWN_POSTERS
  let seeded = false;
  for (const [id, path] of Object.entries(KNOWN_POSTERS)) {
    if (!cache[id]) {
      cache[id] = path;
      seeded = true;
    }
  }
  if (seeded) {
    try {
      localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
    } catch(e) {}
  }

// ── Global TMDB Proxy URL Resolver ─────────────────────────
function getTmdbProxyUrl(path, query = '') {
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:'
  );
  const base = isLocal ? 'https://mcu-tracker-pi.vercel.app/api/tmdb' : '/api/tmdb';
  return query ? `${base}?path=${path}&${query}` : `${base}?path=${path}`;
}

  let updated = false;
  
  // Fetch missing posters via /api/tmdb proxy (for any new titles)
  for (const title of MCU_TITLES) {
    if (!title.tmdbId) continue;
    if (cache[title.id]) continue;
    
    try {
      const type = title.tmdbType === 'tv' ? 'tv' : 'movie';
      const response = await fetch(getTmdbProxyUrl(`${type}/${title.tmdbId}`));
      if (response.ok) {
        const data = await response.json();
        if (data.poster_path) {
          cache[title.id] = data.poster_path;
          updated = true;
          try {
            localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
          } catch(e) {}
          // Dispatch event for progressive DOM update
          document.dispatchEvent(new CustomEvent('posterFetched', {
            detail: { titleId: title.id, url: `https://image.tmdb.org/t/p/w500${data.poster_path}` }
          }));
        }
      }
    } catch(err) {
      // In offline or local static mode without proxy, KNOWN_POSTERS already covers all titles
    }
  }
  
  if (updated) {
    try {
      localStorage.setItem(POSTER_CACHE_KEY, JSON.stringify(cache));
    } catch(e) {}
  }
}

function getPosterUrl(titleId) {
  try {
    const raw = localStorage.getItem(POSTER_CACHE_KEY);
    if (raw) {
      const cache = JSON.parse(raw);
      if (cache[titleId]) {
        return `https://image.tmdb.org/t/p/w500${cache[titleId]}`;
      }
    }
  } catch(e) {}
  if (KNOWN_POSTERS[titleId]) {
    return `https://image.tmdb.org/t/p/w500${KNOWN_POSTERS[titleId]}`;
  }
  return null;
}

// Fetch deep details (cast, crew, backdrop, overview) via /api/tmdb proxy
async function fetchTitleDetails(tmdbId, type = 'movie') {
  const cacheKey = `mcu_details_${tmdbId}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch(e) {}
  
  try {
    const url = getTmdbProxyUrl(`${type}/${tmdbId}`, 'append_to_response=credits');
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch(e) {}
      return data;
    }
  } catch(err) {
    console.warn('Failed to fetch TMDB details via proxy:', err);
  }
  return null;
}

function getBackdropUrl(backdropPath, size = 'w1280') {
  if (!backdropPath) return null;
  return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
}
