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

/* random image api dom manipulation*/
function fetchRandomImage() {
    const apiUrl = 'https://picsum.photos/360/300?grayscale&blur=2';
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            return response.url; 
        })
        .catch(error => {
            console.error('Error fetching random image:', error);
            return '../TheCode/images/regency_grill.jpg';
        });
}

function setRandomBackgroundImages() {
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        fetchRandomImage()
            .then(imageUrl => {
                step.style.backgroundImage = `url('${imageUrl}')`;
            })
            .catch(error => {
                console.error('Error setting random background image:', error);
                step.textContent = 'Failed to load image. Please try again later.';
            });
    });
}

window.addEventListener('load', setRandomBackgroundImages);
