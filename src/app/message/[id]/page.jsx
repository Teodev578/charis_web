'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useAudio } from '../../../contexts/AudioContext';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';

// Mock data fallback when Supabase is not connected
const MOCK_MESSAGES = {
    'track-1': {
        id: 'track-1',
        titre: 'La foi qui déplace les montagnes',
        orateur: 'Rev. Israel Watchman',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        image_url: '/images/preacher_man.png',
        duree_secondes: 1800,
        date_publication: '2026-05-29T18:00:00Z',
        categories: { nom: 'Foi & Croyance', slug: 'foi-croyance' },
        series: { id: 'serie-1', titre: 'Les fondements de la Foi' },
        ordre_dans_la_serie: 1,
    },
    'track-2': {
        id: 'track-2',
        titre: 'Rencontre avec la grâce divine',
        orateur: 'Rev. Israel Watchman',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        image_url: '/images/worship_woman.png',
        duree_secondes: 2400,
        date_publication: '2026-05-22T18:00:00Z',
        categories: { nom: 'Prière', slug: 'priere' },
        series: null,
        ordre_dans_la_serie: null,
    },
};

export default function MessageDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const { playTrack, currentTrack, isPlaying, currentTime, duration, seek, trackNotes, addNote, deleteNote } = useAudio();
    const { user } = useAuth();
    const [message, setMessage] = useState(null);
    const [seriesMessages, setSeriesMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noteText, setNoteText] = useState('');
    const [activeTab, setActiveTab] = useState('details');

    const messageId = params.id;
    const startTime = searchParams.get('t');

    useEffect(() => {
        const loadMessage = async () => {
            setLoading(true);
            try {
                // Try Supabase first
                const { getMessageById, getMessagesBySerie } = await import('../../../lib/services/messages');
                const msg = await getMessageById(messageId);
                setMessage(msg);

                if (msg.serie_id) {
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
        if (message && startTime && !isNaN(startTime)) {
            handlePlay(parseFloat(startTime));
        }
    }, [message, startTime]);

    const handlePlay = (seekTime = null) => {
        if (!message) return;

        const track = {
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

    const handleAddNote = (e) => {
        e.preventDefault();
        if (!noteText.trim() || !message) return;
        addNote(message.id, noteText, currentTime);
        setNoteText('');
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString) => {
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
            <div className="app-container">
                <div className="message-detail-skeleton">
                    <div className="skeleton-pulse" style={{ width: '100%', height: 280, borderRadius: 20 }} />
                    <div className="skeleton-pulse" style={{ width: '70%', height: 28, borderRadius: 8, marginTop: 24 }} />
                    <div className="skeleton-pulse" style={{ width: '40%', height: 18, borderRadius: 8, marginTop: 12 }} />
                </div>
            </div>
        );
    }

    if (!message) {
        return (
            <div className="app-container">
                <div className="message-not-found">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                    <h2>Message introuvable</h2>
                    <p>Ce message n&apos;existe pas ou a été supprimé.</p>
                    <Link href="/" className="pill active">Retour à l&apos;accueil</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container message-detail-page">
            {/* Back button */}
            <Link href="/" className="back-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Retour
            </Link>

            {/* Hero section */}
            <div className="message-hero">
                <div className="message-hero-image">
                    <img
                        src={message.image_url || '/images/preacher_man.png'}
                        alt={message.titre}
                    />
                    <div className="message-hero-overlay" />
                    <button
                        className="message-hero-play"
                        onClick={() => handlePlay()}
                    >
                        {isCurrentMessage && isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="message-hero-info">
                    <h1 className="message-detail-title">{message.titre}</h1>
                    <div className="message-detail-meta">
                        <span className="message-detail-speaker">{message.orateur}</span>
                        <span className="message-detail-dot">•</span>
                        <span className="message-detail-duration">{formatTime(message.duree_secondes)}</span>
                    </div>
                    {message.categories && (
                        <span className="message-detail-category">{message.categories.nom}</span>
                    )}
                    <div className="message-detail-date">{formatDate(message.date_publication)}</div>
                </div>
            </div>

            {/* Series navigation */}
            {message.series && (
                <div className="series-nav">
                    <div className="series-nav-header">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <span>Série : {message.series.titre}</span>
                    </div>
                    <div className="series-nav-buttons">
                        {prevMessage && (
                            <Link href={`/message/${prevMessage.id}`} className="series-nav-btn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                Précédent
                            </Link>
                        )}
                        {nextMessage && (
                            <Link href={`/message/${nextMessage.id}`} className="series-nav-btn next">
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
            <div className="message-tabs">
                <button
                    className={`pill ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                >
                    Détails
                </button>
                <button
                    className={`pill ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notes')}
                >
                    Notes ({currentNotes.length})
                </button>
            </div>

            {activeTab === 'details' && (
                <div className="message-details-tab">
                    {message.series && seriesMessages.length > 0 && (
                        <div className="series-list">
                            <h3>Épisodes de la série</h3>
                            {seriesMessages.map((ep) => (
                                <Link
                                    key={ep.id}
                                    href={`/message/${ep.id}`}
                                    className={`series-episode ${ep.id === messageId ? 'active' : ''}`}
                                >
                                    <span className="series-episode-number">{ep.ordre_dans_la_serie || '—'}</span>
                                    <div className="series-episode-info">
                                        <div className="series-episode-title">{ep.titre}</div>
                                        <div className="series-episode-duration">{formatTime(ep.duree_secondes)}</div>
                                    </div>
                                    {ep.id === messageId && (
                                        <span className="series-episode-playing">En cours</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'notes' && (
                <div className="message-notes-tab">
                    <form className="inline-note-form" onSubmit={handleAddNote}>
                        <div className="inline-note-timestamp">
                            {isCurrentMessage ? formatTime(currentTime) : '0:00'}
                        </div>
                        <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Prendre une note à ce moment..."
                            className="inline-note-input"
                        />
                        <button type="submit" className="inline-note-submit" disabled={!noteText.trim()}>
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>

                    {currentNotes.length === 0 ? (
                        <div className="notes-empty-detail">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <p>Aucune note pour ce message. Lancez la lecture et notez vos révélations !</p>
                        </div>
                    ) : (
                        <div className="notes-list-detail">
                            {currentNotes.map(note => (
                                <div key={note.id} className="note-item-detail" onClick={() => seek(note.timestamp)}>
                                    <div className="note-item-detail-header">
                                        <span className="note-time-badge">{formatTime(note.timestamp)}</span>
                                        <button
                                            className="note-delete-btn"
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
                                    <p className="note-item-detail-text">{note.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
