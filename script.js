// Mobile menu
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: opens the visitor's email app with the message filled in.
// EMAIL: replace with your real address.
const EMAIL = 'your-email@example.com';
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const ok = field.value.trim() && field.checkValidity();
    field.setAttribute('aria-invalid', String(!ok));
    if (!ok) valid = false;
  });
  if (!valid) {
    status.textContent = 'Please fill in your name, a valid email and a short message.';
    return;
  }
  const subject = encodeURIComponent('Website enquiry from ' + data.get('name'));
  const body = encodeURIComponent(data.get('message') + '\n\n' + data.get('name') + '\n' + data.get('email'));
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  status.textContent = 'Thanks! Your email app should open with the message ready to send.';
  form.reset();
});
