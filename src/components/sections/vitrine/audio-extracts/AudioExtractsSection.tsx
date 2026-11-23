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
    <section id="enseignements" className="relative pt-0 pb-14 sm:pb-20 bg-[#111111] text-[#f2f2f2] overflow-x-clip">
      {/* Gradient radial diffus ancré sur #6C288B & #fc7d42 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_35%_45%,rgba(108,40,139,0.20),transparent)] pointer-events-none" />

      <VitrineSectionHeader
        index="03"
        title="Enseignements"
        tag="Édification Quotidienne"
        description="Plongez dans la richesse de la prédication apostolique. Lancez un extrait instantanément sans interrompre votre lecture."
        sectionId="enseignements"
        theme="ink"
      />

      <div className="vitrine-stack-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {featuredTracks.map((track) => {
            const isThisPlaying = isPlaying && currentTrack?.id === track.id;
            const isThisCurrent = currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track)}
                className={`group relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isThisCurrent
                    ? 'bg-[#1f1326] border-[#fc7d42] shadow-[0_15px_35px_rgba(252,125,66,0.18)]'
                    : 'bg-[#1A1A1A] border-white/10 hover:border-[#6C288B]/60 hover:bg-[#221a28] hover:-translate-y-1'
                }`}
              >
                {/* Image Cover */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 shadow-lg">
                  <img
                    src={track.imageUrl || '/images/preacher_man.png'}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play/Pause Button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrackClick(track);
                      }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                        isThisPlaying
                          ? 'bg-[#fc7d42] text-[#111111] scale-110 shadow-[0_0_25px_rgba(252,125,66,0.5)]'
                          : 'bg-white/20 hover:bg-[#fc7d42] text-white hover:text-[#111111] backdrop-blur-md border border-white/30 hover:scale-110'
                      }`}
                      aria-label={isThisPlaying ? 'Pause' : 'Lire'}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-sm text-[11px] font-semibold text-white/90 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#fc7d42]" />
                    <span>{formatDuration(track.duration)}</span>
                  </div>

                  {/* Live Pulse when playing */}
                  {isThisPlaying && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#6C288B]/95 border border-[#fc7d42]/50 text-[11px] font-bold text-[#f2f2f2] flex items-center gap-1.5 animate-pulse">
                      <Sparkles className="w-3 h-3 text-[#fc7d42]" />
                      <span>Lecture en cours</span>
                    </div>
                  )}
                </div>

                {/* Track Details */}
                <h3 className="font-serif text-lg font-bold text-[#f2f2f2] mb-1.5 line-clamp-1 group-hover:text-[#fc7d42] transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs text-[#f2f2f2]/70 font-medium line-clamp-1">
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#6C288B] to-[#893FB0] text-[#f2f2f2] font-bold text-sm shadow-[0_6px_25px_rgba(108,40,139,0.4)] hover:shadow-[0_8px_30px_rgba(252,125,66,0.28)] hover:scale-105 active:scale-95 transition-all border border-white/10 no-underline"
          >
            <Headphones className="w-4 h-4 text-[#fc7d42]" />
            <span>Explorer tous les enseignements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
