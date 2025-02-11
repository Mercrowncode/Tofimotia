document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navCenter = document.querySelector('.nav-center');
    
    if (mobileMenuBtn && navCenter) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navCenter.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && 
            !event.target.closest('.nav-center') && 
            navCenter.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navCenter.classList.remove('active');
        }
    });

    // Update active state of nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
});
