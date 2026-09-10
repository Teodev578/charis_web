'use client';

import React, { type ReactNode } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { AudioProvider, useAudio } from '../contexts/AudioContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import NavigationSidebar from './navigation/NavigationSidebar';
import Header from './navigation/Header';
import RightPanel from './notes/RightPanel';
import AudioPlayer from './player/AudioPlayer';

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

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-base text-main font-jakarta">
            {/* 1. Sidebar Fixe */}
            <NavigationSidebar />

            {/* 2. Zone de contenu principale (qui scroll) */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <div className="z-20 shrink-0">
                    <Header />
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-5xl mx-auto p-4 md:p-8 pb-[100px] lg:pb-8">
                        {children}
                    </div>
                </div>
            </main>

            {/* 3. Panneau de droite (Lecteur & Notes) Fixe */}
            <aside className="hidden lg:flex w-[380px] flex-shrink-0 flex-col bg-surface border-l border-border">
                <RightPanel />
            </aside>

            {/* Mobile Player (floating bar & fullscreen overlay) */}
            <div className="lg:hidden">
                <AudioPlayer />
            </div>
            
            <AudioSyncBridge />
        </div>
    );
}

export interface ClientAppWrapperProps {
    children: ReactNode;
}

export default function ClientAppWrapper({ children }: ClientAppWrapperProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AudioProvider>
                    <AppLayout>
                        {children}
                    </AppLayout>
                </AudioProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
