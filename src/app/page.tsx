'use client';

import React from 'react';
import VitrineHeader from '@/components/navigation/VitrineHeader';
import HeroSection from '@/components/sections/vitrine/hero/HeroSection';
import VisionMissionSection from '@/components/sections/vitrine/VisionMissionSection';
import PastoralTeamSection from '@/components/sections/vitrine/PastoralTeamSection';
import AudioExtractsSection from '@/components/sections/vitrine/AudioExtractsSection';
import EventsSection from '@/components/sections/vitrine/EventsSection';
import LocationHoursSection from '@/components/sections/vitrine/LocationHoursSection';
import DonationsSection from '@/components/sections/vitrine/DonationsSection';
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
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Vision & Mission */}
        <VisionMissionSection />

        {/* Section 3: Pastoral Team */}
        <PastoralTeamSection />

        {/* Section 4: Audio Extracts & Mini-Player */}
        <AudioExtractsSection />

        {/* Section 5: Upcoming Cultes & Events */}
        <EventsSection />

        {/* Section 6: Location & Operating Hours */}
        <LocationHoursSection />

        {/* Section 7: Donations & Support */}
        <DonationsSection />
      </main>

      {/* 3. Extended Footer */}
      <VitrineFooter />

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
