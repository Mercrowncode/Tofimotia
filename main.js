document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const authButtons = document.querySelector('.auth-buttons');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        authButtons.classList.toggle('active');
    });

    // Handle dropdowns in mobile view
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 1023) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && 
            !navMenu.contains(e.target) && 
            !authButtons.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            authButtons.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1023) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            authButtons.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});
