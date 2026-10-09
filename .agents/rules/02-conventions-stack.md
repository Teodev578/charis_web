---
name: 02-conventions-stack
description: Conventions strictes de la stack technique Charis Nation — Next.js 16 (App Router), React 19, TypeScript strict, Supabase (SSR & RLS), Double Design System (CSS HSL public vs Tailwind v4 admin), et Moteur Audio.
---

# 02 — Conventions Strictes de la Stack Technique

Ce document définit les normes d'implémentation obligatoires pour la stack de **Charis Nation**. Tout écart par rapport à ces règles compromet l'intégrité du système et constitue un échec aux gates de vérification.

---

## ⚡ 1. Architecture Next.js 16 App Router & React 19

### 1.1 Frontière Server Components (RSC) vs Client Components (CC)
- **Règle par défaut** : Tout composant est un Server Component sauf nécessité formelle.
- **Usage de `'use client'`** : Réservé strictement aux composants nécessitant :
  - Des hooks d'état ou de cycle de vie React (`useState`, `useEffect`, `useReducer`, `useRef`).
  - L'accès direct à des APIs du navigateur (`window`, `localStorage`, `HTMLMediaElement`).
  - L'abonnement à des contextes globaux (`AudioContext`, `ThemeContext`, `AuthContext`).
- **Interdiction de passage de props non sérialisables** : Les Server Components ne doivent jamais recevoir de fonctions de rappel (*callbacks*), d'instances de classe ou de contextes en provenance de Client Components.

#### Recommandations architecturales :
1. **Pousser les feuilles de l'arbre en Client Components (*Push CC to the leaves*)**
   - **Statut** : *(Recommandé)*
   - **Justification** : Conserver la racine et la structure des layouts en RSC maximise les optimisations de streaming et de compilation Turbopack, réduisant drastiquement le bundle JavaScript initial côté client.
2. **Utiliser `'use client'` à la racine d'un layout majeur**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Transformer un layout entier en Client Component force l'hydratation de l'ensemble du sous-arbre, ruinant les gains de performance du rendu serveur et interdisant l'accès direct aux services serveur.

---

## 🗄️ 2. Écosystème de Données Supabase & Sécurité RLS

### 2.1 Étanchéité Stricte des Clients Supabase
Deux clients distincts coexistent dans `src/lib/supabase/` et ne doivent en aucun cas être interchangés :
- `src/lib/supabase/client.ts` : instancie `createBrowserClient()`. Strictement réservé aux Client Components, formulaires interactifs côté client et contextes React.
- `src/lib/supabase/server.ts` : instancie `createServerClient()`. Strictement réservé aux Server Components, Server Actions et Route Handlers.
- `src/lib/supabase/middleware.ts` : fonction `updateSession()` dédiée à la rafraîchissement des tokens de session dans le middleware Next.js.

### 2.2 Politiques RLS (Row Level Security) et Anti-Récursion
- **Sécurité impérative** : Aucune table sensible ne doit être accessible sans RLS activé. Aucun secret `service_role` ne doit transiter vers le client.
- **Fonction `get_user_profil(user_id)`** : Marquée `SECURITY DEFINER`, cette fonction doit obligatoirement être employée dans les politiques RLS interrogeant la table `utilisateurs` afin de conjurer tout risque de récursion infinie.

### 2.3 Typage de Données Dérivé
- `src/lib/supabase/database.types.ts` est la source de vérité absolue, générée via la CLI Supabase.
- **Interdiction d'édition manuelle** : Tout modèle de données étendu (ex: enrichissement de jointure) doit être déclaré via des interfaces TypeScript qui dérivent (`extends`) des types générés.

---

## 🎨 3. Dualité du Système de Design & CSS

L'application maintient deux environnements visuels hermétiques pour répondre à des contraintes fonctionnelles distinctes :

### 3.1 Espace Public (Vitrine, Espace Écoute, Détail d'Enseignement)
- **Fichier maître** : `src/app/globals.css` (environ 2500 lignes).
- **Moteur stylistique** : Vanilla CSS pur avec variables HSL sémantiques (`--color-primary`, `--color-surface`, `--color-text`, etc.).
- **Contraintes** :
  - Zéro Tailwind dans l'espace public.
  - Zéro style inline hardcodé.
  - Respect scrupuleux des micro-animations et transitions douces pour l'expérience d'écoute.

### 3.2 Espace Administration (`/dashboard`)
- **Fichier maître** : `src/app/dashboard/dashboard.css`.
- **Moteur stylistique** : Tailwind CSS v4 via `@tailwindcss/postcss`.
- **Contraintes** :
  - Réservé exclusivement aux écrans d'administration et de gestion CRUD.
  - Interdiction de fuite des classes utilitaires Tailwind vers l'espace public.

#### Recommandations stylistiques :
1. **Isolation stricte des fichiers de style par layout**
   - **Statut** : *(Recommandé)*
   - **Justification** : Prévenir les collisions de spécificité CSS et garantir la cohérence esthétique distincte de la vitrine communautaire face à l'ergonomie dense du panneau d'administration.
2. **Mélange des classes utilitaires Tailwind dans les composants de la vitrine**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Détruit l'harmonie des tokens HSL du design system public et introduit des dépendances croisées de compilation inutiles.

---

## 🎧 4. Moteur Audio & Prise de Notes Synchronisées

### 4.1 Architecture du Lecteur Audio
- **État global** : Piloté par `AudioContext` (`src/contexts/AudioContext.tsx`).
- **Composant flottant** : `AudioPlayer.tsx`, ancré en bas d'écran, persistant au fil de la navigation.
- **Source de vérité temporelle** : `audioRef.current.currentTime`. Ne jamais dupliquer la valeur en temps réel dans un state React à haute fréquence de rafraîchissement pour éviter les re-renders intempestifs.

### 4.2 Persistance & Throttling
- **Progression d'écoute** : Synchronisation en base de données (`progression_lecture`) régulée par un intervalle de **30 secondes** et déclenchée à l'arrêt/changement d'enseignement.
- **Deep-linking `?t=secondes`** : Le saut temporel ne doit être déclenché qu'après l'événement navigateur `loadedmetadata`. L'exécuter avant cet événement provoque un écrasement silencieux ramenant la position à zéro.
- **Prise de notes** : Chaque note est automatiquement couplée à la position audio exacte (`position_audio_secondes`) au moment de la frappe.

---

## 🚨 5. Hygiène et Gestion des Erreurs

- **Services métier (`src/lib/services/`)** : Toute fonction de service doit obligatoirement propager les erreurs Supabase via `throw error`. Il est interdit d'avaler une anomalie en renvoyant silencieusement un objet vide ou `null`. La responsabilité du traitement visuel incombe au composant appelant.
- **Interdiction de `console.log()`** : Bannis en production. Si un log est nécessaire en développement, l'encapsuler derrière `if (process.env.NODE_ENV === 'development')`.
