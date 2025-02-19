// Store form data across steps
let formData = {
    business: {},
    contact: {},
    payment: {},
    work: {}
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vendor-signup-form');
    const nextButton = document.getElementById('next-step');
    const createAccountButton = document.getElementById('create-account');

    // Handle file inputs
    setupFileInputs();
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentStep = document.querySelector('.form-step').dataset.step;
            
            // Save form data based on current step
            saveFormData(currentStep);

            // If on final step, submit everything
            if (currentStep === '4') {
                submitForm();
            }
        });
    }

    // Handle next button clicks
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const currentStep = document.querySelector('.form-step').dataset.step;
            
            if (validateStep(currentStep)) {
                saveFormData(currentStep);
                navigateToNextStep(currentStep);
            }
        });
    }

    // Form validation for step 1
    function validateStep1() {
        const businessName = document.getElementById('business-name').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;

        return businessName && category && description && location;
    }

    // Update progress indicator
    function updateProgress() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index + 1 < currentStep) {
                step.classList.add('active');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Handle next button click
    nextButton.addEventListener('click', function() {
        if (currentStep === 1 && validateStep1()) {
            // Here you would typically save the data and proceed to next step
            // For now, we'll just simulate going to the next step
            window.location.href = 'vendor-signup-2.html';
        } else {
            // Show validation error
            alert('Please fill in all required fields');
        }
    });

    // Initialize form
    updateProgress();

    // Add input validation styling
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
                this.classList.remove('valid');
            }
        });
    });
});

function setupFileInputs() {
    // Profile Image Preview
    const profileInput = document.getElementById('profile-image');
    if (profileInput) {
        profileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const placeholder = profileInput.nextElementSibling;
                    placeholder.style.backgroundImage = `url(${e.target.result})`;
                    placeholder.style.backgroundSize = 'cover';
                    placeholder.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Portfolio Upload
    const portfolioInput = document.getElementById('portfolio');
    if (portfolioInput) {
        const dropZone = portfolioInput.closest('.file-upload-container');
        
        // Highlight drop zone on drag over
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            portfolioInput.files = e.dataTransfer.files;
            updateFileList(e.dataTransfer.files);
        });

        portfolioInput.addEventListener('change', function() {
            updateFileList(this.files);
        });
    }
}

function updateFileList(files) {
    const placeholder = document.querySelector('.upload-placeholder');
    if (files.length > 0) {
        let fileList = '<div class="file-list">';
        for (let i = 0; i < files.length; i++) {
            fileList += `<div class="file-item">
                <i class="fas fa-file"></i>
                <span>${files[i].name}</span>
            </div>`;
        }
        fileList += '</div>';
        placeholder.innerHTML = fileList;
    }
}

function saveFormData(step) {
    const formElements = document.querySelectorAll('.form-step[data-step="' + step + '"] input, .form-step[data-step="' + step + '"] select, .form-step[data-step="' + step + '"] textarea');
    
    switch(step) {
        case '1':
            formElements.forEach(element => {
                formData.business[element.name] = element.value;
            });
            break;
        case '2':
            formElements.forEach(element => {
                formData.contact[element.name] = element.value;
            });
            break;
        case '3':
            formElements.forEach(element => {
                formData.payment[element.name] = element.value;
            });
            break;
        case '4':
            formElements.forEach(element => {
                if (element.type === 'file') {
                    formData.work[element.name] = element.files;
                } else {
                    formData.work[element.name] = element.value;
                }
            });
            break;
    }
}

function validateStep(step) {
    const currentStepElements = document.querySelectorAll('.form-step[data-step="' + step + '"] [required]');
    let isValid = true;

    currentStepElements.forEach(element => {
        if (!element.value) {
            isValid = false;
            element.classList.add('error');
            
            // Add error message
            let errorMessage = element.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'This field is required';
                element.parentNode.insertBefore(errorMessage, element.nextSibling);
            }
        } else {
            element.classList.remove('error');
            const errorMessage = element.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        }
    });

    return isValid;
}

function navigateToNextStep(currentStep) {
    const nextStep = parseInt(currentStep) + 1;
    window.location.href = `vendor-signup-${nextStep}.html`;
}

function submitForm() {
    // Here you would typically send the data to your server
    console.log('Submitting form data:', formData);
    
    // For now, just redirect to success page
    window.location.href = 'success.html';
}

// Add social media link field
const addLinkButton = document.getElementById('add-link');
if (addLinkButton) {
    addLinkButton.addEventListener('click', function() {
        const container = document.querySelector('.social-links-container');
        const newLinkField = document.createElement('div');
        newLinkField.className = 'input-with-icon';
        newLinkField.innerHTML = `
            <i class="fas fa-link"></i>
            <input type="text" name="social-links[]" placeholder="Add another link">
            <button type="button" class="remove-link" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.insertBefore(newLinkField, addLinkButton);
    });
}
