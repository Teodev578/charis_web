# Mémoire — Dashboard Admin (`admin_dashboard_dev`)

Ce fichier consigne la mémoire persistante du panel d'administration Charis Nation.
**Règle pour l'agent :** Consulter avant chaque tâche admin et mettre à jour en fin de session.

---

## Invariants & Architecture Isolée

- **Étanchéité stylistique absolue :**
  - Le dashboard utilise **Tailwind CSS v4** via `src/app/dashboard/dashboard.css`.
  - Ne jamais importer ni référencer les variables CSS HSL de `globals.css` dans le dashboard. Les deux univers graphiques sont indépendants.
- **Layout dédié :**
  - `src/app/dashboard/layout.tsx` est complètement autonome du layout racine public.
- **Sécurité RLS et privilèges :**
  - Toute action administrative est soumise au contrôle du flag `isAdmin` (issu de `AuthContext`).

---

## Pièges Documentés & Règles Déduites

1. **Génération de slugs (`categories/`, `series/`) :**
   - Utiliser la fonction utilitaire dédiée (normalisation Unicode, minuscules, tirets).
   - Ne jamais créer de slug à la main ou inline dans un composant React.
2. **Gestion des Server Components vs Client Components dans l'admin :**
   - Les pages de listage et affichage de statistiques sont des **Server Components** SSR exploitant `createServerClient()`.
   - Les modales, formulaires d'édition CRUD et zones d'upload sont des **Client Components** isolés (`'use client'`) exploitant `createBrowserClient()`.
3. **Upload de messages audio :**
   - Valider taille et type MIME côté navigateur avant d'envoyer le payload vers Supabase Storage.
   - Enregistrer l'URL Storage publique dans la colonne `audio_url` de la table `messages`.

---

## Journal des Évolutions & Décisions

- *Initialisation de la mémoire* : Pages CRUD opérationnelles pour catégories, séries, titres et utilisateurs. Thème Tailwind v4 branché sur `dashboard.css`.
