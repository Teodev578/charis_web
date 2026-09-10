'use client';

import React, { useState } from 'react';
import { useAudio } from '../../contexts/AudioContext';
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
        playbackSpeed,
    } = useAudio();

    const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'lecture' | 'notes'>('lecture'); // 'lecture' | 'notes'

    if (!currentTrack) return null;

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
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

    const expandPlayer = () => setIsExpanded(true);
    const collapsePlayer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    return (
        <>
            {/* MINI PLAYER (BOTTOM BAR) */}
            {!isExpanded && (
                <div 
                    className="fixed bottom-0 left-0 w-full bg-surface border-t border-black/10 flex items-center justify-between px-4 py-3 z-[1000] cursor-pointer" 
                    onClick={expandPlayer}
                >
                    {/* Left: Track Information */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img 
                            src={currentTrack.imageUrl || '/images/preacher_man.png'} 
                            alt={currentTrack.title} 
                            className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                            <div className="font-bold text-[0.9rem] text-text-main whitespace-nowrap overflow-hidden text-ellipsis">
                                {currentTrack.title}
                            </div>
                            <div className="text-[0.75rem] text-text-muted whitespace-nowrap overflow-hidden text-ellipsis">
                                {currentTrack.subtitle || "Charis Nation"}
                            </div>
                        </div>
                    </div>

                    {/* Right: Player Controls */}
                    <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                        <button className="text-text-muted bg-transparent border-none cursor-pointer" onClick={() => skip(-10)} aria-label="Reculer de 10s">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 2v6h6" />
                                <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
                                <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">10</text>
                            </svg>
                        </button>
                        
                        <button className="w-9 h-9 rounded-[15px] bg-text-main text-background flex items-center justify-center border-none cursor-pointer" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Lecture'}>
                            {isPlaying ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                        
                        <button className="text-text-muted bg-transparent border-none cursor-pointer" onClick={() => skip(10)} aria-label="Avancer de 10s">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 2v6h-6" />
                                <path d="M21 13a9 9 0 1 1-3-7.7L21 8" />
                                <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">10</text>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* EXPANDED PLAYER (FULL SCREEN) */}
            {isExpanded && (
                <div className="fixed inset-0 bg-background z-[9999] flex flex-col text-text-main animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between p-4 pt-[env(safe-area-inset-top,1rem)]">
                        <button className="bg-surface border-none w-10 h-10 rounded-[15px] text-text-main flex items-center justify-center cursor-pointer" onClick={collapsePlayer}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        
                        <div className="flex bg-surface rounded-[20px] p-1">
                            <button 
                                className={`flex items-center bg-transparent border-none px-4 py-2 rounded-2xl font-semibold text-[0.9rem] cursor-pointer transition-all duration-200 ${activeTab === 'lecture' ? 'bg-text-main text-background' : 'text-text-muted'}`}
                                onClick={() => setActiveTab('lecture')}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                                </svg>
                                Lecture
                            </button>
                            <button 
                                className={`flex items-center bg-transparent border-none px-4 py-2 rounded-2xl font-semibold text-[0.9rem] cursor-pointer transition-all duration-200 ${activeTab === 'notes' ? 'bg-text-main text-background' : 'text-text-muted'}`}
                                onClick={() => setActiveTab('notes')}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                                Notes
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 pb-[env(safe-area-inset-bottom,2rem)]">
                        {activeTab === 'lecture' ? (
                            <div className="flex flex-col items-center">
                                {/* Artwork */}
                                <div className="w-full max-w-[320px] aspect-square rounded-[15px] overflow-hidden shadow-lg mt-4 mb-8">
                                    <img 
                                        src={currentTrack.imageUrl || '/images/preacher_man.png'} 
                                        alt={currentTrack.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Track Info */}
                                <div className="w-full text-left mb-6">
                                    <h2 className="text-xl font-bold mb-1">{currentTrack.title}</h2>
                                    <p className="text-base text-text-muted">{currentTrack.subtitle || "Révérend Watchman"}</p>
                                </div>

                                {/* Progress */}
                                <div className="w-full mb-8">
                                    <div className="w-full h-6 flex items-center relative cursor-pointer mb-1" onClick={handleProgressClick}>
                                        <div className="w-full h-1 bg-surface rounded-sm relative">
                                            <div className="h-full bg-text-main rounded-sm" style={{ width: `${progressPercent}%` }}></div>
                                            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-text-main rounded-sm shadow-[0_0_4px_rgba(0,0,0,0.5)]" style={{ left: `${progressPercent}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium text-text-muted">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Main Controls */}
                                <div className="flex items-center justify-center gap-8 mb-10">
                                    <button className="flex items-center justify-center bg-transparent border-none text-text-main cursor-pointer" onClick={() => skip(-10)} aria-label="Reculer de 10s">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 2v6h6" />
                                            <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
                                            <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">10</text>
                                        </svg>
                                    </button>
                                    
                                    <button className="w-[72px] h-[72px] rounded-[15px] bg-text-main text-background border-none flex items-center justify-center cursor-pointer shadow-md" onClick={togglePlay}>
                                        {isPlaying ? (
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="4" width="4" height="16" />
                                                <rect x="14" y="4" width="4" height="16" />
                                            </svg>
                                        ) : (
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        )}
                                    </button>
                                    
                                    <button className="flex items-center justify-center bg-transparent border-none text-text-main cursor-pointer" onClick={() => skip(10)} aria-label="Avancer de 10s">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 2v6h-6" />
                                            <path d="M21 13a9 9 0 1 1-3-7.7L21 8" />
                                            <text x="12" y="16" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor" stroke="none">10</text>
                                        </svg>
                                    </button>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-center gap-6 mb-8">
                                    <button className="w-12 h-12 rounded-[15px] bg-surface text-text-main border-none flex items-center justify-center cursor-pointer" onClick={() => setShowShareMenu(true)}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="18" cy="5" r="3" />
                                            <circle cx="6" cy="12" r="3" />
                                            <circle cx="18" cy="19" r="3" />
                                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                        </svg>
                                    </button>
                                    <button className="w-12 h-12 rounded-[15px] bg-surface text-text-main border-none flex items-center justify-center cursor-pointer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    </button>
                                    <button className="w-12 h-12 rounded-[15px] bg-surface text-text-main border-none flex items-center justify-center cursor-pointer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-4 min-h-[50vh]">
                                <h2 className="text-xl font-bold mb-4">Titre Note</h2>
                                <div className="text-[0.95rem] leading-relaxed text-text-muted">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
                                </div>
                            </div>
                        )}

                        <div className="text-center text-[0.85rem] text-text-muted mt-8 mb-4">
                            Plus d'informations ↓
                        </div>

                        {/* Info Card */}
                        <div className="bg-surface rounded-[15px] p-5 mb-8">
                            <h3 className="text-[1.1rem] font-bold mb-1">{currentTrack.title}</h3>
                            <p className="text-[0.85rem] text-text-muted mb-1">18 juin 2026</p>
                            <p className="text-[0.85rem] text-text-muted mb-1">Série : La foi</p>
                            <p className="text-[0.85rem] text-text-muted mb-1">Avec : Le Rév. Israel Watchman, Pasteur Emmanuel, etc...</p>
                            
                            <p className="text-[0.85rem] text-text-muted mt-4 mb-1">Description :</p>
                            <p className="text-[0.85rem] text-text-muted leading-relaxed">
                                Il restaure ce qui semblait perdu. Il relève ce qui était brisé. Il redonne vie là où il n'y avait plus d'espoir.
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
