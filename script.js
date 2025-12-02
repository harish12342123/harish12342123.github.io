// Navigation and UI Interactions

document.addEventListener('DOMContentLoaded', () => {

    // Toggle mobile menu
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }

    // Handle section scrolling and activate nav links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    function onScroll() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const offset = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.id;

            if (scrollY >= offset && scrollY < offset + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
                section.classList.add('show-animate');
            } else {
                section.classList.remove('show-animate');
            }
        });

        if (header) {
            header.classList.toggle('sticky', scrollY > 100);
        }

        // Animate footer if scrolled to bottom
        if (footer) {
            const scrolledToBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight;
            footer.classList.toggle('show-animate', scrolledToBottom);
        }
    }

    window.addEventListener('scroll', onScroll);

    // Handle nav link clicks (mobile UX improvement)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuIcon && navbar) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    });

});
