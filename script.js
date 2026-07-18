// ============================================
// LANDING PAGE INTERACTIONS & ANIMATIONS
// Plataforma Fitness — Ipubi, PE
// ============================================

(function() {
  'use strict';

  // ============================================
  // SCROLL PROGRESS BAR & LEVEL RAIL
  // ============================================
  function initScrollTracking() {
    const topProgress = document.getElementById('topProgress');
    const railFill = document.getElementById('railFill');
    const sections = ['#hero', '#estrutura', '#modalidades', '#planos', '#local'].map(id => document.querySelector(id));
    const navButtons = Array.from(document.querySelectorAll('#levelNav button'));

    function updateScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      
      topProgress.style.width = scrolled + '%';
      railFill.style.height = scrolled + '%';

      // Update active nav button
      let activeIndex = 0;
      sections.forEach((sec, i) => {
        if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.5) {
          activeIndex = i;
        }
      });

      navButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === activeIndex);
        btn.setAttribute('aria-selected', i === activeIndex);
      });
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
  }

  // ============================================
  // LEVEL RAIL CLICK NAVIGATION
  // ============================================
  function initLevelNav() {
    const navButtons = document.querySelectorAll('#levelNav button');
    navButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('data-target'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ============================================
  // REVEAL ON SCROLL (Intersection Observer)
  // ============================================
  function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  }


  // ============================================
  // MODALIDADES TABS
  // ============================================
  function initModTabs() {
    const tabs = document.querySelectorAll('.mod-tab');
    const items = document.querySelectorAll('.mod-item');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {

        const modId = this.getAttribute('data-mod');
        
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Update content
        items.forEach(item => {
          if (item.getAttribute('data-mod') === modId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

      });
    });


  }

  // ============================================
  // MODALIDADES BACKGROUND FADE-IN
  // ============================================
  function initModBackgroundFade() {
    const modSection = document.getElementById('modalidades');
    if (!modSection) return;

    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          modSection.classList.add('bg-in');
        } else {
          modSection.classList.remove('bg-in');
        }
      });
    }, { threshold: 0.15 });

    bgObserver.observe(modSection);
  }

  // ============================================
  // MODALIDADES BACKGROUND PARALLAX
  // (o fundo se desloca num ritmo diferente do
  //  scroll normal, criando sensação de profundidade)
  // ============================================
  function initModBackgroundParallax() {
    const modSection = document.getElementById('modalidades');
    if (!modSection) return;

    function updateParallax() {
      const rect = modSection.getBoundingClientRect();
      const vh = window.innerHeight;
      // progresso: -1 (seção acima) .. 0 (centralizada) .. 1 (seção abaixo)
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);
      const shift = progress * 60; // deslocamento máximo em px
      modSection.style.setProperty('--mod-parallax-y', shift.toFixed(1) + 'px');
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  function initAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ============================================
  // PARALLAX EFFECT ON HERO
  // ============================================
  function initParallax() {
    const heroGrid = document.querySelector('.hero-grid');
    const heroGlow = document.querySelector('.hero-glow');
    
    if (heroGrid && heroGlow) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        heroGrid.style.transform = `translateY(${scrollY * 0.5}px)`;
        heroGlow.style.transform = `translateY(${scrollY * 0.3}px)`;
      }, { passive: true });
    }
  }

  // ============================================
  // ANIMATED COUNTERS (For stats, if needed)
  // ============================================
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }

  // ============================================
  // HERO TEXT STAGGER ANIMATION
  // ============================================
  function initHeroAnimations() {
    const eyebrow = document.querySelector('.eyebrow');
    const h1 = document.querySelector('.hero h1');
    const lede = document.querySelector('.hero p.lede');
    const actions = document.querySelector('.hero-actions');
    const meta = document.querySelector('.hero-meta');

    // Stagger animations are already in CSS, but we can enhance here if needed
    // This is just a placeholder for future enhancements
  }

  // ============================================
  // BUTTON RIPPLE EFFECT
  // ============================================
  function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.backgroundColor = 'rgba(255,255,255,0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        // Note: Add CSS animation for ripple if desired
      });
    });
  }

  // ============================================
  // MOBILE MENU (if needed in future)
  // ============================================
  function initMobileMenu() {
    // Placeholder for mobile menu functionality
  }

  // ============================================
  // LAZY LOAD IMAGES
  // ============================================
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ============================================
  // CONTACT FORM INTERACTIONS (if added later)
  // ============================================
  function initFormInteractions() {
    // Placeholder for form handling
  }

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Allow escape to close any popups (if added)
      if (e.key === 'Escape') {
        // Handle escape key
      }
    });
  }

  // ============================================
  // PERFORMANCE: THROTTLE SCROLL EVENTS
  // ============================================
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ============================================
  // ANALYTICS TRACKING (Optional)
  // ============================================
  function initTracking() {
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Log section view (can send to analytics)
          console.log('Viewed section:', entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    // Run all initializations
    initScrollTracking();
    initLevelNav();
    initRevealOnScroll();
    initModTabs();
    initAnchorLinks();
    initParallax();
    initHeroAnimations();
    initButtonRipple();
    initMobileMenu();
    initLazyLoad();
    initFormInteractions();
    initKeyboardNav();
    initTracking();
    initModBackgroundFade();
    initModBackgroundParallax();

    console.log('✓ Landing page initialized successfully');
  }

  // ============================================
  // DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================
  // EXPORT FOR EXTERNAL USE (if needed)
  // ============================================
  window.GymApp = {
    animateValue: animateValue,
    throttle: throttle
  };
})();
