document.addEventListener('DOMContentLoaded', function() {
    // Partners slider
    const partnerSlider = document.getElementById('partnerSlider');
    const partnerPrevButton = document.getElementById('partnerPrevButton');
    const partnerNextButton = document.getElementById('partnerNextButton');
    let partnerCurrentPosition = 0;
    const partnerSlideWidth = 200; // Width of each partner slide
    const partnerSlidesCount = partnerSlider.children.length;
    let visibleSlides = Math.floor(partnerSlider.offsetWidth / partnerSlideWidth);

    function updatePartnerSlider() {
        visibleSlides = Math.floor(partnerSlider.offsetWidth / partnerSlideWidth);
        const maxPosition = Math.max(0, partnerSlidesCount - visibleSlides);
        if (partnerCurrentPosition > maxPosition) {
            partnerCurrentPosition = maxPosition;
            updatePartnerSliderPosition();
        }
    }

    function updatePartnerSliderPosition() {
        const offset = -partnerCurrentPosition * partnerSlideWidth;
        partnerSlider.style.transform = `translateX(${offset}px)`;
        partnerSlider.style.transition = 'transform 0.3s ease-in-out';
        // Update button states
        partnerPrevButton.style.opacity = partnerCurrentPosition <= 0 ? '0.5' : '1';
        partnerNextButton.style.opacity = partnerCurrentPosition >= partnerSlidesCount - visibleSlides ? '0.5' : '1';
    }

    partnerPrevButton.addEventListener('click', () => {
        if (partnerCurrentPosition > 0) {
            partnerCurrentPosition--;
            updatePartnerSliderPosition();
        }
    });

    partnerNextButton.addEventListener('click', () => {
        if (partnerCurrentPosition < partnerSlidesCount - visibleSlides) {
            partnerCurrentPosition++;
            updatePartnerSliderPosition();
        }
    });

    // Auto slide for partner slider
    let partnerAutoSlideInterval = setInterval(() => {
        if (partnerCurrentPosition < partnerSlidesCount - visibleSlides) {
            partnerCurrentPosition++;
        } else {
            partnerCurrentPosition = 0;
        }
        updatePartnerSliderPosition();
    }, 3000);

    // Pause auto slide on hover
    partnerSlider.addEventListener('mouseenter', () => {
        clearInterval(partnerAutoSlideInterval);
    });

    partnerSlider.addEventListener('mouseleave', () => {
        partnerAutoSlideInterval = setInterval(() => {
            if (partnerCurrentPosition < partnerSlidesCount - visibleSlides) {
                partnerCurrentPosition++;
            } else {
                partnerCurrentPosition = 0;
            }
            updatePartnerSliderPosition();
        }, 3000);
    });

    // Update on window resize
    window.addEventListener('resize', updatePartnerSlider);

    // Initial setup
    updatePartnerSlider();

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const quoteRequestForm = document.getElementById('quoteRequestForm');
    if (quoteRequestForm) {
        quoteRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const insuranceType = document.getElementById('insuranceType').value;

            if (!fullName || !email || !phone || !insuranceType) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // If all validations pass
            alert('Thank you for your submission! Our team will contact you shortly with your personalized quote.');
            quoteRequestForm.reset();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider
    const slider = document.getElementById('testimonialSlider');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const dots = document.getElementById('testimonialDots').querySelectorAll('button');
    let currentIndex = 0;
    let slidesPerView = 1;
    const slidesCount = slider.children.length;
    let isAnimating = false;

    function updateSlidesPerView() {
        slidesPerView = window.innerWidth >= 768 ? 3 : 1;
        return slidesPerView;
    }

    function updateSliderStyles() {
        slider.style.transition = 'transform 0.5s ease';
        Array.from(slider.children).forEach(slide => {
            slide.style.minWidth = `${100 / slidesPerView}%`;
        });
    }

    function updateNavigation() {
        const maxIndex = Math.ceil(slidesCount / slidesPerView) - 1;
        prevButton.style.opacity = currentIndex <= 0 ? '0.5' : '1';
        prevButton.style.cursor = currentIndex <= 0 ? 'not-allowed' : 'pointer';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextButton.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }

    function updateDots() {
        const activeDotIndex = Math.floor(currentIndex * slidesPerView / slidesCount * dots.length);
        dots.forEach((dot, i) => {
            if (i === activeDotIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-primary');
            } else {
                dot.classList.remove('bg-primary');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    function goToSlide(index, smooth = true) {
        if (isAnimating) return;
        const maxIndex = Math.ceil(slidesCount / slidesPerView) - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const offset = -(currentIndex * (100 / slidesPerView));

        if (smooth) {
            isAnimating = true;
            slider.style.transition = 'transform 0.5s ease';
            requestAnimationFrame(() => {
                slider.style.transform = `translateX(${offset}%)`;
            });
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        } else {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${offset}%)`;
        }
        updateNavigation();
        updateDots();
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = Math.ceil(slidesCount / slidesPerView) - 1;
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        }
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const targetIndex = Math.floor(i * slidesCount / dots.length / slidesPerView);
            goToSlide(targetIndex);
        });
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        slider.style.transition = 'none';
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (isAnimating) return;
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        const offset = -(currentIndex * (100 / slidesPerView)) - (diff / slider.offsetWidth * 100);
        slider.style.transform = `translateX(${offset}%)`;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                const maxIndex = Math.ceil(slidesCount / slidesPerView) - 1;
                if (currentIndex < maxIndex) goToSlide(currentIndex + 1);
            } else {
                if (currentIndex > 0) goToSlide(currentIndex - 1);
            }
        } else {
            goToSlide(currentIndex);
        }
    });

    // Auto slide
    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const maxIndex = Math.ceil(slidesCount / slidesPerView) - 1;
            goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    slider.addEventListener('touchstart', stopAutoSlide);
    slider.addEventListener('touchend', startAutoSlide);

    // Initialize slider
    function initSlider() {
        updateSlidesPerView();
        updateSliderStyles();
        goToSlide(0, false);
        startAutoSlide();
    }

    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlidesPerView();
            updateSliderStyles();
            goToSlide(currentIndex, false);
        }, 100);
    });

    initSlider();

    // Initialize responsive behavior
    function updateSliderView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth >= 768) { // md breakpoint
            // On desktop, show 3 slides at once
            slider.style.transform = `translateX(0)`;
            currentIndex = 0;
            // Update dots
            dots.forEach((dot, i) => {
                if (i === 0) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-primary');
                } else {
                    dot.classList.remove('bg-primary');
                    dot.classList.add('bg-gray-300');
                }
            });
            // Update slide widths
            Array.from(slider.children).forEach(slide => {
                slide.style.minWidth = '33.333%';
            });
        } else {
            // On mobile, show 1 slide at once
            slider.style.transform = `translateX(0)`;
            currentIndex = 0;
            // Update dots
            dots.forEach((dot, i) => {
                if (i === 0) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-primary');
                } else {
                    dot.classList.remove('bg-primary');
                    dot.classList.add('bg-gray-300');
                }
            });
            // Update slide widths
            Array.from(slider.children).forEach(slide => {
                slide.style.minWidth = '100%';
            });
        }
    }

    // Initial setup
    updateSliderView();

    // Update on window resize
    window.addEventListener('resize', updateSliderView);
}); 