document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Play Store "Coming Soon" Toast Logic
    const playStoreBtn = document.getElementById('play-store-btn');
    const toast = document.getElementById('coming-soon-toast');
    let toastTimeout;

    if (playStoreBtn && toast) {
        playStoreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show toast
            toast.classList.add('show');

            // Clear existing timeout if multiple clicks happen
            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }

            // Hide toast after 3 seconds
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    }

    // 3. Simple Intersection Observer for scroll animations (fade in feature cards)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation start state to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease';
        observer.observe(card);
    });
});
