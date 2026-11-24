'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Headphones, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { useAudio, type Track } from '@/contexts/AudioContext';
import { VitrineSectionHeader } from '@/components/sections/vitrine/hero/HeroCurtainStage';

const DEFAULT_FEATURED: Track[] = [
  {
    id: 'track-1',
    title: 'La foi qui déplace les montagnes',
    subtitle: 'Rev. Israel Watchman',
    imageUrl: '/images/preacher_man.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 1800,
  },
  {
    id: 'track-2',
    title: 'Rencontre avec la grâce divine',
    subtitle: 'Rev. Israel Watchman',
    imageUrl: '/images/worship_woman.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 2400,
  },
  {
    id: 'track-3',
    title: 'Les secrets du cœur de Dieu',
    subtitle: 'Rev. Israel Watchman',
    imageUrl: '/images/sunset_faith.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 2100,
  },
];

export default function AudioExtractsSection() {
  const [featuredTracks, setFeaturedTracks] = useState<Track[]>(DEFAULT_FEATURED);
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  useEffect(() => {
    const fetchRecentMessages = async () => {
      try {
        const { getMessages } = await import('@/lib/services/messages');
        const messages = await getMessages({ limit: 3 });
        if (messages && messages.length > 0) {
          setFeaturedTracks(
            messages.map((m) => ({
              id: m.id,
              title: m.titre,
              subtitle: m.orateur,
              imageUrl: m.image_url || '/images/preacher_man.png',
              audioUrl: m.audio_url,
              duration: m.duree_secondes,
            }))
          );
        }
      } catch {
        // Silent fallback to default featured tracks
      }
    };

    fetchRecentMessages();
  }, []);

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '30 min';
    const m = Math.floor(seconds / 60);
    return `${m} min`;
  };

  return (
    <section id="enseignements" className="relative pt-0 pb-0 bg-white text-[#111111] overflow-x-clip">
      {/* Lumière diffuse claire cohérente avec la base du Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_25%,rgba(235,227,242,0.55),transparent)] pointer-events-none" />

      <VitrineSectionHeader
        index="02"
        title="Enseignements"
        sectionId="enseignements"
        theme="white"
      />

      <div className="vitrine-stack-viewport">
        <div className="vitrine-stack-body">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 w-full relative z-10">
            <div className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#6C288B] mb-8">
              [ ÉDIFICATION QUOTIDIENNE ]
            </div>

            {/* Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {featuredTracks.map((track) => {
                const isThisPlaying = isPlaying && currentTrack?.id === track.id;
                const isThisCurrent = currentTrack?.id === track.id;

                return (
                  <div
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    className={`group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isThisCurrent
                        ? 'border-[#6C288B] bg-[#f7f2fb] shadow-[0_14px_32px_rgba(108,40,139,0.12)]'
                        : 'bg-[#f2f2f2] border-[#111111]/10 hover:border-[#6C288B]/40 hover:bg-white hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(17,17,17,0.08)]'
                    }`}
                  >
                    {/* Image Cover */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md">
                      <img
                        src={track.imageUrl || '/images/preacher_man.png'}
                        alt={track.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Play/Pause Button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTrackClick(track);
                          }}
                          className={`w-13 h-13 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                            isThisPlaying
                              ? 'bg-[#fc7d42] text-[#111111] scale-110 shadow-[0_0_25px_rgba(252,125,66,0.45)]'
                              : 'bg-white/25 hover:bg-[#fc7d42] text-white hover:text-[#111111] backdrop-blur-md border border-white/40 hover:scale-110'
                          }`}
                          aria-label={isThisPlaying ? 'Pause' : 'Lire'}
                        >
                          {isThisPlaying ? (
                            <Pause className="w-5 h-5 fill-current" />
                          ) : (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          )}
                        </button>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-white/95 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#fc7d42]" />
                        <span>{formatDuration(track.duration)}</span>
                      </div>

                      {/* Live Pulse when playing */}
                      {isThisPlaying && (
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#6C288B] border border-[#fc7d42]/50 text-[11px] font-bold text-[#f2f2f2] flex items-center gap-1.5 animate-pulse">
                          <Sparkles className="w-3 h-3 text-[#fc7d42]" />
                          <span>Lecture en cours</span>
                        </div>
                      )}
                    </div>

                    {/* Track Details */}
                    <h3 className="font-serif text-lg font-bold text-[#111111] mb-1 line-clamp-1 group-hover:text-[#6C288B] transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-[#111111]/65 font-medium line-clamp-1">
                      {track.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA to Audio App */}
            <div className="text-center">
              <Link
                href="/ecouter"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#6C288B] text-[#f2f2f2] font-bold text-sm shadow-[0_6px_24px_rgba(17,17,17,0.16)] hover:shadow-[0_8px_28px_rgba(108,40,139,0.28)] hover:scale-105 active:scale-95 transition-all border border-[#111111]/10 no-underline"
              >
                <Headphones className="w-4 h-4 text-[#fc7d42]" />
                <span>Explorer tous les enseignements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
