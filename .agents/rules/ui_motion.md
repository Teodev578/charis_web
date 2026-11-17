# UI Motion & Micro-interactions — Règles pour agents

Ces règles s'appliquent à tout agent qui crée ou modifie un composant interactif.
Objectif : que chaque interaction donne un retour physique précis, que les transitions soient cohérentes dans tout le projet, et que l'ensemble du site se sente vivant sans jamais sacrifier les performances.

---

## Principe fondateur

Une animation réussie passe inaperçue. Elle ne dit pas "regarde comme je suis animée" — elle dit "regarde ce contenu". Toute animation qui attire l'attention sur elle-même plutôt que sur le contenu est une animation ratée.

Deux questions avant d'ajouter un effet :
1. Quel retour cela donne-t-il à l'utilisateur ?
2. Est-ce que ça ralentit le rendu ou déclenche un reflow CSS ?

Si la réponse à 2 est oui : supprimer ou réécrire. Animer uniquement `transform` et `opacity` — jamais `height`, `width`, `margin`, `top/left`.

---

## Tokens de durée — source de vérité partagée

Définir dans `globals.css`, jamais inline :

```css
:root {
  --duration-instant:    80ms;   /* feedback immédiat : clic, focus, pression tactile */
  --duration-fast:      150ms;   /* transitions UI rapides : hover bouton, badge, toggle */
  --duration-normal:    250ms;   /* standard : ouverture menu, slide card */
  --duration-slow:      400ms;   /* entrées de page, reveal de section */
  --duration-xslow:     600ms;   /* transitions de page entière, clip-path */
  --duration-editorial: 850ms;   /* chorégraphie éditoriale Vitrine (Hero, scale-through) */

  --ease-out:       cubic-bezier(0.23, 1, 0.32, 1);    /* décélération franche UI */
  --ease-in-out:    cubic-bezier(0.77, 0, 0.175, 1);   /* mouvement / clip-path sur écran */
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);    /* inertie quintique éditoriale */
  --ease-expo:      cubic-bezier(0.16, 1, 0.3, 1);     /* décélération exponentielle sans rebond */
  --ease-drawer:    cubic-bezier(0.32, 0.72, 0, 1);    /* tiroirs et lecteur flottant */
  --ease-linear:    linear;
}
```

Tout `transition` ou `animation` dans le projet utilise ces variables. Jamais `transition: all 0.3s ease` — trop large, trop lent, trop générique.

---

## Hover states — règles obligatoires

Tout élément interactif (carte, bouton, lien, icône cliquable) a un hover state visible et immédiat.

### TrackCard / carte d'enseignement

```css
.track-card {
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
  will-change: transform;
}

.track-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.track-card:active {
  transform: translateY(-1px);  /* retour partiel au clic */
  transition-duration: var(--duration-instant);
}
```

**Règle** : élévation par `translateY` uniquement, jamais par `margin-top`. Le `will-change: transform` prévient le browser avant l'interaction — ne l'ajouter que sur les éléments qui bougent à coup sûr, pas sur toute la page.

### Boutons

```css
.btn {
  transition:
    background-color var(--duration-instant) var(--ease-out),
    transform var(--duration-instant) var(--ease-out),
    box-shadow var(--duration-instant) var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn:focus-visible {
  outline: 2px solid var(--brand-purple);
  outline-offset: 3px;
}
```

**Règle** : `focus-visible` obligatoire sur tous les éléments interactifs. Jamais `outline: none` sans alternative visible.

### Liens de navigation

```css
.nav-link {
  position: relative;
  transition: color var(--duration-fast) var(--ease-out);
}

/* Soulignement animé — pattern premium */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--brand-purple);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-normal) var(--ease-out);
}

.nav-link:hover::after,
.nav-link[aria-current="page"]::after {
  transform: scaleX(1);
}
```

---

## Scroll reveal — entrées de section

Pattern léger sans dépendance externe. Utiliser `IntersectionObserver` côté client avec `'use client'`.

```css
/* État initial — invisible et décalé vers le bas */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

/* Classe ajoutée par IntersectionObserver quand l'élément entre dans le viewport */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Décalage en cascade pour les listes */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 60ms; }
.reveal:nth-child(3) { transition-delay: 120ms; }
.reveal:nth-child(4) { transition-delay: 180ms; }
```

```tsx
// Hooks réutilisables (zéro dépendance) — src/hooks/useReveal.ts & src/hooks/useScrollProgress.ts
// 1. useReveal<T extends HTMLElement>() : observe l'entrée dans le viewport, pose data-visible="true",
//    respecte prefers-reduced-motion et évite tout re-render React.
// 2. useScrollProgress<T extends HTMLElement>(onProgress) : pilote un scale-through / parallaxe
//    directement via requestAnimationFrame passif sur le nœud DOM cible, sans state haute fréquence.
```

**Règle** : le reveal ne se rejoue pas à chaque passage (`once: true` par défaut via `observer.disconnect()` après le premier déclenchement). Tout effet `:hover` spatialisé ou aperçu flottant sur une liste doit être protégé par `@media (hover: hover) and (pointer: fine)` afin de ne jamais bloquer le tactile mobile.

---

## Transitions de page (View Transitions API)

Next.js App Router supporte View Transitions nativement. Utiliser pour les navigations entre pages.

```css
/* Dans globals.css */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-8px); }
}

::view-transition-old(root) {
  animation: var(--duration-normal) var(--ease-in-out) fade-out;
}

::view-transition-new(root) {
  animation: var(--duration-normal) var(--ease-in-out) fade-in;
}
```

**Règle** : ne pas utiliser de transition de page complexe (slide latéral, flip) — trop violent sur mobile. Un fondu avec léger mouvement vertical est suffisant et universel.

---

## AudioPlayer — animations d'état

Le lecteur flottant a trois états : absent, apparition, actif. Chaque transition est définie.

```css
.audio-player {
  transform: translateY(100%);        /* état initial : hors écran */
  transition: transform var(--duration-slow) var(--ease-drawer);
}

.audio-player.is-active {
  transform: translateY(0);           /* slide-up au premier play */
}

/* Barre de progression */
.audio-player__progress-bar {
  transition: width var(--duration-instant) var(--ease-linear);
  /* width mise à jour toutes les secondes par audioRef — doit être instantanée */
}

/* Bouton play/pause */
.audio-player__play-btn {
  transition: transform var(--duration-instant) var(--ease-out);
}

.audio-player__play-btn:active {
  transform: scale(0.92);
}
```

---

## Typographie display avec `clamp()`

Toute page de l'espace public avec un titre héros utilise `clamp()`. Jamais de taille fixe pour les grands titres.

```css
/* Titre héros — scale fluide entre mobile et desktop (diacritiques français préservés) */
.type-display {
  font-size: var(--text-display);
  font-weight: 600;
  line-height: var(--leading-display); /* >= 1.12 pour préserver É, À, È */
  letter-spacing: var(--tracking-display);
  text-wrap: balance;
}

/* Sous-titre de section */
.type-headline {
  font-size: var(--text-headline);
  font-weight: 600;
  line-height: var(--leading-headline);
  letter-spacing: -0.02em;
  text-wrap: balance;
}
```

**Règle** : `letter-spacing` négatif uniquement sur les tailles `display` et `headline`. Jamais sur le corps de texte — ça détruit la lisibilité.

---

## Règle `prefers-reduced-motion` — obligatoire

Tout agent qui écrit des animations doit ajouter ce bloc. Sans exception.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Placer ce bloc dans `globals.css` une seule fois. Ne pas le dupliquer dans chaque composant.

**Pourquoi** : certains utilisateurs ont des troubles vestibulaires — les animations déclenchent nausées et vertiges. Ce paramètre est une préférence système que le navigateur expose. L'ignorer est une faute d'accessibilité.

---

---

## Défilement doux global & Dépendances externes (Sous Consentement)

> **Invariant de gouvernance** : ni `lenis` ni `motion` (Framer Motion) ne sont installés dans `package.json` à ce stade. Leur ajout éventuel requiert une validation explicite de l'utilisateur (`AGENTS.md` §2). Tant qu'aucune bibliothèque externe n'est validée, l'ensemble des effets repose sur les tokens CSS de `globals.css`, la View Transitions API, `useReveal` et `useScrollProgress`.

Si **Lenis** est ultérieurement validé pour conférer une inertie douce sur l'espace public :

### Règles d'intégration Lenis
- **Initialisation unique** dans le layout client racine (`ClientAppWrapper.tsx`).
- Ne jamais surcharger ou multiplier les instances de Lenis.
- Désactiver automatiquement ou respecter `prefers-reduced-motion`.
- Ne pas altérer le comportement des formulaires ni des zones à défilement interne (`overflow-y: auto`).

---

## Pattern Text Reveal en masque (*Split Masking*)

Pour les titres majeurs de la vitrine et du Hero, le motif d'apparition recommandé repose sur le masquage de débordement (`overflow: hidden`) combiné à une translation verticale GPU (`transform: translate3d(0, 110%, 0)` vers `0`) pilotée en CSS pur via `.motion-mask-reveal` / `.motion-mask-reveal__line` + `useReveal` (ou ultérieurement `motion` si validé). Toujours conserver un `padding-top: 0.12em` dans le masque pour éviter le rognage des majuscules accentuées françaises (`É`, `À`, `È`).

---

## Ce qu'on ne fait pas

- **Jamais de Custom Cursor** : Les curseurs personnalisés créent de la latence visuelle, perturbent l'accessibilité pour les utilisateurs novices et sont inopérants sur 70%+ de trafic mobile.
- **Jamais de Preloader bloquant** : Ne jamais insérer d'écran de chargement artificiel qui bloque la page au démarrage ; cela détruit le score LCP (Largest Contentful Paint) et agace les visiteurs.
- Jamais `transition: all` — trop large, anime des propriétés coûteuses sans le savoir.
- Jamais animer `height`, `width`, `margin`, `padding`, `top`, `left` — déclenche un reflow complet du layout à chaque frame. Utiliser `transform: scaleY()` ou `max-height` avec prudence.
- Jamais d'animation en boucle infinie sur du contenu statique (`animation: spin 2s infinite`) — distrayant et énergivore.
- Jamais de durée > 600ms sur une interaction utilisateur directe (clic, hover) — au-delà, l'interface paraît lente.
- Jamais de `will-change: transform` posé globalement sur des dizaines d'éléments — crée des couches GPU inutiles et consomme de la mémoire.

---

*Ces règles s'appliquent en complément de `layout_constraints.md`, `ui_patterns.md`, `ui_forbidden.md` et `aesthetic_standards.md`.*

