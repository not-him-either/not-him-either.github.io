document.addEventListener('DOMContentLoaded', function() {
    // Create confetti animation
    createConfetti();
    
    // Create floating hearts
    createFloatingHearts();
    
    // Gift box interaction
    initGiftBox();
    
    // Video modal functionality
    initVideoModal();
    
    // Random emoji surprises
    startRandomSurprises();
});

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

// Start random surprise animations
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
