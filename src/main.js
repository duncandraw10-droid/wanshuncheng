document.getElementById('mobile-menu-btn')?.addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  const iconMenu = this.querySelector('.icon-menu');
  const iconClose = this.querySelector('.icon-close');
  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    this.setAttribute('aria-expanded', 'false');
  } else {
    menu.classList.remove('hidden');
    menu.classList.add('flex');
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
