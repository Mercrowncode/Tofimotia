// Function to load the footer
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        
        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (!footerPlaceholder) {
            throw new Error('Footer placeholder not found in the DOM');
        }

        footerPlaceholder.innerHTML = data;

    } catch (error) {
        console.error('Error loading footer:', error);
        
        // Display a fallback footer if loading fails
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `
                <footer class="footer-section">
                    <div class="footer-content">
                        <p>© ${new Date().getFullYear()} TOFIMOTIA. All rights reserved.</p>
                        <p>If you're seeing this message, please refresh the page or contact support.</p>
                    </div>
                </footer>
            `;
        }

        // Optional: Send error to analytics or logging service
        // sendErrorToAnalytics(error);
    }
}

// Load the footer when the page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}

// Add retry mechanism
let retryCount = 0;
const maxRetries = 3;

function retryLoadFooter() {
    if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Retrying footer load... Attempt ${retryCount} of ${maxRetries}`);
        setTimeout(loadFooter, 1000 * retryCount); // Exponential backoff
    }
} 