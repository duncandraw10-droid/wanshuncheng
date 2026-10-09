import { initNavigation } from './navigation.js';
import { initMedia } from './media.js';
import { initContact } from './contact.js';
import { initPortfolio } from './portfolio.js';

// Brand opening and Bootstrap Hero carousel.
const heroElement = document.getElementById('hero-carousel');
const heroMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroCarousel = heroElement ? bootstrap.Carousel.getOrCreateInstance(heroElement, {
  interval: 6500, ride: false, keyboard: true, touch: true, pause: false,
}) : null;
const openingScreen = document.getElementById('loadingArea');
let openingTimers = [];
let openingBusy = false;
let heroHasFocus = false;

function syncHeroPlayback() {
  if (heroMotion.matches || openingBusy || heroHasFocus || !document.body.classList.contains('hero-entered')) heroCarousel?.pause();
  else heroCarousel?.cycle();
}

function setOpeningInert(value) {
  document.querySelectorAll('header, main, footer').forEach(el => { el.inert = value; });
}
function finishOpening() {
  openingTimers.forEach(clearTimeout);
  openingTimers = [];
  openingBusy = false;
  openingScreen?.classList.remove('d-flex', 'opening-show', 'opening-logo-out', 'opening-leave');
  openingScreen?.classList.add('d-none');
  document.body.classList.remove('intro-running');
  document.body.classList.add('hero-entered');
  setOpeningInert(false);
  syncHeroPlayback();
}
function playOpening() {
  if (!openingScreen || heroMotion.matches) { finishOpening(); return; }
  openingTimers.forEach(clearTimeout);
  openingTimers = [];
  openingBusy = true;
  heroCarousel?.pause();
  document.body.classList.add('intro-running', 'motion-ready');
  document.body.classList.remove('hero-entered');
  setOpeningInert(true);
  openingScreen.classList.remove('d-none', 'opening-show', 'opening-logo-out', 'opening-leave');
  openingScreen.classList.add('d-flex');
  const schedule = (fn, delay) => openingTimers.push(setTimeout(fn, delay));
  // Reveal the hero behind the curtains so its entrance does not add another wait.
  schedule(() => openingScreen.classList.add('opening-show'), 80);
  schedule(() => document.body.classList.add('hero-entered'), 100);
  schedule(() => openingScreen.classList.add('opening-logo-out'), 800);
  schedule(() => openingScreen.classList.add('opening-leave'), 900);
  schedule(finishOpening, 1300);
}

document.addEventListener('keydown', event => {
  if (openingBusy && event.key === 'Escape') finishOpening();
});
heroElement?.addEventListener('focusin', () => { heroHasFocus = true; syncHeroPlayback(); });
heroElement?.addEventListener('focusout', event => {
  if (!heroElement.contains(event.relatedTarget)) { heroHasFocus = false; syncHeroPlayback(); }
});
heroElement?.addEventListener('slid.bs.carousel', event => {
  const current = document.getElementById('hero-current');
  if (current) current.textContent = String(event.to + 1).padStart(2, '0');
  document.querySelectorAll('.hero-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === event.to);
    if (index === event.to) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
  syncHeroPlayback();
});
heroMotion.addEventListener('change', event => {
  if (event.matches && openingBusy) finishOpening();
  syncHeroPlayback();
});

function startOpening() {
  document.body.classList.add('motion-ready');
  let played = false;
  try { played = sessionStorage.getItem('wscIntroPlayed:v2') === 'true'; } catch { /* Storage can be disabled. */ }
  const deepLink = location.hash && location.hash !== '#hero';
  if (played || heroMotion.matches || deepLink) { finishOpening(); return; }
  try {
    sessionStorage.setItem('wscIntroPlayed:v2', 'true');
  } catch { /* Opening and navigation do not depend on storage access. */ }
  playOpening();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startOpening, { once: true });
else startOpening();

// Initialise each independent interaction once after the deferred entry loads.
initNavigation(heroMotion);
const modalElement = initMedia();
initContact();
initPortfolio({ motion: heroMotion, modalElement });
