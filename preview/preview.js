const paletteToggle = document.querySelector('#paletteToggle');
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

paletteToggle?.addEventListener('click', () => {
  const reference = document.body.classList.toggle('reference');
  paletteToggle.textContent = reference ? 'View Heartstead colours' : 'View reference colours';
});

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  });
});
