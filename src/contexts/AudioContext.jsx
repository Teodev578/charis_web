'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    
    // State to persist
    const [playbackHistory, setPlaybackHistory] = useState({});
    const [trackNotes, setTrackNotes] = useState({});

    const audioRef = useRef(null);
    const currentTrackRef = useRef(null);
    const syncIntervalRef = useRef(null);
    const userIdRef = useRef(null);

    // Keep currentTrackRef in sync
    useEffect(() => {
        currentTrackRef.current = currentTrack;
    }, [currentTrack]);

    // Initialize state from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('charis_playback_history');
        if (savedHistory) {
            try { setPlaybackHistory(JSON.parse(savedHistory)); } catch {}
        }

        const savedNotes = localStorage.getItem('charis_notes');
        if (savedNotes) {
            try { setTrackNotes(JSON.parse(savedNotes)); } catch {}
        }
        
        // Setup global audio element if not exists
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioRef.current.addEventListener('ended', handleEnded);
            audioRef.current.addEventListener('pause', handlePause);
        }

        // Check URL for timestamp (e.g. ?t=120)
        const urlParams = new URLSearchParams(window.location.search);
        const tParam = urlParams.get('t');
        if (tParam && !isNaN(tParam)) {
            window._initialSeekTime = parseFloat(tParam);
        }

        // Visibility change handler — sync on tab hide/close
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                syncProgressToSupabase();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.removeEventListener('pause', handlePause);
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
        };
    }, []);

    // Save to localStorage when history or notes change
    useEffect(() => {
        localStorage.setItem('charis_playback_history', JSON.stringify(playbackHistory));
    }, [playbackHistory]);

    useEffect(() => {
        localStorage.setItem('charis_notes', JSON.stringify(trackNotes));
    }, [trackNotes]);

    // Setup sync interval (every 30 seconds of playback)
    useEffect(() => {
        if (isPlaying) {
            syncIntervalRef.current = setInterval(() => {
                syncProgressToSupabase();
            }, 30000);
        } else {
            if (syncIntervalRef.current) {
                clearInterval(syncIntervalRef.current);
                syncIntervalRef.current = null;
            }
        }

        return () => {
            if (syncIntervalRef.current) {
                clearInterval(syncIntervalRef.current);
            }
        };
    }, [isPlaying]);

    // Sync progress to Supabase (called on pause, every 30s, and visibilitychange)
    const syncProgressToSupabase = useCallback(async () => {
        const track = currentTrackRef.current;
        if (!track || !audioRef.current || !userIdRef.current) return;

        const time = audioRef.current.currentTime;
        const totalDuration = audioRef.current.duration;
        if (!totalDuration || isNaN(totalDuration)) return;

        const isCompleted = totalDuration > 0 && (time / totalDuration) >= 0.95;

        try {
            const { upsertProgress } = await import('../lib/services/user');
            await upsertProgress(userIdRef.current, track.id, time, isCompleted);
        } catch (err) {
            // Silently fail — localStorage is the fallback
            console.debug('Supabase sync skipped:', err.message);
        }
    }, []);

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        setCurrentTime(current);
        
        // Update local history
        const track = currentTrackRef.current;
        if (track) {
            updatePlaybackHistory(track.id, current, audioRef.current.duration);
        }
    };

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return;
        setDuration(audioRef.current.duration);
        
        // Apply initial seek if any
        if (window._initialSeekTime) {
            audioRef.current.currentTime = window._initialSeekTime;
            window._initialSeekTime = null;
        } else {
            const track = currentTrackRef.current;
            const history = JSON.parse(localStorage.getItem('charis_playback_history') || '{}');
            
            if (track && history[track.id]) {
                // Auto resume logic (-3 seconds for comfort)
                const savedTime = history[track.id].currentTime || 0;
                const savedDuration = history[track.id].duration || 0;
                
                // Only resume if not completed (completed means > 95%)
                const isCompleted = savedDuration > 0 && (savedTime / savedDuration) > 0.95;
                
                if (!isCompleted && savedTime > 5) {
                    audioRef.current.currentTime = savedTime - 3; // Rewind 3-5 seconds for context
                }
            }
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        const track = currentTrackRef.current;
        if (track && audioRef.current) {
            updatePlaybackHistory(track.id, audioRef.current.duration, audioRef.current.duration);
            syncProgressToSupabase();
        }
    };

    const handlePause = () => {
        // Sync to Supabase on pause
        syncProgressToSupabase();
    };

    const updatePlaybackHistory = (trackId, time, totalDuration) => {
        const track = currentTrackRef.current;
        if (!track) return;
        
        setPlaybackHistory(prev => {
            const isCompleted = totalDuration > 0 && (time / totalDuration) >= 0.95;
            return {
                ...prev,
                [trackId]: {
                    id: track.id,
                    title: track.title,
                    subtitle: track.subtitle,
                    imageUrl: track.imageUrl,
                    audioUrl: track.audioUrl,
                    currentTime: time,
                    duration: totalDuration || 0,
                    isCompleted: isCompleted,
                    lastPlayedAt: new Date().toISOString()
                }
            };
        });
    };

    const playTrack = (track) => {
        if (currentTrack?.id === track.id) {
            // Just toggle play
            togglePlay();
            return;
        }

        setCurrentTrack(track);
        currentTrackRef.current = track;
        const audioUrl = track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.playbackRate = playbackSpeed;
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => console.error("Audio play failed:", e));
        }
    };

    const togglePlay = () => {
        if (!audioRef.current || !audioRef.current.src) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const skip = (seconds) => {
        if (!audioRef.current) return;
        const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, audioRef.current.duration));
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const seek = (time) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
        
        // Ensure playing when seeking
        if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const changeSpeed = () => {
        const speeds = [1, 1.25, 1.5, 1.75, 2];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
        setPlaybackSpeed(nextSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = nextSpeed;
        }
    };

    // Set user ID for Supabase sync (called from ClientAppWrapper when auth loads)
    const setUserId = (userId) => {
        userIdRef.current = userId;
    };

    const addNote = (trackId, text, timeStamp) => {
        const newNote = { id: Date.now().toString(), text, timestamp: timeStamp, date: new Date().toISOString() };
        
        setTrackNotes(prev => {
            const trackSpecificNotes = prev[trackId] || [];
            return {
                ...prev,
                [trackId]: [...trackSpecificNotes, newNote]
            };
        });

        // Also sync to Supabase if authenticated
        if (userIdRef.current) {
            import('../lib/services/user').then(({ addUserNote }) => {
                addUserNote(userIdRef.current, trackId, text, timeStamp).catch(() => {});
            });
        }
    };

    const deleteNote = (trackId, noteId) => {
        setTrackNotes(prev => {
            if (!prev[trackId]) return prev;
            return {
                ...prev,
                [trackId]: prev[trackId].filter(n => n.id !== noteId)
            };
        });

        // Also delete from Supabase
        if (userIdRef.current) {
            import('../lib/services/user').then(({ deleteUserNote }) => {
                deleteUserNote(noteId).catch(() => {});
            });
        }
    };

    // Helper for UI to get progress
    const getInProgressTracks = () => {
        return Object.values(playbackHistory)
            .filter(t => !t.isCompleted && t.currentTime > 0)
            .sort((a, b) => new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt));
    };

    const getCompletedTracks = () => {
        return Object.values(playbackHistory)
            .filter(t => t.isCompleted)
            .sort((a, b) => new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt));
    };

    const initDefaultTrack = (track) => {
        if (!currentTrack && !isPlaying) {
            setCurrentTrack(track);
            currentTrackRef.current = track;
            if (audioRef.current) {
                audioRef.current.src = track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
            }
        }
    };

    return (
        <AudioContext.Provider value={{
            currentTrack,
            isPlaying,
            currentTime,
            duration,
            playTrack,
            togglePlay,
            skip,
            seek,
            playbackHistory,
            getInProgressTracks,
            getCompletedTracks,
            trackNotes,
            addNote,
            deleteNote,
            isNotesPanelOpen,
            setIsNotesPanelOpen,
            initDefaultTrack,
            playbackSpeed,
            changeSpeed,
            setUserId,
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}
