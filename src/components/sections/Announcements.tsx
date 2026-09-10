'use client';

import React, { useState, useEffect, useRef, type UIEvent } from 'react';
import { createClient } from '../../lib/supabase/client';
import AnnouncementCard from './AnnouncementCard';
import type { Database } from '../../lib/supabase/database.types';

type AnnonceRow = Database['public']['Tables']['annonces']['Row'];

// Hardcoded fallback data in case Supabase table is not populated yet
const MOCK_ANNOUNCEMENTS: AnnonceRow[] = [
  {
    id: 'mock-announcement-1',
    type: 'event',
    title: 'Prophétique',
    subtitle: 'AUDITORIUM CHARIS NATION | HOUSE OF EXCELLENCE',
    date_text: '18H45 - VEN. 29 MAI',
    bg_image: '/images/worship_woman.png',
    accent_color: 'var(--brand-yellow)',
    is_cursive_title: true,
    footer_text: 'CHARIS NATION HOUSE OF EXCELLENCE',
    socials: true,
    quote: null,
    author: null,
    est_actif: true,
    cree_le: null,
    mis_a_jour_le: null
  },
  {
    id: 'mock-announcement-2',
    type: 'event',
    title: 'Tarrîz Ye',
    subtitle: 'AVEC Rev. ISRAEL WATCHMAN',
    date_text: 'VEN 22 MAI À 20H GMT',
    bg_image: '/images/preacher_man.png',
    accent_color: '#FFFFFF',
    is_cursive_title: false,
    footer_text: 'CHARIS NATION HOUSE OF EXCELLENCE',
    socials: true,
    quote: null,
    author: null,
    est_actif: true,
    cree_le: null,
    mis_a_jour_le: null
  },
  {
    id: 'mock-announcement-3',
    type: 'quote',
    title: null,
    subtitle: 'CHARIS NATION HOUSE OF EXCELLENCE',
    date_text: null,
    bg_image: '/images/sunset_faith.png',
    accent_color: 'var(--brand-purple)',
    is_cursive_title: false,
    footer_text: 'CHARIS NATION HOUSE OF EXCELLENCE',
    socials: true,
    quote: "L'amour de Dieu nous donne une seconde chance. Sa miséricorde nous donne une seconde chance.",
    author: 'Rev. Israel Watchman',
    est_actif: true,
    cree_le: null,
    mis_a_jour_le: null
  }
];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<AnnonceRow[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('annonces')
          .select('*')
          .eq('est_actif', true)
          .order('cree_le', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setAnnouncements(data);
        } else {
          setAnnouncements(MOCK_ANNOUNCEMENTS);
        }
      } catch (err) {
        console.warn('Failed to fetch announcements from Supabase, falling back to mock data:', err);
        setAnnouncements(MOCK_ANNOUNCEMENTS);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, [supabase]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const width = target.clientWidth;
    const scrollLeft = target.scrollLeft;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <section className="mb-8 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-24 bg-[#EAE8E4] dark:bg-[#1E1E1F] rounded" />
          <div className="h-4 w-16 bg-[#EAE8E4] dark:bg-[#1E1E1F] rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="aspect-[1.15] bg-[#EAE8E4] dark:bg-[#1E1E1F] rounded-2xl" />
          <div className="aspect-[1.15] bg-[#EAE8E4] dark:bg-[#1E1E1F] rounded-2xl hidden md:block" />
          <div className="aspect-[1.15] bg-[#EAE8E4] dark:bg-[#1E1E1F] rounded-2xl hidden md:block" />
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="m-0 text-xl font-bold flex items-center gap-2">
          Bientôt !
        </h2>
        <span className="text-xs font-semibold text-[#A09E9B] hover:text-[#572269] transition-colors cursor-pointer select-none">
          Tout afficher
        </span>
      </div>

      {/* Grid on desktop, slider carousel on mobile */}
      <div 
        className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scroll-smooth pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {announcements.map((ann) => (
          <AnnouncementCard key={ann.id} annonce={ann} />
        ))}
      </div>

      {/* Carousel navigation dots (only visible on mobile via CSS) */}
      <div className="carousel-dots flex justify-center gap-2 mt-4 md:hidden">
        {announcements.map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full border-0 cursor-pointer transition-all ${
              activeIndex === idx ? 'bg-[#572269] scale-120' : 'bg-[#E2E0DC] dark:bg-[#29292A]'
            }`}
            onClick={() => scrollToSlide(idx)}
            aria-label={`Aller au slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
