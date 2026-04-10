// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Counter Animation for Stats
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : stat.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCount);
            } else {
                if (target === 100) {
                    stat.textContent = '100%';
                } else if (stat.getAttribute('data-count') === '10000') {
                    stat.textContent = '10,000+';
                } else if (target === 15) {
                    stat.textContent = '15+';
                } else if (target === 50) {
                    stat.textContent = '50+';
                } else {
                    stat.textContent = target;
                }
            }
        };

        updateCount();
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Message Sent Successfully!';
        submitButton.style.backgroundColor = '#27ae60';

        // Reset form
        contactForm.reset();

        // Restore button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.service-card, .authority-card, .testimonial-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0.5';
    fadeObserver.observe(el);
});

// Add active state to buttons on click
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Prevent form submission if fields are empty
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

console.log('Highfly Document Clearing - Website loaded successfully!');
