/* slideshow (carousel) */

const buttons = document.querySelectorAll("[data-slideshow-button]");

function changeSlide(offset) {
    const slideshowRoot = document.querySelector("[data-slideshow]");
    if (!slideshowRoot) return;
    const slides = slideshowRoot.querySelector('[data-slides]');
    if (!slides) return;

    const activeSlide = slides.querySelector("[data-active]");
    const allSlides = [...slides.children];
    if (allSlides.length === 0) return;
    const activeIndex = Math.max(0, allSlides.indexOf(activeSlide));
    let newIndex = activeIndex + offset;
    if (newIndex < 0) newIndex = allSlides.length - 1;
    if (newIndex >= allSlides.length) newIndex = 0;

    allSlides[newIndex].setAttribute('data-active', true);
    if (activeSlide) activeSlide.removeAttribute('data-active');
}

let slideTimer = null;

function startAutoAdvance() {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(() => changeSlide(1), 10000);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.slideshowButton === "next" ? 1 : -1;
        changeSlide(offset);
        startAutoAdvance();
    });
});

// Auto-advance every 10 seconds, and ensure timer resets on manual navigation
startAutoAdvance();


/* dropdown mobile */
// Mobile Navigation Toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.hamburger');
    
    if (!hamburger.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});