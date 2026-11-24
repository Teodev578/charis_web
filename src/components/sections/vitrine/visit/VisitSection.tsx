'use client';

import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  User,
  Sparkles,
  Navigation,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { VITRINE_CONFIG, type ChurchEvent } from '@/lib/config/vitrine';
import { VitrineSectionHeader } from '@/components/sections/vitrine/hero/HeroCurtainStage';

type VisitTab = 'cultes' | 'acces';

export default function VisitSection() {
  const [activeTab, setActiveTab] = useState<VisitTab>('cultes');

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${VITRINE_CONFIG.churchName} ${VITRINE_CONFIG.address.street} ${VITRINE_CONFIG.address.city}`
  )}`;

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
    <section id="rejoindre" className="relative pt-0 pb-0 bg-[#f2f2f2] overflow-x-clip">
      {/* Gradient diffus lavande issu du Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_25%_35%,rgba(235,227,242,0.85),transparent)] pointer-events-none" />

      <VitrineSectionHeader
        index="03"
        title="Nous Rejoindre"
        sectionId="rejoindre"
        theme="paper"
      />

      <div className="vitrine-stack-viewport">
        <div className="vitrine-stack-body">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full relative z-10">
            {/* Barre supérieure : Tag + Onglets */}
            <div className="grid grid-cols-12 items-center gap-x-4 sm:gap-x-6 gap-y-4 mb-8">
              <div className="col-span-12 sm:col-span-6 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#6C288B]">
                [ CULTES &amp; ACCÈS ]
              </div>
              <div className="col-span-12 sm:col-span-6 flex sm:justify-end">
                <div
                  role="tablist"
                  aria-label="Navigation de la section Nous Rejoindre"
                  className="inline-flex items-center gap-1 bg-white border border-[#111111]/10 p-1 rounded-full shadow-xs"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'cultes'}
                    onClick={() => setActiveTab('cultes')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'cultes'
                        ? 'bg-[#111111] text-[#f2f2f2] shadow-xs'
                        : 'text-[#111111]/70 hover:text-[#111111]'
                    }`}
                  >
                    Cultes &amp; Horaires
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'acces'}
                    onClick={() => setActiveTab('acces')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'acces'
                        ? 'bg-[#111111] text-[#f2f2f2] shadow-xs'
                        : 'text-[#111111]/70 hover:text-[#111111]'
                    }`}
                  >
                    Plan &amp; Accès
                  </button>
                </div>
              </div>
            </div>

            {activeTab === 'cultes' ? (
              <div role="tabpanel" aria-label="Cultes et Horaires">
                {/* Events Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-8">
                  {VITRINE_CONFIG.events.map((evt: ChurchEvent) => (
                    <div
                      key={evt.id}
                      className="group relative p-6 rounded-2xl bg-white border border-[#111111]/8 hover:border-[#6C288B]/35 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(108,40,139,0.10)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-xs font-bold text-[#6C288B] uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#fc7d42]" />
                            {evt.day}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getBadgeStyle(evt.type)}`}>
                            {evt.type}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#111111] mb-3 group-hover:text-[#6C288B] transition-colors">
                          {evt.title}
                        </h3>

                        {evt.description && (
                          <p className="text-sm text-[#111111]/70 leading-relaxed mb-5">
                            {evt.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-[#111111]/8 space-y-2 text-xs text-[#111111]/80">
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
                <div className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#6C288B]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-[#f2f2f2]">
                  <div className="text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#fc7d42] block mb-1.5">
                      Le grand rendez-vous de la semaine
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f2f2f2] mb-1.5">
                      Rejoignez-nous ce Dimanche à 09h00
                    </h4>
                    <p className="text-sm text-[#f2f2f2]/75 max-w-xl">
                      Sanctuaire principal de Charis Nation, Cocody Angré. Accueil fraternel et garderie pour les enfants dès 08h30.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('acces')}
                    className="px-7 py-3.5 rounded-full bg-[#fc7d42] hover:bg-[#FB5E17] text-[#111111] font-bold text-sm shadow-[0_4px_20px_rgba(252,125,66,0.3)] transition-all cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95"
                  >
                    Voir le plan d’accès
                  </button>
                </div>
              </div>
            ) : (
              <div role="tabpanel" aria-label="Plan et Accès">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Unified Address & Contact Card (5 cols) */}
                  <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#111111]/8 flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-3.5 mb-5">
                        <div className="w-11 h-11 rounded-2xl bg-[#111111] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#111111]/15">
                          <MapPin className="w-5 h-5 text-[#fc7d42]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#111111]">
                            Sanctuaire Principal
                          </h3>
                          <span className="text-xs text-[#6C288B] font-semibold uppercase tracking-wider">
                            {VITRINE_CONFIG.churchName}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-sm text-[#111111]/80 mb-5">
                        <p className="font-medium text-[#111111]">{VITRINE_CONFIG.address.street}</p>
                        <p>
                          {VITRINE_CONFIG.address.city}, {VITRINE_CONFIG.address.country}
                        </p>
                        <p className="text-xs text-[#111111]/70 italic bg-[#f2f2f2] p-3 rounded-xl border border-[#111111]/8">
                          Repère : {VITRINE_CONFIG.address.landmark}
                        </p>
                      </div>

                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#111111] hover:bg-[#6C288B] text-[#f2f2f2] font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] no-underline"
                      >
                        <Navigation className="w-4 h-4 text-[#fc7d42]" />
                        <span>Itinéraire Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="pt-5 border-t border-[#111111]/8 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#6C288B] shrink-0" />
                        <span className="font-serif text-sm font-bold text-[#111111]">
                          Horaires du Secrétariat :
                        </span>
                        <span className="text-xs text-[#111111]/70">
                          {VITRINE_CONFIG.contact.officeHours}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm pt-1">
                        <a
                          href={`tel:${VITRINE_CONFIG.contact.phone}`}
                          className="flex items-center gap-2.5 text-[#111111]/80 hover:text-[#6C288B] transition-colors no-underline"
                        >
                          <Phone className="w-4 h-4 text-[#6C288B] shrink-0" />
                          <span>{VITRINE_CONFIG.contact.phone}</span>
                        </a>

                        <a
                          href={`mailto:${VITRINE_CONFIG.contact.email}`}
                          className="flex items-center gap-2.5 text-[#111111]/80 hover:text-[#6C288B] transition-colors no-underline"
                        >
                          <Mail className="w-4 h-4 text-[#6C288B] shrink-0" />
                          <span>{VITRINE_CONFIG.contact.email}</span>
                        </a>

                        <a
                          href={VITRINE_CONFIG.socials.whatsapp || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 text-[#111111]/80 hover:text-[#6C288B] transition-colors no-underline"
                        >
                          <MessageCircle className="w-4 h-4 text-[#fc7d42] shrink-0" />
                          <span>Échanger sur WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Map Embed Column (7 cols) */}
                  <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#111111]/10 shadow-lg relative min-h-[340px] bg-white">
                    <iframe
                      title="Plan d'accès Charis Nation"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '100%', filter: 'grayscale(25%) contrast(1.04)' }}
                      loading="lazy"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-3.995%2C5.375%2C-3.960%2C5.395&amp;layer=mapnik&amp;marker=5.3852%2C-3.9785"
                    />
                    <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#111111]/92 backdrop-blur-md border border-white/10 text-xs shadow-xl flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#fc7d42] animate-ping" />
                      <span className="font-bold text-[#f2f2f2]">Sanctuaire Charis Nation</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
