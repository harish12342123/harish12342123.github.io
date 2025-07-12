// Toggle menu icon and navbar visibility
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
menuIcon?.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

// Track scroll to highlight nav links, animate sections, and sticky footer/header
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector(`header nav a[href="#${id}"]`)?.classList.add('active');
      sec.classList.add('show-animate');
    } else {
      sec.classList.remove('show-animate');
    }
  });

  // Sticky header
  header?.classList.toggle('sticky', scrollY > 100);

  // Animate footer when reached bottom
  if (footer) {
    const bottomReached = window.innerHeight + scrollY >= document.documentElement.scrollHeight;
    footer.classList.toggle('show-animate', bottomReached);
  }
});

// Close navbar toggle when a link is clicked (optimizes mobile UX)
navLinks.forEach(link =>
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  })
);
