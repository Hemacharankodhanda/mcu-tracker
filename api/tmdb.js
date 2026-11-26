// api/tmdb.js — Vercel Serverless Function Proxy for TMDB API
// Protects the TMDB API key by keeping it server-side in Vercel Environment Variables.

export default async function handler(req, res) {
  // Only permit GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path: endpoint, ...queryParams } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing TMDB API endpoint path parameter' });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'TMDB_API_KEY is not configured in Vercel Environment Variables.' 
    });
  }

  // Sanitize path (strip leading slashes)
  const cleanPath = String(endpoint).replace(/^\/+/, '');

  // Build TMDB request query parameters
  const params = new URLSearchParams({
    api_key: apiKey,
    ...queryParams
  });

  const tmdbUrl = `https://api.themoviedb.org/3/${cleanPath}?${params.toString()}`;

  try {
    let response;
    let attempts = 0;
    while (attempts < 2) {
      try {
        attempts++;
        response = await fetch(tmdbUrl);
        break;
      } catch (err) {
        if (attempts >= 2) throw err;
        await new Promise(r => setTimeout(r, 200));
      }
    }

    const data = await response.json();

    // Cache responses at Vercel's Edge network for 24 hours (stale-while-revalidate for 7 days)
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('TMDB Proxy Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
