'use client';

import React from 'react';
import Link from 'next/link';
import { Headphones, ArrowDown, Sparkles, ShieldCheck, Heart, Flame } from 'lucide-react';
import { VITRINE_CONFIG } from '../../lib/config/vitrine';

export default function HeroSection() {
  const scrollToVision = () => {
    const el = document.querySelector('#vision');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#1A0A21]">
      {/* Dynamic Spiritual Glow Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#572269]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-[#FBC906]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[450px] h-[450px] bg-[#7a3d91]/25 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Star / Cross Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F7F5F2 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#FBC906]/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(251,201,6,0.15)] animate-[fadeIn_0.6s_ease]">
          <Sparkles className="w-4 h-4 text-[#FBC906]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F7F5F2]/90">
            Sanctuaire de Grâce & d’Édification
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7F5F2] leading-[1.1] mb-6">
          Bienvenue à{' '}
          <span className="bg-gradient-to-r from-[#FBC906] via-[#ffd95b] to-[#f4ad02] bg-clip-text text-transparent">
            {VITRINE_CONFIG.churchName}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#F7F5F2]/80 font-normal max-w-3xl mx-auto mb-10 leading-relaxed">
          {VITRINE_CONFIG.tagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/ecouter"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#572269] to-[#8737a6] text-[#F7F5F2] font-bold text-base shadow-[0_8px_30px_rgba(87,34,105,0.6)] hover:shadow-[0_10px_35px_rgba(251,201,6,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all border border-white/20 no-underline"
          >
            <Headphones className="w-5 h-5 text-[#FBC906]" />
            <span>🎧 Écouter nos enseignements</span>
          </Link>

          <button
            onClick={scrollToVision}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-[#F7F5F2] font-semibold text-base border border-white/15 backdrop-blur-md transition-all cursor-pointer hover:border-[#FBC906]/40"
          >
            <span>Découvrir notre vision</span>
            <ArrowDown className="w-4 h-4 text-[#FBC906]" />
          </button>
        </div>

        {/* Community Proof / Pillars preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/10 text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#572269]/40 border border-[#572269] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-[#FBC906]" />
            </div>
            <div>
              <p className="text-xs text-[#F7F5F2]/60 uppercase tracking-wider font-semibold">Parole vivante</p>
              <p className="text-sm font-bold text-[#F7F5F2]">Enseignement de la grâce</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#572269]/40 border border-[#572269] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#FBC906]" />
            </div>
            <div>
              <p className="text-xs text-[#F7F5F2]/60 uppercase tracking-wider font-semibold">Célébration</p>
              <p className="text-sm font-bold text-[#F7F5F2]">Cultes tous les Dimanches</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#572269]/40 border border-[#572269] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-[#FBC906]" />
            </div>
            <div>
              <p className="text-xs text-[#F7F5F2]/60 uppercase tracking-wider font-semibold">Famille</p>
              <p className="text-sm font-bold text-[#F7F5F2]">Communion & compassion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
