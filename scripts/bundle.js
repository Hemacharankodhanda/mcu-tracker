// scripts/bundle.js — Zero-dependency bundler for CSS and JS
// Combines modular source files into single high-performance bundles for production.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Bundle CSS
const cssFiles = [
  'css/variables.css',
  'css/base.css',
  'css/components.css',
  'css/layout.css',
  'css/pages.css'
];

let bundledCss = '/* MCU Tracker — Bundled Stylesheet */\n';
for (const file of cssFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  // Strip out @import for Google Fonts if present (loaded via <link> in HTML for performance)
  content = content.replace(/@import\s+url\([^)]+\);\s*/g, '');
  bundledCss += `\n/* ── ${file} ── */\n${content}\n`;
}

const cssOutputPath = path.join(rootDir, 'css', 'bundle.css');
fs.writeFileSync(cssOutputPath, bundledCss);
console.log(`✓ CSS Bundle generated: css/bundle.css (${(Buffer.byteLength(bundledCss) / 1024).toFixed(1)} KB)`);

// 2. Bundle JS
const jsFiles = [
  'js/data.js',
  'js/tmdb.js',
  'js/storage.js',
  'js/tracker.js',
  'js/timeline.js',
  'js/quiz.js',
  'js/profile.js',
  'js/share.js',
  'js/upcoming.js',
  'js/details.js',
  'js/animations.js',
  'js/pwa.js',
  'js/app.js'
];

let bundledJs = '/* MCU Tracker — Bundled Application Logic */\n';
for (const file of jsFiles) {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  bundledJs += `\n/* ── ${file} ── */\n${content}\n`;
}

const jsOutputPath = path.join(rootDir, 'js', 'bundle.js');
fs.writeFileSync(jsOutputPath, bundledJs);
console.log(`✓ JS Bundle generated: js/bundle.js (${(Buffer.byteLength(bundledJs) / 1024).toFixed(1)} KB)`);
