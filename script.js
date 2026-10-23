const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const form = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');
const dropdown = document.querySelector('.t-dropdown');
const closeMs = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-menu-close')) || 150;

const openMenu = () => {
  dropdown.classList.remove('is-closing');
  dropdown.classList.add('is-open');
  header.classList.add('is-open');
  menuButton.setAttribute('aria-expanded', 'true');
};

const closeMenu = () => {
  dropdown.classList.remove('is-open');
  dropdown.classList.add('is-closing');
  header.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => dropdown.classList.remove('is-closing'), closeMs);
};

menuButton.addEventListener('click', () => {
  if (header.classList.contains('is-open')) closeMenu();
  else openMenu();
});

mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.setProperty('--reveal-delay', `${(index % 3) * 60}ms`);
  observer.observe(element);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Thanks. Your project enquiry is ready to be shared with the Raffesia team.';
  formMessage.classList.add('is-visible');
  form.reset();
});
