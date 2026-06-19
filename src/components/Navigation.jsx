'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation({ activeTab, onTabChange }) {
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        { id: 'accueil', label: 'Accueil', path: '/' },
        { id: 'explorer', label: 'Explorer', path: '/explorer' },
        { id: 'notes', label: 'Notes', path: null },
        { id: 'favoris', label: 'Favoris', path: null }
    ];

    const handleTabClick = (tab) => {
        if (tab.path) {
            // Navigate to a separate page
            router.push(tab.path);
        } else {
            // Use in-page tab switching
            if (pathname !== '/') {
                router.push('/');
                // Small delay to let the navigation happen before tab switch
                setTimeout(() => onTabChange?.(tab.id), 100);
            } else {
                onTabChange?.(tab.id);
            }
        }
    };

    // Determine active state
    const getIsActive = (tab) => {
        if (tab.path === '/explorer' && pathname === '/explorer') return true;
        if (tab.path === '/' && pathname === '/' && activeTab === 'accueil') return true;
        if (!tab.path && pathname === '/' && activeTab === tab.id) return true;
        return false;
    };

    return (
        <nav className="navigation-pills">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`pill ${getIsActive(tab) ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
