'use client';

import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { FileText, Music, Send, Trash2, ArrowDown, Play, Pause, RotateCcw, RotateCw, Share2, Download, Heart, ChevronDown } from 'lucide-react';

export default function RightPanel() {
  const {
    currentTrack,
    trackNotes,
    addNote,
    deleteNote,
    seek,
    currentTime,
    duration,
    isPlaying,
    togglePlay,
    skip,
  } = useAudio();

  const [activeTab, setActiveTab] = useState<'lecture' | 'notes'>('lecture');
  const [noteText, setNoteText] = useState<string>('');
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const currentNotes = currentTrack ? (trackNotes[currentTrack.id] || []) : [];

  const handleAddNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!noteText.trim() || !currentTrack) return;
    addNote(currentTrack.id, noteText, currentTime);
    setNoteText('');
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    seek(percent * duration);
  };

  if (!currentTrack) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-surface select-none">
        <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-muted mb-4 shadow-sm animate-pulse">
          <Music className="w-8 h-8 opacity-40" />
        </div>
        <h3 className="text-base font-bold text-main mb-2">Aucune lecture active</h3>
        <p className="text-xs text-muted max-w-[220px] leading-relaxed">
          Choisissez un enseignement dans l'accueil ou l'explorateur pour démarrer l'écoute et afficher ses détails.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-surface text-main select-none overflow-hidden">
      {/* Top Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between shrink-0">
        <button className="w-10 h-10 rounded-[14px] bg-card flex items-center justify-center text-main hover:bg-card/80 transition-colors cursor-pointer border-none" aria-label="Fermer le lecteur">
          <ChevronDown className="w-5 h-5" />
        </button>
        
        <div className="flex bg-card rounded-full p-1">
          <button 
            onClick={() => setActiveTab('lecture')} 
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border-none ${activeTab === 'lecture' ? 'bg-main text-surface shadow-md' : 'bg-transparent text-muted hover:text-main'}`}
          >
            <Music className="w-4 h-4" /> Lecture
          </button>
          <button 
            onClick={() => setActiveTab('notes')} 
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer border-none ${activeTab === 'notes' ? 'bg-main text-surface shadow-md' : 'bg-transparent text-muted hover:text-main'}`}
          >
            <FileText className="w-4 h-4" /> Notes
          </button>
        </div>
        
        <div className="w-10 h-10" /> {/* Spacer to balance flex-between */}
      </div>

      {/* Main Content Area */}
      {activeTab === 'lecture' ? (
        <div className="flex-1 overflow-y-auto px-6 py-2 flex flex-col justify-between">
          <div>
            {/* Artwork */}
            <div className="w-full aspect-square rounded-[24px] overflow-hidden shadow-2xl mb-8 mx-auto max-w-[320px]">
              <img src={currentTrack.imageUrl || '/images/preacher_man.png'} alt={currentTrack.title} className="w-full h-full object-cover" />
            </div>

            {/* Titles */}
            <div className="text-left mb-6">
              <h2 className="text-[22px] font-extrabold text-main mb-1.5 leading-tight">{currentTrack.title}</h2>
              <p className="text-[15px] font-medium text-muted">{currentTrack.subtitle || "Charis Nation"}</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="w-full h-6 flex items-center relative cursor-pointer mb-2" onClick={handleProgressClick}>
                <div className="w-full h-1 bg-card rounded-full relative group overflow-hidden md:overflow-visible">
                  <div className="h-full bg-main rounded-full transition-all duration-100" style={{ width: `${progressPercent}%` }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-main rounded-full shadow-md pointer-events-none" style={{ left: `calc(${progressPercent}% - 7px)` }} />
                </div>
              </div>
              <div className="flex justify-between text-sm font-medium text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <button onClick={() => skip(-10)} className="text-main hover:text-muted transition-colors cursor-pointer bg-transparent border-none" aria-label="Reculer de 10s">
                <RotateCcw className="w-8 h-8" />
              </button>
              <button 
                onClick={togglePlay} 
                className="w-20 h-20 rounded-full bg-brand-purple text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer border-none"
                aria-label={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current text-white" /> : <Play className="w-8 h-8 fill-current ml-1 text-white" />}
              </button>
              <button onClick={() => skip(10)} className="text-main hover:text-muted transition-colors cursor-pointer bg-transparent border-none" aria-label="Avancer de 10s">
                <RotateCw className="w-8 h-8" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-5 mb-8">
              <button className="w-12 h-12 rounded-full bg-card text-main flex items-center justify-center hover:bg-card/80 transition-colors cursor-pointer border-none shadow-sm" aria-label="Partager">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-card text-main flex items-center justify-center hover:bg-card/80 transition-colors cursor-pointer border-none shadow-sm" aria-label="Télécharger">
                <Download className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-card text-main flex items-center justify-center hover:bg-card/80 transition-colors cursor-pointer border-none shadow-sm" aria-label="Favoris">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-auto">
            {/* Info Trigger */}
            <div className="text-center mb-4">
              <button className="text-sm font-semibold text-muted hover:text-main transition-colors flex items-center gap-1 mx-auto cursor-pointer bg-transparent border-none" onClick={() => setShowInfo(!showInfo)}>
                Plus d'informations <ArrowDown className={`w-4 h-4 transition-transform ${showInfo ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Info Card */}
            {showInfo && (
              <div className="bg-card rounded-[20px] p-5 mb-4 shadow-sm">
                <h3 className="text-lg font-bold text-main mb-2 leading-tight uppercase tracking-wide">{currentTrack.title}</h3>
                <p className="text-[15px] font-medium text-muted mb-3">18 juin 2026</p>
                <p className="text-sm font-medium text-muted mb-1">Série : La foi</p>
                <p className="text-sm font-medium text-muted mb-4">Avec : {currentTrack.subtitle || 'Le Rev. Israel Watchman'}</p>
                <p className="text-sm font-medium text-muted mb-1">Description :</p>
                <p className="text-sm font-medium text-muted leading-relaxed">Il restaure ce qui semblait perdu. Il relève ce qui était brisé. Il redonne vie là où il n'y avait plus d'espoir.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-3 flex-1 min-h-0">
            {/* Note input form */}
            <form onSubmit={handleAddNote} className="flex gap-2 shrink-0">
              <input
                type="text"
                value={noteText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNoteText(e.target.value)}
                placeholder="Prendre une note synchronisée..."
                className="flex-1 text-sm py-3 px-4 rounded-xl border border-border bg-card text-main outline-none focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(87,34,105,0.05)] transition-all"
              />
              <button
                type="submit"
                className="bg-brand-purple hover:bg-brand-purple/90 active:scale-95 text-white border-none w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all flex-shrink-0 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Scrollable list of notes */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
              {currentNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-card/40 rounded-2xl border border-dashed border-border h-full">
                  <p className="text-sm text-muted leading-relaxed">
                    Aucune note pour ce message.<br />Notez vos pensées et révélations en direct !
                  </p>
                </div>
              ) : (
                currentNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-card p-4 rounded-xl border border-border/60 hover:border-brand-purple/40 transition-all flex flex-col gap-2 cursor-pointer group shadow-sm"
                    onClick={() => seek(note.timestamp)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-full">
                        {formatTime(note.timestamp)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(currentTrack.id, note.id);
                        }}
                        className="text-muted hover:text-attention opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-attention/10 cursor-pointer border-none bg-transparent"
                        title="Supprimer la note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-main leading-relaxed m-0">{note.text}</p>
                    <span className="text-[10px] text-muted self-end">
                      {new Date(note.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
