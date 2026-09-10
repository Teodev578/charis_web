'use client';

import React, { type ReactNode } from 'react';
import './dashboard.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, Mic, ListVideo, Users } from 'lucide-react';

export interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: "Vue d'ensemble", icon: LayoutDashboard },
    { href: '/dashboard/titres', label: 'Titres (Messages)', icon: Mic },
    { href: '/dashboard/categories', label: 'Catégories', icon: Layers },
    { href: '/dashboard/series', label: 'Séries', icon: ListVideo },
    { href: '/dashboard/utilisateurs', label: 'Utilisateurs', icon: Users },
  ];

  return (
    <div className="dashboard-container flex min-h-screen bg-[#F2F1EC] text-gray-900 fixed inset-0 z-[9999] overflow-hidden">
      
      {/* Sidebar Flottante */}
      <aside className="w-64 bg-white rounded-[32px] my-6 ml-6 flex flex-col shadow-sm border border-gray-100/50">
        <div className="pt-10 pb-6 px-8">
          <h1 className="text-xl font-bold text-brand-purple tracking-tight">Charis<span className="opacity-80">Admin</span></h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-3.5 transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-50 to-white text-brand-purple font-semibold shadow-[0_4px_20px_rgb(87,34,105,0.08)] rounded-2xl border border-purple-100/50' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 rounded-2xl border border-transparent'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-brand-purple' : 'text-gray-400'} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[15px]">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto p-10">
        <div className="max-w-6xl w-full mx-auto">
          {/* Header contextuel si besoin */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              {links.find(l => l.href === pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          
          {children}
        </div>
      </main>
    </div>
  );
}
