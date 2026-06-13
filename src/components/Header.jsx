'use client';

import React, { useState } from 'react';

export default function Header({ onSearch }) {
    const [searchVal, setSearchVal] = useState('');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleMobileSearchSubmit = (e) => {
        e.preventDefault();
        setIsMobileSearchOpen(false);
    };

    return (
        <header className="header">
            {/* Left Section: User profile */}
            <div className="profile-section">
                <div className="avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                <div className="user-greeting">
                    {/* Responsive text: 'Hey, salut Fabien 👋' on mobile, 'Hey, Fabien 👋' on desktop */}
                    <span className="desktop-only-text">Hey, Fabien 👋</span>
                    <span className="mobile-only-text">Hey, salut Fabien 👋</span>
                </div>
                
                {/* CSS Helper for text swap */}
                <style jsx>{`
                    .desktop-only-text { display: inline; }
                    .mobile-only-text { display: none; }
                    @media (max-width: 768px) {
                        .desktop-only-text { display: none; }
                        .mobile-only-text { display: inline; }
                    }
                `}</style>
            </div>

            {/* Center Section: Search Bar (Desktop) */}
            <div className="search-section">
                <div className="search-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Qu'allons nous écouter aujourd'hui?"
                    className="search-bar"
                    value={searchVal}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Right Section: Header Actions */}
            <div className="header-actions">
                {/* Search Button (Mobile only, triggers popup/modal search) */}
                <button 
                    className="icon-btn mobile-only" 
                    onClick={() => setIsMobileSearchOpen(true)}
                    aria-label="Rechercher"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>

                {/* Notifications Button */}
                <button className="icon-btn" aria-label="Notifications" style={{ position: 'relative' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    {/* Small red dot on notifications */}
                    <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '11px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#FE3434',
                        border: '1.5px solid var(--bg-surface)'
                    }}></span>
                </button>
            </div>

            {/* Mobile Search Modal Pop-up */}
            {isMobileSearchOpen && (
                <div className="mobile-search-modal" onClick={() => setIsMobileSearchOpen(false)}>
                    <form 
                        className="mobile-search-content" 
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleMobileSearchSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="mobile-search-input"
                            value={searchVal}
                            onChange={handleSearchChange}
                            autoFocus
                        />
                        <button type="submit" className="pill active">OK</button>
                    </form>
                </div>
            )}
        </header>
    );
}