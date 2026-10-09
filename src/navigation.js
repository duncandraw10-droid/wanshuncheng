export function initNavigation(motion) {
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
  const prefersReducedMotion = motion.matches;

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

  let activeSection;
  let navigationFrame = 0;
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

    if (currentSection === activeSection) return;
    activeSection = currentSection;

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      
      if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
      }
    });
  }

  function scheduleActiveNav() {
    if (navigationFrame) return;
    navigationFrame = requestAnimationFrame(() => { navigationFrame = 0; updateActiveNav(); });
  }
  window.addEventListener('scroll', scheduleActiveNav, { passive: true });
  window.addEventListener('resize', scheduleActiveNav, { passive: true });
  // Trigger once on load
  updateActiveNav();
}
