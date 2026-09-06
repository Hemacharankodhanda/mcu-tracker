// Vercel Web Analytics initialization
// This script initializes Vercel Web Analytics for tracking page views and custom events
// Documentation: https://vercel.com/docs/analytics

import { inject } from '../node_modules/@vercel/analytics/dist/index.js';

// Initialize Vercel Analytics
inject({
  mode: 'auto', // auto-detect development vs production
  debug: true   // enable debug logging in development
});
