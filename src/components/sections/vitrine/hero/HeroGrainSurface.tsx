'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Chargement dynamique du composant WebGL côté client (évite tout conflit SSR)
const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.MeshGradient),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#f2f2f2]" />,
  }
);

interface HeroGrainSurfaceProps {
  className?: string;
}

/**
 * HeroGrainSurface — Arrière-plan cinématique basé sur @paper-design/shaders-react (MeshGradient)
 * 
 * Combine le filtre de distorsion SVG "glass-effect" avec deux couches de MeshGradient :
 * - Couche 1 : Dérive organique fluide avec les couleurs d'identité (#FB5E17, #6C288B et fond #f2f2f2).
 * - Couche 2 : Voile de texture avec micro-grain diffus (grainMixer & grainOverlay).
 */
export default function HeroGrainSurface({ className = 'absolute inset-0' }: HeroGrainSurfaceProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden z-[1] ${className}`}
    >
      {/* 1. Définition du filtre SVG glass-effect */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.004" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.25" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
        </defs>
      </svg>

      {/* 2. Base neutre claire de secours */}
      <div className="absolute inset-0 bg-[#f2f2f2]" />

      {/* 3. Première couche : MeshGradient fluide principal */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#f2f2f2', '#FB5E17', '#f8dfd2', '#6C288B', '#ebe3f2']}
        speed={0.22}
        distortion={0.35}
        swirl={0.25}
        grainMixer={0.35}
        grainOverlay={0.12}
      />

      {/* 4. Deuxième couche : Voile de grain texturé en résonance */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply"
        colors={['#f2f2f2', '#FB5E17', '#6C288B']}
        speed={0.15}
        distortion={0.25}
        swirl={0.15}
        grainMixer={0.5}
        grainOverlay={0.22}
      />
    </div>
  );
}
