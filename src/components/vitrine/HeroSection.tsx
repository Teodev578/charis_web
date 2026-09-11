'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

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

const HERO_CARDS: HeroCardItem[] = [
  {
    id: 0,
    src: '/images/vitrine/hero/reader.png',
    alt: 'Méditation biblique',
    labelTop: 'Lorem ipsum',
    labelBottom: 'dolor',
  },
  {
    id: 1,
    src: '/images/vitrine/hero/prayer_hands.png',
    alt: 'Prière et intercession',
    labelTop: 'Lorem ipsum',
    labelBottom: 'dolor',
  },
  {
    id: 2,
    src: '/images/vitrine/hero/preacher_step3.png',
    alt: 'Prédication pastorale Charis Nation',
    labelTop: '',
    labelBottom: '',
  },
  {
    id: 3,
    src: '/images/vitrine/hero/bass_guitar.png',
    alt: 'Louange et adoration',
    labelTop: 'Lorem ipsum',
    labelBottom: 'dolor',
  },
];

export default function HeroSection({ onAnimationComplete }: HeroSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isTitlePurple, setIsTitlePurple] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(2); // Pasteur par défaut
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const startSequence = () => {
    clearAllTimers();
    setStep(1);
    setIsTitlePurple(false);
    setHasInteracted(false);
    setActiveCardIndex(2);

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
        setActiveCardIndex(2);
        onAnimationComplete?.();
        return;
      }

      // Exposer pour pilotage programmatique / tests
      (window as unknown as { __setHeroStep?: (s: 1 | 2 | 3, purple?: boolean, card?: number) => void }).__setHeroStep = (
        s: 1 | 2 | 3,
        purple = false,
        card = 2
      ) => {
        clearAllTimers();
        setStep(s);
        setIsTitlePurple(s === 3 ? purple : false);
        setActiveCardIndex(card);
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

  // Calcul du décalage horizontal du ruban pour amener la carte active au milieu de l'écran lors du survol
  const getRibbonTranslateX = () => {
    if (step < 3) return '0%';
    switch (activeCardIndex) {
      case 0: // Lecteur biblique : glisse à droite pour venir au centre
        return 'clamp(140px, 24vw, 340px)';
      case 1: // Mains en prière : glisse modérément à droite
        return 'clamp(70px, 12vw, 170px)';
      case 2: // Pasteur au pupitre (défaut centré)
        return '0px';
      case 3: // Guitariste à droite : glisse à gauche pour venir au centre et pousser les autres à gauche
        return '-clamp(140px, 22vw, 320px)';
      default:
        return '0px';
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onClick={skipToFinal}
      className="relative h-screen min-h-[620px] max-h-[1080px] w-full bg-white text-[#111111] overflow-hidden select-none"
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
          2. SCÈNE CENTRALE ABSOLUE (Centrage parfait à 50% X et 50% Y garanti)
             - Étape 1 : "CharisNation" au centre exact de l'écran.
             - Étape 2 : L'image centrale s'épanouit au milieu, séparant Charis et Nation
                         avec un alignement médian vertical et horizontal sans faille.
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
            className={`relative overflow-hidden rounded-sm transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl ${
              step === 1
                ? 'w-0 h-0 scale-75 opacity-0'
                : 'w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-[190px] sm:h-[250px] md:h-[300px] lg:h-[340px] scale-100 opacity-100'
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

        {/* --- Frise d'images supérieure interactive de l'Étape 3 --- */}
        <div
          className={`absolute w-full flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-25 overflow-visible ${
            step === 3
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          style={{
            top: 'clamp(54px, 8.5vh, 76px)',
          }}
          onMouseLeave={() => {
            if (step === 3) setActiveCardIndex(2); // Retour naturel au pasteur au centre
          }}
        >
          {/* Ruban horizontal animé et interactif */}
          <div
            className="flex items-start justify-center gap-2 sm:gap-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-max max-w-none px-4"
            style={{
              transform: `translateX(${getRibbonTranslateX()})`,
            }}
          >
            {HERO_CARDS.map((card) => {
              const isCardActive = activeCardIndex === card.id;
              const isPreacher = card.id === 2;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => {
                    if (step === 3) setActiveCardIndex(card.id);
                  }}
                  className={`relative flex flex-col items-start transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none group ${
                    isCardActive ? 'z-30' : 'z-10'
                  }`}
                >
                  {/* Libellé au-dessus de la carte (Lorem ipsum dolor) */}
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

                  {/* Boîte d'image adaptative */}
                  <div
                    className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-sm ${
                      isCardActive
                        ? 'w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px] h-[210px] sm:h-[280px] md:h-[320px] lg:h-[350px] shadow-2xl ring-1 ring-black/5'
                        : 'w-[110px] sm:w-[150px] md:w-[190px] lg:w-[230px] h-[170px] sm:h-[220px] md:h-[260px] lg:h-[290px] shadow-md opacity-90 group-hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      priority={isPreacher}
                      className={`object-cover transition-transform duration-700 ease-out ${
                        isCardActive ? 'scale-105' : 'scale-100 group-hover:scale-102'
                      }`}
                      sizes="(max-width: 640px) 45vw, 35vw"
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

      </div>

      {/* =========================================================================
          3. ÉLÉMENTS DE BAS DE PAGE (Indicateur intro & chevron Étape 3)
          ========================================================================= */}
      {/* Indication discrète pour passer l'intro */}
      {step < 3 && !hasInteracted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-400 animate-pulse cursor-pointer whitespace-nowrap z-40">
          Cliquer pour passer l’introduction
        </div>
      )}

    </section>
  );
}
