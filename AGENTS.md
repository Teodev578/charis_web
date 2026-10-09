# AGENTS.md — Charis Nation / charis_web

<!-- bmad:context -->
<!-- Verified 2026-10-09. Constitution technique et invariants d'ingénierie logicielle. -->

## 🏛️ Vision & Architecture du Projet

**Charis Nation** est une plateforme web d'envergure pour une église locale, articulant une vitrine institutionnelle publique à fort impact visuel et une application dédiée à l'écoute d'enseignements spirituels avec prise de notes synchronisées et suivi de progression.

- **Stack Technique** : Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 6 strict · Supabase (PostgreSQL, RLS, Auth, Storage) · Double Design System (Vanilla CSS HSL public vs Tailwind v4 admin) · Zustand 5 & Contextes React.
- **Répertoire Racine** : `/home/fabien/Documents/Projets/Pro/charis_web/`
- **Oracles Déterministes** : [`GATES.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/GATES.md) & [`scripts/verify-gates.mjs`](file:///home/fabien/Documents/Projets/Pro/charis_web/scripts/verify-gates.mjs)

---

## ⛔ Les 5 Invariants Méthodologiques Obligatoires

### 1. Invariant de Posture, Style & Conception Profonde (Ousterhout)
- **Posture d'ingénieur senior** : Ton direct, sobre, lucide et analytique. Bannissement absolu de toute flatterie ou verbiage corporate artificiel (« C'est une excellente question ! », « C'est un plaisir »).
- **Primauté de la prose** : Paragraphes denses et logiquement articulés. Les listes à puces sont réservées aux commandes techniques strictes ou aux checklists de gates.
- **Formulation systématique des recommandations** : Dès qu'une alternative technique est présentée, lui attribuer formellement la mention **« (Recommandé) »** ou **« (Déconseillé) »** avec justification dialectique approfondie.
- **Philosophie d'Ousterhout (*A Philosophy of Software Design*)** :
  - **Modules Profonds (*Deep Modules*)** : Concevoir des composants, fonctions et services dotés d'interfaces publiques épurées masquant une logique substantielle. Refuser les modules superficiels dont l'interface est aussi complexe que l'implémentation.
  - **Dissimulation de l'information (*Information Hiding*)** : Encapsuler les détails de plomberie (connexions, timers, gestion des événements de bas niveau) et bannir la fuite d'abstraction dans les vues.
  - **YAGNI Strict & Anti-Slop** : Pas de couches d'indirection spéculatives, pas d'imports orphelins, pas de typages lâches (`any`), et interdiction formelle de code mort ou commenté.

### 2. Invariant de Gouvernance, Versions & Sécurité
- **Intégrité absolue des versions (Règle Inviolable)** : Interdiction formelle de modifier, mettre à jour, rétrograder ou ajouter la moindre dépendance dans `package.json` ou de changer les versions d'outils (Node, npm) sans demande préalable expresse et consentement écrit explicite de l'utilisateur.
- **Préavis obligatoire avant modification structurelle** : Toute intervention affectant l'architecture (schéma de base de données, déplacement de modules, refonte d'un Provider React global) requiert un préavis de 3 à 6 phrases exposant : (1) l'action projetée, (2) la justification technique, (3) les effets de bord potentiels et (4) l'alternative moins risquée examinée.
- **Actions destructives** : Audit exhaustif des usages (`grep_search`) obligatoire avant toute suppression de fichier, composant, table ou politique.

### 3. Invariant Dialectique : Le Brouillon de Réflexion obligatoire
- Pour toute tâche de complexité **≥ « Moyen »** (définie dans [`10-taches-fastidieuses.md`](.agents/rules/10-taches-fastidieuses.md)), obligation de formaliser son analyse dans [`.agents/WRITING_IMPROVEMENT.md`](.agents/WRITING_IMPROVEMENT.md) **avant d'écrire la première ligne de code applicatif** :
  - Le problème réel et la contrainte principale.
  - Au moins une alternative technique examinée et rejetée avec le motif précis de son abandon.
  - La solution retenue et sa justification au regard d'Ousterhout.
  - Clôture à chaud post-implémentation : résultat factuel observé et leçon retenue.

### 4. Invariant de Vérification Déterministe : Le Grand Livre des Gates
- Toute tâche substantielle s'accompagne d'oracles exécutables consignés dans [`GATES.md`](GATES.md) au format strict :
  `CHECK: <commande précise>`
  `EXPECT: <sortie ou code retour attendu>`
  `EVIDENCE: <résultat concrètement observé>`
- Aucune tâche n'est déclarée achevée sans exécution concluante de l'oracle `node scripts/verify-gates.mjs` et validation par `npx tsc --noEmit`, `npm run build` et `npm run lint`.

### 5. Invariant de Mémoire Continue & Capitalisation (KI)
- Dès qu'une anomalie technique, un piège d'hydratation ou une régression est rencontrée pour la **deuxième fois (N ≥ 2)**, enregistrement immédiat d'une fiche Knowledge Item dans [`.agents/knowledge/`](.agents/knowledge/) et indexation dans [`INDEX.md`](.agents/knowledge/INDEX.md).
- Cycle d'escalade : Fiche KI → Règle permanente dans [`.agents/rules/`](.agents/rules/) → Oracle exécutable dans [`GATES.md`](GATES.md).

---

## ⛔ Invariants Techniques Inviolables de la Stack Charis

1. **Client Supabase : Étanchéité Browser vs Server** :
   - Client Component / Contextes React → `src/lib/supabase/client.ts` (`createBrowserClient`).
   - Server Component / Server Actions / Route Handlers → `src/lib/supabase/server.ts` (`createServerClient`).
   - Ne jamais utiliser le client browser côté serveur ni le client serveur côté navigateur.
2. **Toute Donnée Sensible sous RLS** :
   - Jamais de requête sans politique RLS active. Aucun bypass `service_role` côté client.
   - Utilisation obligatoire de la fonction `get_user_profil(user_id)` (`SECURITY DEFINER`) dans les politiques touchant `utilisateurs` pour conjurer toute récursion infinie.
3. **Étanchéité des Server Components** :
   - Les Server Components ne reçoivent jamais de props non sérialisables (fonctions, hooks, instances de classes) en provenance de Client Components.
4. **Interdiction de `console.log()` en Production** :
   - Toléré uniquement en développement local sous condition stricte `if (process.env.NODE_ENV === 'development')`.
5. **Types Supabase Générés Intouchables** :
   - `src/lib/supabase/database.types.ts` est la source de vérité. Toute extension passe par des interfaces `extends`, jamais par modification manuelle du fichier généré.
6. **Double Design System Hermétique** :
   - Espace Public (Vitrine, Écoute) : Vanilla CSS avec tokens HSL dans `src/app/globals.css`. Zéro Tailwind.
   - Espace Admin : Tailwind CSS v4 dans `src/app/dashboard/dashboard.css`. Aucune fuite vers l'espace public.
7. **Moteur Audio & Prise de Notes** :
   - L'élément `<audio>` natif (`audioRef.current`) est la source unique de vérité temporelle. Ne pas dupliquer `currentTime` dans un state React à haute fréquence.
   - Le repositionnement temporel (`?t=secondes`) s'exécute exclusivement après l'événement `loadedmetadata`.
   - La synchronisation de progression vers `progression_lecture` est régulée par un throttle de 30 secondes.

---

## 👥 Dualité d'Organisation : Cadrage vs Équipe Locale

Le système sépare rigoureusement la réflexion stratégique de l'exécution technique locale :

### 1. Équipe Produit & Cadrage (Transverse BMAD)
- **Winston** (`bmad-agent-architect`) : Architecte système et garant des choix de cadrage structurel.
- **John** (`bmad-agent-pm`) : Product Manager, PRD et alignement sur la valeur utilisateur.
- **Sally** (`bmad-agent-ux-designer`) : Parcours utilisateurs, spécifications d'ergonomie et d'écoute.
- **Mary** (`bmad-agent-analyst`) : Analyste des exigences fonctionnelles et règles métier.

### 2. Équipe Technique Locale ([`charis-team`](.agents/plugins/charis-team/README.md))
- **`nextjs_frontend_dev`** : Lead Frontend Next.js 16 App Router, RSC/CC, Design system HSL public dans `globals.css`.
- **`audio_ux_specialist`** : Moteur audio, `AudioContext.tsx`, `AudioPlayer.tsx`, notes horodatées, deep-linking.
- **`supabase_guardian`** : Schémas PostgreSQL, migrations, RLS, typage `database.types.ts`, services dans `src/lib/services/`.
- **`admin_dashboard_dev`** : Espace `/dashboard`, Tailwind v4 (`dashboard.css`), CRUD catalogue et Storage.
- **`ts_quality_gate`** : Exécution déterministe des gates (`tsc --noEmit`, `npm run build`, `verify-gates.mjs`).

---

## 🗺️ Carte de Navigation du Répertoire `src/`

```text
src/
├── app/                        # Pages, layouts, routage (Next.js App Router)
│   ├── layout.tsx              # Layout racine : polices, FOUC-guard, SEO, OpenGraph
│   ├── globals.css             # Design system complet de l'espace public (variables HSL)
│   ├── page.tsx                # Accueil : vitrine institutionnelle, série en cours, favoris
│   ├── auth/                   # Connexion / Inscription Supabase Auth
│   ├── ecouter/                # Espace d'écoute quotidien
│   ├── explorer/               # Navigation par catégories et séries
│   ├── message/[id]/           # Lecteur détaillé, notes synchronisées, deep-link ?t=X
│   └── dashboard/              # Panel admin (layout isolé, Tailwind v4, sidebar)
│       ├── dashboard.css       # Thème admin (Tailwind v4)
│       ├── page.tsx            # KPIs globaux
│       ├── titres/             # CRUD messages audio + upload Supabase Storage
│       ├── categories/         # CRUD catégories + slugify
│       ├── series/             # CRUD séries thématiques
│       └── utilisateurs/       # Liste membres + promotion administrateurs
├── components/                 # Composants React réutilisables
│   ├── ClientAppWrapper.tsx    # Providers imbriqués + AudioPlayer + NotesPanel
│   ├── AudioPlayer.tsx         # Lecteur flottant persistant (ancré en bas)
│   ├── NotesPanel.tsx          # Tiroir coulissant de notes synchronisées
│   ├── NavigationDrawer.tsx    # Menu latéral gauche (nav + profil + auth)
│   ├── Header.tsx              # Barre sup : logo, recherche globale, bascule de thème
│   ├── TrackCard.tsx           # Carte enseignement (grille ou liste)
│   ├── Announcements.tsx       # Bannières dynamiques (série à la une, verset)
│   ├── SkeletonLoader.tsx      # Skeleton animé (performance perçue)
│   └── ShareMenu.tsx           # Partage avec deep-link ?t=secondes
├── contexts/                   # Contextes React globaux
│   ├── ThemeContext.tsx        # Thème light/dark, localStorage, classe .dark sur <html>
│   ├── AuthContext.tsx         # Session Supabase, signIn/signUp/signOut, profil utilisateur
│   └── AudioContext.tsx        # Cœur : audioRef, progression, notes, sync 30s
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # createBrowserClient() — côté client uniquement
│   │   ├── server.ts           # createServerClient() — côté serveur uniquement
│   │   ├── middleware.ts       # updateSession() pour le middleware Next.js
│   │   └── database.types.ts  # Types générés Supabase — SOURCE UNIQUE DE VÉRITÉ
│   └── services/               # Services métier Supabase (throw error obligatoire)
│       ├── messages.ts         # getMessages, getMessageById, getCategories, getSeries
│       └── user.ts             # getUserProgress, upsertProgress, favoris, notes
└── store/                      # Zustand (état global non-contextuel)
```

---

## 🚦 Routeur de Tâches & Protocoles Opérationnels

| Type de Tâche | Protocole Associé | Planification dans `plan.md` |
|---|---|---|
| Création ou modification d'un service (`src/lib/services/`) | Protocole `service-patterns` | Si > 2 fichiers |
| Nouveau composant ou écran de l'espace public | Protocole `component-quality` + `ui-consistency` | Si > 2 fichiers |
| Modification de l'AudioContext ou des Notes | Protocole `component-quality` (spécialité Audio) | Obligatoire si impact persistance |
| Écran du panneau d'administration | Protocole `component-quality` (spécialité Dashboard) | Si > 2 fichiers |
| Bug inexpliqué, régression d'hydratation ou d'écoute | Protocole `reasoner` | Non |
| Nouvelle migration SQL ou modification RLS | Protocole `database` | Toujours |
| Tâche fastidieuse ou batch de refactoring | Protocole `tech-lead` + `unlazy` | **Toujours obligatoire** |
| Validation finale pré-commit ou avant livraison | Protocole `finalize` | Non |

*Détails complets des checklists opérationnelles : [`.agents/PROTOCOLS.md`](.agents/PROTOCOLS.md)*

---

## ⚡ Commandes Canoniques de Validation Déterministe

Avant de déclarer toute tâche terminée, exécuter l'oracle global :

```bash
# Oracle déterministe complet (GATES.md)
node scripts/verify-gates.mjs

# Vérifications atomiques
npx tsc --noEmit
npm run build
npm run lint
```
