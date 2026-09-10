'use client';

import React from 'react';

export function TrackCardSkeleton() {
    return (
        <div className="flex items-center gap-3 bg-bg-surface p-3 rounded-[15px]">
            <div className="w-[50px] h-[50px] rounded-[10px] bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" />
            <div className="flex flex-col gap-2 flex-1">
                <div className="h-2.5 rounded-full bg-border-color w-[60%] animate-[pulse_1.5s_ease-in-out_infinite]" />
                <div className="h-2.5 rounded-full bg-border-color w-[40%] opacity-60 animate-[pulse_1.5s_ease-in-out_infinite]" />
            </div>
            <div className="w-8 h-8 rounded-full bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
    );
}

export function AnnouncementSkeleton() {
    return (
        <div className="w-full aspect-[1.15] rounded-2xl bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" />
    );
}

export interface TrackGridSkeletonProps {
    count?: number;
}

export function TrackGridSkeleton({ count = 4 }: TrackGridSkeletonProps) {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, i) => (
                <TrackCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function PageSkeleton() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-[800px] mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="rounded-full bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ width: 44, height: 44 }} />
                <div className="h-2.5 rounded-full bg-border-color animate-[pulse_1.5s_ease-in-out_infinite]" style={{ width: 120, height: 16 }} />
                <div style={{ flex: 1 }} />
                <div className="rounded-full bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ width: 44, height: 44 }} />
            </div>
            <div className="flex gap-2 mb-6 overflow-x-hidden">
                <div className="w-20 h-9 rounded-full bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" />
                <div className="w-20 h-9 rounded-full bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" />
                <div className="w-20 h-9 rounded-full bg-border-color shrink-0 animate-[pulse_1.5s_ease-in-out_infinite]" />
            </div>
            <div className="w-32 h-6 rounded-full bg-border-color mb-4 animate-[pulse_1.5s_ease-in-out_infinite]" />
            <AnnouncementSkeleton />
            <div className="w-32 h-6 rounded-full bg-border-color mb-4 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ marginTop: '2rem' }} />
            <TrackGridSkeleton count={4} />
        </div>
    );
}
