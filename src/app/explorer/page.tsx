'use client';

import React, { useState, useEffect } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import TrackCard from '../../components/sections/TrackCard';
import { TrackGridSkeleton } from '../../components/ui/SkeletonLoader';
import Link from 'next/link';
import type { MessageWithDetails, SerieWithCount } from '../../lib/services/messages';
import type { Database } from '../../lib/supabase/database.types';

type CategoryRow = Database['public']['Tables']['categories']['Row'];

// Category icons mapping
const CATEGORY_ICONS: Record<string, string> = {
    'foi-croyance': '🙏',
    'priere': '🕊️',
    'vie-chretienne': '✨',
    'prophetie': '🔥',
    'louange-adoration': '🎵',
    'famille': '👨‍👩‍👧‍👦',
};

// Mock categories fallback
const MOCK_CATEGORIES: CategoryRow[] = [
    { id: 'cat-1', nom: 'Foi & Croyance', slug: 'foi-croyance' },
    { id: 'cat-2', nom: 'Prière', slug: 'priere' },
    { id: 'cat-3', nom: 'Vie chrétienne', slug: 'vie-chretienne' },
    { id: 'cat-4', nom: 'Prophétie', slug: 'prophetie' },
    { id: 'cat-5', nom: 'Louange & Adoration', slug: 'louange-adoration' },
    { id: 'cat-6', nom: 'Famille', slug: 'famille' },
];

const MOCK_SERIES: SerieWithCount[] = [
    { id: 'serie-1', titre: 'Les fondements de la Foi', description: 'Une série complète sur les bases de la foi chrétienne.', messages: null },
    { id: 'serie-2', titre: 'La prière efficace', description: 'Apprenez à prier avec puissance et confiance.', messages: null },
];

const MOCK_MESSAGES: any[] = [
    {
        id: 'track-1', titre: 'La foi qui déplace les montagnes', orateur: 'Rev. Israel Watchman',
        image_url: '/images/preacher_man.png', duree_secondes: 1800,
        categorie_id: 'cat-1', date_publication: '2026-05-29T18:00:00Z',
    },
    {
        id: 'track-2', titre: 'Rencontre avec la grâce divine', orateur: 'Rev. Israel Watchman',
        image_url: '/images/worship_woman.png', duree_secondes: 2400,
        categorie_id: 'cat-2', date_publication: '2026-05-22T18:00:00Z',
    },
    {
        id: 'track-3', titre: 'Les secrets du cœur de Dieu', orateur: 'Rev. Israel Watchman',
        image_url: '/images/sunset_faith.png', duree_secondes: 2100,
        categorie_id: 'cat-3', date_publication: '2026-05-15T18:00:00Z',
    },
    {
        id: 'track-4', titre: "Vivre pleinement par l'Esprit",
        orateur: 'Rev. Israel Watchman',
        image_url: '/images/preacher_man.png', duree_secondes: 1950,
        categorie_id: 'cat-4', date_publication: '2026-05-08T18:00:00Z',
    },
];

export default function ExplorerPage() {
    const [categories, setCategories] = useState<CategoryRow[]>([]);
    const [series, setSeries] = useState<SerieWithCount[]>([]);
    const [messages, setMessages] = useState<MessageWithDetails[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const { currentTrack, isPlaying, playTrack } = useAudio();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const { getCategories, getSeries, getMessages } = await import('../../lib/services/messages');
                const [cats, sers, msgs] = await Promise.all([
                    getCategories(),
                    getSeries(),
                    getMessages({ limit: 50 }),
                ]);
                setCategories(cats);
                setSeries(sers);
                setMessages(msgs);
            } catch {
                // Fallback to mock data
                setCategories(MOCK_CATEGORIES);
                setSeries(MOCK_SERIES);
                setMessages(MOCK_MESSAGES);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handlePlayMessage = (msg: MessageWithDetails) => {
        playTrack({
            id: msg.id,
            title: msg.titre,
            subtitle: msg.orateur,
            imageUrl: msg.image_url,
            audioUrl: msg.audio_url,
            duration: msg.duree_secondes,
        });
    };

    // Filter messages
    const filteredMessages = messages.filter(msg => {
        const matchesCategory = !selectedCategory || msg.categorie_id === selectedCategory;
        const matchesSearch = !searchQuery ||
            msg.titre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.orateur?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="w-full max-w-[800px] mx-auto pb-[100px] min-h-screen p-4 md:p-6 lg:p-8 animate-[fadeIn_0.5s_ease]">
            <Link href="/ecouter" className="inline-flex items-center gap-2 text-[0.95rem] font-bold text-text-muted mb-6 transition-colors duration-200 hover:text-brand-purple no-underline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Retour à l&apos;écoute
            </Link>

            <h1 className="m-0 text-3xl font-extrabold mb-1">Explorer</h1>
            <p className="m-0 text-[0.95rem] text-text-muted mb-8">Parcourez les enseignements par catégorie ou série</p>

            {/* Search */}
            <div className="relative mb-10">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Rechercher un enseignement..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 px-5 pl-12 rounded-[15px] border border-border-color bg-bg-surface font-[family-name:inherit] text-text-main text-[0.95rem] outline-none transition-all duration-200 focus:bg-bg-color focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,34,105,0.1)]"
                />
            </div>

            {/* Categories */}
            <h2 className="flex items-center text-xl font-bold mb-4 mt-8">
                Catégories
                <span style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                {(loading ? MOCK_CATEGORIES : categories).map(cat => (
                    <button
                        key={cat.id}
                        className={`flex flex-col items-center justify-center p-4 rounded-[15px] border border-border-color bg-bg-surface cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md hover:border-brand-purple/30 ${selectedCategory === cat.id ? 'border-brand-purple bg-brand-purple/5 shadow-[0_4px_12px_rgba(87,34,105,0.1)]' : ''}`}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    >
                        <span className="text-[2rem] mb-2">{CATEGORY_ICONS[cat.slug] || '📖'}</span>
                        <span className="text-[0.85rem] font-bold text-center text-text-main">{cat.nom}</span>
                    </button>
                ))}
            </div>

            {/* Series */}
            {series.length > 0 && (
                <>
                    <h2 className="flex items-center text-xl font-bold mb-4 mt-8">
                        Séries
                        <span style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                    </h2>
                    <div className="flex flex-col gap-3 mb-10">
                        {series.map(serie => (
                            <div key={serie.id} className="flex items-center gap-4 p-4 rounded-[15px] border border-border-color bg-bg-surface cursor-pointer transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md hover:border-brand-purple/30">
                                <div className="w-12 h-12 rounded-[12px] bg-brand-purple/10 flex items-center justify-center text-[1.5rem] shrink-0">📚</div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="m-0 text-[1rem] font-bold text-text-main mb-1">{serie.titre}</h3>
                                    {serie.description && (
                                        <p className="m-0 text-[0.85rem] text-text-muted leading-relaxed">{serie.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Messages */}
            <h2 className="flex items-center text-xl font-bold mb-4 mt-8">
                {selectedCategory
                    ? categories.find(c => c.id === selectedCategory)?.nom || 'Messages'
                    : 'Tous les enseignements'}
                {selectedCategory && (
                    <button className="ml-auto text-[0.75rem] font-bold text-text-muted bg-bg-surface border border-border-color px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-brand-purple/10 hover:text-brand-purple hover:border-brand-purple/30" onClick={() => setSelectedCategory(null)}>
                        ✕ Tout voir
                    </button>
                )}
            </h2>
            {loading ? (
                <TrackGridSkeleton count={4} />
            ) : (
                <div className="flex flex-col gap-3 mt-4">
                    {filteredMessages.map(msg => (
                        <TrackCard
                            key={msg.id}
                            track={{
                                id: msg.id,
                                title: msg.titre,
                                subtitle: msg.orateur,
                                imageUrl: msg.image_url || '/images/preacher_man.png',
                                isFavorite: false,
                                duration: msg.duree_secondes,
                            }}
                            isPlaying={isPlaying && currentTrack?.id === msg.id}
                            onPlay={() => handlePlayMessage(msg)}
                            showDuration
                        />
                    ))}
                    {filteredMessages.length === 0 && (
                        <div className="p-8 text-center bg-bg-surface rounded-[15px] border border-dashed border-border-color text-text-muted text-[0.95rem]">
                            <p>Aucun enseignement trouvé pour cette recherche.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
