'use client';

import React, { useState, type ChangeEvent, type FormEvent } from 'react';

export interface HeaderProps {
    onSearch?: (value: string) => void;
    onMenuOpen?: () => void;
}

export default function Header({ onSearch, onMenuOpen }: HeaderProps) {
    const [searchVal, setSearchVal] = useState<string>('');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchVal(val);
        if (onSearch) onSearch(val);
    };

    const handleMobileSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsMobileSearchOpen(false);
    };

    return (
        <header className="flex justify-between items-center mb-6 gap-4">
            {/* Left: Hamburger */}
            <button
                className="w-[44px] h-[44px] shrink-0 rounded-[15px] border-none bg-bg-surface text-text-main flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-bg-surface-hover active:scale-95"
                onClick={onMenuOpen}
                aria-label="Ouvrir le menu"
                id="nav-menu-btn"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="15" y2="18" />
                </svg>
            </button>

            {/* Center: Search Bar (Desktop) */}
            <div className="grow max-w-[500px] relative hidden md:block">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted flex items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Qu'allons nous écouter aujourd'hui?"
                    className="w-full py-3 px-5 pl-11 rounded-full border border-transparent bg-bg-surface text-text-main font-[family-name:inherit] text-[0.95rem] outline-none transition-all duration-200 focus:bg-bg-color focus:border-text-main focus:shadow-[0_0_0_3px_rgba(19,7,23,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
                    value={searchVal}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Right: Actions */}
            <div className="flex gap-3">
                {/* Search Button (Mobile only) */}
                <button
                    className="w-[44px] h-[44px] rounded-[15px] border-none bg-bg-surface text-text-main flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-bg-surface-hover active:scale-95 md:hidden"
                    onClick={() => setIsMobileSearchOpen(true)}
                    aria-label="Rechercher"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>

                {/* Notifications Button */}
                <button className="w-[44px] h-[44px] rounded-[15px] border-none bg-bg-surface text-text-main flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-bg-surface-hover active:scale-95 relative" aria-label="Notifications">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="absolute top-[10px] right-[11px] w-2 h-2 rounded-full bg-[#FE3434] border-[1.5px] border-bg-surface"></span>
                </button>
            </div>

            {/* Mobile Search Modal */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 bg-black/40 z-[2000] flex items-start justify-center pt-[10vh] backdrop-blur-[4px]" onClick={() => setIsMobileSearchOpen(false)}>
                    <form
                        className="bg-bg-color w-[90%] max-w-[500px] p-5 rounded-[20px] shadow-lg flex gap-2 animate-[scaleIn_0.2s_ease]"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleMobileSearchSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="flex-1 py-3 px-4 rounded-xl border border-border-color bg-bg-surface text-text-main outline-none font-[family-name:inherit] focus:border-text-main"
                            value={searchVal}
                            onChange={handleSearchChange}
                            autoFocus
                        />
                        <button type="submit" className="bg-primary-accent text-primary-accent-white px-5 py-2.5 rounded-full font-bold text-[0.9rem] transition-all hover:bg-opacity-90">OK</button>
                    </form>
                </div>
            )}
        </header>
    );
}
