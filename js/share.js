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
  const width = 800;
  const height = 1000;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const watchStats = typeof getWatchStats === 'function' ? getWatchStats() : { watched: 0, totalTitles: 55, percentComplete: 0, totalRuntime: 0, hoursWatched: 0 };
  const username = typeof getUsername === 'function' ? getUsername() : 'MCU Fan';
  const earnedBadges = typeof getUnlockedBadges === 'function' ? getUnlockedBadges() : [];
  const totalBadges = typeof BADGES !== 'undefined' ? BADGES.length : 15;

  // 1. Background
  ctx.fillStyle = '#0B0B0F';
  ctx.fillRect(0, 0, width, height);

  // Subtle radial glows
  const redGlow = ctx.createRadialGradient(width * 0.85, 120, 10, width * 0.85, 120, 350);
  redGlow.addColorStop(0, 'rgba(237, 29, 36, 0.18)');
  redGlow.addColorStop(1, 'rgba(11, 11, 15, 0)');
  ctx.fillStyle = redGlow;
  ctx.fillRect(0, 0, width, height);

  const goldGlow = ctx.createRadialGradient(100, height * 0.85, 10, 100, height * 0.85, 300);
  goldGlow.addColorStop(0, 'rgba(201, 162, 39, 0.12)');
  goldGlow.addColorStop(1, 'rgba(11, 11, 15, 0)');
  ctx.fillStyle = goldGlow;
  ctx.fillRect(0, 0, width, height);

  // Outer border & frame
  ctx.strokeStyle = '#232636';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 30, 30, width - 60, height - 60, 20);
  ctx.stroke();

  // Top header red accent line
  const gradLine = ctx.createLinearGradient(40, 30, width - 40, 30);
  gradLine.addColorStop(0, '#ED1D24');
  gradLine.addColorStop(0.5, '#C9A227');
  gradLine.addColorStop(1, '#ED1D24');
  ctx.strokeStyle = gradLine;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(50, 30);
  ctx.lineTo(width - 50, 30);
  ctx.stroke();

  // 2. Header Branding
  // Logo square
  ctx.fillStyle = '#ED1D24';
  drawRoundedRect(ctx, 60, 60, 44, 44, 10);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 26px "Barlow Condensed", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', 82, 83);

  // App Name
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 30px "Barlow Condensed", sans-serif';
  ctx.fillText('MCU TRACKER', 118, 76);

  ctx.fillStyle = '#9FA4B8';
  ctx.font = '500 13px "Inter", sans-serif';
  ctx.fillText('FAN COMPANION · mcu-tracker-pi.vercel.app', 118, 96);

  // 3. User info pill
  ctx.textAlign = 'right';
  ctx.fillStyle = '#C9A227';
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.fillText(username, width - 60, 76);
  ctx.fillStyle = '#64687D';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('Marvel Fan Journey', width - 60, 96);

  // Divider
  ctx.strokeStyle = '#1A1C26';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 130);
  ctx.lineTo(width - 60, 130);
  ctx.stroke();

  // 4. Circular Progress & Big Stats
  const ringX = 180;
  const ringY = 270;
  const ringRadius = 85;
  const ringLineWidth = 14;

  // Background ring track
  ctx.beginPath();
  ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
  ctx.strokeStyle = '#1A1C26';
  ctx.lineWidth = ringLineWidth;
  ctx.stroke();

  // Active ring progress
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (Math.PI * 2 * (watchStats.percentComplete / 100));
  if (watchStats.percentComplete > 0) {
    ctx.beginPath();
    ctx.arc(ringX, ringY, ringRadius, startAngle, endAngle);
    ctx.strokeStyle = '#ED1D24';
    ctx.lineWidth = ringLineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Inside Ring Text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px "JetBrains Mono", monospace';
  ctx.fillText(`${watchStats.percentComplete}%`, ringX, ringY - 8);

  ctx.fillStyle = '#9FA4B8';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('COMPLETED', ringX, ringY + 28);

  // Stat Cards beside the ring
  const statLeft = 320;
  const statsList = [
    { label: 'TITLES WATCHED', val: `${watchStats.watched} / ${watchStats.totalTitles}` },
    { label: 'TOTAL RUNTIME', val: `${watchStats.hoursWatched} hours` },
    { label: 'BADGES EARNED', val: `${earnedBadges.length} / ${totalBadges}` },
    { label: 'REWATCH COUNT', val: `${watchStats.rewatched} viewings` }
  ];

  statsList.forEach((st, idx) => {
    const row = Math.floor(idx / 2);
    const col = idx % 2;
    const boxX = statLeft + col * 205;
    const boxY = 195 + row * 80;

    ctx.fillStyle = '#12131A';
    drawRoundedRect(ctx, boxX, boxY, 190, 68, 10);
    ctx.fill();
    ctx.strokeStyle = '#232636';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, boxX, boxY, 190, 68, 10);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#64687D';
    ctx.font = 'bold 10px "Inter", sans-serif';
    ctx.fillText(st.label, boxX + 16, boxY + 14);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText(st.val, boxX + 16, boxY + 34);
  });

  // 5. Phase Breakdown Bars
  const phaseSectionY = 400;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Barlow Condensed", sans-serif';
  ctx.fillText('PHASE BREAKDOWN', 60, phaseSectionY);

  ctx.fillStyle = '#64687D';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('Phases 1 — 6', width - 60, phaseSectionY);

  const barWidth = width - 120;
  const barHeight = 12;
  const rowSpacing = 68;
  const phaseStartY = phaseSectionY + 28;

  for (let p = 1; p <= 6; p++) {
    const pStats = typeof getPhaseStats === 'function' ? getPhaseStats(p) : { watched: 0, total: 1, percent: 0 };
    const curY = phaseStartY + (p - 1) * rowSpacing;

    // Label and progress text
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(`Phase ${p}`, 60, curY);

    ctx.textAlign = 'right';
    ctx.fillStyle = pStats.percent === 100 ? '#C9A227' : '#9FA4B8';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText(`${pStats.watched}/${pStats.total} · ${pStats.percent}%`, width - 60, curY);

    // Track
    const trackY = curY + 6;
    ctx.fillStyle = '#1A1C26';
    drawRoundedRect(ctx, 60, trackY, barWidth, barHeight, 6);
    ctx.fill();

    // Fill
    const fillWidth = Math.max(0, (barWidth * (pStats.percent / 100)));
    if (fillWidth > 0) {
      ctx.fillStyle = pStats.percent === 100 ? '#C9A227' : '#ED1D24';
      drawRoundedRect(ctx, 60, trackY, fillWidth, barHeight, 6);
      ctx.fill();
    }
  }

  // 6. Footer
  const footerY = height - 90;
  ctx.strokeStyle = '#1A1C26';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, footerY);
  ctx.lineTo(width - 60, footerY);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#64687D';
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillText('Generated on MCU Tracker • Track your Marvel Cinematic Universe journey', width / 2, footerY + 32);

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
    <div class="modal" style="max-width: 480px; text-align: center;">
      <div class="modal__header">
        <h2 style="font-family: var(--font-display); font-size: var(--text-h2);">Share Your Progress</h2>
        <button class="modal__close" onclick="closeShareModal()" aria-label="Close modal">✕</button>
      </div>

      <div style="margin-bottom: var(--space-4); max-height: 52vh; overflow-y: auto; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: #0B0B0F;">
        <img src="${dataUrl}" alt="MCU Progress Card Preview" style="width: 100%; height: auto; display: block; border-radius: var(--radius-sm);">
      </div>

      <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="downloadShareCard()">
          <i data-lucide="download" style="width: 16px; height: 16px; margin-right: 6px;"></i>
          Download PNG
        </button>
        ${supportsNativeShare ? `
          <button class="btn btn-secondary" onclick="shareCardNative()">
            <i data-lucide="share-2" style="width: 16px; height: 16px; margin-right: 6px;"></i>
            Share Card
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
  const username = typeof getUsername === 'function' ? getUsername() : 'mcu-fan';
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
  const username = typeof getUsername === 'function' ? getUsername() : 'MCU Fan';
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

