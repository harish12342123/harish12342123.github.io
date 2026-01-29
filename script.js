// ===== Navigation and UI Interactions =====
document.addEventListener('DOMContentLoaded', () => {
    
    // ===== Mobile Menu Toggle =====
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
            
            // Update ARIA attribute for accessibility
            const isExpanded = navbar.classList.contains('active');
            menuIcon.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // ===== Handle Section Scrolling and Activate Nav Links =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    function onScroll() {
        const scrollY = window.scrollY;
        
        // Update active section and nav links
        sections.forEach(section => {
            const offset = section.offsetTop - 150;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollY >= offset && scrollY < offset + height) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                // Add animation class to section
                section.classList.add('show-animate');
            } else {
                section.classList.remove('show-animate');
            }
        });
        
        // Add sticky header on scroll
        if (header) {
            header.classList.toggle('sticky', scrollY > 100);
        }
        
        // Animate footer if scrolled to bottom
        if (footer) {
            const scrolledToBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 10;
            footer.classList.toggle('show-animate', scrolledToBottom);
        }
    }
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            onScroll();
        });
    });
    
    // Initial call to set correct active state on page load
    onScroll();
    
    // ===== Handle Nav Link Clicks (Smooth Scrolling & Mobile Menu Close) =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu when link is clicked
            if (menuIcon && navbar) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
                menuIcon.setAttribute('aria-expanded', 'false');
            }
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== Close Mobile Menu When Clicking Outside =====
    document.addEventListener('click', (e) => {
        if (navbar && menuIcon) {
            const isClickInsideNav = navbar.contains(e.target);
            const isClickOnMenuIcon = menuIcon.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnMenuIcon && navbar.classList.contains('active')) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
                menuIcon.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // ===== Animate Skills Progress Bars on Scroll =====
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.skills-box .progress .bar span');
    let skillsAnimated = false;
    
    function animateSkills() {
        if (!skillsSection || skillsAnimated) return;
        
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const scrollY = window.scrollY;
        
        if (scrollY >= skillsSectionTop - 300 && scrollY < skillsSectionTop + skillsSectionHeight) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsAnimated = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        animateSkills();
    });
    
    // ===== Form Validation and Submission =====
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields!');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return;
            }
            
            // Success message (you would typically send this to a server)
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
            // Here you would typically send the form data to your server
            // Example using fetch:
            /*
            fetch('your-server-endpoint.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                alert('Error sending message. Please try again.');
                console.error('Error:', error);
            });
            */
        });
    }
    
    // ===== Add Active Class on Page Load Based on URL Hash =====
    if (window.location.hash) {
        const targetLink = document.querySelector(`header nav a[href="${window.location.hash}"]`);
        if (targetLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
        }
    }
    
    // ===== Typing Animation for Home Section (Optional Enhancement) =====
    const typingText = document.querySelector('.home-content h2');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeText, 500);
    }
});

// ===== Smooth Scroll for All Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});
