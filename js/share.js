/* =============================================================
   MCU Tracker — Shareable Progress Card (share.js)
   Draws progress card on <canvas>, export PNG, Web Share API
   ============================================================= */

let shareCanvasInstance = null;

function initShareButton() {
  const container = document.getElementById('profile-share-container');
  if (!container) return;
  container.innerHTML = `
    <button class="btn btn-secondary btn-sm" 
            onclick="openShareModal()" 
            id="btn-share-progress"
            style="display: inline-flex; align-items: center; gap: 6px; margin-top: var(--space-2);">
      <i data-lucide="share-2" style="width: 16px; height: 16px;"></i>
      <span>Share My Progress</span>
    </button>
  `;
  if (window.lucide) {
    lucide.createIcons();
  }
}

function generateProgressCardCanvas() {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const watchStats = typeof getWatchStats === 'function' ? getWatchStats() : { watched: 0, totalTitles: 55, percentComplete: 0, totalRuntime: 0, hoursWatched: 0, rewatched: 0 };
  const username = typeof getUsername === 'function' ? getUsername() : 'Hero';
  const earnedBadgeIds = typeof getUnlockedBadges === 'function' ? getUnlockedBadges() : [];
  const totalBadges = typeof BADGES !== 'undefined' ? BADGES.length : 15;
  const streak = typeof getStreak === 'function' ? getStreak() : { current: 0, best: 0 };
  const infinityStats = typeof getSagaStats === 'function' ? getSagaStats('infinity') : { watched: 0, total: 23, percent: 0 };
  const multiverseStats = typeof getSagaStats === 'function' ? getSagaStats('multiverse') : { watched: 0, total: 32, percent: 0 };

  const allBadgesList = typeof BADGES !== 'undefined' ? BADGES : [
    { id: 'first-watch', name: 'First Watch', icon: '👁️' },
    { id: 'phase1', name: 'Phase 1 Complete', icon: '🛡️' },
    { id: 'phase2', name: 'Phase 2 Complete', icon: '⚡' },
    { id: 'phase3', name: 'Phase 3 Complete', icon: '💎' },
    { id: 'phase4', name: 'Phase 4 Complete', icon: '🌌' },
    { id: 'phase5', name: 'Phase 5 Complete', icon: '🪐' },
    { id: 'phase6', name: 'Phase 6 Complete', icon: '⏳' },
    { id: 'half-way', name: '50% Club', icon: '🎯' },
    { id: 'completionist', name: 'Completionist', icon: '✨' },
    { id: 'infinity', name: 'Infinity Saga', icon: '🏆' },
    { id: 'multiverse', name: 'Multiverse Saga', icon: '🌀' },
    { id: 'streak-7', name: '7-Day Streak', icon: '🔥' },
    { id: 'streak-3', name: '3-Day Streak', icon: '⚡' },
    { id: 'quiz-perfect', name: 'Perfect Score', icon: '💯' },
    { id: 'quiz-master', name: 'Quiz Master', icon: '🧠' }
  ];

  // 1. Base Canvas & Cosmic Atmospheric Glows
  ctx.fillStyle = '#08080C';
  ctx.fillRect(0, 0, width, height);

  // Top-left cosmic red glow
  const glowTopLeft = ctx.createRadialGradient(180, 160, 0, 180, 160, 560);
  glowTopLeft.addColorStop(0, 'rgba(237, 29, 36, 0.24)');
  glowTopLeft.addColorStop(0.5, 'rgba(237, 29, 36, 0.07)');
  glowTopLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowTopLeft;
  ctx.fillRect(0, 0, width, height);

  // Bottom-right cosmic gold glow
  const glowBottomRight = ctx.createRadialGradient(900, 1180, 0, 900, 1180, 520);
  glowBottomRight.addColorStop(0, 'rgba(245, 166, 35, 0.18)');
  glowBottomRight.addColorStop(0.5, 'rgba(245, 166, 35, 0.05)');
  glowBottomRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowBottomRight;
  ctx.fillRect(0, 0, width, height);

  // Center subtle space blue aura
  const glowCenter = ctx.createRadialGradient(540, 540, 0, 540, 540, 420);
  glowCenter.addColorStop(0, 'rgba(59, 130, 246, 0.07)');
  glowCenter.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowCenter;
  ctx.fillRect(0, 0, width, height);

  // Outer Glassmorphic Card Frame
  ctx.fillStyle = 'rgba(13, 14, 22, 0.88)';
  drawRoundedRect(ctx, 36, 36, 1008, 1278, 24);
  ctx.fill();

  const outerBorderGrad = ctx.createLinearGradient(36, 36, 1044, 1314);
  outerBorderGrad.addColorStop(0, 'rgba(237, 29, 36, 0.55)');
  outerBorderGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.14)');
  outerBorderGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.06)');
  outerBorderGrad.addColorStop(1, 'rgba(245, 166, 35, 0.45)');
  ctx.strokeStyle = outerBorderGrad;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 36, 36, 1008, 1278, 24);
  ctx.stroke();

  // 2. Header Branding & Identity
  const logoX = 68;
  const logoY = 68;

  // Marvel Logo badge
  const logoGrad = ctx.createLinearGradient(logoX, logoY, logoX + 56, logoY + 56);
  logoGrad.addColorStop(0, '#ED1D24');
  logoGrad.addColorStop(1, '#991B1B');
  ctx.fillStyle = logoGrad;
  drawRoundedRect(ctx, logoX, logoY, 56, 56, 12);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 34px "Barlow Condensed", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', logoX + 28, logoY + 30);

  // App Name
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px "Barlow Condensed", sans-serif';
  ctx.fillText('MCU TRACKER', 138, 86);

  ctx.fillStyle = '#8E95A5';
  ctx.font = '500 13px "Inter", sans-serif';
  ctx.fillText('MULTIVERSE PASSPORT · mcu-tracker-pi.vercel.app', 138, 112);

  // Right Side: User Avatar & Rank Badge
  const avatarX = 976;
  const avatarY = 96;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, 26, 0, Math.PI * 2);
  ctx.fillStyle = '#1A1D2B';
  ctx.fill();

  const avatarBorderGrad = ctx.createLinearGradient(avatarX - 26, avatarY - 26, avatarX + 26, avatarY + 26);
  avatarBorderGrad.addColorStop(0, '#F5A623');
  avatarBorderGrad.addColorStop(1, '#ED1D24');
  ctx.strokeStyle = avatarBorderGrad;
  ctx.lineWidth = 2;
  ctx.stroke();

  const initial = (username.trim().charAt(0) || 'H').toUpperCase();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 22px "Inter", sans-serif';
  ctx.fillText(initial, avatarX, avatarY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Inter", sans-serif';
  ctx.fillText(username, 936, 86);

  const pct = watchStats.percentComplete || 0;
  let rankTitle = 'AVENGER RECRUIT';
  let rankColor = '#A1A1AA';
  if (pct >= 85) {
    rankTitle = "EARTH'S MIGHTIEST";
    rankColor = '#F5A623';
  } else if (pct >= 40) {
    rankTitle = 'AVENGER VETERAN';
    rankColor = '#60A5FA';
  }
  ctx.fillStyle = rankColor;
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText(rankTitle, 936, 112);

  // Header Divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(68, 146);
  ctx.lineTo(1012, 146);
  ctx.stroke();

  // 3. Hero Section: Glowing Circular Progress + 4 Glassmorphic Stat Cards
  const ringX = 205;
  const ringY = 295;
  const ringRadius = 92;
  const ringLineWidth = 18;

  // Background ring track
  ctx.beginPath();
  ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
  ctx.strokeStyle = '#171926';
  ctx.lineWidth = ringLineWidth;
  ctx.stroke();

  // Glowing Active Progress Arc
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (Math.PI * 2 * (pct / 100));
  if (pct > 0) {
    const ringGrad = ctx.createLinearGradient(ringX - ringRadius, ringY - ringRadius, ringX + ringRadius, ringY + ringRadius);
    ringGrad.addColorStop(0, '#ED1D24');
    ringGrad.addColorStop(0.5, '#F97316');
    ringGrad.addColorStop(1, '#F5A623');

    ctx.beginPath();
    ctx.arc(ringX, ringY, ringRadius, startAngle, endAngle);
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = ringLineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Inside Ring Text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px "JetBrains Mono", monospace';
  ctx.fillText(`${pct}%`, ringX, ringY - 14);

  ctx.fillStyle = '#8E95A5';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('COMPLETED', ringX, ringY + 22);

  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText(`${watchStats.watched} / ${watchStats.totalTitles} TITLES`, ringX, ringY + 44);

  // 4 Metric Cards Grid
  const statGridX = 350;
  const statCardW = 320;
  const statCardH = 96;
  const statGapX = 22;
  const statGapY = 16;
  const statTopY = 195;

  const statItems = [
    { label: 'WATCHED RUNTIME', val: `${watchStats.hoursWatched} hrs`, sub: 'Marvel binge time', color: '#ED1D24' },
    { label: 'ENCORE REWATCHES', val: `${watchStats.rewatched || 0} Viewings`, sub: 'Marathon reruns', color: '#A855F7' },
    { label: 'QUIZ STREAK', val: `${streak.current || streak.best || 0} Days 🔥`, sub: `Best record: ${streak.best || 0}d`, color: '#F59E0B' },
    { label: 'BADGES EARNED', val: `${earnedBadgeIds.length} / ${totalBadges} 🏆`, sub: `${Math.round((earnedBadgeIds.length / totalBadges) * 100)}% unlocked`, color: '#10B981' }
  ];

  statItems.forEach((st, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const bx = statGridX + col * (statCardW + statGapX);
    const by = statTopY + row * (statCardH + statGapY);

    ctx.fillStyle = 'rgba(20, 22, 34, 0.75)';
    drawRoundedRect(ctx, bx, by, statCardW, statCardH, 12);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, bx, by, statCardW, statCardH, 12);
    ctx.stroke();

    // Left accent bar
    ctx.fillStyle = st.color;
    drawRoundedRect(ctx, bx, by + 12, 4, statCardH - 24, 2);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#71788E';
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.fillText(st.label, bx + 18, by + 16);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText(st.val, bx + 18, by + 36);

    ctx.fillStyle = '#64687D';
    ctx.font = '500 12px "Inter", sans-serif';
    ctx.fillText(st.sub, bx + 18, by + 66);
  });

  // 4. Saga Progression Cards
  const sagaSectionY = 435;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Barlow Condensed", sans-serif';
  ctx.fillText('SAGA MILESTONES', 68, sagaSectionY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#64687D';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('THE SAGA CHRONOLOGY', 1012, sagaSectionY);

  const sagaCardW = 462;
  const sagaCardH = 88;
  const sagaY = 465;

  const sagas = [
    { name: 'THE INFINITY SAGA', icon: '💎', sub: 'Phases 1 — 3 · 23 Titles', stats: infinityStats, color: '#F5A623', x: 68 },
    { name: 'THE MULTIVERSE SAGA', icon: '🌀', sub: 'Phases 4 — 6 · 32 Titles', stats: multiverseStats, color: '#06B6D4', x: 550 }
  ];

  sagas.forEach(sg => {
    ctx.fillStyle = 'rgba(20, 22, 34, 0.75)';
    drawRoundedRect(ctx, sg.x, sagaY, sagaCardW, sagaCardH, 12);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, sg.x, sagaY, sagaCardW, sagaCardH, 12);
    ctx.stroke();

    // Accent line
    ctx.fillStyle = sg.color;
    drawRoundedRect(ctx, sg.x, sagaY + 12, 4, sagaCardH - 24, 2);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(`${sg.icon}  ${sg.name}`, sg.x + 18, sagaY + 14);

    ctx.fillStyle = '#8E95A5';
    ctx.font = '500 12px "Inter", sans-serif';
    ctx.fillText(sg.sub, sg.x + 18, sagaY + 36);

    ctx.textAlign = 'right';
    ctx.fillStyle = sg.stats.percent === 100 ? '#F5A623' : '#FFFFFF';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillText(`${sg.stats.watched}/${sg.stats.total} (${sg.stats.percent}%)`, sg.x + sagaCardW - 18, sagaY + 14);

    // Mini bar
    const barW = sagaCardW - 36;
    const barH = 8;
    const barX = sg.x + 18;
    const barY = sagaY + 62;

    ctx.fillStyle = '#171926';
    drawRoundedRect(ctx, barX, barY, barW, barH, 4);
    ctx.fill();

    const fillW = Math.max(0, barW * (sg.stats.percent / 100));
    if (fillW > 0) {
      ctx.fillStyle = sg.color;
      drawRoundedRect(ctx, barX, barY, fillW, barH, 4);
      ctx.fill();
    }
  });

  // 5. Trophy Case Showcase
  const trophySectionY = 580;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Barlow Condensed", sans-serif';
  ctx.fillText('TROPHY CASE', 68, trophySectionY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText(`${earnedBadgeIds.length} OF ${totalBadges} BADGES EARNED`, 1012, trophySectionY);

  const chipW = 226;
  const chipH = 92;
  const chipGap = 14;
  const chipY = 608;

  const unlockedBadges = earnedBadgeIds.map(id => allBadgesList.find(b => b.id === id)).filter(Boolean);
  const slots = [];
  for (let i = 0; i < 4; i++) {
    if (unlockedBadges[i]) {
      slots.push({ earned: true, ...unlockedBadges[i] });
    } else {
      const remaining = allBadgesList.find(b => !earnedBadgeIds.includes(b.id) && !slots.some(s => s.id === b.id));
      slots.push({ earned: false, name: remaining ? remaining.name : 'Secret Badge', icon: '🔒' });
    }
  }

  slots.forEach((chip, i) => {
    const cx = 68 + i * (chipW + chipGap);
    if (chip.earned) {
      ctx.fillStyle = 'rgba(26, 29, 44, 0.85)';
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.fill();

      ctx.strokeStyle = 'rgba(245, 166, 35, 0.4)';
      ctx.lineWidth = 1.5;
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '32px sans-serif';
      ctx.fillText(chip.icon, cx + 36, chipY + 46);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px "Inter", sans-serif';
      ctx.fillText(chip.name, cx + 64, chipY + 34);

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText('✓ UNLOCKED', cx + 64, chipY + 58);
    } else {
      ctx.fillStyle = 'rgba(16, 17, 26, 0.6)';
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, cx, chipY, chipW, chipH, 12);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '26px sans-serif';
      ctx.fillText('🔒', cx + 36, chipY + 46);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#64687D';
      ctx.font = 'bold 13px "Inter", sans-serif';
      ctx.fillText(chip.name, cx + 64, chipY + 34);

      ctx.fillStyle = '#4B5563';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('LOCKED', cx + 64, chipY + 58);
    }
  });

  // 6. Phase by Phase Breakdown
  const phaseSectionY = 730;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Barlow Condensed", sans-serif';
  ctx.fillText('PHASE BY PHASE BREAKDOWN', 68, phaseSectionY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#8E95A5';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('PHASES 1 — 6', 1012, phaseSectionY);

  const phaseNames = {
    1: 'Avengers Assembled',
    2: 'Age of Heroes',
    3: 'Infinity War',
    4: 'Multiverse Unfolds',
    5: 'Secret Conflicts',
    6: 'Battleworld'
  };

  const pStartY = 760;
  const pRowHeight = 68;
  const pBarW = 944;
  const pBarH = 14;

  for (let p = 1; p <= 6; p++) {
    const pStats = typeof getPhaseStats === 'function' ? getPhaseStats(p) : { watched: 0, total: 1, percent: 0 };
    const curY = pStartY + (p - 1) * pRowHeight;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(`Phase ${p}: ${phaseNames[p]}`, 68, curY);

    ctx.textAlign = 'right';
    ctx.fillStyle = pStats.percent === 100 ? '#F5A623' : '#9FA4B8';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    const tag = pStats.percent === 100 ? '✓ 100% COMPLETE' : `${pStats.watched}/${pStats.total} · ${pStats.percent}%`;
    ctx.fillText(tag, 1012, curY);

    // Track
    const trackY = curY + 26;
    ctx.fillStyle = '#171926';
    drawRoundedRect(ctx, 68, trackY, pBarW, pBarH, 7);
    ctx.fill();

    // Fill with gradient
    const fillW = Math.max(0, pBarW * (pStats.percent / 100));
    if (fillW > 0) {
      if (pStats.percent === 100) {
        const goldFill = ctx.createLinearGradient(68, 0, 1012, 0);
        goldFill.addColorStop(0, '#F5A623');
        goldFill.addColorStop(1, '#FCD34D');
        ctx.fillStyle = goldFill;
      } else {
        const redFill = ctx.createLinearGradient(68, 0, 1012, 0);
        redFill.addColorStop(0, '#ED1D24');
        redFill.addColorStop(1, '#EA580C');
        ctx.fillStyle = redFill;
      }
      drawRoundedRect(ctx, 68, trackY, fillW, pBarH, 7);
      ctx.fill();
    }
  }

  // 7. Footer
  const footerY = 1215;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(68, footerY);
  ctx.lineTo(1012, footerY);
  ctx.stroke();

  // Diamond Accent
  ctx.fillStyle = '#ED1D24';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '14px sans-serif';
  ctx.fillText('◆', 540, footerY);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#8E95A5';
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.fillText('MCU TRACKER · THE ULTIMATE MARVEL WATCH COMPANION', 68, footerY + 36);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#ED1D24';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('mcu-tracker-pi.vercel.app', 1012, footerY + 36);

  shareCanvasInstance = canvas;
  return canvas;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  // Fallback for older engines
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function openShareModal() {
  const canvas = generateProgressCardCanvas();
  const dataUrl = canvas.toDataURL('image/png');

  let modalOverlay = document.getElementById('share-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'share-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const supportsNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  modalOverlay.innerHTML = `
    <div class="modal" style="max-width: 520px; text-align: center; padding: var(--space-4);">
      <div class="modal__header" style="margin-bottom: var(--space-3);">
        <h2 style="font-family: var(--font-display); font-size: var(--text-h2);">Share Your Progress</h2>
        <button class="modal__close" onclick="closeShareModal()" aria-label="Close modal">✕</button>
      </div>

      <div style="margin-bottom: var(--space-4); max-height: 58vh; overflow-y: auto; border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.1); background: #08080C; padding: 8px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.6);">
        <img src="${dataUrl}" alt="MCU Progress Card Preview" style="width: 100%; height: auto; max-height: 54vh; object-fit: contain; display: block; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.7);">
      </div>

      <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="downloadShareCard()" style="display: inline-flex; align-items: center; gap: 8px;">
          <i data-lucide="download" style="width: 16px; height: 16px;"></i>
          <span>Download HQ Image</span>
        </button>
        ${supportsNativeShare ? `
          <button class="btn btn-secondary" onclick="shareCardNative()" style="display: inline-flex; align-items: center; gap: 8px;">
            <i data-lucide="share-2" style="width: 16px; height: 16px;"></i>
            <span>Share Card</span>
          </button>
        ` : ''}
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    modalOverlay.classList.add('modal-overlay--visible');
    if (window.lucide) lucide.createIcons();
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeShareModal();
  });
}

function closeShareModal() {
  const modalOverlay = document.getElementById('share-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--visible');
  }
}

function downloadShareCard() {
  if (!shareCanvasInstance) generateProgressCardCanvas();
  const username = typeof getUsername === 'function' ? getUsername() : 'hero';
  const cleanName = username.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `mcu-tracker-${cleanName}-progress.png`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = shareCanvasInstance.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function shareCardNative() {
  if (!shareCanvasInstance) generateProgressCardCanvas();
  const username = typeof getUsername === 'function' ? getUsername() : 'Hero';
  const stats = typeof getWatchStats === 'function' ? getWatchStats() : { percentComplete: 0 };

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      if (shareCanvasInstance.toBlob && navigator.canShare) {
        shareCanvasInstance.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'mcu-progress.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `${username}'s MCU Watch Progress`,
              text: `I've watched ${stats.percentComplete}% of the Marvel Cinematic Universe on MCU Tracker!`
            });
            return;
          }
          // Fallback share without files
          await navigator.share({
            title: `${username}'s MCU Watch Progress`,
            text: `I've watched ${stats.percentComplete}% of the Marvel Cinematic Universe on MCU Tracker!`,
            url: window.location.origin
          });
        }, 'image/png');
      } else {
        await navigator.share({
          title: `${username}'s MCU Watch Progress`,
          text: `I've watched ${stats.percentComplete}% of the Marvel Cinematic Universe on MCU Tracker!`,
          url: window.location.origin
        });
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Native share error, falling back to download:', err);
        downloadShareCard();
      }
    }
  } else {
    downloadShareCard();
  }
}
