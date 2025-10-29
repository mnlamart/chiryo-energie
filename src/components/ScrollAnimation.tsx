import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollAnimation({ children, className = '', delay = 0 }: ScrollAnimationProps) {
  // Progressive enhancement: Content is visible by default (no-JS)
  // Animation is only an enhancement when JS is available
  const [isEnhanced, setIsEnhanced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progressive enhancement: Only apply animation if JS/IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      // No IntersectionObserver support - content stays visible (no enhancement)
      return;
    }

    if (!ref.current) return;

    setIsEnhanced(true);

    // Add hidden class initially for animation
    ref.current.classList.add('scroll-animation-pending');

    const makeVisible = () => {
      if (ref.current) {
        ref.current.classList.remove('scroll-animation-pending');
        ref.current.classList.add('scroll-animation-visible');
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            makeVisible();
          }, delay);
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    );

      observer.observe(ref.current);

    // Check if element is already in viewport
    const checkImmediate = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
        if (isInViewport) {
          setTimeout(() => {
            makeVisible();
          }, delay);
      }
      }
    };

    checkImmediate();
    const timeoutId = setTimeout(checkImmediate, 200);
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(checkImmediate);
    });

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [delay]);

  // Progressive enhancement: Content is visible by default
  // Animation classes only apply when JS enhances it
  return (
    <div
      ref={ref}
      className={className}
      style={isEnhanced ? undefined : { opacity: 1, transform: 'none' }}
    >
      {children}
    </div>
  );
}

