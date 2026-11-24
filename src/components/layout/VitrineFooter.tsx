'use client';

import React from 'react';
import Link from 'next/link';
import CharisLogo from '@/components/ui/CharisLogo';
import { useAudio } from '@/contexts/AudioContext';
import { VITRINE_CONFIG } from '@/lib/config/vitrine';

export default function VitrineFooter() {
  const { currentTrack } = useAudio();
  const currentYear = new Date().getFullYear();
  const sundayService = VITRINE_CONFIG.events[0];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { href: '#hero', label: 'Accueil', isPrimary: true },
    { href: '#eglise', label: 'L’Église', isPrimary: false },
    { href: '#enseignements', label: 'Enseignements', isPrimary: false },
    { href: '#rejoindre', label: 'Nous Rejoindre', isPrimary: false },
    { href: '#dons', label: 'Soutenir', isPrimary: false },
  ];

  const socialLinks = [
    { label: 'YouTube', href: VITRINE_CONFIG.socials.youtube },
    { label: 'Facebook', href: VITRINE_CONFIG.socials.facebook },
    { label: 'Instagram', href: VITRINE_CONFIG.socials.instagram },
    { label: 'WhatsApp', href: VITRINE_CONFIG.socials.whatsapp },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <footer className={`vitrine-footer ${currentTrack ? 'vitrine-footer--with-player' : ''}`}>
      {/* Étage 1 : Bandeau éditorial supérieur clair */}
      <div className="vitrine-footer__top">
        <div className="vitrine-footer__container vitrine-footer__top-inner">
          <div className="vitrine-footer__top-grid">
            {/* Colonne gauche : Marque & Navigation verticale */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 no-underline group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C288B] rounded-sm"
              >
                <CharisLogo
                  size={28}
                  className="text-[#111111] transition-transform duration-200 group-hover:scale-105"
                  accentClassName="text-[#6C288B]"
                />
                <span className="font-serif text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111111]">
                  {VITRINE_CONFIG.churchName}
                </span>
              </Link>

              <nav aria-label="Navigation principale du pied de page" className="vitrine-footer__nav">
                <ul className="vitrine-footer__nav-list text-[13px] list-none">
                  {navLinks.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.href)}
                        className={`inline-block no-underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C288B] rounded-xs ${
                          item.isPrimary
                            ? 'font-medium text-[#111111] hover:text-[#6C288B]'
                            : 'text-[#525252] hover:text-[#6C288B]'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Zone centrale : 4 repères éditoriaux ancrés dans la configuration réelle */}
            <div className="vitrine-footer__highlights">
              <div>
                <p className="text-[13px] leading-[1.55] text-[#525252]">
                  {sundayService
                    ? `${sundayService.title} chaque ${sundayService.day.toLowerCase()}, ${sundayService.time} — ${sundayService.location}.`
                    : 'Cultes hebdomadaires de célébration, d’adoration et d’enseignement biblique.'}
                </p>
                <a
                  href="#rejoindre"
                  onClick={(e) => handleScrollTo(e, '#rejoindre')}
                  className="vitrine-footer__highlight-link inline-block text-[13px] font-medium text-[#111111] underline underline-offset-4 decoration-[#111111]/40 hover:text-[#6C288B] hover:decoration-[#6C288B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C288B]"
                >
                  Voir les horaires
                </a>
              </div>

              <div>
                <p className="text-[13px] leading-[1.55] text-[#525252]">
                  Réécoutez nos prédications audio avec prise de notes horodatées et reprise automatique.
                </p>
                <Link
                  href="/ecouter"
                  className="vitrine-footer__highlight-link inline-block text-[13px] font-medium text-[#111111] underline underline-offset-4 decoration-[#111111]/40 hover:text-[#6C288B] hover:decoration-[#6C288B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C288B]"
                >
                  Ouvrir l’écoute
                </Link>
              </div>

              <div>
                <p className="text-[13px] leading-[1.55] text-[#525252]">
                  Parcourez les enseignements par catégories et séries thématiques pour approfondir la Parole.
                </p>
                <Link
                  href="/explorer"
                  className="vitrine-footer__highlight-link inline-block text-[13px] font-medium text-[#111111] underline underline-offset-4 decoration-[#111111]/40 hover:text-[#6C288B] hover:decoration-[#6C288B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C288B]"
                >
                  Explorer le catalogue
                </Link>
              </div>

              <div>
                <p className="text-[13px] leading-[1.55] text-[#525252]">
                  {VITRINE_CONFIG.address.street}, {VITRINE_CONFIG.address.city} — {VITRINE_CONFIG.contact.phone}.
                </p>
                <a
                  href={`mailto:${VITRINE_CONFIG.contact.email}`}
                  className="vitrine-footer__highlight-link inline-block text-[13px] font-medium text-[#111111] underline underline-offset-4 decoration-[#111111]/40 hover:text-[#6C288B] hover:decoration-[#6C288B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C288B]"
                >
                  Nous écrire
                </a>
              </div>
            </div>

            {/* Colonne droite : Action compacte */}
            <div className="lg:justify-self-end">
              <Link
                href="/ecouter"
                className="vitrine-footer__cta inline-flex items-center justify-center rounded-[5px] bg-[#111111] hover:bg-[#6C288B] text-[#f2f2f2] text-xs font-semibold tracking-[0.01em] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6C288B] no-underline"
              >
                Écouter un message
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Étage 2 : Scène atmosphérique & signature monumentale */}
      <div className="vitrine-footer__stage">
        <div className="vitrine-footer__aura" aria-hidden="true" />

        <div className="vitrine-footer__container vitrine-footer__stage-inner">
          {/* Ligne médiane haute : repères d'horizon */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-medium tracking-[0.03em] text-[#525252]">
              Sanctuaire de grâce · {VITRINE_CONFIG.address.city}
            </span>
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, '#hero')}
              className="text-xs sm:text-[13px] font-medium tracking-[0.08em] uppercase text-[#111111] underline underline-offset-4 decoration-[#111111]/55 hover:text-[#6C288B] hover:decoration-[#6C288B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6C288B]"
            >
              CHARISNATION.ORG
            </a>
          </div>

          {/* Zone basse : Mot-symbole monumental + Bloc d'identité & mentions */}
          <div className="vitrine-footer__bottom-grid">
            {/* Gauche : Mot-symbole monumental + © cerclé fin */}
            <div className="inline-flex items-start gap-1.5 sm:gap-2 min-w-0">
              <span className="vitrine-footer__wordmark">
                {VITRINE_CONFIG.churchName}
              </span>
              <svg
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                className="vitrine-footer__copyright-mark"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14.25"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <path
                  d="M20.3 12.1 A5.7 5.7 0 1 0 20.3 19.9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Droite : Signature secondaire au-dessus du filet + Barre légale contraste garanti */}
            <div className="flex flex-col justify-end min-w-0">
              <div className="vitrine-footer__signature flex items-center gap-3 lg:justify-end text-[#f2f2f2] lg:text-[#111111]">
                <CharisLogo
                  size={34}
                  className="shrink-0 opacity-90"
                  accentClassName="text-[#fc7d42] lg:text-[#6C288B]"
                />
                <div className="font-serif text-sm sm:text-[15px] leading-[1.25]">
                  <div className="font-medium">Église {VITRINE_CONFIG.churchName}</div>
                  <div className="text-[#f2f2f2]/80 lg:text-[#525252]">
                    {VITRINE_CONFIG.address.country} · {VITRINE_CONFIG.address.city}
                  </div>
                </div>
              </div>

              <div className="vitrine-footer__legal flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-xs text-[#f2f2f2]/85">
                <p className="text-[#f2f2f2]/75 max-w-[14rem] sm:max-w-none leading-snug">
                  © {currentYear} {VITRINE_CONFIG.churchName}. Tous droits réservés.
                </p>

                <nav
                  aria-label="Réseaux sociaux et accès membre"
                  className="flex flex-wrap items-start gap-x-6 gap-y-2 shrink-0"
                >
                  {socialLinks.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#f2f2f2]/85 hover:text-[#fc7d42] no-underline hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fc7d42]"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <Link
                      href="/auth/login"
                      className="text-[#f2f2f2]/85 hover:text-[#fc7d42] no-underline hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fc7d42]"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-[#f2f2f2]/85 hover:text-[#fc7d42] no-underline hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fc7d42]"
                    >
                      Administration
                    </Link>
                    <a
                      href={`mailto:${VITRINE_CONFIG.contact.email}`}
                      className="text-[#f2f2f2]/85 hover:text-[#fc7d42] no-underline hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fc7d42]"
                    >
                      Contact
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
