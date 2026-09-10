'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircle, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { VITRINE_CONFIG } from '../../lib/config/vitrine';

export default function VitrineFooter() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#14071a] border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-[#F7F5F2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 no-underline">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#572269] to-[#FBC906] p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-[#1A0A21] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#FBC906]" />
                </div>
              </div>
              <span className="font-serif font-bold text-xl tracking-wide text-[#F7F5F2]">
                {VITRINE_CONFIG.churchName}
              </span>
            </Link>

            <p className="text-sm text-[#F7F5F2]/70 leading-relaxed max-w-sm mb-6">
              {VITRINE_CONFIG.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {VITRINE_CONFIG.socials.youtube && (
                <a
                  href={VITRINE_CONFIG.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#572269] border border-white/10 flex items-center justify-center text-[#F7F5F2] hover:text-[#FBC906] transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {VITRINE_CONFIG.socials.facebook && (
                <a
                  href={VITRINE_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#572269] border border-white/10 flex items-center justify-center text-[#F7F5F2] hover:text-[#FBC906] transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {VITRINE_CONFIG.socials.whatsapp && (
                <a
                  href={VITRINE_CONFIG.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#572269] border border-white/10 flex items-center justify-center text-[#F7F5F2] hover:text-[#FBC906] transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {VITRINE_CONFIG.socials.instagram && (
                <a
                  href={VITRINE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#572269] border border-white/10 flex items-center justify-center text-[#F7F5F2] hover:text-[#FBC906] transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#FBC906] uppercase tracking-wider mb-5">
              L’Église
            </h4>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              <li>
                <a
                  href="#vision"
                  onClick={(e) => handleScrollTo(e, '#vision')}
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Vision & Valeurs
                </a>
              </li>
              <li>
                <a
                  href="#equipe"
                  onClick={(e) => handleScrollTo(e, '#equipe')}
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Équipe Pastorale
                </a>
              </li>
              <li>
                <a
                  href="#cultes"
                  onClick={(e) => handleScrollTo(e, '#cultes')}
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Cultes & Rendez-vous
                </a>
              </li>
              <li>
                <a
                  href="#localisation"
                  onClick={(e) => handleScrollTo(e, '#localisation')}
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Plan d’accès & Contact
                </a>
              </li>
              <li>
                <a
                  href="#dons"
                  onClick={(e) => handleScrollTo(e, '#dons')}
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Faire un don
                </a>
              </li>
            </ul>
          </div>

          {/* Spiritual Media Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#FBC906] uppercase tracking-wider mb-5">
              Plateforme Audio
            </h4>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              <li>
                <Link
                  href="/ecouter"
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Espace Écoute & Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/explorer"
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Catalogue des Enseignements
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-[#F7F5F2]/70 hover:text-[#FBC906] transition-colors no-underline"
                >
                  Connexion Membre
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-[#F7F5F2]/40 hover:text-[#FBC906] transition-colors no-underline text-xs"
                >
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#FBC906] uppercase tracking-wider mb-5">
              Nous Joindre
            </h4>
            <div className="space-y-3 text-xs text-[#F7F5F2]/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FBC906] shrink-0 mt-0.5" />
                <span>{VITRINE_CONFIG.address.street}, {VITRINE_CONFIG.address.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FBC906] shrink-0" />
                <a href={`tel:${VITRINE_CONFIG.contact.phone}`} className="hover:text-[#FBC906] transition-colors no-underline text-inherit">
                  {VITRINE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FBC906] shrink-0" />
                <a href={`mailto:${VITRINE_CONFIG.contact.email}`} className="hover:text-[#FBC906] transition-colors no-underline text-inherit">
                  {VITRINE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F5F2]/50">
          <p>© {new Date().getFullYear()} {VITRINE_CONFIG.churchName}. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            <span>Bâti avec grâce et foi</span>
            <Heart className="w-3.5 h-3.5 text-[#FBC906] fill-[#FBC906]" />
            <span>pour l’Église de Christ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
