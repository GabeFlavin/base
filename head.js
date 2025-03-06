
(function() {
  // Create and insert the loading curtain as early as possible
  function createCurtain() {
    // Add loading class to html element
    document.documentElement.classList.add('loading-active');
    
    // Create curtain element
    const curtain = document.createElement('div');
    curtain.id = 'loading-curtain';
    
    // Insert it as the first child in the body (or create body if needed)
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.insertBefore(curtain, document.body.firstChild);
      });
    } else {
      document.body.insertBefore(curtain, document.body.firstChild);
    }
  }
  
  // Function to reveal the page content and animate the curtain away
  function revealPage() {
    // Make all content visible
    document.documentElement.style.visibility = 'visible';
    
    // Small delay before starting curtain animation
    setTimeout(function() {
      const curtain = document.getElementById('loading-curtain');
      if (curtain) {
        curtain.style.height = '0';
        //curtain.style.opacity = '0';
        
        // Re-enable scrolling
        document.documentElement.classList.remove('loading-active');
        
        // Remove curtain after transition completes
        curtain.addEventListener('transitionend', function() {
          if (curtain.parentNode) {
            curtain.parentNode.removeChild(curtain);
          }
        });
      }
    }, 200);
  }
  
  // Create the curtain immediately
  createCurtain();
  
  // Set up page reveal when everything is loaded
  if (document.readyState === 'complete') {
    revealPage();
  } else {
    window.addEventListener('load', revealPage);
  }
})();