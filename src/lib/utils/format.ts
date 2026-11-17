/**
 * Formate une durée ou position audio en secondes au format "M:SS".
 * Retourne "0:00" pour toute valeur nulle, indéfinie, négative ou NaN.
 */
export function formatTime(seconds?: number | null): string {
  if (seconds === undefined || seconds === null || isNaN(seconds) || seconds <= 0) {
    return '0:00';
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Formate une date ISO en date longue francophone (ex: "vendredi 29 mai 2026").
 */
export function formatDateFr(dateString?: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
