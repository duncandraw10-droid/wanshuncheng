// Opening and Bootstrap hero carousel. Other site interaction hooks stay intact.
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
  const returnTarget = modalTriggerBtn?.classList.contains('application-photo-button')
    ? modalTriggerBtn.closest('.application-card')?.querySelector('.application-detail-toggle')
    : modalTriggerBtn;
  returnTarget?.focus();
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
    trackContact('contact_copy', { contact_method: text.includes('@') ? 'email' : 'phone', contact_location: 'contact', contact_action: 'copy' });
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
    trackContact('contact_copy', { contact_method: 'email', contact_location: 'contact', contact_action: 'copy_template' });
  } catch (err) {
    showToast('複製失敗，請手動複製。');
  }
}


// Bootstrap pills keep selection, focus and fade panels in sync.
const equipmentSelection = document.querySelector('.equipment-selection');
if (equipmentSelection) {
  const equipmentDesktop = window.matchMedia('(min-width: 992px)');
  const syncEquipmentOrientation = () => equipmentSelection.setAttribute(
    'aria-orientation', equipmentDesktop.matches ? 'vertical' : 'horizontal',
  );
  syncEquipmentOrientation();
  equipmentDesktop.addEventListener('change', syncEquipmentOrientation);
  equipmentSelection.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
    bootstrap.Tab.getOrCreateInstance(tab);
  });

  // Warm the lazy-loaded panels shortly before the equipment section is visible.
  const equipmentPreloader = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    equipmentSelection.querySelectorAll('[data-img-webp]').forEach(tab => {
      const image = new Image();
      image.src = tab.dataset.imgWebp;
    });
    equipmentPreloader.disconnect();
  }, { rootMargin: '200px' });
  equipmentPreloader.observe(document.getElementById('equipment'));
}

document.querySelectorAll('.application-photo-button').forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.photo, button.dataset.photoTitle, button.dataset.photoWebp));
});


// Native carousel: three desktop cards, 1.2 tablet cards and one complete phone card.
const portfolioSlider = document.getElementById('portfolio-slider');
const portfolioPrev = document.getElementById('slider-prev');
const portfolioNext = document.getElementById('slider-next');
const portfolioHover = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
const portfolioStates = [];

document.querySelectorAll('.application-card').forEach(card => {
  const toggle = card.querySelector('.application-detail-toggle');
  const details = card.querySelector('.application-details');
  const label = toggle?.querySelector('.application-detail-label');
  const title = card.querySelector('h3')?.textContent.trim();
  if (!toggle || !details) return;
  const state = { card, pinned: false, setExpanded(open) {
    card.classList.toggle('is-expanded', open);
    toggle.setAttribute('aria-expanded', String(open));
    details.setAttribute('aria-hidden', String(!open));
    const action = open ? '收起介紹' : '查看介紹';
    if (label) label.textContent = action;
    toggle.setAttribute('aria-label', `${title}：${action}`);
  } };
  portfolioStates.push(state);
  card.querySelector('.application-image-frame')?.addEventListener('click', () => {
    if (!portfolioHover.matches) toggle.click();
  });
  // Captions sit below the square photo on smaller screens; their headings also toggle details.
  card.querySelector('.application-caption')?.addEventListener('click', event => {
    if (!portfolioHover.matches && event.target.closest('h3, .application-material')) toggle.click();
  });
  toggle.addEventListener('click', () => {
    const open = !card.classList.contains('is-expanded');
    closePortfolioDetails();
    state.pinned = open;
    state.setExpanded(open);
  });
  card.addEventListener('pointerenter', () => {
    if (portfolioHover.matches) state.setExpanded(true);
  });
  card.addEventListener('pointerleave', () => {
    if (!state.pinned && !card.contains(document.activeElement)) state.setExpanded(false);
  });
  card.addEventListener('focusout', event => {
    if (!card.contains(event.relatedTarget) && !state.pinned && !(portfolioHover.matches && card.matches(':hover'))) state.setExpanded(false);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      state.pinned = false;
      state.setExpanded(false);
    }
  });
});

function closePortfolioDetails() {
  portfolioStates.forEach(state => { state.pinned = false; state.setExpanded(false); });
}
portfolioHover.addEventListener('change', closePortfolioDetails);
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('.application-card')) closePortfolioDetails();
});

if (portfolioSlider && portfolioPrev && portfolioNext) {
  let pendingFrame = 0;
  const gallery = portfolioSlider.closest('.application-gallery');
  const autoplayButton = document.getElementById('portfolio-autoplay');
  const autoplayInterval = 4000;
  let autoplayTimer = 0;
  let userPaused = false;
  let inView = false;
  let hovered = false;
  let pointerDown = false;
  let photoOpen = false;

  function schedulePortfolioAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = 0;
    const focusInside = gallery.contains(document.activeElement) && document.activeElement !== autoplayButton && document.activeElement.matches(':focus-visible');
    const expanded = portfolioStates.some(state => state.card.classList.contains('is-expanded'));
    if (userPaused || !inView || document.hidden || heroMotion.matches || hovered || pointerDown || focusInside || expanded || photoOpen) return;
    if (portfolioSlider.scrollWidth <= portfolioSlider.clientWidth + 2) return;
    autoplayTimer = window.setTimeout(() => {
      const range = portfolioSlider.scrollWidth - portfolioSlider.clientWidth;
      if (range - portfolioSlider.scrollLeft <= 2) portfolioSlider.scrollTo({ left: 0, behavior: 'smooth' });
      else movePortfolio(1);
      schedulePortfolioAutoplay();
    }, autoplayInterval);
  }

  function updateAutoplayButton() {
    if (!autoplayButton) return;
    const paused = userPaused || heroMotion.matches;
    autoplayButton.querySelector('.portfolio-autoplay-icon path').setAttribute('d', paused ? 'M8 5v14l11-7z' : 'M7 5h3v14H7zM14 5h3v14h-3z');
    autoplayButton.querySelector('.portfolio-autoplay-label').textContent = paused ? '開始輪播' : '暫停輪播';
    autoplayButton.setAttribute('aria-label', `${paused ? '開始' : '暫停'}承製案例自動輪播`);
    autoplayButton.disabled = heroMotion.matches;
    autoplayButton.title = heroMotion.matches ? '依照您的減少動態效果設定，已停用自動輪播' : '';
  }

  autoplayButton?.addEventListener('click', () => {
    userPaused = !userPaused;
    updateAutoplayButton();
    schedulePortfolioAutoplay();
  });
  gallery.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && portfolioHover.matches) { hovered = true; schedulePortfolioAutoplay(); }
  });
  gallery.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') { hovered = false; schedulePortfolioAutoplay(); }
  });
  gallery.addEventListener('pointerdown', () => { pointerDown = true; schedulePortfolioAutoplay(); });
  const releasePointer = () => { pointerDown = false; schedulePortfolioAutoplay(); };
  document.addEventListener('pointerup', releasePointer);
  document.addEventListener('pointercancel', releasePointer);
  gallery.addEventListener('focusin', schedulePortfolioAutoplay);
  gallery.addEventListener('focusout', () => queueMicrotask(schedulePortfolioAutoplay));
  portfolioHover.addEventListener('change', () => { hovered = portfolioHover.matches && gallery.matches(':hover'); schedulePortfolioAutoplay(); });
  document.addEventListener('visibilitychange', schedulePortfolioAutoplay);
  heroMotion.addEventListener('change', () => { updateAutoplayButton(); schedulePortfolioAutoplay(); });
  modalElement?.addEventListener('show.bs.modal', () => { photoOpen = true; schedulePortfolioAutoplay(); });
  modalElement?.addEventListener('hidden.bs.modal', () => { photoOpen = false; schedulePortfolioAutoplay(); });
  new MutationObserver(schedulePortfolioAutoplay).observe(portfolioSlider, { attributes: true, attributeFilter: ['class'], subtree: true });
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .2;
    schedulePortfolioAutoplay();
  }, { threshold: [0, .2] }).observe(portfolioSlider);
  updateAutoplayButton();

  function updatePortfolioControls() {
    const range = Math.max(0, portfolioSlider.scrollWidth - portfolioSlider.clientWidth);
    const position = Math.max(0, Math.min(range, portfolioSlider.scrollLeft));
    portfolioPrev.disabled = position <= 2;
    portfolioNext.disabled = range - position <= 2;
    const frame = portfolioSlider.querySelector('.application-image-frame');
    if (gallery && frame) {
      const photo = frame.getBoundingClientRect();
      const center = photo.top - gallery.getBoundingClientRect().top + photo.height / 2;
      gallery.style.setProperty('--portfolio-image-center', `${center}px`);
    }

  }
  function movePortfolio(direction) {
    const items = portfolioSlider.querySelectorAll('.portfolio-item');
    const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : portfolioSlider.clientWidth;
    closePortfolioDetails();
    portfolioSlider.scrollBy({ left: direction * step, behavior: heroMotion.matches ? 'instant' : 'smooth' });
  }
  portfolioPrev.addEventListener('click', () => movePortfolio(-1));
  portfolioNext.addEventListener('click', () => movePortfolio(1));
  portfolioSlider.addEventListener('keydown', event => {
    if (event.target !== portfolioSlider || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') movePortfolio(event.key === 'ArrowLeft' ? -1 : 1);
    else {
      closePortfolioDetails();
      portfolioSlider.scrollTo({ left: event.key === 'Home' ? 0 : portfolioSlider.scrollWidth, behavior: heroMotion.matches ? 'instant' : 'smooth' });
    }
  });
  portfolioSlider.addEventListener('scroll', () => {
    closePortfolioDetails();
    schedulePortfolioAutoplay();
    if (pendingFrame) return;
    pendingFrame = requestAnimationFrame(() => { pendingFrame = 0; updatePortfolioControls(); });
  }, { passive: true });
  new ResizeObserver(() => { updatePortfolioControls(); schedulePortfolioAutoplay(); }).observe(portfolioSlider);
  updatePortfolioControls();
}


// Preparation is expandable on small screens; desktop keeps all six items visible.
const preparationDetails = document.querySelector('.contact-preparation-details');
if (preparationDetails) {
  const contactDesktop = window.matchMedia('(min-width: 992px)');
  const syncPreparation = () => { preparationDetails.open = contactDesktop.matches; };
  syncPreparation();
  contactDesktop.addEventListener('change', syncPreparation);
}

// Measure contact intent without sending personal details or mailto query text.
// Preview/local traffic must not pollute the production property.
const analyticsHosts = new Set(['wsctw.com', 'www.wsctw.com', 'duncandraw10-droid.github.io']);
function trackContact(eventName, parameters) {
  if (!analyticsHosts.has(location.hostname) || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, { ...parameters, transport_type: 'beacon' });
}
function contactLocation(element) {
  if (element.closest('footer')) return 'footer';
  if (element.closest('header')) return 'topbar';
  return element.closest('section')?.id || 'other';
}
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href]');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  const contact_location = contactLocation(anchor);
  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    trackContact('contact_click', {
      contact_method: href.startsWith('tel:') ? 'phone' : 'email',
      contact_location,
      contact_action: 'open',
    });
  } else if (href === '#contact') {
    trackContact('inquiry_cta_click', { contact_location });
  }
});
