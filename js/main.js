// Main JavaScript file for common functionality

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        if (currentScroll > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropbtn');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Mobile dropdowns
    mobileDropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = btn.closest('.mobile-dropdown');
            const dropdownContent = dropdown.querySelector('.mobile-dropdown-content');
            
            // Close other dropdowns
            document.querySelectorAll('.mobile-dropdown-content.active').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('active');
                }
            });

            dropdownContent.classList.toggle('active');
            btn.classList.toggle('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Vendor slider functionality
    const slider = document.querySelector('.top-rated-slider');
    const prevBtn = slider?.querySelector('.prev');
    const nextBtn = slider?.querySelector('.next');
    const cards = slider?.querySelectorAll('.vendor-card.horizontal');

    if (slider && cards.length > 0) {
        let currentIndex = 0;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
        const maxIndex = cards.length - 1;

        const updateSliderPosition = () => {
            slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        };

        prevBtn?.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSliderPosition();
        });

        nextBtn?.addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, maxIndex);
            updateSliderPosition();
        });
    }
});
