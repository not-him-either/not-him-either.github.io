/**
 * Gain Chain AI Website - Main JavaScript
 * Handles interactive elements, animations and effects for a futuristic AI coding assistant
 */

document.addEventListener('DOMContentLoaded', function() {
    // Make header invisible initially
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        // Fade in header after a delay
        setTimeout(() => {
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease, background-color 0.5s ease, backdrop-filter 0.5s ease, border-bottom 0.5s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 500);
        
        // Add header background on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just #
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission for access form
    const accessForm = document.getElementById('access-form');
    if (accessForm) {
        accessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = new FormData(accessForm);
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            
            // Show loading state
            const submitButton = accessForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                accessForm.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Access Request Received!</h3>
                        <p>Thank you for your interest in Gain Chain AI. We'll review your request and send you access details shortly.</p>
                    </div>
                `;
                
                // In a real implementation, you would send this data to your server:
                // fetch('your-api-endpoint', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formDataObject),
                // })
                
            }, 1500);
        });
    }
    
    // Add data-text attributes for glow effects
    document.querySelectorAll('.section-header h2').forEach(heading => {
        heading.setAttribute('data-text', heading.textContent);
    });
    
    document.querySelectorAll('.hero-title span').forEach(span => {
        span.setAttribute('data-text', span.textContent);
    });
    
    // Create code particles for the hero section
    createCodeParticles();
    
    // Create cyber grid and glitch overlay
    createCyberElements();
    
    // Add corner elements to feature cards
    addFeatureCorners();
    
    // Initialize terminal typing effect
    initTerminalTypingEffect();
    
    // Reveal animations when scrolling
    initRevealAnimations();
    
    // Add flashing elements throughout the site
    addFlashingElements();
});

/**
 * Creates floating code particles in the hero section
 */
function createCodeParticles() {
    const particlesContainer = document.getElementById('codeParticles');
    if (!particlesContainer) return;
    
    // Code snippets for particles - AI-specific code snippets
    const codeSnippets = [
        'function optimizeModel(code) {',
        'const result = await gainChain.generate(prompt);',
        'import { useAI } from "gain-chain/hooks";',
        'class GainChain implements AICodeGenerator {',
        'def train_model(self, data):',
        'public static void compileCode(String[] args) {',
        'type CodeResult = { code: string, efficiency: number };',
        'async function* streamOutput() {',
        'const model = await loadAIModel("gpt-5");',
        'for (let i = 0; i < tokens.length; i++) {',
        'if (confidence > 0.95) return suggestion;',
        '@model.learn()',
        'docker run -d -p 8080:8080 gainchain/api',
        'git commit -m "Integrate AI code optimization"',
        'npm install @gainchain/core --save',
        'console.log("Code optimized: 98% efficiency");',
        'SELECT model, accuracy FROM results WHERE confidence > 0.9;',
        '<AICodeBlock language="typescript">',
        'useEffect(() => { runAIAnalysis(code); })',
        'const [suggestions, setSuggestions] = useState<CodeFix[]>([]);'
    ];
    
    // Create twice as many particles for a more dense effect
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('span');
        particle.className = 'code-particle';
        
        // Random position, delay, and speed
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 10 + Math.random() * 30;
        
        // Set random code snippet
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        particle.textContent = randomSnippet;
        
        // Apply styles inline for particle position and animation
        particle.style.cssText = `
            left: ${left}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: 0;
            color: ${getRandomColor()};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Creates cyber grid and glitch overlay for futuristic effect
 */
function createCyberElements() {
    // Add cyber grid to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const cyberGrid = document.createElement('div');
        cyberGrid.className = 'cyber-grid';
        hero.appendChild(cyberGrid);
        
        const glitchOverlay = document.createElement('div');
        glitchOverlay.className = 'glitch-overlay';
        hero.appendChild(glitchOverlay);
    }
    
    // Add tech circuit overlay to about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        const techCircuit = document.createElement('div');
        techCircuit.className = 'tech-circuit';
        aboutImage.appendChild(techCircuit);
    }
}

/**
 * Adds corner elements to feature cards for a tech frame look
 */
function addFeatureCorners() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        const cornerPositions = ['tl', 'tr', 'bl', 'br'];
        cornerPositions.forEach(pos => {
            const corner = document.createElement('div');
            corner.className = `feature-corner corner-${pos}`;
            card.appendChild(corner);
        });
    });
}

/**
 * Returns a random neon color for elements
 */
function getRandomColor() {
    const colors = [
        'rgba(0, 247, 255, 0.8)',  // cyan
        'rgba(112, 0, 255, 0.8)',  // purple
        'rgba(58, 96, 255, 0.8)',  // blue
        'rgba(0, 255, 140, 0.8)',  // green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Initializes the typing effect in the terminal demo
 */
function initTerminalTypingEffect() {
    const typingDemo = document.getElementById('typingDemo');
    if (!typingDemo) return;
    
    // Add blinking cursor effect to code response
    const codeResponse = document.getElementById('codeResponse');
    if (codeResponse) {
        // Simulate typing code effect
        const code = codeResponse.querySelector('code');
        if (code) {
            const originalText = code.textContent;
            code.textContent = '';
            
            // Type out code with delay
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    code.textContent += originalText.charAt(charIndex);
                    charIndex++;
                    
                    // Auto-scroll as typing happens
                    codeResponse.scrollTop = codeResponse.scrollHeight;
                    
                    // Random "thinking" pauses to mimic AI processing
                    if (Math.random() > 0.95) {
                        clearInterval(typeInterval);
                        setTimeout(() => {
                            const newTypeInterval = setInterval(() => {
                                if (charIndex < originalText.length) {
                                    code.textContent += originalText.charAt(charIndex);
                                    charIndex++;
                                    codeResponse.scrollTop = codeResponse.scrollHeight;
                                } else {
                                    clearInterval(newTypeInterval);
                                    finishTypingSequence(typingDemo);
                                }
                            }, 20);
                        }, 500);
                    }
                } else {
                    clearInterval(typeInterval);
                    finishTypingSequence(typingDemo);
                }
            }, 20);
        }
    }
}

/**
 * Continues the typing demo sequence after initial code generation
 */
function finishTypingSequence(typingDemo) {
    // Show TypeScript command after code is fully typed
    setTimeout(() => {
        const commandLines = typingDemo.querySelectorAll('.command-line');
        const responses = typingDemo.querySelectorAll('.response');
        
        // Show TypeScript command
        if (commandLines.length > 1) {
            commandLines[1].style.display = 'flex';
            commandLines[1].style.opacity = '0';
            
            // Fade in with delay
            setTimeout(() => {
                commandLines[1].style.transition = 'opacity 0.5s ease';
                commandLines[1].style.opacity = '1';
            }, 100);
        }
        
        // Show "thinking" response
        if (responses.length > 1) {
            responses[1].style.display = 'block';
            
            // Simulate AI thinking animation
            const aiThinking = responses[1].querySelector('.ai-thinking');
            if (aiThinking) {
                let dots = 0;
                const thinkingInterval = setInterval(() => {
                    dots = (dots + 1) % 4;
                    aiThinking.textContent = 'Refactoring with TypeScript' + '.'.repeat(dots);
                    
                    // After a few seconds, clear the thinking animation
                    setTimeout(() => {
                        clearInterval(thinkingInterval);
                        
                        // Flash the terminal briefly to simulate processing
                        const terminal = typingDemo.closest('.terminal');
                        if (terminal) {
                            terminal.style.boxShadow = '0 0 40px rgba(0, 247, 255, 0.8)';
                            setTimeout(() => {
                                terminal.style.boxShadow = '';
                            }, 200);
                        }
                        
                        // Display TypeScript code
                        responses[1].innerHTML = `<pre><code class="language-typescript">import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

interface DarkModeToggleProps {
  defaultDark?: boolean;
  onChange?: (isDark: boolean) => void;
  appearance?: 'minimal' | 'standard' | 'glow';
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  defaultDark = false,
  onChange,
  appearance = 'standard'
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultDark);
  
  useEffect(() => {
    // Check local storage or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedMode === 'dark' || (!savedMode && prefersDark);
    
    if (shouldBeDark) {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);
  
  const toggleDarkMode = (): void => {
    const newDarkModeState = !isDarkMode;
    
    if (newDarkModeState) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'light');
    }
    
    setIsDarkMode(newDarkModeState);
    
    // Call the onChange callback if provided
    if (onChange) {
      onChange(newDarkModeState);
    }
  };

  return (
    <button 
      className={\`dark-mode-toggle \${isDarkMode ? 'dark' : 'light'} \${appearance}\`}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      data-testid="dark-mode-toggle"
    >
      <div className="toggle-track">
        <div className="toggle-indicator">
          <span className="toggle-icon">
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;</code></pre>`;
                    }, 3000);
                }, 300);
            }
        }
    }, 1000);
}

/**
 * Initialize reveal animations for elements when scrolling
 */
function initRevealAnimations() {
    // Add reveal class to elements that should animate on scroll
    const revealElements = document.querySelectorAll('.feature-card, .process-step, .team-member, .blog-card');
    
    revealElements.forEach((element, index) => {
        element.classList.add('reveal');
        // Add progressive delay based on element index
        element.style.transitionDelay = `${index * 0.1}s`;
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    // Check on initial load
    setTimeout(revealOnScroll, 300);
}

/**
 * Add flashing and animated elements throughout the site
 */
function addFlashingElements() {
    // Add occasional glitch effect to heading text
    setInterval(() => {
        const headings = document.querySelectorAll('h1, h2, h3');
        const randomHeading = headings[Math.floor(Math.random() * headings.length)];
        
        if (randomHeading) {
            randomHeading.style.textShadow = '0 0 15px rgba(0, 247, 255, 0.8)';
            
            setTimeout(() => {
                randomHeading.style.textShadow = '';
            }, 150);
        }
    }, 4000);
    
    // Add flickering effect to some icons
    const icons = document.querySelectorAll('.feature-icon');
    setInterval(() => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        if (randomIcon) {
            randomIcon.style.opacity = '0.5';
            setTimeout(() => {
                randomIcon.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                randomIcon.style.opacity = '0.7';
                setTimeout(() => {
                    randomIcon.style.opacity = '1';
                }, 100);
            }, 200);
        }
    }, 5000);
    
    // Create random data flux animations in background
    setInterval(() => {
        const body = document.body;
        const fluxElement = document.createElement('div');
        fluxElement.className = 'data-flux';
        
        const size = Math.floor(Math.random() * 100) + 50;
        const posX = Math.floor(Math.random() * window.innerWidth);
        const posY = Math.floor(Math.random() * window.innerHeight);
        
        fluxElement.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, ${getRandomColor()} 0%, transparent 70%);
            top: ${posY}px;
            left: ${posX}px;
            pointer-events: none;
            z-index: 0;
            opacity: 0;
        `;
        
        body.appendChild(fluxElement);
        
        // Animate and then remove
        setTimeout(() => {
            fluxElement.style.transition = 'opacity 1s ease';
            fluxElement.style.opacity = '0.2';
            
            setTimeout(() => {
                fluxElement.style.opacity = '0';
                setTimeout(() => {
                    body.removeChild(fluxElement);
                }, 1000);
            }, 1000);
        }, 100);
    }, 3000);

    // Add floating numbers effect for code background
    createFloatingNumbers();
}

/**
 * Creates floating binary/hexadecimal numbers in background
 */
function createFloatingNumbers() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        for (let i = 0; i < 5; i++) {
            const number = document.createElement('div');
            number.className = 'floating-number';
            
            // Generate random binary or hex code
            const isHex = Math.random() > 0.5;
            const codeText = isHex 
                ? '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
                : Array(8).fill(0).map(() => Math.round(Math.random())).join('');
                
            number.textContent = codeText;
            
            // Position randomly within the section
            const posX = Math.random() * 90 + 5; // 5-95%
            const posY = Math.random() * 70 + 15; // 15-85%
            const size = Math.random() * 1 + 0.7; // 0.7-1.7rem
            const duration = Math.random() * 10 + 20; // 20-30s
            const delay = Math.random() * 10;
            
            number.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                font-family: monospace;
                font-size: ${size}rem;
                color: ${getRandomColor()};
                opacity: 0.15;
                pointer-events: none;
                z-index: 0;
                animation: float ${duration}s infinite ${delay}s linear;
            `;
            
            section.style.position = 'relative';
            section.appendChild(number);
        }
    });
}

/**
 * Add additional CSS for dynamic elements
 */
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
        }

        .floating-number {
            will-change: transform;
        }
        
        .terminal {
            transition: box-shadow 0.3s ease;
        }
        
        .data-flux {
            will-change: opacity;
        }
        
        .feature-icon, h1, h2, h3 {
            transition: text-shadow 0.15s ease, opacity 0.15s ease;
        }
        
        .reveal {
            will-change: transform, opacity;
        }
    `;
    
    document.head.appendChild(style);
})();