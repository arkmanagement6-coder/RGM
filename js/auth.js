document.addEventListener('DOMContentLoaded', function() {
    
    // --- Multi-step Form Logic (Registration) ---
    const steps = document.querySelectorAll('.form-step');
    const stepDots = document.querySelectorAll('.step-dot');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    let currentStep = 0;

    if (steps.length > 0) {
        function updateSteps() {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === currentStep);
            });
            
            stepDots.forEach((dot, index) => {
                if (index < currentStep) {
                    dot.classList.add('completed');
                    dot.classList.remove('active');
                } else if (index === currentStep) {
                    dot.classList.add('active');
                    dot.classList.remove('completed');
                } else {
                    dot.classList.remove('active', 'completed');
                }
            });
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Here we would normally validate the current step
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    updateSteps();
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    updateSteps();
                }
            });
        });
    }

    // --- Show "Other" Category Input ---
    const categorySelect = document.getElementById('business-category');
    const otherCategoryGroup = document.getElementById('other-category-group');

    if (categorySelect && otherCategoryGroup) {
        categorySelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherCategoryGroup.style.display = 'block';
                document.getElementById('other-category').setAttribute('required', 'required');
            } else {
                otherCategoryGroup.style.display = 'none';
                document.getElementById('other-category').removeAttribute('required');
            }
        });
    }

    // --- Password Visibility Toggle ---
    const togglePasswords = document.querySelectorAll('.password-toggle');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // --- Registration Form Submit Mock ---
    const registerForm = document.getElementById('registration-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show success message or OTP modal
            alert("Registration Successful! Please check your email to verify your account.");
            window.location.href = "login.html";
        });
    }

    // --- Login Form Submit Mock ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            // Mocking unverified check
            if(email === "unverified@test.com") {
                document.getElementById('unverified-alert').style.display = 'flex';
            } else {
                window.location.href = "dashboard.html";
            }
        });
    }

});
