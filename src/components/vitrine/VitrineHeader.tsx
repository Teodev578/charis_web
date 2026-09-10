'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Headphones, Sparkles, ChevronRight } from 'lucide-react';
import { VITRINE_CONFIG } from '../../lib/config/vitrine';

export default function VitrineHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#vision', label: 'Vision & Valeurs' },
    { href: '#equipe', label: 'Équipe Pastorale' },
    { href: '#enseignements', label: 'Enseignements' },
    { href: '#cultes', label: 'Cultes & Horaires' },
    { href: '#localisation', label: 'Accès' },
    { href: '#dons', label: 'Dons' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A0A21]/90 backdrop-blur-md py-3.5 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
          : 'bg-gradient-to-b from-[#1A0A21]/90 via-[#1A0A21]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Church Identity */}
          <Link href="/" className="flex items-center gap-3 group no-underline">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#572269] to-[#FBC906] p-[1.5px] shadow-lg shadow-[#572269]/30 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#1A0A21] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FBC906]" />
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-wide text-[#F7F5F2] block leading-tight">
                {VITRINE_CONFIG.churchName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#FBC906] font-semibold">
                Sanctuaire de Grâce
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-[#F7F5F2]/80 hover:text-[#FBC906] transition-colors duration-200 no-underline relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FBC906] after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/ecouter"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#572269] to-[#7a3d91] text-[#F7F5F2] font-semibold text-sm shadow-[0_4px_20px_rgba(87,34,105,0.4)] hover:shadow-[0_6px_25px_rgba(251,201,6,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all no-underline border border-white/10"
            >
              <Headphones className="w-4 h-4 text-[#FBC906]" />
              <span>Écouter nos messages</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#F7F5F2] hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A0A21]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 animate-[fadeIn_0.2s_ease]">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between text-base font-medium text-[#F7F5F2] py-2 border-b border-white/5 no-underline"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#FBC906]" />
              </a>
            ))}
            <Link
              href="/ecouter"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#572269] to-[#7a3d91] text-white font-bold text-sm shadow-lg no-underline"
            >
              <Headphones className="w-4 h-4 text-[#FBC906]" />
              <span>Écouter les enseignements</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
