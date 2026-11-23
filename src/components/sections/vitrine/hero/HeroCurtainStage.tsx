'use client';

import React, { Children, useEffect, useRef, type ReactNode } from 'react';

export interface HeroCurtainStageProps {
  /** Contenu du Hero figé en premier plan de la pile (ex: <HeroSection />). */
  hero: ReactNode;
  /** Sections suivantes qui s'empilent successivement par-dessus au défilement. */
  children: ReactNode;
}

function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * HeroCurtainStage — Scène d'orchestration « Stacking Website Sections » de la Vitrine.
 *
 * Épingle chaque section en `position: sticky` (calcul dynamique de `top` si une section
 * dépasse 100dvh via ResizeObserver), anime le retrait en profondeur de la carte recouverte
 * via `--hero-curtain-progress` sur `requestAnimationFrame` sans re-render React, redirige
 * la navigation par ancres (#id) vers des sentinelles de flux normal et neutralise toute
 * carte 100 % masquée (`inert`, `aria-hidden`, `data-covered`).
 */
export default function HeroCurtainStage({ hero, children }: HeroCurtainStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const panels = [hero, ...Children.toArray(children)];
  const panelCount = panels.length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    let rafId: number | null = null;
    const lastProgress = new Array<number>(panelCount).fill(-1);
    const lastCovered = new Array<boolean | null>(panelCount).fill(null);

    const setCoveredState = (index: number, covered: boolean) => {
      if (lastCovered[index] === covered) return;
      lastCovered[index] = covered;

      const panel = panelRefs.current[index];
      if (!panel) return;

      panel.inert = covered;
      if (covered) {
        panel.setAttribute('data-covered', 'true');
        panel.setAttribute('aria-hidden', 'true');
        if (document.activeElement instanceof HTMLElement && panel.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      } else {
        panel.removeAttribute('data-covered');
        panel.removeAttribute('aria-hidden');
      }
    };

    const syncStickyOffsets = () => {
      const vh = Math.max(window.innerHeight, 1);
      const reduced = Boolean(motionQuery?.matches);

      for (let i = 0; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        if (!panel) continue;
        if (reduced) {
          panel.style.top = '0px';
          continue;
        }
        const stickyTop = panel.offsetHeight > vh ? vh - panel.offsetHeight : 0;
        panel.style.top = `${stickyTop}px`;
      }
    };

    const resetStage = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }

      stage.style.setProperty('--hero-curtain-progress', '0');

      for (let i = 0; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        if (panel && lastProgress[i] !== 0) {
          lastProgress[i] = 0;
          panel.style.setProperty('--hero-curtain-progress', '0');
        }
        setCoveredState(i, false);
      }

      syncStickyOffsets();
    };

    const update = () => {
      rafId = null;
      if (motionQuery?.matches) {
        resetStage();
        return;
      }

      const vh = Math.max(window.innerHeight, 1);

      for (let i = 0; i < panelCount - 1; i++) {
        const panel = panelRefs.current[i];
        const nextSentinel = sentinelRefs.current[i + 1];
        if (!panel || !nextSentinel) continue;

        const nextTop = nextSentinel.getBoundingClientRect().top;
        // 0 au repos (la section suivante démarre sous le viewport) -> 1 au recouvrement total
        const progress = clamp01(1 - nextTop / vh);

        if (Math.abs(progress - lastProgress[i]) > 0.0005) {
          lastProgress[i] = progress;
          const formatted = progress.toFixed(4);
          panel.style.setProperty('--hero-curtain-progress', formatted);
          if (i === 0) {
            stage.style.setProperty('--hero-curtain-progress', formatted);
          }
        }

        // Seuil de 1px pour absorber les arrondis sous-pixels lors d'un scrollIntoView
        setCoveredState(i, nextTop <= 1);
      }

      if (panelCount > 0) {
        setCoveredState(panelCount - 1, false);
      }
    };

    const schedule = () => {
      if (motionQuery?.matches || rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    const idToSentinel = new Map<string, HTMLDivElement>();
    const restoreScrollOverrides: Array<() => void> = [];

    for (let i = 0; i < panelCount; i++) {
      const panel = panelRefs.current[i];
      const sentinel = sentinelRefs.current[i];
      if (!panel || !sentinel) continue;

      const sectionEl = panel.querySelector<HTMLElement>('section[id]');
      if (sectionEl && sectionEl.id) {
        idToSentinel.set(sectionEl.id, sentinel);

        const hadOwnScrollIntoView = Object.prototype.hasOwnProperty.call(sectionEl, 'scrollIntoView');
        const previousScrollIntoView = sectionEl.scrollIntoView;
        sectionEl.scrollIntoView = (arg?: boolean | ScrollIntoViewOptions) => {
          sentinel.scrollIntoView(arg);
        };

        restoreScrollOverrides.push(() => {
          if (hadOwnScrollIntoView) {
            sectionEl.scrollIntoView = previousScrollIntoView;
          } else {
            delete (sectionEl as { scrollIntoView?: typeof sectionEl.scrollIntoView }).scrollIntoView;
          }
        });
      }
    }

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash.length <= 1) return;

      const sentinel = idToSentinel.get(hash.slice(1));
      if (!sentinel) return;

      event.preventDefault();
      sentinel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleResize = () => {
      syncStickyOffsets();
      schedule();
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        syncStickyOffsets();
        schedule();
      });
      for (let i = 0; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        if (panel) resizeObserver.observe(panel);
      }
    }

    syncStickyOffsets();

    if (motionQuery?.matches) {
      resetStage();
    } else {
      update();
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        resetStage();
      } else {
        lastProgress.fill(-1);
        lastCovered.fill(null);
        syncStickyOffsets();
        schedule();
      }
    };

    motionQuery?.addEventListener('change', handleMotionChange);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleAnchorClick);
      motionQuery?.removeEventListener('change', handleMotionChange);
      resizeObserver?.disconnect();
      for (const restore of restoreScrollOverrides) {
        restore();
      }
    };
  }, [panelCount]);

  return (
    <div ref={stageRef} className="hero-curtain-stage">
      {panels.map((panelNode, index) => (
        <React.Fragment key={index}>
          <div
            ref={(el) => {
              sentinelRefs.current[index] = el;
            }}
            className="hero-stack-sentinel"
            aria-hidden="true"
          />
          <div
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            data-stack-index={index}
            className={`hero-curtain-backdrop hero-stack-panel ${
              index > 0 ? 'hero-curtain-sheet hero-stack-card' : ''
            }`}
            style={{ zIndex: index + 1 }}
          >
            <div className="hero-curtain-media hero-stack-media">{panelNode}</div>
            {index < panelCount - 1 && (
              <div className="hero-curtain-scrim hero-stack-scrim" aria-hidden="true" />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
