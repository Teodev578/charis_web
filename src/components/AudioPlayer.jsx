'use client';

import React from 'react';

export default function AudioPlayer({ currentTrack, isPlaying, onTogglePlay, onRewind, onForward }) {
    if (!currentTrack) return null;

    return (
        <div className="audio-player-bar">
            {/* Top: Mock Progress Bar */}
            <div className="player-progress-container">
                <div className="player-progress-bar" style={{ width: '35%' }}></div>
            </div>

            <div className="audio-player-content">
                {/* Left: Track Information */}
                <div className="player-track-info">
                    <img 
                        src={currentTrack.imageUrl || '/images/preacher_man.png'} 
                        alt={currentTrack.title} 
                        className="player-artwork"
                    />
                    <div className="player-text">
                        <div className="player-title">{currentTrack.title}</div>
                        <div className="player-subtitle">{currentTrack.subtitle}</div>
                    </div>
                </div>

            {/* Right: Player Controls */}
            <div className="player-controls">
                {/* Rewind 10s Button */}
                <button 
                    className="player-btn" 
                    onClick={onRewind}
                    aria-label="Reculer de 10 secondes"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Counter-clockwise circular arrow path */}
                        <path d="M2.5 2v6h6" />
                        <path d="M2.5 8a10 10 0 1 1 2.36 6.36" />
                        {/* "10" Text in center */}
                        <text x="12" y="15.5" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">10</text>
                    </svg>
                </button>

                {/* Play / Pause Toggle Button */}
                <button 
                    className="player-btn play-pause-btn" 
                    onClick={onTogglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Lecture'}
                >
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
                </button>

                {/* Fast Forward 10s Button */}
                <button 
                    className="player-btn" 
                    onClick={onForward}
                    aria-label="Avancer de 10 secondes"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Clockwise circular arrow path */}
                        <path d="M21.5 2v6h-6" />
                        <path d="M21.5 8a10 10 0 1 0-2.36 6.36" />
                        {/* "10" Text in center */}
                        <text x="12" y="15.5" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none">10</text>
                    </svg>
                </button>
            </div>
            </div>
        </div>
    );
}
