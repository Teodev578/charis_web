'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Home, Compass, FileText, Heart, LayoutDashboard, LogOut, Moon, Sun, User as UserIcon } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

interface SidebarItem {
  id: string;
  label: string;
  path: string | null;
  icon: React.ReactNode;
}

function NavContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, signOut, isAuthenticated, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { closeMobileMenu } = useUIStore();

  const NAV_ITEMS: SidebarItem[] = [
    {
      id: 'accueil',
      label: 'Accueil',
      path: '/',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'explorer',
      label: 'Explorer',
      path: '/explorer',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'notes',
      label: 'Notes',
      path: null, // Tab behaviour handled in landing page
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'favoris',
      label: 'Favoris',
      path: null, // Tab behaviour handled in landing page
      icon: <Heart className="w-5 h-5" />,
    },
  ];

  const getInitials = () => {
    const name = profile?.nom_complet || user?.email || '';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleNavClick = (item: SidebarItem) => {
    if (item.path) {
      router.push(item.path);
    } else {
      // If it's a tab, route to home and pass state or query param
      router.push(`/?tab=${item.id}`);
    }
    closeMobileMenu();
  };

  const getIsActive = (item: SidebarItem) => {
    if (item.path === '/explorer' && pathname === '/explorer') return true;
    if (item.path === '/' && pathname === '/') return true;
    return false;
  };

  return (
    <>
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between border-b border-[#29292A]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#572269] to-[#7a3d91] flex items-center justify-center text-white shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight font-sans">Charis Nation</span>
        </div>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-lg bg-[#29292A] hover:bg-[#3E3E40] text-[#A09E9B] hover:text-[#F8F7F4] transition-colors cursor-pointer"
          aria-label="Changer le thème"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <div>
          <p className="px-3 text-xs font-semibold text-[#A09E9B] uppercase tracking-wider mb-3">Navigation</p>
          <ul className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = getIsActive(item);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-[rgba(87,34,105,0.12)] to-[rgba(87,34,105,0.02)] text-[#FBC906]' 
                        : 'text-[#A09E9B] hover:bg-[#29292A] hover:text-[#F8F7F4] hover:translate-x-1'
                    }`}
                  >
                    <span className={`transition-transform duration-250 ${isActive ? 'text-[#FBC906]' : 'opacity-70 group-hover:opacity-100'}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FBC906]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Admin Dashboard Navigation */}
        {isAdmin && (
          <div>
            <p className="px-3 text-xs font-semibold text-[#A09E9B] uppercase tracking-wider mb-3">Administration</p>
            <ul>
              <li>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    pathname.startsWith('/dashboard')
                      ? 'bg-gradient-to-r from-[rgba(87,34,105,0.15)] to-[rgba(122,61,145,0.08)] text-[#FBC906]'
                      : 'text-[#A09E9B] hover:bg-[#29292A] hover:text-[#F8F7F4] hover:translate-x-1'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="flex-1 text-left">Dashboard Admin</span>
                  <span className="text-[10px] font-bold uppercase bg-gradient-to-br from-[#572269] to-[#7a3d91] text-white px-2 py-0.5 rounded-full">Admin</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-[#29292A] bg-[#141415]">
        {isAuthenticated ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#572269] to-[#7a3d91] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <span className="text-xs font-bold">{getInitials()}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate text-[#F8F7F4]">{profile?.nom_complet || 'Utilisateur'}</p>
                <p className="text-[11px] text-[#A09E9B] truncate">{user?.email}</p>
              </div>
            </div>
            
            <button 
              onClick={() => { signOut(); closeMobileMenu(); }}
              className="p-2 rounded-lg hover:bg-red-950/40 text-[#A09E9B] hover:text-[#FE3434] transition-colors cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link 
              href="/auth/login" 
              onClick={closeMobileMenu}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#572269] to-[#7a3d91] text-center text-xs font-semibold hover:opacity-95 shadow-md transition-all active:scale-98"
            >
              Se connecter
            </Link>
            <Link 
              href="/auth/signup" 
              onClick={closeMobileMenu}
              className="w-full py-2 rounded-xl bg-[#29292A] hover:bg-[#3E3E40] text-center text-xs font-semibold text-[#F8F7F4] transition-colors active:scale-98"
            >
              Créer un compte
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default function NavigationSidebar() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  return (
    <>
      {/* --- VUE DESKTOP (Fixe, toujours là) --- */}
      <aside className="hidden md:flex w-[260px] flex-col h-full bg-[#1A1A1B] border-r border-[#29292A] text-[#F8F7F4] flex-shrink-0 z-10">
        <NavContent />
      </aside>

      {/* --- VUE MOBILE/TABLETTE (Menu Burger + Drawer) --- */}
      <div className="md:hidden">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={closeMobileMenu}
          />
        )}
        
        {/* Drawer Mobile */}
        <aside className={`fixed inset-y-0 left-0 w-[260px] flex flex-col bg-[#1A1A1B] border-r border-[#29292A] text-[#F8F7F4] z-50 select-none transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <NavContent />
        </aside>
      </div>
    </>
  );
}
