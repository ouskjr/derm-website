function toggleMenu(forceOpen) {
  const nav = document.getElementById('nav-links');
  const burger = document.getElementById('hamburger');

  if (!nav || !burger) return;

  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !nav.classList.contains('open');
  nav.classList.toggle('open', shouldOpen);
  burger.classList.toggle('open', shouldOpen);
  burger.setAttribute('aria-expanded', String(shouldOpen));
  burger.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
}

function handleSubmit(event) {
  event.preventDefault();

  const form = document.querySelector('.contact-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  form.style.display = 'none';
  success.style.display = 'flex';
  success.focus();
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    toggleMenu(false);
  }
});

document.getElementById('hamburger')?.addEventListener('click', () => toggleMenu());

document.querySelectorAll('#nav-links a').forEach((link) => {
  link.addEventListener('click', () => toggleMenu(false));
});
