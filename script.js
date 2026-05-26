// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
  hamburger?.classList.remove('active');
  navMenu?.classList.remove('active');
  menuOverlay?.classList.remove('active');
  document.body.style.overflow = '';
}

function openMenu() {
  hamburger?.classList.add('active');
  navMenu?.classList.add('active');
  menuOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

hamburger?.addEventListener('click', () => {
  navMenu?.classList.contains('active') ? closeMenu() : openMenu();
});
menuOverlay?.addEventListener('click', closeMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));

// Swipe to close
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50 && navMenu?.classList.contains('active')) {
    closeMenu();
  }
});

// Active navigation highlight
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-nav');
    }
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Contact form
const contactForm = document.querySelector('.contact-form-3d');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('📬 Thank you for reaching out! Ruhul will respond within 24 hours.');
    contactForm.reset();
  });
}

// Scroll animations
const fadeElements = document.querySelectorAll('.experience-card, .compact-project-card, .skill-inner-card, .edu-inner-card, .award-item, .stat-card-3d, .info-card-3d');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
  observer.observe(el);
});

// Theme Toggle - Dark mode is primary (default)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

// Set initial theme to DARK (primary)
if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeIcon?.classList.replace('fa-sun', 'fa-moon');
  localStorage.setItem('theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon?.classList.replace('fa-moon', 'fa-sun');
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeIcon?.classList.replace('fa-moon', 'fa-sun');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeIcon?.classList.replace('fa-sun', 'fa-moon');
  }
});

// Scroll to Top
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn?.classList.toggle('visible', window.pageYOffset > 300);
});
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark Mode: Particle Network Animation
const darkCanvas = document.getElementById('darkCanvas');
if (darkCanvas) {
  const ctx = darkCanvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  const particleCount = 120;
  
  function resizeDarkCanvas() {
    darkCanvas.width = width;
    darkCanvas.height = height;
  }
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  }
  
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animateDark() {
    if (!darkCanvas) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateDark);
  }
  
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    resizeDarkCanvas();
    initParticles();
  });
  
  resizeDarkCanvas();
  initParticles();
  animateDark();
}

// Light Mode: Floating Bubbles Animation
const lightCanvas = document.getElementById('lightCanvas');
if (lightCanvas) {
  const lCtx = lightCanvas.getContext('2d');
  let lWidth = window.innerWidth;
  let lHeight = window.innerHeight;
  let bubbles = [];
  const bubbleCount = 40;
  
  function resizeLightCanvas() {
    lightCanvas.width = lWidth;
    lightCanvas.height = lHeight;
  }
  
  class Bubble {
    constructor() {
      this.x = Math.random() * lWidth;
      this.y = Math.random() * lHeight;
      this.radius = Math.random() * 60 + 20;
      this.speedY = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() * 360;
      this.opacity = Math.random() * 0.12 + 0.04;
    }
    update() {
      this.y -= this.speedY;
      if (this.y + this.radius < 0) {
        this.y = lHeight + this.radius;
        this.x = Math.random() * lWidth;
      }
    }
    draw() {
      lCtx.beginPath();
      lCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      lCtx.fillStyle = `hsla(${this.hue}, 75%, 65%, ${this.opacity})`;
      lCtx.fill();
      lCtx.strokeStyle = `hsla(${this.hue}, 75%, 65%, ${this.opacity + 0.03})`;
      lCtx.lineWidth = 1.5;
      lCtx.stroke();
    }
  }
  
  function initBubbles() {
    bubbles = [];
    for (let i = 0; i < bubbleCount; i++) bubbles.push(new Bubble());
  }
  
  function animateLight() {
    if (!lightCanvas) return;
    lCtx.clearRect(0, 0, lWidth, lHeight);
    bubbles.forEach(b => { b.update(); b.draw(); });
    requestAnimationFrame(animateLight);
  }
  
  window.addEventListener('resize', () => {
    lWidth = window.innerWidth;
    lHeight = window.innerHeight;
    resizeLightCanvas();
    initBubbles();
  });
  
  resizeLightCanvas();
  initBubbles();
  animateLight();
}

// Parallax effect on hero
document.addEventListener('mousemove', (e) => {
  const heroImage = document.querySelector('.profile-inner');
  if (heroImage) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    const rotateX = (mouseY - 0.5) * 10;
    const rotateY = (mouseX - 0.5) * 10;
    heroImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});