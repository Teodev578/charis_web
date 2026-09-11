'use client';

import React from 'react';
import { Flame, Users, HeartHandshake, BookOpen, ArrowRight, Compass } from 'lucide-react';
import { VITRINE_CONFIG, type ChurchValue } from '../../lib/config/vitrine';

const ICON_MAP = {
  Flame: Flame,
  Users: Users,
  HeartHandshake: HeartHandshake,
  BookOpen: BookOpen,
};

export default function VisionMissionSection() {
  const scrollToTeam = () => {
    const el = document.querySelector('#equipe');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vision" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1A0A21] border-t border-white/5 overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#572269]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FBC906]/20 text-[#FBC906] text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Fondements & Convictions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F5F2] tracking-tight mb-6">
            Vision & Mission de l’Église
          </h2>
          <p className="text-base sm:text-lg text-[#F7F5F2]/75 leading-relaxed">
            {VITRINE_CONFIG.missionText}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {VITRINE_CONFIG.values.map((val: ChurchValue) => {
            const IconComponent = ICON_MAP[val.iconName] || Flame;
            return (
              <div
                key={val.id}
                className="group relative p-8 rounded-3xl bg-[#251230]/60 border border-white/10 hover:border-[#FBC906]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(87,34,105,0.25)] flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FBC906]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#572269] to-[#7a3d91] flex items-center justify-center mb-6 shadow-md shadow-[#572269]/40 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-[#FBC906]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#F7F5F2] mb-3 group-hover:text-[#FBC906] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#F7F5F2]/70 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-[#FBC906]/80 group-hover:text-[#FBC906]">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#251230] via-[#331942] to-[#251230] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#F7F5F2] mb-2">
              Une histoire de grâce écrite chaque jour
            </h4>
            <p className="text-sm text-[#F7F5F2]/75">
              Rencontrez les serviteurs et pasteurs consacrés qui conduisent l’assemblée dans la prière et la fidélité.
            </p>
          </div>
          <button
            onClick={scrollToTeam}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5F2] font-semibold text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer whitespace-nowrap hover:border-[#FBC906]/50"
          >
            Découvrir notre équipe pastorale
          </button>
        </div>
      </div>
    </section>
  );
}
