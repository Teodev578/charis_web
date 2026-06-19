'use client';

import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { AudioProvider, useAudio } from '../contexts/AudioContext';
import AudioPlayer from './AudioPlayer';
import NotesPanel from './NotesPanel';

function AudioSyncBridge() {
    const { user } = useAuth();
    const { setUserId } = useAudio();

    React.useEffect(() => {
        if (user?.id) {
            setUserId(user.id);
        } else {
            setUserId(null);
        }
    }, [user?.id, setUserId]);

    return null;
}

function AppLayout({ children }) {
    const { isNotesPanelOpen } = useAudio();
    
    return (
        <div className={`app-layout ${isNotesPanelOpen ? 'notes-open' : ''}`}>
            <main className="main-content">
                {children}
            </main>
            <NotesPanel />
            <AudioPlayer />
            <AudioSyncBridge />
        </div>
    );
}

export default function ClientAppWrapper({ children }) {
    return (
        <AuthProvider>
            <AudioProvider>
                <AppLayout>
                    {children}
                </AppLayout>
            </AudioProvider>
        </AuthProvider>
    );
}
