// Function to load the footer
async function loadFooter() {
    try {
        const response = await fetch('/footer.html');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        const footerContainer = document.getElementById('footer-container');
        
        if (!footerContainer) {
            throw new Error('Footer container not found in the DOM');
        }

        footerContainer.innerHTML = data;

        // After loading the footer, initialize footer functionality
        initializeFooter();
    } catch (error) {
        console.error('Error loading footer:', error);
        retryLoadFooter();
    }
}

// Function to retry loading the footer if it fails
async function retryLoadFooter(retries = 3, delay = 1000) {
    while (retries > 0) {
        try {
            await loadFooter();
            break;
        } catch (error) {
            retries--;
            if (retries === 0) {
                console.error('Failed to load footer after multiple retries:', error);
            } else {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}

// Function to initialize footer functionality
function initializeFooter() {
    // Initialize email subscription form
    const emailForm = document.querySelector('.cta-form');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your email subscription logic here
        });
    }

    // Initialize social media links hover effects
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}

// Load the footer when the page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
