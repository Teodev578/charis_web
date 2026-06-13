'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function Announcements() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const announcements = [
        {
            id: 1,
            type: 'event',
            title: 'Rencontre Prophétique',
            subtitle: 'AUDITORIUM CHARIS NATION | HOUSE OF EXCELLENCE',
            date: '18H45 - VEN. 29 MAI',
            bgImage: '/images/worship_woman.png',
            accentColor: 'var(--brand-yellow)',
            isCursiveTitle: true,
            footerText: 'CHARIS NATION HOUSE OF EXCELLENCE',
            socials: true
        },
        {
            id: 2,
            type: 'event',
            title: 'Tarrîz Ye',
            subtitle: 'AVEC Rev. ISRAEL WATCHMAN',
            date: 'VEN 22 MAI À 20H GMT',
            bgImage: '/images/preacher_man.png',
            accentColor: '#FFFFFF',
            isCursiveTitle: false,
            footerText: 'CHARIS NATION HOUSE OF EXCELLENCE',
            socials: true
        },
        {
            id: 3,
            type: 'quote',
            quote: 'L\'amour de Dieu nous donne une seconde chance. Sa miséricorde nous donne une seconde chance.',
            author: 'Rev. Israel Watchman',
            subtitle: 'CHARIS NATION HOUSE OF EXCELLENCE',
            bgImage: '/images/sunset_faith.png',
            accentColor: 'var(--brand-purple)',
            footerText: 'CHARIS NATION HOUSE OF EXCELLENCE',
            socials: true
        }
    ];

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const width = scrollContainerRef.current.clientWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    const scrollToSlide = (index) => {
        if (!scrollContainerRef.current) return;
        const width = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollTo({
            left: index * width,
            behavior: 'smooth'
        });
        setActiveIndex(index);
    };

    return (
        <section className="announcements-container">
            {/* Cursive Font styling just for Card 1 title */}
            <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet" />

            <h2>
                Anonces 
                <span className="arrow-icon" style={{ fontSize: '1.2rem', marginLeft: '0.2rem' }}>&rarr;</span>
            </h2>

            {/* Banners Slider / Grid */}
            <div 
                className="announcements-grid" 
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
                {announcements.map((ann, idx) => {
                    const isQuote = ann.type === 'quote';

                    if (isQuote) {
                        return (
                            <div 
                                key={ann.id} 
                                className="announcement-card quote-card"
                                style={{ backgroundColor: '#F2EDE4' }}
                            >
                                <div 
                                    className="announcement-bg" 
                                    style={{ backgroundImage: `url(${ann.bgImage})`, opacity: 0.15 }}
                                />
                                <div className="announcement-overlay" style={{ background: 'none' }} />
                                
                                <div className="announcement-content" style={{ color: '#130717' }}>
                                    <div className="card-top">
                                        <span className="quote-icon-top" style={{ color: 'var(--brand-purple)' }}>“</span>
                                    </div>
                                    <div className="card-bottom">
                                        <p className="quote-text">
                                            {ann.quote}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                                            <div>
                                                <div className="quote-author">{ann.author}</div>
                                                <div style={{ fontSize: '0.65rem', opacity: 0.75, fontWeight: 700, marginTop: '2px' }}>
                                                    {ann.subtitle}
                                                </div>
                                            </div>
                                            <span className="quote-pill-btn">Swipe &gt;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={ann.id} className="announcement-card">
                            <div 
                                className="announcement-bg" 
                                style={{ backgroundImage: `url(${ann.bgImage})` }}
                            />
                            <div className="announcement-overlay" />
                            
                            <div className="announcement-content">
                                <div className="card-top">
                                    {/* Empty or decorative top spacer */}
                                    <div />
                                </div>

                                <div className="card-bottom">
                                    {ann.isCursiveTitle ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div style={{
                                                fontFamily: '"Italianno", cursive',
                                                fontSize: '3.2rem',
                                                color: ann.accentColor,
                                                lineHeight: 0.8,
                                                marginBottom: '0.2rem',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                            }}>
                                                Rencontre
                                            </div>
                                            <div className="announcement-title" style={{ color: '#FFFFFF', marginTop: '-0.3rem' }}>
                                                Prophétique
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                                            {ann.title === 'Tarrîz Ye' && (
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.9 }}>AVEC Rev. ISRAEL WATCHMAN</span>
                                                    <span className="announcement-title" style={{ fontSize: '2.5rem', color: '#FFFFFF', fontWeight: 900, lineHeight: 1 }}>
                                                        Tarrîz
                                                    </span>
                                                    <span className="announcement-title" style={{ fontSize: '2rem', color: 'var(--brand-yellow)', fontWeight: 900, lineHeight: 1, alignSelf: 'flex-end', marginTop: '-0.5rem' }}>
                                                        Ye
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Date & Location */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                        <div className="announcement-subtitle" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                                            {ann.subtitle.replace('AVEC ', '')}
                                        </div>
                                        <div style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            backdropFilter: 'blur(4px)',
                                            color: ann.isCursiveTitle ? 'var(--brand-yellow)' : '#FFFFFF',
                                            textAlign: 'right',
                                            lineHeight: 1.2
                                        }}>
                                            {ann.date}
                                        </div>
                                    </div>

                                    {/* Footer logo segment matching mockup exactly */}
                                    <div className="announcement-footer-logo">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            {/* Tiny cross / logo symbol */}
                                            <span style={{ color: 'var(--brand-yellow)', fontWeight: 'bold' }}>✞</span>
                                            <span>CHARIS NATION</span>
                                        </div>
                                        {ann.socials && (
                                            <div className="socials">
                                                <span>CharisNation</span>
                                                <span style={{ marginLeft: '4px', opacity: 0.8 }}>🅵 🆃 🅸 🆈</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Carousel Navigation dots (visible on mobile only via CSS) */}
            <div className="carousel-dots">
                {announcements.map((_, idx) => (
                    <button
                        key={idx}
                        className={`dot ${activeIndex === idx ? 'active' : ''}`}
                        onClick={() => scrollToSlide(idx)}
                        aria-label={`Aller au slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
