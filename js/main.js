/* Scroll Progress */
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

/* Stats Counter (if enabled later) */
const statsSection = document.querySelector('.stats-section');
const numbers = document.querySelectorAll('.stat-number');
let started = false;

function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', () => {
    if (statsSection && isInViewport(statsSection) && !started) {
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            let count = 0;
            const increment = target / 60;
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    num.innerText = Math.round(count);
                    setTimeout(updateCount, 50);
                } else {
                    num.innerText = target;
                }
            };
            updateCount();
        });
        started = true;
    }
});

/* GSAP Animations */
gsap.registerPlugin(ScrollTrigger);

gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});