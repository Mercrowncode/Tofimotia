document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.vendors-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardWidth = 320; // card width + gap

    // Function to check scroll position and update button visibility
    function updateButtonVisibility() {
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        // Show/hide previous button
        prevBtn.style.opacity = scrollLeft <= 0 ? '0.5' : '1';
        prevBtn.style.cursor = scrollLeft <= 0 ? 'not-allowed' : 'pointer';
        
        // Show/hide next button
        nextBtn.style.opacity = scrollLeft >= maxScroll ? '0.5' : '1';
        nextBtn.style.cursor = scrollLeft >= maxScroll ? 'not-allowed' : 'pointer';
    }

    // Initial button visibility check
    updateButtonVisibility();

    // Add scroll event listener to update button visibility
    carousel.addEventListener('scroll', updateButtonVisibility);

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });

    // Add touch scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    let overlay;

    // Create and append overlay if it doesn't exist
    if (!document.querySelector('.overlay')) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        body.appendChild(overlay);
    } else {
        overlay = document.querySelector('.overlay');
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Update text colors when scrolled
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--primary-color)';
            });
            document.querySelector('.nav-brand').style.color = 'var(--primary-color)';
        } else {
            navbar.classList.remove('scrolled');
            // Restore original text colors
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--white)';
            });
            document.querySelector('.nav-brand').style.color = 'var(--white)';
        }
    });
}); 