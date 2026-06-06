/* ═══ VANGUARD GLOBAL TRADE — ENHANCED CORE LOGIC ═══════════════════ */

// 1. NAVIGATION & MOBILE MENU
const nav = document.getElementById('nav');
const navBg = document.getElementById('nav-bg');
const hamBtn = document.getElementById('hamBtn');
const mobMenu = document.getElementById('mobMenu');

const toggleMenu = () => {
    document.body.classList.toggle('nav-open');
    mobMenu.classList.toggle('translate-x-full');
    mobMenu.classList.toggle('translate-x-0');
}

// Mobile Products accordion
const toggleMobProducts = () => {
    const sub = document.getElementById('mobProductsSub');
    const chevron = document.getElementById('mobProductsChevron');
    if (sub && chevron) {
        sub.classList.toggle('hidden');
        chevron.style.transform = sub.classList.contains('hidden') ? '' : 'rotate(180deg)';
    }
}

if (hamBtn) hamBtn.addEventListener('click', toggleMenu);

// Close menu on link click
if (mobMenu) {
    mobMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// Scroll Effects (Nav Shadow/Background)
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        if (navBg) navBg.classList.replace('opacity-0', 'opacity-100');
        if (nav) nav.classList.add('shadow-xl', 'shadow-slate-200/50');
    } else {
        if (navBg) navBg.classList.replace('opacity-100', 'opacity-0');
        if (nav) nav.classList.remove('shadow-xl', 'shadow-slate-200/50');
    }
});


// 2. HERO CAROUSEL 
let cur = 0;
const slides = document.querySelectorAll('.hc-slide');
const track = document.getElementById('hcTrack');
const fill = document.getElementById('hcFill');
const curNum = document.getElementById('hcCur');

const updateCarousel = () => {
    if (!track) return;
    track.style.transform = `translateX(-${cur * 100}%)`;
    
    // Update Indicators
    if (curNum) curNum.innerHTML = `0${cur + 1} <span class="text-white/20 text-[10px] md:text-sm">/ 04</span>`;
    if (fill) fill.style.width = `${((cur + 1) / 4) * 100}%`;
    
    // Active Slide Class
    slides.forEach((sl, i) => {
        sl.classList.toggle('active', i === cur);
    });
}

const nS = () => {
    cur = (cur + 1) % 4;
    updateCarousel();
}

const pS = () => {
    cur = (cur - 1 + 4) % 4;
    updateCarousel();
}

// Auto Play (Simplified)
if (track) setInterval(nS, 6000);


// 3. STAT COUNTERS
const startCounters = (el) => {
    const target = +el.getAttribute('data-target');
    const count = +el.innerText;
    const speed = 200;
    const inc = target / speed;

    if (count < target) {
        el.innerText = Math.ceil(count + inc);
        setTimeout(() => startCounters(el), 1);
    } else {
        el.innerText = target;
    }
}


// 4. SCROLL REVEAL (PREMIUM) & COUNTER TRIGGERS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If it's a stats container, find and start counters
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(c => {
                if (!c.dataset.started) {
                    c.dataset.started = 'true';
                    startCounters(c);
                }
            });
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// 5. FAQ TOGGLE
const tFaq = (el) => {
    const ans = el.querySelector('.faq-ans');
    const ico = el.querySelector('.faq-ico');
    
    // Close others
    document.querySelectorAll('.faq-ans').forEach(a => {
        if (a !== ans) a.classList.add('hidden');
    });
    document.querySelectorAll('.faq-ico').forEach(i => {
        if (i !== ico) i.style.transform = 'rotate(0deg)';
    });

    // Toggle current
    const isHidden = ans.classList.contains('hidden');
    ans.classList.toggle('hidden');
    ico.style.transform = isHidden ? 'rotate(45deg)' : 'rotate(0deg)';
}


// 6. FORM SUBMISSION HANDLING (AJAX)
const handleFormSubmit = async (e, formId, successId, btnId) => {
    e.preventDefault();
    const form = document.getElementById(formId);
    const suc = document.getElementById(successId);
    const btn = document.getElementById(btnId);
    
    if (!form || !suc || !btn) return;

    // Change button text to loading state
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    try {
        const formData = new FormData(form);
        const response = await fetch('send_mail.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            form.classList.add('hidden');
            suc.classList.remove('hidden');
        } else {
            alert('Failed to send message: ' + (result.message || 'Unknown error. Please try again.'));
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.');
    } finally {
        // Restore button state
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => handleFormSubmit(e, 'inquiryForm', 'iSuc', 'inquirySubmitBtn'));
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contactForm', 'cSuc', 'contactSubmitBtn'));
}

// Dynamic Copyright Year
const yr = document.getElementById('copyright-year');
if (yr) yr.textContent = new Date().getFullYear();

