# Mémoire — Audio UX & Lecteur Flottant (`audio_ux_specialist`)

Ce fichier consigne la mémoire persistante du cœur fonctionnel audio, du lecteur persistant et de la synchronisation de notes.
**Règle pour l'agent :** Consulter avant chaque tâche audio et mettre à jour en fin de session.

---

## Invariants & Mécanismes Critiques

- **Lecteur persistant :** Composant `AudioPlayer` monté une seule fois dans l'application au niveau du layout racine via `ClientAppWrapper.tsx`.
- **`AudioContext.tsx` :** Source unique de vérité pour `audioRef`, la progression d'écoute, l'état de lecture et la liste des notes du message courant.
- **Synchronisation d'écoute périodique :**
  - Battement régulier toutes les 30 secondes pour persister la position dans `progression_lecture`.
  - Upsert sur conflit `(user_id, message_id)`.

---

## Pièges Documentés & Règles Déduites

1. **Cycle de vie du Seek & Deep-linking (`?t=X`) :**
   - **Piège :** Tenter de modifier `audioRef.current.currentTime` immédiatement au chargement de la balise `<audio>` échoue car le fichier n'est pas encore prêt.
   - **Règle :** Attendre impérativement l'événement `loadedmetadata` (ou `canplay`) avant d'appliquer la position temporelle issue de l'URL (`?t=X`) ou de la progression sauvegardée.
2. **Ordre de transition lors du changement de piste :**
   - **Séquence obligatoire :**
     1. Sauvegarder la progression de l'ancienne piste en base.
     2. Nettoyer l'intervalle de synchronisation (`clearInterval`).
     3. Réinitialiser l'état du lecteur.
     4. Charger et démarrer la nouvelle piste.
3. **Contraintes iOS Safari :**
   - Politique stricte d'autoplay : l'élément audio ne peut démarrer qu'après une interaction utilisateur explicite (tap/click).
   - Les éléments fixes en bas d'écran nécessitent `padding-bottom: env(safe-area-inset-bottom)` pour ne pas être masqués par la barre de navigation système.
4. **Prise de notes synchronisées :**
   - L'horodatage de la note doit capturer `Math.floor(currentTime)` au moment exact de la frappe ou du clic sur "Ajouter une note".

---

## Journal des Évolutions & Décisions

- *Initialisation de la mémoire* : Standardisation du format des deep-links en secondes entières (`?t=secondes`), persistance dans Supabase via `user.ts`.
