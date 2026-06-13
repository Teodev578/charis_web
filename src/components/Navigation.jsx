'use client';

import React from 'react';

export default function Navigation({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'accueil', label: 'Accueil' },
        { id: 'notes', label: 'Notes' },
        { id: 'favoris', label: 'Favoris' }
    ];

    return (
        <nav className="navigation-pills">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`pill ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange && onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
