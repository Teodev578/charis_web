'use client';

import React from 'react';

export function TrackCardSkeleton() {
    return (
        <div className="skeleton-track-card">
            <div className="skeleton-artwork skeleton-pulse" />
            <div className="skeleton-text-block">
                <div className="skeleton-line skeleton-line-title skeleton-pulse" />
                <div className="skeleton-line skeleton-line-subtitle skeleton-pulse" />
            </div>
            <div className="skeleton-circle skeleton-pulse" />
        </div>
    );
}

export function AnnouncementSkeleton() {
    return (
        <div className="skeleton-announcement skeleton-pulse" />
    );
}

export function TrackGridSkeleton({ count = 4 }) {
    return (
        <div className="tracks-grid">
            {Array.from({ length: count }).map((_, i) => (
                <TrackCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function PageSkeleton() {
    return (
        <div className="skeleton-page">
            <div className="skeleton-header-bar">
                <div className="skeleton-circle skeleton-pulse" style={{ width: 44, height: 44 }} />
                <div className="skeleton-line skeleton-pulse" style={{ width: 120, height: 16 }} />
                <div style={{ flex: 1 }} />
                <div className="skeleton-circle skeleton-pulse" style={{ width: 44, height: 44 }} />
            </div>
            <div className="skeleton-pills">
                <div className="skeleton-pill skeleton-pulse" />
                <div className="skeleton-pill skeleton-pulse" />
                <div className="skeleton-pill skeleton-pulse" />
            </div>
            <div className="skeleton-section-title skeleton-pulse" />
            <AnnouncementSkeleton />
            <div className="skeleton-section-title skeleton-pulse" style={{ marginTop: '2rem' }} />
            <TrackGridSkeleton count={4} />
        </div>
    );
}
