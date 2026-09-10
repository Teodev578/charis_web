'use client';

import React, { type ReactNode } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { AudioProvider, useAudio } from '../contexts/AudioContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { usePathname } from 'next/navigation';
import AppLayout from './layout/AppLayout';

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

function RoutedAppContent({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // 1. Vitrine (Page d'accueil OnePage) : affichage pleine page avec scroll natif
    if (pathname === '/') {
        return (
            <>
                {children}
                <AudioSyncBridge />
            </>
        );
    }

    // 2. Dashboard Admin : layout autonome (dashboard.css)
    if (pathname.startsWith('/dashboard')) {
        return (
            <>
                {children}
                <AudioSyncBridge />
            </>
        );
    }

    // 3. Espace Écoute et pages applicatives (/ecouter, /explorer, /message, /auth)
    return (
        <AppLayout>
            {children}
            <AudioSyncBridge />
        </AppLayout>
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
                    <RoutedAppContent>
                        {children}
                    </RoutedAppContent>
                </AudioProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
