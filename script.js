// Vanilla JS: provide smooth scrolling, contact form handling, navbar toggle, and minimal enhancements.
// This file intentionally avoids external dependencies (no jQuery).

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            // If the href is just '#', ignore
            var href = this.getAttribute('href');
            if (!href || href === '#') return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // If navigation is open on mobile, close it
            var nav = document.getElementById('navbarNav');
            if (nav && nav.classList.contains('open')) {
                nav.classList.remove('open');
                document.getElementById('navToggler').setAttribute('aria-expanded','false');
            }
        });
    });

    // Contact form submission (vanilla JS)
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate submission - In production, replace with an actual fetch() call to an API endpoint
            alert('Thank you for your message! We\\'ll get back to you soon.');
            form.reset();
        });
    }

    // Navbar toggler for mobile
    var toggler = document.getElementById('navToggler');
    var navbarNav = document.getElementById('navbarNav');
    if (toggler && navbarNav) {
        toggler.addEventListener('click', function() {
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            navbarNav.classList.toggle('open');
        });
    }

    // Accessibility: enable keyboard control for summary elements (details/summary)
    document.querySelectorAll('summary').forEach(function(summary) {
        summary.setAttribute('tabindex', '0'); // make focusable
        summary.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Light on-scroll reveal (no jQuery)
    var cards = document.querySelectorAll('.card');
    function revealOnScroll() {
        var viewportHeight = window.innerHeight;
        var scrollTop = window.scrollY || window.pageYOffset;
        cards.forEach(function(card) {
            var rect = card.getBoundingClientRect();
            var top = rect.top + scrollTop;
            if (top < scrollTop + viewportHeight * 0.85) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    // Initial styles
    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'all 0.45s cubic-bezier(0.2,0.8,0.2,1)';
    });
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Performance: reduce unused code and keep everything minimal
});