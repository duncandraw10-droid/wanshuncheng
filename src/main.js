// Opening and Bootstrap hero carousel. Other site interaction hooks stay intact.
const heroElement = document.getElementById('hero-carousel');
const heroMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroCarousel = heroElement ? bootstrap.Carousel.getOrCreateInstance(heroElement, {
  interval: 6500, ride: false, keyboard: true, touch: true, pause: false,
}) : null;
const openingScreen = document.getElementById('loadingArea');
const openingSkip = document.getElementById('intro-skip');
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
  document.body.classList.remove('intro-running', 'loading-overflow');
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
  openingSkip?.focus({ preventScroll: true });
  const schedule = (fn, delay) => openingTimers.push(setTimeout(fn, delay));
  schedule(() => openingScreen.classList.add('opening-show'), 300);
  schedule(() => openingScreen.classList.add('opening-logo-out'), 1550);
  schedule(() => openingScreen.classList.add('opening-leave'), 1850);
  schedule(() => document.body.classList.add('hero-entered'), 2200);
  schedule(finishOpening, 3100);
}

openingSkip?.addEventListener('click', finishOpening);
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
    sessionStorage.setItem('loadingPlayed', 'true');
  } catch { /* Opening and navigation do not depend on storage access. */ }
  playOpening();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startOpening, { once: true });
else startOpening();

// --- Bootstrap Mobile Menu ---
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileCollapse = mobileMenu ? bootstrap.Collapse.getOrCreateInstance(mobileMenu, { toggle: false }) : null;

function updateMenuIcons(expanded) {
  mobileMenuBtn?.querySelector('.icon-menu')?.classList.toggle('d-none', expanded);
  mobileMenuBtn?.querySelector('.icon-close')?.classList.toggle('d-none', !expanded);
  mobileMenuBtn?.setAttribute('aria-expanded', String(expanded));
}
mobileMenu?.addEventListener('show.bs.collapse', () => updateMenuIcons(true));
mobileMenu?.addEventListener('hide.bs.collapse', () => updateMenuIcons(false));
function closeMobileNavigation() {
  if (mobileMenu?.classList.contains('collapsing') && mobileMenuBtn?.getAttribute('aria-expanded') === 'true') {
    mobileMenu.addEventListener('shown.bs.collapse', () => mobileCollapse?.hide(), { once: true });
  } else mobileCollapse?.hide();
}
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileNavigation);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenuBtn?.getAttribute('aria-expanded') === 'true') {
    closeMobileNavigation();
    mobileMenuBtn?.focus();
  }
});
window.matchMedia('(min-width: 992px)').addEventListener('change', event => {
  if (event.matches) closeMobileNavigation();
});

// --- Intersection Observer for Scroll Reveal ---
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
    // Ensure keyboard focus reveals the element immediately
    el.addEventListener('focusin', () => {
      el.classList.add('is-visible');
      revealObserver.unobserve(el);
    });
  });
} else {
  // Fallback for missing JS or reduced motion
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}


// --- Company facts: reveal once, count up over 1.8 seconds. ---
function initCompanyCountUp() {
  const counters = document.querySelectorAll('.company-facts .count-up[data-target]');
  if (!counters.length) return;

  const duration = 1800;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Keep the final HTML values when animation is unavailable or disabled.
  if (motion.matches || !('IntersectionObserver' in window)) return;

  const started = new WeakSet();
  const finish = counter => { counter.textContent = counter.dataset.target; };

  function animate(counter) {
    const target = Number(counter.dataset.target);
    let startTime = null;

    function frame(timestamp) {
      if (motion.matches) { finish(counter); return; }
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.floor(target * eased));

      if (progress < 1) requestAnimationFrame(frame);
      else finish(counter);
    }

    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || started.has(entry.target)) return;
      started.add(entry.target);
      observer.unobserve(entry.target);
      animate(entry.target.querySelector('.count-up'));
    });
  }, {
    threshold: 0.35,
    rootMargin: '0px 0px -40px 0px',
  });

  counters.forEach(counter => {
    // Reserve digit width so the unit stays in place while counting.
    counter.style.minWidth = `${counter.dataset.target.length}ch`;
    counter.textContent = '0';
    observer.observe(counter.closest('.company-fact'));
  });

  motion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    counters.forEach(finish);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCompanyCountUp, { once: true });
} else {
  initCompanyCountUp();
}


// --- ScrollSpy for Navigation ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-header a[href^="#"]');

function updateActiveNav() {
  const scrollY = window.scrollY;
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')) || 80;
  // Anchor destinations leave 16px below the header; allow another 8px so
  // the destination section is active immediately after a navigation click.
  const activationOffset = headerHeight + 24;
  let currentSection = null;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - activationOffset;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    
    if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'location');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav, { passive: true });
// Trigger once on load
updateActiveNav();


// --- Bootstrap Image Modal ---
let modalTriggerBtn = null;
let modalOpening = false;
let modalClosePending = false;
const modalElement = document.getElementById('image-modal');
const imageModal = modalElement ? bootstrap.Modal.getOrCreateInstance(modalElement) : null;

window.openModal = function(src, title, webpSrc) {
  modalTriggerBtn = document.activeElement;
  const img = document.getElementById('modal-image');
  const titleEl = document.getElementById('modal-title');
  if (!img || !imageModal) return;
  const webpSource = document.getElementById('modal-image-source');
  if (webpSrc) webpSource?.setAttribute('srcset', webpSrc);
  else webpSource?.removeAttribute('srcset');
  img.src = src;
  img.alt = title;
  if (titleEl) titleEl.textContent = title;
  imageModal.show();
};
window.closeModal = function() {
  // Bootstrap ignores hide() during its opening transition. Keep a quick
  // close-button tap and finish closing as soon as the transition completes.
  if (modalOpening) modalClosePending = true;
  else imageModal?.hide();
};
modalElement?.addEventListener('show.bs.modal', () => {
  modalOpening = true;
  modalClosePending = false;
});
modalElement?.addEventListener('shown.bs.modal', () => {
  modalOpening = false;
  if (modalClosePending) imageModal?.hide();
  else modalElement.querySelector('button')?.focus();
});
modalElement?.addEventListener('hidden.bs.modal', () => {
  modalClosePending = false;
  modalTriggerBtn?.focus();
});

// --- Bootstrap Toast & Copy ---
const toastElement = document.getElementById('toast');
const copyToast = toastElement ? bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 2000 }) : null;
window.showToast = function(message) {
  const msgEl = document.getElementById('toast-message');
  if (msgEl) msgEl.textContent = message;
  copyToast?.show();
};

window.copyToClipboard = async function(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('已複製！');
  } catch (err) {
    showToast('複製失敗，請手動複製：' + text);
  }
}

window.copyTemplate = async function() {
  const template = `您好，我們有模壓成型的需求，請協助評估：

1. 產品用途與尺寸：
2. 材料需求（如已知）：
3. 預計數量：
4. 是否已有模具：
5. 希望交期：

（備註：將隨信附上圖面或產品照片）`;
  try {
    await navigator.clipboard.writeText(template);
    showToast('已複製！');
  } catch (err) {
    showToast('複製失敗，請手動複製。');
  }
}


// Update current year
const yearEl = document.getElementById('current-year'); if(yearEl) yearEl.textContent = new Date().getFullYear();


// --- Equipment Tabs ---
const equipTabs = document.querySelectorAll('.equip-tab');
const equipMainImg = document.getElementById('equip-main-img');
let equipmentImageTimer;
if (equipTabs.length > 0 && equipMainImg) {
  equipTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      equipTabs.forEach(t => {
        const selected = t === tab;
        t.classList.toggle('active', selected);
        t.setAttribute('aria-pressed', String(selected));
      });
      const src = tab.getAttribute('data-img');
      const alt = tab.getAttribute('data-alt');
      const webpSrc = tab.getAttribute('data-img-webp');
      equipMainImg.style.opacity = '0.3';
      clearTimeout(equipmentImageTimer);
      equipmentImageTimer = setTimeout(() => {
        const webpSource = document.getElementById('equip-main-source');
        if (webpSrc) webpSource?.setAttribute('srcset', webpSrc);
        else webpSource?.removeAttribute('srcset');
        equipMainImg.src = src;
        equipMainImg.alt = alt;
        equipMainImg.style.opacity = '1';
        const index = Array.from(equipTabs).indexOf(tab);
        const title = document.getElementById('equip-feature-title');
        const description = document.getElementById('equip-feature-description');
        const current = document.getElementById('equip-current');
        const progress = document.getElementById('equip-progress');
        if (title) title.textContent = tab.querySelector('h3').textContent;
        if (description) description.textContent = tab.querySelector('p').textContent;
        if (current) current.textContent = String(index + 1).padStart(2, '0');
        if (progress) {
          progress.style.width = `${(index + 1) / equipTabs.length * 100}%`;
          progress.setAttribute('aria-valuenow', String(index + 1));
        }
      }, 150);
    });
  });
}

// Equipment catalog controls keep the original selection attributes as their source.
function advanceEquipment(direction) {
  const index = Array.from(equipTabs).findIndex(tab => tab.classList.contains('active'));
  const next = (index + direction + equipTabs.length) % equipTabs.length;
  equipTabs[next]?.click();
}
document.getElementById('equip-prev')?.addEventListener('click', () => advanceEquipment(-1));
document.getElementById('equip-next')?.addEventListener('click', () => advanceEquipment(1));

document.querySelectorAll('.application-photo-button').forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.photo, button.dataset.photoTitle, button.dataset.photoWebp));
});
