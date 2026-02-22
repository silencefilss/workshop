// script.js
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const interactiveElements = document.querySelectorAll('a, button, .interactive');

if (cursor) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Lenis Smooth Scroll Setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Handle Anchor Links for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Initialization Function for animations
function initAnimations() {
    // Hero Animation
    const heroTl = gsap.timeline();

    heroTl.fromTo('.clip-text-reveal',
        { y: '100%', opacity: 0 },
        {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2
        }
    )
        .to('.hero-text', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to('.hero-cta', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to('.hero-logo-container', {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1");

    // 3D Logo Scroll Animation
    gsap.to('.hero-3d-logo', {
        rotationY: 360,
        rotationX: 15,
        rotationZ: -5,
        z: -200, rotationY: 720,
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    // Common scroll reveal elements
    const revealElements = document.querySelectorAll('.reveal-up');

    revealElements.forEach((el) => {
        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 3D Hover Effect for Cards
    const cards = document.querySelectorAll('.hover-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease-out';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // Parallax effects
    gsap.utils.toArray('.parallax-slow').forEach(layer => {
        gsap.to(layer, {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: layer,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});
