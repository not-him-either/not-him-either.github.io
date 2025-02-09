// Initialize global bgMusic and click sound functions
const bgMusic = document.getElementById('bg-music');  // FIX: define bgMusic to be used in lyric functions

// Auto-play background music when page loads
window.addEventListener('load', function() {
  try {
    bgMusic.play().catch(function(error) {
      console.log("Audio autoplay failed:", error);
    });
  } catch (e) {
    console.log("Audio play error:", e);
  }
});

function playClickSound() {
  const clickSound = document.getElementById('click-sound');
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  } else {
    console.warn("click-sound element not found");
  }
}

/* Countdown Timer */
function updateCountdown() {
  const countdownElement = document.getElementById('countdown');
  // Set Valentine's Day - February 14, 2025
  const valentineDate = new Date('February 14, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const distance = valentineDate - now;
  
  if (distance < 0) {
    countdownElement.innerHTML = "Happy Valentine's Day!";
    return;
  }
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}
setInterval(updateCountdown, 1000);

/* Photo Carousel Functionality */
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;
let currentIndex = 0;

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

function updateCarousel() {
  slides.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
}

// Auto-rotate carousel every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 5000);

/* Hidden Poem Reveal */
document.getElementById('reveal-poem').addEventListener('click', function() {
  const poemContent = document.getElementById('poem-content');
  poemContent.style.display = (poemContent.style.display === "block") ? "none" : "block";
});
document.getElementById('reveal-extra').addEventListener('click', function() {
  const extraPoem = document.getElementById('extra-poem');
  extraPoem.style.display = (extraPoem.style.display === "block") ? "none" : "block";
});

/* Interactive Map Placeholder Click */
document.getElementById('interactive-map').addEventListener('click', function() {
  alert("Imagine an interactive map here, highlighting the places where our love story began!");
});

/* Call-to-Action Buttons */
function animateFlowers() {
  const flowersContainer = document.createElement('div');
  flowersContainer.className = 'flowers-container';
  // Increased the number of flowers from 10 to 20
  for (let i = 0; i < 20; i++) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = '🌸';
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDelay = Math.random() * 2 + 's';
    flowersContainer.appendChild(flower);
  }
  document.body.appendChild(flowersContainer);
  setTimeout(() => {
    flowersContainer.remove();
  }, 5000);
}

function createFlowerPopup(x, y) {
  const popup = document.createElement('div');
  popup.className = 'flower-popup';
  popup.style.left = x + 'px';
  popup.style.top = y + 'px';
  
  // Create multiple rings
  for(let i = 0; i < 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'flower-ring';
    ring.style.animationDelay = `${i * 0.2}s`;
    popup.appendChild(ring);
  }
  
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

document.getElementById('yesBtn').addEventListener('click', function(e) {
  // Create multiple flowers around the button
  const buttonRect = this.getBoundingClientRect();
  const centerX = buttonRect.left + buttonRect.width/2;
  const centerY = buttonRect.top + buttonRect.height/2;
  
  for(let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * 20;
    const y = centerY + Math.sin(angle) * 20;
    createFlowerPopup(x, y);
  }
  
  playClickSound();
  console.log("Yes button pressed: initiating email send");
  
  // Send email using EmailJS (preserve the existing service)
  emailjs.send("service_7272v8p", "template_xpsvnyk", {
       to_name: "Princess",
       message: "I can't wait to celebrate our love and our magical journey together!"
  })
  .then(function(response) {
       console.log("SUCCESS", response.status, response.text);
  }, function(error) {
       console.log("FAILED", error);
  });
  
  // Trigger the hidden form submission (handled in email.js)
  document.getElementById("form").dispatchEvent(new Event("submit", { cancelable: true }));
  
  // Launch flowers animation
  animateFlowers();
  
  // Launch confetti fireworks animation
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
  
  // Set the countdown link with desired text.
  document.getElementById('ctaResponse').innerHTML = '<a href="countdown.html" class="celebration-link">click here darling</a>';
  
  // New code: Create animated popup originating from the yes button
  const yesBtn = this;
  const popupRect = yesBtn.getBoundingClientRect();  // Renamed from 'rect' to 'popupRect'
  const popup = document.createElement('div');
  popup.className = 'celebration-popup';
  popup.innerHTML = '<p>Flower power and surprises await!</p>';
  popup.style.position = 'fixed';
  popup.style.top = popupRect.top + popupRect.height / 2 + 'px';
  popup.style.left = popupRect.left + popupRect.width / 2 + 'px';
  popup.style.transform = 'translate(-50%, -50%) scale(0)';
  popup.style.zIndex = '3000';
  document.body.appendChild(popup);
  // Animate the popup to expand (pop effect)
  requestAnimationFrame(() => {
    popup.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    popup.style.transform = 'translate(-50%, -50%) scale(1)';
    popup.style.opacity = '1';
  });
  // After the pop, remove the popup (remove extra link addition)
  setTimeout(() => {
    popup.style.transition = 'opacity 0.3s ease-out';
    popup.style.opacity = '0';
    setTimeout(() => {
      popup.remove();
      // Removed extra link appending to preserve the existing link.
      // The link set above will remain visible.
    }, 300);
  }, 500);
  
  // Additional animation (if desired)
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
  document.getElementById('moreInfo').innerHTML = '<a href="#">Click here for your surprise date plan</a>';
  
  // After all animations, redirect to countdown page
  setTimeout(() => {
    window.location.href = 'countdown.html';
  }, 2000); // Wait 2 seconds after animations complete before redirecting
  
  // Set the link text while waiting for redirect
  document.getElementById('ctaResponse').innerHTML = '<p>Redirecting to your surprise...</p>';
});

document.getElementById('noBtn').addEventListener('click', function() {
  playClickSound();
  document.getElementById('ctaResponse').innerHTML = "Even if not today, my love remains eternal. Our moment will come.";
});

/* Smooth Scroll for Anchor Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

/* Optional: Additional micro-interactions can be added here */

// Reminder: Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, and configure EmailJS (after emailjs.init routine) with your actual details for the email service.