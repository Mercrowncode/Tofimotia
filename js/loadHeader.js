// Function to load the header
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        const headerContainer = document.getElementById('header-container');
        
        if (!headerContainer) {
            throw new Error('Header container not found in the DOM');
        }

        headerContainer.innerHTML = data;

        // After loading the header, initialize header functionality
        initializeHeader();
    } catch (error) {
        console.error('Error loading header:', error);
        retryLoadHeader();
    }
}

// Function to retry loading the header if it fails
async function retryLoadHeader(retries = 3, delay = 1000) {
    while (retries > 0) {
        try {
            await new Promise(resolve => setTimeout(resolve, delay));
            await loadHeader();
            break;
        } catch (error) {
            retries--;
            if (retries === 0) {
                console.error('Failed to load header after multiple attempts:', error);
            }
        }
    }
}

// Function to initialize header functionality
function initializeHeader() {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Handle mobile dropdowns
    mobileDropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector('.mobile-dropbtn');
        const dropdownContent = dropdown.querySelector('.mobile-dropdown-content');

        if (dropdownBtn && dropdownContent) {
            dropdownBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Close other dropdowns
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                dropdown.classList.toggle('active');
            });
        }
    });

    // Set active nav link
    highlightCurrentPage();

    // Handle header transparency
    handleHeaderTransparency();
}

// Function to highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Function to handle header transparency
function handleHeaderTransparency() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const header = document.querySelector('.header');

    if (currentPath === 'index.html' || currentPath === 'about.html') {
        const updateHeaderStyle = () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(8px)';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
            }
        };

        window.addEventListener('scroll', updateHeaderStyle);
        updateHeaderStyle(); // Initial state
    }
}

// Load the header when the page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
