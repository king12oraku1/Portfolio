// ============================================
// AKINNUKAWE ISRAEL - PORTFOLIO SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate progress bars if present
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          if (width) {
            setTimeout(() => {
              bar.style.width = width + '%';
            }, 300);
          }
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in, .slide-left, .slide-right, .scale-in');
  animatedElements.forEach(el => observer.observe(el));

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.padding = '0.5rem 0';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.padding = '1rem 0';
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Typing effect for hero (if element exists)
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.getAttribute('data-text') || 'Frontend Developer';
    let i = 0;
    typingElement.textContent = '';
    
    function typeWriter() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // Counter animation for stats
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            entry.target.textContent = target + '+';
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(current) + '+';
          }
        }, 16);
        
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Form validation visual feedback
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let valid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#ef4444';
          setTimeout(() => {
            input.style.borderColor = '';
          }, 3000);
        }
      });
      
      if (!valid) {
        e.preventDefault();
      }
    });
  });

  // Parallax effect for hero shapes
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.float-shape');
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.1);
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
  });

  // Mobile menu close on click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const menuToggle = document.getElementById('navbarNav');
  
  if (menuToggle) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  console.log('Akinnukawe Israel Portfolio - Loaded Successfully');
});