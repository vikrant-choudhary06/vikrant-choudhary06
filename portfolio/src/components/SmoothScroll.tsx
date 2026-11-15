'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scroll: Lenis | undefined;

    const configure = () => {
      scroll?.destroy();
      scroll = undefined;
      if (preference.matches) return;
      scroll = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.085,
        wheelMultiplier: 0.9,
        syncTouch: false,
        anchors: { offset: -28, duration: 1.15 },
        stopInertiaOnNavigate: true,
      });
    };

    configure();
    preference.addEventListener('change', configure);
    return () => {
      preference.removeEventListener('change', configure);
      scroll?.destroy();
    };
  }, []);

  return null;
}
