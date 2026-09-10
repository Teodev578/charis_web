'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Announcements from '../../components/sections/Announcements';
import TrackCard from '../../components/sections/TrackCard';
import { TrackGridSkeleton } from '../../components/ui/SkeletonLoader';
import { useAudio, type Track } from '../../contexts/AudioContext';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface HomeTrack extends Track {
    category: 'recent' | 'favorite';
}

interface NoteTabItem {
    id: string;
    text: string;
    timestamp: number;
    date: string;
    trackId: string;
    trackTitle: string;
}

// Mock data (used when Supabase is not connected)
const MOCK_TRACKS: HomeTrack[] = [
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

function EcouterContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');

    const [activeTab, setActiveTab] = useState<string>('accueil');
    const [tracks, setTracks] = useState<HomeTrack[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (tabParam && ['accueil', 'notes', 'favoris'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    // Get global audio & auth state
    const { currentTrack, isPlaying, playTrack, getInProgressTracks, getCompletedTracks, initDefaultTrack, trackNotes } = useAudio();
    const { isAuthenticated } = useAuth();

    const inProgressTracks = getInProgressTracks();
    const completedTracks = getCompletedTracks();

    // Load tracks from Supabase or fallback to mock
    useEffect(() => {
        const loadTracks = async () => {
            setLoading(true);
            try {
                const { getMessages } = await import('../../lib/services/messages');
                const messages = await getMessages({ limit: 20 });

                if (messages.length > 0) {
                    const formattedTracks: HomeTrack[] = messages.map(msg => ({
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
    const handleFavoriteToggle = (id: string) => {
        setTracks(prevTracks => 
            prevTracks.map(track => {
                if (track.id === id) {
                    return { ...track, isFavorite: !track.isFavorite };
                }
                return track;
            })
        );
    };

    const favoriteTracks = tracks.filter(t => t.isFavorite);
    const recentTracks = tracks.filter(t => !t.isFavorite);

    // Gather all notes for the Notes tab
    const allNotes: NoteTabItem[] = Object.entries(trackNotes).flatMap(([trackId, notes]) =>
        notes.map(note => ({
            id: note.id,
            text: note.text,
            timestamp: note.timestamp,
            date: note.date,
            trackId,
            trackTitle: tracks.find(t => t.id === trackId)?.title || 
                        inProgressTracks.find(t => t.id === trackId)?.title ||
                        completedTracks.find(t => t.id === trackId)?.title ||
                        'Message',
        }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const formatTime = (time?: number) => {
        if (!time || isNaN(time)) return '0:00';
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-[800px] mx-auto pb-[100px] min-h-screen p-4 md:p-6 lg:p-8 animate-[fadeIn_0.5s_ease]">
            {/* Main view routing based on Active Tab */}
            {activeTab === 'accueil' && (
                <div className="animate-[fadeIn_0.3s_ease]">
                    {/* Banners Component */}
                    <Announcements />

                    {/* Reprendre l'écoute (In Progress) */}
                    {inProgressTracks.length > 0 && (
                        <div className="relative mb-10 mt-8">
                            <div className="flex justify-between items-center">
                                <h2 className="m-0 text-[1.2rem] font-bold">
                                    Série en cours : La Foi
                                </h2>
                                <span className="text-[0.85rem] font-bold text-text-muted cursor-pointer hover:text-brand-purple">Tout afficher</span>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                {inProgressTracks.slice(0, 4).map((track) => (
                                    <div key={track.id} className="relative">
                                        <TrackCard
                                            track={track}
                                            isPlaying={isPlaying && currentTrack?.id === track.id}
                                            onPlay={playTrack}
                                            layout="list"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Favorites Section */}
                    {favoriteTracks.length > 0 && (
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <h2 className="m-0 text-[1.2rem] font-bold">
                                    Suggestions de séries
                                </h2>
                                <span className="text-[0.85rem] font-bold text-text-muted cursor-pointer hover:text-brand-purple">Tout afficher</span>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                {favoriteTracks.map((track) => (
                                    <TrackCard
                                        key={track.id}
                                        track={track}
                                        isPlaying={isPlaying && currentTrack?.id === track.id}
                                        onPlay={playTrack}
                                        layout="list"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Section */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h2 className="m-0 text-[1.2rem] font-bold">
                                Derniers Messages
                            </h2>
                            <span className="text-[0.85rem] font-bold text-text-muted cursor-pointer hover:text-brand-purple">Tout afficher</span>
                        </div>
                        {loading ? (
                            <div className="mt-4"><TrackGridSkeleton count={4} /></div>
                        ) : (
                            <div className="flex flex-col gap-3 mt-4">
                                {recentTracks.map((track) => (
                                    <TrackCard
                                        key={track.id}
                                        track={track}
                                        isPlaying={isPlaying && currentTrack?.id === track.id}
                                        onPlay={playTrack}
                                        showDuration
                                        layout="list"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Historique complet */}
                    {completedTracks.length > 0 && (
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <h2 className="m-0 text-[1.2rem] font-bold">
                                    Les plus écoutés
                                </h2>
                                <span className="text-[0.85rem] font-bold text-text-muted cursor-pointer hover:text-brand-purple">Tout afficher</span>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                {completedTracks.map((track) => (
                                    <div key={track.id} className="relative group">
                                        <TrackCard
                                            track={track}
                                            isPlaying={isPlaying && currentTrack?.id === track.id}
                                            onPlay={playTrack}
                                            layout="list"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA for non-authenticated users */}
                    {!isAuthenticated && (
                        <div className="mt-10 p-6 bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-[20px] text-white flex flex-col md:flex-row justify-between items-center gap-5 shadow-lg">
                            <div className="flex-1">
                                <h3 className="m-0 text-xl font-bold mb-2">Synchronisez vos écoutes</h3>
                                <p className="m-0 text-[0.95rem] opacity-90 leading-relaxed">Connectez-vous pour sauvegarder votre progression, vos notes et vos favoris sur tous vos appareils.</p>
                            </div>
                            <Link href="/auth/signup" className="bg-white text-brand-purple px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-transform active:scale-95 shadow-md">
                                Créer un compte
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'notes' && (
                <div className="animate-[fadeIn_0.3s_ease]">
                    <h2 className="text-[1.2rem] font-bold">Vos notes de prédications</h2>
                    {allNotes.length > 0 ? (
                        <div className="flex flex-col gap-4 mt-6">
                            {allNotes.map(note => (
                                <div 
                                    key={note.id} 
                                    className="bg-bg-surface p-5 rounded-[15px] border border-border-color transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-brand-purple/30 group"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-bold text-[0.95rem] text-text-main group-hover:text-brand-purple transition-colors">{note.trackTitle}</span>
                                        <span className="bg-brand-purple/10 text-brand-purple text-xs font-bold px-2 py-1 rounded-md cursor-pointer hover:bg-brand-purple hover:text-white transition-colors" title="Cliquez pour relire à ce moment">
                                            {formatTime(note.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-[0.95rem] text-text-muted leading-relaxed mb-4">{note.text}</p>
                                    <div className="text-[0.8rem] text-text-muted/60 font-medium">
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
                        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                            <svg className="text-border-color mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <h3 className="m-0 mb-2 text-xl font-bold text-text-main">Pas encore de notes</h3>
                            <p className="m-0 text-[0.95rem] text-text-muted max-w-[300px] leading-relaxed">Lancez un enseignement et utilisez le bouton 📝 du lecteur pour prendre des notes synchronisées.</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'favoris' && (
                <div className="animate-[fadeIn_0.3s_ease]">
                    <h2 className="text-[1.2rem] font-bold">Mes Favoris</h2>
                    {favoriteTracks.length > 0 ? (
                        <div className="flex flex-col gap-3 mt-4">
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
                        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                            <svg className="text-border-color mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <h3 className="m-0 mb-2 text-xl font-bold text-text-main">Pas de favoris</h3>
                            <p className="m-0 text-[0.95rem] text-text-muted max-w-[300px] leading-relaxed">Cliquez sur le cœur d&apos;une prédication pour l&apos;ajouter à vos favoris.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function EcouterPage() {
    return (
        <Suspense fallback={<div className="text-muted p-8 text-center text-xs">Chargement...</div>}>
            <EcouterContent />
        </Suspense>
    );
}
