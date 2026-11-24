import React from 'react';

export interface CharisLogoProps {
  /** Largeur et hauteur du sceau SVG en pixels. */
  size?: number;
  /** Classes utilitaires appliquées à la balise SVG (couleur courante héritée par les traits). */
  className?: string;
  /** Classe optionnelle appliquée au losange central (cœur de la croix). */
  accentClassName?: string;
  /** Libellé accessible ; s'il est omis, le logo est purement décoratif (aria-hidden). */
  title?: string;
}

/**
 * Logo vectoriel provisoire de Charis Nation.
 * Composant unique pensé pour être remplacé facilement dès réception du logo définitif.
 */
export default function CharisLogo({
  size = 28,
  className,
  accentClassName,
  title,
}: CharisLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="20" cy="20" r="18" strokeWidth="1.25" />
      <circle cx="20" cy="20" r="14.5" strokeWidth="0.75" strokeOpacity="0.45" />
      <path d="M20 5.5 C13.5 11.5 13.5 28.5 20 34.5" strokeWidth="1.05" strokeOpacity="0.78" />
      <path d="M20 5.5 C26.5 11.5 26.5 28.5 20 34.5" strokeWidth="1.05" strokeOpacity="0.78" />
      <path d="M20 7.5 V32.5" strokeWidth="1.4" />
      <path d="M11.5 17.5 H28.5" strokeWidth="1.4" />
      <path
        d="M20 14.75 L22.75 17.5 L20 20.25 L17.25 17.5 Z"
        stroke="currentColor"
        strokeWidth="1.15"
        fill="currentColor"
        fillOpacity="0.16"
        className={accentClassName}
      />
    </svg>
  );
}
