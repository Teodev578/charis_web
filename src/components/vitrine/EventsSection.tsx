'use client';

import React from 'react';
import { Calendar, Clock, MapPin, User, Sparkles } from 'lucide-react';
import { VITRINE_CONFIG, type ChurchEvent } from '../../lib/config/vitrine';

export default function EventsSection() {
  const getBadgeStyle = (type: ChurchEvent['type']) => {
    switch (type) {
      case 'Culte':
        return 'bg-[#572269] text-[#FBC906] border-[#FBC906]/40';
      case 'Formation':
        return 'bg-[#251230] text-[#7a3d91] border-[#7a3d91]/50';
      case 'Événement':
      default:
        return 'bg-[#FBC906]/20 text-[#FBC906] border-[#FBC906]/40';
    }
  };

  return (
    <section id="cultes" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1A0A21] border-t border-white/5">
      {/* Background ambient beam */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#572269]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FBC906]/20 text-[#FBC906] text-xs font-semibold uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Rassemblements de Grâce</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F5F2] tracking-tight mb-6">
            Prochains Cultes & Horaires
          </h2>
          <p className="text-base sm:text-lg text-[#F7F5F2]/75 leading-relaxed">
            Venez vivre des moments inoubliables dans la présence de Dieu. Chaque rencontre est une opportunité d’élévation et de restauration.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {VITRINE_CONFIG.events.map((evt: ChurchEvent) => (
            <div
              key={evt.id}
              className="group relative p-8 rounded-3xl bg-[#251230]/60 border border-white/10 hover:border-[#FBC906]/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(87,34,105,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Header with Type Badge & Day */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-xs font-bold text-[#FBC906] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    {evt.day}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getBadgeStyle(evt.type)}`}>
                    {evt.type}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F7F5F2] mb-4 group-hover:text-[#FBC906] transition-colors">
                  {evt.title}
                </h3>

                {/* Description */}
                {evt.description && (
                  <p className="text-sm text-[#F7F5F2]/70 leading-relaxed mb-6">
                    {evt.description}
                  </p>
                )}
              </div>

              {/* Meta details */}
              <div className="pt-6 border-t border-white/5 space-y-2.5 text-xs text-[#F7F5F2]/80">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#FBC906] shrink-0" />
                  <span className="font-semibold">{evt.time}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#FBC906] shrink-0" />
                  <span>{evt.speaker}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FBC906] shrink-0" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Culte du Dimanche Highlight Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#572269]/80 via-[#331942] to-[#1A0A21] border border-[#FBC906]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FBC906] block mb-2">
              Le grand rendez-vous de la semaine
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F5F2] mb-2">
              Rejoignez-nous ce Dimanche à 09h00
            </h4>
            <p className="text-sm text-[#F7F5F2]/75 max-w-xl">
              Sanctuaire principal de Charis Nation, Cocody Angré. Accueil fraternel et garderie pour les enfants dès 08h30.
            </p>
          </div>

          <a
            href="#localisation"
            className="px-8 py-4 rounded-full bg-[#FBC906] hover:bg-[#ffd633] text-[#1A0A21] font-bold text-sm shadow-[0_4px_20px_rgba(251,201,6,0.3)] transition-all cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95 no-underline"
          >
            Obtenir l’itinéraire
          </a>
        </div>
      </div>
    </section>
  );
}
