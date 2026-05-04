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

const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar?.classList.toggle('scrolled', y > 50);
  backToTop?.classList.toggle('visible', y > 300);
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
