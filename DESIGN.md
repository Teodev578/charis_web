---
name: Charis Nation
description: Sanctuaire éditorial ancré sur la palette galerie du Hero (#f2f2f2, #111111, #6C288B, #fc7d42) pour la Vitrine et l'Espace Écoute.
colors:
  brand-purple: "#6C288B"
  brand-purple-light: "#893FB0"
  brand-orange: "#fc7d42"
  brand-orange-deep: "#FB5E17"
  brand-yellow: "#FBC906"
  vitrine-dark: "#111111"
  vitrine-card: "#1A1A1A"
  vitrine-card-hover: "#242424"
  vitrine-cream: "#f2f2f2"
  hero-purple: "#6C288B"
  hero-orange: "#fc7d42"
  hero-peach: "#f8dfd2"
  hero-lavender: "#ebe3f2"
  light-base: "#f2f2f2"
  light-surface: "#ffffff"
  light-card: "#e7e7e7"
  light-text-main: "#111111"
  light-text-muted: "#525252"
  dark-base: "#111111"
  dark-surface: "#1A1A1A"
  dark-card: "#242424"
  dark-text-main: "#f2f2f2"
  dark-text-muted: "#A3A3A3"
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
  wordmark:
    fontFamily: "Playfair Display, Cinzel, Georgia, serif"
    fontSize: "clamp(1.1875rem, 1vw + 0.9rem, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  nav:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.01em"
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
    backgroundColor: "{colors.vitrine-dark}"
    textColor: "{colors.vitrine-cream}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.brand-purple}"
  track-card:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text-main}"
    rounded: "{rounded.md}"
    padding: "12px"
---

# Design System: Charis Nation

## Overview

**Creative North Star: "The Editorial Sanctuary"**

Charis Nation réunit deux surfaces complémentaires qui obéissent à une même identité chromatique et typographique ancrée directement sur la palette du Hero : une **Vitrine** institutionnelle publique à dominante galerie claire (`#f2f2f2` / `#ffffff`) rythmée par des ancrages noirs francs (`#111111`), et un **Espace Écoute** applicatif bithème clair/sombre pensé pour l'étude quotidienne, l'écoute audio et la prise de notes synchronisée. L'ambition esthétique repose sur un minimalisme éditorial à forte tension spatiale : laisser parler la typographie, le vide architectural et la photographie plein cadre plutôt que d'empiler des ornements saturés.

La direction visuelle privilégie la primauté de la composition statique avant toute chorégraphie de mouvement. Lorsque l'interface s'anime, le mouvement suit une grammaire cinétique sobre, exclusivement exécutée sur le thread compositeur (`transform`, `opacity`, `clip-path`), avec une décélération franche et sans à-coup qui oriente l'attention vers le contenu spirituel sans jamais se donner en spectacle.

**Key Characteristics:**
- Continuité chromatique totale avec le Hero (`#f2f2f2`, `#111111`, `#6C288B`, `#fc7d42`).
- Tension éditoriale entre grands titres serif (`Playfair Display` / `Cinzel`) et micro-métadonnées géométriques (`Plus Jakarta Sans`).
- Respiration spatiale assumée alternant surfaces claires (`#f2f2f2` / `#ffffff`) et ancrages noirs profonds (`#111111`).
- Grammaire de mouvement frugale limitée à trois primitives GPU-only (*Mask Reveal*, *Scroll Scale-Through*, *Non-Blocking Hover Preview*).

## Colors

L'intégralité du site dérive des couleurs du Hero, organisées autour d'un contraste galerie neutre (`#f2f2f2` et `#111111`) et de deux accents complémentaires : le pourpre impérial du Hero (`#6C288B`) et l'orange corail du Hero (`#fc7d42`).

### Primary
- **Hero Imperial Purple** (#6C288B): Couleur de marque principale sur fond clair (`7.9:1` sur `#f2f2f2` et `#ffffff`), actions d'écoute, rôles, versets et survols de boutons noirs.
- **Hero Luminous Purple** (#893FB0): Variation lumineuse d'appui pour dégradés et états de survol sur fond sombre.

### Secondary
- **Hero Coral Orange** (#fc7d42): Accent vibrant issu de la barre de navigation du Hero ; utilisé pour les liens actifs, indicateurs de progression audio, icônes sur fond sombre (`#111111`) et soulignements dynamiques.
- **Hero Deep Ember** (#FB5E17): Accent renforcé issu de la surface grainée du Hero pour les survols d'éléments orange sur fond sombre.
- **Hero Soft Peach & Lavender** (#f8dfd2 / #ebe3f2): Voiles d'atmosphère très basse saturation sur fonds clairs.
- **Sanctuary Gold (Micro-accent)** (#FBC906): Conservé exclusivement pour la micro-icône du CTA Hero et la rétrocompatibilité d'annonces dynamiques ; proscrit en aplat dominant.

### Tertiary
- **Attention Crimson** (#FE3434): Réservé exclusivement aux états d'erreur critiques et alertes destructives.

### Neutral
- **Hero Gallery Base** (#f2f2f2): Fond principal du Hero, des sections claires de la Vitrine et du mode clair applicatif.
- **Pure Gallery Surface** (#ffffff): Cartes sur fond `#f2f2f2`, sections alternées de la Vitrine et panneaux en mode clair.
- **Muted Gallery Card** (#e7e7e7): Conteneurs secondaires et zones imbriquées en mode clair.
- **Hero Ink Noir** (#111111): Encre typographique principale sur fond clair, boutons primaires, section *Nos Derniers Enseignements*, pied de page Vitrine et fond de base en mode sombre.
- **Obsidian Surface & Card** (#1A1A1A / #242424): Panneaux et cartes en mode sombre et dans les sections d'ancrage sombre.
- **Muted Ink** (#525252 en clair / #A3A3A3 en sombre): Hiérarchie typographique secondaire accessible.

### Named Rules
**The Hero Continuity Rule.** Aucune section de la Vitrine ni aucun composant applicatif ne doit introduire de teinte étrangère à la base du Hero (`#f2f2f2`, `#ffffff`, `#111111`, `#6C288B`, `#fc7d42`) ; le passage entre le Hero et le reste du défilement doit paraître continu et intentionnel.

**The Contrast-Aware Accent Rule.** Sur fond clair (`#f2f2f2` / `#ffffff`), `#6C288B` porte le texte et les liens d'accent (`> 7:1`) tandis que `#fc7d42` ponctue icônes, bordures, points actifs et survols de navigation ; sur fond noir (`#111111`), `#fc7d42` porte directement les labels, icônes et actions (`7.5:1`).

## Typography

**Display Font:** Playfair Display, Cinzel (with Georgia, serif fallback)
**Body Font:** Plus Jakarta Sans (with system sans-serif fallback)

**Character:** L'association oppose la gravité classique d'un serif éditorial à haute lisibilité pour la titraille d'accueil et la netteté géométrique d'une sans-serif contemporaine pour la navigation, les contrôles d'écoute et la prise de notes.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 6vw + 1rem, 5.5rem)`, line-height `1.12`, tracking `-0.03em`): Grands titres de la Vitrine et ouvertures d'écran.
- **Headline** (600, `clamp(1.75rem, 3.5vw + 0.5rem, 3.25rem)`, line-height `1.15`, tracking `-0.02em`): Intitulés majeurs de sections (Vision, Équipe Pastorale, Enseignements).
- **Title** (600, `clamp(1.25rem, 1.8vw + 0.5rem, 1.875rem)`, line-height `1.25`, tracking `-0.015em`): Sous-ensembles narratifs et titres d'enseignements détaillés.
- **Wordmark** (600, `clamp(1.1875rem, 1vw + 0.9rem, 1.375rem)`, line-height `1.15`, tracking `-0.02em`): Signature « Charis Nation » partagée entre le header Hero et le header sticky `VitrineHeader`.
- **Body** (400, `1rem`, line-height `1.65`, tracking `0em`): Corps éditorial limité à une mesure confortable de `65ch` à `75ch`.
- **Nav** (500/600, `0.8125rem` / `13px`, line-height `1.2`, tracking `0.01em`): Liens de navigation et boutons CTA des en-têtes Vitrine.
- **Label** (600, `0.75rem`, line-height `1.2`, tracking `0.18em`, uppercase): Métadonnées, horodatages, rôles pastoraux et repères de navigation.

### Named Rules
**The Diacritic Breathing Room Rule.** Les titres en français portant des majuscules accentuées (`É`, `À`, `È`) exigent un interlignage minimal de `1.12` (Display) à `1.15` (Headline) et un dégagement supérieur dans les masques `overflow: hidden`, afin qu'aucun diacritique ne soit rogné lors d'une révélation verticale.

## Layout

La Vitrine adopte un flux vertical généreux avec des marges de section amples (`clamp(5rem, 10vw, 10rem)` sur desktop, `clamp(3.5rem, 8vw, 5rem)` sur mobile) en alternant les plans clairs du Hero (`#f2f2f2` / `#ffffff`) et les respirations sombres (`#111111` sur la section Audio et le Footer), avec des grilles en `minmax(0, 1fr)`. Le Hero applique la règle stricte des trois étages maximum au-dessus de la ligne de flottaison.

L'Espace Écoute repose sur une coque applicative (`AppLayout`) utilisant `min-height: 100dvh`, une barre latérale dédiée (`NavigationSidebar`), une zone principale contrainte par `min-width: 0` et une réserve inférieure permanente pour le lecteur audio flottant (`StickyAudioPlayer`) intégrant `env(safe-area-inset-bottom)` sur mobile. Les conteneurs de page emploient `overflow-x: clip` (jamais `overflow-x: hidden`).

### Named Rules
**The Asymmetrical Editorial Grid Rule.** Sur la Vitrine, privilégier le dialogue direct entre une colonne typographique respirante et une colonne média plein cadre (`minmax(0, 1fr)`), sans multiplier les boîtes uniformes.

## Elevation & Depth

Le système privilégie le **contraste de plans tonaux** (`#f2f2f2` vs `#ffffff` en mode clair, `#111111` vs `#1A1A1A` en mode sombre) plutôt que des ombres lourdes systématiques. Les surfaces au repos sont plates ; la profondeur n'intervient que sur les éléments réellement détachés du flux (lecteur flottant persistant, tiroirs mobiles, aperçus contextuels au survol). Les halos circulaires floutés à forte saturation sont proscrits au profit de gradients radiaux amples issus des voiles `#ebe3f2` et `#f8dfd2` du Hero.

### Shadow Vocabulary
- **Floating Player Separation** (`box-shadow: 0 -10px 30px rgba(17, 17, 17, 0.14)` en clair / `rgba(0, 0, 0, 0.7)` en sombre): Séparation nette du lecteur audio ancré en bas de la Vitrine.
- **Subtle Interactive Lift** (`box-shadow: 0 18px 38px rgba(108, 40, 139, 0.10)`): Élévation ciblée au survol d'une unité d'action dédiée.

### Named Rules
**The Flat-By-Default Rule.** Les surfaces éditoriales sont plates au repos ; l'élévation sert uniquement à signaler une couche persistante flottante ou un retour direct à l'interaction.

## Shapes

La géométrie distingue deux langages complémentaires : la **photographie éditoriale** s'inscrit dans des rectangles nets à angles droits (`0px` sur l'anneau Hero et les médias plein cadre) pour affirmer une rigueur de galerie, tandis que les **contrôles interactifs et conteneurs applicatifs** utilisent des rayons mesurés (`10px` sur les vignettes d'écoute, `15px` sur les lignes de liste `TrackCard`, `9999px` sur les boutons primaires en pilule).

## Components

Les composants privilégient la précision tactile, la lisibilité des états actifs d'écoute et une grammaire cinétique retenue :

### Buttons
- **Shape:** Pilule intégrale (`9999px`) pour les actions principales de la Vitrine, rayon modéré (`15px`) pour les contrôles utilitaires compacts.
- **Primary:** Fond encre noire du Hero (`#111111`) avec survol vers pourpre Hero (`#6C288B`), texte `#f2f2f2`, icône soulignée par `#fc7d42`, padding généreux (`14px 32px`), icône Lucide SVG filaire unique sans émoji.
- **Hover / Focus:** Translation verticale légère (`-1px`) sur `150ms` (`--ease-out`), retour au clic (`scale(0.97)`), et anneau `:focus-visible` contrasté obligatoire.

### Cards / Containers
- **Corner Style:** `15px` (`TrackCard` dans l'Espace Écoute) ou surfaces sans boîte sur la Vitrine éditoriale.
- **Background:** `--bg-surface` (`#ffffff` clair / `#1A1A1A` sombre) sur fond `--bg-base` (`#f2f2f2` clair / `#111111` sombre).
- **Shadow Strategy:** Plate au repos, survol léger par changement tonal ou `translateY(-2px)` à `-4px`.
- **Internal Padding:** `12px` sur les lignes d'écoute compactes.

### Navigation
- **Style & Motion:** En-tête Vitrine (`VitrineHeader`) masqué dans le Hero initial puis révélé au défilement (`> 300px`) en verre dépoli clair `#f2f2f2/92`, soulignement animé des liens en `#fc7d42` via `transform: scaleX(...)` depuis la gauche, menu mobile plein largeur propre sans débordement horizontal.

### Audio Player (Signature Component)
- Lecteur flottant ancré en bas d'écran (`StickyAudioPlayer` / `AudioPlayer`) piloté par `AudioContext` sans duplication de `currentTime` en state React haute fréquence, barre de progression `bg-hero-orange` (`#fc7d42`), entrée par translation verticale douce (`--ease-drawer`) et respect de `env(safe-area-inset-bottom)`.

## Do's and Don'ts

### Do:
- **Do** conserver intacte l'implémentation du Hero (`HeroSection.tsx` et `HeroGrainSurface.tsx`) et aligner toute nouvelle surface sur sa palette (`#f2f2f2`, `#ffffff`, `#111111`, `#6C288B`, `#fc7d42`).
- **Do** restreindre les animations de la Vitrine aux trois primitives GPU-only définies dans `globals.css` (*Mask Reveal*, *Scroll Scale-Through*, *Hover Preview*), en n'animant que `transform`, `opacity` et `clip-path`.
- **Do** déclencher les révélations de section une seule fois via `useReveal` (`IntersectionObserver` avec `once: true`), jamais en boucle à chaque aller-retour de scroll.
- **Do** réserver les micro-aperçus au survol (`hover-preview`) aux pointeurs précis (`@media (hover: hover) and (pointer: fine)`).
- **Do** envelopper les titres français en `text-wrap: balance` avec `line-height >= 1.12` pour préserver les accents majuscules.
- **Do** garantir l'accessibilité vestibulaire via `@media (prefers-reduced-motion: reduce)` dans `globals.css` et les hooks React associés.

### Don't:
- **Don't** réintroduire l'ancienne palette violet-jaune saturée (`#1A0A21`, `#251230`, `#572269`, `#FBC906` massif).
- **Don't** poser du texte courant `#fc7d42` de petite taille sur fond clair `#f2f2f2` / `#ffffff` (réserver `#fc7d42` aux icônes, bordures, traits actifs ou fonds sombres `#111111`, et utiliser `#6C288B` ou `#111111` pour le texte sur clair).
- **Don't** installer ou empiler des bibliothèques d'animation tierces sans validation préalable explicite sur `package.json`.
- **Don't** utiliser `transition: all`, ni animer `width`, `height`, `top`, `left` ou `margin`.
- **Don't** introduire de curseur personnalisé bloquant ni de preloader plein écran retardant le Largest Contentful Paint.
- **Don't** insérer d'émojis dans les boutons, onglets ou étiquettes interactives (icônes Lucide SVG uniquement).
- **Don't** employer `100vh` ou `overflow-x: hidden` sur des coques de page (utiliser `100dvh` et `overflow-x: clip`).
