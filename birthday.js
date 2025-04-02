document.addEventListener('DOMContentLoaded', function() {
    // Initial setup with loading screen
    showLoadingScreen();
    
    // Set a timeout to prevent infinite loading (reduced from 5s to 3s)
    const loadingTimeout = setTimeout(() => {
        hideLoadingScreen();
        initializeEssentials();
    }, 3000);
    
    // Load necessary elements in order of importance
    Promise.all([
        preloadImages(),
        createReducedConfetti(),
    ])
    .then(() => {
        // Clear the timeout since loading completed successfully
        clearTimeout(loadingTimeout);
        
        // Hide loading screen and initialize essentials
        hideLoadingScreen();
        initializeEssentials();
        
        // Initialize non-essential elements with delay for better initial performance
        setTimeout(() => {
            createFloatingHearts();
            initializeRemainingElements();
            lazyLoadImages();
        }, 500);
    })
    .catch(error => {
        console.error('Error loading birthday elements:', error);
        hideLoadingScreen();
        initializeEssentials();
    });
    
    // Function to initialize essential elements first
    function initializeEssentials() {
        initMusicPlayer();
        initCake();
        initFlipCard();
        initPhotoToggle();
    }
    
    // Function to initialize remaining elements after essentials
    function initializeRemainingElements() {
        initSlideshow();
        initGiftBox();
        initWishStar();
        initBalloons();
        
        // Launch fireworks after a delay
        setTimeout(() => {
            launchFireworks(2); // Reduced from 3 for better performance
        }, 1500);
        
        // Start random surprises with reduced frequency
        startRandomSurprises();
    }

    // Preload only critical images
    function preloadImages() {
        return new Promise((resolve) => {
            const criticalImages = document.querySelectorAll('img[fetchpriority="high"]');
            if (criticalImages.length === 0) {
                resolve();
                return;
            }
            
            let loadedCount = 0;
            const totalImages = criticalImages.length;
            
            function checkAllImagesLoaded() {
                if (loadedCount === totalImages) {
                    resolve();
                }
            }
            
            criticalImages.forEach(img => {
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
            
            // Shorter safety timeout
            setTimeout(resolve, 1500);
        });
    }

    // Lazy load images
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img.lazy');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // Loading screen management with improved transitions
    function showLoadingScreen() {
        if (!document.querySelector('.loading-screen')) {
            const loadingScreen = document.createElement('div');
            loadingScreen.className = 'loading-screen';
            loadingScreen.innerHTML = `
                <div class="loading-content">
                    <div class="loading-cake">🎂</div>
                    <p>Preparing your birthday surprise...</p>
                </div>
            `;
            document.body.appendChild(loadingScreen);
        }
    }

    function hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                setTimeout(() => loadingScreen.remove(), 100);
            }, 400);
        }
    }

    // Create confetti particles with reduced count
    function createReducedConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#ff1493', '#9400d3', '#00bfff', '#fff'];
        
        // Reduce confetti pieces from 100 to 50 for better performance
        const confettiCount = 50;
        
        // Create using document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Randomize confetti properties
            const size = Math.random() * 8 + 5; // Slightly reduced size range
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 4 + 6; // Adjusted for smoother animation
            
            // Use CSS hardware acceleration with transform instead of multiple properties
            confetti.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                transform: rotate(${Math.random() * 360}deg);
                will-change: transform;
            `;
            
            // Optimize shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            fragment.appendChild(confetti);
        }
        
        confettiContainer.appendChild(fragment);
        return Promise.resolve();
    }

    // Create floating hearts with reduced count
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        const heartEmojis = ['❤️', '💖', '💕'];
        
        // Reduce heart count from 30 to 15
        const heartCount = 15;
        
        // Use document fragment
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            const size = Math.random() * 15 + 15; // Slightly reduced size
            const left = Math.random() * 100;
            const duration = Math.random() * 8 + 12; // Adjusted for smoother animation
            const delay = Math.random() * 8;
            
            heart.textContent = emoji;
            heart.style.cssText = `
                font-size: ${size}px;
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                will-change: transform;
            `;
            
            fragment.appendChild(heart);
        }
        
        heartsContainer.appendChild(fragment);
        return Promise.resolve();
    }

    // Optimized random surprises - reduced frequency
    function startRandomSurprises() {
        const surpriseEmojis = ['🎂', '🎁', '🎉', '🎊'];
        const maxWidth = window.innerWidth - 50;
        const maxHeight = window.innerHeight - 50;
        
        // Create emoji surprises less frequently (5s instead of 3s)
        const interval = setInterval(() => {
            // Skip creating surprises if page isn't visible
            if (document.hidden) return;
            
            const emoji = document.createElement('div');
            emoji.className = 'surprise-emoji';
            emoji.textContent = surpriseEmojis[Math.floor(Math.random() * surpriseEmojis.length)];
            
            emoji.style.left = `${Math.random() * maxWidth}px`;
            emoji.style.top = `${Math.random() * maxHeight}px`;
            emoji.style.willChange = 'transform, opacity';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 4000);
        }, 5000);
        
        // Clear interval when page is hidden to save resources
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && interval) {
                clearInterval(interval);
            }
        });
    }
    
    // Optimized fireworks function
    function launchFireworks(count = 2) {
        const fireworksContainer = document.querySelector('.fireworks-container');
        if (!fireworksContainer || document.hidden) return;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                
                const left = Math.random() * 100;
                const top = 50 + Math.random() * 40;
                
                firework.style.left = `${left}%`;
                firework.style.top = `${top}%`;
                firework.style.willChange = 'transform, opacity';
                
                fireworksContainer.appendChild(firework);
                
                setTimeout(() => {
                    const particleCount = 20; // Reduced particle count
                    const explosionSize = 80; // Reduced explosion size
                    const colors = ['#ff1493', '#ffff00', '#00bfff', '#ff4500'];
                    
                    for (let j = 0; j < particleCount; j++) {
                        const particle = document.createElement('div');
                        particle.className = 'firework-particle';
                        
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * explosionSize;
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        
                        particle.style.backgroundColor = color;
                        particle.style.boxShadow = `0 0 6px 2px ${color}`;
                        
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        particle.style.animation = `particle-fade 1.5s forwards`;
                        particle.style.transform = `translate(${x}px, ${y}px)`;
                        particle.style.willChange = 'transform, opacity';
                        
                        firework.appendChild(particle);
                    }
                    
                    const fireworkSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-firework-whistle-and-explosion-1694.mp3');
                    fireworkSound.volume = 0.2;
                    fireworkSound.play().catch(() => {});
                    
                    setTimeout(() => {
                        firework.remove();
                    }, 2000);
                    
                }, 300);
            }, i * 700);
        }
    }
});
