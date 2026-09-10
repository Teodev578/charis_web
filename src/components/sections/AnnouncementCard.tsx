'use client';

import React from 'react';
import type { Database } from '../../lib/supabase/database.types';
import { Share2, Sparkles } from 'lucide-react';

type AnnonceRow = Database['public']['Tables']['annonces']['Row'];

interface AnnouncementCardProps {
  annonce: AnnonceRow;
  onShare?: (annonce: AnnonceRow) => void;
}

export default function AnnouncementCard({ annonce, onShare }: AnnouncementCardProps) {
  const isQuote = annonce.type === 'quote';

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(annonce);
    } else {
      if (navigator.share) {
        navigator.share({
          title: annonce.title || 'Annonce Charis Nation',
          text: isQuote ? annonce.quote || '' : `${annonce.title} - ${annonce.subtitle}`,
          url: window.location.href,
        }).catch(err => console.error(err));
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papiers !');
      }
    }
  };

  if (isQuote) {
    return (
      <div 
        className="relative aspect-[1.15] w-full rounded-2xl overflow-hidden shadow-md flex flex-col justify-end bg-[#F2EDE4] text-[#130717] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer group"
      >
        {/* Subtle decorative background image */}
        {annonce.bg_image && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 transition-transform duration-500 group-hover:scale-103"
            style={{ backgroundImage: `url(${annonce.bg_image})` }}
          />
        )}
        
        <div className="relative z-10 p-5 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-4xl text-[#572269] font-serif leading-none select-none">“</span>
            <button 
              onClick={handleShareClick}
              className="p-1.5 rounded-lg bg-black/5 hover:bg-black/10 text-[#130717]/60 hover:text-[#130717] transition-colors cursor-pointer"
              title="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold leading-relaxed line-clamp-4 text-[#130717]">
              {annonce.quote}
            </p>
            
            <div className="flex justify-between items-end w-full mt-2">
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-[#572269] truncate">{annonce.author}</div>
                <div className="text-[10px] opacity-75 font-semibold tracking-wide uppercase truncate mt-0.5">
                  {annonce.subtitle || 'CHARIS NATION HOUSE OF EXCELLENCE'}
                </div>
              </div>
              
              <span className="bg-[#FBC906] text-[#130717] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider select-none shrink-0 shadow-sm">
                Swipe &gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Event Announcement Card
  return (
    <div 
      className="relative aspect-[1.15] w-full rounded-2xl overflow-hidden shadow-md flex flex-col justify-end text-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer group"
    >
      {/* Background Image */}
      {annonce.bg_image ? (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-650 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${annonce.bg_image})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E1F] to-[#121212]" />
      )}
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 z-2" />
      
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        {/* Top actions */}
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-[#FBC906] bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/5">
            <Sparkles className="w-3 h-3 text-[#FBC906]" /> En vedette
          </span>
          <button 
            onClick={handleShareClick}
            className="p-1.5 rounded-lg bg-black/25 hover:bg-black/40 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/5 backdrop-blur-md"
            title="Partager"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col gap-2">
          {annonce.is_cursive_title ? (
            <div className="flex flex-col">
              <div 
                className="font-cursive text-5xl leading-none -mb-1 drop-shadow-md select-none"
                style={{ color: annonce.accent_color || 'var(--brand-yellow)' }}
              >
                Rencontre
              </div>
              <div className="text-xl font-extrabold tracking-tight text-white uppercase drop-shadow-sm">
                {annonce.title || 'Spéciale'}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {annonce.subtitle && (
                <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider truncate mb-0.5">
                  {annonce.subtitle}
                </span>
              )}
              <span className="text-xl font-black tracking-tight text-white uppercase line-clamp-2">
                {annonce.title}
              </span>
            </div>
          )}

          {/* Date Badge and Location */}
          <div className="flex justify-between items-center gap-2 mt-1.5">
            <div className="text-[10px] font-bold text-white/80 truncate min-w-0">
              {annonce.is_cursive_title ? (annonce.subtitle || 'CHARIS NATION') : 'AUDITORIUM CHARIS NATION'}
            </div>
            
            {annonce.date_text && (
              <div 
                className="text-[9px] font-black uppercase px-2 py-1 rounded bg-white/15 backdrop-blur-md text-white select-none whitespace-nowrap shrink-0 border border-white/5 shadow-sm"
                style={{ color: annonce.is_cursive_title ? '#FBC906' : '#FFFFFF' }}
              >
                {annonce.date_text}
              </div>
            )}
          </div>

          {/* Footer Logo & Social Icons */}
          <div className="border-t border-white/15 pt-2.5 mt-2 flex justify-between items-center text-[9px] tracking-widest text-white/60 uppercase font-bold">
            <div className="flex items-center gap-1">
              <span className="text-[#FBC906]">✞</span>
              <span>CHARIS NATION</span>
            </div>
            
            {annonce.socials && (
              <div className="flex items-center gap-2">
                <span className="normal-case text-[9px] tracking-normal font-medium text-white/50">CharisNation</span>
                <div className="flex items-center gap-1.5 text-white/50 hover:text-white/80">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FBC906] transition-colors" aria-label="Facebook">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4.5c-3.1 0-5.5 2.4-5.5 5.5V8z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FBC906] transition-colors" aria-label="Twitter">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 4.56c-.88.39-1.83.65-2.82.77 1.02-.61 1.8-1.57 2.17-2.72-.95.56-2 .97-3.12 1.19-.9-1-2.18-1.56-3.56-1.56-2.7 0-4.88 2.19-4.88 4.89 0 .38.04.75.12 1.1C5.77 8.08 2.15 6.13.73 3.16c-.42.73-.67 1.58-.67 2.48 0 1.69.86 3.19 2.17 4.07-.8-.03-1.56-.25-2.22-.61v.06c0 2.37 1.69 4.35 3.93 4.8-.41.11-.84.17-1.29.17-.31 0-.62-.03-.92-.09.62 1.95 2.43 3.37 4.58 3.41-1.68 1.32-3.8 2.11-6.1 2.11-.4 0-.79-.02-1.18-.07 2.18 1.4 4.77 2.22 7.55 2.22 9.06 0 14-7.51 14-14 0-.21 0-.43-.01-.64.97-.69 1.8-1.56 2.46-2.54z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FBC906] transition-colors" aria-label="Instagram">
                    <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FBC906] transition-colors" aria-label="YouTube">
                    <svg className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
