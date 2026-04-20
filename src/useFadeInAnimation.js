import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useFadeInAnimation = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      direction = 'up', // 'up', 'down', 'left', 'right', 'fade'
      duration = 1,
      delay = 0,
      ease = 'power2.out',
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false
    } = options;

    // Set initial state based on direction
    let initialProps = { opacity: 0 };
    let animateProps = { opacity: 1 };

    switch (direction) {
      case 'up':
        initialProps.y = 50;
        animateProps.y = 0;
        break;
      case 'down':
        initialProps.y = -50;
        animateProps.y = 0;
        break;
      case 'left':
        initialProps.x = 50;
        animateProps.x = 0;
        break;
      case 'right':
        initialProps.x = -50;
        animateProps.x = 0;
        break;
      case 'fade':
      default:
        // Just opacity change
        break;
    }

    // Set initial state
    gsap.set(element, initialProps);

    // Create the animation
    const animation = gsap.to(element, {
      ...animateProps,
      duration,
      ease,
      delay,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers,
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [options]);

  return elementRef;
};

export default useFadeInAnimation;