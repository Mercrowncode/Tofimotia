document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    const dropdownBtns = document.querySelectorAll('.mobile-dropbtn');
    const navCenter = document.querySelector('.nav-center');
    const userAccountSection = document.getElementById('userAccountSection');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.mobile-menu') && 
                !e.target.closest('.mobile-menu-btn') && 
                mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Handle mobile dropdowns
    dropdownBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = mobileDropdowns[index];
            
            // Close other dropdowns
            mobileDropdowns.forEach((d, i) => {
                if (i !== index) {
                    d.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Set active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Handle header transparency for home and about pages
    if (currentPath === 'index.html' || currentPath === 'about.html') {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(8px)';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
            }
        });

        // Initial header state
        if (window.scrollY <= 50) {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1023) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add user account section only for browse-vendors page
    if (currentPath === 'browse-vendors.html') {
        userAccountSection.innerHTML = `
            <div class="user-account">
                <i class="far fa-user-circle"></i>
                <span class="user-email">user@example.com</span>
            </div>
        `;
    }

    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector('.dropbtn');
        if (window.innerWidth <= 1023) {
            dropdownBtn.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
});
