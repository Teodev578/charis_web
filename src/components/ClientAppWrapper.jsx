'use client';

import React from 'react';
import { AudioProvider, useAudio } from '../contexts/AudioContext';
import AudioPlayer from './AudioPlayer';
import NotesPanel from './NotesPanel';

function AppLayout({ children }) {
    const { isNotesPanelOpen } = useAudio();
    
    return (
        <div className={`app-layout ${isNotesPanelOpen ? 'notes-open' : ''}`}>
            <main className="main-content">
                {children}
            </main>
            <NotesPanel />
            <AudioPlayer />
        </div>
    );
}

export default function ClientAppWrapper({ children }) {
    return (
        <AudioProvider>
            <AppLayout>
                {children}
            </AppLayout>
        </AudioProvider>
    );
}
