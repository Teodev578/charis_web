'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export interface NavigationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: string;
    onTabChange?: (tabId: string) => void;
}

interface NavItem {
    id: string;
    label: string;
    path: string | null;
    icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
    {
        id: 'accueil',
        label: 'Accueil',
        path: '/',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        id: 'explorer',
        label: 'Explorer',
        path: '/explorer',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        id: 'notes',
        label: 'Notes',
        path: null,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
    },
    {
        id: 'favoris',
        label: 'Favoris',
        path: null,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
];

const DASHBOARD_ITEM = {
    id: 'dashboard',
    label: 'Dashboard Admin',
    path: '/dashboard',
    icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
};

export default function NavigationDrawer({ isOpen, onClose, activeTab, onTabChange }: NavigationDrawerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, profile, signOut, isAuthenticated, isAdmin } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const getInitials = () => {
        const name = profile?.nom_complet || user?.email || '';
        const parts = name.split(' ').filter(Boolean);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            onClose();
        } catch (err) {
            console.error('Sign out failed:', err);
        }
    };

    const handleNavClick = (item: NavItem) => {
        if (item.path) {
            router.push(item.path);
        } else {
            if (pathname !== '/') {
                router.push('/');
                setTimeout(() => onTabChange?.(item.id), 100);
            } else {
                onTabChange?.(item.id);
            }
        }
        onClose();
    };

    const getIsActive = (item: NavItem) => {
        if (item.path === '/explorer' && pathname === '/explorer') return true;
        if (item.path === '/dashboard' && pathname.startsWith('/dashboard')) return true;
        if (item.path === '/' && pathname === '/' && activeTab === 'accueil') return true;
        if (!item.path && pathname === '/' && activeTab === item.id) return true;
        return false;
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[200] transition-colors duration-350 ease-in-out ${isOpen ? 'bg-black/45 pointer-events-auto backdrop-blur-[2px]' : 'bg-transparent pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer Panel */}
            <aside className={`fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-bg-color border-r border-border-color z-[300] flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[4px_0_32px_rgba(0,0,0,0.15)] dark:shadow-[4px_0_40px_rgba(0,0,0,0.5)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} role="dialog" aria-modal="true" aria-label="Menu de navigation">

                {/* ── TOP: Close button row ── */}
                <div className="flex items-center justify-between p-4 pt-4 pb-3 pl-5">
                    <div className="flex items-center gap-[0.65rem]">
                        <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-brand-purple to-brand-purple-light flex items-center justify-center text-white shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                            </svg>
                        </div>
                        <span className="text-[0.9rem] font-extrabold text-text-main tracking-tight font-[family-name:var(--font-plus-jakarta)]">Charis Nation</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="w-[34px] h-[34px] rounded-[15px] border-none bg-bg-surface text-text-muted flex items-center justify-center cursor-pointer transition-all hover:bg-bg-surface-hover hover:text-text-main hover:rotate-90 shrink-0" onClick={toggleTheme} aria-label="Changer le thème">
                            {theme === 'dark' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>
                        <button className="w-[34px] h-[34px] rounded-[15px] border-none bg-bg-surface text-text-muted flex items-center justify-center cursor-pointer transition-all hover:bg-bg-surface-hover hover:text-text-main hover:rotate-90 shrink-0" onClick={onClose} aria-label="Fermer le menu">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── USER PROFILE SECTION ── */}
                <div className="flex items-center gap-[0.9rem] p-[1.1rem_1.25rem_1.25rem_1.25rem] bg-gradient-to-br from-[rgba(87,34,105,0.06)] to-[rgba(87,34,105,0.02)] border-b border-border-color">
                    {isAuthenticated ? (
                        <>
                            <div className="w-[50px] h-[50px] rounded-[15px] bg-gradient-to-br from-brand-purple to-brand-purple-light flex items-center justify-center text-white shrink-0 shadow-[0_4px_12px_rgba(87,34,105,0.3)]">
                                <span className="text-base font-bold tracking-[0.02em]">{getInitials()}</span>
                            </div>
                            <div className="flex flex-col gap-[0.2rem] min-w-0">
                                <span className="text-[0.95rem] font-bold text-text-main font-[family-name:var(--font-plus-jakarta)] truncate">{profile?.nom_complet || 'Utilisateur'}</span>
                                <span className="text-[0.75rem] text-text-muted font-normal truncate">{user?.email}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-[50px] h-[50px] rounded-[15px] bg-bg-surface-hover flex items-center justify-center text-text-muted shrink-0">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-[0.2rem] min-w-0">
                                <span className="text-[0.95rem] font-bold text-text-main font-[family-name:var(--font-plus-jakarta)] truncate">Bienvenue 👋</span>
                                <span className="text-[0.75rem] text-text-muted font-normal truncate">Pas encore connecté</span>
                            </div>
                        </>
                    )}
                </div>

                {/* ── AUTH ACTIONS (non connecté) ── */}
                {!isAuthenticated && (
                    <div className="flex flex-col gap-2 p-4 px-5">
                        <Link href="/auth/login" className="flex items-center gap-[0.6rem] px-4 py-[0.7rem] rounded-[10px] text-[0.875rem] font-semibold font-[family-name:var(--font-plus-jakarta)] w-full justify-center transition-all duration-150 bg-gradient-to-br from-brand-purple to-brand-purple-light text-white shadow-[0_4px_10px_rgba(87,34,105,0.2)] hover:opacity-95 hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(87,34,105,0.35)]" onClick={onClose}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <polyline points="10 17 15 12 10 7" />
                                <line x1="15" y1="12" x2="3" y2="12" />
                            </svg>
                            Se connecter
                        </Link>
                        <Link href="/auth/signup" className="flex items-center gap-[0.6rem] px-4 py-[0.7rem] rounded-[10px] text-[0.875rem] font-semibold font-[family-name:var(--font-plus-jakarta)] w-full justify-center transition-all duration-150 bg-bg-surface text-text-main border border-border-color hover:bg-bg-surface-hover" onClick={onClose}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <line x1="20" y1="8" x2="20" y2="14" />
                                <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                            Créer un compte
                        </Link>
                    </div>
                )}

                <div className="h-[1px] bg-border-color shrink-0 m-0" />

                {/* ── NAVIGATION ── */}
                <nav className="flex-1 p-[1rem_0.75rem] overflow-y-auto">
                    <p className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-text-muted px-3 mb-[0.4rem]">Navigation</p>
                    <ul className="flex flex-col gap-[0.2rem] mb-[0.25rem]">
                        {NAV_ITEMS.map((item) => {
                            const isActive = getIsActive(item);
                            return (
                                <li key={item.id} className="group">
                                    <button
                                        className={`flex items-center gap-[0.8rem] px-4 py-[0.85rem] rounded-[14px] bg-transparent text-[0.95rem] font-[family-name:var(--font-plus-jakarta)] w-full text-left transition-all duration-[0.25s] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isActive ? 'bg-gradient-to-br from-[rgba(87,34,105,0.08)] to-[rgba(87,34,105,0.02)] text-brand-purple font-bold' : 'text-text-muted font-semibold hover:bg-bg-surface hover:text-text-main hover:translate-x-1'}`}
                                        onClick={() => handleNavClick(item)}
                                    >
                                        <span className={`flex items-center justify-center shrink-0 transition-all duration-[0.25s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 text-brand-purple' : 'opacity-70 group-hover:opacity-100 group-hover:scale-[1.15] group-hover:-rotate-2'}`}>{item.icon}</span>
                                        <span className="flex-1">{item.label}</span>
                                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Admin Section */}
                    {isAdmin && (
                        <>
                            <div className="h-[1px] bg-border-color shrink-0 my-3" />
                            <p className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-text-muted px-3 mb-[0.4rem]">Administration</p>
                            <ul className="flex flex-col gap-[0.2rem] mb-[0.25rem]">
                                <li className="group">
                                    <Link
                                        href={DASHBOARD_ITEM.path}
                                        className={`flex items-center gap-[0.8rem] px-4 py-[0.85rem] rounded-[14px] bg-transparent text-[0.95rem] font-[family-name:var(--font-plus-jakarta)] w-full text-left transition-all duration-[0.25s] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${pathname.startsWith('/dashboard') ? 'bg-gradient-to-br from-[rgba(87,34,105,0.12)] to-[rgba(122,61,145,0.08)] text-brand-purple font-bold translate-x-1' : 'text-text-muted font-semibold hover:bg-gradient-to-br hover:from-[rgba(87,34,105,0.12)] hover:to-[rgba(122,61,145,0.08)] hover:text-brand-purple hover:translate-x-1'}`}
                                        onClick={onClose}
                                    >
                                        <span className={`flex items-center justify-center shrink-0 transition-all duration-[0.25s] ease-[cubic-bezier(0.16,1,0.3,1)] ${pathname.startsWith('/dashboard') ? 'opacity-100 text-brand-purple' : 'opacity-70 group-hover:opacity-100 group-hover:scale-[1.15] group-hover:-rotate-2'}`}>{DASHBOARD_ITEM.icon}</span>
                                        <span className="flex-1">{DASHBOARD_ITEM.label}</span>
                                        <span className="text-[0.62rem] font-bold tracking-[0.05em] uppercase bg-gradient-to-br from-brand-purple to-brand-purple-light text-white px-2 py-[0.2rem] rounded-full shrink-0">Admin</span>
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}
                </nav>

                {/* ── FOOTER: Sign out ── */}
                {isAuthenticated && (
                    <div className="p-4 px-5 border-t border-border-color">
                        <button className="flex items-center gap-[0.65rem] w-full py-[0.7rem] px-[0.85rem] rounded-[10px] border-none bg-none text-text-muted text-[0.875rem] font-semibold font-[family-name:var(--font-plus-jakarta)] cursor-pointer transition-colors duration-[0.18s] hover:bg-[rgba(254,52,52,0.08)] hover:text-[#FE3434]" onClick={handleSignOut}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Se déconnecter
                        </button>
                    </div>
                )}

                {!isAuthenticated && (
                    <div className="p-4 px-5 border-t border-border-color">
                        <p className="text-[0.7rem] text-text-muted font-medium text-center">Charis Nation House of Excellence</p>
                    </div>
                )}
            </aside>
        </>
    );
}
