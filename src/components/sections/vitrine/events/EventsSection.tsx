'use client';

import React from 'react';
import { Clock, MapPin, User, Sparkles } from 'lucide-react';
import { VITRINE_CONFIG, type ChurchEvent } from '@/lib/config/vitrine';
import { VitrineSectionHeader } from '@/components/sections/vitrine/hero/HeroCurtainStage';

export default function EventsSection() {
  const getBadgeStyle = (type: ChurchEvent['type']) => {
    switch (type) {
      case 'Culte':
        return 'bg-[#6C288B] text-[#f2f2f2] border-[#6C288B]';
      case 'Formation':
        return 'bg-[#ebe3f2] text-[#6C288B] border-[#6C288B]/25';
      case 'Événement':
      default:
        return 'bg-[#f8dfd2] text-[#111111] border-[#fc7d42]/45';
    }
  };

  return (
    <section id="cultes" className="relative pt-0 pb-14 sm:pb-20 bg-[#f2f2f2] overflow-x-clip">
      {/* Gradient diffus lavande issu du Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_35%,rgba(235,227,242,0.85),transparent)] pointer-events-none" />

      <VitrineSectionHeader
        index="04"
        title="Cultes & Horaires"
        tag="Rassemblements de Grâce"
        description="Venez vivre des moments inoubliables dans la présence de Dieu. Chaque rencontre est une opportunité d’élévation et de restauration."
        sectionId="cultes"
        theme="paper"
      />

      <div className="vitrine-stack-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {VITRINE_CONFIG.events.map((evt: ChurchEvent) => (
            <div
              key={evt.id}
              className="group relative p-8 rounded-3xl bg-white border border-[#111111]/8 hover:border-[#6C288B]/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(108,40,139,0.10)] flex flex-col justify-between"
            >
              <div>
                {/* Header with Type Badge & Day */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-xs font-bold text-[#6C288B] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#fc7d42]" />
                    {evt.day}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getBadgeStyle(evt.type)}`}>
                    {evt.type}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mb-4 group-hover:text-[#6C288B] transition-colors">
                  {evt.title}
                </h3>

                {/* Description */}
                {evt.description && (
                  <p className="text-sm text-[#111111]/70 leading-relaxed mb-6">
                    {evt.description}
                  </p>
                )}
              </div>

              {/* Meta details */}
              <div className="pt-6 border-t border-[#111111]/8 space-y-2.5 text-xs text-[#111111]/80">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#fc7d42] shrink-0" />
                  <span className="font-semibold">{evt.time}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#6C288B] shrink-0" />
                  <span>{evt.speaker}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#6C288B] shrink-0" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Culte du Dimanche Highlight Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#111111] via-[#22122b] to-[#111111] border border-[#6C288B]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-[#f2f2f2]">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#fc7d42] block mb-2">
              Le grand rendez-vous de la semaine
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#f2f2f2] mb-2">
              Rejoignez-nous ce Dimanche à 09h00
            </h4>
            <p className="text-sm text-[#f2f2f2]/75 max-w-xl">
              Sanctuaire principal de Charis Nation, Cocody Angré. Accueil fraternel et garderie pour les enfants dès 08h30.
            </p>
          </div>

          <a
            href="#localisation"
            className="px-8 py-4 rounded-full bg-[#fc7d42] hover:bg-[#FB5E17] text-[#111111] font-bold text-sm shadow-[0_4px_20px_rgba(252,125,66,0.3)] transition-all cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95 no-underline"
          >
            Obtenir l’itinéraire
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
