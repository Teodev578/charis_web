# Mémoire — Espace Public & Frontend (`nextjs_frontend_dev`)

Ce fichier consigne la mémoire persistante des pages vitrine, catalogue d'écoute et composants de l'espace public.
**Règle pour l'agent :** Consulter avant chaque tâche frontend public et mettre à jour en fin de session.

---

## Design System & Contraintes de Style

- **Source unique de style :** `src/app/globals.css`.
- **Variables HSL :** Utiliser exclusivement les tokens de thème déclarés (`--primary`, `--background`, `--card`, `--text-main`, etc.).
- **Zéro style inline :** Proscrire tout `style={{}}` pour les valeurs de layout ou de couleur.
- **Micro-interactions :** Respecter les tokens de durée et courbes d'accélération de [`ui_motion.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/.agents/rules/ui_motion.md).

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

---

## Journal des Évolutions & Décisions

- *Initialisation de la mémoire* : Refonte moderne du layout avec barre latérale rétractable (`NavigationDrawer`), header unifié et intégration des cartes d'annonces.
