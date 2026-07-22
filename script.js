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
    const header = document.querySelector('.header');
    const sections = ['#hero', '#estrutura', '#modalidades', '#planos', '#local'].map(id => document.querySelector(id));
    const navButtons = Array.from(document.querySelectorAll('#levelNav button'));

    let ticking = false;

    function updateScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      
      topProgress.style.width = scrolled + '%';
      railFill.style.height = scrolled + '%';

      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 40);
      }

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

      ticking = false;
    }

    // requestAnimationFrame evita reflow constante em scroll rápido
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
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

        // Update content with transition
        items.forEach(item => {
          if (item.getAttribute('data-mod') === modId) {
            item.classList.add('active');
            // Re-trigger animation
            item.style.animation = 'none';
            item.offsetHeight; // trigger reflow
            item.style.animation = '';
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
  // ============================================
  function initModBackgroundParallax() {
    const modSection = document.getElementById('modalidades');
    if (!modSection) return;

    function updateParallax() {
      const rect = modSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);
      const shift = progress * 60;
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
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            heroGrid.style.transform = `translateY(${scrollY * 0.5}px)`;
            heroGlow.style.transform = `translateY(${scrollY * 0.3}px)`;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

  // ============================================
  // HERO TEXT STAGGER ANIMATION (Enhanced)
  // ============================================
  function initHeroAnimations() {
    const heroInner = document.querySelector('.hero-inner');
    if (!heroInner) return;

    // Adicionar classe de entrada para animação de fade-up no hero
    heroInner.style.opacity = '1';

    // Efeito de revelação gradual dos elementos do hero com delay escalonado
    const heroElements = heroInner.querySelectorAll('.eyebrow, h1, .lede, .hero-actions, .hero-meta');
    heroElements.forEach((el, i) => {
      el.style.animationDelay = (0.1 + i * 0.12) + 's';
    });
  }

  // ============================================
  // BUTTON RIPPLE EFFECT (Corrigido e Completo)
  // ============================================
  function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Remover ripple anterior se existir
        const existing = this.querySelector('.ripple');
        if (existing) existing.remove();
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (x - 10) + 'px';
        ripple.style.top = (y - 10) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        this.appendChild(ripple);
        
        // Remover após animação
        ripple.addEventListener('animationend', () => {
          ripple.remove();
        });
      });
    });
  }

  // ============================================
  // CARD SPOTLIGHT (segue o cursor via CSS vars --mx/--my)
  // ============================================
  function initCardSpotlight() {
    const cards = document.querySelectorAll('.diff-card, .plan-card');
    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      }, { passive: true });
    });
  }

  // ============================================
  // HERO PARTICLES (partículas discretas geradas via JS)
  // ============================================
  function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 700) return;

    const layer = document.createElement('div');
    layer.className = 'hero-particles';
    layer.setAttribute('aria-hidden', 'true');
    hero.appendChild(layer);

    const count = 16;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      const left = Math.random() * 100;
      const delay = Math.random() * 14;
      const duration = 10 + Math.random() * 10;
      const drift = (Math.random() * 60 - 30).toFixed(0) + 'px';
      p.style.left = left + '%';
      p.style.animationDelay = delay + 's';
      p.style.animationDuration = duration + 's';
      p.style.setProperty('--drift', drift);
      layer.appendChild(p);
    }
  }

  // ============================================
  // TILT 3D EFFECT ON CARDS (mouse tracking)
  // ============================================
  function initCardTilt() {
    if (window.innerWidth < 768) return; // Desativar em mobile

    const cards = document.querySelectorAll('.diff-card, .plan-card');
    if (!cards.length) return;

    cards.forEach(card => {
      card.classList.add('tilt-active');

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6; // máximo 6 graus
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.4s var(--ease-out)';
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ============================================
  // ROSCA-DIRETA 3D MOUSE TRACKING
  // ============================================
  function initRoscaDireta3D() {
    if (window.innerWidth < 768) return; // Desativar em mobile

    const modSection = document.getElementById('modalidades');
    if (!modSection) return;

    const pseudo = modSection; // O ::before é o elemento com a imagem

    modSection.addEventListener('mousemove', (e) => {
      const rect = modSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const rotateX = y * 5; // máximo 5 graus
      const rotateY = x * -5;
      
      pseudo.style.setProperty('--rosca-rotate-x', rotateX.toFixed(2) + 'deg');
      pseudo.style.setProperty('--rosca-rotate-y', rotateY.toFixed(2) + 'deg');
      
      // Aplicar via CSS custom property para o ::before
      modSection.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      modSection.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });

    modSection.addEventListener('mouseleave', () => {
      modSection.style.setProperty('--mouse-x', '50%');
      modSection.style.setProperty('--mouse-y', '50%');
    });
  }

  // ============================================
  // MAGNETIC BUTTON EFFECT
  // ============================================
  function initMagneticButtons() {
    if (window.innerWidth < 768) return;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.classList.add('magnetic-hover');
      
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 0.3;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================
  // GYM SHOWCASE PARALLAX ON SCROLL
  // ============================================
  function initGymParallax() {
    const gymImg = document.querySelector('.gym-img');
    if (!gymImg) return;

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const rect = gymImg.parentElement.getBoundingClientRect();
        const vh = window.innerHeight;
        
        // Só animar quando visível
        if (rect.top < vh && rect.bottom > 0) {
          const progress = (vh - rect.top) / (vh + rect.height);
          const shift = (progress - 0.5) * 30; // máximo 15px cada lado
          gymImg.style.transform = `scale(1) translateY(${shift}px)`;
        }
      });
    }, { passive: true });
  }

  // ============================================
  // STAGGERED REVEAL FOR SECTION HEADINGS
  // ============================================
  function initStaggeredHeadings() {
    const headings = document.querySelectorAll('.section-head h2');
    if (!headings.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const h2 = entry.target;
          const text = h2.textContent;
          h2.innerHTML = '';
          
          // Split text into words
          const words = text.split(/\s+/);
          words.forEach((word, i) => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.whiteSpace = 'nowrap';
            span.textContent = word;
            span.style.marginRight = '0.25em';  // espaço fixo via margin em cada palavra
            span.style.opacity = '0';
            span.style.transform = 'translateY(16px)';
            span.style.transition = `opacity 0.4s var(--ease-out) ${i * 0.06}s, transform 0.4s var(--ease-out) ${i * 0.06}s`;
            h2.appendChild(span);
          });

          // Trigger animation
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              h2.querySelectorAll('span').forEach(s => {
                s.style.opacity = '1';
                s.style.transform = 'translateY(0)';
              });
            });
          });

          observer.unobserve(h2);
        }
      });
    }, { threshold: 0.3 });

    headings.forEach(h => observer.observe(h));
  }

  // ============================================
  // CTA FINAL REVEAL ON SCROLL
  // ============================================
  function initCTAReveal() {
    const ctaSection = document.querySelector('.cta-final');
    if (!ctaSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const h2 = ctaSection.querySelector('h2');
          const p = ctaSection.querySelector('p');
          const btn = ctaSection.querySelector('.btn');

          if (h2) {
            h2.style.animation = 'slideDown 0.8s ease-out both';
            h2.style.animationDelay = '0s';
          }
          if (p) {
            p.style.animation = 'slideDown 0.8s ease-out 0.2s both';
          }
          if (btn) {
            btn.style.animation = 'slideDown 0.8s ease-out 0.4s both';
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(ctaSection);
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
  // SCROLL-DRIVEN PARALLAX FOR SECTIONS
  // ============================================
  function initScrollParallax() {
    if (window.innerWidth < 768) return;

    const parallaxElements = document.querySelectorAll('.gym-showcase, .loc-map');
    
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        parallaxElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          
          if (rect.top < vh && rect.bottom > 0) {
            const scrollPercent = rect.top / vh;
            const yOffset = scrollPercent * 40;
            el.style.setProperty('--scroll-y', yOffset.toFixed(1) + 'px');
          }
        });
      });
    }, { passive: true });
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
    initCardSpotlight();
    initHeroParticles();
    // Novas animações
    initCardTilt();
    initRoscaDireta3D();
    initMagneticButtons();
    initGymParallax();
    initStaggeredHeadings();
    initCTAReveal();
    initScrollParallax();

    console.log('✓ Landing page initialized successfully');
    console.log('✓ Animações avançadas carregadas');
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
