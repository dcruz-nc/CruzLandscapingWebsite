/* slideshow (carousel) */

const buttons = document.querySelectorAll("[data-slideshow-button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.slideshowButton === "next" ? 1 : -1;
        const slides = button.closest("[data-slideshow]").querySelector('[data-slides]');

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].setAttribute('data-active', true);
        activeSlide.removeAttribute('data-active');
    });
});


/* logo spin */

const logo = document.getElementById('logo');

logo.addEventListener('mouseenter', () => {
    logo.classList.add('rotate'); 
});

logo.addEventListener('mouseleave', () => {
    logo.classList.remove('rotate'); 
});


/* glow */

const seasonImages = document.querySelectorAll('.season-image');

seasonImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        const season = image.dataset.season;
        image.classList.add(`${season}-glow`); 
    });

    image.addEventListener('mouseleave', () => {
        const season = image.dataset.season;
        image.classList.remove(`${season}-glow`);
    });
});

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