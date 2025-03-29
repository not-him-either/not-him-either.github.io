document.addEventListener('DOMContentLoaded', function() {
    // Initial setup with loading screen
    showLoadingScreen();
    
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
        hideLoadingScreen();
        initializeAllElements();
    }, 5000); // Force hide after 5 seconds if loading takes too long
    
    // Load necessary elements
    Promise.all([
        createConfetti(),
        createFloatingHearts(),
        preloadImages()
    ])
    .then(() => {
        // Clear the timeout since loading completed successfully
        clearTimeout(loadingTimeout);
        
        // Hide loading screen and show content
        hideLoadingScreen();
        
        // Initialize all interactive elements
        initializeAllElements();
    })
    .catch(error => {
        console.error('Error loading birthday elements:', error);
        // Show content even if there's an error
        hideLoadingScreen();
        initializeAllElements();
    });
    
    // Function to initialize all elements
    function initializeAllElements() {
        initMusicPlayer();
        initCake();
        initFlipCard();
        initSlideshow();
        initGiftBox();
        initVideoModal();
        initWishStar();
        initBalloons();
        
        // Launch initial fireworks
        setTimeout(() => {
            launchFireworks(3);
        }, 1500);
        
        // Start random surprises
        startRandomSurprises();
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

    // Loading screen management
    function showLoadingScreen() {
        // Create loading screen if it doesn't exist
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
                loadingScreen.remove();
            }, 500);
        }
    }

    // Create confetti particles
    function createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#ff1493', '#9400d3', '#00bfff', '#fff', '#ffff00', '#00ff00'];
        
        // Create 100 confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Randomize confetti properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 5;
            const rotation = Math.random() * 360;
            
            // Apply styles
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.animationDelay = `${delay}s`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            // Add different shapes
            if (Math.random() > 0.6) {
                confetti.style.borderRadius = '50%';
            } else if (Math.random() > 0.5) {
                confetti.style.transform = `rotate(45deg)`;
                confetti.style.borderRadius = '0';
            }
            
            confettiContainer.appendChild(confetti);
        }
        return Promise.resolve(); // Make it compatible with Promise.all
    }

    // Create floating hearts
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💘'];
        
        // Create 30 floating hearts
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            // Randomize heart properties
            const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            const size = Math.random() * 20 + 15;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 10;
            
            // Set heart content and styles
            heart.textContent = emoji;
            heart.style.fontSize = `${size}px`;
            heart.style.left = `${left}%`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            
            heartsContainer.appendChild(heart);
        }
        return Promise.resolve(); // Make it compatible with Promise.all
    }

    // Initialize birthday cake with candles
    function initCake() {
        const cake = document.querySelector('.cake');
        const flames = document.querySelectorAll('.flame');
        const cakeInstruction = document.querySelector('.cake-instruction');
        
        let candlesBlown = false;
        
        cake.addEventListener('click', function() {
            if (candlesBlown) return;
            
            // "Blow out" candles
            flames.forEach(flame => {
                flame.style.opacity = '0';
                setTimeout(() => {
                    flame.style.display = 'none';
                }, 300);
            });
            
            candlesBlown = true;
            cakeInstruction.textContent = "Make a wish!";
            
            // Vibrate on mobile device if supported
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            
            // Launch fireworks when candles are blown
            launchFireworks(5);
            
            // Play sound effect
            const blowSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-fairy-spark-tone-875.mp3');
            blowSound.volume = 0.4;
            blowSound.play().catch(() => {});
        });
        
        // Also allow "blowing" with microphone on mobile
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const blowThreshold = 0.2;
            let micAllowed = false;
            
            cake.addEventListener('touchstart', function() {
                if (micAllowed || candlesBlown) return;
                
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        micAllowed = true;
                        const audioContext = new AudioContext();
                        const analyser = audioContext.createAnalyser();
                        const microphone = audioContext.createMediaStreamSource(stream);
                        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
                        
                        analyser.smoothingTimeConstant = 0.8;
                        analyser.fftSize = 1024;
                        
                        microphone.connect(analyser);
                        analyser.connect(javascriptNode);
                        javascriptNode.connect(audioContext.destination);
                        
                        javascriptNode.onaudioprocess = function() {
                            if (candlesBlown) return;
                            
                            const array = new Uint8Array(analyser.frequencyBinCount);
                            analyser.getByteFrequencyData(array);
                            
                            let values = 0;
                            for (let i = 0; i < array.length; i++) {
                                values += array[i];
                            }
                            const average = values / array.length;
                            
                            // Detect loud sound like blowing
                            if (average > blowThreshold * 100) {
                                // Blow out candles
                                flames.forEach(flame => {
                                    flame.style.opacity = '0';
                                    setTimeout(() => {
                                        flame.style.display = 'none';
                                    }, 300);
                                });
                                
                                candlesBlown = true;
                                cakeInstruction.textContent = "Make a wish!";
                                launchFireworks(5);
                                
                                // Clean up audio resources
                                javascriptNode.disconnect();
                                analyser.disconnect();
                                microphone.disconnect();
                                stream.getTracks().forEach(track => track.stop());
                            }
                        };
                    })
                    .catch(() => {});
            });
        }
    }

    // Initialize flip card functionality
    function initFlipCard() {
        const flipCard = document.querySelector('.flip-card');
        
        if (flipCard) {
            flipCard.addEventListener('click', function() {
                this.classList.toggle('flipped');
                
                // Play sound effect
                const flipSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-paper-slide-1530.mp3');
                flipSound.volume = 0.3;
                flipSound.play().catch(() => {});
            });
        }
    }

    // Initialize music player
    function initMusicPlayer() {
        const musicBtn = document.querySelector('.music-toggle-btn');
        const musicStatus = document.querySelector('.music-status');
        const audio = document.getElementById('birthday-music');
        
        if (!musicBtn || !audio) return;
        
        let isPlaying = false;
        
        musicBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                musicStatus.textContent = 'Play Music';
                musicBtn.classList.remove('playing');
            } else {
                audio.play().catch(() => {
                    // Handle autoplay restrictions
                    alert('Please interact with the page first to enable music!');
                });
                musicStatus.textContent = 'Pause Music';
                musicBtn.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }

    // Initialize slideshow gallery
    function initSlideshow() {
        const slides = document.querySelectorAll('.memory-slide');
        const dots = document.querySelectorAll('.slideshow-dot');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        let currentSlideIndex = 0;
        let slideshowInterval;
        
        if (!slides.length) return;
        
        function showSlide(index) {
            // Handle index bounds
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
        
        // Reset interval
        function resetSlideInterval() {
            clearInterval(slideshowInterval);
            slideshowInterval = setInterval(() => {
                showSlide(currentSlideIndex + 1);
            }, 4000);
        }
        
        // Start slideshow
        resetSlideInterval();
        
        // Add button event listeners
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
        
        // Add dot event listeners
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                resetSlideInterval();
            });
        });
        
        // Add swipe support
        const slideContainer = document.querySelector('.slideshow-container');
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (slideContainer) {
            slideContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            slideContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchStartX - touchEndX > swipeThreshold) {
                    // Swipe left = next slide
                    showSlide(currentSlideIndex + 1);
                    resetSlideInterval();
                } else if (touchEndX - touchStartX > swipeThreshold) {
                    // Swipe right = previous slide
                    showSlide(currentSlideIndex - 1);
                    resetSlideInterval();
                }
            }
        }
    }

    // Initialize gift box functionality
    function initGiftBox() {
        const giftBox = document.querySelector('.gift-box');
        const surpriseEmojis = ['🎁', '🎂', '🎉', '🎊', '🍰', '🎈', '🎀', '✨'];
        
        giftBox.addEventListener('click', function() {
            // Open the gift box
            this.classList.add('open');
            
            // Create surprise emojis bursting from the gift
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    createSurpriseEmoji(this.getBoundingClientRect(), surpriseEmojis);
                }, i * 100);
            }
            
            // Play celebration sound if available
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
            audio.volume = 0.5;
            audio.play().catch(err => console.log('Audio autoplay prevented:', err));
        });
    }

    // Create surprise emojis that float away
    function createSurpriseEmoji(boxRect, emojis) {
        const emoji = document.createElement('div');
        emoji.className = 'surprise-emoji';
        
        // Set random emoji and position
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const centerX = boxRect.left + boxRect.width / 2;
        const centerY = boxRect.top + boxRect.height / 2;
        
        // Random position around the box center
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Set starting position
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
        
        // Set random direction
        const directionX = (Math.random() - 0.5) * 100;
        const directionY = -Math.random() * 100 - 50;
        emoji.style.setProperty('--direction-x', `${directionX}px`);
        emoji.style.setProperty('--direction-y', `${directionY}px`);
        
        // Add to DOM
        document.body.appendChild(emoji);
        
        // Remove after animation completes
        setTimeout(() => {
            emoji.remove();
        }, 4000);
    }

    // Initialize video modal
    function initVideoModal() {
        const videoBtn = document.querySelector('.birthday-video-btn');
        const videoModal = document.querySelector('.video-modal');
        const closeBtn = document.querySelector('.close-modal-btn');
        const video = document.querySelector('.video-modal video');
        
        videoBtn.addEventListener('click', function() {
            videoModal.classList.add('active');
        });
        
        closeBtn.addEventListener('click', function() {
            videoModal.classList.remove('active');
            video.pause();
        });
        
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                video.pause();
            }
        });
    }

    // Initialize wish star
    function initWishStar() {
        const wishStar = document.querySelector('.wish-star');
        
        if (!wishStar) return;
        
        wishStar.addEventListener('click', function() {
            // Animate star
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'wish-star-click 1s forwards';
            }, 10);
            
            // Launch fireworks
            launchFireworks(7);
            
            // Show wish made message
            const wishSection = document.querySelector('.make-wish-section');
            if (wishSection) {
                const message = document.createElement('p');
                message.textContent = '✨ Your wish has been made! ✨';
                message.className = 'wish-made-message animate__animated animate__fadeIn';
                wishSection.appendChild(message);
            }
            
            // Play sound effect
            const wishSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magic-glitter-sweep-2594.mp3');
            wishSound.volume = 0.4;
            wishSound.play().catch(() => {});
        });
    }

    // Initialize balloons
    function initBalloons() {
        const balloons = document.querySelectorAll('.balloon');
        
        balloons.forEach(balloon => {
            balloon.addEventListener('click', function() {
                // Pop animation
                this.textContent = '💥';
                this.style.animation = 'pop 0.5s forwards';
                
                // Reset after a while
                setTimeout(() => {
                    this.textContent = '🎈';
                    this.style.animation = 'balloon-sway 3s infinite alternate ease-in-out';
                }, 2000);
                
                // Play pop sound
                const popSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-small-pop-with-echo-2357.mp3');
                popSound.volume = 0.3;
                popSound.play().catch(() => {});
            });
        });
    }

    // Launch fireworks
    function launchFireworks(count = 5) {
        const fireworksContainer = document.querySelector('.fireworks-container');
        if (!fireworksContainer) return;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                
                // Random position
                const left = Math.random() * 100;
                const top = 50 + Math.random() * 40;
                
                firework.style.left = `${left}%`;
                firework.style.top = `${top}%`;
                
                fireworksContainer.appendChild(firework);
                
                // Create explosion
                setTimeout(() => {
                    const particleCount = 30;
                    const explosionSize = 100;
                    const colors = ['#ff1493', '#ffff00', '#00bfff', '#ff4500', '#7cfc00', '#ff00ff'];
                    
                    for (let j = 0; j < particleCount; j++) {
                        const particle = document.createElement('div');
                        particle.className = 'firework-particle';
                        
                        // Random angle and distance
                        const angle = Math.random() * Math.PI * 2;
                        const distance = Math.random() * explosionSize;
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        
                        particle.style.backgroundColor = color;
                        particle.style.boxShadow = `0 0 6px 2px ${color}`;
                        
                        // Calculate position
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        // Set animation
                        particle.style.animation = `particle-fade 1.5s forwards`;
                        particle.style.transform = `translate(${x}px, ${y}px)`;
                        
                        firework.appendChild(particle);
                    }
                    
                    // Play firework sound
                    const fireworkSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-firework-whistle-and-explosion-1694.mp3');
                    fireworkSound.volume = 0.2;
                    fireworkSound.play().catch(() => {});
                    
                    // Remove firework after animation completes
                    setTimeout(() => {
                        firework.remove();
                    }, 2000);
                    
                }, 300);
            }, i * 700);
        }
    }

    // Start random surprises
    function startRandomSurprises() {
        const surpriseEmojis = ['🎂', '🎁', '🎉', '🎊', '🍰', '🥂', '🎵'];
        const maxWidth = window.innerWidth - 50;
        const maxHeight = window.innerHeight - 50;
        
        // Create random emoji surprises periodically
        setInterval(() => {
            const emoji = document.createElement('div');
            emoji.className = 'surprise-emoji';
            emoji.textContent = surpriseEmojis[Math.floor(Math.random() * surpriseEmojis.length)];
            
            // Random position on screen
            emoji.style.left = `${Math.random() * maxWidth}px`;
            emoji.style.top = `${Math.random() * maxHeight}px`;
            
            document.body.appendChild(emoji);
            
            // Remove after animation completes
            setTimeout(() => {
                emoji.remove();
            }, 4000);
        }, 3000);
        
        // Make photos interactive
        document.querySelectorAll('.memory-photo').forEach(photo => {
            photo.addEventListener('click', function() {
                // Briefly apply a special animation
                this.style.animation = 'pulse 0.5s ease';
                
                // Create heart emoji above the clicked photo
                const rect = this.getBoundingClientRect();
                const heart = document.createElement('div');
                heart.className = 'surprise-emoji';
                heart.textContent = '💖';
                heart.style.left = `${rect.left + rect.width/2}px`;
                heart.style.top = `${rect.top}px`;
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                    this.style.animation = '';
                }, 2000);
            });
        });
    }
});
