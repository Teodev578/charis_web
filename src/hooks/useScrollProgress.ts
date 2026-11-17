'use client';

import { useEffect, useRef, type RefObject } from 'react';

export interface UseScrollProgressOptions {
  /**
   * 'enter' : 0 à l'entrée en bas d'écran -> 1 lorsque le haut atteint le haut utile.
   * 'traverse' : 0 à l'entrée en bas d'écran -> 1 à la sortie complète par le haut.
   */
  mode?: 'enter' | 'traverse';
}

function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * Mesure la progression normalisée [0, 1] d'un élément au défilement via
 * un pipeline passif throttlé par requestAnimationFrame, sans state React.
 * Le callback applique directement les transformations GPU sur l'élément cible.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  onProgress: (progress: number, element: T) => void,
  options: UseScrollProgressOptions = {},
): RefObject<T | null> {
  const { mode = 'traverse' } = options;
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(onProgress);

  useEffect(() => {
    callbackRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    if (motionQuery?.matches) {
      callbackRef.current(1, element);
      return;
    }

    let rafId: number | null = null;
    let lastReported = -1;

    const measure = () => {
      rafId = null;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      const denominator =
        mode === 'enter'
          ? Math.max(viewportHeight * 0.85, 1)
          : Math.max(viewportHeight + rect.height, 1);

      const raw = (viewportHeight - rect.top) / denominator;
      const progress = clamp01(raw);

      if (Math.abs(progress - lastReported) > 0.0005) {
        lastReported = progress;
        callbackRef.current(progress, element);
      }
    };

    const schedule = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        callbackRef.current(1, element);
      } else {
        lastReported = -1;
        schedule();
      }
    };

    motionQuery?.addEventListener('change', handleMotionChange);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motionQuery?.removeEventListener('change', handleMotionChange);
    };
  }, [mode]);

  return ref;
}
