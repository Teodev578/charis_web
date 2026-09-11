'use client';

import React from 'react';
import { MapPin, Navigation, Clock, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { VITRINE_CONFIG } from '../../lib/config/vitrine';

export default function LocationHoursSection() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${VITRINE_CONFIG.churchName} ${VITRINE_CONFIG.address.street} ${VITRINE_CONFIG.address.city}`
  )}`;

  return (
    <section id="localisation" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1A0A21] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#572269]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FBC906]/20 text-[#FBC906] text-xs font-semibold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nous Rencontrer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F5F2] tracking-tight mb-6">
            Localisation & Accès
          </h2>
          <p className="text-base sm:text-lg text-[#F7F5F2]/75 leading-relaxed">
            Notre sanctuaire est idéalement situé et facilement accessible. Rejoignez-nous ce week-end en toute sérénité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Hours Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Address Card */}
            <div className="p-8 rounded-3xl bg-[#251230]/70 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#572269] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#572269]/40">
                  <MapPin className="w-6 h-6 text-[#FBC906]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F7F5F2]">
                    Sanctuaire Principal
                  </h3>
                  <span className="text-xs text-[#FBC906] font-semibold uppercase tracking-wider">
                    {VITRINE_CONFIG.churchName}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#F7F5F2]/80">
                <p className="font-medium text-[#F7F5F2]">
                  {VITRINE_CONFIG.address.street}
                </p>
                <p>{VITRINE_CONFIG.address.city}, {VITRINE_CONFIG.address.country}</p>
                <p className="text-xs text-[#F7F5F2]/60 italic bg-white/5 p-3 rounded-xl border border-white/5">
                  Repère : {VITRINE_CONFIG.address.landmark}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#FBC906] hover:bg-[#ffd633] text-[#1A0A21] font-bold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] no-underline"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Itinéraire Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Hours & Contact Card */}
            <div className="p-8 rounded-3xl bg-[#251230]/70 border border-white/10 backdrop-blur-sm space-y-5">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#FBC906]" />
                <h4 className="font-serif text-lg font-bold text-[#F7F5F2]">
                  Horaires du Secrétariat
                </h4>
              </div>
              <p className="text-xs text-[#F7F5F2]/70">
                {VITRINE_CONFIG.contact.officeHours}
              </p>

              <div className="pt-4 border-t border-white/5 space-y-3 text-sm">
                <a
                  href={`tel:${VITRINE_CONFIG.contact.phone}`}
                  className="flex items-center gap-3 text-[#F7F5F2]/80 hover:text-[#FBC906] transition-colors no-underline"
                >
                  <Phone className="w-4 h-4 text-[#FBC906]" />
                  <span>{VITRINE_CONFIG.contact.phone}</span>
                </a>

                <a
                  href={`mailto:${VITRINE_CONFIG.contact.email}`}
                  className="flex items-center gap-3 text-[#F7F5F2]/80 hover:text-[#FBC906] transition-colors no-underline"
                >
                  <Mail className="w-4 h-4 text-[#FBC906]" />
                  <span>{VITRINE_CONFIG.contact.email}</span>
                </a>

                <a
                  href={VITRINE_CONFIG.socials.whatsapp || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#F7F5F2]/80 hover:text-[#FBC906] transition-colors no-underline"
                >
                  <MessageCircle className="w-4 h-4 text-[#FBC906]" />
                  <span>Échanger sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[380px] sm:min-h-[460px] bg-[#251230]">
            <iframe
              title="Plan d'accès Charis Nation"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '100%', filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-3.995%2C5.375%2C-3.960%2C5.395&amp;layer=mapnik&amp;marker=5.3852%2C-3.9785"
            />
            {/* Custom overlay badge */}
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-[#1A0A21]/90 backdrop-blur-md border border-white/10 text-xs shadow-xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#FBC906] animate-ping" />
              <span className="font-bold text-[#F7F5F2]">Sanctuaire Charis Nation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
