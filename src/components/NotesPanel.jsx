'use client';

import React, { useState } from 'react';
import { useAudio } from '../contexts/AudioContext';

export default function NotesPanel() {
    const { isNotesPanelOpen, setIsNotesPanelOpen, currentTrack, trackNotes, addNote, seek, currentTime } = useAudio();
    const [noteText, setNoteText] = useState('');

    if (!isNotesPanelOpen) return null;

    const currentNotes = currentTrack ? (trackNotes[currentTrack.id] || []) : [];

    const handleAddNote = (e) => {
        e.preventDefault();
        if (!noteText.trim() || !currentTrack) return;
        
        addNote(currentTrack.id, noteText, currentTime);
        setNoteText('');
    };

    const formatTime = (time) => {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="notes-panel">
            <div className="notes-header">
                <h2>Notes & Lyrics</h2>
                <button className="close-btn" onClick={() => setIsNotesPanelOpen(false)}>×</button>
            </div>
            
            <div className="notes-content">
                {!currentTrack ? (
                    <p className="empty-state">Lancez un message pour prendre des notes.</p>
                ) : currentNotes.length === 0 ? (
                    <p className="empty-state">Aucune note pour ce message. Soyez le premier à noter une révélation !</p>
                ) : (
                    <div className="notes-list">
                        {currentNotes.map(note => (
                            <div key={note.id} className="note-item" onClick={() => seek(note.timestamp)}>
                                <div className="note-time">{formatTime(note.timestamp)}</div>
                                <div className="note-text">{note.text}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {currentTrack && (
                <form className="notes-input-form" onSubmit={handleAddNote}>
                    <input 
                        type="text" 
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Prendre une note synchronisée..." 
                        className="note-input"
                    />
                    <button type="submit" className="note-submit-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </form>
            )}
        </div>
    );
}
