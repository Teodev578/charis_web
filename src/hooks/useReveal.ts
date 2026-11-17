'use client';

import { useEffect, useRef, type RefObject } from 'react';

export interface UseRevealOptions {
  /** Fraction visible requise avant déclenchement (défaut : 0.12). */
  threshold?: number;
  /** Marge autour du viewport (défaut : '0px 0px -8% 0px'). */
  rootMargin?: string;
  /** Ne jouer la révélation qu'une seule fois (défaut : true). */
  once?: boolean;
}

/**
 * Attache un IntersectionObserver à un nœud DOM et bascule l'attribut
 * `data-visible="true"` sans provoquer de re-render React.
 * Respecte immédiatement `prefers-reduced-motion: reduce`.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions = {},
): RefObject<T | null> {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -8% 0px',
    once = true,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      element.setAttribute('data-visible', 'true');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.setAttribute('data-visible', 'true');
            if (once) {
              observer.disconnect();
              return;
            }
          } else if (!once) {
            element.setAttribute('data-visible', 'false');
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
