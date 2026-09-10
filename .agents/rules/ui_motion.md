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
  --duration-instant:  80ms;   /* feedback immédiat : hover bouton, focus */
  --duration-fast:    150ms;   /* transitions UI rapides : toggle, badge */
  --duration-normal:  250ms;   /* standard : ouverture menu, slide card */
  --duration-slow:    400ms;   /* entrées de page, reveal de section */
  --duration-xslow:  600ms;   /* transitions de page entière */

  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);   /* décélération naturelle */
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);   /* symétrique, pour dialogs */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot léger, premium */
  --ease-linear: linear;
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
  transition: transform var(--duration-normal) var(--ease-spring);
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
// Hook réutilisable — src/hooks/useReveal.ts
'use client';
import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect(); // ne rejoue pas à chaque scroll
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

**Règle** : le reveal ne se rejoue pas à chaque passage. `observer.disconnect()` après le premier déclenchement. Un effet qui rejoue en scrollant haut/bas est distrayant.

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
  transition: transform var(--duration-slow) var(--ease-spring);
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
  transition: transform var(--duration-instant) var(--ease-spring);
}

.audio-player__play-btn:active {
  transform: scale(0.92);
}
```

---

## Typographie display avec `clamp()`

Toute page de l'espace public avec un titre héros utilise `clamp()`. Jamais de taille fixe pour les grands titres.

```css
/* Titre héros — scale fluide entre mobile et desktop */
.text-display {
  font-size: clamp(2.25rem, 5vw + 1rem, 4rem);
  /* 36px mobile → 64px desktop, courbe continue */
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;   /* lettre-spacing négatif sur les grands titres */
}

/* Sous-titre de section */
.text-headline {
  font-size: clamp(1.5rem, 3vw + 0.5rem, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
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

## Défilement doux global (Lenis Smooth Scrolling)

Pour conférer à la navigation une texture soyeuse et haut de gamme sans casser les mécanismes d'accessibilité ni le scroll natif, **Lenis** est le moteur de smooth scrolling recommandé sur l'ensemble de l'espace public.

### Règles d'intégration Lenis
- **Initialisation unique** dans le layout client racine (`ClientAppWrapper.tsx`).
- Ne jamais surcharger ou multiplier les instances de Lenis.
- Désactiver automatiquement ou respecter `prefers-reduced-motion`.
- Ne pas altérer le comportement des formulaires ni des zones à défilement interne (`overflow-y: auto`).

---

## Pattern Text Reveal en masque (*Split Masking*)

Pour les titres majeurs de la vitrine et du Hero, le motif d'apparition recommandé repose sur le masquage de débordement (`overflow: hidden`) combiné à une translation verticale fluide orchestrée par `motion` (Framer Motion) ou CSS :

```tsx
/* Exemple conceptuel de Text Reveal */
<div className="overflow-hidden">
  <motion.h1
    initial={{ y: "100%", opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    Bienvenue à Charis Nation
  </motion.h1>
</div>
```

**Règles du reveal :**
- L'élément conteneur direct doit porter `overflow: hidden`.
- La courbe de transition doit être douce et naturelle (décélération noble, ex: `cubic-bezier(0.16, 1, 0.3, 1)`).
- Les mots ou lignes apparaissent en cascade légère (*stagger* de 0.08s à 0.15s) pour créer une entrée majestueuse et digne.

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

