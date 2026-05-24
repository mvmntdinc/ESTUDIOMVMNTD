document.addEventListener('DOMContentLoaded', () => {
    // Carrossel - Pacotes
    const pricingCards = document.querySelector('.pricing-cards');
    const dots = document.querySelectorAll('.pricing-dot');
    const btnPrev = document.getElementById('arrow-prev');
    const btnNext = document.getElementById('arrow-next');

    function getCardWidth() {
        const card = document.querySelector('.card');
        return card ? card.offsetWidth + 16 : 0;
    }

    function getCurrentIndex() {
        return Math.round(pricingCards.scrollLeft / getCardWidth());
    }

    function scrollToCard(index) {
        const cards = document.querySelectorAll('.card');
        const i = Math.max(0, Math.min(index, cards.length - 1));
        pricingCards.scrollTo({ left: i * getCardWidth(), behavior: 'smooth' });
    }

    if (pricingCards) {
        pricingCards.addEventListener('scroll', () => {
            const index = getCurrentIndex();
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => scrollToCard(i));
        });

        if (btnPrev) btnPrev.addEventListener('click', () => scrollToCard(getCurrentIndex() - 1));
        if (btnNext) btnNext.addEventListener('click', () => scrollToCard(getCurrentIndex() + 1));
    }

    // Ao clicar em "Ver Pacotes" no mobile, scroll para o 1º card
    const verPacotesBtn = document.querySelector('a[href="#servicos"]');
    if (verPacotesBtn) {
        verPacotesBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768 && pricingCards) {
                setTimeout(() => {
                    pricingCards.scrollTo({ left: 0, behavior: 'smooth' });
                }, 400);
            }
        });
    }

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
