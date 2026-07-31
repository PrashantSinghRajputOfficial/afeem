/* ==========================================================================
   Home Hero Slider Carousel Controller - AFEEM Fragrances (Vanilla JS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("hero-slider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    const prevBtn = document.getElementById("slider-prev");
    const nextBtn = document.getElementById("slider-next");
    const dotsContainer = document.getElementById("slider-dots-container");

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval;

    // 1. Create Slider Dots Pagination
    if (dotsContainer) {
        dotsContainer.innerHTML = Array.from(slides).map((_, idx) => `
            <span class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>
        `).join('');
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];

    // 2. Go to specific slide function
    const goToSlide = (index) => {
        // Reset current active classes
        slides[currentIndex].classList.remove("active");
        if (dots.length > 0) dots[currentIndex].classList.remove("active");

        // Update active index
        currentIndex = (index + slides.length) % slides.length;

        // Set new active classes
        slides[currentIndex].classList.add("active");
        if (dots.length > 0) dots[currentIndex].classList.add("active");

        // Reset autoplay timer on manual slide click
        resetAutoplay();
    };

    // 3. Slider Nav actions triggers
    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            goToSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            goToSlide(currentIndex + 1);
        });
    }

    // Dots clicks delegation
    if (dotsContainer) {
        dotsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("dot")) {
                const targetIdx = parseInt(e.target.getAttribute("data-index"));
                goToSlide(targetIdx);
            }
        });
    }

    // 4. Autoplay functions
    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 6000); // Transitions slide every 6 seconds
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        startAutoplay();
    };

    // Init slider autoplay loop
    startAutoplay();
});
