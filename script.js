// Toggle icon and navbar
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x'); // Change icon to 'x' when active
        navbar.classList.toggle('active'); // Show/hide navbar
    };
}

// Scroll sections and active link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 100; // Offset for active link
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            // Remove 'active' from all links, add to current
            navLinks.forEach(link => link.classList.remove('active'));
            const currentLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (currentLink) currentLink.classList.add('active');

            // Animate section
            sec.classList.add('show-animate');
        } else {
            // Remove animation if not in viewport
            sec.classList.remove('show-animate');
        }
    });

    // Sticky navbar
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', scrollY > 100);
    }

    // Animate footer on scroll
    const footer = document.querySelector('footer');
    if (footer) {
        const scrolledToBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight;
        footer.classList.toggle('show-animate', scrolledToBottom);
    }
});

// Remove toggle icon and navbar when clicking a navbar link (for mobile UX)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x'); // Reset icon
            navbar.classList.remove('active'); // Hide navbar
        }
    });
});
