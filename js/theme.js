// Theme functionality
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use the browser preference
  const savedTheme = localStorage.getItem('theme');
  let currentTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Apply the current theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update button state
  updateThemeToggleButton(currentTheme);
  
  // Add event listener to toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  // Listen for OS theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    // Only update if the user hasn't saved a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeToggleButton(newTheme);
    }
  });
}

function toggleTheme() {
  // Get the current theme
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  // Toggle the theme
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Save the new theme preference
  localStorage.setItem('theme', newTheme);
  
  // Apply the new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Update button state
  updateThemeToggleButton(newTheme);
  
  // Add animation effect on theme change
  animateThemeChange();
}

function updateThemeToggleButton(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  if (!themeToggleBtn) return;
  
  // Update button appearance based on theme
  if (theme === 'dark') {
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

function animateThemeChange() {
  // Create overlay element for transition
  const overlay = document.createElement('div');
  overlay.className = 'theme-transition-overlay';
  document.body.appendChild(overlay);
  
  // Apply styles
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  overlay.style.zIndex = '9999';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.3s ease';
  
  // Animate in
  setTimeout(() => {
    overlay.style.opacity = '1';
  }, 10);
  
  // Remove overlay after animation
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  }, 300);
}