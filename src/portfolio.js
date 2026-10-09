export function initPortfolio({ motion, modalElement }) {
  // Native carousel: three desktop cards, 1.2 tablet cards and one complete phone card.
  const portfolioSlider = document.getElementById('portfolio-slider');
  const portfolioPrev = document.getElementById('slider-prev');
  const portfolioNext = document.getElementById('slider-next');
  const portfolioHover = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
  const portfolioStates = [];
  let syncAutoplay = () => {};

  document.querySelectorAll('.application-card').forEach(card => {
    const toggle = card.querySelector('.application-detail-toggle');
    const details = card.querySelector('.application-details');
    const label = toggle?.querySelector('.application-detail-label');
    const title = card.querySelector('h3')?.textContent.trim();
    if (!toggle || !details) return;
    const state = { card, pinned: false, setExpanded(open) {
      if (card.classList.contains('is-expanded') === open) return;
      card.classList.toggle('is-expanded', open);
      toggle.setAttribute('aria-expanded', String(open));
      details.setAttribute('aria-hidden', String(!open));
      const action = open ? '收起介紹' : '查看介紹';
      if (label) label.textContent = action;
      toggle.setAttribute('aria-label', `${title}：${action}`);
      syncAutoplay();
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
    const autoplayInterval = 4000;
    let autoplayTimer = 0;
    let inView = false;
    let hovered = false;
    let pointerDown = false;
    let photoOpen = false;

    function schedulePortfolioAutoplay() {
      clearTimeout(autoplayTimer);
      autoplayTimer = 0;
      const focusInside = gallery.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
      const expanded = portfolioStates.some(state => state.card.classList.contains('is-expanded'));
      if (!inView || document.hidden || motion.matches || hovered || pointerDown || focusInside || expanded || photoOpen) return;
      if (portfolioSlider.scrollWidth <= portfolioSlider.clientWidth + 2) return;
      autoplayTimer = window.setTimeout(() => {
        const range = portfolioSlider.scrollWidth - portfolioSlider.clientWidth;
        if (range - portfolioSlider.scrollLeft <= 2) portfolioSlider.scrollTo({ left: 0, behavior: 'smooth' });
        else movePortfolio(1);
        schedulePortfolioAutoplay();
      }, autoplayInterval);
    }

    gallery.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && portfolioHover.matches) { hovered = true; schedulePortfolioAutoplay(); }
    });
    gallery.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') { hovered = false; schedulePortfolioAutoplay(); }
    });
    gallery.addEventListener('pointerdown', () => { pointerDown = true; schedulePortfolioAutoplay(); });
    const releasePointer = () => {
      if (!pointerDown) return;
      pointerDown = false;
      schedulePortfolioAutoplay();
    };
    document.addEventListener('pointerup', releasePointer);
    document.addEventListener('pointercancel', releasePointer);
    gallery.addEventListener('focusin', schedulePortfolioAutoplay);
    gallery.addEventListener('focusout', () => queueMicrotask(schedulePortfolioAutoplay));
    portfolioHover.addEventListener('change', () => { hovered = portfolioHover.matches && gallery.matches(':hover'); schedulePortfolioAutoplay(); });
    document.addEventListener('visibilitychange', schedulePortfolioAutoplay);
    motion.addEventListener('change', schedulePortfolioAutoplay);
    modalElement?.addEventListener('show.bs.modal', () => { photoOpen = true; schedulePortfolioAutoplay(); });
    modalElement?.addEventListener('hidden.bs.modal', () => { photoOpen = false; schedulePortfolioAutoplay(); });
    syncAutoplay = schedulePortfolioAutoplay;
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .2;
      schedulePortfolioAutoplay();
    }, { threshold: [0, .2] }).observe(portfolioSlider);

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
      portfolioSlider.scrollBy({ left: direction * step, behavior: motion.matches ? 'instant' : 'smooth' });
    }
    portfolioPrev.addEventListener('click', () => movePortfolio(-1));
    portfolioNext.addEventListener('click', () => movePortfolio(1));
    portfolioSlider.addEventListener('keydown', event => {
      if (event.target !== portfolioSlider || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') movePortfolio(event.key === 'ArrowLeft' ? -1 : 1);
      else {
        closePortfolioDetails();
        portfolioSlider.scrollTo({ left: event.key === 'Home' ? 0 : portfolioSlider.scrollWidth, behavior: motion.matches ? 'instant' : 'smooth' });
      }
    });
    portfolioSlider.addEventListener('scroll', () => {
      if (pendingFrame) return;
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = 0;
        closePortfolioDetails();
        updatePortfolioControls();
        schedulePortfolioAutoplay();
      });
    }, { passive: true });
    new ResizeObserver(() => { updatePortfolioControls(); schedulePortfolioAutoplay(); }).observe(portfolioSlider);
    updatePortfolioControls();
  }
}
