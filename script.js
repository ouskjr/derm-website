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

// === SCROLL REVEAL (covers both .reveal and .reveal-clip) ===
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal, .reveal-clip').forEach((el) => observer.observe(el));

const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar?.classList.toggle('scrolled', y > 50);
  backToTop?.classList.toggle('visible', y > 300);
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// === HERO WORD STAGGER ===
(function initHeroWordStagger() {
  const h1 = document.querySelector('.hero-title');
  if (!h1) return;

  h1.style.animation = 'none';
  h1.style.opacity = '1';
  h1.style.transform = 'none';

  const words = h1.textContent.trim().split(/\s+/);
  h1.innerHTML = words
    .map((word, i) => `<span class="word-span" style="animation-delay:${i * 80}ms">${word}</span>`)
    .join(' ');
})();

// === 3D CARD TILT ===
(function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotY = ((x / rect.width) - 0.5) * 12;
      const rotX = -((y / rect.height) - 0.5) * 12;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      card.style.boxShadow = '0 16px 40px rgba(201,122,143,0.22)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
})();
