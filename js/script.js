document.addEventListener('DOMContentLoaded', function() {
    var currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    var logoText = document.getElementById('logoText');
    if (logoText) {
        var originalHTML = logoText.textContent;
        var chars = originalHTML.split('');
        logoText.innerHTML = '';
        chars.forEach(function(c) {
            var span = document.createElement('span');
            span.className = 'char';
            span.textContent = c;
            logoText.appendChild(span);
        });
    }

    var animatedElements = document.querySelectorAll('[data-animate]');
    var shimmerElements = document.querySelectorAll('[data-animate="shimmer"]');

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
    };

    var observer = new IntersectionObserver(function(entries) {
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

    var shimmerObserver = new IntersectionObserver(function(entries) {
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

    var filterButtons = document.querySelectorAll('.filter-btn');
    var productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterButtons.forEach(function(b) { b.classList.remove('filter-btn--active'); });
            btn.classList.add('filter-btn--active');
            var filterValue = btn.dataset.filter;

            productCards.forEach(function(card) {
                card.style.display = 'none';
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else if (filterValue === 'best') {
                    if (card.getAttribute('data-best') === 'true') {
                        card.style.display = 'flex';
                    }
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    }
                }
            });
        });
    });

    var burgerBtn = document.querySelector('.nav__burger');
    var navList = document.querySelector('.nav__list');

    if (burgerBtn && navList) {
        burgerBtn.addEventListener('click', function() {
            var expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
            burgerBtn.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('active');
        });

        var navLinks = navList.querySelectorAll('.nav__link');
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

    var priceModal = document.getElementById('priceModal');
    var closePriceModal = document.getElementById('closePriceModal');
    var productModal = document.getElementById('productModal');
    var closeProductModal = document.getElementById('closeProductModal');

    var priceButtons = document.querySelectorAll('.btn--price');
    priceButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (priceModal) priceModal.classList.add('active');
        });
    });

    if (closePriceModal && priceModal) {
        closePriceModal.addEventListener('click', function() {
            priceModal.classList.remove('active');
        });
    }

    if (closeProductModal && productModal) {
        closeProductModal.addEventListener('click', function() {
            productModal.classList.remove('active');
        });
    }

    if (priceModal) {
        priceModal.addEventListener('click', function(e) {
            if (e.target === priceModal) {
                priceModal.classList.remove('active');
            }
        });
    }

    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                productModal.classList.remove('active');
            }
        });
    }

    productCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn--price')) return;
            if (productModal) {
                var imgSrc = card.dataset.image;
                var name = card.dataset.name;

                document.getElementById('modalProductImg').src = imgSrc;
                document.getElementById('modalProductImg').alt = name;

                productModal.classList.add('active');
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (priceModal && priceModal.classList.contains('active')) priceModal.classList.remove('active');
            if (productModal && productModal.classList.contains('active')) productModal.classList.remove('active');
        }
    });

    if (logoText) {
        var charSpans = logoText.querySelectorAll('.char');

        function animateLogoChars() {
            logoText.classList.add('animate-chars');
            charSpans.forEach(function(span, index) {
                span.style.animationDelay = (index * 0.04) + 's';
            });
            setTimeout(function() {
                logoText.classList.remove('animate-chars');
                charSpans.forEach(function(span) {
                    span.style.animationDelay = '';
                });
            }, charSpans.length * 40 + 600);
        }

        animateLogoChars();
        setInterval(animateLogoChars, 7000);
    }
});