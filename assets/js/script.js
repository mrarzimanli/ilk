'use strict';

// ============================================================================
// SEARCH OVERLAY CLASS
// ============================================================================
class SearchOverlay {
    constructor() {
        this.searchBtn = document.querySelector('.header__search');
        this.searchOverlay = document.querySelector('.search-overlay');
        this.searchClose = document.querySelector('.search-overlay__close');
        this.searchInput = document.querySelector('.search-overlay__input');

        if (this.searchBtn && this.searchOverlay) {
            this.init();
        }
    }

    init() {
        this.searchBtn.addEventListener('click', () => this.open());

        if (this.searchClose) {
            this.searchClose.addEventListener('click', () => this.close());
        }

        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchOverlay.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        this.searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (this.searchInput) {
            setTimeout(() => this.searchInput.focus(), 300);
        }
    }

    close() {
        this.searchOverlay.classList.remove('active');
        document.body.style.overflow = '';

        if (this.searchInput) {
            this.searchInput.value = '';
        }
    }
}

// ============================================================================
// LANGUAGE DROPDOWN CLASS
// ============================================================================
class LanguageDropdown {
    constructor() {
        this.toggle = document.querySelector('.header__language .header__actions__btn');
        this.menu = document.querySelector('.language-dropdown__menu');
        this.links = document.querySelectorAll('.language-dropdown__link');

        if (this.toggle && this.menu) {
            this.init();
        }
    }

    init() {
        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-dropdown')) {
                this.closeDropdown();
            }
        });

        // Handle language selection
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectLanguage(link);
            });
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        const isOpen = this.menu.classList.contains('active');

        if (isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        this.menu.classList.add('active');
        this.toggle.setAttribute('aria-expanded', 'true');
    }

    closeDropdown() {
        this.menu.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
    }

    selectLanguage(link) {
        const flag = link.querySelector('.language-dropdown__flag').textContent;
        const code = link.querySelector('.language-dropdown__name').textContent;

        // Update toggle button
        this.toggle.querySelector('.header__actions__btn__flag').textContent = flag;
        this.toggle.querySelector('.header__actions__btn__code').textContent = link.dataset.code;

        // Close dropdown
        this.closeDropdown();

        // Store selected language
        localStorage.setItem('selectedLanguage', link.dataset.lang);

        // You can add language switching logic here
        console.log('Language changed to:', link.dataset.lang);
    }
}

// ============================================================================
// NAVIGATION CLASS
// ============================================================================
class Navigation {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav__menu');
        this.navOverlay = document.querySelector('.nav__overlay');

        if (this.menuToggle && this.navMenu) {
            this.init();
        }
    }

    init() {
        this.menuToggle.addEventListener('click', () => this.toggleMenu());

        if (this.navOverlay) {
            this.navOverlay.addEventListener('click', () => this.closeMenu());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isActive = this.navMenu.classList.contains('active');

        if (isActive) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.navMenu.classList.add('active');
        this.menuToggle.classList.add('active');

        if (this.navOverlay) {
            this.navOverlay.classList.add('active');
        }

        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');

        if (this.navOverlay) {
            this.navOverlay.classList.remove('active');
        }

        document.body.style.overflow = '';
    }
}

// ============================================================================
// CURRENCY CONSTANTS
// ============================================================================
const CURRENCY_CONFIG = {
    BASE_CURRENCY: 'AZN',
    CURRENCIES: [
        { code: 'USD', name: 'DOLAR $', icon: 'ri-money-dollar-circle-line', dataAttr: 'usd' },
        { code: 'EUR', name: 'EURO €', icon: 'ri-money-euro-circle-line', dataAttr: 'eur' },
        { code: 'TRY', name: 'ALTIN', icon: 'ri-copper-coin-line', dataAttr: 'gold' },
        { code: 'GBP', name: 'STERLIN £', icon: 'ri-money-pound-circle-line', dataAttr: 'gbp' },
        { code: 'CHF', name: 'FRANK ₣', icon: 'ri-copper-coin-line', dataAttr: 'chf' },
        { code: 'JPY', name: 'YEN ¥', icon: 'ri-money-cny-circle-line', dataAttr: 'jpy' },
        { code: 'BTC', name: 'BITCOIN', icon: 'ri-bit-coin-line', dataAttr: 'bitcoin', isCrypto: true },
        { code: 'ETH', name: 'ETHEREUM', icon: 'ri-ethereum-line', dataAttr: 'ethereum', isCrypto: true }
    ],
    API_ENDPOINTS: {
        EXCHANGE_RATE: 'https://api.exchangerate-api.com/v4/latest/',
        CRYPTO: 'https://api.coingecko.com/api/v3/simple/price'
    },
    UPDATE_INTERVAL: 60000,
    ANIMATION_DURATION: 1000
};

// ============================================================================
// CURRENCY SLIDER CLASS
// ============================================================================
class CurrencySlider {
    constructor() {
        this.sliderElement = document.querySelector('.swiper--currency');
        this.updateInterval = null;

        if (this.sliderElement) {
            this.createCurrencySlides();
            this.init();
            this.fetchCurrencyData();
            this.startAutoUpdate();
        }
    }

    createCurrencySlides() {
        const swiperWrapper = this.sliderElement.querySelector('.swiper-wrapper');
        if (!swiperWrapper) return;

        // Clear existing slides
        swiperWrapper.innerHTML = '';

        // Create slides from CURRENCY_CONFIG
        CURRENCY_CONFIG.CURRENCIES.forEach(currency => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="currency__slide currency__slide--${currency.dataAttr}" data-currency="${currency.dataAttr}">
                    <div class="currency__slide__icon">
                        <i class="${currency.icon}"></i>
                    </div>
                    <div class="currency__slide__content">
                        <div class="currency__slide__name">${currency.name}</div>
                        <div class="currency__slide__value">
                            <span class="currency-value">0.00</span>
                            <span class="currency-symbol">₼</span>
                        </div>
                    </div>
                    <div class="currency__slide__change currency__slide__change--up">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2L6 10M6 2L2 6M6 2L10 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="change-value">0.00%</span>
                    </div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
    }

    init() {
        this.swiper = new Swiper('.swiper--currency', {
            slidesPerView: 'auto',
            spaceBetween: 12,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 500,
            grabCursor: true,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                },
                768: {
                    slidesPerView: 5,
                    spaceBetween: 12,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 12,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 12,
                },
                1400: {
                    slidesPerView: 5,
                    spaceBetween: 12,
                },
            },
        });
    }

    startAutoUpdate() {
        // Update currency data periodically
        this.updateInterval = setInterval(() => {
            this.fetchCurrencyData();
        }, CURRENCY_CONFIG.UPDATE_INTERVAL);
    }

    async fetchCurrencyData() {
        try {
            // Fetch currency data from Exchange Rate API for Azerbaijan
            const response = await fetch(`${CURRENCY_CONFIG.API_ENDPOINTS.EXCHANGE_RATE}${CURRENCY_CONFIG.BASE_CURRENCY}`);
            const data = await response.json();

            if (data && data.rates) {
                // Calculate AZN values for each currency (how much AZN for 1 unit of foreign currency)
                const rates = {
                    usd: (1 / data.rates.USD).toFixed(4),
                    eur: (1 / data.rates.EUR).toFixed(4),
                    try: (1 / data.rates.TRY).toFixed(4),
                    gbp: (1 / data.rates.GBP).toFixed(4),
                    chf: (1 / data.rates.CHF).toFixed(4),
                    jpy: (1 / data.rates.JPY).toFixed(4),
                };

                // Generate random small changes for fiat currencies (0.01% to 0.5%)
                const generateChange = () => (Math.random() * 0.5).toFixed(2);

                // Update all fiat currency displays
                this.updateCurrencyValue('usd', rates.usd, generateChange());
                this.updateCurrencyValue('eur', rates.eur, generateChange());
                this.updateCurrencyValue('gold', rates.try, generateChange()); // Using TRY for gold
                this.updateCurrencyValue('gbp', rates.gbp, generateChange());
                this.updateCurrencyValue('chf', rates.chf, generateChange());
                this.updateCurrencyValue('jpy', rates.jpy, generateChange());

                // Fetch crypto prices
                this.fetchCryptoData(rates);
            }
        } catch (error) {
            console.error('❌ Error fetching currency data:', error);
            this.setDefaultValues();
        }
    }

    async fetchCryptoData(fiatRates) {
        try {
            // Fetch crypto prices in USD then convert to AZN
            const response = await fetch(`${CURRENCY_CONFIG.API_ENDPOINTS.CRYPTO}?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`);
            const data = await response.json();

            if (data) {
                const usdToAzn = parseFloat(fiatRates.usd);

                // Calculate crypto prices in AZN
                const btcPrice = data.bitcoin?.usd;
                const ethPrice = data.ethereum?.usd;

                if (btcPrice && ethPrice) {
                    const btcInAzn = (btcPrice * usdToAzn).toFixed(2);
                    const ethInAzn = (ethPrice * usdToAzn).toFixed(2);

                    // Get 24h change percentages
                    const btcChange = data.bitcoin?.usd_24h_change?.toFixed(2) || '0';
                    const ethChange = data.ethereum?.usd_24h_change?.toFixed(2) || '0';

                    this.updateCurrencyValue('bitcoin', btcInAzn, btcChange);
                    this.updateCurrencyValue('ethereum', ethInAzn, ethChange);
                }
            }
        } catch (error) {
            console.error('Error fetching crypto data:', error);
        }
    }

    updateCurrencyValue(currency, value, changePercent) {
        const currencySlide = document.querySelector(`[data-currency="${currency}"]`);
        if (currencySlide) {
            const valueElement = currencySlide.querySelector('.currency-value');
            if (valueElement) {
                const currentValue = parseFloat(valueElement.textContent) || 0;
                const newValue = parseFloat(value);

                // Only animate if value changed
                if (Math.abs(currentValue - newValue) > 0.01) {
                    this.animateValue(valueElement, currentValue, newValue, CURRENCY_CONFIG.ANIMATION_DURATION);
                }
            }

            // Update change percentage
            const changeElement = currencySlide.querySelector('.change-value');
            const changeContainer = currencySlide.querySelector('.currency__slide__change');

            if (changeElement && changeContainer) {
                const change = parseFloat(changePercent);
                const isPositive = change >= 0;

                changeElement.textContent = `${Math.abs(change).toFixed(2)}%`;

                if (isPositive) {
                    changeContainer.classList.remove('currency__slide__change--down');
                    changeContainer.classList.add('currency__slide__change--up');
                } else {
                    changeContainer.classList.remove('currency__slide__change--up');
                    changeContainer.classList.add('currency__slide__change--down');
                }
            }
        }
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuad = progress * (2 - progress);
            const current = start + (range * easeOutQuad);

            // Format based on value size
            if (end > 1000) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = current.toFixed(4);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = end.toFixed(end > 1000 ? 2 : 4);
            }
        };

        requestAnimationFrame(animate);
    }

    setDefaultValues() {
        // Default values for Azerbaijan (approximate as of 2024)
        this.updateCurrencyValue('usd', '1.7000', '0.05');
        this.updateCurrencyValue('eur', '1.8500', '0.12');
        this.updateCurrencyValue('gold', '0.0490', '0.08');
        this.updateCurrencyValue('gbp', '2.1500', '0.15');
        this.updateCurrencyValue('chf', '1.9200', '0.10');
        this.updateCurrencyValue('jpy', '0.0115', '0.03');
        this.updateCurrencyValue('bitcoin', '150000.00', '2.45');
        this.updateCurrencyValue('ethereum', '6000.00', '1.85');
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }
    }
}

// ============================================================================
// HOT NEWS SLIDER CLASS
// ============================================================================
class HotNewsSlider {
    constructor() {
        this.sliderElement = document.querySelector('.swiper--hot-news');

        if (this.sliderElement) {
            this.init();
        }
    }

    init() {
        this.swiper = new Swiper('.swiper--hot-news', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 800,
            effect: 'slide',
        });
    }

    destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }
    }
}

// ============================================================================
// NEWS SLIDER CLASS
// ============================================================================
class NewsSlider {
    constructor() {
        this.sliderElement = document.querySelector('.swiper--news');

        if (this.sliderElement) {
            this.init();
        }
    }

    init() {
        this.swiper = new Swiper('.swiper--news', {
            slidesPerView: 'auto',
            spaceBetween: 24,
            loop: false,
            grabCursor: true,
            navigation: {
                nextEl: '.news__slider__nav__next',
                prevEl: '.news__slider__nav__prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
        });
    }

    destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }
    }
}

// ============================================================================
// SUB-CATEGORIES SLIDER CLASS
// ============================================================================
class SubCategoriesSlider {
    constructor() {
        this.sliderElement = document.querySelector('.swiper--subcategories');

        if (this.sliderElement) {
            this.init();
        }
    }

    init() {
        this.swiper = new Swiper('.swiper--subcategories', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            centeredSlides: false,
            loop: false,
            grabCursor: true,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 12,
                },
                1200: {
                    slidesPerView: 8,
                    spaceBetween: 12,
                }
            }
        });
    }

    destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sliders
    new CurrencySlider();
    new HotNewsSlider();
    new NewsSlider();
    new SubCategoriesSlider();

    // Initialize UI components
    new SearchOverlay();
    new LanguageDropdown();
    new Navigation();
});

// ============================================================================
// SIMPLE EVENT HANDLERS
// ============================================================================

// ==================== FAQ Accordion ====================
document.addEventListener('DOMContentLoaded', () => {
    if (window.__faqInitDone) return;
    window.__faqInitDone = true;

    const faqItems = document.querySelectorAll('.faq');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq__question');
                        const otherAnswer = otherItem.querySelector('.faq__answer');

                        if (otherQuestion && otherAnswer) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
});

// ==================== Load More Button ====================
document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.querySelector('.load-more-btn');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            this.textContent = 'Yüklənir...';
            this.disabled = true;

            setTimeout(() => {
                alert('Daha çox məqalə yükləndi!');
                this.textContent = 'Daha çox yüklə';
                this.disabled = false;
            }, 1000);
        });
    }
});

// ==================== Share Buttons ====================
document.addEventListener('DOMContentLoaded', () => {
    const shareButtons = document.querySelectorAll('[data-share]');

    shareButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.getAttribute('data-share');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            let shareUrl = '';

            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${url}`;
                    break;
                default:
                    return;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    const copyLinkBtn = document.querySelector('[data-copy-link]');

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="ri-check-line"></i> Kopyalandı!';

                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }
});

// ==================== Back to Top Button ====================
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.querySelector('#scrollToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ==================== Navigation Submenus ====================
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav__item--has-submenu');
    let hoverTimeout;

    navItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        const submenu = item.querySelector('.nav__submenu');
        const arrow = item.querySelector('.nav__arrow');

        if (!link || !submenu) return;

        // Desktop hover behavior
        link.addEventListener('mouseenter', function () {
            if (window.innerWidth > 768) {
                clearTimeout(hoverTimeout);

                // Hide all other submenus
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherSubmenu = otherItem.querySelector('.nav__submenu');
                        if (otherSubmenu) {
                            otherSubmenu.style.opacity = '0';
                            otherSubmenu.style.visibility = 'hidden';
                            otherSubmenu.style.pointerEvents = 'none';
                        }
                    }
                });

                // Show current submenu
                submenu.style.opacity = '1';
                submenu.style.visibility = 'visible';
                submenu.style.pointerEvents = 'auto';
            }
        });

        link.addEventListener('mouseleave', function () {
            if (window.innerWidth > 768) {
                hoverTimeout = setTimeout(() => {
                    const isHoveringSubmenu = submenu.matches(':hover');
                    if (!isHoveringSubmenu) {
                        submenu.style.opacity = '0';
                        submenu.style.visibility = 'hidden';
                        submenu.style.pointerEvents = 'none';
                    }
                }, 150);
            }
        });

        submenu.addEventListener('mouseenter', function () {
            if (window.innerWidth > 768) {
                clearTimeout(hoverTimeout);
            }
        });

        submenu.addEventListener('mouseleave', function () {
            if (window.innerWidth > 768) {
                hoverTimeout = setTimeout(() => {
                    submenu.style.opacity = '0';
                    submenu.style.visibility = 'hidden';
                    submenu.style.pointerEvents = 'none';
                }, 150);
            }
        });

        // Mobile click behavior
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();

                const isActive = item.classList.contains('nav__item--active');

                // Close all other items
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('nav__item--active');
                        const otherSubmenu = otherItem.querySelector('.nav__submenu');
                        const otherArrow = otherItem.querySelector('.nav__arrow');
                        if (otherSubmenu && otherArrow) {
                            otherSubmenu.style.display = 'none';
                            otherArrow.style.transform = 'rotate(0deg)';
                        }
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('nav__item--active');
                    submenu.style.display = 'none';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                } else {
                    item.classList.add('nav__item--active');
                    submenu.style.display = 'flex';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav__item--has-submenu')) {
                navItems.forEach(item => {
                    item.classList.remove('nav__item--active');
                    const submenu = item.querySelector('.nav__submenu');
                    const arrow = item.querySelector('.nav__arrow');
                    if (submenu && arrow) {
                        submenu.style.display = 'none';
                        arrow.style.transform = 'rotate(0deg)';
                    }
                });
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navItems.forEach(item => {
                item.classList.remove('nav__item--active');
                const submenu = item.querySelector('.nav__submenu');
                const arrow = item.querySelector('.nav__arrow');
                if (submenu && arrow) {
                    submenu.style.opacity = '0';
                    submenu.style.visibility = 'hidden';
                    submenu.style.pointerEvents = 'none';
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
});

// ==================== Post Reactions ====================
document.addEventListener('DOMContentLoaded', () => {
    const reactionBtns = document.querySelectorAll('.reaction-btn');

    reactionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const isActive = this.classList.contains('active');
            const countElement = this.querySelector('span');
            let count = parseInt(countElement.textContent);

            if (isActive) {
                // Remove reaction
                this.classList.remove('active');
                count--;
            } else {
                // Add reaction
                this.classList.add('active');
                count++;
            }

            countElement.textContent = count;
        });
    });
});

// ==================== Comment Form ====================
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.querySelector('.comment-form__form');

    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const textarea = this.querySelector('textarea.form-control');
            const commentText = textarea.value.trim();

            if (commentText) {
                // Show success message
                alert('Yorumunuz gönderildi! (Demo mode - gerçek uygulamada backend\'e gönderilecek)');

                // Clear textarea
                textarea.value = '';
            }
        });
    }
});

// ==================== Comment Like Buttons ====================
document.addEventListener('DOMContentLoaded', () => {
    const commentLikeBtns = document.querySelectorAll('.comment__action-btn--like');

    commentLikeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const isActive = this.classList.contains('active');
            const countElement = this.querySelector('span');
            let count = parseInt(countElement.textContent);

            if (isActive) {
                // Unlike
                this.classList.remove('active');
                count--;
            } else {
                // Like
                this.classList.add('active');
                count++;
            }

            countElement.textContent = count;
        });
    });
});

// ==================== Load More Comments ====================
document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.querySelector('.load-more-comments-btn');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            alert('Daha fazla yorum yükleniyor... (Demo mode)');
        });
    }
});

// ==================== Comment Reply Buttons ====================
document.addEventListener('DOMContentLoaded', () => {
    const replyBtns = document.querySelectorAll('.comment__action-btn:not(.comment__action-btn--like)');

    replyBtns.forEach(btn => {
        if (btn.textContent.includes('Yanıtla')) {
            btn.addEventListener('click', function () {
                alert('Yanıt formu açılıyor... (Demo mode)');
            });
        }
    });
});
