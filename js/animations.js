/* =============================================================
   MCU Tracker — Animations (animations.js)
   Helpers for counting numbers and micro-interactions
   ============================================================= */

/**
 * Animates a number counting up from 0 to targetValue inside elementId.
 * Respects prefers-reduced-motion by skipping the animation.
 */
function animateCounter(elementId, targetValue, duration = 1000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    element.textContent = targetValue;
    return;
  }
  
  const startValue = 0;
  const startTime = performance.now();
  
  // easeOutCubic
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentVal = Math.round(startValue + (targetValue - startValue) * easeOut(progress));
    element.textContent = currentVal;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = targetValue;
    }
  }
  
  requestAnimationFrame(update);
}
