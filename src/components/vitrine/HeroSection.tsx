'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

interface HeroSectionProps {
  onAnimationComplete?: () => void;
}

export default function HeroSection({ onAnimationComplete }: HeroSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isTitlePurple, setIsTitlePurple] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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

    // Étape 1 -> Étape 2 : Écartement de Charis & Nation et émergence de l'image centrale
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
    }, 4100);

    timersRef.current = [t1, t2, t3];
  };

  // Orchestration de la timeline automatique
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setStep(3);
        setIsTitlePurple(true);
        onAnimationComplete?.();
        return;
      }

      // Exposer pour pilotage programmatique / tests
      (window as unknown as { __setHeroStep?: (s: 1 | 2 | 3, purple?: boolean) => void }).__setHeroStep = (s: 1 | 2 | 3, purple = false) => {
        clearAllTimers();
        setStep(s);
        setIsTitlePurple(s === 3 ? purple : false);
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

  return (
    <section
      id="hero"
      ref={containerRef}
      onClick={skipToFinal}
      className="relative min-h-screen w-full bg-white text-[#111111] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* =========================================================================
          1. BARRE DE NAVIGATION SUPÉRIEURE (Révélée lors de l'Étape 3)
          ========================================================================= */}
      <header
        className={`w-full pt-8 pb-4 px-6 md:px-12 z-30 transition-all duration-700 ease-out ${
          step === 3
            ? 'opacity-100 translate-y-0'
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
          2. SCÈNE PRINCIPALE CONTINUE :
             L'image centrale monte tout en haut dans la frise.
             "Charis" et "Nation" descendent tout en bas, puis deviennent violets.
          ========================================================================= */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-6 my-auto">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">

          {/* Ligne des libellés discrets au-dessus des images (Étape 3) */}
          <div
            className={`w-full grid grid-cols-12 gap-2 sm:gap-4 mb-2 text-xs sm:text-sm text-[#222222] font-serif leading-tight transition-all duration-700 ease-out ${
              step === 3
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="col-span-4 sm:col-span-3 text-left pl-2">
              <p className="font-serif">Lorem ipsum</p>
              <p className="font-serif">dolor</p>
            </div>
            <div className="col-span-4 sm:col-span-3 text-left pl-2">
              <p className="font-serif">Lorem ipsum</p>
              <p className="font-serif">dolor</p>
            </div>
            <div className="hidden sm:block sm:col-span-3" />
            <div className="col-span-4 sm:col-span-3 text-left pl-2">
              <p className="font-serif">Lorem ipsum</p>
              <p className="font-serif">dolor</p>
            </div>
          </div>

          {/* =====================================================================
              FRISE D'IMAGES :
              Contient les photos latérales ET la photo centrale qui s'y dépose.
              ===================================================================== */}
          <div className="w-full flex items-start justify-center gap-0 overflow-visible relative">
            {/* Photo 1 (Gauche : Homme en lecture biblique) */}
            <div
              className={`relative flex-1 min-w-[70px] sm:min-w-[100px] h-[190px] sm:h-[260px] md:h-[320px] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                step === 3
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12 pointer-events-none'
              }`}
            >
              <Image
                src="/images/vitrine/hero/reader.png"
                alt="Méditation biblique"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, 20vw"
              />
            </div>

            {/* Photo 2 (Mains levées en prière) */}
            <div
              className={`relative flex-1 min-w-[90px] sm:min-w-[140px] h-[190px] sm:h-[260px] md:h-[320px] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 ${
                step === 3
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8 pointer-events-none'
              }`}
            >
              <Image
                src="/images/vitrine/hero/prayer_hands.png"
                alt="Prière et intercession"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, 25vw"
              />
            </div>

            {/* PHOTO CENTRALE DU PASTEUR :
                C'est l'actrice principale du mouvement !
                - Étape 1 : invisible (opacity-0, scale-75).
                - Étape 2 : descendue au centre du viewport entre "Charis" et "Nation".
                - Étape 3 : MONTE ET SE DÉPOSE TOUT EN HAUT À SA PLACE DÉFINITIVE ! */}
            <div
              className={`relative flex-[1.6] sm:flex-[1.8] min-w-[140px] sm:min-w-[240px] h-[230px] sm:h-[320px] md:h-[400px] z-20 shadow-xl overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                step === 1
                  ? 'opacity-0 scale-75 translate-y-[18vh] pointer-events-none'
                  : step === 2
                  ? 'opacity-100 scale-100 translate-y-[18vh] shadow-2xl'
                  : 'opacity-100 scale-100 translate-y-0 shadow-lg'
              }`}
            >
              <Image
                src="/images/vitrine/hero/preacher_step3.png"
                alt="Prédication pastorale Charis Nation"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 35vw"
              />
            </div>

            {/* Photo 4 (Droite : Bassiste lors de la louange) */}
            <div
              className={`relative flex-[1.2] sm:flex-[1.4] min-w-[100px] sm:min-w-[160px] h-[190px] sm:h-[260px] md:h-[320px] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 ${
                step === 3
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8 pointer-events-none'
              }`}
            >
              <Image
                src="/images/vitrine/hero/bass_guitar.png"
                alt="Louange et adoration"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 25vw, 25vw"
              />
            </div>
          </div>

          {/* =====================================================================
              TITRE : "CHARIS" & "NATION"
              - Étape 1 : ils sont au centre, collés, noirs (CharisNation).
              - Étape 2 : ils s'écartent horizontalement pour entourer le pasteur, toujours noirs.
              - Étape 3 : ils DESCENDENT TOUT EN BAS sous les images et se resserrent.
              - UNE FOIS EN BAS : ils deviennent VIOLETS (#6c288b) !
              ===================================================================== */}
          <div
            className={`relative mt-8 sm:mt-12 text-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 ${
              step <= 2
                ? '-translate-y-[24vh] sm:-translate-y-[28vh]'
                : 'translate-y-0'
            }`}
          >
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95] flex items-center justify-center">
              {/* Mot "Charis" */}
              <span
                className={`inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  step === 1
                    ? 'translate-x-0'
                    : step === 2
                    ? '-translate-x-32 sm:-translate-x-52 md:-translate-x-68 lg:-translate-x-80'
                    : 'translate-x-0'
                } ${
                  isTitlePurple
                    ? 'text-[#6c288b]'
                    : 'text-[#111111]'
                }`}
                style={{
                  transitionProperty: 'transform, color',
                  transitionDuration: '1000ms, 800ms',
                }}
              >Charis</span>{step > 1 && <span className="inline-block w-2 sm:w-4 md:w-5 transition-all" />}<span
                className={`inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  step === 1
                    ? 'translate-x-0'
                    : step === 2
                    ? 'translate-x-32 sm:translate-x-52 md:translate-x-68 lg:translate-x-80'
                    : 'translate-x-0'
                } ${
                  isTitlePurple
                    ? 'text-[#6c288b]'
                    : 'text-[#111111]'
                }`}
                style={{
                  transitionProperty: 'transform, color',
                  transitionDuration: '1000ms, 800ms',
                }}
              >Nation</span>
            </h1>

            {/* Devise / Baseline sous le titre (Apparaît une fois que le titre est descendu) */}
            <p
              className={`mt-4 sm:mt-6 font-serif text-base sm:text-xl md:text-2xl text-[#1E1E1E] max-w-4xl mx-auto px-4 leading-relaxed transition-all duration-800 ease-out ${
                isTitlePurple
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              Equiper les Saints afin qu’ils influencent leurs différentes sphères avec Christ.
            </p>
          </div>

        </div>

        {/* Indicateur pour passer l'intro */}
        {step < 3 && !hasInteracted && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-400 animate-pulse cursor-pointer">
            Cliquer pour passer l’introduction
          </div>
        )}
      </div>

      {/* =========================================================================
          3. BAS DE SECTION : FLUIDITÉ DE DÉFILEMENT VERS LA SECTION SUIVANTE
          ========================================================================= */}
      <div className="w-full pb-8 pt-4 flex items-center justify-center text-center">
        {step === 3 && isTitlePurple && (
          <a
            href="#vision"
            onClick={(e) => handleNavClick(e, '#vision')}
            className="inline-flex flex-col items-center gap-1.5 text-xs tracking-widest uppercase font-semibold text-[#6c288b]/70 hover:text-[#6c288b] transition-colors no-underline animate-[fadeIn_0.6s_ease]"
          >
            <span>Découvrir la suite</span>
            <div className="w-4 h-4 border-b-2 border-r-2 border-[#6c288b] rotate-45 animate-bounce" />
          </a>
        )}
      </div>
    </section>
  );
}
