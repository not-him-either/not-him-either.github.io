document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles background
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#ff69b4", "#8a2be2", "#00bfff"]
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": true
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff69b4",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 250,
                        "size": 6,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Set the birthday date - April 4th of current year
    const currentYear = new Date().getFullYear();
    const birthdayDate = new Date(`March 29, ${currentYear} 15:07:00`);
    
    // If today's date is past April 4th, set to next year
    if (new Date() > birthdayDate) {
        birthdayDate.setFullYear(currentYear + 1);
    }
    
    // For testing purposes - uncomment to simulate countdown reaching zero
    // const testDate = new Date();
    // testDate.setSeconds(testDate.getSeconds() + 10);
    // birthdayDate.setTime(testDate.getTime());
    
    // Photo slider functionality
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentSlideIndex = 0;
    let slideInterval;
    
    // Initialize slider controls
    function showSlide(index) {
        // Handle index out of bounds
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlideIndex) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === currentSlideIndex) {
                dot.classList.add('active');
            }
        });
    }
    
    // Reset interval for auto-slide
    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            showSlide(currentSlideIndex + 1);
        }, 5000);
    }
    
    // Initialize auto-slide
    resetSlideInterval();
    
    // Add event listeners for slider controls
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
        resetSlideInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
        resetSlideInterval();
    });
    
    // Add click events to dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetSlideInterval();
        });
    });
    
    // Add touch swipe support for mobile
    const photoSlider = document.querySelector('.photo-slider');
    let touchStartX = 0;
    let touchEndX = 0;
    
    photoSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    photoSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left, show next slide
            showSlide(currentSlideIndex + 1);
            resetSlideInterval();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right, show previous slide
            showSlide(currentSlideIndex - 1);
            resetSlideInterval();
        }
    }
    
    // Video modal functionality
    const videoBtn = document.querySelector('.video-btn');
    const videoModal = document.querySelector('.video-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const video = document.querySelector('.video-container video');
    
    videoBtn.addEventListener('click', () => {
        videoModal.classList.add('active');
        // Pause auto-slide while watching video
        clearInterval(slideInterval);
    });
    
    closeModalBtn.addEventListener('click', () => {
        videoModal.classList.remove('active');
        // Pause video when closing modal
        video.pause();
        // Resume auto-slide
        resetSlideInterval();
    });
    
    // Close modal on click outside of content
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            video.pause();
            resetSlideInterval();
        }
    });
    
    // Update countdown timer
    function updateCountdown() {
        const now = new Date();
        const diff = birthdayDate - now;
        
        // Check if countdown has reached zero
        if (diff <= 0) {
            // Show transition overlay
            document.querySelector('.transition-overlay').classList.add('active');
            
            // Clear interval to stop countdown
            clearInterval(countdownInterval);
            
            // Wait a moment for the transition animation and then redirect
            setTimeout(() => {
                window.location.href = 'birthday.html';
            }, 3000);
            
            return;
        }
        
        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add pulse animation effect when seconds change
        const secondsElement = document.getElementById('seconds');
        secondsElement.classList.add('pulse-text');
        setTimeout(() => {
            secondsElement.classList.remove('pulse-text');
        }, 500);
    }
    
    // Initial update and start interval
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
});
