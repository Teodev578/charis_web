'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Headphones, ArrowRight, Volume2, Sparkles, Clock } from 'lucide-react';
import { useAudio, type Track } from '../../contexts/AudioContext';

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
        const { getMessages } = await import('../../lib/services/messages');
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
    <section id="enseignements" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1A0A21] border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#572269]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FBC906]/20 text-[#FBC906] text-xs font-semibold uppercase tracking-widest mb-4">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Édification Quotidienne</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F5F2] tracking-tight mb-6">
            Nos Derniers Enseignements
          </h2>
          <p className="text-base sm:text-lg text-[#F7F5F2]/75 leading-relaxed">
            Plongez dans la richesse de la prédication apostolique. Lancez un extrait instantanément sans interrompre votre lecture.
          </p>
        </div>

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
                    ? 'bg-[#331942] border-[#FBC906] shadow-[0_15px_35px_rgba(251,201,6,0.2)]'
                    : 'bg-[#251230]/70 border-white/10 hover:border-white/20 hover:bg-[#2b1539] hover:-translate-y-1'
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
                          ? 'bg-[#FBC906] text-[#1A0A21] scale-110 shadow-[0_0_25px_rgba(251,201,6,0.6)]'
                          : 'bg-white/20 hover:bg-[#FBC906] text-white hover:text-[#1A0A21] backdrop-blur-md border border-white/30 hover:scale-110'
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
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] font-semibold text-white/90 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#FBC906]" />
                    <span>{formatDuration(track.duration)}</span>
                  </div>

                  {/* Live Pulse when playing */}
                  {isThisPlaying && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#572269]/90 border border-[#FBC906]/50 text-[11px] font-bold text-[#FBC906] flex items-center gap-1.5 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      <span>Lecture en cours</span>
                    </div>
                  )}
                </div>

                {/* Track Details */}
                <h3 className="font-serif text-lg font-bold text-[#F7F5F2] mb-1.5 line-clamp-1 group-hover:text-[#FBC906] transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs text-[#F7F5F2]/70 font-medium line-clamp-1">
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#572269] to-[#7a3d91] text-[#F7F5F2] font-bold text-sm shadow-[0_6px_25px_rgba(87,34,105,0.4)] hover:shadow-[0_8px_30px_rgba(251,201,6,0.3)] hover:scale-105 active:scale-95 transition-all border border-white/10 no-underline"
          >
            <Headphones className="w-4 h-4 text-[#FBC906]" />
            <span>🎧 Explorer tous les enseignements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
