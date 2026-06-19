'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Announcements from '../components/Announcements';
import TrackCard from '../components/TrackCard';
import { TrackGridSkeleton } from '../components/SkeletonLoader';
import { useAudio } from '../contexts/AudioContext';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

// Mock data (used when Supabase is not connected)
const MOCK_TRACKS = [
    {
        id: 'track-1',
        title: 'La foi qui déplace les montagnes',
        subtitle: 'Rev. Israel Watchman',
        imageUrl: '/images/preacher_man.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        isFavorite: true,
        category: 'favorite',
        duration: 1800,
    },
    {
        id: 'track-2',
        title: 'Rencontre avec la grâce divine',
        subtitle: 'Rev. Israel Watchman',
        imageUrl: '/images/worship_woman.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        isFavorite: true,
        category: 'favorite',
        duration: 2400,
    },
    {
        id: 'track-3',
        title: 'Les secrets du cœur de Dieu',
        subtitle: 'Rev. Israel Watchman',
        imageUrl: '/images/sunset_faith.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        isFavorite: false,
        category: 'recent',
        duration: 2100,
    },
    {
        id: 'track-4',
        title: "Vivre pleinement par l'Esprit",
        subtitle: 'Rev. Israel Watchman',
        imageUrl: '/images/preacher_man.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        isFavorite: false,
        category: 'recent',
        duration: 1950,
    },
    {
        id: 'track-5',
        title: 'La puissance du témoignage actif',
        subtitle: 'Rev. Israel Watchman',
        imageUrl: '/images/worship_woman.png',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        isFavorite: false,
        category: 'recent',
        duration: 1650,
    },
];

export default function Home() {
    const [activeTab, setActiveTab] = useState('accueil');
    const [searchQuery, setSearchQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get global audio & auth state
    const { currentTrack, isPlaying, playTrack, getInProgressTracks, getCompletedTracks, initDefaultTrack, trackNotes } = useAudio();
    const { user, isAuthenticated } = useAuth();

    const inProgressTracks = getInProgressTracks();
    const completedTracks = getCompletedTracks();

    // Load tracks from Supabase or fallback to mock
    useEffect(() => {
        const loadTracks = async () => {
            setLoading(true);
            try {
                const { getMessages } = await import('../lib/services/messages');
                const messages = await getMessages({ limit: 20 });

                if (messages.length > 0) {
                    const formattedTracks = messages.map(msg => ({
                        id: msg.id,
                        title: msg.titre,
                        subtitle: msg.orateur,
                        imageUrl: msg.image_url || '/images/preacher_man.png',
                        audioUrl: msg.audio_url,
                        isFavorite: false,
                        category: 'recent',
                        duration: msg.duree_secondes,
                    }));
                    setTracks(formattedTracks);
                } else {
                    setTracks(MOCK_TRACKS);
                }
            } catch {
                setTracks(MOCK_TRACKS);
            } finally {
                setLoading(false);
            }
        };

        loadTracks();
    }, []);

    // Init default track
    useEffect(() => {
        if (tracks.length > 0 && !loading) {
            setTimeout(() => {
                if (inProgressTracks.length > 0) {
                    initDefaultTrack(inProgressTracks[0]);
                } else {
                    initDefaultTrack(tracks[0]);
                }
            }, 0);
        }
    }, [tracks, loading]);

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

    // Gather all notes for the Notes tab
    const allNotes = Object.entries(trackNotes).flatMap(([trackId, notes]) =>
        notes.map(note => ({
            ...note,
            trackId,
            trackTitle: tracks.find(t => t.id === trackId)?.title || 
                        inProgressTracks.find(t => t.id === trackId)?.title ||
                        completedTracks.find(t => t.id === trackId)?.title ||
                        'Message',
        }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="app-container">
            {/* Header Component */}
            <Header onSearch={setSearchQuery} />

            {/* Navigation Component */}
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main view routing based on Active Tab */}
            {activeTab === 'accueil' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    {/* Banners Component */}
                    <Announcements />

                    {/* Reprendre l'écoute (In Progress) */}
                    {inProgressTracks.length > 0 && (
                        <div className="section-resume">
                            <h2>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-yellow)" strokeWidth="2.5" style={{ marginRight: 4 }}>
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                Reprendre l&apos;écoute
                            </h2>
                            <div className="tracks-grid">
                                {inProgressTracks.slice(0, 4).map((track) => (
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
                                        <div className="track-progress-label">
                                            Écouté à {Math.round((track.currentTime / track.duration) * 100)}%
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
                                Bibliothèque &amp; Favoris
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
                        {loading ? (
                            <TrackGridSkeleton count={4} />
                        ) : (
                            <div className="tracks-grid">
                                {recentTracks.map((track) => (
                                    <TrackCard
                                        key={track.id}
                                        track={track}
                                        isPlaying={isPlaying && currentTrack?.id === track.id}
                                        onPlay={playTrack}
                                        onFavoriteToggle={handleFavoriteToggle}
                                        showDuration
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Historique complet */}
                    {completedTracks.length > 0 && (
                        <div>
                            <h2>
                                Historique d&apos;écoute
                                <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
                            </h2>
                            <div className="tracks-grid">
                                {completedTracks.map((track) => (
                                    <div key={track.id} className="completed-track-wrapper">
                                        <TrackCard
                                            track={track}
                                            isPlaying={isPlaying && currentTrack?.id === track.id}
                                            onPlay={playTrack}
                                            onFavoriteToggle={handleFavoriteToggle}
                                        />
                                        <div className="completed-badge">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Terminé
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA for non-authenticated users */}
                    {!isAuthenticated && (
                        <div className="auth-cta-banner">
                            <div className="auth-cta-content">
                                <h3>Synchronisez vos écoutes</h3>
                                <p>Connectez-vous pour sauvegarder votre progression, vos notes et vos favoris sur tous vos appareils.</p>
                            </div>
                            <Link href="/auth/signup" className="auth-cta-btn">
                                Créer un compte
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'notes' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <h2>Vos notes de prédications</h2>
                    {allNotes.length > 0 ? (
                        <div className="notes-tab-list">
                            {allNotes.map(note => (
                                <div 
                                    key={note.id} 
                                    className="note-card"
                                >
                                    <div className="note-card-header">
                                        <span className="note-card-track">{note.trackTitle}</span>
                                        <span className="note-card-time-badge" title="Cliquez pour relire à ce moment">
                                            {formatTime(note.timestamp)}
                                        </span>
                                    </div>
                                    <p className="note-card-text">{note.text}</p>
                                    <div className="note-card-date">
                                        {new Date(note.date).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="tab-empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <h3>Pas encore de notes</h3>
                            <p>Lancez un enseignement et utilisez le bouton 📝 du lecteur pour prendre des notes synchronisées.</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'favoris' && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
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
                        <div className="tab-empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <h3>Pas de favoris</h3>
                            <p>Cliquez sur le cœur d&apos;une prédication pour l&apos;ajouter à vos favoris.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
