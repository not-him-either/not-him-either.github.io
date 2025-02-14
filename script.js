// Initialize EmailJS (if needed; replace with your actual EmailJS user ID)
// emailjs.init("YOUR_USER_ID");

/* Optional Countdown Timer */
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
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
  
  /* Check for Valentine's Day Theme */
  function checkValentineTheme() {
    const today = new Date();
    if (today.getMonth() === 1 && today.getDate() === 14) {
      document.body.classList.add('valentine-theme');
    }
  }
  checkValentineTheme();
  
  /* Poem Segmentation: Auto reveal stanzas on scroll */
  const stanzas = document.querySelectorAll('.segmented-poem .stanza');
  function revealStanzas() {
    stanzas.forEach(stanza => {
      const rect = stanza.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        stanza.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealStanzas);
  revealStanzas();
  
  /* Carousel Functionality */
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
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 5000);
  
  /* Sound Effects (Muted by Default) */
  const hoverSound = document.getElementById('hover-sound');
  const clickSound = document.getElementById('click-sound');
  
  function playHoverSound() {
    // Uncomment below to enable hover sound
    // hoverSound.currentTime = 0; hoverSound.play();
  }
  function playClickSound() {
    // Uncomment below to enable click sound
    // clickSound.currentTime = 0; clickSound.play();
  }
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
