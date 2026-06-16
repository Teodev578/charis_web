'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
    
    // State to persist
    const [playbackHistory, setPlaybackHistory] = useState({});
    const [trackNotes, setTrackNotes] = useState({});

    const audioRef = useRef(null);

    // Initialize state from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('charis_playback_history');
        if (savedHistory) setPlaybackHistory(JSON.parse(savedHistory));

        const savedNotes = localStorage.getItem('charis_notes');
        if (savedNotes) setTrackNotes(JSON.parse(savedNotes));
        
        // Setup global audio element if not exists
        if (!audioRef.current) {
            audioRef.current = new Audio();
            // Listeners
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioRef.current.addEventListener('ended', handleEnded);
        }

        // Check URL for timestamp (e.g. ?t=120)
        const urlParams = new URLSearchParams(window.location.search);
        const tParam = urlParams.get('t');
        if (tParam && !isNaN(tParam)) {
            // Need a currentTrack to seek, but we handle this when playTrack is called from page
            // For now, save it to a ref or state
            window._initialSeekTime = parseFloat(tParam);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, []);

    // Save to localStorage when history or notes change
    useEffect(() => {
        localStorage.setItem('charis_playback_history', JSON.stringify(playbackHistory));
    }, [playbackHistory]);

    useEffect(() => {
        localStorage.setItem('charis_notes', JSON.stringify(trackNotes));
    }, [trackNotes]);

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        setCurrentTime(current);
        
        // Update history periodically
        if (currentTrack) {
            updatePlaybackHistory(currentTrack.id, current, audioRef.current.duration);
        }
    };

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return;
        setDuration(audioRef.current.duration);
        
        // Apply initial seek if any
        if (window._initialSeekTime) {
            audioRef.current.currentTime = window._initialSeekTime;
            window._initialSeekTime = null;
        } else if (currentTrack && playbackHistory[currentTrack.id]) {
            // Auto resume logic (-3 seconds for comfort)
            const savedTime = playbackHistory[currentTrack.id].currentTime || 0;
            const savedDuration = playbackHistory[currentTrack.id].duration || 0;
            
            // Only resume if not completed (completed means > 95%)
            const isCompleted = savedDuration > 0 && (savedTime / savedDuration) > 0.95;
            
            if (!isCompleted && savedTime > 3) {
                audioRef.current.currentTime = savedTime - 3; // Rewind 3 seconds
            }
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        if (currentTrack) {
            updatePlaybackHistory(currentTrack.id, audioRef.current.duration, audioRef.current.duration);
        }
    };

    const updatePlaybackHistory = (trackId, time, totalDuration) => {
        setPlaybackHistory(prev => {
            const isCompleted = totalDuration > 0 && (time / totalDuration) >= 0.95;
            return {
                ...prev,
                [trackId]: {
                    ...currentTrack,
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
        // Use a dummy audio if none provided so the player logic works
        const audioUrl = track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
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

    const addNote = (trackId, text, timeStamp) => {
        setTrackNotes(prev => {
            const trackSpecificNotes = prev[trackId] || [];
            return {
                ...prev,
                [trackId]: [
                    ...trackSpecificNotes,
                    { id: Date.now().toString(), text, timestamp: timeStamp, date: new Date().toISOString() }
                ]
            };
        });
    };

    const deleteNote = (trackId, noteId) => {
        setTrackNotes(prev => {
            if (!prev[trackId]) return prev;
            return {
                ...prev,
                [trackId]: prev[trackId].filter(n => n.id !== noteId)
            };
        });
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
            // Optionally set the source without playing
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
            initDefaultTrack
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}
