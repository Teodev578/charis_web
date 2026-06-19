'use client';

import React, { useState } from 'react';
import { useAudio } from '../contexts/AudioContext';
import ShareMenu from './ShareMenu';

export default function AudioPlayer() {
    const { 
        currentTrack, 
        isPlaying, 
        togglePlay, 
        skip, 
        seek,
        currentTime,
        duration,
        setIsNotesPanelOpen,
        isNotesPanelOpen,
        playbackSpeed,
        changeSpeed,
    } = useAudio();

    const [showShareMenu, setShowShareMenu] = useState(false);

    if (!currentTrack) return null;

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleProgressClick = (e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - bounds.left) / bounds.width;
        seek(percent * duration);
    };

    return (
        <>
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
                        <div className="player-subtitle-pill">{currentTrack.subtitle || "Charis Nation"}</div>
                    </div>
                </div>

                {/* Middle: Player Controls */}
                <div className="player-controls-pill">
                    <button className="player-icon-btn" onClick={() => skip(-15)} aria-label="Reculer de 15s">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 2v6h6" />
                            <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
                            <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">15</text>
                        </svg>
                    </button>
                    
                    <button className="player-play-btn-pill" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Lecture'}>
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
                    
                    <button className="player-icon-btn" onClick={() => skip(15)} aria-label="Avancer de 15s">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 2v6h-6" />
                            <path d="M21 13a9 9 0 1 1-3-7.7L21 8" />
                            <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">15</text>
                        </svg>
                    </button>
                </div>

                {/* Right-Middle: Progress Bar Inline */}
                <div className="player-progress-inline">
                    <span className="player-time">{formatTime(currentTime)}</span>
                    <div className="player-progress-container-inline" onClick={handleProgressClick}>
                        <div className="player-progress-bar-inline" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <span className="player-time">{formatTime(duration)}</span>
                </div>

                {/* Far Right: Tools */}
                <div className="player-tools-pill">
                    {/* Playback speed */}
                    <button 
                        className="player-speed-btn" 
                        onClick={changeSpeed}
                        aria-label={`Vitesse ${playbackSpeed}x`}
                    >
                        {playbackSpeed}x
                    </button>

                    {/* Notes toggle */}
                    <button 
                        className="player-icon-btn" 
                        onClick={() => setIsNotesPanelOpen(!isNotesPanelOpen)} 
                        aria-label="Notes"
                        style={{ color: isNotesPanelOpen ? 'var(--brand-yellow)' : 'inherit' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </button>

                    {/* Share button */}
                    <button 
                        className="player-icon-btn" 
                        onClick={() => setShowShareMenu(true)} 
                        aria-label="Partager à ce moment"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Share Menu Modal */}
            {showShareMenu && (
                <ShareMenu
                    currentTime={currentTime}
                    messageId={currentTrack.id}
                    messageTitle={currentTrack.title}
                    onClose={() => setShowShareMenu(false)}
                />
            )}
        </>
    );
}
