'use client';

import React, { useState, useEffect } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import TrackCard from '../../components/TrackCard';
import { TrackGridSkeleton } from '../../components/SkeletonLoader';
import Link from 'next/link';

// Category icons mapping
const CATEGORY_ICONS = {
    'foi-croyance': '🙏',
    'priere': '🕊️',
    'vie-chretienne': '✨',
    'prophetie': '🔥',
    'louange-adoration': '🎵',
    'famille': '👨‍👩‍👧‍👦',
};

// Mock categories fallback
const MOCK_CATEGORIES = [
    { id: 'cat-1', nom: 'Foi & Croyance', slug: 'foi-croyance' },
    { id: 'cat-2', nom: 'Prière', slug: 'priere' },
    { id: 'cat-3', nom: 'Vie chrétienne', slug: 'vie-chretienne' },
    { id: 'cat-4', nom: 'Prophétie', slug: 'prophetie' },
    { id: 'cat-5', nom: 'Louange & Adoration', slug: 'louange-adoration' },
    { id: 'cat-6', nom: 'Famille', slug: 'famille' },
];

const MOCK_SERIES = [
    { id: 'serie-1', titre: 'Les fondements de la Foi', description: 'Une série complète sur les bases de la foi chrétienne.' },
    { id: 'serie-2', titre: 'La prière efficace', description: 'Apprenez à prier avec puissance et confiance.' },
];

const MOCK_MESSAGES = [
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
        id: 'track-4', titre: 'Vivre pleinement par l\'Esprit', orateur: 'Rev. Israel Watchman',
        image_url: '/images/preacher_man.png', duree_secondes: 1950,
        categorie_id: 'cat-4', date_publication: '2026-05-08T18:00:00Z',
    },
];

export default function ExplorerPage() {
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
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

    const handlePlayMessage = (msg) => {
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
        <div className="app-container explorer-page">
            <Link href="/" className="back-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Accueil
            </Link>

            <h1 className="explorer-title">Explorer</h1>
            <p className="explorer-subtitle">Parcourez les enseignements par catégorie ou série</p>

            {/* Search */}
            <div className="explorer-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Rechercher un enseignement..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Categories */}
            <h2>
                Catégories
                <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
            </h2>
            <div className="categories-grid">
                {(loading ? MOCK_CATEGORIES : categories).map(cat => (
                    <button
                        key={cat.id}
                        className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    >
                        <span className="category-icon">{CATEGORY_ICONS[cat.slug] || '📖'}</span>
                        <span className="category-name">{cat.nom}</span>
                    </button>
                ))}
            </div>

            {/* Series */}
            {series.length > 0 && (
                <>
                    <h2>
                        Séries
                        <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                    </h2>
                    <div className="series-grid">
                        {series.map(serie => (
                            <div key={serie.id} className="series-card">
                                <div className="series-card-icon">📚</div>
                                <div className="series-card-info">
                                    <h3 className="series-card-title">{serie.titre}</h3>
                                    {serie.description && (
                                        <p className="series-card-desc">{serie.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Messages */}
            <h2>
                {selectedCategory
                    ? categories.find(c => c.id === selectedCategory)?.nom || 'Messages'
                    : 'Tous les enseignements'}
                {selectedCategory && (
                    <button className="clear-filter-btn" onClick={() => setSelectedCategory(null)}>
                        ✕ Tout voir
                    </button>
                )}
            </h2>
            {loading ? (
                <TrackGridSkeleton count={4} />
            ) : (
                <div className="tracks-grid">
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
                        <div className="explorer-empty">
                            <p>Aucun enseignement trouvé pour cette recherche.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
