'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function Header({ onSearch }) {
    const [searchVal, setSearchVal] = useState('');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user, profile, signOut, isAuthenticated } = useAuth();
    const profileMenuRef = useRef(null);

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

    // Close profile menu on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get user initials for avatar
    const getInitials = () => {
        const name = profile?.nom_complet || user?.email || '';
        const parts = name.split(' ').filter(Boolean);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    // Get first name for greeting
    const getFirstName = () => {
        const name = profile?.nom_complet || '';
        return name.split(' ')[0] || 'ami(e)';
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            setIsProfileMenuOpen(false);
        } catch (err) {
            console.error('Sign out failed:', err);
        }
    };

    return (
        <header className="header">
            {/* Left Section: User profile */}
            <div className="profile-section" ref={profileMenuRef}>
                <button
                    className="avatar"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    aria-label="Menu profil"
                >
                    {isAuthenticated ? (
                        <span className="avatar-initials">{getInitials()}</span>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    )}
                </button>
                <div className="user-greeting">
                    {isAuthenticated ? (
                        <>
                            <span className="desktop-only-text">Hey, {getFirstName()} 👋</span>
                            <span className="mobile-only-text">Hey, salut {getFirstName()} 👋</span>
                        </>
                    ) : (
                        <>
                            <span className="desktop-only-text">Bienvenue 👋</span>
                            <span className="mobile-only-text">Bienvenue 👋</span>
                        </>
                    )}
                </div>

                {/* Profile dropdown menu */}
                {isProfileMenuOpen && (
                    <div className="profile-dropdown">
                        {isAuthenticated ? (
                            <>
                                <div className="profile-dropdown-header">
                                    <div className="profile-dropdown-name">{profile?.nom_complet || 'Utilisateur'}</div>
                                    <div className="profile-dropdown-email">{user?.email}</div>
                                </div>
                                <div className="profile-dropdown-divider" />
                                <button className="profile-dropdown-item" onClick={handleSignOut}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Se déconnecter
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className="profile-dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Se connecter
                                </Link>
                                <Link href="/auth/signup" className="profile-dropdown-item" onClick={() => setIsProfileMenuOpen(false)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <line x1="20" y1="8" x2="20" y2="14" />
                                        <line x1="23" y1="11" x2="17" y2="11" />
                                    </svg>
                                    Créer un compte
                                </Link>
                            </>
                        )}
                    </div>
                )}

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
                {/* Search Button (Mobile only) */}
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