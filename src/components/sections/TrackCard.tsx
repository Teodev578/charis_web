'use client';

import React from 'react';
import Link from 'next/link';
import type { Track } from '../../contexts/AudioContext';

export interface TrackCardProps {
    track: Track;
    isPlaying?: boolean;
    onPlay?: (track: Track) => void;
    onFavoriteToggle?: (trackId: string) => void;
    showDuration?: boolean;
    layout?: 'card' | 'list';
}

export default function TrackCard({ 
    track, 
    isPlaying = false, 
    onPlay, 
    onFavoriteToggle, 
    showDuration = false, 
    layout = 'card' 
}: TrackCardProps) {
    
    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Avoid triggering track play when toggling favorite
        e.preventDefault();
        if (onFavoriteToggle) {
            onFavoriteToggle(track.id);
        }
    };

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleClick = () => {
        if (onPlay) {
            onPlay(track);
        }
    };

    return (
        <div 
            className={`group flex items-center justify-between bg-bg-surface p-3 rounded-[15px] cursor-pointer transition-all duration-200 border animate-[fadeIn_0.3s_ease_both] hover:bg-bg-surface-hover hover:shadow-md ${isPlaying ? 'border-brand-purple bg-bg-surface-hover shadow-[0_0_0_1px_var(--brand-purple),0_0_20px_rgba(87,34,105,0.15)]' : 'border-transparent'}`}
            onClick={handleClick}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative w-[50px] h-[50px] rounded-[10px] overflow-hidden shrink-0">
                    <img 
                        src={track.imageUrl || '/images/preacher_man.png'} 
                        alt={track.title} 
                        className="w-full h-full object-cover bg-black/5 transition-transform duration-300 group-hover:scale-110" 
                    />
                    {layout !== 'list' && (
                        <div className={`absolute inset-0 bg-[#0F0F23]/60 flex items-center justify-center transition-opacity duration-200 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] transition-transform duration-200 group-hover:scale-110">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 fill-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] transition-transform duration-200 group-hover:scale-110">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex flex-col">
                    <div className="font-bold text-[0.95rem] whitespace-nowrap overflow-hidden text-ellipsis mb-[0.15rem] font-[family-name:var(--font-plus-jakarta)]">{track.title}</div>
                    <div className="text-[0.8rem] text-text-muted whitespace-nowrap overflow-hidden text-ellipsis">
                        {track.subtitle}
                        {showDuration && track.duration && (
                            <span className="text-text-muted font-medium"> · {formatDuration(track.duration)}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                {layout === 'list' ? (
                    <div className="flex items-center gap-2">
                        {isPlaying && (
                            <div className="flex gap-[2px] h-[14px] items-end">
                                <div className="w-[3px] h-[60%] bg-text-main animate-[pulse_1s_infinite_alternate]" />
                                <div className="w-[3px] h-[100%] bg-text-main animate-[pulse_1s_infinite_alternate_0.3s]" />
                                <div className="w-[3px] h-[40%] bg-text-main animate-[pulse_1s_infinite_alternate_0.6s]" />
                                <div className="w-[3px] h-[80%] bg-text-main animate-[pulse_1s_infinite_alternate_0.9s]" />
                            </div>
                        )}
                        <button className="bg-transparent border-none cursor-pointer p-2 text-text-main flex items-center justify-center transition-transform duration-100 hover:scale-110" aria-label="Options" onClick={(e) => e.stopPropagation()}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="12" cy="19" r="2" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <>
                        {/* View detail link */}
                        <Link 
                            href={`/message/${track.id}`} 
                            className="bg-transparent border-none cursor-pointer p-2 text-text-muted flex items-center justify-center transition-all duration-200 no-underline hover:text-text-main hover:translate-x-[2px]"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Voir les détails"
                        >
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </Link>

                        {/* Favorite button — only show if handler is provided */}
                        {onFavoriteToggle && (
                            <button 
                                className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center transition-transform duration-100 hover:scale-110 text-text-main"
                                onClick={handleFavoriteClick}
                                aria-label={track.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                            >
                                <svg 
                                    className={`w-5 h-5 transition-all duration-200 stroke-[2.5px] ${track.isFavorite ? 'fill-[#FE3434] stroke-[#FE3434]' : 'fill-none stroke-currentColor'}`} 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
