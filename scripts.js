gsap.registerPlugin(ScrollTrigger);
//gsap.registerPlugin(Draggable);

console.log('scripts.js loaded');

/*



Navigation hide show animation when scrolled up and down




*/
const animateNavigation = () => {
    const navGlobal = document.querySelector('.nav-global');
    const navHeight = navGlobal.offsetHeight + 10;
    let lastScrollTop = 0;
    let isAnimating = false;
  
    // Initial state - ensure nav is visible at the start
    gsap.set(navGlobal, {
      y: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900
    });
  
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
        // Don't trigger if we're at the very top of the page
        if (scrollTop < navHeight) {
          gsap.to(navGlobal, {
            y: 0,
            duration: 1.2,
            ease: 'power4.out'
          });
          lastScrollTop = scrollTop;
          return;
        }
  
        // Prevent multiple animations from running simultaneously
        if (isAnimating) return;
  
        if (scrollTop > lastScrollTop) {
          // Scrolling Down - Hide Nav
          isAnimating = true;
          gsap.to(navGlobal, {
            y: -navHeight,
            duration: 0.9,
            ease: 'power4.out',
            onComplete: () => {
              isAnimating = false;
            }
          });
  
        } else {
          // Scrolling Up - Show Nav
          isAnimating = true;
          gsap.to(navGlobal, {
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
            onComplete: () => {
              isAnimating = false;
            }
          });
        }
  
        lastScrollTop = scrollTop;
      }
    });
  };
  
  // Initialize the navigation animation
  animateNavigation();