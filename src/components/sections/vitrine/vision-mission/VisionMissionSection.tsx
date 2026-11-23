'use client';

import React from 'react';
import { Flame, Users, HeartHandshake, BookOpen, ArrowRight } from 'lucide-react';
import { VITRINE_CONFIG, type ChurchValue } from '@/lib/config/vitrine';
import { VitrineSectionHeader } from '@/components/sections/vitrine/hero/HeroCurtainStage';

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
    <section id="vision" className="relative pt-0 pb-14 sm:pb-20 bg-[#f2f2f2] overflow-x-clip">
      {/* Lumière d'ambiance diffuse issue du Hero (#ebe3f2 / #f8dfd2) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_12%_35%,rgba(235,227,242,0.85),transparent)] pointer-events-none" />

      <VitrineSectionHeader
        index="01"
        title="Vision & Mission"
        tag="Fondements & Convictions"
        description={VITRINE_CONFIG.missionText}
        sectionId="vision"
        theme="paper"
      />

      <div className="vitrine-stack-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {VITRINE_CONFIG.values.map((val: ChurchValue) => {
            const IconComponent = ICON_MAP[val.iconName] || Flame;
            return (
              <div
                key={val.id}
                className="group relative p-8 rounded-3xl bg-white border border-[#111111]/8 hover:border-[#6C288B]/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(108,40,139,0.10)] flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ebe3f2]/55 via-transparent to-[#f8dfd2]/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#111111] group-hover:bg-[#6C288B] flex items-center justify-center mb-6 shadow-md shadow-[#111111]/15 transition-all duration-300 group-hover:scale-105">
                    <IconComponent className="w-7 h-7 text-[#fc7d42] group-hover:text-[#f2f2f2] transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#111111] mb-3 group-hover:text-[#6C288B] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#111111]/70 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="relative pt-6 mt-6 border-t border-[#111111]/8 flex items-center gap-2 text-xs font-bold text-[#6C288B]">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#fc7d42] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111111] border border-[#111111]/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-[#f2f2f2]">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f2f2f2] mb-2">
              Une histoire de grâce écrite chaque jour
            </h4>
            <p className="text-sm text-[#f2f2f2]/75">
              Rencontrez les serviteurs et pasteurs consacrés qui conduisent l’assemblée dans la prière et la fidélité.
            </p>
          </div>
          <button
            onClick={scrollToTeam}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-[#fc7d42] text-[#f2f2f2] hover:text-[#111111] font-semibold text-sm border border-white/20 hover:border-[#fc7d42] backdrop-blur-md transition-all cursor-pointer whitespace-nowrap"
          >
            Découvrir notre équipe pastorale
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
