/*===== MOBILE MENU =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu mobile when clicking nav links
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



/*===== FORM VALIDATION =====*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');
        
        // Reset previous error states
        clearErrors();
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Ime i prezime je obavezno');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Ime mora imati najmanje 2 karaktera');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email adresa je obavezna');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Unesite validnu email adresu');
            isValid = false;
        }
        
        // Validate phone
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phone.value.trim()) {
            showError(phone, 'Broj telefona je obavezan');
            isValid = false;
        } else if (!phoneRegex.test(phone.value)) {
            showError(phone, 'Unesite valjan broj telefona');
            isValid = false;
        }
        
        // Validate service selection
        if (!service.value) {
            showError(service, 'Molimo odaberite vrstu usluge');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Poruka je obavezna');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Poruka mora imati najmanje 10 karaktera');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            // Reset form
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const inputs = document.querySelectorAll('.contact__input');
    inputs.forEach(input => {
        input.classList.remove('error');
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background-color: #48bb78;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 600;
        ">
            ✓ Vaša poruka je uspješno poslana! Kontaktirat ćemo vas uskoro.
        </div>
    `;
    
    // Insert at the top of the form
    const form = document.getElementById('contact-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/*===== LOADING ANIMATION =====*/
window.addEventListener('load', () => {
    // Add loading animation to hero content
    const heroContent = document.querySelector('.hero__content');
    const heroStats = document.querySelector('.hero__stats');
    
    if (heroContent) {
        heroContent.classList.add('animate-fade-in-up');
    }
    
    if (heroStats) {
        setTimeout(() => {
            heroStats.classList.add('animate-fade-in-up');
        }, 300);
    }
});

/*===== NAVBAR HAMBURGER ANIMATION =====*/
const navToggleBtn = document.getElementById('nav-toggle');
if (navToggleBtn) {
    navToggleBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active');
        }
    }
});

/*===== SCROLL TO TOP BUTTON =====*/
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: #e53e3e;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*===== PARALLAX EFFECT FOR HERO =====*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

/*===== COUNTER ANIMATION =====*/
function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 20);
    });
}

// Trigger counter animation when hero stats are visible
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
    heroStatsObserver.observe(heroStats);
}

/*===== FORM INPUT FOCUS EFFECTS =====*/
const formInputs = document.querySelectorAll('.contact__input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentNode.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentNode.classList.add('focused');
    }
});

/*===== PERFORMANCE OPTIMIZATION =====*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollActive = debounce(scrollActive, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollActive);

