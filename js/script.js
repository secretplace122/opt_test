document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const animatedElements = document.querySelectorAll('[data-animate]');
    const shimmerElements = document.querySelectorAll('[data-animate="shimmer"]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function(el) {
        if (el.dataset.animate !== 'shimmer') {
            observer.observe(el);
        }
    });

    const shimmerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('shimmer-active');
                setTimeout(function() {
                    entry.target.classList.remove('shimmer-active');
                }, 1000);
            }
        });
    }, { threshold: 0.5 });

    shimmerElements.forEach(function(el) {
        shimmerObserver.observe(el);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterButtons.forEach(function(b) { b.classList.remove('filter-btn--active'); });
            btn.classList.add('filter-btn--active');
            const filterValue = btn.dataset.filter;

            productCards.forEach(function(card) {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const burgerBtn = document.querySelector('.nav__burger');
    const navList = document.querySelector('.nav__list');

    if (burgerBtn && navList) {
        burgerBtn.addEventListener('click', function() {
            const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
            burgerBtn.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('active');
        });

        const navLinks = navList.querySelectorAll('.nav__link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.addEventListener('click', function(e) {
        if (navList && navList.classList.contains('active') && !e.target.closest('.nav') && !e.target.closest('.nav__burger')) {
            navList.classList.remove('active');
            if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
});