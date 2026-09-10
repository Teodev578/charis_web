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

---

## Journal des Évolutions & Décisions

- *Refonte des fondations esthétiques* : Mise en place de `aesthetic_standards.md`, enrichissement de `ui_forbidden.md` (anti-patterns 11 à 14), standardisation du smooth scrolling Lenis et du Text Reveal dans `ui_motion.md`, et instauration d'une porte de validation visuelle (Visual QA Gate).
- *Initialisation de la mémoire* : Refonte moderne du layout avec barre latérale rétractable (`NavigationDrawer`), header unifié et intégration des cartes d'annonces.
