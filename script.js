document.addEventListener('DOMContentLoaded', () => {
    // Portfolio tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 12, 16, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(11, 12, 16, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Add animation class to elements
    const elementsToAnimate = [
        '.about-text',
        '.about-image',
        '.pricing-header',
        '.card',
        '.portfolio-header',
        '.portfolio-container',
        '.lead-header',
        '.lead-container'
    ];
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    });
});
