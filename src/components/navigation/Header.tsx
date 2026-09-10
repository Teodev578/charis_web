'use client';

import React, { useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUIStore } from '../../store/uiStore';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleMobileMenu } = useUIStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explorer?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b border-border bg-base md:bg-transparent">
      {/* Bouton Hamburger */}
      <button 
        onClick={toggleMobileMenu} 
        className="p-2 text-main md:hidden cursor-pointer hover:bg-surface rounded-full transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="relative flex-1 max-w-xl mx-auto">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Qu'est-ce que vous recherchez ?" 
          className="w-full bg-surface border border-border rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow text-main"
        />
      </form>

      {/* Notifications */}
      <button className="p-2 text-main cursor-pointer hover:bg-surface rounded-full transition-colors">
        <Bell className="w-6 h-6" />
      </button>
    </header>
  );
}
