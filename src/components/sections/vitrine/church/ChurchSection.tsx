'use client';

import React, { useState } from 'react';
import { Flame, Users, HeartHandshake, BookOpen, ArrowRight, Quote } from 'lucide-react';
import { VITRINE_CONFIG, type ChurchValue, type Pastor } from '@/lib/config/vitrine';
import { VitrineSectionHeader } from '@/components/sections/vitrine/hero/HeroCurtainStage';

const ICON_MAP = {
  Flame: Flame,
  Users: Users,
  HeartHandshake: HeartHandshake,
  BookOpen: BookOpen,
};

type ChurchTab = 'vision' | 'equipe';

export default function ChurchSection() {
  const [activeTab, setActiveTab] = useState<ChurchTab>('vision');

  return (
    <section id="eglise" className="relative pt-0 pb-0 bg-[#f2f2f2] overflow-x-clip">
      {/* Lumière d'ambiance diffuse issue du Hero (#ebe3f2 / #f8dfd2) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_12%_35%,rgba(235,227,242,0.85),transparent)] pointer-events-none" />

      <VitrineSectionHeader
        index="01"
        title="L’Église"
        sectionId="eglise"
        theme="paper"
      />

      <div className="vitrine-stack-viewport">
        <div className="vitrine-stack-body">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full relative z-10">
            {/* Barre supérieure : Tag + Onglets */}
            <div className="grid grid-cols-12 items-center gap-x-4 sm:gap-x-6 gap-y-4 mb-8">
              <div className="col-span-12 sm:col-span-6 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#6C288B]">
                [ FONDEMENTS &amp; LEADERSHIP ]
              </div>
              <div className="col-span-12 sm:col-span-6 flex sm:justify-end">
                <div
                  role="tablist"
                  aria-label="Navigation de la section L’Église"
                  className="inline-flex items-center gap-1 bg-white border border-[#111111]/10 p-1 rounded-full shadow-xs"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'vision'}
                    onClick={() => setActiveTab('vision')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'vision'
                        ? 'bg-[#111111] text-[#f2f2f2] shadow-xs'
                        : 'text-[#111111]/70 hover:text-[#111111]'
                    }`}
                  >
                    Vision &amp; Valeurs
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'equipe'}
                    onClick={() => setActiveTab('equipe')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'equipe'
                        ? 'bg-[#111111] text-[#f2f2f2] shadow-xs'
                        : 'text-[#111111]/70 hover:text-[#111111]'
                    }`}
                  >
                    Équipe Pastorale
                  </button>
                </div>
              </div>
            </div>

            {activeTab === 'vision' ? (
              <div role="tabpanel" aria-label="Vision et Valeurs">
                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {VITRINE_CONFIG.values.map((val: ChurchValue) => {
                    const IconComponent = ICON_MAP[val.iconName] || Flame;
                    return (
                      <div
                        key={val.id}
                        className="group relative p-6 rounded-2xl bg-white border border-[#111111]/8 hover:border-[#6C288B]/35 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(108,40,139,0.10)] flex flex-col justify-between"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ebe3f2]/55 via-transparent to-[#f8dfd2]/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-[#111111] group-hover:bg-[#6C288B] flex items-center justify-center mb-5 shadow-md shadow-[#111111]/15 transition-all duration-300 group-hover:scale-105">
                            <IconComponent className="w-6 h-6 text-[#fc7d42] group-hover:text-[#f2f2f2] transition-colors" />
                          </div>
                          <h3 className="font-serif text-xl font-bold text-[#111111] mb-2.5 group-hover:text-[#6C288B] transition-colors">
                            {val.title}
                          </h3>
                          <p className="text-sm text-[#111111]/70 leading-relaxed">
                            {val.description}
                          </p>
                        </div>

                        <div className="relative pt-4 mt-5 border-t border-[#111111]/8 flex items-center gap-2 text-xs font-bold text-[#6C288B]">
                          <span>En savoir plus</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#fc7d42] transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Compact Callout */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#111111]/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-[#f2f2f2]">
                  <div className="max-w-2xl text-center md:text-left">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#f2f2f2] mb-1.5">
                      Une histoire de grâce écrite chaque jour
                    </h4>
                    <p className="text-sm text-[#f2f2f2]/75">
                      {VITRINE_CONFIG.missionText}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('equipe')}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-[#fc7d42] text-[#f2f2f2] hover:text-[#111111] font-semibold text-sm border border-white/20 hover:border-[#fc7d42] backdrop-blur-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    Découvrir notre équipe pastorale
                  </button>
                </div>
              </div>
            ) : (
              <div role="tabpanel" aria-label="Équipe Pastorale">
                {/* Pastor Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {VITRINE_CONFIG.pastors.map((pastor: Pastor) => (
                    <div
                      key={pastor.id}
                      className="group relative p-6 rounded-2xl bg-white border border-[#111111]/8 hover:border-[#6C288B]/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(17,17,17,0.08)] flex flex-col items-center text-center"
                    >
                      <div className="relative mb-5">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#6C288B] via-[#fc7d42] to-[#6C288B] shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <img
                              src={pastor.imageUrl}
                              alt={pastor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#111111] border-2 border-white flex items-center justify-center text-white shadow-md">
                          <Quote className="w-3.5 h-3.5 text-[#fc7d42]" />
                        </div>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#111111] mb-1 group-hover:text-[#6C288B] transition-colors">
                        {pastor.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#6C288B] uppercase tracking-wider mb-3">
                        {pastor.role}
                      </p>
                      <p className="text-sm text-[#111111]/70 leading-relaxed max-w-xs">
                        {pastor.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
