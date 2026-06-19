'use client';

import React from 'react';
import Link from 'next/link';

export default function TrackCard({ track, isPlaying, onPlay, onFavoriteToggle, showDuration }) {
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Avoid triggering track play when toggling favorite
        e.preventDefault();
        if (onFavoriteToggle) {
            onFavoriteToggle(track.id);
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleClick = (e) => {
        if (onPlay) {
            onPlay(track);
        }
    };

    return (
        <div 
            className={`track-card ${isPlaying ? 'playing' : ''}`}
            onClick={handleClick}
        >
            <div className="track-info-section">
                <div className="track-artwork-container">
                    <img 
                        src={track.imageUrl || '/images/preacher_man.png'} 
                        alt={track.title} 
                        className="track-artwork" 
                    />
                    <div className="track-play-overlay">
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </div>
                </div>
                <div className="track-text">
                    <div className="track-title">{track.title}</div>
                    <div className="track-subtitle">
                        {track.subtitle}
                        {showDuration && track.duration && (
                            <span className="track-duration-badge"> · {formatDuration(track.duration)}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="track-card-actions">
                {/* View detail link */}
                <Link 
                    href={`/message/${track.id}`} 
                    className="track-detail-btn"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Voir les détails"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </Link>

                {/* Favorite button — only show if handler is provided */}
                {onFavoriteToggle && (
                    <button 
                        className={`track-action-btn ${track.isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label={track.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                        <svg viewBox="0 0 24 24" fill={track.isFavorite ? 'currentColor' : 'none'} stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
