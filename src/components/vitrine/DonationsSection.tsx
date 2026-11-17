'use client';

import React, { useState } from 'react';
import { Heart, Copy, Check, Smartphone, Landmark, ShieldCheck, Sparkles } from 'lucide-react';
import { VITRINE_CONFIG, type DonationMethod } from '../../lib/config/vitrine';

export default function DonationsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section id="dons" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#f2f2f2] border-t border-[#111111]/8 overflow-hidden">
      {/* Lumière radiale diffuse issue de la palette du Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(248,223,210,0.55),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#111111]/10 text-[#6C288B] text-xs font-semibold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 text-[#fc7d42] fill-[#fc7d42]" />
            <span>Partenariat & Générosité</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight mb-6">
            Soutenir la Mission de Grâce
          </h2>
          <p className="text-base sm:text-lg text-[#111111]/70 leading-relaxed mb-6">
            {VITRINE_CONFIG.donations.introduction}
          </p>

          {/* Biblical Verse Callout */}
          <div className="p-6 rounded-2xl bg-white border border-[#111111]/10 max-w-2xl mx-auto shadow-xs">
            <p className="font-serif italic text-sm sm:text-base text-[#6C288B] mb-1 leading-relaxed">
              {VITRINE_CONFIG.donations.verse}
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]/60">
              — {VITRINE_CONFIG.donations.verseReference}
            </span>
          </div>
        </div>

        {/* Donation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {VITRINE_CONFIG.donations.methods.map((method: DonationMethod) => {
            const isCopied = copiedId === method.id;
            const isBank = method.category === 'bank_transfer';

            return (
              <div
                key={method.id}
                className="group relative p-6 rounded-3xl bg-white border border-[#111111]/8 hover:border-[#6C288B]/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(108,40,139,0.10)] flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] group-hover:bg-[#6C288B] flex items-center justify-center text-[#fc7d42] group-hover:text-[#f2f2f2] shadow-md transition-colors">
                      {isBank ? <Landmark className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                    </div>
                    {method.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#ebe3f2] text-[#6C288B] border border-[#6C288B]/20">
                        {method.badge}
                      </span>
                    )}
                  </div>

                  {/* Method Title & Account info */}
                  <h3 className="font-serif text-lg font-bold text-[#111111] mb-1">
                    {method.provider}
                  </h3>
                  <p className="text-xs text-[#111111]/60 uppercase tracking-wider font-semibold mb-4">
                    {method.accountName}
                  </p>

                  {/* Number Box with Copy Action */}
                  <div className="p-3.5 rounded-2xl bg-[#f2f2f2] border border-[#111111]/10 mb-4 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#6C288B] truncate select-all">
                      {method.accountNumber}
                    </span>
                    <button
                      onClick={() => handleCopy(method.id, method.accountNumber)}
                      className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                        isCopied
                          ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/35'
                          : 'bg-white hover:bg-[#111111] text-[#111111] hover:text-[#f2f2f2] border border-[#111111]/10'
                      }`}
                      title="Copier le numéro"
                      aria-label="Copier"
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Instructions */}
                  <p className="text-xs text-[#111111]/70 leading-relaxed mb-4">
                    {method.instructions}
                  </p>
                </div>

                {/* Copied Feedback line */}
                <div className="pt-3 border-t border-[#111111]/8 flex items-center justify-center text-[11px] font-semibold text-[#111111]/55">
                  {isCopied ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Numéro copié dans le presse-papier !
                    </span>
                  ) : (
                    <span>Cliquer sur l’icône pour copier</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Gratitude Guarantee */}
        <div className="text-center max-w-xl mx-auto flex items-center justify-center gap-3 text-xs text-[#111111]/65">
          <ShieldCheck className="w-4 h-4 text-[#6C288B] shrink-0" />
          <span>Toutes les transactions sont directes, sécurisées et traçables auprès de nos institutions partenaires.</span>
        </div>
      </div>
    </section>
  );
}
