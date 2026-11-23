'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';

export interface HeroCurtainStageProps {
  /** Contenu du Hero figé en arrière-plan (ex: <HeroSection />). */
  hero: ReactNode;
  /** Sections suivantes qui montent par-dessus le Hero tel un rideau au défilement. */
  children: ReactNode;
}

function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * HeroCurtainStage — Scène d'orchestration sticky (Curtain Reveal) de la Vitrine.
 *
 * Maintient le Hero épinglé en haut du viewport (z-0 isolé) pendant que les sections
 * éditoriales suivantes (z-10) glissent par-dessus jusqu'à le recouvrir intégralement.
 * Pilote le retrait progressif via CSS custom property (--hero-curtain-progress) sur
 * requestAnimationFrame sans aucun re-render React, et neutralise le Hero une fois
 * recouvert (inert, aria-hidden, visibility: hidden) pour préserver focus clavier et GPU.
 */
export default function HeroCurtainStage({ hero, children }: HeroCurtainStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const backdrop = backdropRef.current;
    const curtain = curtainRef.current;
    if (!stage || !backdrop || !curtain) return;

    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    let rafId: number | null = null;
    let lastProgress = -1;
    let lastCovered: boolean | null = null;

    const setCoveredState = (covered: boolean) => {
      if (lastCovered === covered) return;
      lastCovered = covered;

      backdrop.inert = covered;
      if (covered) {
        backdrop.setAttribute('data-covered', 'true');
        backdrop.setAttribute('aria-hidden', 'true');
        if (document.activeElement instanceof HTMLElement && backdrop.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      } else {
        backdrop.removeAttribute('data-covered');
        backdrop.removeAttribute('aria-hidden');
      }
    };

    const resetStage = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (lastProgress !== 0) {
        lastProgress = 0;
        stage.style.setProperty('--hero-curtain-progress', '0');
      }
      setCoveredState(false);
    };

    const update = () => {
      rafId = null;
      if (motionQuery?.matches) {
        resetStage();
        return;
      }

      const backdropHeight = Math.max(backdrop.getBoundingClientRect().height, 1);
      const curtainTop = curtain.getBoundingClientRect().top;

      // 0 au repos (le rideau démarre juste sous le Hero) -> 1 au recouvrement total
      const progress = clamp01(1 - curtainTop / backdropHeight);

      if (Math.abs(progress - lastProgress) > 0.0005) {
        lastProgress = progress;
        stage.style.setProperty('--hero-curtain-progress', progress.toFixed(4));
      }

      // Seuil de 1px pour absorber les arrondis sous-pixels lors d'un scrollIntoView vers #vision
      setCoveredState(curtainTop <= 1);
    };

    const schedule = () => {
      if (motionQuery?.matches || rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    if (motionQuery?.matches) {
      resetStage();
    } else {
      update();
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        resetStage();
      } else {
        lastProgress = -1;
        lastCovered = null;
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
  }, []);

  return (
    <div ref={stageRef} className="hero-curtain-stage">
      <div ref={backdropRef} className="hero-curtain-backdrop">
        <div className="hero-curtain-media">{hero}</div>
        <div className="hero-curtain-scrim" aria-hidden="true" />
      </div>

      <div ref={curtainRef} className="hero-curtain-sheet">
        {children}
      </div>
    </div>
  );
}
