# INDEX des Fiches de Connaissance (Knowledge Items)

Ce registre récapitule l'ensemble des connaissances capitalisées, des singularités techniques et des pièges d'implémentation documentés sur **Charis Nation**.

---

## 🗂️ Registre des Fiches KI Actives

| ID | Domaine | Intitulé / Anomalie Documentée | Statut d'Escalade | Fichier Source |
|---|---|---|---|---|
| **KI-AUDIO-01** | Audio / UX | Piège du positionnement temporel (`currentTime`) avant l'événement `loadedmetadata` | Niveau 2 (Règle `02-conventions-stack.md`) | `src/contexts/AudioContext.tsx` |
| **KI-SUPABASE-01** | Base de données / RLS | Récursion infinie sur la table `utilisateurs` conjurée par `SECURITY DEFINER` | Niveau 2 (Règle `02-conventions-stack.md`) | `supabase/migrations/` |
| **KI-SUPABASE-02** | Accès Données | Interdiction d'interversion entre `createBrowserClient` et `createServerClient` | Niveau 2 (Règle `02-conventions-stack.md`) | `src/lib/supabase/` |
| **KI-FRONTEND-01** | Design System | Risque de contamination stylistique entre Tailwind v4 (`dashboard.css`) et l'espace public | Niveau 2 (Règle `02-conventions-stack.md`) | `src/app/globals.css` |
| **KI-AUDIO-02** | Cycle de vie React | Fuite mémoire par accumulation d'intervalles non nettoyés lors de la synchronisation 30s | Niveau 2 (Règle `02-conventions-stack.md`) | `src/contexts/AudioContext.tsx` |

---

## 📋 Synthèse des Enseignements Clés Déjà Élucidés

### 1. Audio : Deep-Linking et `loadedmetadata`
- **Symptôme** : L'accès à une URL avec paramètre `?t=120` ramène systématiquement la lecture à 0 seconde.
- **Cause** : Assigner `audioRef.current.currentTime = 120` avant que l'élément `<audio>` n'ait achevé le décodage des métadonnées du flux entraîne la réinitialisation silencieuse du pointeur de lecture.
- **Invariant** : Attendre l'événement `loadedmetadata` ou vérifier `readyState >= 1` avant d'appliquer le saut temporel.

### 2. Supabase : Anti-Récursion sur les Profils Utilisateurs
- **Symptôme** : Erreur 500 ou saturation PostgreSQL lors des requêtes vérifiant si un utilisateur est administrateur.
- **Cause** : Une politique RLS sur `utilisateurs` effectuant un `SELECT` sur `utilisateurs` déclenche une chaîne d'évaluation récursive infinie.
- **Invariant** : Toujours encapsuler la vérification de statut dans la fonction SQL `get_user_profil(user_id)` définie avec `SECURITY DEFINER`.

### 3. SSR Next.js 16 : Étanchéité Browser vs Server
- **Symptôme** : Erreur de compilation ou fuite de cookies de session lors d'appels asynchrones.
- **Cause** : Appel de `createServerClient` dans un composant interactif client ou usage de `createBrowserClient` dans un Server Action.
- **Invariant** : Les services de `src/lib/services/` doivent recevoir ou instancier le client rigoureusement adapté à leur frontière d'exécution.
