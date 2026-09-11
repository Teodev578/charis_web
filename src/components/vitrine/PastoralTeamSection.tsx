'use client';

import React from 'react';
import { Users, Quote } from 'lucide-react';
import { VITRINE_CONFIG, type Pastor } from '../../lib/config/vitrine';

export default function PastoralTeamSection() {
  return (
    <section id="equipe" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1A0A21] border-t border-white/5 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#FBC906]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FBC906]/20 text-[#FBC906] text-xs font-semibold uppercase tracking-widest mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Conducteurs Spirituels</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F5F2] tracking-tight mb-6">
            L’Équipe Pastorale
          </h2>
          <p className="text-base sm:text-lg text-[#F7F5F2]/75 leading-relaxed">
            Des hommes et femmes oints, consacrés au service du troupeau de Dieu, guidés par la sagesse de la Parole et la communion fraternelle.
          </p>
        </div>

        {/* Pastor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VITRINE_CONFIG.pastors.map((pastor: Pastor) => (
            <div
              key={pastor.id}
              className="group relative p-8 rounded-3xl bg-[#251230]/50 border border-white/10 hover:border-[#FBC906]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(87,34,105,0.3)] flex flex-col items-center text-center"
            >
              {/* Photo Circulaire avec contour Or & Violet */}
              <div className="relative mb-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#572269] via-[#FBC906] to-[#572269] shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#1A0A21]">
                    <img
                      src={pastor.imageUrl}
                      alt={pastor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#572269] border-2 border-[#1A0A21] flex items-center justify-center text-white shadow-md">
                  <Quote className="w-3.5 h-3.5 text-[#FBC906]" />
                </div>
              </div>

              {/* Pastor Details */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F7F5F2] mb-1.5 group-hover:text-[#FBC906] transition-colors">
                {pastor.name}
              </h3>
              <p className="text-xs font-semibold text-[#FBC906] uppercase tracking-wider mb-4">
                {pastor.role}
              </p>
              <p className="text-sm text-[#F7F5F2]/70 leading-relaxed max-w-xs">
                {pastor.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
