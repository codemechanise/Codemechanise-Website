// Navigation functionality
function initNavigation() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (!mobileMenuToggle || !header) return;
  
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    header.classList.toggle('mobile-menu-open');
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (header.classList.contains('mobile-menu-open') && 
        !e.target.closest('#main-nav') && 
        !e.target.closest('.mobile-menu-toggle')) {
      header.classList.remove('mobile-menu-open');
    }
  });
  
  // Update active nav link based on scroll position
  updateActiveNavOnScroll();
  
  // Add click event listeners to nav links
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', function() {
      navLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (!sections.length || !navLinks.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -79% 0px', // Adjust based on when you want the section to be considered in view
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update navigation
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
          if (navLink.getAttribute('href') === `#${id}`) {
            navLink.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Handle case when at top of page
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('href') === '#home') {
          navLink.classList.add('active');
        }
      });
    }
  });
}

// Handle window resize events
window.addEventListener('resize', debounce(() => {
  const header = document.getElementById('main-header');
  
  // Reset mobile menu state on window resize
  if (window.innerWidth >= 768 && header && header.classList.contains('mobile-menu-open')) {
    header.classList.remove('mobile-menu-open');
  }
}, 250));

// Debounce function to limit frequency of function calls
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}