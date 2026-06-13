'use client';

import React from 'react';

export default function TrackCard({ track, isPlaying, onPlay, onFavoriteToggle }) {
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Avoid triggering track play when toggling favorite
        if (onFavoriteToggle) {
            onFavoriteToggle(track.id);
        }
    };

    return (
        <div 
            className={`track-card ${isPlaying ? 'playing' : ''}`}
            onClick={() => onPlay && onPlay(track)}
        >
            <div className="track-info-section">
                <img 
                    src={track.imageUrl || '/images/preacher_man.png'} 
                    alt={track.title} 
                    className="track-artwork" 
                />
                <div className="track-text">
                    <div className="track-title">{track.title}</div>
                    <div className="track-subtitle">{track.subtitle}</div>
                </div>
            </div>

            <button 
                className={`track-action-btn ${track.isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={track.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
                <svg viewBox="0 0 24 24" fill={track.isFavorite ? 'currentColor' : 'none'} stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>
        </div>
    );
}
