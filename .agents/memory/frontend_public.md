# Mémoire — Espace Public & Frontend (`nextjs_frontend_dev`)

Ce fichier consigne la mémoire persistante des pages vitrine, catalogue d'écoute et composants de l'espace public.
**Règle pour l'agent :** Consulter avant chaque tâche frontend public et mettre à jour en fin de session.

---

## Design System & Contraintes de Style

- **Source unique de style :** `src/app/globals.css`.
- **Direction Artistique & Noblesse Visuelle :** Appliquer impérativement les règles de [`aesthetic_standards.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/.agents/rules/aesthetic_standards.md).
- **Variables HSL & Tokens :** Utiliser exclusivement les tokens de thème déclarés.
- **Zéro style inline :** Proscrire tout `style={{}}` pour les valeurs de layout ou de couleur.
- **Micro-interactions & Mouvement :** Respecter les tokens de durée, l'intégration Lenis et le text reveal de [`ui_motion.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/.agents/rules/ui_motion.md).

---

## Pièges Documentés & Règles Déduites

1. **Espace réservé pour le lecteur flottant :**
   - Le layout public doit impérativement conserver un `padding-bottom` suffisant pour éviter que les éléments du bas de page soient recouverts par l'`AudioPlayer`.
2. **Dynamic Viewport Height (`100dvh`) :**
   - Toujours employer `100dvh` au lieu de `100vh` sur les conteneurs pleine hauteur mobile pour éviter les sauts lors de l'apparition/disparition des barres d'outils du navigateur mobile.
3. **Mobile-first strict :**
   - Définir les styles de base pour 375px (iPhone SE).
   - Utiliser des règles `@media (min-width: ...)` pour élargir vers 768px et 1280px.
   - Toujours employer `minmax(0, 1fr)` pour les colonnes de grilles pour empêcher l'overflow horizontal.
4. **Hydratation & FOUC :**
   - Le thème clair/sombre est appliqué via une classe `.dark` sur la balise `<html>` avec un script inline anti-flash dans `layout.tsx`. Ne pas déplacer ce script.
5. **Règle des 3 étages du Hero (Anti-collision) :**
   - Ne jamais empiler plus de 3 étages dans le Hero (Badge, Titre/Accroche, CTA). Les piliers et cartes d'information doivent vivre dans une section distincte pour éviter les chevauchements avec les boutons.
6. **Éradication des émojis dans l'UI :**
   - Ne jamais insérer d'émojis dans les boutons ou contrôles. Utiliser exclusivement les icônes SVG de Lucide React pour éviter le dédoublement grotesque (`🎧 🎧`).
7. **Lumière d'ambiance feutrée :**
   - Proscrire les « blobs » circulaires ultra-saturés floutés (`blur-[140px]`). Préférer des dégradés amples à faible opacité (6-18%) et des dorés doux (or champagne/écru).
8. **Piège W3C `overflow-x: hidden` (Prévention de la double barre de défilement) :**
   - Selon la spécification CSS W3C, définir `overflow-x: hidden` sur un conteneur force automatiquement le calcul de `overflow-y` en `auto`. Si le conteneur a une hauteur contrainte ou des éléments qui dépassent, cela crée un deuxième conteneur de défilement vertical invisible avec sa propre barre de scroll.
   - **Règle absolue :** Toujours employer `overflow-x: clip` sur le conteneur de page (`page.tsx`) et sur `<html>`/`<body>` pour couper les débordements horizontaux (ex: ruban en pleine largeur) sans forcer `overflow-y: auto`.
   - **Encapsulation des sections :** Toujours appliquer `overflow-hidden` sur chaque `<section>` qui intègre des cercles de lumière ou des halos floutés en position absolue, pour empêcher leur débordement sous le pied de page.
9. **Centrage géométrique absolu des animations séquentielles (Hero en étapes) :**
   - Ne jamais faire cohabiter dans le flux flexbox normal des états successifs d'un composant en masquant les uns avec `opacity-0` : leurs marges et hauteurs fantômes faussent le calcul du centre médian.
   - Utiliser un conteneur absolu centré (`absolute inset-0 flex items-center justify-center overflow-hidden`).
   - Pour les textes d'accompagnement (comme la devise), les positionner en décrochage absolu (`absolute top-full`) sous le titre pour que seuls les mots principaux déterminent l'axe médian `centerY`.
10. **Frise d'images interactive & Full-Bleed (Hover Push) :**
    - Pour créer un ruban interactif qui dépasse les marges de l'écran, utiliser `transform: translateX(...)` calculé dynamiquement (`getRibbonTranslateX()`) avec une courbe `cubic-bezier(0.16, 1, 0.3, 1)`.
    - La carte survolée s'élargit et s'allonge vers le bas avec une ombre profonde (`shadow-2xl`), tout en repoussant les cartes adjacentes.

---

## Journal des Évolutions & Décisions

- *Animation Hero & Frise interactive Vitrine (3 étapes Maquette)* :
  - Implémentation complète de la timeline en 3 temps :
    1. « CharisNation » monobloc centré sur fond blanc pur (police *Playfair Display*).
    2. Écartement symétrique de « Charis » et « Nation » avec émergence du portrait pastoral au centre médian exact (`centerY` identique au subpixel près).
    3. Ascension de la photo vers la frise d'images supérieure, descente du titre unifié avec transition vers le pourpre impérial (`#6c288b`) et apparition de la devise de l'église.
  - Intégration de l'accordéon interactif avec répulsion au survol (*Hover Push*) et dépassement de padding (*full-bleed*).
  - Résolution de la double barre de défilement par adoption de `overflow-x: clip` et encapsulation `overflow-hidden` des sections à halos d'ambiance.
  - Épuration finale du bas de page (suppression du bouton « Découvrir la suite ») pour conformité stricte avec la maquette.
- *Refonte Galerie Hero en Anneau Circulaire Virtuel (Option 1)* :
  - Abandon total de la liste finie dupliquée en 5 sets (`SET_COUNT = 5`) et de la téléportation conditionnelle (`isJumping`, `handleTransitionEnd`).
  - Passage à un anneau circulaire infini piloté par un `currentIndex` libre et une fenêtre glissante symétrique de 17 cartes ($k \in [-8, +8]$) via projection modulo stricte.
  - Positionnement géométrique exact par rapport au centre : contact bord à bord absolu (`gap-0`), angles droits stricts (`rounded-none`), cartes latérales à 170px et carte active à 440px sans aucun décentrage lors des transitions.
- *Refonte Galerie Slider Hero (Alignement Maquette)* :
  - Resserrement total des images en contact direct sans aucun interstice (`gap-0`), suppression des ombres latérales créant des liserés.
  - Suppression intégrale des coins arrondis (`rounded-none` sur l'étape 2 et l'étape 3 pour des angles droits stricts).
  - Épuration visuelle complète : suppression des textes et libellés sous les images.
  - Réduction drastique des visuels latéraux (largeur 170px, hauteur 250px en desktop) face à une carte centrale dominante (largeur 440px, hauteur 390px descendant vers le bas).
  - Recalibrage de la formule de centrage automatique `translateX(calc(... * clamp(80px, 11.8vw, 170px)))` pour un alignement optique subpixel rigoureux.
- *Refonte des fondations esthétiques* : Mise en place de `aesthetic_standards.md`, enrichissement de `ui_forbidden.md` (anti-patterns 11 à 14), standardisation du smooth scrolling Lenis et du Text Reveal dans `ui_motion.md`, et instauration d'une porte de validation visuelle (Visual QA Gate).
- *Initialisation de la mémoire* : Refonte moderne du layout avec barre latérale rétractable (`NavigationDrawer`), header unifié et intégration des cartes d'annonces.

