'use client';

import React, { Children, useEffect, useRef, type ReactNode } from 'react';

export interface HeroCurtainStageProps {
  /** Contenu du Hero figé en premier plan de la pile (ex: <HeroSection />). */
  hero: ReactNode;
  /** Sections suivantes qui s'empilent successivement par-dessus au défilement. */
  children: ReactNode;
}

export interface VitrineSectionHeaderProps {
  /** Numéro de lame à deux chiffres (ex: "01", "02"). */
  index: string;
  /** Titre principal de la section affiché en capitales condensées. */
  title: string;
  /** Sous-étiquette éditoriale affichée entre crochets sous le bandeau. */
  tag: string;
  /** Courte accroche placée dans la colonne droite du bandeau. */
  description: string;
  /** Identifiant HTML de la section cible pour le défilement au clic. */
  sectionId: string;
  /** Palette de surface alignée sur la section parente. */
  theme?: 'paper' | 'white' | 'ink';
}

const HEADER_THEMES = {
  paper: {
    surface: 'bg-[#f2f2f2]',
    text: 'text-[#111111]',
    description: 'text-[#111111]/75',
    border: 'border-t border-[#111111]/25',
    tag: 'text-[#6C288B]',
  },
  white: {
    surface: 'bg-white',
    text: 'text-[#111111]',
    description: 'text-[#111111]/75',
    border: 'border-t border-[#111111]/25',
    tag: 'text-[#6C288B]',
  },
  ink: {
    surface: 'bg-[#111111]',
    text: 'text-[#f2f2f2]',
    description: 'text-[#f2f2f2]/75',
    border: 'border-t border-white/25',
    tag: 'text-[#fc7d42]',
  },
} as const;

/**
 * Bandeau éditorial numéroté (01–06) collant en tête de section Vitrine.
 * Reste visible en lame empilée sous VitrineHeader et ramène à la section au clic.
 */
export function VitrineSectionHeader({
  index,
  title,
  tag,
  description,
  sectionId,
  theme = 'paper',
}: VitrineSectionHeaderProps) {
  const palette = HEADER_THEMES[theme];

  const scrollToSection = () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection();
    }
  };

  return (
    <>
      <div
        data-stack-header="true"
        role="button"
        tabIndex={0}
        onClick={scrollToSection}
        onKeyDown={handleKeyDown}
        aria-label={`Aller à la section ${index} ${title}`}
        className={`vitrine-stack-header ${palette.surface} ${palette.border} ${palette.text}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-3.5 lg:pt-4 pb-4 sm:pb-6">
          <div className="grid grid-cols-12 items-start gap-x-4 sm:gap-x-6 gap-y-2">
            <div className="col-span-2 font-jakarta font-extrabold text-[2.1rem] sm:text-[3rem] lg:text-[4.1rem] leading-[0.86] tracking-[-0.04em] tabular-nums select-none">
              {index}
            </div>
            <h2 className="col-span-10 sm:col-span-6 font-jakarta font-extrabold uppercase text-[2.1rem] sm:text-[3rem] lg:text-[4.1rem] leading-[0.86] tracking-[-0.04em] m-0">
              {title}
            </h2>
            <p className={`col-span-12 sm:col-span-4 text-xs sm:text-[13px] leading-[1.35] sm:pt-0.5 m-0 ${palette.description}`}>
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 mb-8 sm:mb-10 w-full relative z-10">
        <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6">
          <div className={`col-span-12 sm:col-start-3 sm:col-span-10 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] ${palette.tag}`}>
            [ {tag} ]
          </div>
        </div>
      </div>
    </>
  );
}

function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * HeroCurtainStage — Scène d'orchestration « Stacking Website Sections » de la Vitrine.
 *
 * Recouvre intégralement le Hero en sortie, puis empile les sections éditoriales 01–06
 * en lames numérotées sous le VitrineHeader fixe via `--panel-pin-top` et ResizeObserver,
 * tout en préservant la navigation par ancres (#id) grâce aux sentinelles hors sticky.
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
    const pinTops = new Array<number>(panelCount).fill(0);
    const lastProgress = new Array<number>(panelCount).fill(-1);
    const lastCovered = new Array<boolean | null>(panelCount).fill(null);

    const setCoveredState = (index: number, covered: boolean) => {
      if (lastCovered[index] === covered) return;
      lastCovered[index] = covered;

      const panel = panelRefs.current[index];
      if (!panel) return;

      if (index === 0) {
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
        return;
      }

      if (covered) {
        panel.setAttribute('data-stacked', 'true');
      } else {
        panel.removeAttribute('data-stacked');
      }

      const bodyEl = panel.querySelector<HTMLElement>('.vitrine-stack-body');
      if (bodyEl) {
        bodyEl.inert = covered;
        if (covered && document.activeElement instanceof HTMLElement && bodyEl.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }
    };

    const syncStickyOffsets = () => {
      const vh = Math.max(window.innerHeight, 1);
      const reduced = Boolean(motionQuery?.matches);
      const headerEl = document.querySelector<HTMLElement>('header');
      const headerOffset = headerEl ? headerEl.offsetHeight : 65;
      const rawStep = window.innerWidth < 640 ? 34 : window.innerWidth < 1024 ? 45 : 56;
      const maxStackBudget = Math.floor((vh * 0.38) / Math.max(panelCount - 2, 1));
      const stripStep = Math.max(28, Math.min(rawStep, maxStackBudget));

      for (let i = 0; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        const sentinel = sentinelRefs.current[i];
        const pinTop = i === 0 ? 0 : headerOffset + (i - 1) * stripStep;
        pinTops[i] = reduced ? 0 : pinTop;

        if (sentinel) {
          sentinel.style.scrollMarginTop = `${pinTops[i]}px`;
        }
        if (!panel) continue;

        panel.style.setProperty('--panel-pin-top', `${pinTops[i]}px`);

        if (reduced) {
          panel.style.top = '0px';
          continue;
        }

        const availableHeight = Math.max(vh - pinTop, 1);
        const stickyTop = panel.offsetHeight > availableHeight ? vh - panel.offsetHeight : pinTop;
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
        const targetTop = pinTops[i + 1];
        const travel = Math.max(vh - targetTop, 1);
        const progress = clamp01((vh - nextTop) / travel);

        if (Math.abs(progress - lastProgress[i]) > 0.0005) {
          lastProgress[i] = progress;
          const formatted = progress.toFixed(4);
          panel.style.setProperty('--hero-curtain-progress', formatted);
          if (i === 0) {
            stage.style.setProperty('--hero-curtain-progress', formatted);
          }
        }

        setCoveredState(i, nextTop <= targetTop + 1);
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
            {index === 0 && (
              <div className="hero-curtain-scrim hero-stack-scrim" aria-hidden="true" />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
