# UI Patterns — Modèles obligatoires

Chaque agent qui crée ou modifie un composant UI utilise les patterns ci-dessous comme point de départ. Ne pas improviser une structure de layout : choisir le pattern qui correspond au cas, l'adapter, ne jamais le contredire.

---

## Pattern 1 — Grille de cartes responsive (TrackCard)

Cas : afficher N cartes en grille, le nombre de colonnes s'adapte à la largeur.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  gap: var(--space-4);
}

.card {
  display: flex;
  flex-direction: column;
  width: 100%;               /* toujours 100% du slot grille */
  min-width: 0;              /* autorise le rétrécissement */
  border-radius: var(--radius-lg);
  overflow: hidden;          /* clip le contenu de la carte */
}

.card__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;       /* titre sur une ligne, jamais débordant */
  min-width: 0;
}

.card__description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;          /* 2 lignes max, puis ellipsis */
}
```

**Règle** : jamais de `width` fixe sur `.card`. Jamais de `height` fixe sur `.card`. La carte s'adapte à son contenu vertical et à la grille horizontale.

---

## Pattern 2 — Ligne de liste éditoriale (style Fyrre)

Cas : liste d'enseignements avec numéro, vignette, titre, métadonnées, CTA.

```css
.track-list {
  display: flex;
  flex-direction: column;
}

.track-row {
  display: grid;
  grid-template-columns: 2ch 64px minmax(0, 1fr) auto auto;
  /* numéro | vignette | titre (flexible) | durée | bouton */
  align-items: center;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--border-color);
  min-width: 0;
}

.track-row__title {
  min-width: 0;              /* OBLIGATOIRE dans une grille minmax */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track-row__thumbnail {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  flex-shrink: 0;            /* la vignette ne rétrécit jamais */
}

/* Mobile : simplifier la grille */
@media (max-width: 640px) {
  .track-row {
    grid-template-columns: 64px minmax(0, 1fr) auto;
    /* on masque le numéro sur mobile */
  }
  .track-row__number { display: none; }
}
```

---

## Pattern 3 — Layout application (Sidebar + Contenu + Player)

Cas : l'architecture globale de l'app Charis Nation. Sidebar à gauche, contenu principal, player fixe en bas.

```css
/* Variables partagées — définies dans globals.css */
/* --sidebar-width: 260px */
/* --header-height: 64px */
/* --player-height: 80px */

.app-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  grid-template-rows: var(--header-height) minmax(0, 1fr);
  min-height: 100dvh;        /* dvh et non vh — corrige le bug iOS clavier */
}

.app-header {
  grid-column: 1 / -1;      /* s'étend sur toute la largeur */
  position: sticky;
  top: 0;
  z-index: 10;
  height: var(--header-height);
}

.app-sidebar {
  position: sticky;
  top: var(--header-height);
  height: calc(100dvh - var(--header-height));
  overflow-y: auto;
  width: var(--sidebar-width);
}

.app-main {
  min-width: 0;              /* OBLIGATOIRE — empêche le main de déborder */
  overflow-x: hidden;
  padding-bottom: var(--player-height); /* réserve l'espace du player */
}

/* Mobile : sidebar cachée, layout à une colonne */
@media (max-width: 768px) {
  .app-shell {
    grid-template-columns: minmax(0, 1fr);
  }
  .app-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100dvh;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    width: min(var(--sidebar-width), 85vw); /* ne dépasse jamais 85% de l'écran */
  }
  .app-sidebar.is-open {
    transform: translateX(0);
  }
}
```

---

## Pattern 4 — Lecteur audio flottant (AudioPlayer)

Cas : barre persistante fixée en bas de l'écran sur toutes les pages.

```css
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--player-height);
  z-index: 100;
  /* Espace de sécurité iOS Safari (encoche bas) */
  padding-bottom: env(safe-area-inset-bottom);
  /* Ombre remontante pour séparer visuellement du contenu */
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12);
}

.audio-player__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  /* info piste | contrôles | volume */
  align-items: center;
  height: 100%;
  padding-inline: var(--space-4);
  gap: var(--space-4);
}

.audio-player__track-info {
  min-width: 0;              /* OBLIGATOIRE — le titre tronque, ne déborde pas */
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.audio-player__track-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Mobile : masquer le volume, simplifier */
@media (max-width: 640px) {
  --player-height: var(--player-height-mobile); /* 72px */

  .audio-player__content {
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .audio-player__volume { display: none; }
}
```

---

## Pattern 5 — Conteneur de page centré

Cas : wrapper standard pour centrer le contenu avec des marges latérales cohérentes.

```css
.container {
  width: 100%;
  max-width: var(--container-xl);   /* 1280px */
  margin-inline: auto;
  padding-inline: var(--space-4);   /* 16px mobile */
}

@media (min-width: 768px) {
  .container { padding-inline: var(--space-8); }   /* 32px tablet */
}

@media (min-width: 1024px) {
  .container { padding-inline: var(--space-12); }  /* 48px desktop */
}
```

**Règle** : toute page de l'espace public enveloppe son contenu dans `.container`. Jamais de `max-width` ou `padding` posés directement sur `<main>` ou `<section>` sans passer par cette classe.

---

## Pattern 6 — Image responsive dans une carte ou un slot

Cas : image dont le ratio doit être préservé sans débordement.

```css
.aspect-cover {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
}

/* Ratio 16:9 */
.aspect-cover--16-9 { aspect-ratio: 16 / 9; }

/* Ratio carré */
.aspect-cover--1-1 { aspect-ratio: 1; }

.aspect-cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Règle** : toute image dont le ratio doit être contraint utilise ce pattern. Jamais `height: 200px` sur une `<img>` directe.

---

*Ces patterns sont des points de départ, pas des règles intangibles sur les noms de classes. L'agent adapte le sélecteur au composant React mais respecte la structure CSS et les propriétés critiques (`min-width: 0`, `minmax(0, 1fr)`, `overflow: hidden` sur les titres).*
