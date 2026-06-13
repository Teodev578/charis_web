'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Announcements from '../components/Announcements';
import TrackCard from '../components/TrackCard';
import AudioPlayer from '../components/AudioPlayer';

// Mock sermon notes data for the Notes tab
const mockNotes = [
    {
        id: 1,
        title: "Notes de la Rencontre Prophétique",
        date: "Vendredi 29 Mai 2026",
        speaker: "Rev. Israel Watchman",
        snippet: "La foi authentique ne recule pas devant les obstacles. L'atmosphère de prière libère la révélation. Trois points clés : 1. La consécration du cœur, 2. La persévérance active, 3. L'écoute de la voix douce de l'Esprit."
    },
    {
        id: 2,
        title: "Commentaire sur: Tarrîz Ye",
        date: "Vendredi 22 Mai 2026",
        speaker: "Rev. Israel Watchman",
        snippet: "Tarrîz Ye est un appel de consécration et d'alignement divin. Nous devons rejeter la tiédeur spirituelle et entrer dans notre dimension d'excellence. Prendre note de la référence sur Marc 11:24."
    }
];

export default function Home() {
    const [activeTab, setActiveTab] = useState('accueil');
    const [searchQuery, setSearchQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

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
        // Load the first track by default in the player
        setCurrentTrack(initialTracks[0]);
    }, []);

    // Toggle favorite state
    const handleFavoriteToggle = (id) => {
        setTracks(prevTracks => 
            prevTracks.map(track => {
                if (track.id === id) {
                    const updatedTrack = { ...track, isFavorite: !track.isFavorite };
                    // If the current playing track is favorited, update it too
                    if (currentTrack && currentTrack.id === id) {
                        setCurrentTrack(updatedTrack);
                    }
                    return updatedTrack;
                }
                return track;
            })
        );
    };

    // Load and play a track
    const handlePlay = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    // Player controls
    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleRewind = () => {
        // Find previous track in the active tracks list
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        if (currentIndex > 0) {
            handlePlay(tracks[currentIndex - 1]);
        } else {
            // Loop to end
            handlePlay(tracks[tracks.length - 1]);
        }
    };

    const handleForward = () => {
        // Find next track in the active tracks list
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        if (currentIndex < tracks.length - 1) {
            handlePlay(tracks[currentIndex + 1]);
        } else {
            // Loop to start
            handlePlay(tracks[0]);
        }
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

                    {/* Favorites Section */}
                    {favoriteTracks.length > 0 && (
                        <div>
                            <h2>
                                Réécouter vos favoris
                                <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                            </h2>
                            <div className="tracks-grid">
                                {favoriteTracks.map((track) => (
                                    <TrackCard
                                        key={track.id}
                                        track={track}
                                        isPlaying={isPlaying && currentTrack?.id === track.id}
                                        onPlay={handlePlay}
                                        onFavoriteToggle={handleFavoriteToggle}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Section (visible on mobile / desktop under favorites) */}
                    <div>
                        <h2>
                            Récent
                            <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                        </h2>
                        <div className="tracks-grid">
                            {recentTracks.map((track) => (
                                <TrackCard
                                    key={track.id}
                                    track={track}
                                    isPlaying={isPlaying && currentTrack?.id === track.id}
                                    onPlay={handlePlay}
                                    onFavoriteToggle={handleFavoriteToggle}
                                />
                            ))}
                        </div>
                    </div>
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
                                    onPlay={handlePlay}
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

            {/* Persistent Audio Player component */}
            <AudioPlayer 
                currentTrack={currentTrack} 
                isPlaying={isPlaying} 
                onTogglePlay={handleTogglePlay}
                onRewind={handleRewind}
                onForward={handleForward}
            />
        </div>
    );
}
