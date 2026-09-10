# Mémoire — Couche Données & Supabase (`supabase_guardian`)

Ce fichier consigne la mémoire persistante du domaine base de données, sécurité RLS et services Supabase.
**Règle pour l'agent :** Consulter avant chaque tâche de données et mettre à jour en fin de session.

---

## Architecture & Invariants Actifs

- **Tables existantes :** `utilisateurs`, `categories`, `series`, `messages`, `favoris`, `progression_lecture`, `notes`, `annonces`.
- **Clients Supabase étanches :**
  - Côté browser : `src/lib/supabase/client.ts` via `createBrowserClient()`.
  - Côté serveur : `src/lib/supabase/server.ts` via `createServerClient()` avec `cookies()`.
- **Fonction `get_user_profil` (`SECURITY DEFINER`) :**
  - Indispensable dans les politiques RLS.
  - Empêche la récursion infinie (`infinite recursion detected in policy`) sur la table `utilisateurs`.

---

## Pièges Documentés & Règles Déduites

1. **Pas d'écrasement des types générés :**
   - Le fichier `src/lib/supabase/database.types.ts` est généré automatiquement. Ne jamais y écrire de types à la main.
   - Créer des interfaces `extends` dans `src/lib/services/` pour enrichir les types de vue.
2. **Propager les erreurs DB systématiquement :**
   - Dans `src/lib/services/`, toujours tester `if (error) throw error;`.
   - Ne jamais renvoyer `[]` ou `null` silencieux qui masquerait un échec d'authentification ou un blocage RLS.
3. **Storage buckets :**
   - Bucket audio : URL publique stockée dans la table `messages`.
   - Toujours valider le type MIME (`audio/mpeg`, etc.) et la taille côté client avant l'upload.

---

## Journal des Évolutions & Décisions

- *Initialisation de la mémoire* : Migration RLS administrateur (002), configuration storage (003), correctif de récursion RLS (004), correctif messages (005), ajout URL image (006), table annonces (007).
