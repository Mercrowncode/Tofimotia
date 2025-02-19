document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vendor-signin-form');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    
    // Password visibility toggle
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // Validate form
            if (!validateForm(email, password)) {
                return;
            }

            // Here you would typically make an API call to authenticate
            console.log('Signing in with:', { email, password, rememberMe });
            
            // For demo purposes, redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
});

function validateForm(email, password) {
    let isValid = true;
    
    // Email validation
    if (!email || !isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        removeError('email');
    }

    // Password validation
    if (!password || password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        isValid = false;
    } else {
        removeError('password');
    }

    return isValid;
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = input.parentElement.querySelector('.error-message') || document.createElement('div');
    
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (!input.parentElement.querySelector('.error-message')) {
        input.parentElement.appendChild(errorDiv);
    }
    
    input.classList.add('error');
}

function removeError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = input.parentElement.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.classList.remove('error');
}
