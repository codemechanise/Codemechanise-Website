// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initTheme();
  initNavigation();
  initAnimations();
  initFormValidation();
  initWorkFilter();
  initCountAnimation();
});

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    let isValid = true;
    
    if (!name) {
      showError('name', 'Please enter your name');
      isValid = false;
    } else {
      removeError('name');
    }
    
    if (!email) {
      showError('email', 'Please enter your email');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    } else {
      removeError('email');
    }
    
    if (!subject) {
      showError('subject', 'Please enter a subject');
      isValid = false;
    } else {
      removeError('subject');
    }
    
    if (!message) {
      showError('message', 'Please enter your message');
      isValid = false;
    } else {
      removeError('message');
    }
    
    if (isValid) {
      // In a real application, you would send the form data to a server
      // For demonstration, we'll just show a success message
      contactForm.innerHTML = '<div class="success-message"><h3>Thanks for reaching out!</h3><p>We\'ve received your message and will get back to you soon.</p></div>';
    }
  });
}

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(`${inputId}-error`);
  
  input.classList.add('error');
  
  if (!errorElement) {
    const errorMsg = document.createElement('span');
    errorMsg.id = `${inputId}-error`;
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    
    input.parentNode.appendChild(errorMsg);
  } else {
    errorElement.textContent = message;
  }
}

function removeError(inputId) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(`${inputId}-error`);
  
  input.classList.remove('error');
  
  if (errorElement) {
    errorElement.remove();
  }
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Work Filter functionality
function initWorkFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');
  
  if (!filterButtons.length || !workItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Show/hide items based on filter
      workItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.classList.add('visible');
          }, 100);
        } else {
          item.classList.remove('visible');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Animate statistics counter
function initCountAnimation() {
  const stats = document.querySelectorAll('.stat-number[data-count]');
  
  if (!stats.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'), 10);
        
        // Only animate if not already animated
        if (target.textContent === '0') {
          animateCount(target, 0, countTo, 2000);
        }
        
        // Unobserve after starting animation
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => {
    observer.observe(stat);
  });
}

function animateCount(element, start, end, duration) {
  let current = start;
  const increment = end / 50; // Adjust for smoother animation
  const stepTime = Math.abs(Math.floor(duration / 50));
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current > end) {
      element.textContent = end;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}



// Add to your main.js or create a new terminal.js
document.addEventListener('DOMContentLoaded', function() {
  const terminal = document.getElementById('interactive-terminal');
  const terminalContent = terminal.querySelector('.terminal-content');
  
  // Basic terminal commands
  const commands = {
    help: () => `Available commands: about, services, work, contact, clear`,
    about: () => `CodeMechanise is a digital agency specializing in custom software solutions.`,
    services: () => `We offer: Web Design, Development, SQA, Training, Maintenance, Digital Marketing.`,
    work: () => `Check out our portfolio section for recent projects.`,
    contact: () => `Email: hello@codemechanise.com | Phone: +1 (555) 123-4567`,
    clear: () => {
      terminalContent.innerHTML = '';
      return '';
    }
  };
  
  // Handle terminal input
  terminal.addEventListener('click', function() {
    const input = prompt('Enter command (help for commands list):');
    if (input) {
      const cmd = input.toLowerCase().trim();
      const response = commands[cmd] ? commands[cmd]() : `Command not found: ${cmd}`;
      
      if (response) {
        const newLine = document.createElement('div');
        newLine.className = 'terminal-line';
        newLine.innerHTML = `<span class="prompt">$</span> ${response}`;
        terminalContent.appendChild(newLine);
      }
      
      // Add new prompt
      const promptLine = document.createElement('div');
      promptLine.className = 'terminal-line';
      promptLine.innerHTML = `<span class="prompt">$</span> <span class="cursor">█</span>`;
      terminalContent.appendChild(promptLine);
      
      // Scroll to bottom
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
});

// services
// Add to your main.js or create a new services.js
document.addEventListener('DOMContentLoaded', function() {
  const platformMenu = document.querySelector('.platform-menu');
  const portfolioGrid = document.querySelector('.portfolio-grid');
  
  // Sample project data
  const projects = {
    wix: [
      { title: "E-Commerce Store", desc: "Fully customized Wix online store" },
      { title: "Portfolio Site", desc: "Artist portfolio with gallery" },
      { title: "Restaurant Website", desc: "Menu and reservation system" }
    ],
    webflow: [
      { title: "Marketing Site", desc: "Custom animations and interactions" },
      { title: "SaaS Landing", desc: "High-conversion landing page" }
    ],
    // Add projects for other platforms...
  };
  
  // Load projects for selected platform
  function loadProjects(platform) {
    portfolioGrid.innerHTML = '';
    
    const platformProjects = projects[platform] || [];
    
    platformProjects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.className = 'portfolio-item';
      projectItem.innerHTML = `
        <div class="portfolio-info">
          <h4>${project.title}</h4>
          <p>${project.desc}</p>
          <button class="btn btn-sm btn-primary">View Project</button>
        </div>
      `;
      portfolioGrid.appendChild(projectItem);
    });
  }
  
  // Handle platform selection
  platformMenu.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
      // Update active item
      document.querySelector('.platform-menu li.active').classList.remove('active');
      e.target.classList.add('active');
      
      // Load projects
      loadProjects(e.target.dataset.platform);
    }
  });
  
  // Load initial projects
  loadProjects('wix');
});
// Service end
// Add to your animations.js or main.js
document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and contents
      tabBtns.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding content
      const tabName = this.getAttribute('data-tab');
      document.querySelector(`[data-tab-content="${tabName}"]`).classList.add('active');
    });
  });
  
  // Animate stats counting
  const statNumbers = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-count');
        const count = +entry.target.textContent;
        const increment = target / 50;
        
        if (count < target) {
          entry.target.textContent = Math.ceil(count + increment);
          setTimeout(() => {
            observer.observe(entry.target);
          }, 20);
        } else {
          entry.target.textContent = target;
        }
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(number => {
    observer.observe(number);
  });
  
  // Developer profile modal functionality
  const profileBtns = document.querySelectorAll('.btn-view-profile');
  profileBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const developerCard = this.closest('.developer-card');
      const name = developerCard.querySelector('h3').textContent;
      const role = developerCard.querySelector('.developer-role').textContent;
      const bio = developerCard.querySelector('.developer-bio').textContent;
      const image = developerCard.querySelector('img').src;
      
      // Create modal HTML
      const modalHTML = `
        <div class="developer-modal">
          <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="modal-grid">
              <div class="modal-image">
                <img src="${image}" alt="${name}">
                <div class="modal-tech">
                  ${developerCard.querySelector('.developer-tech').innerHTML}
                </div>
              </div>
              <div class="modal-info">
                <h2>${name}</h2>
                <p class="modal-role">${role}</p>
                <p class="modal-bio">${bio}</p>
                <div class="modal-skills">
                  <h4>Key Skills:</h4>
                  <div class="skills-grid">
                    <span>JavaScript</span>
                    <span>TypeScript</span>
                    <span>React</span>
                    <span>Node.js</span>
                    <span>GraphQL</span>
                  </div>
                </div>
                <button class="btn-contact">Contact ${name.split(' ')[0]}</button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add modal to body
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Add modal styles
      const style = document.createElement('style');
      style.textContent = `
        .developer-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          animation: fadeIn 0.3s ease forwards;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        .modal-content {
          background-color: var(--background-primary);
          border-radius: var(--border-radius-lg);
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          padding: var(--spacing-6);
          position: relative;
          box-shadow: var(--shadow-xl);
        }
        
        .close-modal {
          position: absolute;
          top: var(--spacing-4);
          right: var(--spacing-4);
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-secondary);
        }
        
        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--spacing-6);
        }
        
        .modal-image {
          position: relative;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          height: 300px;
        }
        
        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .modal-tech {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: var(--spacing-3);
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          gap: var(--spacing-2);
        }
        
        .modal-info h2 {
          margin-bottom: var(--spacing-2);
        }
        
        .modal-role {
          color: var(--color-secondary);
          font-weight: 600;
          margin-bottom: var(--spacing-4);
        }
        
        .modal-bio {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-4);
          line-height: 1.7;
        }
        
        .modal-skills h4 {
          margin-bottom: var(--spacing-3);
        }
        
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-2);
          margin-bottom: var(--spacing-6);
        }
        
        .skills-grid span {
          background-color: var(--background-secondary);
          padding: var(--spacing-2) var(--spacing-3);
          border-radius: var(--border-radius-full);
          font-size: 0.875rem;
        }
        
        .btn-contact {
          background-color: var(--color-secondary);
          color: var(--color-white);
          border: none;
          padding: var(--spacing-3) var(--spacing-6);
          border-radius: var(--border-radius-full);
          cursor: pointer;
          font-weight: 600;
          transition: var(--transition-base);
        }
        
        .btn-contact:hover {
          background-color: var(--color-secondary-dark);
        }
      `;
      document.head.appendChild(style);
      
      // Close modal functionality
      document.querySelector('.close-modal').addEventListener('click', function() {
        document.querySelector('.developer-modal').remove();
        style.remove();
      });
    });
  });
});
// Add this to your animations.js or main.js
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('codeCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  // Characters to show - mix of code and symbols
  const chars = "01{}();:<>[]/*+-=%~&|^!?#@$";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const rows = Math.floor(canvas.height / fontSize);
  
  // Set initial drops
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * rows);
  }
  
  // Adjust on resize
  window.addEventListener('resize', function() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });
  
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

// --- HERO SECTION CODE ANIMATION FIX ---
document.addEventListener('DOMContentLoaded', function() {
  // Remove any existing .code-background in .hero
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const oldBg = hero.querySelector('.code-background');
  if (oldBg) oldBg.remove();

  // Create new code background
  const codeBackground = document.createElement('div');
  codeBackground.className = 'code-background';

  // Generate random code lines
  const codeLines = [
    'const app = initializeApp();',
    'function processData(data) { return data.map(clean); }',
    'import { Component } from "react";',
    'console.log("Debugging information");',
    'let x = 0; while(x < 10) { x++; }',
    'export default function App() { return <Main />; }',
    'try { riskyOperation(); } catch(e) { handleError(e); }',
    'array.forEach(item => process(item));',
    '<!-- HTML comment -->',
    'div { color: #fff; padding: 1rem; }',
    'git commit -m "Initial commit"',
    'docker build -t myapp .',
    'npm install --save-dev eslint',
    'SELECT * FROM users WHERE active = true;',
    'JSON.parse(responseText);',
    'new Promise((resolve) => setTimeout(resolve, 1000));',
    'for(let i = 0; i < array.length; i++) { }',
    'margin: 0 auto;',
    'router.get("/api", handler);',
    'localStorage.setItem("key", value);'
  ];

  // Create many code lines with random delays and durations
  for (let i = 0; i < 40; i++) {
    const line = document.createElement('div');
    line.className = 'code-line';
    line.textContent = codeLines[Math.floor(Math.random() * codeLines.length)];
    line.style.position = 'absolute';
    line.style.left = `${Math.random() * 90}%`;
    line.style.width = 'max-content';
    line.style.animationDuration = `${8 + Math.random() * 8}s`;
    line.style.animationDelay = `${Math.random() * 8}s`;
    codeBackground.appendChild(line);
  }

  hero.appendChild(codeBackground);
});