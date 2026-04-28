/**
 * Revanta Growth Media - Custom Interactivity
 * Features: Hero Slider, Counter Animation, Sticky Header, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header Logic ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Hero Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
                dots[index].classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    // Auto play
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, slideInterval);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, slideInterval);
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.count');
    const counterSection = document.getElementById('counter');
    let counterStarted = false;

    function startCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = target / 100; // Adjust speed
            
            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + speed);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Intersection Observer for Counters
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                startCounters();
                counterStarted = true;
            }
        });
    }, observerOptions);

    if (counterSection) observer.observe(counterSection);

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Submission (Mockup) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you! Your message has been sent. We will get back to you shortly.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
            // Simple toggle for demonstration; in a real app, use a class for animation
        });
    }
});
