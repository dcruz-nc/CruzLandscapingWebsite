/* Modern Slideshow with Dot Navigation */

const slideshowRoot = document.querySelector("[data-slideshow]");
const slides = slideshowRoot?.querySelector('[data-slides]');
const dotsContainer = document.querySelector("[data-slideshow-dots]");
const progressBar = document.querySelector("[data-progress-bar]");
const currentSlideSpan = document.querySelector(".current-slide");

let currentSlideIndex = 0;
let slideTimer = null;
let progressInterval = null;

// Initialize slideshow
function initSlideshow() {
    if (!slides || !dotsContainer) return;
    
    const allSlides = [...slides.children];
    
    // Create dot navigation
    allSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.setAttribute('data-slide-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set initial state
    updateActiveSlide(0);
    startAutoAdvance();
    startProgressBar();
}

// Go to specific slide
function goToSlide(index) {
    const allSlides = [...slides.children];
    const allDots = [...dotsContainer.children];
    
    if (index < 0 || index >= allSlides.length) return;
    
    // Remove active state from current slide and dot
    const currentSlide = slides.querySelector("[data-active]");
    const currentDot = dotsContainer.querySelector(".dot.active");
    
    if (currentSlide) currentSlide.removeAttribute('data-active');
    if (currentDot) currentDot.classList.remove('active');
    
    // Set new active slide and dot
    allSlides[index].setAttribute('data-active', true);
    allDots[index].classList.add('active');
    
    // Update counter
    currentSlideIndex = index;
    if (currentSlideSpan) {
        currentSlideSpan.textContent = index + 1;
    }
    
    // Reset timer and progress
    startAutoAdvance();
    startProgressBar();
}

// Next slide
function nextSlide() {
    const allSlides = [...slides.children];
    const nextIndex = (currentSlideIndex + 1) % allSlides.length;
    goToSlide(nextIndex);
}

// Previous slide
function prevSlide() {
    const allSlides = [...slides.children];
    const prevIndex = currentSlideIndex === 0 ? allSlides.length - 1 : currentSlideIndex - 1;
    goToSlide(prevIndex);
}

// Update active slide state
function updateActiveSlide(index) {
    currentSlideIndex = index;
    if (currentSlideSpan) {
        currentSlideSpan.textContent = index + 1;
    }
    
    // Update dots
    const allDots = [...dotsContainer.children];
    allDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-advance functionality
function startAutoAdvance() {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 10000);
}

// Progress bar functionality
function startProgressBar() {
    if (progressInterval) clearInterval(progressInterval);
    
    if (progressBar) {
        progressBar.style.width = '0%';
        
        progressInterval = setInterval(() => {
            const currentWidth = parseFloat(progressBar.style.width) || 0;
            const increment = 100 / (10000 / 100); // 10 seconds = 10000ms, update every 100ms
            
            if (currentWidth >= 100) {
                progressBar.style.width = '0%';
            } else {
                progressBar.style.width = (currentWidth + increment) + '%';
            }
        }, 100);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

slideshowRoot?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slideshowRoot?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // Swipe left
        } else {
            prevSlide(); // Swipe right
        }
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initScrollAnimations();
});

/* Scroll Animation System */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to trigger animations
                if (entry.target.classList.contains('who-we-are-section')) {
                    entry.target.classList.add('animate');
                }
                if (entry.target.id === 'services') {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe the Who We Are section
    const whoWeAreSection = document.querySelector('.who-we-are-section');
    if (whoWeAreSection) {
        observer.observe(whoWeAreSection);
    }

    // Observe the services section
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
        observer.observe(servicesSection);
    }
}

/* Modern Mobile Navigation Toggle */
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileNav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-nav-overlay');
    
    // Close if clicking on overlay
    if (event.target === overlay) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Close mobile nav when clicking on anchor links or CTA buttons
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Check if the clicked element is inside a mobile nav link
    const clickedLink = event.target.closest('.mobile-nav-link');
    if (clickedLink && clickedLink.getAttribute('href') && clickedLink.getAttribute('href').startsWith('#')) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
    
    // Also check if clicked element is the mobile CTA button or inside it
    if (event.target.closest('.mobile-cta-button')) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Handle mobile nav close button
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (event.target.closest('.mobile-nav-close')) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Use CSS scroll-padding-top to handle the fixed header offset
// No JavaScript scroll handling needed - let the browser handle it naturally!