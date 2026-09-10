'use client';

import React from 'react';
import VitrineHeader from '../components/vitrine/VitrineHeader';
import HeroSection from '../components/vitrine/HeroSection';
import VisionMissionSection from '../components/vitrine/VisionMissionSection';
import PastoralTeamSection from '../components/vitrine/PastoralTeamSection';
import AudioExtractsSection from '../components/vitrine/AudioExtractsSection';
import EventsSection from '../components/vitrine/EventsSection';
import LocationHoursSection from '../components/vitrine/LocationHoursSection';
import DonationsSection from '../components/vitrine/DonationsSection';
import VitrineFooter from '../components/vitrine/VitrineFooter';
import StickyAudioPlayer from '../components/player/StickyAudioPlayer';
import { useAudio } from '../contexts/AudioContext';

export default function VitrinePage() {
  const { currentTrack } = useAudio();

  return (
    <div className="relative min-h-screen bg-[#1A0A21] text-[#F7F5F2] font-jakarta selection:bg-[#FBC906]/30 selection:text-[#FBC906] overflow-x-hidden">
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
        <div className="fixed bottom-0 left-0 right-0 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.7)] border-t border-white/10 backdrop-blur-xl bg-[#1A0A21]/95 transition-all">
          <div className="max-w-5xl mx-auto">
            <StickyAudioPlayer />
          </div>
        </div>
      )}
    </div>
  );
}
