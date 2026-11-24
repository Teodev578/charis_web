'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Headphones, Sparkles, ChevronRight } from 'lucide-react';
import { VITRINE_CONFIG } from '@/lib/config/vitrine';

export default function VitrineHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // N'apparaît que lorsque l'utilisateur a défilé en dehors du Hero blanc
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#eglise', label: 'L’Église' },
    { href: '#enseignements', label: 'Enseignements' },
    { href: '#rejoindre', label: 'Nous Rejoindre' },
    { href: '#dons', label: 'Soutenir' },
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
      className={`fixed top-0 left-0 right-0 z-40 py-3.5 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-[#f2f2f2]/92 backdrop-blur-md border-b border-[#111111]/10 shadow-[0_10px_30px_rgba(17,17,17,0.06)] opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Church Identity */}
          <Link href="/" className="flex items-center gap-2.5 group no-underline">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C288B] to-[#fc7d42] p-[1.5px] shadow-sm shadow-[#6C288B]/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#111111] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#fc7d42]" />
              </div>
            </div>
            <span className="vitrine-wordmark text-[#111111] transition-opacity group-hover:opacity-80">
              {VITRINE_CONFIG.churchName}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="vitrine-nav-link text-[#333333] hover:text-[#fc7d42] transition-colors duration-200 no-underline relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#fc7d42] after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/ecouter"
              className="vitrine-nav-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#6C288B] text-[#f2f2f2] shadow-[0_4px_18px_rgba(17,17,17,0.14)] hover:shadow-[0_6px_24px_rgba(108,40,139,0.28)] hover:scale-[1.02] active:scale-[0.98] transition-all no-underline border border-[#111111]/10"
            >
              <Headphones className="w-4 h-4 text-[#fc7d42]" />
              <span>Écouter nos messages</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#111111]/10 text-[#111111] hover:bg-[#111111]/5 transition-colors cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f2f2f2]/98 backdrop-blur-xl border-b border-[#111111]/10 px-6 py-6 animate-[fadeIn_0.2s_ease]">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between font-jakarta text-base font-medium tracking-[-0.01em] text-[#111111] py-2 border-b border-[#111111]/8 no-underline"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#fc7d42]" />
              </a>
            ))}
            <Link
              href="/ecouter"
              onClick={() => setMobileMenuOpen(false)}
              className="vitrine-nav-cta mt-4 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#111111] hover:bg-[#6C288B] text-[#f2f2f2] shadow-lg no-underline transition-colors"
            >
              <Headphones className="w-4 h-4 text-[#fc7d42]" />
              <span>Écouter les enseignements</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
