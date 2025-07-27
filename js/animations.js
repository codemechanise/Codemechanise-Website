// Animations
function initAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  // General animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.animate-in').forEach(element => {
    animationObserver.observe(element);
  });
  
  // Service cards animation
  document.querySelectorAll('.service-card').forEach(card => {
    animationObserver.observe(card);
  });
  
  // Work items animation
  document.querySelectorAll('.work-item').forEach(item => {
    animationObserver.observe(item);
  });
  
  // Initialize AOS-like functionality
  initAOSStyle();
  
  // Parallax effect for hero section
  initParallax();
  
  // Text scramble effect for logo
  initTextScramble();
}

// AOS-like functionality (animate on scroll)
function initAOSStyle() {
  const aosElements = document.querySelectorAll('[data-aos]');
  
  if (!aosElements.length) return;
  
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const aosAnimation = element.getAttribute('data-aos');
        const aosDelay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
          // Apply animation class based on data-aos attribute
          element.classList.add('visible');
          element.style.animationName = aosAnimation;
        }, aosDelay);
        
        aosObserver.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  aosElements.forEach(element => {
    aosObserver.observe(element);
  });
}

// Parallax effect
function initParallax() {
  const heroSection = document.querySelector('.hero');
  const codeContainer = document.querySelector('.code-container');
  
  if (!heroSection || !codeContainer) return;
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const speed = 0.05;
    
    if (window.innerWidth > 768) {
      codeContainer.style.transform = `translateY(${scrollPosition * speed}px)`;
    }
  });
}

// Text scramble effect
function initTextScramble() {
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#_____';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-text">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      this.el.innerHTML = output;
      
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  
  // Initialize text scramble on logo hover
  const logoText = document.querySelector('.logo-text');
  if (logoText) {
    const originalText = logoText.textContent;
    const textScramble = new TextScramble(logoText);
    
    logoText.addEventListener('mouseenter', () => {
      textScramble.setText(originalText);
    });
  }
}

// Add smooth scroll effect for anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        const header = document.getElementById('main-header');
        if (header.classList.contains('mobile-menu-open')) {
          header.classList.remove('mobile-menu-open');
        }
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(navLink => {
          navLink.classList.remove('active');
        });
        
        this.classList.add('active');
      }
    });
  });
});

// Initialize header change on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// About Section Canvas Animation
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('codeCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Characters to show
  const chars = "01{}();:<>[]/*+-=%~&|^!?#@$";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const rows = Math.floor(canvas.height / fontSize);
  
  // Set initial drops
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * rows);
  }
  
  // Draw function
  function draw() {
    // Semi-transparent background to create trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text style
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-secondary');
    ctx.font = `${fontSize}px 'Courier New', monospace`;
    
    // Loop over drops
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const text = chars[Math.floor(Math.random() * chars.length)];
      
      // Draw character
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      // Reset drop at random intervals
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Move down
      drops[i]++;
    }
  }
  
  // Animation loop
  setInterval(draw, 33); // ~30fps
});

// Hero Section Floating Code (keep your existing implementation)
// This should be separate from the canvas animation