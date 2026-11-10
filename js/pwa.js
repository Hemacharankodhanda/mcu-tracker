/* =============================================================
   MCU Tracker — PWA Support (pwa.js)
   Service worker registration, install prompt handling
   ============================================================= */

let deferredInstallPrompt = null;

function initPwa() {
  registerServiceWorker();
  setupInstallPrompt();
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          // Listen for updates
          reg.onupdatefound = () => {
            const installing = reg.installing;
            if (installing) {
              installing.onstatechange = () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.');
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('Service worker registration failed:', err);
        });
    });
  }
}

function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar or install banner
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallPromptUI();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    hideInstallPromptUI();
    console.log('MCU Tracker successfully installed as PWA');
  });
}

function showInstallPromptUI() {
  // If button already rendered, show it
  let installContainer = document.getElementById('pwa-install-container');
  if (!installContainer) {
    installContainer = document.createElement('div');
    installContainer.id = 'pwa-install-container';
    installContainer.style.cssText = 'position: fixed; top: 16px; right: 16px; z-index: 999; display: flex; align-items: center;';
    document.body.appendChild(installContainer);
  }

  installContainer.innerHTML = `
    <button class="install-app-btn" onclick="triggerPwaInstall()" aria-label="Install MCU Tracker as an app">
      <i data-lucide="download" style="width: 14px; height: 14px;"></i>
      <span>Install App</span>
    </button>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

function hideInstallPromptUI() {
  const installContainer = document.getElementById('pwa-install-container');
  if (installContainer) {
    installContainer.remove();
  }
}

async function triggerPwaInstall() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  if (choice.outcome === 'accepted') {
    hideInstallPromptUI();
  }
  deferredInstallPrompt = null;
}

// Auto init on script load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPwa);
} else {
  initPwa();
}

