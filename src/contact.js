const inquiryTemplate = [
  "您好，我們有模壓成型的需求，請協助評估：",
  "",
  "1. 產品用途與尺寸：",
  "2. 材料需求（如已知）：",
  "3. 預計數量：",
  "4. 是否已有模具：",
  "5. 希望交期：",
  "",
  "（備註：將隨信附上圖面或產品照片）",
].join('\n');

export function initContact() {
  // --- Bootstrap Toast & Copy ---
  const toastElement = document.getElementById('toast');
  const copyToast = toastElement ? bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 2000 }) : null;
  function showToast(message) {
    const msgEl = document.getElementById('toast-message');
    if (msgEl) msgEl.textContent = message;
    copyToast?.show();
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('已複製！');
      trackContact('contact_copy', { contact_method: text.includes('@') ? 'email' : 'phone', contact_location: 'contact', contact_action: 'copy' });
    } catch {
      showToast('複製失敗，請手動複製：' + text);
    }
  }

  async function copyTemplate() {

    try {
      await navigator.clipboard.writeText(inquiryTemplate);
      showToast('已複製！');
      trackContact('contact_copy', { contact_method: 'email', contact_location: 'contact', contact_action: 'copy_template' });
    } catch {
      showToast('複製失敗，請手動複製。');
    }
  }

  document.querySelectorAll('[data-copy-text]').forEach(button => {
    button.addEventListener('click', () => copyToClipboard(button.dataset.copyText));
  });
  document.querySelector('[data-copy-template]')?.addEventListener('click', copyTemplate);
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
}
