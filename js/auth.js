document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Get account type from URL parameters
    function getAccountType() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('type') || 'organizer'; // Default to organizer if not specified
    }

    // Initialize form based on account type
    function initializeAuthForm() {
        const accountType = getAccountType();
        const formTitle = document.querySelector('.auth-form h2');
        const accountTypeField = document.getElementById('account-type');
        
        if (accountTypeField) {
            accountTypeField.value = accountType;
        }

        if (formTitle) {
            const isSignup = window.location.pathname.includes('signup');
            const action = isSignup ? 'Sign Up' : 'Sign In';
            formTitle.textContent = `${action} as ${accountType.charAt(0).toUpperCase() + accountType.slice(1)}`;
        }

        // Show/hide fields based on account type and form type
        const vendorFields = document.querySelectorAll('.vendor-field');
        const isSignupForm = document.getElementById('signupForm');
        
        vendorFields.forEach(field => {
            field.style.display = (accountType === 'vendor' && isSignupForm) ? 'block' : 'none';
        });
    }

    // Initialize form when page loads
    initializeAuthForm();

    // Handle Signup Form
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error states
            clearErrors();
            
            // Validate form
            if (validateSignupForm()) {
                // Here you would typically send the data to your backend
                console.log('Signup form is valid, ready to submit');
                // Simulate success for now
                showSuccess('signup');
            }
        });
    }

    // Handle Signin Form
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error states
            clearErrors();
            
            // Validate form
            if (validateSigninForm()) {
                // Here you would typically send the data to your backend
                console.log('Signin form is valid, ready to submit');
                // Simulate success for now
                showSuccess('signin');
            }
        });
    }

    // Real-time password validation for signup
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this.value);
        });

        confirmPasswordInput.addEventListener('input', function() {
            validatePasswordMatch(passwordInput.value, this.value);
        });
    }
});

function validateSignupForm() {
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        }
    });

    // Validate email format
    const email = document.getElementById('email');
    if (email.value && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone format
    const phone = document.getElementById('phone');
    if (phone.value && !isValidPhone(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate password
    const password = document.getElementById('password');
    if (password.value && !isValidPassword(password.value)) {
        showError(password, 'Password must be at least 8 characters with letters and numbers');
        isValid = false;
    }

    // Validate password match
    const confirmPassword = document.getElementById('confirmPassword');
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    // Validate terms acceptance
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showError(terms, 'You must accept the Terms and Conditions');
        isValid = false;
    }

    return isValid;
}

function validateSigninForm() {
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['email', 'password'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        }
    });

    // Validate email format
    const email = document.getElementById('email');
    if (email.value && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\-+()]{10,}$/.test(phone);
}

function isValidPassword(password) {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    formGroup.appendChild(errorDiv);
    input.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
}

function showSuccess(type) {
    const form = document.getElementById(type === 'signup' ? 'signupForm' : 'signinForm');
    const message = type === 'signup' 
        ? 'Account Created Successfully!' 
        : 'Signing you in...';
    const redirectPath = type === 'signup' 
        ? '/dashboard.html' 
        : '/dashboard.html';

    form.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h2>${message}</h2>
            <p>You'll be redirected shortly.</p>
        </div>
    `;
    
    // Simulate redirect
    setTimeout(() => {
        window.location.href = redirectPath;
    }, 2000);
}

// Add these styles to auth.css
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .error-message {
            color: var(--error);
            font-size: var(--small-size);
            margin-top: 4px;
        }
        
        .error {
            border-color: var(--error) !important;
        }
        
        .success-message {
            text-align: center;
            padding: var(--spacing-2xl);
        }
        
        .success-message i {
            color: var(--success);
            font-size: 48px;
            margin-bottom: var(--spacing-lg);
        }
        
        .success-message h2 {
            color: var(--success);
            margin-bottom: var(--spacing-md);
        }
        
        .success-message p {
            color: var(--gray-600);
        }
    </style>
`);
