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
document.getElementById('yesBtn').addEventListener('click', function() {
  playClickSound();
  // Send an email using EmailJS to bwires947@gmail.com
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
       to_email: "bwires947@gmail.com",
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
  document.getElementById('ctaResponse').innerHTML = "Even if not today, my love remains eternal. Our moment will come.";
});

/* Synchronized Lyrics Display */
// Fetch the external lyrics, set them into #lyrics-display, and auto-scroll as the song plays.
fetch('assets/lyrics.txt')
  .then(response => response.text())
  .then(lyricsText => {
    const allLines = lyricsText.split(/\r?\n/).map(line => line.trim());
    // Build a nested array of words for each line
    const lyricsData = allLines.map(line => line.split(' '));
    const totalWords = lyricsData.reduce((acc, words) => acc + words.length, 0);

    bgMusic.addEventListener('timeupdate', function() {
      const currentTime = bgMusic.currentTime;
      const totalDuration = bgMusic.duration;
      let wordsToHighlight = 0;
      if (totalDuration > 0) {
        wordsToHighlight = Math.floor((currentTime / totalDuration) * totalWords);
      }
      
      // Rebuild the lyrics display
      const displayLines = [];
      let wordCount = 0;
      for (let i = 0; i < lyricsData.length; i++) {
        let lineWords = [];
        for (let j = 0; j < lyricsData[i].length; j++) {
          wordCount++;
          if (wordCount === wordsToHighlight) {
            lineWords.push('<span class="highlight">' + lyricsData[i][j] + '</span>');
          } else {
            lineWords.push(lyricsData[i][j]);
          }
        }
        displayLines.push(lineWords.join(' '));
      }
      lyricsDisplay.innerHTML = displayLines.join('\n');
    });
  })
  .catch(err => console.error('Error fetching lyrics:', err));

/* Wrap the lyric highlight logic into a function so we can call it on load. */
function highlightLyrics(lyricsData, totalWords) {
  const currentTime = bgMusic.currentTime;
  const totalDuration = bgMusic.duration;
  let wordsToHighlight = 0;
  if (totalDuration > 0) {
    wordsToHighlight = Math.floor((currentTime / totalDuration) * totalWords);
  }
  const displayLines = [];
  let wordCount = 0;
  for (let i = 0; i < lyricsData.length; i++) {
    let lineWords = [];
    for (let j = 0; j < lyricsData[i].length; j++) {
      wordCount++;
      if (wordCount === wordsToHighlight) {
        lineWords.push('<span class="highlight">' + lyricsData[i][j] + '</span>');
      } else {
        lineWords.push(lyricsData[i][j]);
      }
    }
    displayLines.push(lineWords.join(' '));
  }
  lyricsDisplay.innerHTML = displayLines.join('\n');
}

/* Fetch the external lyrics and set up auto-scroll and highlighting. */
fetch('assets/lyrics.txt')
  .then(response => response.text())
  .then(lyricsText => {
    const allLines = lyricsText.split(/\r?\n/).map(line => line.trim());
    const lyricsData = allLines.map(line => line.split(' '));
    const totalWords = lyricsData.reduce((acc, words) => acc + words.length, 0);

    bgMusic.addEventListener('loadedmetadata', function() {
      bgMusic.play().catch(err => console.error('Autoplay blocked:', err));
      highlightLyrics(lyricsData, totalWords);
    });

    bgMusic.addEventListener('timeupdate', function() {
      highlightLyrics(lyricsData, totalWords);

      /* Auto-scroll in sync with currentTime. */
      const totalDuration = bgMusic.duration;
      if (totalDuration > 0) {
        const scrollRatio = bgMusic.currentTime / totalDuration;
        lyricsDisplay.scrollTop = scrollRatio * (lyricsDisplay.scrollHeight - lyricsDisplay.clientHeight);
      }
    });
  })
  .catch(err => console.error('Error fetching lyrics:', err));

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