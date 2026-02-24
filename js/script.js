document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect (Glassmorphism activation)
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible so it doesn't re-animate
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-up initially triggering hero
    // To ensure hero animates on load even if observer is slightly slow:
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // Observe other elements
    document.querySelectorAll('.fade-up:not(.hero .fade-up)').forEach(el => {
        observer.observe(el);
    });

    // 3. Custom cursor glow effect on mouse move (Subtle interaction)
    // Create a dynamic glow effect that follows the cursor slightly
    const bgEffects = document.querySelector('.background-effects');

    if (bgEffects && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Move glow elements slightly based on mouse position
            const glow1 = document.querySelector('.glow-1');
            const glow2 = document.querySelector('.glow-2');

            if (glow1) {
                glow1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            }
            if (glow2) {
                glow2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
            }
        });
    }

    // 4. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isFlex = navLinks.style.display === 'flex';
            navLinks.style.display = isFlex ? 'none' : 'flex';
            if (!isFlex) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(12px)';
                navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            }
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }
});
