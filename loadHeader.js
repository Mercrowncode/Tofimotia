// Function to load the header
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        const headerPlaceholder = document.getElementById('header-placeholder');
        
        if (!headerPlaceholder) {
            throw new Error('Header placeholder not found in the DOM');
        }

        headerPlaceholder.innerHTML = data;

        // After loading the header, initialize mobile menu functionality
        initializeMobileMenu();
        
        // Highlight current page in navigation
        highlightCurrentPage();

    } catch (error) {
        console.error('Error loading header:', error);
        retryLoadHeader();
    }
}

// Function to retry loading the header if it fails
async function retryLoadHeader(retries = 3, delay = 1000) {
    if (retries > 0) {
        setTimeout(async () => {
            try {
                await loadHeader();
            } catch (error) {
                console.error(`Retry failed, ${retries - 1} retries left`);
                retryLoadHeader(retries - 1, delay * 1.5);
            }
        }, delay);
    }
}

// Function to initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// Function to highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Load the header when the page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
