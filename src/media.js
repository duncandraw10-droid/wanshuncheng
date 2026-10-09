export function initMedia() {
  // --- Bootstrap Image Modal ---
  let modalTriggerBtn = null;
  let modalOpening = false;
  let modalClosePending = false;
  const modalElement = document.getElementById('image-modal');
  const imageModal = modalElement ? bootstrap.Modal.getOrCreateInstance(modalElement) : null;

  function openModal(src, title, webpSrc) {
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
  }

  function closeModal() {
    // Bootstrap ignores hide() during its opening transition. Keep a quick
    // close-button tap and finish closing as soon as the transition completes.
    if (modalOpening) modalClosePending = true;
    else imageModal?.hide();
  }

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

  modalElement?.querySelector('[data-modal-close]')?.addEventListener('click', closeModal);
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

  return modalElement;
}
