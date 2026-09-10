'use client';

import React from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { Play, Pause, RotateCcw, RotateCw } from 'lucide-react';

export default function StickyAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    skip,
    currentTime,
    duration,
    seek,
  } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    seek(percent * duration);
  };

  return (
    <div className="w-full bg-surface p-4 flex flex-col gap-2 z-20 select-none animate-[slideUp_0.3s_ease]">
      {/* Progress Bar */}
      <div className="w-full flex items-center gap-3">
        <span className="text-xs font-semibold text-muted min-w-[35px] text-right">
          {formatTime(currentTime)}
        </span>
        <div 
          className="flex-1 h-3 flex items-center relative cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div className="w-full h-1 bg-card rounded-full relative overflow-hidden group-hover:h-1.5 transition-all">
            <div 
              className="h-full bg-brand-yellow rounded-full" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div 
            className="absolute w-2.5 h-2.5 rounded-full bg-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `calc(${progressPercent}% - 5px)` }}
          />
        </div>
        <span className="text-xs font-semibold text-muted min-w-[35px]">
          {formatTime(duration)}
        </span>
      </div>

      {/* Control Details Row */}
      <div className="flex items-center justify-between">
        {/* Left: Artwork & Details */}
        <div className="flex items-center gap-3 min-w-0 max-w-[60%]">
          <img 
            src={currentTrack.imageUrl || '/images/preacher_man.png'} 
            alt={currentTrack.title} 
            className="w-11 h-11 rounded-lg object-cover bg-card flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-main truncate m-0">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-muted truncate m-0 mt-0.5">
              {currentTrack.subtitle || "Charis Nation"}
            </p>
          </div>
        </div>

        {/* Center: Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => skip(-10)} 
            className="p-2 rounded-lg text-muted hover:text-main hover:bg-card transition-all cursor-pointer"
            title="Reculer de 10s"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button 
            onClick={togglePlay} 
            className="w-10 h-10 rounded-xl bg-main text-base flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 text-surface shadow-md"
            title={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current text-surface" />
            ) : (
              <Play className="w-4 h-4 fill-current text-surface ml-0.5" />
            )}
          </button>
          
          <button 
            onClick={() => skip(10)} 
            className="p-2 rounded-lg text-muted hover:text-main hover:bg-card transition-all cursor-pointer"
            title="Avancer de 10s"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
