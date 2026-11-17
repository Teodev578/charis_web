'use client';

import React from 'react';
import { MapPin, Navigation, Clock, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { VITRINE_CONFIG } from '../../lib/config/vitrine';

export default function LocationHoursSection() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${VITRINE_CONFIG.churchName} ${VITRINE_CONFIG.address.street} ${VITRINE_CONFIG.address.city}`
  )}`;

  return (
    <section id="localisation" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#111111]/8 overflow-hidden">
      {/* Lumière diffuse issue du Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_75%_85%,rgba(235,227,242,0.6),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2f2f2] border border-[#111111]/10 text-[#6C288B] text-xs font-semibold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#fc7d42]" />
            <span>Nous Rencontrer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight mb-6">
            Localisation & Accès
          </h2>
          <p className="text-base sm:text-lg text-[#111111]/70 leading-relaxed">
            Notre sanctuaire est idéalement situé et facilement accessible. Rejoignez-nous ce week-end en toute sérénité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Hours Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Address Card */}
            <div className="p-8 rounded-3xl bg-[#f2f2f2] border border-[#111111]/8">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#111111]/15">
                  <MapPin className="w-6 h-6 text-[#fc7d42]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#111111]">
                    Sanctuaire Principal
                  </h3>
                  <span className="text-xs text-[#6C288B] font-semibold uppercase tracking-wider">
                    {VITRINE_CONFIG.churchName}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#111111]/80">
                <p className="font-medium text-[#111111]">
                  {VITRINE_CONFIG.address.street}
                </p>
                <p>{VITRINE_CONFIG.address.city}, {VITRINE_CONFIG.address.country}</p>
                <p className="text-xs text-[#111111]/70 italic bg-white p-3 rounded-xl border border-[#111111]/8">
                  Repère : {VITRINE_CONFIG.address.landmark}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#111111]/8">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#111111] hover:bg-[#6C288B] text-[#f2f2f2] font-bold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] no-underline"
                >
                  <Navigation className="w-4 h-4 text-[#fc7d42]" />
                  <span>Itinéraire Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Hours & Contact Card */}
            <div className="p-8 rounded-3xl bg-[#f2f2f2] border border-[#111111]/8 space-y-5">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#6C288B]" />
                <h4 className="font-serif text-lg font-bold text-[#111111]">
                  Horaires du Secrétariat
                </h4>
              </div>
              <p className="text-xs text-[#111111]/70">
                {VITRINE_CONFIG.contact.officeHours}
              </p>

              <div className="pt-4 border-t border-[#111111]/8 space-y-3 text-sm">
                <a
                  href={`tel:${VITRINE_CONFIG.contact.phone}`}
                  className="flex items-center gap-3 text-[#111111]/80 hover:text-[#6C288B] transition-colors no-underline"
                >
                  <Phone className="w-4 h-4 text-[#6C288B]" />
                  <span>{VITRINE_CONFIG.contact.phone}</span>
                </a>

                <a
                  href={`mailto:${VITRINE_CONFIG.contact.email}`}
                  className="flex items-center gap-3 text-[#111111]/80 hover:text-[#6C288B] transition-colors no-underline"
                >
                  <Mail className="w-4 h-4 text-[#6C288B]" />
                  <span>{VITRINE_CONFIG.contact.email}</span>
                </a>

                <a
                  href={VITRINE_CONFIG.socials.whatsapp || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#111111]/80 hover:text-[#6C288B] transition-colors no-underline"
                >
                  <MessageCircle className="w-4 h-4 text-[#fc7d42]" />
                  <span>Échanger sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#111111]/10 shadow-xl relative min-h-[380px] sm:min-h-[460px] bg-[#f2f2f2]">
            <iframe
              title="Plan d'accès Charis Nation"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '100%', filter: 'grayscale(25%) contrast(1.04)' }}
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-3.995%2C5.375%2C-3.960%2C5.395&amp;layer=mapnik&amp;marker=5.3852%2C-3.9785"
            />
            {/* Custom overlay badge */}
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-[#111111]/92 backdrop-blur-md border border-white/10 text-xs shadow-xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#fc7d42] animate-ping" />
              <span className="font-bold text-[#f2f2f2]">Sanctuaire Charis Nation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
