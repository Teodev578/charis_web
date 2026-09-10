'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface NavigationProps {
    activeTab: string;
    onTabChange?: (tabId: string) => void;
}

interface TabItem {
    id: string;
    label: string;
    path: string | null;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    const router = useRouter();
    const pathname = usePathname();

    const tabs: TabItem[] = [
        { id: 'accueil', label: 'Accueil', path: '/' },
        { id: 'explorer', label: 'Explorer', path: '/explorer' },
        { id: 'notes', label: 'Notes', path: null },
        { id: 'favoris', label: 'Favoris', path: null }
    ];

    const handleTabClick = (tab: TabItem) => {
        if (tab.path) {
            router.push(tab.path);
        } else {
            if (pathname !== '/') {
                router.push('/');
                setTimeout(() => onTabChange?.(tab.id), 100);
            } else {
                onTabChange?.(tab.id);
            }
        }
    };

    const getIsActive = (tab: TabItem) => {
        if (tab.path === '/explorer' && pathname === '/explorer') return true;
        if (tab.path === '/' && pathname === '/' && activeTab === 'accueil') return true;
        if (!tab.path && pathname === '/' && activeTab === tab.id) return true;
        return false;
    };

    return (
        <nav className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`px-5 py-2.5 rounded-full border-none text-[0.9rem] font-bold font-[family-name:var(--font-plus-jakarta)] cursor-pointer transition-all duration-200 whitespace-nowrap ${getIsActive(tab) ? 'bg-primary-accent text-primary-accent-white' : 'bg-bg-surface text-text-main hover:bg-bg-surface-hover'}`}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
