'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onAnimationComplete?: () => void;
}

interface HeroCardItem {
  id: number;
  src: string;
  alt: string;
  labelTop: string;
  labelBottom: string;
}

const DEFAULT_CARD_INDEX = 5;
const VISIBLE_RANGE = 8; // De -8 à +8 (17 cartes au total pour couvrir tout écran jusqu'à 4K)

const HERO_CARDS: HeroCardItem[] = [
  {
    id: 0,
    src: '/images/vitrine/hero/763847540_1467082212130633_4209837751427562403_n.jpg',
    alt: 'Méditation et étude des Saintes Écritures',
    labelTop: 'Méditation',
    labelBottom: 'de la Parole',
  },
  {
    id: 1,
    src: '/images/vitrine/hero/741236210_1442275964611258_1533117105274813195_n.jpg',
    alt: 'Accueil chaleureux et amour fraternel à Charis Nation',
    labelTop: 'Communion',
    labelBottom: 'fraternelle',
  },
  {
    id: 2,
    src: '/images/vitrine/hero/764036547_1467081792130675_6280683264643877830_n.jpg',
    alt: 'Mains levées de l’assemblée unie dans la prière',
    labelTop: 'Prière',
    labelBottom: '& intercession',
  },
  {
    id: 3,
    src: '/images/vitrine/hero/727953079_122211210548460052_5367766242337493486_n.jpg',
    alt: 'Moment solennel de prière et de recueillement spirituel',
    labelTop: 'Recueillement',
    labelBottom: 'Selah',
  },
  {
    id: 4,
    src: '/images/vitrine/hero/742876570_1442275874611267_2489982619870130075_n.jpg',
    alt: 'Ferveur et dévotion personnelle durant le culte',
    labelTop: 'Ferveur',
    labelBottom: '& dévotion',
  },
  {
    id: 5,
    src: '/images/vitrine/hero/preacher_step3.png',
    alt: 'Prédication pastorale Charis Nation',
    labelTop: '',
    labelBottom: '',
  },
  {
    id: 6,
    src: '/images/vitrine/hero/740989333_122212774592460052_7663013603214315739_n.jpg',
    alt: 'Enseignement de la grâce au pupitre de Charis Nation',
    labelTop: 'Parole',
    labelBottom: 'vivante',
  },
  {
    id: 7,
    src: '/images/vitrine/hero/742309154_1442275667944621_7362906642853600656_n.jpg',
    alt: 'Chantre conduisant la louange et l’adoration prophétique',
    labelTop: 'Louange',
    labelBottom: '& adoration',
  },
  {
    id: 8,
    src: '/images/vitrine/hero/764938180_1467078432131011_5827389404293227179_n.jpg',
    alt: 'Fidèle attentif recevant l’enseignement biblique',
    labelTop: 'Écoute',
    labelBottom: '& édification',
  },
  {
    id: 9,
    src: '/images/vitrine/hero/801429637_122221468262460052_2968758665780688333_n.jpg',
    alt: 'Prise de notes active lors de l’enseignement spirituel',
    labelTop: 'Discipulat',
    labelBottom: '& formation',
  },
  {
    id: 10,
    src: '/images/vitrine/hero/801582303_122221468352460052_7466114744626332080_n.jpg',
    alt: 'Fidèles et familles réunis sous la parole vivante',
    labelTop: 'Génération',
    labelBottom: 'd’impact',
  },
];

export default function HeroSection({ onAnimationComplete }: HeroSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isTitleSettled, setIsTitleSettled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  // Index virtuel continu infini (sans borne ni début ni fin)
  const [currentIndex, setCurrentIndex] = useState<number>(DEFAULT_CARD_INDEX);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fenêtre glissante centrée sur currentIndex : projection circulaire stricte sans fin
  const visibleCards = useMemo(() => {
    const cards = [];
    for (let k = -VISIBLE_RANGE; k <= VISIBLE_RANGE; k++) {
      const vIndex = currentIndex + k;
      const realIndex = ((vIndex % HERO_CARDS.length) + HERO_CARDS.length) % HERO_CARDS.length;
      cards.push({
        card: HERO_CARDS[realIndex],
        virtualIndex: vIndex,
        k,
      });
    }
    return cards;
  }, [currentIndex]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  // Défilement automatique continu doux au repos : avance d'une carte toutes les 3,6s quand non survolé
  useEffect(() => {
    if (step !== 3 || !isTitleSettled || isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3600);

    return () => clearInterval(interval);
  }, [step, isTitleSettled, isHovering]);

  const startSequence = () => {
    clearAllTimers();
    setStep(1);
    setIsTitleSettled(false);
    setHasInteracted(false);
    setIsHovering(false);
    setCurrentIndex(DEFAULT_CARD_INDEX);

    // Étape 1 -> Étape 2 : Écartement de Charis & Nation et émergence de l'image centrale parfaitement au milieu
    const t1 = setTimeout(() => {
      setStep(2);
    }, 1300);

    // Étape 2 -> Étape 3 : L'image centrale monte tout en haut, Charis & Nation descendent en bas
    const t2 = setTimeout(() => {
      setStep(3);
    }, 3200);

    // Une fois en bas : stabilisation du titre, apparition de la devise et activation des contrôles
    const t3 = setTimeout(() => {
      setIsTitleSettled(true);
      onAnimationComplete?.();
    }, 4200);

    timersRef.current = [t1, t2, t3];
  };

  // Orchestration de la timeline automatique
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setStep(3);
        setIsTitleSettled(true);
        setCurrentIndex(DEFAULT_CARD_INDEX);
        onAnimationComplete?.();
        return;
      }

      // Exposer pour pilotage programmatique / tests
      (window as unknown as { __setHeroStep?: (s: 1 | 2 | 3, settled?: boolean, card?: number) => void }).__setHeroStep = (
        s: 1 | 2 | 3,
        settled = false,
        card = DEFAULT_CARD_INDEX
      ) => {
        clearAllTimers();
        setStep(s);
        setIsTitleSettled(s === 3 ? settled : false);
        setCurrentIndex(card);
      };
    }

    startSequence();

    return () => {
      clearAllTimers();
    };
  }, [onAnimationComplete]);

  // Passer instantanément à l'étape finale lors d'une interaction (clic ou scroll)
  const skipToFinal = () => {
    if (step < 3 || !isTitleSettled) {
      clearAllTimers();
      setStep(3);
      setIsTitleSettled(true);
      setHasInteracted(true);
      setIsHovering(false);
      onAnimationComplete?.();
    }
  };

  // Permettre de rejouer l'animation
  const replayAnimation = () => {
    startSequence();
  };

  const navLinks = [
    { label: 'Accueil', href: '#hero', active: true },
    { label: 'Vision', href: '#vision', active: false },
    { label: 'Équipe', href: '#equipe', active: false },
    { label: 'Extraits', href: '#enseignements', active: false },
    { label: 'Informations', href: '#cultes', active: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onClick={skipToFinal}
      className="relative h-screen min-h-[640px] max-h-[1080px] w-full bg-white text-[#111111] overflow-hidden select-none"
    >
      {/* =========================================================================
          1. BARRE DE NAVIGATION SUPÉRIEURE (Révélée lors de l'Étape 3)
          ========================================================================= */}
      <header
        className={`absolute top-0 left-0 right-0 w-full pt-6 sm:pt-8 pb-4 px-6 md:px-12 z-40 transition-all duration-700 ease-out ${
          step === 3
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo discret gauche */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-serif font-bold text-xl tracking-tight text-[#1A1A1A] no-underline hover:opacity-80 transition-opacity"
          >
            Charis Nation
          </a>

          {/* Navigation centrale */}
          <nav className="flex items-center gap-6 sm:gap-9">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium transition-colors no-underline ${
                  item.active
                    ? 'text-[#fc7d42] font-semibold'
                    : 'text-[#333333] hover:text-[#fc7d42]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contrôle Rejouer */}
          <div className="flex items-center gap-3">
            {step === 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  replayAnimation();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                title="Rejouer l'animation de présentation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rejouer</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. SCÈNE CENTRALE ABSOLUE (Centrage parfait à 50% X et 50% Y)
             - Étape 1 : "CharisNation" au centre exact de l'écran.
             - Étape 2 : L'image centrale s'épanouit au milieu, séparant Charis et Nation.
             - Étape 3 : L'image centrale monte au sommet dans la frise d'images,
                         Charis et Nation descendent en bas et restent en noir (#111111).
          ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">

        {/* --- Image pastorale centrale d'intro (monte vers la frise en Étape 3) --- */}
        <div
          className="absolute flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-30 pointer-events-none"
          style={{
            transform: `translateY(${step === 3 ? '-clamp(140px, 23vh, 190px)' : '0px'})`,
            opacity: step === 1 ? 0 : step === 2 ? 1 : 0,
          }}
        >
          <div
            className={`relative overflow-hidden rounded-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl w-[220px] sm:w-[300px] md:w-[380px] lg:w-[440px] h-[200px] sm:h-[270px] md:h-[330px] lg:h-[390px] ${
              step === 1
                ? 'scale-75 opacity-0 pointer-events-none'
                : 'scale-100 opacity-100'
            }`}
          >
            <Image
              src="/images/vitrine/hero/preacher_step3.png"
              alt="Prédication pastorale Charis Nation"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 340px, 440px"
            />
          </div>
        </div>

        {/* --- Titre "Charis Nation" et Devise (Acteurs continus des 3 étapes) --- */}
        <div
          className="flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-auto"
          style={{
            transform: `translateY(${step === 3 ? 'clamp(160px, 26vh, 220px)' : '0px'})`,
          }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none flex items-center justify-center text-[#111111]">
            <span className="inline-block text-[#111111]">
              Charis
            </span>

            {/* Espace séparateur dynamique calibré exactement pour l'image centrale en étape 2 */}
            <span
              className="inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width:
                  step === 1
                    ? '0px'
                    : step === 2
                    ? 'clamp(280px, 33vw, 500px)'
                    : 'clamp(10px, 1.4vw, 20px)',
              }}
            />

            <span className="inline-block text-[#111111]">
              Nation
            </span>
          </h1>

          {/* Devise sous le titre en Étape 3 */}
          <p
            className={`absolute top-full mt-3 sm:mt-4 font-serif text-sm sm:text-base md:text-lg text-[#1E1E1E] text-center max-w-2xl px-4 leading-relaxed transition-all duration-800 ease-out w-max max-w-[90vw] ${
              isTitleSettled
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            Equiper les Saints afin qu’ils influencent leurs différentes sphères avec Christ.
          </p>
        </div>

        {/* --- Frise d'images supérieure interactive : HOVER SCROLL & ANNEAU CIRCULAIRE INFINI --- */}
        <div
          className={`absolute w-full flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-25 overflow-visible ${
            step === 3
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          style={{
            top: 'clamp(50px, 7.5vh, 72px)',
          }}
          onMouseEnter={() => {
            setIsHovering(true);
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
          }}
          onMouseLeave={() => {
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
            resumeTimerRef.current = setTimeout(() => {
              setIsHovering(false);
            }, 2800);
          }}
        >
          {/* Scène de l'anneau circulaire avec ancrage central et jointure gap-0 absolue */}
          <div className="relative w-full h-[200px] sm:h-[270px] md:h-[330px] lg:h-[390px] overflow-visible flex items-start justify-center">
            {visibleCards.map(({ card, virtualIndex, k }) => {
              const isCardActive = k === 0;
              const isDefaultHero = card.id === DEFAULT_CARD_INDEX;

              // Positionnement géométrique exact par rapport au centre : contact bord à bord strict (gap-0)
              // Accélération matérielle 3D native pour forcer le compositeur GPU (translate3d)
              const transformStyle =
                k === 0
                  ? 'translate3d(-50%, 0, 0)'
                  : k > 0
                  ? `translate3d(calc(-50% + (var(--hero-card-w-active) - var(--hero-card-w-side)) / 2 + ${k} * var(--hero-card-w-side)), 0, 0)`
                  : `translate3d(calc(-50% - (var(--hero-card-w-active) - var(--hero-card-w-side)) / 2 + ${k} * var(--hero-card-w-side)), 0, 0)`;

              return (
                <div
                  key={virtualIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (step === 3) {
                      setIsHovering(true);
                      setCurrentIndex((prev) => prev + k);
                      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                      resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                    }
                  }}
                  onMouseEnter={() => {
                    // Au survol d'une carte latérale, centrage immédiat et fluide
                    if (step === 3 && k !== 0) {
                      setIsHovering(true);
                      setCurrentIndex((prev) => prev + k);
                      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                      resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                    }
                  }}
                  className={`absolute top-0 left-1/2 flex flex-col items-start cursor-pointer select-none group [contain:layout_paint] ${
                    isCardActive ? 'z-30' : 'z-10'
                  }`}
                  style={{
                    transform: transformStyle,
                    width: isCardActive ? 'var(--hero-card-w-active)' : 'var(--hero-card-w-side)',
                    height: isCardActive ? 'var(--hero-card-h-active)' : 'var(--hero-card-h-side)',
                    transition:
                      'transform 850ms cubic-bezier(0.22, 1, 0.36, 1), width 850ms cubic-bezier(0.22, 1, 0.36, 1), height 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform, width, height',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Boîte d'image adaptative : parfaitement collée (gap-0), angles droits stricts (rounded-none) */}
                  <div
                    className={`relative w-full h-full overflow-hidden transition-all duration-850 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-none ${
                      isCardActive
                        ? 'shadow-2xl ring-1 ring-black/10'
                        : 'opacity-95 group-hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      priority={isDefaultHero}
                      className={`object-cover transition-transform duration-850 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCardActive ? 'scale-105' : 'scale-100 group-hover:scale-102'
                      }`}
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 440px"
                    />

                    {/* Voile d'atténuation sur les cartes inactives */}
                    <div
                      className={`absolute inset-0 bg-black/10 transition-opacity duration-700 ease-out ${
                        isCardActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chevrons discrets de navigation latérale au clic (réservés au format mobile) */}
          {step === 3 && isTitleSettled && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovering(true);
                  setCurrentIndex((prev) => prev - 1);
                  if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                  resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                }}
                className="flex sm:hidden absolute left-2 top-[80px] -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-md backdrop-blur-md border border-black/5 items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
                title="Image précédente"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovering(true);
                  setCurrentIndex((prev) => prev + 1);
                  if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                  resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                }}
                className="flex sm:hidden absolute right-2 top-[80px] -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-md backdrop-blur-md border border-black/5 items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
                title="Image suivante"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

      </div>

      {/* =========================================================================
          3. ÉLÉMENTS DE BAS DE PAGE (Indicateur intro)
          ========================================================================= */}
      {step < 3 && !hasInteracted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-400 animate-pulse cursor-pointer whitespace-nowrap z-40">
          Cliquer pour passer l’introduction
        </div>
      )}

    </section>
  );
}
