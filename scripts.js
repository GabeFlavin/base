gsap.registerPlugin(ScrollTrigger);
//gsap.registerPlugin(Draggable);

console.log('scripts.js loaded successfully v1.0.1');

/*




Navigation hide show animation when scrolled up and down




*/
const animateNavigation = () => {
    const navGlobal = document.querySelector('.nav-global');
    const navHeight = navGlobal.offsetHeight + 10;
    let lastScrollTop = 0;
    let isAnimating = false;
    const scrollThreshold = 10; // Minimum scroll distance to trigger animation
    let lastTime = 0;

    // Initial state - ensure nav is visible at the start
    gsap.set(navGlobal, {
        y: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backgroundColor: 'rgba(255, 255, 255, 0)' // Initial transparent background
    });

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
        lerp: 0.1, // Adjust the smoothness (optional)
        smoothWheel: true, // Enable smooth scrolling for mouse wheel
    });

    // Use Lenis's onScroll event instead of the native scroll event
    lenis.on('scroll', ({ scroll }) => {
        const scrollTop = scroll;
        const currentTime = Date.now();

        // Prevent multiple animations from running simultaneously
        if (isAnimating || currentTime - lastTime < 100) return;

        // Add/remove background color based on scroll position
        if (scrollTop > navHeight) {
            // Animate background color to semi-transparent white
            gsap.to(navGlobal, {
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
                duration: 0.3, // Adjust the duration for smoother transitions
                ease: 'power2.out'
            });
        } else {
            // Animate background color back to fully transparent
            gsap.to(navGlobal, {
                backgroundColor: 'rgba(255, 255, 255, 0)', // Fully transparent
                duration: 0.3, // Adjust the duration for smoother transitions
                ease: 'power2.out'
            });
        }

        // Determine scroll direction
        if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling Down - Hide Nav
                if (scrollTop > navHeight) { // Only hide if scrolled past the nav height
                    isAnimating = true;
                    gsap.to(navGlobal, {
                        y: -navHeight,
                        duration: 1,
                        ease: 'power4.in',
                        onComplete: () => {
                            isAnimating = false;
                        }
                    });
                }
            } else {
                // Scrolling Up - Show Nav
                isAnimating = true;
                gsap.to(navGlobal, {
                    y: 0,
                    duration: 1,
                    ease: 'power4.out',
                    onComplete: () => {
                        isAnimating = false;
                    }
                });
            }

            lastTime = currentTime;
            lastScrollTop = scrollTop;
        }
    });

    // RAF loop for Lenis
    const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
};

// Initialize the navigation animation
animateNavigation();