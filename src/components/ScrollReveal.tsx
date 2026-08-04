'use client';

import { useEffect, useRef, useState } from 'react';

type Animation = 'fade-in-up' | 'fade-in' | 'slide-left';
type Delay = 100 | 200 | 300 | 400 | 500;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: Animation;
  delay?: Delay;
}

// Revela su contenido con la animación sutil ya definida en globals.css
// (fade/slide, sin bounce) la primera vez que entra en el viewport al hacer scroll.
export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-in-up',
  delay,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animationClass = visible
    ? `animate-${animation}${delay ? ` delay-${delay}` : ''}`
    : 'opacity-0';

  return (
    <div ref={ref} className={`${className} ${animationClass}`}>
      {children}
    </div>
  );
}
