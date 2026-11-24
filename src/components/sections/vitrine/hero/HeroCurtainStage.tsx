'use client';

import React, { Children, useEffect, useRef, type ReactNode } from 'react';

export interface HeroCurtainStageProps {
  /** Contenu du Hero figé en premier plan de la pile (ex: <HeroSection />). */
  hero: ReactNode;
  /** Piliers suivants : 01 recouvre le Hero verticalement, puis 02–04 s'empilent à l'horizontal dès 768px. */
  children: ReactNode;
}

export interface VitrineSectionHeaderProps {
  /** Numéro de lame à deux chiffres (ex: "01", "02"). */
  index: string;
  /** Titre principal de la section affiché en capitales condensées. */
  title: string;
  /** Identifiant HTML de la section cible pour le défilement au clic. */
  sectionId: string;
  /** Palette de surface claire alternée de la lame. */
  theme?: 'paper' | 'white';
}

type StageMode = 'reduced' | 'vertical' | 'horizontal';

const HEADER_THEMES = {
  paper: {
    surface: 'bg-[#f2f2f2]',
    text: 'text-[#111111]',
  },
  white: {
    surface: 'bg-white',
    text: 'text-[#111111]',
  },
} as const;

/**
 * Bandeau éditorial numéroté (01–04) en tête de chaque pilier de la Vitrine.
 * Reste horizontal sur mobile (< 768px) et pivote en tranche verticale latérale
 * cliquable à gauche sur tablette/desktop (>= 768px).
 */
export function VitrineSectionHeader({
  index,
  title,
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
    <div
      data-stack-header="true"
      role="button"
      tabIndex={0}
      onClick={scrollToSection}
      onKeyDown={handleKeyDown}
      aria-label={`Aller à la section ${index} ${title}`}
      className={`vitrine-stack-header ${palette.surface} ${palette.text}`}
    >
      <div className="vitrine-stack-header__inner">
        <span className="vitrine-stack-header__index tabular-nums select-none">
          {index}
        </span>
        <h2 className="vitrine-stack-header__title">
          {title}
        </h2>
      </div>
    </div>
  );
}

function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * HeroCurtainStage — Scène d'orchestration hybride de la Vitrine.
 *
 * - Sur mobile (< 768px) : empilement vertical en bandeaux horizontaux sous `VitrineHeader`.
 * - Sur tablette/desktop (>= 768px) : le pilier 01 recouvre verticalement le Hero, puis les
 *   piliers 02–04 glissent horizontalement depuis la droite en laissant les tranches verticales
 *   numérotées (01, 02, 03…) visibles et cliquables à gauche, via GPU pur (`translate3d`).
 * - Sous `prefers-reduced-motion: reduce` : repli complet en flux vertical statique.
 */
export default function HeroCurtainStage({ hero, children }: HeroCurtainStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const deckTrackRef = useRef<HTMLDivElement>(null);
  const deckStageRef = useRef<HTMLDivElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const runwayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrimRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pillarNodes = Children.toArray(children);
  const panelCount = 1 + pillarNodes.length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    let rafId: number | null = null;
    let lastMode: StageMode | null = null;
    let headerOffset = 64;
    let lastActiveIndex = -1;

    const pinTops = new Array<number>(panelCount).fill(0);
    const overflows = new Array<number>(panelCount).fill(0);
    const lastBodyShift = new Array<number>(panelCount).fill(0);
    const lastProgress = new Array<number>(panelCount).fill(-1);
    const lastCovered = new Array<boolean | null>(panelCount).fill(null);

    const slideStart = new Array<number>(panelCount).fill(0);
    const slideEnd = new Array<number>(panelCount).fill(0);
    const landedAt = new Array<number>(panelCount).fill(0);
    const bodyStart = new Array<number>(panelCount).fill(0);
    const bodyEnd = new Array<number>(panelCount).fill(0);
    const lastEnter = new Array<number>(panelCount).fill(-1);
    const lastScrim = new Array<number>(panelCount).fill(-1);
    const lastOffscreen = new Array<boolean | null>(panelCount).fill(null);

    const getMode = (): StageMode => {
      if (motionQuery?.matches) return 'reduced';
      return window.innerWidth >= 768 ? 'horizontal' : 'vertical';
    };

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

    const resetAllInlineStyles = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }

      stage.style.removeProperty('--hero-curtain-progress');
      stage.style.removeProperty('--vitrine-spine-w');
      stage.style.removeProperty('--deck-pin-top');

      const deckTrack = deckTrackRef.current;
      const deckStage = deckStageRef.current;
      if (deckTrack) deckTrack.style.height = '';
      if (deckStage) {
        deckStage.style.top = '';
        deckStage.style.height = '';
      }

      for (let i = 0; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        const sentinel = sentinelRefs.current[i];
        const runway = runwayRefs.current[i];
        const scrimEl = scrimRefs.current[i];

        if (sentinel) sentinel.style.scrollMarginTop = '';
        if (runway) runway.style.height = '';
        if (scrimEl) scrimEl.style.opacity = '';

        if (!panel) continue;
        panel.style.top = '';
        panel.style.height = '';
        panel.style.transform = '';
        panel.style.removeProperty('--panel-pin-top');
        panel.style.removeProperty('--panel-pin-left');
        panel.style.removeProperty('--hero-curtain-progress');
        panel.removeAttribute('data-covered');
        panel.removeAttribute('data-stacked');
        panel.removeAttribute('data-offscreen');
        panel.removeAttribute('data-active');
        panel.removeAttribute('aria-hidden');
        panel.inert = false;

        const bodyEl = panel.querySelector<HTMLElement>('.vitrine-stack-body');
        if (bodyEl) {
          bodyEl.style.transform = '';
          bodyEl.inert = false;
        }

        const viewportEl = panel.querySelector<HTMLElement>('.vitrine-stack-viewport');
        if (viewportEl) {
          viewportEl.style.transform = '';
          viewportEl.style.visibility = '';
        }
      }

      pinTops.fill(0);
      overflows.fill(0);
      lastBodyShift.fill(0);
      lastProgress.fill(-1);
      lastCovered.fill(null);
      slideStart.fill(0);
      slideEnd.fill(0);
      landedAt.fill(0);
      bodyStart.fill(0);
      bodyEnd.fill(0);
      lastEnter.fill(-1);
      lastScrim.fill(-1);
      lastOffscreen.fill(null);
      lastActiveIndex = -1;
    };

    const syncStickyOffsets = () => {
      const mode = getMode();
      if (lastMode !== null && mode !== lastMode) {
        resetAllInlineStyles();
      }
      lastMode = mode;

      if (mode === 'reduced') {
        return;
      }

      const vh = Math.max(window.innerHeight, 1);
      const headerEl = document.querySelector<HTMLElement>('header');
      headerOffset = headerEl?.offsetHeight || 64;

      if (mode === 'vertical') {
        const rawStep = window.innerWidth < 640 ? 34 : 42;
        const maxStackBudget = Math.floor((vh * 0.30) / Math.max(panelCount - 2, 1));
        const stripStep = Math.max(28, Math.min(rawStep, maxStackBudget));

        for (let i = 0; i < panelCount; i++) {
          const panel = panelRefs.current[i];
          const sentinel = sentinelRefs.current[i];
          const runway = runwayRefs.current[i];

          if (i === 0) {
            pinTops[0] = 0;
            overflows[0] = 0;
            if (sentinel) sentinel.style.scrollMarginTop = '0px';
            if (panel) {
              panel.style.setProperty('--panel-pin-top', '0px');
              panel.style.height = '';
              const stickyTop = panel.offsetHeight > vh ? vh - panel.offsetHeight : 0;
              panel.style.top = `${stickyTop}px`;
            }
            continue;
          }

          const pinTop = headerOffset + (i - 1) * stripStep;
          pinTops[i] = pinTop;

          if (sentinel) {
            sentinel.style.scrollMarginTop = `${pinTop}px`;
          }
          if (!panel) continue;

          panel.style.setProperty('--panel-pin-top', `${pinTop}px`);
          const availableHeight = Math.max(vh - pinTop, 240);
          panel.style.top = `${pinTop}px`;
          panel.style.height = `${availableHeight}px`;

          const bodyEl = panel.querySelector<HTMLElement>('.vitrine-stack-body');
          const headerBand = panel.querySelector<HTMLElement>('.vitrine-stack-header');
          const viewportHeight = Math.max(availableHeight - (headerBand?.offsetHeight ?? 0), 1);
          const overflow = bodyEl ? Math.max(0, Math.ceil(bodyEl.scrollHeight - viewportHeight)) : 0;
          overflows[i] = overflow;
          if (runway) {
            runway.style.height = `${overflow}px`;
          }
        }
        return;
      }

      // Mode 'horizontal' (>= 768px)
      const vw = Math.max(stage.clientWidth || window.innerWidth, 1);
      const spineWidth = vw < 1024 ? 52 : vw < 1280 ? 62 : 72;

      stage.style.setProperty('--vitrine-spine-w', `${spineWidth}px`);
      stage.style.setProperty('--deck-pin-top', `${headerOffset}px`);

      const deckHeight = Math.max(vh - headerOffset, 320);
      const deckTrack = deckTrackRef.current;
      const deckStage = deckStageRef.current;
      if (deckStage) {
        deckStage.style.top = `${headerOffset}px`;
        deckStage.style.height = `${deckHeight}px`;
      }

      const heroPanel = panelRefs.current[0];
      if (heroPanel) {
        const stickyTop = heroPanel.offsetHeight > vh ? vh - heroPanel.offsetHeight : 0;
        heroPanel.style.top = `${stickyTop}px`;
      }

      for (let i = 1; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        if (!panel) continue;
        panel.style.setProperty('--panel-pin-left', `${(i - 1) * spineWidth}px`);
      }

      const dwell = Math.round(Math.min(180, Math.max(100, vh * 0.16)));
      let cursor = 0;

      for (let i = 1; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        const bodyEl = panel?.querySelector<HTMLElement>('.vitrine-stack-body');
        const overflow = bodyEl ? Math.max(0, Math.ceil(bodyEl.scrollHeight - deckHeight)) : 0;
        overflows[i] = overflow;

        if (i === 1) {
          slideStart[1] = 0;
          slideEnd[1] = 0;
          landedAt[1] = 0;
          bodyStart[1] = 0;
          bodyEnd[1] = overflow;
          cursor = bodyEnd[1] + dwell;
        } else {
          const slideDist = Math.round(Math.max(420, (vw - (i - 1) * spineWidth) * 0.72));
          slideStart[i] = cursor;
          slideEnd[i] = cursor + slideDist;
          landedAt[i] = slideEnd[i];
          bodyStart[i] = slideEnd[i];
          bodyEnd[i] = slideEnd[i] + overflow;
          cursor = bodyEnd[i] + dwell;
        }
      }

      if (deckTrack && panelCount > 1) {
        deckTrack.style.height = `${deckHeight + cursor}px`;
      }
    };

    const update = () => {
      rafId = null;
      const mode = getMode();

      if (mode !== lastMode) {
        syncStickyOffsets();
      }

      if (mode === 'reduced') {
        return;
      }

      const vh = Math.max(window.innerHeight, 1);

      if (mode === 'vertical') {
        for (let i = 1; i < panelCount; i++) {
          const panel = panelRefs.current[i];
          const sentinel = sentinelRefs.current[i];
          if (!panel || !sentinel) continue;
          const bodyEl = panel.querySelector<HTMLElement>('.vitrine-stack-body');
          if (!bodyEl) continue;

          if (overflows[i] > 0) {
            const sentinelTop = sentinel.getBoundingClientRect().top;
            const shift = Math.min(overflows[i], Math.max(0, pinTops[i] - sentinelTop));
            if (Math.abs(shift - lastBodyShift[i]) > 0.25) {
              lastBodyShift[i] = shift;
              bodyEl.style.transform = `translate3d(0, ${-shift.toFixed(2)}px, 0)`;
            }
          } else if (lastBodyShift[i] !== 0) {
            lastBodyShift[i] = 0;
            bodyEl.style.transform = '';
          }
        }

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
        return;
      }

      // Mode 'horizontal' (>= 768px) — 1 seul getBoundingClientRect() par frame
      const deckTrack = deckTrackRef.current;
      if (!deckTrack) return;

      const deckTop = deckTrack.getBoundingClientRect().top;

      // 1. Transition Hero (index 0)
      const heroPanel = panelRefs.current[0];
      if (heroPanel) {
        const heroProgress = clamp01((vh - deckTop) / Math.max(vh - headerOffset, 1));
        if (Math.abs(heroProgress - lastProgress[0]) > 0.0005) {
          lastProgress[0] = heroProgress;
          const formatted = heroProgress.toFixed(4);
          heroPanel.style.setProperty('--hero-curtain-progress', formatted);
          stage.style.setProperty('--hero-curtain-progress', formatted);
        }
        setCoveredState(0, deckTop <= headerOffset + 1);
      }

      // 2. Progression horizontale et défilement interne des piliers (1..panelCount-1)
      const scrolled = Math.max(0, headerOffset - deckTop);
      const enterProgress = new Array<number>(panelCount).fill(0);
      let activeIndex = panelCount > 1 ? 1 : -1;

      for (let i = 1; i < panelCount; i++) {
        if (i === 1) {
          enterProgress[1] = 1;
        } else {
          const span = Math.max(slideEnd[i] - slideStart[i], 1);
          enterProgress[i] = clamp01((scrolled - slideStart[i]) / span);
        }
        if (enterProgress[i] > 0.5) {
          activeIndex = i;
        }
      }

      if (activeIndex !== lastActiveIndex) {
        if (lastActiveIndex >= 1) {
          panelRefs.current[lastActiveIndex]?.removeAttribute('data-active');
        }
        if (activeIndex >= 1) {
          panelRefs.current[activeIndex]?.setAttribute('data-active', 'true');
        }
        lastActiveIndex = activeIndex;
      }

      for (let i = 1; i < panelCount; i++) {
        const panel = panelRefs.current[i];
        if (!panel) continue;

        if (i >= 2) {
          const offscreen = enterProgress[i] <= 0.0005;
          if (offscreen !== lastOffscreen[i]) {
            lastOffscreen[i] = offscreen;
            panel.inert = offscreen;
            if (offscreen) {
              panel.setAttribute('data-offscreen', 'true');
              if (document.activeElement instanceof HTMLElement && panel.contains(document.activeElement)) {
                document.activeElement.blur();
              }
            } else {
              panel.removeAttribute('data-offscreen');
            }
          }

          if (Math.abs(enterProgress[i] - lastEnter[i]) > 0.0005) {
            lastEnter[i] = enterProgress[i];
            const translateX = ((1 - enterProgress[i]) * 100).toFixed(3);
            panel.style.transform = `translate3d(${translateX}%, 0, 0)`;
          }
        }

        const coverProgress = i < panelCount - 1 ? enterProgress[i + 1] : 0;
        const viewportEl = panel.querySelector<HTMLElement>('.vitrine-stack-viewport');
        if (viewportEl) {
          if (coverProgress > 0.001 && coverProgress < 0.999) {
            viewportEl.style.transform = `translate3d(${(-coverProgress * 28).toFixed(2)}px, 0, 0)`;
            viewportEl.style.visibility = '';
          } else if (coverProgress >= 0.999) {
            viewportEl.style.transform = '';
            viewportEl.style.visibility = 'hidden';
          } else {
            viewportEl.style.transform = '';
            viewportEl.style.visibility = '';
          }
        }

        const scrimEl = scrimRefs.current[i];
        if (scrimEl) {
          const nextScrim = coverProgress > 0.001 && coverProgress < 0.999 ? coverProgress * 0.18 : 0;
          if (Math.abs(nextScrim - lastScrim[i]) > 0.002) {
            lastScrim[i] = nextScrim;
            scrimEl.style.opacity = nextScrim.toFixed(3);
          }
        }

        setCoveredState(i, coverProgress >= 0.999);

        const bodyEl = panel.querySelector<HTMLElement>('.vitrine-stack-body');
        if (bodyEl) {
          if (overflows[i] > 0) {
            const shift = Math.min(overflows[i], Math.max(0, scrolled - bodyStart[i]));
            if (Math.abs(shift - lastBodyShift[i]) > 0.25) {
              lastBodyShift[i] = shift;
              bodyEl.style.transform = `translate3d(0, ${-shift.toFixed(2)}px, 0)`;
            }
          } else if (lastBodyShift[i] !== 0) {
            lastBodyShift[i] = 0;
            bodyEl.style.transform = '';
          }
        }
      }
    };

    const schedule = () => {
      if (motionQuery?.matches || rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    const scrollToPanel = (index: number, behavior: ScrollBehavior = 'smooth') => {
      const mode = getMode();

      if (mode === 'horizontal') {
        if (index === 0) {
          window.scrollTo({ top: 0, behavior });
          return;
        }
        const deckTrack = deckTrackRef.current;
        if (!deckTrack) return;
        const trackDocTop = deckTrack.getBoundingClientRect().top + window.scrollY;
        const targetScrollY = Math.max(0, trackDocTop - headerOffset + (landedAt[index] ?? 0));
        window.scrollTo({ top: targetScrollY, behavior });
        return;
      }

      if (mode === 'vertical') {
        sentinelRefs.current[index]?.scrollIntoView({ behavior, block: 'start' });
        return;
      }

      panelRefs.current[index]?.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    const idToIndex = new Map<string, number>();
    const restoreScrollOverrides: Array<() => void> = [];

    for (let i = 0; i < panelCount; i++) {
      const panel = panelRefs.current[i];
      if (!panel) continue;

      const sectionEl = panel.querySelector<HTMLElement>('section[id]');
      if (sectionEl && sectionEl.id) {
        idToIndex.set(sectionEl.id, i);

        const hadOwnScrollIntoView = Object.prototype.hasOwnProperty.call(sectionEl, 'scrollIntoView');
        const previousScrollIntoView = sectionEl.scrollIntoView;
        sectionEl.scrollIntoView = (arg?: boolean | ScrollIntoViewOptions) => {
          const behavior: ScrollBehavior =
            typeof arg === 'object' && arg !== null && arg.behavior ? arg.behavior : 'smooth';
          scrollToPanel(i, behavior);
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

      const targetIndex = idToIndex.get(hash.slice(1));
      if (targetIndex === undefined) return;

      event.preventDefault();
      scrollToPanel(targetIndex, 'smooth');
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
      if (panelRefs.current[0]) {
        resizeObserver.observe(panelRefs.current[0]);
      }
      for (let i = 1; i < panelCount; i++) {
        const bodyEl = panelRefs.current[i]?.querySelector<HTMLElement>('.vitrine-stack-body');
        if (bodyEl) resizeObserver.observe(bodyEl);
      }
    }

    syncStickyOffsets();

    if (motionQuery?.matches) {
      resetAllInlineStyles();
    } else {
      update();
    }

    const initialHash = window.location.hash;
    if (initialHash && initialHash.length > 1) {
      const hashIdx = idToIndex.get(initialHash.slice(1));
      if (hashIdx !== undefined) {
        window.requestAnimationFrame(() => {
          scrollToPanel(hashIdx, 'auto');
        });
      }
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    const handleMotionChange = () => {
      resetAllInlineStyles();
      syncStickyOffsets();
      if (!motionQuery?.matches) {
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
      {/* 0. Hero figé en toile de fond */}
      <div
        ref={(el) => {
          sentinelRefs.current[0] = el;
        }}
        className="hero-stack-sentinel"
        aria-hidden="true"
      />
      <div
        ref={(el) => {
          panelRefs.current[0] = el;
        }}
        data-stack-index={0}
        className="hero-curtain-backdrop hero-stack-panel"
        style={{ zIndex: 1 }}
      >
        <div className="hero-curtain-media hero-stack-media">{hero}</div>
        <div className="hero-curtain-scrim hero-stack-scrim" aria-hidden="true" />
      </div>

      {/* 1..4 Piliers : 01 recouvre le Hero verticalement, 02–04 glissent à l'horizontal sur >= 768px */}
      <div ref={deckTrackRef} className="vitrine-deck-track">
        <div ref={deckStageRef} className="vitrine-deck-stage">
          {pillarNodes.map((panelNode, idx) => {
            const index = idx + 1;
            return (
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
                  className="hero-curtain-backdrop hero-stack-panel hero-curtain-sheet hero-stack-card"
                  style={{ zIndex: index + 1 }}
                >
                  <div className="hero-curtain-media hero-stack-media">{panelNode}</div>
                  <div
                    ref={(el) => {
                      scrimRefs.current[index] = el;
                    }}
                    className="hero-stack-body-scrim"
                    aria-hidden="true"
                  />
                </div>
                <div
                  ref={(el) => {
                    runwayRefs.current[index] = el;
                  }}
                  className="hero-stack-runway"
                  aria-hidden="true"
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
