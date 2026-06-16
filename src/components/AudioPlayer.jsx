'use client';

import React from 'react';

export default function AudioPlayer({ currentTrack, isPlaying, onTogglePlay, onRewind, onForward }) {
    if (!currentTrack) return null;

    return (
        <div className="audio-player-floating">
            {/* Left: Track Information */}
            <div className="player-track-info-pill">
                <img 
                    src={currentTrack.imageUrl || '/images/preacher_man.png'} 
                    alt={currentTrack.title} 
                    className="player-artwork-pill"
                />
                <div className="player-text-pill">
                    <div className="player-title-pill">{currentTrack.title}</div>
                    <div className="player-subtitle-pill">Daily News</div>
                </div>
                <button className="player-icon-btn" aria-label="Favoris">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            {/* Middle: Player Controls */}
            <div className="player-controls-pill">
                <button className="player-icon-btn" aria-label="Précédent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 20L9 12l10-8v16zM5 19V5" />
                    </svg>
                </button>
                <button className="player-icon-btn" onClick={onRewind} aria-label="Reculer de 15s">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 2v6h6" />
                        <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
                        <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">15</text>
                    </svg>
                </button>
                
                <button className="player-play-btn-pill" onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Lecture'}>
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}>
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
                
                <button className="player-icon-btn" onClick={onForward} aria-label="Avancer de 15s">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 2v6h-6" />
                        <path d="M21 13a9 9 0 1 1-3-7.7L21 8" />
                        <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">15</text>
                    </svg>
                </button>
                <button className="player-icon-btn" aria-label="Suivant">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 4l10 8-10 8V4zM19 5v14" />
                    </svg>
                </button>
            </div>

            {/* Right-Middle: Progress Bar Inline */}
            <div className="player-progress-inline">
                <span className="player-time">11:32</span>
                <div className="player-progress-container-inline">
                    <div className="player-progress-bar-inline" style={{ width: '35%' }}></div>
                </div>
                <span className="player-time">35:05</span>
            </div>

            {/* Far Right: Tools */}
            <div className="player-tools-pill">
                <button className="player-icon-btn" aria-label="Notes/Lyrics">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 7 4 4 20 4 20 7"></polyline>
                        <line x1="9" y1="20" x2="15" y2="20"></line>
                        <line x1="12" y1="4" x2="12" y2="20"></line>
                    </svg>
                </button>
                <button className="player-icon-btn" aria-label="Volume">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
