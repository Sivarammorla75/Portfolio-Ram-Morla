// Portfolio Website JavaScript
// =============================
// Modular, well-commented JS for theme toggle, menu, form, and section logging

// DOM Elements
const body = document.body;
const navMenu = document.getElementById('nav-menu');
const burger = document.getElementById('burger');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section');

// 1. Burger Menu Toggle
burger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  burger.classList.toggle('open');
});

// Close menu on nav link click (mobile UX)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
  });
});

// 2. Smooth Scrolling for Nav Links
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70, // header height offset
        behavior: 'smooth'
      });
    }
  });
});

// 3. Scroll Reveal Animations
function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 4. Contact Form Submission
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
  contactForm.reset();
});

// 5. Section Interaction Logging
sections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    console.log(`Section viewed: ${section.id}`);
  });
});

// Accessibility: Close nav menu on outside click (mobile)
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
  }
});

// 6. Ensure video background loads and plays correctly
window.addEventListener('DOMContentLoaded', () => {
  const videoBg = document.getElementById('video-bg');
  if (videoBg) {
    // Try to play video on load (some browsers require interaction)
    videoBg.play().catch(() => {
      // If autoplay fails, show poster image only
      videoBg.style.display = 'block';
    });
    function handleThemeVideo() {
      const theme = body.getAttribute('data-theme');
      if (theme === 'dark') {
        videoBg.pause();
      } else {
        videoBg.play().catch(() => {});
      }
    }
    handleThemeVideo();
  }
});

// Typing animation for hero profession
document.addEventListener('DOMContentLoaded', () => {
  const typedText = document.getElementById('typed-text');
  if (typedText) {
    const phrases = [
      'Full Stack Developer',
      'Tech Innovator',
      'Problem Solver',
      'Lifelong Learner',
      'Open Source Contributor',
      'JavaScript Ninja',
      'React & Node.js Specialist',
      'Team Player',
      'Creative Coder',
      'Continuous Improver'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    typedText.textContent = '';
    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        typedText.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 700);
        } else {
          setTimeout(type, 40);
        }
      } else {
        charIndex++;
        typedText.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, 1200);
        } else {
          setTimeout(type, 80);
        }
      }
    }
    setTimeout(type, 800);
  }
});

// Animated skill bars on scroll
function animateSkillBars() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    if (bar.getBoundingClientRect().top < window.innerHeight - 60) {
      bar.style.width = width;
    }
  });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);

// Animate skill bars for new big-skills section
function animateBigSkillBars() {
  document.querySelectorAll('.big-skills .skill-bar-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;
  });
}
// Animate on scroll reveal or on load
if (window.IntersectionObserver) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBigSkillBars();
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
} else {
  // Fallback
  window.addEventListener('DOMContentLoaded', animateBigSkillBars);
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- GitHub Stats Animated Counters ---
(function() {
  function animateCount(el, target, duration = 1200) {
    let start = 0;
    const step = Math.ceil(target / (duration/18));
    function update() {
      start += step;
      if (start >= target) {
        el.textContent = target;
      } else {
        el.textContent = start;
        requestAnimationFrame(update);
      }
    }
    update();
  }
  function revealGitHubStats() {
    document.querySelectorAll('.github-animate').forEach(el => {
      if (!el.dataset.animated) {
        animateCount(el, parseInt(el.dataset.count,10));
        el.dataset.animated = '1';
      }
    });
  }
  // Animate when section is revealed
  const githubSection = document.getElementById('github');
  if (githubSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        revealGitHubStats();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(githubSection);
  }
})();
// --- End GitHub Stats Animated Counters ---

// --- Confetti Celebration Effect ---
const confettiCanvas = document.createElement('canvas');
confettiCanvas.id = 'confetti-canvas';
document.body.appendChild(confettiCanvas);

let confettiParticles = [];
let confettiActive = false;

function randomColor() {
  const colors = ['#00ffe7', '#ff00cc', '#ffd700', '#2965f1', '#f7df1e', '#61dafb', '#e44d26', '#3c873a'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function launchConfetti({count = 120, duration = 2200} = {}) {
  if (confettiActive) return;
  confettiActive = true;
  document.body.classList.add('confetti-active');
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiParticles = [];
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      r: 6 + Math.random() * 8,
      d: 2 + Math.random() * 2.5,
      color: randomColor(),
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0,
      tiltAngleInc: (Math.random() * 0.07) + 0.05
    });
  }
  let start = null;
  function animateConfetti(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
      p.y += p.d;
      p.tiltAngle += p.tiltAngleInc;
      p.tilt = Math.sin(p.tiltAngle) * 15;
      ctx.beginPath();
      ctx.ellipse(p.x + p.tilt, p.y, p.r, p.r * 0.4, p.tiltAngle, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (elapsed < duration) {
      requestAnimationFrame(animateConfetti);
    } else {
      document.body.classList.remove('confetti-active');
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      confettiActive = false;
    }
  }
  requestAnimationFrame(animateConfetti);
}

// Optional: trigger confetti on form submit as a demo
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    launchConfetti();
    setTimeout(() => contactForm.submit(), 1200); // Actually submit after confetti
  });
}

// Expose for manual trigger (e.g., window.launchConfetti())
window.launchConfetti = launchConfetti;
// --- End Confetti Celebration Effect ---

// --- Keyboard Navigation Shortcuts ---
// Alt+1: Home, Alt+2: About, Alt+3: Education, Alt+4: Skills, Alt+5: Projects, Alt+6: Blog, Alt+7: Contact, Alt+8: GitHub Stats
const sectionShortcuts = {
  '1': 'home',
  '2': 'about',
  '3': 'education',
  '4': 'skills',
  '5': 'projects',
  '6': 'blog',
  '7': 'contact',
  '8': 'github'
};
document.addEventListener('keydown', function(e) {
  if (e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    const key = e.key;
    if (sectionShortcuts[key]) {
      const section = document.getElementById(sectionShortcuts[key]);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({behavior: 'smooth', block: 'start'});
        section.focus && section.focus();
      }
    }
  }
});

// --- Auto-Scrolling Horizontal Cyclic Skills Carousel (Right to Left, Transparent) ---
const skillsData = [
  { name: 'HTML5', icon: 'fab fa-html5', color: '#e34c26' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572b6' },
  { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e' },
  { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#8cc84b' },
  { name: 'MongoDB', icon: 'fas fa-database', color: '#47a248' },
  { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' }
];
const track = document.querySelector('.skills-auto-carousel-track');
let autoScrollPaused = false;
function renderAutoCarousel() {
  track.innerHTML = '';
  skillsData.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'auto-carousel-skill-card';
    card.style.setProperty('--color', skill.color);
    card.innerHTML = `
      <div class="skill-icon"><i class="${skill.icon}"></i></div>
      <div class="skill-name">${skill.name}</div>
    `;
    track.appendChild(card);
  });
}
renderAutoCarousel();
// Animate scroll (right to left)
let scrollPos = 0;
let cardWidth = 0;
function updateCardWidth() {
  const card = track.querySelector('.auto-carousel-skill-card');
  cardWidth = card ? card.offsetWidth + 22 : 240; // 22px = gap
}
updateCardWidth();
window.addEventListener('resize', updateCardWidth);
function autoScroll() {
  if (!autoScrollPaused) {
    scrollPos -= 1;
    if (Math.abs(scrollPos) >= cardWidth * skillsData.length) {
      scrollPos = 0;
    }
    track.style.transform = `translateX(${scrollPos}px)`;
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);
// --- End Auto-Scrolling Horizontal Cyclic Skills Carousel ---

// --- Pause/Resume Carousel on Skill Modal ---
document.body.addEventListener('click', function(e) {
  const card = e.target.closest('.auto-carousel-skill-card');
  if (card) {
    const isActive = card.classList.toggle('active');
    autoScrollPaused = isActive;
    if (isActive) {
      card.style.animationPlayState = 'paused';
    } else {
      card.style.animationPlayState = '';
    }
  }
});
// --- End Pause/Resume Carousel on Skill Modal ---

// 7. Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = percent + '%';
});

// 9. Custom Cursor
const customCursor = document.getElementById('custom-cursor');
if (customCursor) {
  document.addEventListener('mousemove', e => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => customCursor.classList.add('active'));
  document.addEventListener('mouseup', () => customCursor.classList.remove('active'));
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
    el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
  });
}

// 4. Animated Statistics Counters
function animateStatCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    let count = 0;
    const step = Math.ceil(target / 60);
    function update() {
      count += step;
      if (count >= target) {
        el.textContent = target;
      } else {
        el.textContent = count;
        requestAnimationFrame(update);
      }
    }
    update();
  });
}
// Animate when stats section is revealed
const statsSection = document.querySelector('.stats-section');
if (window.IntersectionObserver && statsSection) {
  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      animateStatCounters();
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(statsSection);
} else {
  window.addEventListener('DOMContentLoaded', animateStatCounters);
}

// 7. Contact Form Real-Time Validation
if (contactForm) {
  const nameInput = contactForm.querySelector('input[name="name"]');
  const emailInput = contactForm.querySelector('input[name="email"]');
  const messageInput = contactForm.querySelector('textarea[name="message"]');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateName() {
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Name is required.';
      nameError.classList.add('active');
      return false;
    }
    nameError.textContent = '';
    nameError.classList.remove('active');
    return true;
  }
  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      emailError.textContent = 'Email is required.';
      emailError.classList.add('active');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(val)) {
      emailError.textContent = 'Enter a valid email address.';
      emailError.classList.add('active');
      return false;
    }
    emailError.textContent = '';
    emailError.classList.remove('active');
    return true;
  }
  function validateMessage() {
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Message is required.';
      messageError.classList.add('active');
      return false;
    }
    messageError.textContent = '';
    messageError.classList.remove('active');
    return true;
  }
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);
  contactForm.addEventListener('submit', function(e) {
    let valid = true;
    if (!validateName()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validateMessage()) valid = false;
    if (!valid) {
      e.preventDefault();
    }
  });
}
