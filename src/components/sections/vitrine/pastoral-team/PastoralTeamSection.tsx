'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { VITRINE_CONFIG, type Pastor } from '@/lib/config/vitrine';
import { VitrineSectionHeader } from '@/components/sections/vitrine/hero/HeroCurtainStage';

export default function PastoralTeamSection() {
  return (
    <section id="equipe" className="relative pt-0 pb-14 sm:pb-20 bg-white overflow-x-clip">
      {/* Lumière diffuse issue de la palette du Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_90%_30%,rgba(248,223,210,0.6),transparent)] pointer-events-none" />

      <VitrineSectionHeader
        index="02"
        title="Équipe Pastorale"
        tag="Conducteurs Spirituels"
        description="Des hommes et femmes oints, consacrés au service du troupeau de Dieu, guidés par la sagesse de la Parole et la communion fraternelle."
        sectionId="equipe"
        theme="white"
      />

      <div className="vitrine-stack-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Pastor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VITRINE_CONFIG.pastors.map((pastor: Pastor) => (
            <div
              key={pastor.id}
              className="group relative p-8 rounded-3xl bg-[#f2f2f2] border border-[#111111]/8 hover:border-[#6C288B]/35 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)] flex flex-col items-center text-center"
            >
              {/* Photo Circulaire avec contour Pourpre & Orange du Hero */}
              <div className="relative mb-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#6C288B] via-[#fc7d42] to-[#6C288B] shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={pastor.imageUrl}
                      alt={pastor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#111111] border-2 border-[#f2f2f2] flex items-center justify-center text-white shadow-md">
                  <Quote className="w-3.5 h-3.5 text-[#fc7d42]" />
                </div>
              </div>

              {/* Pastor Details */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mb-1.5 group-hover:text-[#6C288B] transition-colors">
                {pastor.name}
              </h3>
              <p className="text-xs font-semibold text-[#6C288B] uppercase tracking-wider mb-4">
                {pastor.role}
              </p>
              <p className="text-sm text-[#111111]/70 leading-relaxed max-w-xs">
                {pastor.bio}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
