'use client';

import React, { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useAudio, type Track } from '../../../contexts/AudioContext';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';
import type { MessageWithFullDetails } from '../../../lib/services/messages';
import type { Database } from '../../../lib/supabase/database.types';

type MessageRow = Database['public']['Tables']['messages']['Row'];

interface MockMessage extends Omit<MessageWithFullDetails, 'categories' | 'series'> {
    categories: { nom: string; slug: string } | null;
    series: { id: string; titre: string; description?: string | null } | null;
}

// Mock data fallback when Supabase is not connected
const MOCK_MESSAGES: Record<string, MockMessage> = {
    'track-1': {
        id: 'track-1',
        date_publication: '2026-05-29T18:00:00Z',
        titre: 'La foi qui déplace les montagnes',
        orateur: 'Rev. Israel Watchman',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        image_url: '/images/preacher_man.png',
        duree_secondes: 1800,
        ordre_dans_la_serie: 1,
        categorie_id: 'cat-1',
        serie_id: 'serie-1',
        utilisateur_id: null,
        categories: { nom: 'Foi & Croyance', slug: 'foi-croyance' },
        series: { id: 'serie-1', titre: 'Les fondements de la Foi', description: null },
    },
    'track-2': {
        id: 'track-2',
        date_publication: '2026-05-22T18:00:00Z',
        titre: 'Rencontre avec la grâce divine',
        orateur: 'Rev. Israel Watchman',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        image_url: '/images/worship_woman.png',
        duree_secondes: 2400,
        ordre_dans_la_serie: null,
        categorie_id: 'cat-2',
        serie_id: null,
        utilisateur_id: null,
        categories: { nom: 'Prière', slug: 'priere' },
        series: null,
    },
};

export default function MessageDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const { playTrack, currentTrack, isPlaying, currentTime, duration, seek, trackNotes, addNote, deleteNote } = useAudio();
    const { user } = useAuth();
    const [message, setMessage] = useState<MessageWithFullDetails | MockMessage | null>(null);
    const [seriesMessages, setSeriesMessages] = useState<MessageRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [noteText, setNoteText] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('details');

    const messageId = params.id as string;
    const startTime = searchParams.get('t');

    useEffect(() => {
        const loadMessage = async () => {
            setLoading(true);
            try {
                // Try Supabase first
                const { getMessageById, getMessagesBySerie } = await import('../../../lib/services/messages');
                const msg = await getMessageById(messageId);
                setMessage(msg);

                if (msg && msg.serie_id) {
                    const series = await getMessagesBySerie(msg.serie_id);
                    setSeriesMessages(series);
                }
            } catch {
                // Fallback to mock data
                const mockMsg = MOCK_MESSAGES[messageId];
                if (mockMsg) {
                    setMessage(mockMsg);
                }
            } finally {
                setLoading(false);
            }
        };

        if (messageId) loadMessage();
    }, [messageId]);

    // Auto-play with timestamp from URL
    useEffect(() => {
        if (message && startTime && !isNaN(parseFloat(startTime))) {
            handlePlay(parseFloat(startTime));
        }
    }, [message, startTime]);

    const handlePlay = (seekTime: number | null = null) => {
        if (!message) return;

        const track: Track = {
            id: message.id,
            title: message.titre,
            subtitle: message.orateur,
            imageUrl: message.image_url,
            audioUrl: message.audio_url,
            duration: message.duree_secondes,
        };

        playTrack(track);

        if (seekTime !== null) {
            setTimeout(() => seek(seekTime), 300);
        }
    };

    const handleAddNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!noteText.trim() || !message) return;
        addNote(message.id, noteText, currentTime);
        setNoteText('');
    };

    const formatTime = (seconds?: number | null) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const isCurrentMessage = currentTrack?.id === message?.id;
    const currentNotes = message ? (trackNotes[message.id] || []) : [];

    // Find previous/next in series
    const currentIndex = seriesMessages.findIndex(m => m.id === messageId);
    const prevMessage = currentIndex > 0 ? seriesMessages[currentIndex - 1] : null;
    const nextMessage = currentIndex < seriesMessages.length - 1 ? seriesMessages[currentIndex + 1] : null;

    if (loading) {
        return (
            <div className="w-full max-w-[800px] mx-auto pb-[100px] min-h-screen p-4 md:p-6 lg:p-8 animate-[fadeIn_0.5s_ease]">
                <div>
                    <div className="animate-[pulse_1.5s_ease-in-out_infinite] bg-border-color" style={{ width: '100%', height: 280, borderRadius: 20 }} />
                    <div className="animate-[pulse_1.5s_ease-in-out_infinite] bg-border-color" style={{ width: '70%', height: 28, borderRadius: 8, marginTop: 24 }} />
                    <div className="animate-[pulse_1.5s_ease-in-out_infinite] bg-border-color" style={{ width: '40%', height: 18, borderRadius: 8, marginTop: 12 }} />
                </div>
            </div>
        );
    }

    if (!message) {
        return (
            <div className="w-full max-w-[800px] mx-auto pb-[100px] min-h-screen p-4 md:p-6 lg:p-8 animate-[fadeIn_0.5s_ease]">
                <div className="flex flex-col items-center justify-center text-center py-20 px-5">
                    <svg className="mb-4 text-text-muted" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                    <h2 className="m-0 mb-3 text-2xl font-bold">Message introuvable</h2>
                    <p className="m-0 mb-8 text-text-muted text-[1.05rem]">Ce message n&apos;existe pas ou a été supprimé.</p>
                    <Link href="/ecouter" className="px-5 py-2.5 rounded-full border-none text-[0.9rem] font-bold cursor-pointer transition-all duration-200 bg-primary-accent text-primary-accent-white hover:opacity-90 no-underline">Retour aux enseignements</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[800px] mx-auto pb-[100px] min-h-screen p-4 md:p-6 lg:p-8 animate-[fadeIn_0.5s_ease]">
            {/* Back button */}
            <Link href="/ecouter" className="inline-flex items-center gap-2 text-[0.95rem] font-bold text-text-muted mb-6 transition-colors duration-200 hover:text-brand-purple no-underline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Retour
            </Link>

            {/* Hero section */}
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mb-10">
                <div className="relative w-full md:w-[280px] lg:w-[320px] aspect-square rounded-[24px] overflow-hidden shadow-xl shrink-0 group">
                    <img
                        src={message.image_url || '/images/preacher_man.png'}
                        alt={message.titre}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />
                    <button
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-purple text-white border-none flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(87,34,105,0.4)] transition-all duration-300 hover:scale-110 active:scale-95"
                        onClick={() => handlePlay()}
                    >
                        {isCurrentMessage && isPlaying ? (
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h1 className="m-0 text-3xl md:text-4xl font-black text-text-main mb-3 leading-tight font-[family-name:var(--font-plus-jakarta)]">{message.titre}</h1>
                    <div className="flex items-center flex-wrap gap-2 text-[0.95rem] font-semibold text-text-muted mb-4">
                        <span>{message.orateur}</span>
                        <span>•</span>
                        <span>{formatTime(message.duree_secondes)}</span>
                    </div>
                    {message.categories && (
                        <span className="self-start text-[0.75rem] font-bold tracking-wider uppercase bg-brand-purple/10 text-brand-purple px-3 py-1.5 rounded-lg mb-4">{message.categories.nom}</span>
                    )}
                    <div className="text-[0.85rem] text-text-muted font-medium mt-auto md:mt-6">{formatDate(message.date_publication)}</div>
                </div>
            </div>

            {/* Series navigation */}
            {message.series && (
                <div className="bg-bg-surface border border-border-color rounded-[15px] p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 font-bold text-text-main text-[0.95rem]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <span>Série : {message.series.titre}</span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {prevMessage && (
                            <Link href={`/message/${prevMessage.id}`} className="flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-bg-color border border-border-color text-[0.85rem] font-bold text-text-muted cursor-pointer transition-colors duration-200 no-underline hover:bg-brand-purple/10 hover:text-brand-purple hover:border-brand-purple/30">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                Précédent
                            </Link>
                        )}
                        {nextMessage && (
                            <Link href={`/message/${nextMessage.id}`} className="flex items-center justify-center gap-1.5 flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-bg-color border border-border-color text-[0.85rem] font-bold text-text-muted cursor-pointer transition-colors duration-200 no-underline hover:bg-brand-purple/10 hover:text-brand-purple hover:border-brand-purple/30 flex-row-reverse">
                                Suivant
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Tabs: Details / Notes */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    className={`px-5 py-2.5 rounded-full border-none text-[0.9rem] font-bold font-[family-name:var(--font-plus-jakarta)] cursor-pointer transition-all duration-200 whitespace-nowrap ${activeTab === 'details' ? 'bg-primary-accent text-primary-accent-white' : 'bg-bg-surface text-text-main hover:bg-bg-surface-hover'}`}
                    onClick={() => setActiveTab('details')}
                >
                    Détails
                </button>
                <button
                    className={`px-5 py-2.5 rounded-full border-none text-[0.9rem] font-bold font-[family-name:var(--font-plus-jakarta)] cursor-pointer transition-all duration-200 whitespace-nowrap ${activeTab === 'notes' ? 'bg-primary-accent text-primary-accent-white' : 'bg-bg-surface text-text-main hover:bg-bg-surface-hover'}`}
                    onClick={() => setActiveTab('notes')}
                >
                    Notes ({currentNotes.length})
                </button>
            </div>

            {activeTab === 'details' && (
                <div className="animate-[fadeIn_0.3s_ease]">
                    {message.series && seriesMessages.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <h3 className="m-0 mb-4 text-lg font-bold">Épisodes de la série</h3>
                            {seriesMessages.map((ep) => (
                                <Link
                                    key={ep.id}
                                    href={`/message/${ep.id}`}
                                    className={`flex items-center gap-4 p-4 rounded-[15px] bg-bg-surface border cursor-pointer transition-all duration-200 no-underline hover:-translate-y-[2px] hover:shadow-md hover:border-brand-purple/30 ${ep.id === messageId ? 'border-brand-purple bg-brand-purple/5 shadow-[0_4px_12px_rgba(87,34,105,0.1)]' : 'border-border-color'}`}
                                >
                                    <span className="w-8 h-8 rounded-full bg-bg-color text-text-muted text-[0.85rem] font-bold flex items-center justify-center shrink-0">{ep.ordre_dans_la_serie || '—'}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-[0.95rem] text-text-main mb-1">{ep.titre}</div>
                                        <div className="text-[0.8rem] text-text-muted font-medium">{formatTime(ep.duree_secondes)}</div>
                                    </div>
                                    {ep.id === messageId && (
                                        <span className="text-[0.7rem] font-bold uppercase tracking-wider bg-brand-purple text-white px-2 py-1 rounded-md shrink-0 animate-[pulse_2s_infinite]">En cours</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'notes' && (
                <div className="animate-[fadeIn_0.3s_ease]">
                    <form className="flex gap-3 bg-bg-surface p-4 rounded-[15px] border border-border-color mb-8" onSubmit={handleAddNote}>
                        <div className="flex items-center justify-center px-3 rounded-lg bg-brand-purple/10 text-brand-purple font-mono text-[0.85rem] font-bold shrink-0">
                            {isCurrentMessage ? formatTime(currentTime) : '0:00'}
                        </div>
                        <input
                            type="text"
                            value={noteText}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNoteText(e.target.value)}
                            placeholder="Prendre une note à ce moment..."
                            className="flex-1 bg-transparent border-none outline-none font-[family-name:inherit] text-text-main text-[0.95rem] placeholder:text-text-muted/60"
                        />
                        <button type="submit" className="w-10 h-10 rounded-xl border-none bg-brand-yellow text-black flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" disabled={!noteText.trim()}>
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>

                    {currentNotes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center py-12 px-4 text-text-muted">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <p>Aucune note pour ce message. Lancez la lecture et notez vos révélations !</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {currentNotes.map(note => (
                                <div key={note.id} className="bg-bg-surface p-5 rounded-[15px] border border-border-color transition-all duration-200 cursor-pointer hover:-translate-y-[2px] hover:shadow-md hover:border-brand-purple/30 group" onClick={() => seek(note.timestamp)}>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="bg-brand-purple/10 text-brand-purple text-xs font-bold px-2.5 py-1 rounded-md transition-colors hover:bg-brand-purple hover:text-white">{formatTime(note.timestamp)}</span>
                                        <button
                                            className="bg-transparent border-none p-1.5 text-text-muted/50 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNote(message.id, note.id);
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="m-0 text-[0.95rem] text-text-main leading-relaxed">{note.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
