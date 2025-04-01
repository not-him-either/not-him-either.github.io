document.addEventListener('DOMContentLoaded', function() {
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
        hideLoadingScreen();
    }, 5000); // Force hide after 5 seconds if loading takes too long
    
    // Initialize page elements in order
    Promise.all([
        initParticles(),
        preloadImages()
    ])
    .then(() => {
        // Clear the timeout since loading completed successfully
        clearTimeout(loadingTimeout);
        
        // Setup countdown and page interactions
        setupCountdown();
        setupPhotoSlider();
        setupPhotoToggle();
        
        // Hide loading screen
        hideLoadingScreen();
    })
    .catch(error => {
        console.error('Error loading page elements:', error);
        // Hide loading screen even if there's an error
        hideLoadingScreen();
    });
    
    // Initialize particles background
    function initParticles() {
        return new Promise((resolve) => {
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
            // Resolve even if particlesJS is not available to prevent blocking
            setTimeout(resolve, 500);
        });
    }
    
    // Preload images for better performance
    function preloadImages() {
        return new Promise((resolve) => {
            const images = document.querySelectorAll('img');
            if (images.length === 0) {
                resolve();
                return;
            }
            
            let loadedCount = 0;
            const totalImages = images.length;
            
            function checkAllImagesLoaded() {
                if (loadedCount === totalImages) {
                    resolve();
                }
            }
            
            images.forEach(img => {
                if (img.complete) {
                    loadedCount++;
                    checkAllImagesLoaded();
                } else {
                    img.onload = () => {
                        loadedCount++;
                        checkAllImagesLoaded();
                    };
                    img.onerror = () => {
                        loadedCount++;
                        checkAllImagesLoaded();
                    };
                }
            });
            
            // Safety timeout in case some images never load
            setTimeout(resolve, 3000);
        });
    }
    
    // Setup countdown
    function setupCountdown() {
        // Set the birthday date - April 4th of current year
        const currentYear = new Date().getFullYear();
        const birthdayDate = new Date(`April 4, ${currentYear} 00:00:00`);
        
        // If today's date is past April 4th, set to next year
        if (new Date() > birthdayDate) {
            birthdayDate.setFullYear(currentYear + 1);
        }
        
        // For testing purposes - uncomment to simulate countdown reaching zero
        // const testDate = new Date();
        // testDate.setSeconds(testDate.getSeconds() + 10);
        // birthdayDate.setTime(testDate.getTime());
        
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
    }
    
    // Setup photo slider
    function setupPhotoSlider() {
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
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlideIndex - 1);
                resetSlideInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlideIndex + 1);
                resetSlideInterval();
            });
        }
        
        // Add click events to dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                resetSlideInterval();
            });
        });
        
        // Add touch swipe support for mobile
        const photoSlider = document.querySelector('.photo-slider');
        if (photoSlider) {
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
        }
    }
    
    // Setup photo toggle
    function setupPhotoToggle() {
        const toggleButtons = document.querySelectorAll('.photo-toggle-btn');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const view = this.dataset.view;
                
                // Update active button
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update app class to show real or art photos
                if (view === 'art') {
                    document.getElementById('app').classList.add('show-art');
                } else {
                    document.getElementById('app').classList.remove('show-art');
                }
                
                // Store preference in session storage
                sessionStorage.setItem('photoView', view);
            });
        });
        
        // Check for stored preference
        const storedView = sessionStorage.getItem('photoView');
        if (storedView) {
            const button = document.querySelector(`.photo-toggle-btn[data-view="${storedView}"]`);
            if (button) button.click();
        }
    }
    
    // Hide loading screen
    function hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }
});
