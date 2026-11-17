---
name: Charis Nation
description: Sanctuaire éditorial articulant une vitrine institutionnelle sobre et une application d'écoute spirituelle avec prise de notes synchronisée.
colors:
  brand-purple: "#572269"
  brand-purple-light: "#7a3d91"
  brand-yellow: "#FBC906"
  vitrine-dark: "#1A0A21"
  vitrine-card: "#251230"
  vitrine-card-hover: "#331942"
  vitrine-cream: "#F7F5F2"
  hero-purple: "#6c288b"
  hero-orange: "#fc7d42"
  light-base: "#F8F7F4"
  light-surface: "#EAE8E4"
  light-card: "#E2E0DC"
  light-text-main: "#130717"
  light-text-muted: "#706E6B"
  dark-base: "#171717"
  dark-surface: "#1E1E1F"
  dark-card: "#292929"
  dark-text-main: "#F8F7F4"
  dark-text-muted: "#A09E9B"
  attention: "#FE3434"
typography:
  display:
    fontFamily: "Playfair Display, Cinzel, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw + 1rem, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Playfair Display, Cinzel, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(1.25rem, 1.8vw + 0.5rem, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  none: "0px"
  sm: "10px"
  md: "15px"
  lg: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  xl: "96px"
  section-desktop: "clamp(5rem, 10vw, 10rem)"
  section-mobile: "clamp(3.5rem, 8vw, 5rem)"
components:
  button-primary:
    backgroundColor: "{colors.brand-purple}"
    textColor: "{colors.vitrine-cream}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.brand-purple-light}"
  track-card:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text-main}"
    rounded: "{rounded.md}"
    padding: "12px"
---

# Design System: Charis Nation

## Overview

**Creative North Star: "The Editorial Sanctuary"**

Charis Nation réunit deux surfaces complémentaires qui obéissent à une même exigence de retenue et de clarté : une **Vitrine** institutionnelle publique destinée à accueillir et situer la communauté, et un **Espace Écoute** applicatif pensé pour l'étude quotidienne, l'écoute d'enseignements audio et la prise de notes synchronisée. L'ambition esthétique repose sur un minimalisme éditorial à forte tension spatiale : laisser parler la typographie, le vide architectural et la photographie plein cadre plutôt que d'empiler des cartes encadrées et des ornements lumineux.

La direction visuelle privilégie la primauté de la composition statique avant toute chorégraphie de mouvement. Lorsque l'interface s'anime, le mouvement suit une grammaire cinétique sobre, exclusivement exécutée sur le thread compositeur (`transform`, `opacity`, `clip-path`), avec une décélération franche et sans à-coup qui oriente l'attention vers le contenu spirituel sans jamais se donner en spectacle.

**Key Characteristics:**
- Tension éditoriale entre grands titres serif (`Playfair Display` / `Cinzel`) et micro-métadonnées géométriques (`Plus Jakarta Sans`).
- Respiration spatiale assumée, inspirée des publications éditoriales et de l'architecture de sanctuaire.
- Double surface maîtrisée : Vitrine sombre et théâtrale (`#1A0A21`) face à un Espace Écoute bithème clair/sombre (`#F8F7F4` / `#171717`).
- Grammaire de mouvement frugale limitée à trois primitives GPU-only (*Mask Reveal*, *Scroll Scale-Through*, *Non-Blocking Hover Preview*).

## Colors

La palette articule des fonds profonds et des neutres minéraux autour d'un pourpre impérial identitaire et d'accents lumineux strictement dosés.

### Primary
- **Imperial Sanctuary Purple** (#572269): Couleur signature des actions principales, états actifs du lecteur audio et liens identitaires dans l'Espace Écoute.
- **Luminous Grape** (#7a3d91): Variation d'appui pour les états de survol des boutons primaires et les transitions de surface active.

### Secondary
- **Sanctuary Gold** (#FBC906): Accent de ponctuation réservé aux repères clés, étiquettes de culte et indicateurs actifs ; son efficacité tient à sa rareté.
- **Liturgical Amber** (#fc7d42): Accent ponctuel hérité des compositions Hero.

### Tertiary
- **Attention Crimson** (#FE3434): Réservé exclusivement aux états d'erreur critiques et alertes destructives.

### Neutral
- **Vitrine Nocturne** (#1A0A21): Fond principal de la Vitrine publique.
- **Vitrine Card Deep** (#251230): Surface surélevée des conteneurs de la Vitrine (hover vers #331942).
- **Vitrine Cream** (#F7F5F2): Encre principale sur les fonds sombres de la Vitrine.
- **Parchment Light** (#F8F7F4): Fond principal du mode clair applicatif et encre principale en mode sombre (#F8F7F4).
- **Stone Surface** (#EAE8E4): Panneaux et barres de navigation en mode clair (cartes à #E2E0DC).
- **Obsidian Base** (#171717): Fond principal du mode sombre applicatif (panneaux à #1E1E1F, cartes à #292929).
- **Ink Noir & Slate Muted** (#130717 / #706E6B en clair, #A09E9B en sombre): Hiérarchie typographique primaire et secondaire.

### Named Rules
**The Rarity of Gold Rule.** L'accent doré (`#FBC906` et déclinaisons adoucies) ne doit jamais occuper plus de 10 % d'un écran ; il ponctue un repère ou un état actif sans concurrencer la hiérarchie typographique.

## Typography

**Display Font:** Playfair Display, Cinzel (with Georgia, serif fallback)
**Body Font:** Plus Jakarta Sans (with system sans-serif fallback)

**Character:** L'association oppose la gravité classique d'un serif éditorial à haute lisibilité pour la titraille d'accueil et la netteté géométrique d'une sans-serif contemporaine pour la navigation, les contrôles d'écoute et la prise de notes.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 6vw + 1rem, 5.5rem)`, line-height `1.12`, tracking `-0.03em`): Grands titres de la Vitrine et ouvertures d'écran.
- **Headline** (600, `clamp(1.75rem, 3.5vw + 0.5rem, 3.25rem)`, line-height `1.15`, tracking `-0.02em`): Intitulés majeurs de sections (Vision, Équipe Pastorale, Enseignements).
- **Title** (600, `clamp(1.25rem, 1.8vw + 0.5rem, 1.875rem)`, line-height `1.25`, tracking `-0.015em`): Sous-ensembles narratifs et titres d'enseignements détaillés.
- **Body** (400, `1rem`, line-height `1.65`, tracking `0em`): Corps éditorial limité à une mesure confortable de `65ch` à `75ch`.
- **Label** (600, `0.75rem`, line-height `1.2`, tracking `0.18em`, uppercase): Métadonnées, horodatages, rôles pastoraux et repères de navigation.

### Named Rules
**The Diacritic Breathing Room Rule.** Les titres en français portant des majuscules accentuées (`É`, `À`, `È`) exigent un interlignage minimal de `1.12` (Display) à `1.15` (Headline) et un dégagement supérieur dans les masques `overflow: hidden`, afin qu'aucun diacritique ne soit rogné lors d'une révélation verticale.

## Layout

La Vitrine adopte un flux vertical généreux avec des marges de section amples (`clamp(5rem, 10vw, 10rem)` sur desktop, `clamp(3.5rem, 8vw, 5rem)` sur mobile) et privilégie les grilles asymétriques en `minmax(0, 1fr)` plutôt que les alignements symétriques de cartes identiques. Le Hero applique la règle stricte des trois étages maximum au-dessus de la ligne de flottaison (repère contextuel, titraille + accroche, groupe d'actions), sans jamais y comprimer les piliers ou cartes de réassurance.

L'Espace Écoute repose sur une coque applicative (`AppLayout`) utilisant `min-height: 100dvh`, une barre latérale dédiée, une zone principale contrainte par `min-width: 0` et une réserve inférieure permanente pour le lecteur audio flottant (`StickyAudioPlayer`) intégrant `env(safe-area-inset-bottom)` sur mobile. Les conteneurs de page emploient `overflow-x: clip` (jamais `overflow-x: hidden`) afin d'éviter la création d'un second contexte de défilement vertical.

### Named Rules
**The Asymmetrical Editorial Grid Rule.** Sur la Vitrine, privilégier le dialogue direct entre une colonne typographique respirante et une colonne média plein cadre (`minmax(0, 1fr)`), sans multiplier les boîtes uniformes.

## Elevation & Depth

Le système privilégie le **contraste de plans tonaux** (superposition subtile entre base, surface et carte) plutôt que des ombres lourdes systématiques. Les surfaces au repos sont plates ; la profondeur n'intervient que sur les éléments réellement détachés du flux (lecteur flottant persistant, tiroirs mobiles, aperçus contextuels au survol). Les halos circulaires floutés à forte saturation sont proscrits au profit de gradients radiaux amples à faible opacité (6 % à 18 %).

### Shadow Vocabulary
- **Floating Player Separation** (`box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.7)`): Séparation nette du lecteur audio ancré en bas de la Vitrine.
- **Subtle Interactive Lift** (`box-shadow: 0 20px 40px rgba(87, 34, 105, 0.3)`): Élévation ciblée au survol d'une unité d'action dédiée.

### Named Rules
**The Flat-By-Default Rule.** Les surfaces éditoriales sont plates au repos ; l'élévation sert uniquement à signaler une couche persistante flottante ou un retour direct à l'interaction.

## Shapes

La géométrie distingue deux langages complémentaires : la **photographie éditoriale** s'inscrit dans des rectangles nets à angles droits (`0px` sur l'anneau Hero et les médias plein cadre) pour affirmer une rigueur de galerie, tandis que les **contrôles interactifs et conteneurs applicatifs** utilisent des rayons mesurés (`10px` sur les vignettes d'écoute, `15px` sur les lignes de liste `TrackCard`, `9999px` sur les boutons primaires en pilule).

## Components

Les composants privilégient la précision tactile, la lisibilité des états actifs d'écoute et une grammaire cinétique retenue :

### Buttons
- **Shape:** Pilule intégrale (`9999px`) pour les actions principales de la Vitrine, rayon modéré (`15px`) pour les contrôles utilitaires compacts.
- **Primary:** Fond pourpre impérial (`#572269`) vers `#7a3d91`, texte crème (`#F7F5F2`), padding généreux (`14px 32px`), icône Lucide SVG filaire unique sans émoji.
- **Hover / Focus:** Translation verticale légère (`-1px`) sur `150ms` (`--ease-out`), retour au clic (`scale(0.97)`), et anneau `:focus-visible` contrasté obligatoire.

### Cards / Containers
- **Corner Style:** `15px` (`TrackCard` dans l'Espace Écoute) ou surfaces sans boîte sur la Vitrine éditoriale.
- **Background:** `--bg-surface` (`#EAE8E4` clair / `#1E1E1F` sombre) dans l'application ; transparence optique contenue sur la Vitrine.
- **Shadow Strategy:** Plate au repos, survol léger par changement tonal ou `translateY(-2px)` à `-4px`.
- **Internal Padding:** `12px` sur les lignes d'écoute compactes.

### Navigation
- **Style & Motion:** En-tête Vitrine (`VitrineHeader`) masqué dans le Hero blanc initial puis révélé au défilement (`> 300px`), soulignement animé des liens via `transform: scaleX(...)` depuis la gauche, menu mobile plein largeur propre sans débordement horizontal.

### Audio Player (Signature Component)
- Lecteur flottant ancré en bas d'écran (`StickyAudioPlayer` / `AudioPlayer`) piloté par `AudioContext` sans duplication de `currentTime` en state React haute fréquence, entrée par translation verticale douce (`--ease-drawer`) et respect de `env(safe-area-inset-bottom)`.

## Do's and Don'ts

### Do:
- **Do** restreindre les animations de la Vitrine aux trois primitives GPU-only définies dans `globals.css` (*Mask Reveal*, *Scroll Scale-Through*, *Hover Preview*), en n'animant que `transform`, `opacity` et `clip-path`.
- **Do** déclencher les révélations de section une seule fois via `useReveal` (`IntersectionObserver` avec `once: true`), jamais en boucle à chaque aller-retour de scroll.
- **Do** réserver les micro-aperçus au survol (`hover-preview`) aux pointeurs précis (`@media (hover: hover) and (pointer: fine)`).
- **Do** envelopper les titres français en `text-wrap: balance` avec `line-height >= 1.12` pour préserver les accents majuscules.
- **Do** garantir l'accessibilité vestibulaire via `@media (prefers-reduced-motion: reduce)` dans `globals.css` et les hooks React associés.

### Don't:
- **Don't** installer ou empiler des bibliothèques d'animation tierces sans validation préalable explicite sur `package.json`.
- **Don't** utiliser `transition: all`, ni animer `width`, `height`, `top`, `left` ou `margin`.
- **Don't** introduire de curseur personnalisé bloquant ni de preloader plein écran retardant le Largest Contentful Paint.
- **Don't** insérer d'émojis dans les boutons, onglets ou étiquettes interactives (icônes Lucide SVG uniquement).
- **Don't** employer `100vh` ou `overflow-x: hidden` sur des coques de page (utiliser `100dvh` et `overflow-x: clip`).
