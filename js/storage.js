/* =============================================================
   MCU Tracker — Storage (storage.js)
   localStorage abstraction for persistence
   ============================================================= */

const STORAGE_KEYS = {
  WATCH_STATUS: 'mcu_watch_status',
  RATINGS: 'mcu_ratings',
  REWATCH: 'mcu_rewatch',
  QUIZ_SCORES: 'mcu_quiz_scores',
  STREAK: 'mcu_streak',
  DAILY_QUIZ: 'mcu_daily_quiz',
  USERNAME: 'mcu_username',
  WATCH_ORDER: 'mcu_watch_order',
  UNLOCKED_BADGES: 'mcu_unlocked_badges'
};

// ── Generic helpers ─────────────────────────────────────────

function storageGet(key, fallback = {}) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

// ── Watch Status ────────────────────────────────────────────
// Status: 'unwatched' | 'watched' | 'rewatched'

function getWatchStatus(titleId) {
  const data = storageGet(STORAGE_KEYS.WATCH_STATUS);
  return data[titleId] || 'unwatched';
}

function setWatchStatus(titleId, status) {
  const data = storageGet(STORAGE_KEYS.WATCH_STATUS);
  data[titleId] = status;
  storageSet(STORAGE_KEYS.WATCH_STATUS, data);
}

function getAllWatchStatuses() {
  return storageGet(STORAGE_KEYS.WATCH_STATUS);
}

function cycleWatchStatus(titleId) {
  const current = getWatchStatus(titleId);
  const next = current === 'unwatched' ? 'watched'
             : current === 'watched' ? 'rewatched'
             : 'unwatched';
  setWatchStatus(titleId, next);
  if (next === 'rewatched') {
    incrementRewatch(titleId);
  }
  return next;
}

// ── Ratings ─────────────────────────────────────────────────

function getRating(titleId) {
  const data = storageGet(STORAGE_KEYS.RATINGS);
  return data[titleId] || 0;
}

function setRating(titleId, stars) {
  const data = storageGet(STORAGE_KEYS.RATINGS);
  data[titleId] = stars;
  storageSet(STORAGE_KEYS.RATINGS, data);
}

function getAllRatings() {
  return storageGet(STORAGE_KEYS.RATINGS);
}

// ── Rewatch Count ───────────────────────────────────────────

function getRewatchCount(titleId) {
  const data = storageGet(STORAGE_KEYS.REWATCH);
  return data[titleId] || 0;
}

function incrementRewatch(titleId) {
  const data = storageGet(STORAGE_KEYS.REWATCH);
  data[titleId] = (data[titleId] || 0) + 1;
  storageSet(STORAGE_KEYS.REWATCH, data);
}

// ── Quiz Scores ─────────────────────────────────────────────

function getQuizScores() {
  return storageGet(STORAGE_KEYS.QUIZ_SCORES, []);
}

function saveQuizAttempt(categoryId, score, total) {
  const scores = getQuizScores();
  scores.push({
    categoryId,
    score,
    total,
    date: new Date().toISOString()
  });
  storageSet(STORAGE_KEYS.QUIZ_SCORES, scores);
}

function getBestScore(categoryId) {
  const scores = getQuizScores();
  const catScores = scores.filter(s => s.categoryId === categoryId);
  if (catScores.length === 0) return null;
  return catScores.reduce((best, s) => s.score > best.score ? s : best);
}

// ── Streak ──────────────────────────────────────────────────

function getStreak() {
  const data = storageGet(STORAGE_KEYS.STREAK, { current: 0, best: 0, lastDate: null });
  return data;
}

function updateStreak() {
  const data = getStreak();
  const today = new Date().toISOString().split('T')[0];
  
  if (data.lastDate === today) return data; // Already updated today
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (data.lastDate === yesterday) {
    // Continue streak
    data.current += 1;
  } else {
    // Streak broken, start fresh
    data.current = 1;
  }
  
  if (data.current > data.best) {
    data.best = data.current;
  }
  
  data.lastDate = today;
  storageSet(STORAGE_KEYS.STREAK, data);
  return data;
}

// ── Daily Quiz ──────────────────────────────────────────────

function getDailyQuizStatus() {
  const data = storageGet(STORAGE_KEYS.DAILY_QUIZ, {});
  const today = new Date().toISOString().split('T')[0];
  return data[today] || null;
}

function markDailyQuizDone(score, total) {
  const data = storageGet(STORAGE_KEYS.DAILY_QUIZ, {});
  const today = new Date().toISOString().split('T')[0];
  data[today] = { score, total, completedAt: new Date().toISOString() };
  storageSet(STORAGE_KEYS.DAILY_QUIZ, data);
  updateStreak();
}

// ── Username ────────────────────────────────────────────────

function getUsername() {
  return localStorage.getItem(STORAGE_KEYS.USERNAME) || 'MCU Fan';
}

function setUsername(name) {
  localStorage.setItem(STORAGE_KEYS.USERNAME, name);
}

// ── Watch Order ─────────────────────────────────────────────

function getWatchOrder() {
  try {
    const order = localStorage.getItem(STORAGE_KEYS.WATCH_ORDER);
    return (order === 'chronological' || order === 'release') ? order : 'release';
  } catch {
    return 'release';
  }
}

function setWatchOrder(order) {
  try {
    localStorage.setItem(STORAGE_KEYS.WATCH_ORDER, order);
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

// ── Badges Storage ──────────────────────────────────────────

function getUnlockedBadges() {
  const primary = storageGet(STORAGE_KEYS.UNLOCKED_BADGES, null);
  if (primary && Array.isArray(primary)) return primary;
  const legacy = storageGet('mcu_earned_badges', []);
  return Array.isArray(legacy) ? legacy : [];
}

function setUnlockedBadges(badgeIds) {
  storageSet(STORAGE_KEYS.UNLOCKED_BADGES, badgeIds);
  storageSet('mcu_earned_badges', badgeIds);
}

// ── Stats Helpers ───────────────────────────────────────────

function getWatchStats() {
  const statuses = getAllWatchStatuses();
  const totalTitles = MCU_TITLES.length;
  let watched = 0;
  let rewatched = 0;
  let totalRuntime = 0;
  let totalCatalogRuntime = 0;
  
  MCU_TITLES.forEach(title => {
    const rt = Number(title.runtime) || 0;
    totalCatalogRuntime += rt;
    const status = statuses[title.id];
    if (status === 'watched' || status === 'rewatched') {
      watched++;
      totalRuntime += rt;
    }
    if (status === 'rewatched') {
      rewatched++;
    }
  });
  
  const runtimeRemaining = Math.max(0, totalCatalogRuntime - totalRuntime);

  return {
    totalTitles,
    watched,
    rewatched,
    unwatched: Math.max(0, totalTitles - watched),
    percentComplete: totalTitles > 0 ? Math.round((watched / totalTitles) * 100) : 0,
    totalRuntime,
    hoursWatched: Math.round(totalRuntime / 60),
    totalCatalogRuntime,
    totalCatalogHours: Math.round(totalCatalogRuntime / 60),
    runtimeRemaining,
    hoursRemaining: Math.round(runtimeRemaining / 60)
  };
}

function getSagaStats(sagaId) {
  const titles = getTitlesBySaga(sagaId);
  const statuses = getAllWatchStatuses();
  const total = titles.length;
  let watched = 0;
  let runtimeWatched = 0;
  let totalRuntime = 0;
  
  titles.forEach(t => {
    const rt = Number(t.runtime) || 0;
    totalRuntime += rt;
    if (statuses[t.id] === 'watched' || statuses[t.id] === 'rewatched') {
      watched++;
      runtimeWatched += rt;
    }
  });
  
  return {
    total,
    watched,
    percent: total > 0 ? Math.round((watched / total) * 100) : 0,
    totalRuntime,
    runtimeWatched,
    runtimeRemaining: Math.max(0, totalRuntime - runtimeWatched)
  };
}

function getPhaseStats(phase) {
  const titles = getTitlesByPhase(phase);
  const statuses = getAllWatchStatuses();
  const total = titles.length;
  let watched = 0;
  let rewatched = 0;
  let runtimeWatched = 0;
  let totalRuntime = 0;
  
  titles.forEach(t => {
    const rt = Number(t.runtime) || 0;
    totalRuntime += rt;
    if (statuses[t.id] === 'watched' || statuses[t.id] === 'rewatched') {
      watched++;
      runtimeWatched += rt;
    }
    if (statuses[t.id] === 'rewatched') {
      rewatched++;
    }
  });
  
  return {
    phase,
    total,
    watched,
    rewatched,
    unwatched: Math.max(0, total - watched),
    percent: total > 0 ? Math.round((watched / total) * 100) : 0,
    totalRuntime,
    runtimeWatched,
    runtimeRemaining: Math.max(0, totalRuntime - runtimeWatched)
  };
}

function getQuizStats() {
  const scores = getQuizScores();
  const streak = getStreak();
  const totalQuizzes = scores.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(scores.reduce((sum, s) => sum + (s.score / s.total) * 100, 0) / totalQuizzes)
    : 0;
  const perfectScores = scores.filter(s => s.score === s.total).length;
  
  return {
    totalQuizzes,
    avgScore,
    perfectScores,
    currentStreak: streak.current,
    bestStreak: streak.best
  };
}
