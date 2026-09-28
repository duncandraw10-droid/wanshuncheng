import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year Update
  const yr = new Date().getFullYear();
  const copyrightElem = document.getElementById('copyrightYear');
  if (copyrightElem) copyrightElem.textContent = yr >= 2026 ? yr : '2026';

  // 2. Mobile Drawer Navigation (ARIA compliant)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    menuIcon.textContent = 'menu';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', '打開導覽選單');
  };

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    menuIcon.textContent = 'close';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.setAttribute('aria-label', '關閉導覽選單');
    
    // Add transition styling dynamically for smooth opening
    mobileMenu.style.transition = 'opacity 250ms ease, max-height 250ms ease';
    mobileMenu.style.opacity = '1';
    mobileMenu.style.maxHeight = '500px';
  };

  if (mobileMenuBtn && mobileMenu) {
    // Initial setup for transitions
    mobileMenu.style.opacity = '0';
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.overflow = 'hidden';

    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
        setTimeout(() => {
          mobileMenu.style.opacity = '0';
          mobileMenu.style.maxHeight = '0';
        }, 10);
      } else {
        openMenu();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
        mobileMenu.style.opacity = '0';
        mobileMenu.style.maxHeight = '0';
      });
    });

    // Close on ESC or window resize (if desktop)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        mobileMenu.style.opacity = '0';
        mobileMenu.style.maxHeight = '0';
        mobileMenuBtn.focus();
      }
    });
    
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        mobileMenu.style.opacity = '0';
        mobileMenu.style.maxHeight = '0';
      }
    });
  }

  // 3. Applications Expand / Collapse Interaction
  const toggleCasesBtn = document.getElementById('toggleCasesBtn');
  const moreCasesContainer = document.getElementById('moreCasesContainer');
  const toggleCasesText = document.getElementById('toggleCasesText');
  const toggleCasesIcon = document.getElementById('toggleCasesIcon');

  if (toggleCasesBtn && moreCasesContainer) {
    toggleCasesBtn.addEventListener('click', () => {
      const isExpanded = toggleCasesBtn.getAttribute('aria-expanded') === 'true';
      if (!isExpanded) {
        // Expand
        moreCasesContainer.classList.remove('hidden');
        moreCasesContainer.classList.add('grid');
        
        // Setup transition styles
        moreCasesContainer.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
        moreCasesContainer.style.opacity = '0';
        moreCasesContainer.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          moreCasesContainer.style.opacity = '1';
          moreCasesContainer.style.transform = 'translateY(0)';
        }, 10);
        
        toggleCasesText.textContent = '收合案例 ↑';
        toggleCasesIcon.textContent = 'expand_less';
        toggleCasesBtn.setAttribute('aria-expanded', 'true');
      } else {
        // Collapse
        moreCasesContainer.style.opacity = '0';
        moreCasesContainer.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          moreCasesContainer.classList.add('hidden');
          moreCasesContainer.classList.remove('grid');
          
          toggleCasesText.textContent = '查看更多應用案例 →';
          toggleCasesIcon.textContent = 'expand_more';
          toggleCasesBtn.setAttribute('aria-expanded', 'false');
          
          // Scroll back to cases anchor nicely
          const casesSection = document.getElementById('applications');
          if (casesSection) casesSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  }

  // 4. "Consult This Product" Buttons Logic
  const consultBtns = document.querySelectorAll('.consult-product-btn');
  const inquiryTypeSelect = document.getElementById('inquiryType');
  const notesTextarea = document.getElementById('notes');

  consultBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = btn.getAttribute('data-category');
      const product = btn.getAttribute('data-product');

      if (inquiryTypeSelect && category) {
        inquiryTypeSelect.value = category;
      }
      
      if (notesTextarea && product) {
        notesTextarea.value = `我想諮詢關於「${product}」的相關評估...`;
      }

      // Smooth scroll to form and focus first field
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Set timeout to allow scroll to complete before focusing
        setTimeout(() => {
          const formTitle = contactSection.querySelector('h3');
          if (formTitle) {
            formTitle.setAttribute('tabindex', '-1');
            formTitle.focus();
          }
        }, 800);
      }
    });
  });

  // 5. RFQ File Upload Simulation
  const fileUploadInput = document.getElementById('fileUploadInput');
  const fileUploadStatus = document.getElementById('fileUploadStatus');
  const fileNameDisplay = document.getElementById('fileNameDisplay');
  const fileSizeDisplay = document.getElementById('fileSizeDisplay');
  const uploadProgressBar = document.getElementById('uploadProgressBar');
  const uploadSuccessBadge = document.getElementById('uploadSuccessBadge');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const fileErrorMsg = document.getElementById('fileErrorMsg');
  const dropArea = document.getElementById('dropArea');

  const allowedExtensions = ['.dwg', '.dxf', '.step', '.stp', '.iges', '.igs', '.pdf'];
  const maxSizeBytes = 25 * 1024 * 1024; // 25 MB

  function handleFileSelect(file) {
    if (!file) return;
    fileErrorMsg.classList.add('hidden');
    fileErrorMsg.textContent = '';

    const fileName = file.name.toLowerCase();
    const hasValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExt) {
      fileErrorMsg.textContent = '檔案格式不支援！請上傳 .dwg, .dxf, .step, .stp, .iges 或 .pdf 檔案。';
      fileErrorMsg.classList.remove('hidden');
      fileUploadInput.value = '';
      return;
    }

    if (file.size > maxSizeBytes) {
      fileErrorMsg.textContent = '檔案大小超過 25MB 上限！請壓縮或聯繫專人另外傳送。';
      fileErrorMsg.classList.remove('hidden');
      fileUploadInput.value = '';
      return;
    }

    // Display status
    fileNameDisplay.textContent = file.name;
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    fileSizeDisplay.textContent = `(${sizeInMb} MB)`;
    fileUploadStatus.classList.remove('hidden');
    uploadSuccessBadge.classList.add('hidden');

    // Simulate progress
    uploadProgressBar.style.width = '0%';
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      uploadProgressBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(interval);
        uploadSuccessBadge.classList.remove('hidden');
      }
    }, 60);
  }

  if (fileUploadInput) {
    fileUploadInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelect(e.target.files[0]);
      }
    });
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      fileUploadInput.value = '';
      fileUploadStatus.classList.add('hidden');
      uploadSuccessBadge.classList.add('hidden');
      fileErrorMsg.classList.add('hidden');
    });
  }

  // Drag and Drop listeners
  if (dropArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => {
        dropArea.classList.add('border-primary', 'bg-slate-800/80');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove('border-primary', 'bg-slate-800/80');
      }, false);
    });

    dropArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files[0]) {
        fileUploadInput.files = files;
        handleFileSelect(files[0]);
      }
    });
  }

  // 6. RFQ Form Submission Simulation with Robust Validation
  const rfqForm = document.getElementById('rfqForm');
  const rfqFormBlock = document.getElementById('rfqFormBlock');
  const rfqSuccessBlock = document.getElementById('rfqSuccessBlock');
  const submitRfqBtn = document.getElementById('submitRfqBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const resetRfqBtn = document.getElementById('resetRfqBtn');

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      let firstErrorField = null;
      
      const company = document.getElementById('companyName');
      const contact = document.getElementById('contactName');
      const phone = document.getElementById('contactPhone');
      const email = document.getElementById('contactEmail');
      const consent = document.getElementById('privacyConsent');

      // Validation
      if (!company.value.trim()) {
        document.getElementById('err-companyName').classList.remove('hidden');
        company.setAttribute('aria-invalid', 'true');
        hasError = true;
        if (!firstErrorField) firstErrorField = company;
      } else {
        document.getElementById('err-companyName').classList.add('hidden');
        company.removeAttribute('aria-invalid');
      }

      if (!contact.value.trim()) {
        document.getElementById('err-contactName').classList.remove('hidden');
        contact.setAttribute('aria-invalid', 'true');
        hasError = true;
        if (!firstErrorField) firstErrorField = contact;
      } else {
        document.getElementById('err-contactName').classList.add('hidden');
        contact.removeAttribute('aria-invalid');
      }

      const phoneVal = phone.value.trim();
      const emailVal = email.value.trim();
      
      if (!phoneVal && !emailVal) {
        document.getElementById('err-contactPhone').textContent = '請填寫電話或電子郵件至少一項';
        document.getElementById('err-contactPhone').classList.remove('hidden');
        phone.setAttribute('aria-invalid', 'true');
        hasError = true;
        if (!firstErrorField) firstErrorField = phone;
      } else {
        if (phoneVal && phoneVal.length < 6) {
          document.getElementById('err-contactPhone').textContent = '請填寫正確的電話格式';
          document.getElementById('err-contactPhone').classList.remove('hidden');
          phone.setAttribute('aria-invalid', 'true');
          hasError = true;
          if (!firstErrorField) firstErrorField = phone;
        } else {
          document.getElementById('err-contactPhone').classList.add('hidden');
          phone.removeAttribute('aria-invalid');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal && !emailPattern.test(emailVal)) {
          document.getElementById('err-contactEmail').textContent = '請輸入正確信箱格式';
          document.getElementById('err-contactEmail').classList.remove('hidden');
          email.setAttribute('aria-invalid', 'true');
          hasError = true;
          if (!firstErrorField) firstErrorField = email;
        } else {
          document.getElementById('err-contactEmail').classList.add('hidden');
          email.removeAttribute('aria-invalid');
        }
      }

      if (!consent.checked) {
        document.getElementById('err-privacyConsent').classList.remove('hidden');
        consent.setAttribute('aria-invalid', 'true');
        hasError = true;
        if (!firstErrorField) firstErrorField = consent;
      } else {
        document.getElementById('err-privacyConsent').classList.add('hidden');
        consent.removeAttribute('aria-invalid');
      }

      if (hasError) {
        firstErrorField.focus();
        return;
      }

      // Realistic Submitting State (Safe Display Mode)
      submitRfqBtn.disabled = true;
      submitBtnText.textContent = '表單處理中...';
      submitRfqBtn.classList.add('opacity-75');

      setTimeout(() => {
        rfqFormBlock.classList.add('hidden');
        rfqSuccessBlock.classList.remove('hidden');
        submitRfqBtn.disabled = false;
        submitBtnText.textContent = '預覽送出流程';
        submitRfqBtn.classList.remove('opacity-75');
        
        // Focus the success message for screen readers
        const successTitle = rfqSuccessBlock.querySelector('h3');
        if (successTitle) {
          successTitle.setAttribute('tabindex', '-1');
          successTitle.focus();
        }
      }, 900);
    });
  }

  if (resetRfqBtn) {
    resetRfqBtn.addEventListener('click', () => {
      rfqForm.reset();
      fileUploadStatus.classList.add('hidden');
      rfqSuccessBlock.classList.add('hidden');
      rfqFormBlock.classList.remove('hidden');
      document.getElementById('companyName').focus();
    });
  }

  // 7. Modals (Privacy Policy & Disclaimer) Management
  const setupModal = (modalId, openBtnSelector) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    let lastFocusedElement;
    const dialogContent = modal.querySelector('div[role="document"]') || modal.firstElementChild;

    const openModal = (e) => {
      e.preventDefault();
      lastFocusedElement = document.activeElement;
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      
      // Simple fade in scale up
      modal.style.opacity = '0';
      dialogContent.style.transform = 'scale(0.98)';
      dialogContent.style.transition = 'all 180ms ease';
      
      setTimeout(() => {
        modal.style.transition = 'opacity 180ms ease';
        modal.style.opacity = '1';
        dialogContent.style.transform = 'scale(1)';
      }, 10);
      
      // Trap focus logic
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length) {
        setTimeout(() => focusableElements[0].focus(), 100);
      }
    };

    const closeModal = () => {
      modal.style.opacity = '0';
      dialogContent.style.transform = 'scale(0.98)';
      
      setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
      }, 180);
    };

    document.querySelectorAll(openBtnSelector).forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    modal.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  };

  setupModal('privacyModal', '.open-privacy-btn');
  setupModal('disclaimerModal', '.open-disclaimer-btn');

  // 8. Intersection Observer for Scroll Animations
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const headings = section.querySelectorAll('h2, h3:not(.text-xl), p.leading-relaxed');
      headings.forEach((el, idx) => {
        if(section.id === 'contact' || el.closest('#contact')) return; // skip contact for now
        el.classList.add('fade-in-up');
        el.style.transitionDelay = `${idx * 60}ms`;
        observer.observe(el);
      });

      const cards = section.querySelectorAll('.grid > div');
      cards.forEach((card, idx) => {
        // Skip hero stats and small inner grids
        if (card.parentElement.classList.contains('grid-cols-2') && card.parentElement.parentElement.tagName === 'SECTION') {
           return;
        }
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${(idx % 4) * 80 + 100}ms`;
        observer.observe(card);
      });
    });
  }
});
