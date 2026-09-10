# AGENTS.md — Charis Nation / charis_web

<!-- bmad:context -->
<!-- Verified 2026-09-09. Contenu technique ancré sur le projet réel. -->

## Projet

**Charis Nation** est une plateforme web pour une église locale combinant une vitrine institutionnelle publique et une application d'écoute d'enseignements spirituels avec prise de notes synchronisées.
Stack : Next.js 16 (App Router) · React 19 · TypeScript · Supabase (PostgreSQL + RLS + Storage) · Tailwind CSS v4 · Zustand.
Repo : `/home/fabien/Documents/Projets/Pro/charis_web/`

---

## ⛔ Invariants inviolables — Ne jamais contourner

1. **Client Supabase : browser vs. server.**
   `src/lib/supabase/client.ts` → `createBrowserClient()` (composants client, contextes React).
   `src/lib/supabase/server.ts` → `createServerClient()` (Server Components, Server Actions).
   Ne jamais utiliser le client browser dans un Server Component, ni inversement.

2. **Toute donnée sensible passe par RLS.**
   Jamais de requête sans politique RLS active. Jamais de bypass `service_role` côté client.

3. **Les Server Components ne reçoivent pas de props client.**
   Pas de fonctions, contextes ou hooks passés en props depuis un Client Component vers un Server Component.

4. **`console.log()` est interdit en production.**
   Toléré uniquement en développement local et derrière une condition `process.env.NODE_ENV === 'development'`. Jamais en chemin de production.

5. **Les types Supabase sont générés — ne jamais les écrire à la main.**
   Utiliser `src/lib/supabase/database.types.ts` comme source de vérité. Toute extension passe par des interfaces `extends`, jamais par modification directe du fichier généré.

6. **Stack non négociable.**
   Next.js / React / Supabase / TypeScript — les décisions d'architecture sont figées.

---

## Arborescence `src/` (carte de navigation)

```
src/
├── app/                        # Pages, layouts, routage (Next.js App Router)
│   ├── layout.tsx              # Layout racine : polices, FOUC-guard, SEO, OpenGraph
│   ├── globals.css             # Design system complet de l'espace public (≈2500 lignes)
│   ├── page.tsx                # Accueil : série en cours, derniers messages, favoris
│   ├── auth/                   # Login / Signup
│   ├── explorer/               # Recherche et navigation par catégories / séries
│   ├── message/[id]/           # Lecteur détaillé : notes, série, deep-link ?t=X
│   └── dashboard/              # Panel admin (layout isolé, Tailwind v4, sidebar)
│       ├── dashboard.css       # Thème admin (Tailwind v4)
│       ├── page.tsx            # KPIs globaux
│       ├── titres/             # CRUD messages audio + upload Storage
│       ├── categories/         # CRUD catégories + slugify
│       ├── series/             # CRUD séries thématiques
│       └── utilisateurs/       # Liste membres + promotion admin
├── components/                 # Composants React réutilisables
│   ├── ClientAppWrapper.tsx    # Providers imbriqués + AudioPlayer + NotesPanel
│   ├── AudioPlayer.tsx         # Lecteur flottant persistant (ancré en bas)
│   ├── NotesPanel.tsx          # Tiroir coulissant de notes synchronisées
│   ├── NavigationDrawer.tsx    # Menu latéral gauche (nav + profil + auth)
│   ├── Header.tsx              # Barre sup : logo, recherche globale, thème
│   ├── TrackCard.tsx           # Carte enseignement (grille ou liste)
│   ├── Announcements.tsx       # Bannières dynamiques (série à la une, verset)
│   ├── SkeletonLoader.tsx      # Skeleton animé (perceived performance)
│   └── ShareMenu.tsx           # Partage avec deep-link ?t=secondes
├── contexts/                   # Contextes React globaux
│   ├── ThemeContext.tsx        # light/dark, localStorage, class .dark sur <html>
│   ├── AuthContext.tsx         # Session Supabase, signIn/signUp/signOut, isAdmin
│   └── AudioContext.tsx        # ❤️ Cœur : audioRef, progression, notes, sync 30s
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # createBrowserClient() — client side uniquement
│   │   ├── server.ts           # createServerClient() — server side uniquement
│   │   ├── middleware.ts       # updateSession() pour le middleware Next.js
│   │   └── database.types.ts  # Types générés — NE PAS MODIFIER MANUELLEMENT
│   └── services/               # Services métier Supabase
│       ├── messages.ts         # getMessages, getMessageById, getCategories, getSeries
│       └── user.ts             # getUserProgress, upsertProgress, favoris, notes
└── store/                      # Zustand (état global non-contextuel si nécessaire)
```

---

## Conventions de code obligatoires

- **Gestion d'erreurs services :** `throw error` dans les services — la gestion (try-catch) appartient au composant appelant. Ne jamais avaler silencieusement une erreur Supabase.
- **TypeScript :** typage strict. Pas de `any`, sauf cas exceptionnel documenté avec un commentaire `// TODO: typer correctement`. Utiliser les types générés depuis `database.types.ts`.
- **Nommage :** camelCase pour variables et fonctions, PascalCase pour composants et types. Noms en français pour les entités métier (enseignement, série, orateur, culte).
- **Composants :** `'use client'` uniquement si le composant utilise des hooks React (`useState`, `useEffect`, `useContext`) ou des APIs browser. Sinon, Server Component par défaut.
- **CSS espace public :** variables CSS HSL dans `globals.css` exclusivement. Pas de style inline ni de valeurs hardcodées hors du fichier de thème.
- **CSS espace admin :** Tailwind CSS v4 via `dashboard.css`. Ne pas mélanger les deux systèmes de style.
- **Images et assets :** passer par Supabase Storage. Jamais de fichier binaire committé dans le repo.
- **Slugs :** générer via une fonction utilitaire dédiée (normalisation, minuscules, tirets). Jamais inline dans un composant.

---

## Commandes de vérification (gates obligatoires)

Avant de déclarer toute tâche terminée, les deux commandes suivantes doivent passer sans erreur ni warning TypeScript :

```bash
# Analyse TypeScript stricte
npx tsc --noEmit

# Build de production (détecte les erreurs SSR/CSR, imports manquants)
npm run build
```

Lint ESLint si modification de fichiers JS/TS :
```bash
npm run lint
```

Ne jamais supprimer ou désactiver une règle ESLint pour faire passer un check. Corriger la cause réelle.

---

## Modèle de données (source de vérité)

| Table | Rôle |
|---|---|
| `utilisateurs` | Profils liés à `auth.users` (trigger `on_auth_user_created`) |
| `categories` | Catégories d'enseignements avec `slug` |
| `series` | Séries thématiques ordonnées |
| `messages` | Enseignements audio (FK → catégorie, série) |
| `favoris` | Association utilisateur ↔ message |
| `progression_lecture` | Position d'écoute + `est_termine` (upsert sur conflit) |
| `notes` | Notes horodatées (`position_audio_secondes`) par utilisateur × message |

Fonction RLS critique : `get_user_profil(user_id)` — `SECURITY DEFINER` — évite la récursion infinie sur la table `utilisateurs`. Ne jamais contourner cette fonction dans les politiques.

---

## Documentation de référence (lire avant de coder)

| Sujet | Fichier |
|---|---|
| Architecture globale, flux de données, schéma complet | `architecture.md` |
| Vocabulaire métier canonique (Enseignement, Série, Culte…) | `CONTEXT.md` |
| Migrations SQL et historique RLS | `supabase/migrations/` |

---

## Zones protégées

- `.env.local` — ne jamais committer, ne jamais exposer les clés Supabase.
- `src/lib/supabase/database.types.ts` — ne modifier que via `supabase gen types`. Jamais à la main.
- `supabase/migrations/` — toute nouvelle migration doit être irréversible ou idempotente. Jamais de `DROP TABLE` sans confirmation explicite.
- `src/app/globals.css` — toute modification du design system public engage l'ensemble de l'interface. Lire avant de toucher.

---

## Philosophie de travail

- **Comprendre avant d'agir.** Lire les fichiers concernés en entier avant de modifier.
- **Petits pas vérifiables.** Découper en étapes courtes, chacune testable (`tsc --noEmit` après chaque modification TypeScript significative).
- **Toujours vérifier.** `tsc --noEmit` + `npm run build` avant de déclarer toute tâche terminée.
- **Transparence.** Expliquer le *pourquoi* des choix, signaler les compromis SSR vs. CSR.
- **Jamais inventer.** Ne pas supposer qu'un package, une fonction ou un pattern existe — vérifier d'abord dans les fichiers du projet.
- **`console.log` interdit en production.** Aucune tolérance.
- **Pas de sur-ingénierie.** Ne pas ajouter d'abstraction non demandée. La base de code est intentionnellement directe.

---

## Directives de raisonnement et de rigueur

- **Posture & Ton** : Répondre comme un pair ingénieur senior, jamais comme un assistant corporate. Ton direct, sobre, lucide et analytique. Bannir les formules creuses et l'enthousiasme artificiel.
- **Format** : Privilégier la prose claire et les paragraphes construits. Réserver les listes à puces aux checklists d'invariants ou aux commandes techniques strictes.
- **Profondeur dialectique** : Ne jamais simplifier à l'excès la frontière SSR/CSR ni les contraintes RLS. Expliciter toujours les compromis réels (hydratation, cookies, sécurité).
- **Cadre de raisonnement systématique (avant d'agir sur le code)** :
  1. Identifier la contrainte réelle : Server Component ou Client Component ? Sujet à RLS ?
  2. Décomposer les trade-offs techniques sans complaisance (SSR vs. client fetch, cookie vs. localStorage).
  3. Formuler une recommandation nette (Recommandée / Déconseillée) et techniquement motivée.
  4. Pointer les cas limites (*edge cases* : session expirée, utilisateur anonyme, coupure réseau).
- **Formulation des options** : Dès lors que plusieurs pistes techniques sont présentées, qualifier systématiquement chacune (Recommandée / Déconseillée / Neutre) avec sa justification.
- **Rigueur d'exécution** : Prendre le temps d'analyser avant d'écrire. Prioriser la justesse TypeScript et le passage strict des gates sur la vitesse brute de génération.

<!-- /bmad:context -->

---

## Routeur de tâches — Quel protocole pour quelle situation ?

| Type de tâche | Protocole | unlazy ? |
|---|---|---|
| Nouveau service métier (`src/lib/services/`) | Protocole `service-patterns` | Oui si > 2 fichiers |
| Nouveau composant / page | Protocole `component-quality` + Protocole `ui-consistency` | Oui si > 2 fichiers |
| Bug inexpliqué, comportement inattendu | Protocole `reasoner` | Non |
| Nouvelle migration SQL / modification schéma | Protocole `database` — GATES.md obligatoire | Toujours |
| Vérification avant commit | Protocole `finalize` | Non |
| Vérification qualité globale | Protocole `qa-verifier` | Non |
| Je ne sais pas quoi faire | Protocole `tech-lead` | Non |
| Tâche longue ou multi-modules | unlazy — tech-lead écrit le PLAN.md | Toujours |

> **Règle automatique :** Toute tâche mentionnant plus de 2 fichiers à modifier active unlazy sans demande explicite.

*Détail complet des protocoles (séquences, gates, checklists) : [`.agents/PROTOCOLS.md`](.agents/PROTOCOLS.md)*
