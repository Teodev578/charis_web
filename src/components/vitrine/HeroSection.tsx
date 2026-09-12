'use client';

import React, { useState, useEffect, useRef } from 'react';
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

interface ExtendedHeroCardItem extends HeroCardItem {
  uniqueKey: string;
  virtualIndex: number;
}

const DEFAULT_CARD_INDEX = 5;

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

// Nombre de répétitions pour garantir un défilement infini sans trou blanc (55 cartes)
const SET_COUNT = 5;
const CARDS_PER_SET = HERO_CARDS.length; // 11 cartes
const MIDDLE_SET_INDEX = Math.floor(SET_COUNT / 2); // Set 2 (centre)

// Ruban étendu à 5 cycles pour un anneau circulaire parfait sans bordure
const EXTENDED_HERO_CARDS: ExtendedHeroCardItem[] = Array.from({ length: SET_COUNT }, (_, setIdx) =>
  HERO_CARDS.map((card, i) => ({
    ...card,
    uniqueKey: `set${setIdx}-${card.id}`,
    virtualIndex: setIdx * CARDS_PER_SET + i,
  }))
).flat();

// Indice de la carte pastorale au centre du set médian (Set 2, indice 2 * 11 + 5 = 27)
const DEFAULT_VIRTUAL_INDEX = MIDDLE_SET_INDEX * CARDS_PER_SET + DEFAULT_CARD_INDEX;

export default function HeroSection({ onAnimationComplete }: HeroSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isTitlePurple, setIsTitlePurple] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeVirtualIndex, setActiveVirtualIndex] = useState<number>(DEFAULT_VIRTUAL_INDEX);
  const [isHovering, setIsHovering] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  // Réinitialisation fluide de isJumping après le repaint du navigateur (saut silencieux invisible)
  useEffect(() => {
    if (isJumping) {
      let frameId2: number;
      const frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
      return () => {
        cancelAnimationFrame(frameId1);
        cancelAnimationFrame(frameId2);
      };
    }
  }, [isJumping]);

  // Défilement automatique doux au repos : avance d'une carte toutes les 3,6s quand non survolé
  useEffect(() => {
    if (step !== 3 || !isTitlePurple || isHovering) return;

    const interval = setInterval(() => {
      setActiveVirtualIndex((prev) => prev + 1);
    }, 3600);

    return () => clearInterval(interval);
  }, [step, isTitlePurple, isHovering]);

  // Saut silencieux à la fin de la transition quand on sort du set médian
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

    const minNormalIndex = MIDDLE_SET_INDEX * CARDS_PER_SET; // 22
    const maxNormalIndex = (MIDDLE_SET_INDEX + 1) * CARDS_PER_SET - 1; // 32

    if (activeVirtualIndex < minNormalIndex || activeVirtualIndex > maxNormalIndex) {
      const realIndex = ((activeVirtualIndex % CARDS_PER_SET) + CARDS_PER_SET) % CARDS_PER_SET;
      const normalizedIndex = MIDDLE_SET_INDEX * CARDS_PER_SET + realIndex;

      setIsJumping(true);
      setActiveVirtualIndex(normalizedIndex);
    }
  };

  const startSequence = () => {
    clearAllTimers();
    setStep(1);
    setIsTitlePurple(false);
    setHasInteracted(false);
    setIsHovering(false);
    setActiveVirtualIndex(DEFAULT_VIRTUAL_INDEX);

    // Étape 1 -> Étape 2 : Écartement de Charis & Nation et émergence de l'image centrale parfaitement au milieu
    const t1 = setTimeout(() => {
      setStep(2);
    }, 1300);

    // Étape 2 -> Étape 3 : L'image centrale monte tout en haut, Charis & Nation descendent en bas
    const t2 = setTimeout(() => {
      setStep(3);
    }, 3200);

    // Une fois en bas : Charis & Nation deviennent violets
    const t3 = setTimeout(() => {
      setIsTitlePurple(true);
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
        setIsTitlePurple(true);
        setActiveVirtualIndex(DEFAULT_VIRTUAL_INDEX);
        onAnimationComplete?.();
        return;
      }

      // Exposer pour pilotage programmatique / tests
      (window as unknown as { __setHeroStep?: (s: 1 | 2 | 3, purple?: boolean, card?: number) => void }).__setHeroStep = (
        s: 1 | 2 | 3,
        purple = false,
        card = DEFAULT_VIRTUAL_INDEX
      ) => {
        clearAllTimers();
        setStep(s);
        setIsTitlePurple(s === 3 ? purple : false);
        setActiveVirtualIndex(card);
      };
    }

    startSequence();

    return () => {
      clearAllTimers();
    };
  }, [onAnimationComplete]);

  // Passer instantanément à l'étape finale lors d'une interaction (clic ou scroll)
  const skipToFinal = () => {
    if (step < 3 || !isTitlePurple) {
      clearAllTimers();
      setStep(3);
      setIsTitlePurple(true);
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
                         Charis et Nation descendent en bas et deviennent pourpres royaux (#6c288b).
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
            className={`relative overflow-hidden rounded-sm transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-[190px] sm:h-[250px] md:h-[300px] lg:h-[340px] ${
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
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none flex items-center justify-center">
            <span
              className={`inline-block transition-colors duration-800 ease-out ${
                isTitlePurple ? 'text-[#6c288b]' : 'text-[#111111]'
              }`}
            >
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

            <span
              className={`inline-block transition-colors duration-800 ease-out ${
                isTitlePurple ? 'text-[#6c288b]' : 'text-[#111111]'
              }`}
            >
              Nation
            </span>
          </h1>

          {/* Devise sous le titre en Étape 3 */}
          <p
            className={`absolute top-full mt-3 sm:mt-4 font-serif text-sm sm:text-base md:text-lg text-[#1E1E1E] text-center max-w-2xl px-4 leading-relaxed transition-all duration-800 ease-out w-max max-w-[90vw] ${
              isTitlePurple
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
            top: 'clamp(54px, 8.5vh, 76px)',
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
          {/* Conteneur de centrage */}
          <div className="flex items-center justify-center w-max">
            {/* Ruban horizontal : hover scroll fluide avec centrage et saut silencieux invisible */}
            <div
              onTransitionEnd={handleTransitionEnd}
              className="flex items-start justify-center gap-2 sm:gap-3 w-max max-w-none px-4"
              style={{
                transform: `translateX(calc(${DEFAULT_VIRTUAL_INDEX - activeVirtualIndex} * clamp(118px, 15vw, 242px)))`,
                transition: isJumping ? 'none' : 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
              }}
            >
              {EXTENDED_HERO_CARDS.map((card) => {
                const isCardActive = activeVirtualIndex === card.virtualIndex;
                const isDefaultHero = card.virtualIndex === DEFAULT_VIRTUAL_INDEX;

                return (
                  <div
                    key={card.uniqueKey}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (step === 3) {
                        setIsHovering(true);
                        setActiveVirtualIndex(card.virtualIndex);
                        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                        resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                      }
                    }}
                    onMouseEnter={() => {
                      // Hover scroll : au survol, le ruban scrolle pour amener cette carte au centre et l'agrandit
                      if (step === 3 && !isJumping) {
                        setIsHovering(true);
                        setActiveVirtualIndex(card.virtualIndex);
                        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                        resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                      }
                    }}
                    className={`relative flex flex-col items-start transition-all duration-650 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none group ${
                      isCardActive ? 'z-30' : 'z-10'
                    }`}
                  >
                    {/* Libellé au-dessus de la carte */}
                    <div
                      className={`h-8 mb-1.5 pl-1 text-xs sm:text-sm text-[#222222] font-serif leading-tight transition-all duration-500 ${
                        step === 3 && card.labelTop
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <p className="font-serif">{card.labelTop}</p>
                      <p className="font-serif">{card.labelBottom}</p>
                    </div>

                    {/* Boîte d'image adaptative : la carte active s'agrandit majestueusement au centre */}
                    <div
                      className={`relative overflow-hidden transition-all duration-650 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-sm ${
                        isCardActive
                          ? 'w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-[210px] sm:h-[280px] md:h-[320px] lg:h-[350px] shadow-2xl ring-1 ring-black/5'
                          : 'w-[110px] sm:w-[150px] md:w-[190px] lg:w-[230px] h-[170px] sm:h-[220px] md:h-[260px] lg:h-[290px] shadow-md opacity-90 group-hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        priority={isDefaultHero}
                        className={`object-cover transition-transform duration-650 ease-out ${
                          isCardActive ? 'scale-105' : 'scale-100 group-hover:scale-102'
                        }`}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 440px"
                      />

                      {/* Voile d'atténuation sur les cartes inactives */}
                      <div
                        className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${
                          isCardActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chevrons discrets de navigation latérale au clic (rotation circulaire infinie sans bornes) */}
          {step === 3 && isTitlePurple && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovering(true);
                  setActiveVirtualIndex((prev) => prev - 1);
                  if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                  resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-700 hover:text-black shadow-lg backdrop-blur-md border border-black/5 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-75 hover:opacity-100"
                title="Image précédente"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHovering(true);
                  setActiveVirtualIndex((prev) => prev + 1);
                  if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                  resumeTimerRef.current = setTimeout(() => setIsHovering(false), 3500);
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-700 hover:text-black shadow-lg backdrop-blur-md border border-black/5 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-75 hover:opacity-100"
                title="Image suivante"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
