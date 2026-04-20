import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const SmoothScroll = () => {
  useEffect(() => {
    // Enable smooth scrolling using GSAP
    window.addEventListener('wheel', (e) => {
      // Prevent default scrolling
      e.preventDefault();

      // Get current scroll position
      const currentScroll = window.scrollY;
      
      // Calculate new scroll position (delta from wheel event)
      const delta = e.deltaY || e.detail * 40; // Fallback for different browsers
      const newScroll = currentScroll + delta;

      // Animate scroll using GSAP
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: newScroll, autoKill: true },
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }, { passive: false });

    // Support for keyboard scrolling
    window.addEventListener('keydown', (e) => {
      let delta = 0;
      
      if (e.key === 'ArrowDown' || e.key === ' ') {
        delta = 100;
      } else if (e.key === 'ArrowUp') {
        delta = -100;
      } else if (e.key === 'PageDown') {
        delta = window.innerHeight;
      } else if (e.key === 'PageUp') {
        delta = -window.innerHeight;
      } else if (e.key === 'End') {
        // Scroll to bottom
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: document.documentElement.scrollHeight },
          ease: 'power2.inOut',
          overwrite: 'auto'
        });
        return;
      } else if (e.key === 'Home') {
        // Scroll to top
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: 0 },
          ease: 'power2.inOut',
          overwrite: 'auto'
        });
        return;
      }

      if (delta !== 0) {
        e.preventDefault();
        const currentScroll = window.scrollY;
        const newScroll = currentScroll + delta;

        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: newScroll, autoKill: true },
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    // Support for touchpad/trackpad scrolling
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchEndY = e.touches[0].clientY;
      const delta = touchStartY - touchEndY;

      if (Math.abs(delta) > 5) {
        e.preventDefault();
        const currentScroll = window.scrollY;
        const newScroll = currentScroll + delta * 0.5;

        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: newScroll, autoKill: true },
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }

      touchStartY = touchEndY;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', (e) => {});
      window.removeEventListener('keydown', (e) => {});
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
};

export default SmoothScroll;
