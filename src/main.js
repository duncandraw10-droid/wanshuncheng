// --- Mobile Menu ---
document.getElementById('mobile-menu-btn')?.addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  const iconMenu = this.querySelector('.icon-menu');
  const iconClose = this.querySelector('.icon-close');
  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    // Close
    menu.classList.remove('opacity-100', 'translate-y-0');
    menu.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
    }, 180);
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    this.setAttribute('aria-expanded', 'false');
  } else {
    // Open
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    // Force reflow
    void menu.offsetWidth;
    menu.classList.remove('opacity-0', '-translate-y-2');
    menu.classList.add('opacity-100', 'translate-y-0');
    
    iconMenu.classList.add('hidden');
    iconClose.classList.remove('hidden');
    this.setAttribute('aria-expanded', 'true');
  }
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    if(menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') {
      menuBtn.click();
    }
  });
});

// Close mobile menu on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menuBtn = document.getElementById('mobile-menu-btn');
    if(menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') {
      menuBtn.click();
      menuBtn.focus();
    }
  }
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


// --- ScrollSpy for Navigation ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const headerOffset = 80;

function updateActiveNav() {
  const scrollY = window.scrollY;
  let currentSection = null;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerOffset - 10;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-primary', 'border-b-2', 'border-primary');
    link.removeAttribute('aria-current');
    
    if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('text-primary');
      link.setAttribute('aria-current', 'location');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
// Trigger once on load
updateActiveNav();


// --- Image Modal ---
let modalTriggerBtn = null;

window.openModal = function(src, title) {
  modalTriggerBtn = document.activeElement;
  const modal = document.getElementById('image-modal');
  const img = document.getElementById('modal-image');
  const titleEl = document.getElementById('modal-title');
  
  img.src = src;
  img.alt = title;
  if(titleEl) titleEl.textContent = title;
  
  modal.classList.remove('hidden');
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  document.body.style.overflow = 'hidden';
  
  // Focus trap: set focus to close button
  setTimeout(() => {
    const closeBtn = modal.querySelector('button');
    if (closeBtn) closeBtn.focus();
  }, 50);
}

window.closeModal = function() {
  const modal = document.getElementById('image-modal');
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (modalTriggerBtn) {
      modalTriggerBtn.focus();
    }
  }, 160);
}

document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('image-modal');
  if (!modal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeModal();
    }
    // Simple focus trap
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button');
      if (focusable.length > 0) {
        e.preventDefault();
        focusable[0].focus();
      }
    }
  }
});

document.getElementById('image-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'image-modal') {
    closeModal();
  }
});


// --- Toast & Copy ---
window.showToast = function(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  msgEl.textContent = message;
  
  toast.classList.remove('translate-y-10', 'opacity-0');
  
  // aria-live will read the textContent change automatically
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 2000);
}

window.copyToClipboard = async function(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('信箱已複製！');
  } catch (err) {
    showToast('複製失敗，請手動反白：' + text);
  }
}

window.copyTemplate = async function() {
  const template = `您好，我們有模壓成型的需求，請協助評估：

1. 公司名稱：
2. 聯絡人與電話：
3. 產品名稱／用途：
4. 材料需求：
5. 預估數量：
6. 是否有現成模具：
7. 希望交期：
8. 其他需求（如表面處理）：

（備註：將隨信附上產品圖面或照片）`;
  try {
    await navigator.clipboard.writeText(template);
    showToast('詢價範本已複製！');
  } catch (err) {
    showToast('複製失敗，請手動複製範本。');
  }
}


// --- Portfolio Slider ---
const slider = document.getElementById('portfolio-slider');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const progressBar = document.getElementById('slider-progress');

if (slider && prevBtn && nextBtn) {
  function updateSlider() {
    const isAtStart = slider.scrollLeft <= 0;
    const isAtEnd = Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth;
    
    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
    
    if (progressBar) {
      const scrollPercentage = slider.scrollLeft / (slider.scrollWidth - slider.clientWidth);
      // Ensure it doesn't go below 33.3% (minimum bar width)
      const minWidth = 100 / slider.children.length;
      const width = Math.max(minWidth, minWidth + (scrollPercentage * (100 - minWidth)));
      progressBar.style.width = `${width}%`;
    }
  }

  // Initial check
  updateSlider();
  
  slider.addEventListener('scroll', () => {
    requestAnimationFrame(updateSlider);
  });

  const scrollByAmount = () => {
    const item = slider.querySelector('div');
    if(!item) return 0;
    const gap = window.innerWidth >= 768 ? 24 : 16;
    return item.offsetWidth + gap;
  };

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });

  window.addEventListener('resize', updateSlider);
}

// Update current year
const yearEl = document.getElementById('current-year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

