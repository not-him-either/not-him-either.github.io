// Initialize EmailJS once with the updated public key
emailjs.init("KvcwdCEof7Q3jgzMy");

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

/* Check if Today is Valentine's Day (Feb 14) */
function checkValentineTheme() {
  const today = new Date();
  // Note: getMonth() is 0-indexed: February is 1.
  if (today.getMonth() === 1 && today.getDate() === 14) {
    document.body.classList.add('valentine-theme');
  }
}
checkValentineTheme();

/* Photo Carousel Functionality */
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;
let currentIndex = 0;

document.getElementById('nextBtn').addEventListener('click', () => {
  playClickSound();
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  playClickSound();
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
  playClickSound();
  const poemContent = document.getElementById('poem-content');
  poemContent.style.display = (poemContent.style.display === "block") ? "none" : "block";
});
document.getElementById('reveal-extra').addEventListener('click', function() {
  playClickSound();
  const extraPoem = document.getElementById('extra-poem');
  extraPoem.style.display = (extraPoem.style.display === "block") ? "none" : "block";
});

/* Interactive Map Placeholder Click */
document.getElementById('interactive-map').addEventListener('click', function() {
  playClickSound();
  alert("Imagine an interactive map here, highlighting the places where our love story began!");
});

/* Call-to-Action Buttons */
document.getElementById('yesBtn').addEventListener('click', function() {
  playClickSound();
  // Send an email using EmailJS
  emailjs.send("service_7272v8p", "template_xpsvnyk", {
       to_name: "Princess",
       message: "I can't wait to celebrate our love and our magical journey together!"
  })
  .then(function(response) {
       console.log("SUCCESS", response.status, response.text);
  }, function(error) {
       console.log("FAILED", error);
  });
  
  // Show a "Celebration!" message with animation
  document.getElementById('ctaResponse').innerHTML = "<span class='celebration'>Celebration!</span>";
  
  // Launch confetti/fireworks animation using canvas-confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
  
  // Optionally add a placeholder link for further details
  document.getElementById('moreInfo').innerHTML = '<a href="#">Click here for your surprise date plan</a>';
});

document.getElementById('noBtn').addEventListener('click', function() {
  playClickSound();
  document.getElementById('ctaResponse').innerHTML = "Even if not today, my love remains eternal. Our moment will come.";
});

/* Synchronized Lyrics Display */
const lyrics = [
  { time: 0, text: "♪ In the hush of the night, our story began ♪" },
  { time: 8, text: "♪ A gentle whisper, a spark in the dark ♪" },
  { time: 16, text: "♪ Under starlit skies, our hearts found their mark ♪" },
  { time: 24, text: "♪ Every beat, every sigh, drawing us near ♪" },
  { time: 32, text: "♪ Promises of forever, crystal clear ♪" },
  // Add additional lyrics with proper timestamps as needed
];

const bgMusic = document.getElementById('bg-music');

const syncedLyrics = [
  { start: 0, text: "I met somebody" },
  { start: 4, text: "Selfless and kind" },
  // Add each line with approximate start times in seconds
];

// Keep track of the current lyric index
let currentLyricIndex = 0;

bgMusic.addEventListener('timeupdate', () => {
  const currentTime = bgMusic.currentTime;
  // Find the next lyric that hasn't started yet
  if (currentLyricIndex < syncedLyrics.length - 1 &&
      currentTime >= syncedLyrics[currentLyricIndex + 1].start) {
    currentLyricIndex++;
  }
  // Update lyrics display with the active line
});

/* Hover and Click Sound Effects */
const hoverSound = document.getElementById('hover-sound');
const clickSound = document.getElementById('click-sound');

function playHoverSound() {
  hoverSound.currentTime = 0;
  hoverSound.play();
}

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Attach hover sounds to interactive elements (buttons, links, carousel controls)
document.querySelectorAll('button, .scroll-link, .interactive-map').forEach(el => {
  el.addEventListener('mouseenter', playHoverSound);
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
