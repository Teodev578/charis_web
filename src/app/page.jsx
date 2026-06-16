'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Announcements from '../components/Announcements';
import TrackCard from '../components/TrackCard';
import { useAudio } from '../contexts/AudioContext';

// Mock sermon notes data for the Notes tab (to be replaced by localStorage notes soon)
const mockNotes = [
    {
        id: 1,
        title: "Notes de la Rencontre Prophétique",
        date: "Vendredi 29 Mai 2026",
        speaker: "Rev. Israel Watchman",
        snippet: "La foi authentique ne recule pas devant les obstacles. L'atmosphère de prière libère la révélation. Trois points clés : 1. La consécration du cœur, 2. La persévérance active, 3. L'écoute de la voix douce de l'Esprit."
    }
];

export default function Home() {
    const [activeTab, setActiveTab] = useState('accueil');
    const [searchQuery, setSearchQuery] = useState('');
    const [tracks, setTracks] = useState([]);

    // Get global audio state
    const { currentTrack, isPlaying, playTrack, getInProgressTracks, getCompletedTracks, initDefaultTrack } = useAudio();

    const inProgressTracks = getInProgressTracks();
    const completedTracks = getCompletedTracks();

    // Initialise the tracks list matching mockup styles
    useEffect(() => {
        const initialTracks = [
            {
                id: 'track-1',
                title: 'La foi qui déplace les montagnes',
                subtitle: 'Lorem ipsum dolor sit amet',
                imageUrl: '/images/preacher_man.png',
                isFavorite: true,
                category: 'favorite'
            },
            {
                id: 'track-2',
                title: 'Rencontre avec la grâce divine',
                subtitle: 'Lorem ipsum dolor sit amet',
                imageUrl: '/images/worship_woman.png',
                isFavorite: true,
                category: 'favorite'
            },
            {
                id: 'track-3',
                title: 'Les secrets du cœur de Dieu',
                subtitle: 'Lorem ipsum dolor sit amet',
                imageUrl: '/images/sunset_faith.png',
                isFavorite: false,
                category: 'recent'
            },
            {
                id: 'track-4',
                title: 'Vivre pleinement par l\'Esprit',
                subtitle: 'Lorem ipsum dolor sit amet',
                imageUrl: '/images/preacher_man.png',
                isFavorite: false,
                category: 'recent'
            },
            {
                id: 'track-5',
                title: 'La puissance du témoignage actif',
                subtitle: 'Lorem ipsum dolor sit amet',
                imageUrl: '/images/worship_woman.png',
                isFavorite: false,
                category: 'recent'
            }
        ];
        setTracks(initialTracks);
        
        // Timeout pour éviter l'appel immédiat lors du rendu SSR si applicable
        setTimeout(() => {
            if (inProgressTracks.length > 0) {
                initDefaultTrack(inProgressTracks[0]);
            } else {
                initDefaultTrack(initialTracks[0]);
            }
        }, 0);
    }, []);

    // Toggle favorite state
    const handleFavoriteToggle = (id) => {
        setTracks(prevTracks => 
            prevTracks.map(track => {
                if (track.id === id) {
                    return { ...track, isFavorite: !track.isFavorite };
                }
                return track;
            })
        );
    };

    // Filter tracks based on search query
    const filteredTracks = tracks.filter(track => {
        const query = searchQuery.toLowerCase();
        return track.title.toLowerCase().includes(query) || 
               track.subtitle.toLowerCase().includes(query);
    });

    const favoriteTracks = filteredTracks.filter(t => t.isFavorite);
    const recentTracks = filteredTracks.filter(t => !t.isFavorite);

    return (
        <div className="app-container">
            {/* Header Component */}
            <Header onSearch={setSearchQuery} />

            {/* Navigation Component */}
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main view routing based on Active Tab */}
            {activeTab === 'accueil' && (
                <>
                    {/* Banners Component */}
                    <Announcements />

                    {/* Reprendre l'écoute (In Progress) */}
                    {inProgressTracks.length > 0 && (
                        <div>
                            <h2>
                                Reprendre l'écoute
                            </h2>
                            <div className="tracks-grid">
                                {inProgressTracks.slice(0, 2).map((track) => (
                                    <div key={track.id} className="in-progress-card-wrapper">
                                        <TrackCard
                                            track={track}
                                            isPlaying={isPlaying && currentTrack?.id === track.id}
                                            onPlay={playTrack}
                                            onFavoriteToggle={handleFavoriteToggle}
                                        />
                                        <div className="track-progress-indicator">
                                            <div 
                                                className="track-progress-fill" 
                                                style={{ width: `${(track.currentTime / track.duration) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Favorites Section */}
                    {favoriteTracks.length > 0 && (
                        <div>
                            <h2>
                                Bibliothèque & Favoris
                                <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                            </h2>
                            <div className="tracks-grid">
                                {favoriteTracks.map((track) => (
                                    <TrackCard
                                        key={track.id}
                                        track={track}
                                        isPlaying={isPlaying && currentTrack?.id === track.id}
                                        onPlay={playTrack}
                                        onFavoriteToggle={handleFavoriteToggle}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Section */}
                    <div>
                        <h2>
                            Derniers Messages
                            <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                        </h2>
                        <div className="tracks-grid">
                            {recentTracks.map((track) => (
                                <TrackCard
                                    key={track.id}
                                    track={track}
                                    isPlaying={isPlaying && currentTrack?.id === track.id}
                                    onPlay={playTrack}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Historique complet */}
                    {completedTracks.length > 0 && (
                        <div>
                            <h2>
                                Historique d'écoute
                                <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                            </h2>
                            <div className="tracks-grid">
                                {completedTracks.map((track) => (
                                    <div key={track.id} style={{ opacity: 0.8 }}>
                                        <TrackCard
                                            track={track}
                                            isPlaying={isPlaying && currentTrack?.id === track.id}
                                            onPlay={playTrack}
                                            onFavoriteToggle={handleFavoriteToggle}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {activeTab === 'notes' && (
                <div style={{ animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <h2>Vos notes de prédications</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                        {mockNotes.map(note => (
                            <div 
                                key={note.id} 
                                style={{
                                    backgroundColor: 'var(--bg-surface)',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{note.title}</h3>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{note.date}</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-purple)', marginBottom: '0.75rem' }}>
                                    Prêché par : {note.speaker}
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.85, lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
                                    {note.snippet}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'favoris' && (
                <div style={{ animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <h2>Mes Favoris</h2>
                    {favoriteTracks.length > 0 ? (
                        <div className="tracks-grid" style={{ marginTop: '1rem' }}>
                            {favoriteTracks.map((track) => (
                                <TrackCard
                                    key={track.id}
                                    track={track}
                                    isPlaying={isPlaying && currentTrack?.id === track.id}
                                    onPlay={playTrack}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '1rem', opacity: 0.5 }}>
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <p>Vous n'avez pas encore de favoris. Cliquez sur le cœur d'une prédication pour l'ajouter.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
