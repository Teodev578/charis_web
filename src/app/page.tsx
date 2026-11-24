'use client';

import React from 'react';
import VitrineHeader from '@/components/navigation/VitrineHeader';
import HeroCurtainStage from '@/components/sections/vitrine/hero/HeroCurtainStage';
import HeroSection from '@/components/sections/vitrine/hero/HeroSection';
import ChurchSection from '@/components/sections/vitrine/church/ChurchSection';
import AudioExtractsSection from '@/components/sections/vitrine/audio-extracts/AudioExtractsSection';
import VisitSection from '@/components/sections/vitrine/visit/VisitSection';
import DonationsSection from '@/components/sections/vitrine/donations/DonationsSection';
import VitrineFooter from '@/components/layout/VitrineFooter';
import StickyAudioPlayer from '@/components/player/StickyAudioPlayer';
import { useAudio } from '@/contexts/AudioContext';

export default function VitrinePage() {
  const { currentTrack } = useAudio();

  return (
    <div className="relative min-h-screen bg-[#f2f2f2] text-[#111111] font-jakarta selection:bg-[#6C288B]/15 selection:text-[#6C288B] overflow-x-clip">
      {/* 1. Sticky Navigation Header */}
      <VitrineHeader />

      {/* 2. Main OnePage Content Sections */}
      <main className="flex flex-col">
        {/* Section Hero sticky -> 4 piliers empilés (01 à 04) */}
        <HeroCurtainStage hero={<HeroSection />}>
          {/* 01 : L’Église (Vision & Valeurs / Équipe Pastorale) */}
          <ChurchSection />

          {/* 02 : Enseignements & Extraits Audio */}
          <AudioExtractsSection />

          {/* 03 : Nous Rejoindre (Cultes & Horaires / Plan & Accès) */}
          <VisitSection />

          {/* 04 : Soutenir la Mission */}
          <DonationsSection />
        </HeroCurtainStage>
      </main>

      {/* 3. Extended Footer */}
      <div className="relative z-20 shadow-[0_-24px_60px_rgba(17,17,17,0.24)]">
        <VitrineFooter />
      </div>

      {/* 4. Sticky Floating Player (Active whenever audio is loaded/playing) */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 shadow-[0_-10px_30px_rgba(17,17,17,0.14)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.7)] border-t border-border backdrop-blur-xl bg-surface/95 transition-all">
          <div className="max-w-5xl mx-auto">
            <StickyAudioPlayer />
          </div>
        </div>
      )}
    </div>
  );
}
