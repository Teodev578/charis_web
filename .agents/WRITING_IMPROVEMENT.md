# Journal Dialectique & Registre d'Arbitrages (`WRITING_IMPROVEMENT.md`)

Ce document constitue le brouillon de réflexion obligatoire et le registre vivant des arbitrages techniques du projet **Charis Nation**.

---

## 🏛️ Invariant Méthodologique Fondamental

Pour toute tâche de complexité **≥ « Moyen »** (définie selon la grille de [10-taches-fastidieuses.md](rules/10-taches-fastidieuses.md)), **aucun code applicatif ne doit être modifié** avant d'avoir matérialisé par écrit son analyse dans ce journal.

Chaque entrée doit obligatoirement expliciter :
1. **Le Problème Réel & la Contrainte Principale** : Identification lucide du défi sous-jacent, sans simplification abusive.
2. **L'Alternative Technique Examinée et Rejetée (Obligatoire)** : Description de la piste écartée et motif dialectique précis de son abandon.
3. **La Solution Retenue & sa Justification** : Pourquoi cette approche est supérieure au regard des standards d'Ousterhout (modularité profonde, dissimulation de l'information) et des conventions du dépôt.
4. **Clôture à Chaud Post-Implémentation** : Constat factuel observable après exécution, résultat des gates de vérification et signalement de leçon pour la mémoire (KI) si applicable.

> **Règle d'hygiène** : Ne pas consigner de micro-entrées pour les coquilles isolées, renommages triviaux ou retouches d'une ligne.

---

## 📑 Registre des Arbitrages Récents

### [2026-10-09] Initialisation de l'Écosystème Agentique Autonome

- **Complexité** : Fastidieux / Critique (Niveau 5)
- **Auteur** : Architecte d'Infrastructure Agentique Senior
- **Périmètre** : Racine du projet, `.agents/`, `scripts/`, gouvernance et oracles déterministes.

#### 1. Problème Réel & Contrainte Principale
Le dépôt disposait d'éléments agentiques dispersés mais manquait d'un cadre de vérification déterministe unifié, d'un grand livre d'oracles exécutables (`GATES.md`), de règles modulaires fondées sur la conception profonde d'Ousterhout et d'une articulation formelle entre l'équipe technique locale (`charis-team`) et la gouvernance globale. La contrainte majeure réside dans la préservation stricte de la compilation (`tsc --noEmit`, `npm run build`), le respect absolu de la dualité CSS (espace public HSL pur vs panneau admin Tailwind v4) et l'interdiction de toute modification unilatérale de dépendance.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Injection d'un prompt système monolithique et configuration ad-hoc sans artefacts de fichiers persistants.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Un prompt système monolithique sature inutilement la fenêtre d'attention des modèles, ne laisse aucune traçabilité dans git, empêche l'exécution d'oracles automatisés via la CLI et prive l'équipe des boucles d'apprentissage itératives (KI).

#### 3. Solution Retenue & Justification
- **Piste retenue** : Déploiement d'une architecture agentique modulaire persistante avec :
  1. Un grand livre déterministe (`GATES.md`) adossé à un oracle exécutable (`scripts/verify-gates.mjs`).
  2. Un ensemble de règles modulaires [01, 02, 08, 10, 11] ancrées sur les invariants du projet.
  3. L'intégration formelle de la philosophie d'Ousterhout (deep modules, YAGNI, information hiding).
  4. L'unification de l'équipe locale `charis-team` dans `.agents/plugins/charis-team/` avec un `README.md` canonique.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Vérification TypeScript stricte sans erreur (`tsc --noEmit`), build de production Next.js 16 compilé sans avertissement, script `verify-gates.mjs` opérationnel.
- **Leçon retenue** : La formalisation de gates claires dès l'amorce élimine les faux positifs et stabilise durablement le flux de développement.

---

### [2026-11-16] Préparation du Terrain Design System & Socle Cinétique (Sans Modification Visuelle)

- **Complexité** : Complexe (Niveau 4 — multi-fichiers : `DESIGN.md`, `.impeccable/design.json`, `globals.css`, `src/hooks/`, `.agents/rules/ui_motion.md`, `GATES.md`)
- **Périmètre** : Contrat visuel et cinétique (`DESIGN.md` + sidecar), tokens CSS et primitives opt-in dans `src/app/globals.css`, hooks de révélation et de progression au scroll dans `src/hooks/`.

#### 1. Problème Réel & Contrainte Principale
Le dépôt possède déjà des règles éparses (`aesthetic_standards.md`, `ui_motion.md`, `ui_forbidden.md`) mais manque d'un contrat unifié racine (`DESIGN.md`) exploitable par les outils et agents, ainsi que de l'infrastructure technique promise par ces règles (les tokens `--duration-*` / `--ease-*`, le garde-fou global `prefers-reduced-motion`, les classes primitives GPU-only et `src/hooks/useReveal.ts` n'existaient pas dans `src/`). Deux contraintes strictes s'imposent : ne modifier aucun rendu visuel actuel (« préparer le terrain sans toucher au design ») et ne toucher aucune dépendance dans `package.json` sans consentement explicite de l'utilisateur.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Installer dès maintenant `motion` (Framer Motion) et `lenis`, et créer des composants wrapper abstraits (`ScrollScaleStage`, `TextReveal`) prêts à l'emploi.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : L'ajout unilatéral de dépendances dans `package.json` viole l'invariant de gouvernance des versions (`AGENTS.md` §2). De plus, créer des composants UI non consommés avant la refonte effective des sections contreviendrait au principe YAGNI (`01-engineering-standards.md` §2.1) en figeant des APIs prématurées.

#### 3. Solution Retenue & Justification
- **Piste retenue** : Préparation en trois couches purement additives et sans dépendance :
  1. **Contrat documentaire & machine-readable** : `DESIGN.md` à la racine et `.impeccable/design.json` alignant les tokens réels de `globals.css` avec la grammaire éditoriale et cinétique cible.
  2. **Socle CSS opt-in dans `src/app/globals.css`** : ajout de variables de durée/courbes harmonisées (`--ease-out`, `--ease-in-out`, `--ease-editorial`, `--ease-drawer`), d'une échelle typographique fluide tenant compte des diacritiques français (`--leading-display: 1.12`), de primitives GPU-only inertes tant que non appliquées, des règles View Transitions et du garde-fou global `prefers-reduced-motion`.
  3. **Hooks profonds sans re-render dans `src/hooks/`** : `useReveal.ts` (`IntersectionObserver`, manipulation directe de `data-visible`) et `useScrollProgress.ts` (`requestAnimationFrame` passif, mutation DOM directe sans `setState` à haute fréquence, philosophie Ousterhout).

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : `DESIGN.md`, `.impeccable/design.json`, `src/app/globals.css` (tokens et primitives opt-in), `src/hooks/useReveal.ts`, `src/hooks/useScrollProgress.ts`, `src/hooks/index.ts`, `.agents/rules/ui_motion.md` et `GATES.md` validés sans modification visuelle sur les pages actuelles et sans aucune altération de `package.json`. `npx tsc --noEmit`, `npm run lint`, `impeccable detect` et `npm run build` passés à 0 erreur.
- **Leçon retenue** : Harmoniser les courbes d'animation (`--ease-editorial`, `--ease-out`, `--ease-expo`) dès la phase de socle évite les contradictions entre règles (`ui_motion.md`) et détecteurs automatiques (`impeccable detect`), et protège les diacritiques français (`É`, `À`, `È`) sous masque `overflow: hidden`.

---

### [2026-11-17] Unification Chromatique Globale sur la Base du Hero (`COLOR-COHERENCE-01`)

- **Complexité** : Fastidieux / Critique (Niveau 5 — refactor chromatique transverse sur `globals.css`, Vitrine, Espace Écoute, composants partagés, `DESIGN.md` et règles)
- **Périmètre** : Ensemble de l'espace public et tokens partagés, en préservant strictement `HeroSection.tsx` et `HeroGrainSurface.tsx` intacts.

#### 1. Problème Réel & Contrainte Principale
`HeroSection.tsx` et `HeroGrainSurface.tsx` établissent une identité visuelle claire et minérale (`#f2f2f2` galerie, encre `#111111`, accents `#fc7d42` / `#FB5E17` et `#6C288B`, voiles `#f8dfd2` / `#ebe3f2`), alors que le reste de la Vitrine (`VitrineHeader`, sections sous le Hero, `VitrineFooter`) reste bloqué sur un thème sombre violet-jaune (`#1A0A21` / `#251230` / `#572269` / `#FBC906`) et que `globals.css` ne déclare pas les alias Tailwind v4 (`bg-bg-surface`, `text-text-main`, `bg-primary-accent`, `bg-background`) utilisés dans `/ecouter`, `/explorer`, `/message/[id]` et `AudioPlayer`. La contrainte majeure est d'unifier l'intégralité du site sur la base du Hero sans toucher aux fichiers Hero existants ni dégrader le contraste WCAG (notamment pour l'orange `#fc7d42` sur fond clair).

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Remplacer mécaniquement toutes les occurrences hex dans chaque fichier sans recentraliser les tokens dans `globals.css`, ou passer toute la Vitrine en mode sombre `#1A0A21` pour masquer l'écart.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Conserver `#1A0A21` et `#FBC906` entretient la rupture visuelle dès la sortie du Hero `#f2f2f2`, tandis qu'un remplacement ad-hoc perpétuerait la dérive des valeurs hardcodées et laisserait cassés les alias manquants dans `@theme`.

#### 3. Solution Retenue & Justification
- **Piste retenue** : Ancrer la palette du Hero comme source de vérité unique dans `src/app/globals.css` (mode clair `#f2f2f2` / `#ffffff` / `#111111`, mode sombre `#111111` / `#1A1A1A` / `#f2f2f2`, accents `--brand-purple: #6C288B` et `--brand-orange: #fc7d42`), réparer les alias `@theme`, aligner les 8 sections/composants Vitrine hors Hero (alternance galerie claire `#f2f2f2` / `#ffffff` et ancrage `#111111` sur `AudioExtractsSection` et `VitrineFooter` en continuité avec les boutons noirs du Hero), puis mettre à jour `DESIGN.md`, `.impeccable/design.json` et les règles associées.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Ensemble des tokens (`globals.css`, `dashboard.css`), composants Vitrine hors Hero (`page.tsx`, `VitrineHeader`, `VisionMissionSection`, `PastoralTeamSection`, `AudioExtractsSection`, `EventsSection`, `LocationHoursSection`, `DonationsSection`, `VitrineFooter`), composants Espace Écoute (`NavigationSidebar`, `NavigationDrawer`, `StickyAudioPlayer`, `RightPanel`, `TrackCard`, `Announcements`, `AnnouncementCard`, `ui/Header`, `explorer/page`, `message/[id]/page`), documentation (`DESIGN.md`, `.impeccable/design.json`, `aesthetic_standards.md`, `ui_forbidden.md`) et `GATES.md` unifiés sur la palette du Hero sans altérer `HeroSection.tsx`, `HeroGrainSurface.tsx`, `src/hooks/*` ni `package.json`.
- **Leçon retenue** : Les alias `@theme` de Tailwind v4 (`--color-bg-surface`, `--color-text-main`, `--color-primary-accent`, `--color-background`) doivent être explicitement déclarés dans `globals.css` pour que les classes utilitaires héritées de l'Espace Écoute prennent réellement les tokens de thème.

---

### [2026-11-17] Alignement Typographique des En-Têtes Vitrine (`HEADER-TYPO-01`)

- **Complexité** : Complexe (Niveau 4 — `layout.tsx`, `globals.css`, `HeroSection.tsx`, `VitrineHeader.tsx`, `DESIGN.md`, `.impeccable/design.json`, `GATES.md`)
- **Périmètre** : Correction du chargement effectif de `Plus Jakarta Sans` (`--font-jakarta`) et unification typographique entre le `<header>` intégré de `HeroSection.tsx` et le sticky `VitrineHeader.tsx`.

#### 1. Problème Réel & Contrainte Principale
Deux défauts typographiques nuisaient aux en-têtes de la Vitrine :
1. `src/app/layout.tsx` injectait `Plus_Jakarta_Sans` dans `--font-jakarta`, mais `@theme` dans `src/app/globals.css` redéfinissait la même variable `--font-jakarta: "Plus Jakarta Sans", sans-serif` avec une chaîne littérale sans `@font-face` correspondant, masquant la police Google optimisée.
2. Les deux en-têtes de la Vitrine divergeaient sur la silhouette de marque (`font-bold text-xl tracking-tight` seul dans le Hero vs `font-bold text-lg tracking-wide` + sous-titre `10px` hors échelle dans `VitrineHeader.tsx`) et présentaient une navigation mobile non masquée dans le Hero (`flex` sur 375px).
La contrainte absolue est de préserver intégralement les animations et couleurs du Hero.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Ajouter des tailles arbitraires distinctes (`text-[13px]`, `text-[20px]`) directement en classes utilitaires dans `HeroSection.tsx` et `VitrineHeader.tsx` sans résoudre la collision `--font-jakarta`.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Dupliquer des classes ad-hoc dans deux composants entraîne une dérive rapide et laisse la police `Plus Jakarta Sans` non résolue au profit du fallback système.

#### 3. Solution Retenue & Justification
- **Piste retenue** : Dissocier la variable source dans `layout.tsx` (`--font-jakarta-sans`) pour alimenter `--font-jakarta` (et `--font-plus-jakarta`) dans `globals.css` sans cycle CSS, puis factoriser les trois rôles typographiques partagés (`.vitrine-wordmark`, `.vitrine-nav-link`, `.vitrine-nav-cta`) appliqués à l'identique dans le `<header>` du Hero et dans `VitrineHeader.tsx`, avec documentation dans `DESIGN.md` et `.impeccable/design.json`.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Variable `--font-jakarta-sans` dissociée dans `layout.tsx` et résolue sans cycle dans `globals.css` (`--font-jakarta` et `--font-plus-jakarta`) ; rôles `.vitrine-wordmark`, `.vitrine-nav-link` et `.vitrine-nav-cta` placés dans `@layer components` et appliqués à l'identique aux en-têtes de `HeroSection.tsx` et `VitrineHeader.tsx` (suppression du sous-titre `10px`, `hidden md:flex` sur le `<nav>` Hero) sans altérer les couleurs ni les animations du Hero.
- **Leçon retenue** : En Tailwind CSS v4, toute classe typographique utilitaire partagée doit vivre dans `@layer components` pour que les modificateurs conditionnels (`font-semibold` sur le lien actif) conservent leur priorité dans la cascade, et la variable CSS d'une police `next/font` ne doit jamais porter le même nom que la variable finale `@theme`.

---

### [2026-11-17] Rationalisation Architecturale Idiomatique Next.js 16 (`ARCH-CLEANUP-01`)

- **Complexité** : Fastidieux / Critique (Niveau 5 — réorganisation d'architecture transverse : purge de 7 fichiers morts/reliquats Vite, création de `src/lib/utils/`, refactoring des duplications dans 6 fichiers, normalisation des imports `@/*` dans ~30 fichiers, synchronisation `AGENTS.md` et `GATES.md`)
- **Périmètre** : `src/lib/utils/`, purge de `src/assets/` et 4 composants orphelins, normalisation `@/*` dans `src/`, `AGENTS.md` et `GATES.md` (en préservant strictement `HeroSection.tsx`, `HeroGrainSurface.tsx`, `src/hooks/*` et `package.json`).

#### 1. Problème Réel & Contrainte Principale
Transposer la séparation des responsabilités du modèle « React JS Advanced Folder Structure » (composants, layout, services, utilitaires/helpers) dans une architecture Next.js 16 App Router + TypeScript strict + Supabase sans briser le routage `src/app/`, la frontière RSC/CSR ni les oracles de `GATES.md`, tout en éliminant la dette d'une migration antérieure depuis Vite (`src/assets/`, 4 composants orphelins, 6 duplications de `formatTime`, imports relatifs `../../../` fragiles).

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Appliquer littéralement l'arborescence SPA (`src/pages/`, `src/Routers/Routers.js`, `src/store/reducers.js`, CSS Modules par composant et barrels `index.ts` dans `src/components/`).
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Incompatible avec Next.js 16 App Router (`src/app/`), le double design system hermétique (`globals.css` / `dashboard.css`), Zustand 5 et l'isolation RSC/CSR.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Conserver les piliers App Router, purger les 7 fichiers morts, créer le module profond `src/lib/utils/` (`format.ts`, `slug.ts`, `index.ts`), unifier tous les imports inter-dossiers sous l'alias `@/*` et aligner `AGENTS.md` et `GATES.md`.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Socle `src/lib/utils/` (`format.ts`, `slug.ts`, `index.ts`) créé ; reliquats Vite (`src/assets/`) et 4 composants orphelins purgés ; 6 implémentations locales de `formatTime`, `formatDate` et `generateSlug` remplacées par `@/lib/utils` ; 100 % des imports inter-dossiers statiques et dynamiques normalisés vers `@/*` ; carte `src/` de `AGENTS.md` et 3 nouvelles gates de `GATES.md` alignées sans toucher `HeroSection.tsx`, `HeroGrainSurface.tsx`, `src/hooks/*` ni `package.json`. Validation complète : `npx tsc --noEmit` (code 0), `npm run lint` (code 0), `npm run build` (12/12 routes compilées en 4,0 s), `node scripts/verify-gates.mjs` (22/22 gates passées, 0 en échec).
- **Leçon retenue** : Centraliser les fonctions pures dans `src/lib/utils/` et exiger l'alias canonique `@/*` via une gate grep exécutable prévient à la fois la duplication silencieuse entre routes App Router et la fragilité des chemins relatifs profonds (`../../../`).

---

### [2026-11-17] Prefactoring d'Orthogonalité de `src/components/` et Assainissement de la Racine (`ARCH-PREFACTOR-02`)

- **Complexité** : Complexe / Fastidieux (Niveau 4/5 — réorganisation structurelle de `src/components/`, suppression du dossier `src/components/vitrine/`, assainissement de la racine `/`, mise à jour des imports consommateurs, synchronisation `AGENTS.md` et `GATES.md`)
- **Périmètre** : `src/components/layout/`, `src/components/navigation/`, `src/components/sections/{hero,vitrine,ecouter}/`, racine du dépôt (`update_header.py`, `architecture.md`), `src/app/{layout,page,ecouter/page,explorer/page}.tsx`, `AGENTS.md` et `GATES.md` (sans aucune modification de contenu dans `HeroSection.tsx`, `HeroGrainSurface.tsx` ni `package.json`).

#### 1. Problème Réel & Contrainte Principale
`src/components/` mélangeait deux axes taxonomiques orthogonaux : six dossiers classés par rôle architectural (`layout/`, `navigation/`, `notes/`, `player/`, `sections/`, `ui/`), un fichier isolé à la racine (`ClientAppWrapper.tsx`) et un dossier fourre-tout classé par page (`vitrine/`) empilant 10 fichiers hétérogènes à plat (en-tête, pied de page, scène Hero WebGL et six sections éditoriales). Parallèlement, la racine du dépôt conservait un script jetable obsolète (`update_header.py`) et `architecture.md` redondant avec `AGENTS.md` et `docs/`. La contrainte critique consiste à restaurer une orthogonalité stricte par rôle tout en préservant à l'octet près `HeroSection.tsx` et `HeroGrainSurface.tsx`.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Conserver `src/components/vitrine/` à plat avec 10 fichiers hétérogènes et laisser `ClientAppWrapper.tsx` à la racine de `src/components/`, ou éclater uniquement les sections en ajoutant des barrels `index.ts`.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Maintenir `vitrine/` à plat perpétue l'ambiguïté taxonomique entre `navigation/`, `layout/` et `sections/`, tandis que multiplier des sous-dossiers non normalisés maintient la confusion sur la frontière entre composants de structure globale et sections éditoriales.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Adopter une classification 100 % orthogonale par rôle architectural dans `src/components/` (`layout/` avec `ClientAppWrapper.tsx`, `AppLayout.tsx`, `VitrineFooter.tsx` ; `navigation/` avec `Header.tsx`, `NavigationSidebar.tsx`, `VitrineHeader.tsx` ; `sections/{hero,vitrine,ecouter}/` avec zéro fichier libre aux racines de `components/` et `sections/`), supprimer `update_header.py` et déplacer `architecture.md` vers `docs/architecture.md`.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Dossier `src/components/vitrine/` dissous au profit d'une organisation 100 % orthogonale par rôle (`layout/`, `navigation/`, `sections/{hero,vitrine,ecouter}/`) avec zéro fichier libre aux racines de `src/components/` et `src/components/sections/` ; `update_header.py` supprimé et `architecture.md` déplacé vers `docs/architecture.md` ; 5 consommateurs mis à jour ; `AGENTS.md` et `GATES.md` synchronisés ; aucune ligne modifiée dans `HeroSection.tsx`, `HeroGrainSurface.tsx` ni `package.json`. `npx tsc --noEmit` (code 0), `npm run lint` (code 0), `npm run build` (`Compiled successfully in 4.0s`, 12/12 routes) et `node scripts/verify-gates.mjs` validés à 23/23.
- **Leçon retenue** : Séparer la classification par rôle technique (`layout/`, `navigation/`, `player/`, `notes/`, `ui/`) de la classification par sous-domaine de page sous `sections/` supprime toute ambiguïté sur l'emplacement d'un nouveau composant.

---

### [2026-11-17] Structuration en Sous-Dossiers de `sections/vitrine/` et `sections/ecouter/` (`ARCH-SECTIONS-03`)

- **Complexité** : Complexe (Niveau 4 — création de 8 sous-dossiers, déplacement de 9 fichiers sans altérer `hero/`, mise à jour de 4 consommateurs, synchronisation `AGENTS.md` et `GATES.md`)
- **Périmètre** : `src/components/sections/vitrine/`, `src/components/sections/ecouter/`, `src/app/{page,ecouter/page,explorer/page}.tsx`, `AGENTS.md` et `GATES.md`.

#### 1. Problème Réel & Contrainte Principale
Suite au déplacement manuel de `hero/` dans `src/components/sections/vitrine/hero/`, `src/components/sections/vitrine/` combinait un sous-dossier (`hero/`) et six fichiers `.tsx` à plat, tout comme `src/components/sections/ecouter/` qui gardait trois fichiers `.tsx` à sa racine. La contrainte est d'uniformiser la granularité en encapsulant chaque section dans son propre sous-dossier sans modifier `HeroSection.tsx`, `HeroGrainSurface.tsx` ni `package.json`, tout en conservant la racine globale du dépôt `/` inchangée selon la décision de l'utilisateur.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Regrouper les 6 sections restantes dans un sous-dossier unique (`vitrine/content/`), ou conserver les fichiers `.tsx` à plat à côté de `hero/`.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Conserver des fichiers `.tsx` à plat à côté de `hero/` maintient une asymétrie visuelle et structurelle, tandis qu'un sous-dossier `content/` intermédiaire crée un niveau d'indirection superflu par rapport aux sous-dossiers directs par section.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Isoler chaque section dans son sous-dossier dédié (`vitrine/{audio-extracts,donations,events,hero,location-hours,pastoral-team,vision-mission}/` et `ecouter/{announcements,track-card}/`), offrant zéro fichier `.tsx` libre aux racines de `vitrine/` et `ecouter/` et un espace prêt à accueillir d'éventuels sous-composants locaux sans refactoring ultérieur.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Les 6 sections restantes de `src/components/sections/vitrine/` et les 3 fichiers de `src/components/sections/ecouter/` ont été encapsulés dans leurs sous-dossiers respectifs (`audio-extracts/`, `donations/`, `events/`, `location-hours/`, `pastoral-team/`, `vision-mission/`, `announcements/`, `track-card/`), avec zéro fichier `.tsx` à plat dans `vitrine/` ou `ecouter/`. Les 4 consommateurs (`page.tsx`, `ecouter/page.tsx`, `explorer/page.tsx`, `Announcements.tsx`), `AGENTS.md` et `GATES.md` ont été synchronisés sans modifier `HeroSection.tsx`, `HeroGrainSurface.tsx` ni `package.json`, et la racine du dépôt `/` est restée inchangée selon le choix utilisateur. Validation : `npx tsc --noEmit` (code 0), `npm run lint` (code 0) et `node scripts/verify-gates.mjs` (23/23 gates passées, 0 en échec).
- **Leçon retenue** : Aligner la granularité des dossiers frères (`vitrine/hero/` et l'ensemble des autres sections de `vitrine/` et `ecouter/`) par une gate vérifiant l'absence de `.tsx` libres à leur racine garantit la symétrie durable de l'arborescence.

---

### [2026-11-17] Scène Rideau Collante pour le Hero de la Vitrine (`HERO-CURTAIN-01`)

- **Complexité** : Complexe (Niveau 4 — création de `src/components/sections/vitrine/hero/HeroCurtainStage.tsx`, ajout des règles `.hero-curtain-*` dans `src/app/globals.css`, intégration dans `src/app/page.tsx`, mise à jour de `GATES.md`, `.agents/plan.md` et `.agents/WRITING_IMPROVEMENT.md`)
- **Périmètre** : `src/components/sections/vitrine/hero/HeroCurtainStage.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `GATES.md` (en préservant strictement `HeroSection.tsx`, `HeroGrainSurface.tsx`, `src/hooks/*` et `package.json`).

#### 1. Problème Réel & Contrainte Principale
L'utilisateur souhaite conserver `HeroSection` dans `src/components/sections/vitrine/hero/` tout en le maintenant figé à l'écran lors du défilement de la Vitrine selon un effet rideau (*Sticky Curtain Reveal*) où les sections suivantes glissent par-dessus jusqu'à le recouvrir. Quatre contraintes techniques critiques se présentent :
1. Préserver `HeroSection.tsx` et `HeroGrainSurface.tsx` intacts (`DESIGN.md`) sans ajouter de dépendance externe.
2. Isoler le contexte d'empilement (`isolation: isolate`) du Hero, dont les couches internes montent jusqu'à `z-40`, afin qu'aucune d'elles ne passe devant le rideau (`z-10`) ou `VitrineHeader` (`z-40`).
3. Éviter l'écrasement visuel entre deux plans successifs de même teinte `#f2f2f2` (`HeroSection` et `VisionMissionSection`), sans rogner les bords latéraux full-bleed de la frise d'images du Hero.
4. Éviter tout piège de focus clavier (`Tab`) et de peinture GPU inutile lorsque le Hero est intégralement recouvert sous les sections suivantes, tout en respectant `prefers-reduced-motion: reduce`.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Déplacer `HeroSection` vers `src/components/layout/` ou poser simplement `sticky top-0` en classes Tailwind directement dans `src/app/page.tsx` avec un `scale()` sur tout le Hero.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Déplacer le Hero hors de `sections/vitrine/hero/` rompt l'orthogonalité par domaine vérifiée par `GATES.md`. Par ailleurs, un simple `sticky top-0` sans `isolation: isolate`, voile d'assombrissement ni bascule `inert`/`visibility: hidden` laisserait les `z-40` internes du Hero interférer, confondrait les deux plans `#f2f2f2`, maintiendrait des liens focusables sous un rideau opaque et rognerait les bords full-bleed de la frise en cas de `scale()`.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Créer un module profond `HeroCurtainStage.tsx` dans `src/components/sections/vitrine/hero/` à interface minimale (`hero`, `children`), combiné à des règles dédiées dans `src/app/globals.css` :
  1. Conteneur sticky isolé (`.hero-curtain-backdrop` à `z-index: 0; isolation: isolate`) et rideau supérieur (`.hero-curtain-sheet` à `z-index: 10` avec ombre d'élévation supérieure).
  2. Parallaxe verticale GPU-only légère (`translate3d` sur `--hero-curtain-progress`) et voile progressif `.hero-curtain-scrim` (`#111111` jusqu'à `0.26`), préservant l'intégrité bord-à-bord de la frise photographique.
  3. Pilotage par `requestAnimationFrame` passif sans aucun `useState` ni re-render React, basculant `data-covered="true"` (`visibility: hidden`), `inert` et `aria-hidden="true"` dès recouvrement complet (`curtainTop <= 1`), avec neutralisation complète sous `@media (prefers-reduced-motion: reduce)`.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Composant [HeroCurtainStage.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/hero/HeroCurtainStage.tsx) créé, styles `.hero-curtain-*` et repli `prefers-reduced-motion` ajoutés dans `src/app/globals.css`, intégration réalisée dans `src/app/page.tsx` avec ancrage `z-10` sur `VitrineFooter`, sans aucune modification de `HeroSection.tsx`, `HeroGrainSurface.tsx`, `src/hooks/*` ni `package.json`. Validation complète : `npx tsc --noEmit` (code 0), `npm run lint` (code 0), `npm run build` (`Compiled successfully in 15.6s`, 12/12 routes) et `node scripts/verify-gates.mjs` (24/24 gates validées, 0 en échec).
- **Leçon retenue** : Piloter l'état de recouvrement (`data-covered`, `inert`, `aria-hidden`) et `--hero-curtain-progress` par mutation DOM directe sur `requestAnimationFrame` évite tout re-render React lors du passage du rideau, tout en conjurant les collisions de `z-index` et les pièges de focus clavier.

---

### [2026-11-23] Agrandissement de l'Image Centrale du Hero et Fusion Négative sur le Titre (`HERO-OVERLAP-NEGATIVE-01`)

- **Complexité** : Moyen / Complexe (Niveau 3-4 — couplage géométrique CSS dans `src/app/globals.css`, refonte d'empilement et fusion `mix-blend-difference` dans `src/components/sections/vitrine/hero/HeroSection.tsx`, ajout d'oracle dans `GATES.md`, suivi dans `plan.md` et `WRITING_IMPROVEMENT.md`)
- **Périmètre** : `src/app/globals.css`, `src/components/sections/vitrine/hero/HeroSection.tsx`, `GATES.md`.

#### 1. Problème Réel & Contrainte Principale
L'image centrale de la frise du Hero doit être agrandie en largeur et en hauteur afin de déborder sur le titre principal « Charis Nation » (tout en laissant déborder ses extrémités gauche/droite et sa base sur le fond `#f2f2f2`) avec un effet de négatif chromatique à l'intersection texte/image. Deux contraintes techniques majeures conditionnent la fiabilité multi-écrans :
1. La frise est ancrée depuis le haut (`--hero-strip-top`), tandis que le titre est centré verticalement sur la hauteur de scène (`--hero-stage-h`) puis décalé vers le bas (`--hero-title-shift-y`). Une hauteur fixe en pixels provoquerait soit un vide sur les grands écrans (1080p), soit un écrasement de la devise et des CTA sur les petits écrans (640p–720p).
2. En CSS Compositing, `mix-blend-mode: difference` ne traverse pas les contextes d'empilement isolés par `transform` ou `z-index`, exige un arrière-plan opaque ($\alpha_b = 1$) pour préserver l'encre noire hors photo, et ne doit en aucun cas affecter la devise ni les boutons CTA situés immédiatement sous le titre.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Augmenter manuellement `--hero-card-h-active` avec des valeurs fixes en pixels par breakpoint (`540px`, `620px`) et appliquer `mix-blend-difference` directement sur le conteneur englobant à la fois le `<h1>`, la devise et les CTA.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Une hauteur fixe en pixels se désynchronise de la position verticale du titre centrée par `100vh`, cassant le recouvrement sur les hauteurs de viewport extrêmes. Par ailleurs, placer `mix-blend-difference` sur le wrapper parent du titre inverserait également les couleurs des boutons CTA et échouerait à traverser un conteneur porteur d'un `transform: translateY(...)` s'il isolait le titre des cartes.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Encapsuler la géométrie dans des tokens CSS couplés algébriquement et dissocier les plans d'empilement dans `HeroSection.tsx` :
  1. Calculer `--hero-card-h-active` à partir de `--hero-stage-h / 2 + --hero-title-shift-y - --hero-strip-top + --hero-title-overlap-offset` et élargir `--hero-card-w-active` jusqu'à `550px` sur desktop (`lg`), garantissant un chevauchement constant de ~72–73 % du titre quel que soit le viewport tout en conservant l'intro Step 2 via `--hero-intro-w`/`--hero-intro-h`.
  2. Munir le conteneur de scène commun d'un fond opaque `bg-[#f2f2f2]` et de `isolation: isolate`, y placer la frise (et l'image d'intro) à `z-20`, le `<h1>` en enfant direct à `z-30` avec `text-white mix-blend-difference`, et la devise/CTA dans un conteneur frère distinct à `z-30` sans `mix-blend-difference` aligné par boîte d'ancrage fantôme.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Tokens géométriques couplés (`--hero-stage-h`, `--hero-strip-top`, `--hero-title-shift-y`, `--hero-title-overlap-offset`, `--hero-intro-w/h`, `--hero-card-w-active: 550px` en `lg`, `--hero-card-h-active` dynamique) intégrés dans [globals.css](file:///home/fabien/Documents/Projets/Pro/charis_web/src/app/globals.css) ; scène isolée (`bg-[#f2f2f2] isolate`), `<h1>` porteur de `text-white mix-blend-difference` (`z-30`) dissocié du bloc frère devise/CTA (`z-30` sans fusion négative), continuité de l'image d'intro et frise (`z-20`, `scale-100`) implémentés dans [HeroSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/hero/HeroSection.tsx) ; gate `HERO-OVERLAP-NEGATIVE-01` ajoutée dans [GATES.md](file:///home/fabien/Documents/Projets/Pro/charis_web/GATES.md). Validation complète : `npx tsc --noEmit` (code 0), `npm run lint` (code 0), `npm run build` (`Compiled successfully in 12.3s`, 12/12 routes) et `node scripts/verify-gates.mjs` (`25 passée(s), 0 en échec`).
- **Leçon retenue** : Coupler algébriquement la hauteur de la carte active aux variables de scène (`--hero-stage-h`, `--hero-title-shift-y`, `--hero-strip-top`) garantit la constance du chevauchement sur le titre sur toute hauteur d'écran, tandis que le fractionnement en frères sous `bg-[#f2f2f2] isolate` préserve intactes les couleurs des CTA hors de `mix-blend-difference`.

---

### [2026-11-23] Généralisation du Stacking Website Sections sur la Vitrine (`VITRINE-STACK-01`)

- **Complexité** : Complexe (Niveau 4 — extension du module profond `HeroCurtainStage.tsx`, mise à jour des règles `.hero-curtain-*` / `.hero-stack-*` dans `src/app/globals.css`, élévation de `VitrineFooter` dans `src/app/page.tsx`, ajout d'oracle dans `GATES.md`, traçabilité `plan.md`)
- **Périmètre** : `src/components/sections/vitrine/hero/HeroCurtainStage.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `GATES.md`.

#### 1. Problème Réel & Contrainte Principale
`HeroCurtainStage` ne maintenait qu'un unique panneau épinglé pour le Hero, regroupant les six sections éditoriales suivantes dans un seul rideau continu. Généraliser l'empilement (*Stacking Website Sections*) à l'ensemble des sept sections de la Vitrine et au pied de page soulève trois contraintes :
1. Les sections dont la hauteur dépasse `100dvh` sur petits écrans doivent défiler jusqu'à leur bord inférieur avant de se figer (`top: vh - panelHeight`), faute de quoi leur contenu bas serait tronqué.
2. Les liens d'ancres (`#vision`, `#equipe`, `#enseignements`, `#cultes`, `#localisation`, `#dons`, `#hero`) échoueraient à remonter vers une section déjà épinglée en `position: sticky` si `scrollIntoView` ciblait le panneau collant lui-même.
3. Le serveur de développement `next dev` actif ne doit pas être écrasé par un `npm run build` concurrent durant les vérifications.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Dupliquer un wrapper `position: sticky; top: 0` et un gestionnaire de scroll individuel dans chacun des sept composants de section Vitrine, sans sentinelle de flux.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Multiplierait la plomberie DOM et les listeners `scroll` dans sept fichiers, romprait la navigation par ancres en remontée depuis le bas de page et bloquerait la lecture des sections plus hautes que le viewport.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Faire de `HeroCurtainStage.tsx` le module profond unique qui aplatit `[hero, ...children]`, associe une sentinelle fixe de flux normal (`.hero-stack-sentinel`) à chaque panneau sticky, calcule dynamiquement `panel.style.top` via `ResizeObserver`, redirige `section.scrollIntoView` et les liens `a[href^="#"]` vers les sentinelles sans modifier les composants enfants, et anime uniquement le compositeur GPU (`transform: translate3d/scale`, `opacity`, `border-radius`) avec neutralisation `inert`/`visibility: hidden` des cartes recouvertes et élévation `z-20` du footer.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : [HeroCurtainStage.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/hero/HeroCurtainStage.tsx) généralisé en pile multi-sections (`[hero, ...Children.toArray(children)]`), doté de sentinelles `.hero-stack-sentinel`, d'un calcul dynamique `top: vh - offsetHeight` via `ResizeObserver` pour les sections excédant `100dvh`, d'une redirection `scrollIntoView` + interception des clics `#id`, d'une progression GPU par `rAF` (`translate3d`, `scale`, `border-radius`, scrim) et d'une neutralisation `inert`/`data-covered` ; règles `.hero-curtain-*` et `prefers-reduced-motion` mises à jour dans [globals.css](file:///home/fabien/Documents/Projets/Pro/charis_web/src/app/globals.css) (incluant `width: 100%` sur `.hero-curtain-media > section > .max-w-7xl`) ; `VitrineFooter` élevé à `z-20` dans [page.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/app/page.tsx) ; gate `VITRINE-STACK-01` ajoutée dans [GATES.md](file:///home/fabien/Documents/Projets/Pro/charis_web/GATES.md). Validations exécutées sans altérer `.next/dev` : `npx tsc --noEmit` (code 0), `npm run lint` (code 0), oracle `VITRINE_STACK_ACTIF` validé et chunks `.next/dev` recompilés.
- **Leçon retenue** : Passer `<section>` en colonne flex (`display: flex; flex-direction: column`) impose de fixer explicitement `width: 100%` sur l'enfant `.max-w-7xl.mx-auto` pour éviter le rétrécissement au contenu, et placer des sentinelles hors `position: sticky` reste indispensable pour que la navigation par ancres fonctionne vers le haut comme vers le bas.

---

### [2026-11-23] Empilement Éditorial en Lames Numérotées 01–06 sous VitrineHeader (`VITRINE-STACK-LAMES-02`)

- **Complexité** : Complexe (Niveau 4 — extension de `HeroCurtainStage.tsx` avec export de `VitrineSectionHeader`, stabilisation de `VitrineHeader.tsx`, refonte CSS `.vitrine-stack-*` dans `globals.css`, mise à jour des 6 sections éditoriales de la Vitrine, mise à jour de `GATES.md`, traçabilité `plan.md`)
- **Périmètre** : `src/components/navigation/VitrineHeader.tsx`, `src/components/sections/vitrine/hero/HeroCurtainStage.tsx`, `src/app/globals.css`, les 6 sections sous `src/components/sections/vitrine/{vision-mission,pastoral-team,audio-extracts,events,location-hours,donations}/`, `GATES.md`.

#### 1. Problème Réel & Contrainte Principale
La référence visuelle impose que les six sections suivant le Hero conservent leurs bandeaux supérieurs numérotés (`01` à `06` + titre + accroche + filet horizontal franc) empilés successivement en lames sous le `VitrineHeader` fixe (`pinTop = headerOffset + (i - 1) * stripStep`), tandis que le Hero plein écran est intégralement recouvert. Deux contraintes géométriques conditionnent la fiabilité multi-écrans :
1. Sur les sections dont le contenu excède la hauteur disponible sous la pile (`vh - pinTop`), le panneau doit défiler jusqu'à son bord inférieur tout en gardant son propre bandeau supérieur collé à `--panel-pin-top` sans être tronqué ni masqué par un ancêtre `overflow: hidden` ou `transform`.
2. `VitrineHeader` doit exposer une hauteur mesurable constante dès `scrollY = 0` pour que `headerOffset` et `scrollMarginTop` restent exacts lors d'un clic vers `#vision`..`#dons` avant défilement.

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Conserver `scale(0.965)`, `border-radius: 24px`, `overflow: hidden` et le scrim sombre sur toutes les cartes, en se limitant à décaler le `top` du panneau parent.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : La mise à l'échelle rétrécirait horizontalement chaque lame empilée et désalignerait les colonnes `01..06` ; `overflow: hidden` et `transform` briseraient le `position: sticky` interne sur les sections plus hautes que le viewport ; le scrim assombrirait les bandeaux restés visibles et les rendrait `inert` ou cachés par `data-covered`.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Exporter `VitrineSectionHeader` depuis `HeroCurtainStage.tsx` afin de centraliser la grammaire visuelle des lames (`01`..`06`, grille 12 colonnes, tag `[ ... ]`), ancrer chaque panneau `i >= 1` via `--panel-pin-top: ${pinTop}px` et `scrollMarginTop: ${pinTop}px`, doter `.vitrine-stack-header` d'un `position: sticky; top: var(--panel-pin-top, 0px)` sans `transform` ni `overflow: hidden` sur `.hero-stack-card`, et réserver `scale`/scrim/`data-covered` au seul Hero (`index === 0`) tout en rendant uniquement `.vitrine-stack-body` inerte lorsqu'une lame est recouverte.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : [VitrineHeader.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/navigation/VitrineHeader.tsx) stabilisé (`py-3.5` permanent pour `offsetHeight` invariante) ; [HeroCurtainStage.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/hero/HeroCurtainStage.tsx) enrichi de `VitrineSectionHeader` (`01` à `06`, grille 12 colonnes, thèmes `paper`/`white`/`ink`, sous-bandeau `[ tag ]`, navigation au clic/clavier) et d'un calcul progressif `pinTop = headerOffset + (i - 1) * stripStep` avec `--panel-pin-top`, `scrollMarginTop` sur sentinelles, progression calibrée sur `vh - targetTop`, inertie ciblée sur `.vitrine-stack-body` et scrim/retrait réservés au Hero (`index === 0`) ; [globals.css](file:///home/fabien/Documents/Projets/Pro/charis_web/src/app/globals.css) mis à jour (`.vitrine-stack-header` sticky, `.vitrine-stack-body`, `.hero-stack-card > .hero-curtain-media` sans `transform` ni `overflow: hidden`, repli `prefers-reduced-motion`) ; six sections Vitrine (`VisionMissionSection`, `PastoralTeamSection`, `AudioExtractsSection`, `EventsSection`, `LocationHoursSection`, `DonationsSection`) migrées vers `VitrineSectionHeader` et `.vitrine-stack-body` sans perte de contenu interne ; gate `VITRINE-STACK-01` étendue dans [GATES.md](file:///home/fabien/Documents/Projets/Pro/charis_web/GATES.md). Validation statique exécutée sans toucher à `.next/dev/lock` : `npx tsc --noEmit` (code 0), `npm run lint` (code 0), `VITRINE_STACK_ACTIF` validé et orthogonalité `src/components/sections/` confirmée.
- **Leçon retenue** : Maintenir `position: sticky` sur `.vitrine-stack-header` au sein de sections parfois plus hautes que le viewport exige de proscrire à la fois `transform` et `overflow: hidden` sur toute la chaîne d'ancêtres de la carte (`.hero-stack-card > .hero-curtain-media` en `overflow: visible`, `<section>` en `overflow-x-clip`) tout en garantissant `width: 100%` sur `.vitrine-stack-body > .max-w-7xl`.

---

### [2026-11-23] Consolidation de la Vitrine en 4 Piliers Clairs & Correctif d'Empilement Strict (`VITRINE-CONSOLIDATION-03`)

- **Complexité** : Complexe (Niveau 4 — refonte mécanique de `HeroCurtainStage.tsx` avec `.vitrine-stack-viewport` et `.hero-stack-runway`, refonte CSS `globals.css`, consolidation des 6 sections en 4 piliers `ChurchSection`, `AudioExtractsSection`, `VisitSection`, `DonationsSection`, mise à jour de `page.tsx`, `VitrineHeader.tsx`, `VitrineFooter.tsx`, purge des 4 anciens sous-dossiers, synchronisation `AGENTS.md` / `GATES.md`)
- **Périmètre** : `HeroCurtainStage.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `VitrineHeader.tsx`, `VitrineFooter.tsx`, `src/components/sections/vitrine/{church,audio-extracts,visit,donations}/`, `AGENTS.md`, `GATES.md`.

#### 1. Problème Réel & Contrainte Principale
L'empilement de six sections autonomes combiné aux paragraphes descriptifs en face des titres produisait deux défauts majeurs observés sur rendu réel :
1. Un éparpillement éditorial et vertical saturant la moitié supérieure de l'écran en bandeaux empilés, aggravé par la rupture de contraste de la lame sombre `03` et le passage à deux lignes de titres comme `SOUTENIR LA MISSION`.
2. Un défaut géométrique de `stickyTop` négatif (`vh - panel.offsetHeight`) dès qu'une section dépassait la hauteur restante (`LocationHoursSection` `05`) : le panneau remontait au-dessus de sa propre position d'ancrage, écrasant et masquant entièrement la lame `04` en dessous.

#### 2. Alternatives Techniques Examinées et Rejetées
- **Piste A** : Extraire l'équipe pastorale ou les dons vers des pages secondaires (`/eglise`, `/donner`).
  - **Statut** : *(Déconseillé)* — Rompt la continuité One-Page de la vitrine et les liens directs depuis le Hero (`#dons`).
- **Piste B** : Conserver les 6 sections en introduisant une fenêtre glissante limitant le nombre de lames visibles.
  - **Statut** : *(Déconseillé)* — Palliatif purement mécanique qui laisserait intacte la fragmentation entre *Cultes* et *Localisation* ou entre *Vision* et *Équipe*.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Regrouper la vitrine en 4 piliers éditoriaux clairs alternant `#f2f2f2` (`paper`) et `#ffffff` (`white`) — `01 L’ÉGLISE` (`ChurchSection` avec onglets *Vision & Valeurs* / *Équipe Pastorale*), `02 ENSEIGNEMENTS` (`AudioExtractsSection`), `03 NOUS REJOINDRE` (`VisitSection` avec onglets *Cultes & Horaires* / *Plan & Accès*) et `04 SOUTENIR` (`DonationsSection`) — en retirant toute description face aux titres et en verrouillant chaque carte `i >= 1` exactement à `top: pinTop` avec hauteur bornée `availableHeight = vh - pinTop`, fenêtre clippée `.vitrine-stack-viewport`, piste `.hero-stack-runway` calculée sur `body.scrollHeight - viewportHeight` et translation `translate3d` pilotée par `rAF`.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : [HeroCurtainStage.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/hero/HeroCurtainStage.tsx) simplifie `VitrineSectionHeader` aux seuls numéros/titres (`paper`/`white`, sans description latérale) et verrouille strictement `top: pinTop` via `.vitrine-stack-viewport` + `.hero-stack-runway` + `ResizeObserver` sur `.vitrine-stack-body` ; [globals.css](file:///home/fabien/Documents/Projets/Pro/charis_web/src/app/globals.css) isole les cartes `.hero-stack-card` avec repli `prefers-reduced-motion` complet ; quatre piliers clairs opérationnels ([ChurchSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/church/ChurchSection.tsx) `01`, [AudioExtractsSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/audio-extracts/AudioExtractsSection.tsx) `02`, [VisitSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/visit/VisitSection.tsx) `03`, [DonationsSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/donations/DonationsSection.tsx) `04`) branchés dans [page.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/app/page.tsx), [VitrineHeader.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/navigation/VitrineHeader.tsx) et [VitrineFooter.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/layout/VitrineFooter.tsx) ; quatre anciens dossiers purgés et documentation synchronisée ([AGENTS.md](file:///home/fabien/Documents/Projets/Pro/charis_web/AGENTS.md), [GATES.md](file:///home/fabien/Documents/Projets/Pro/charis_web/GATES.md)). Validation statique exécutée sans altérer `.next/dev/lock` : `npx tsc --noEmit` (code 0), `npm run lint` (code 0), `VITRINE_STACK_ACTIF`, `COMPONENTS_ORTHOGONAUX`, `AUCUNE_DIVERGENCE_PALETTE`, `AUCUN_CONSOLE_LOG` et `IMPORTS_ALIAS_UNIFIES` tous validés.
- **Leçon retenue** : Dissocier la position d'ancrage du panneau (`top: pinTop` immuable) du défilement interne de son contenu (`.vitrine-stack-viewport` + piste `.hero-stack-runway` proportionnelle à `scrollHeight - viewportHeight`) garantit que même une section dépassant la hauteur restante de l'écran n'envahit jamais la lame précédente.

---

### [2026-11-24] Empilement Horizontal en Lames après la Section 01 (`VITRINE-HSTACK-04`)

- **Complexité** : Complexe (Niveau 4 — refonte hybride vertical/horizontal dans `HeroCurtainStage.tsx`, architecture CSS dual-mode dans `src/app/globals.css`, ajustement des grilles responsives dans `AudioExtractsSection.tsx`, `VisitSection.tsx`, `DonationsSection.tsx`, ajout d'oracle dans `GATES.md`, suivi `plan.md` et vérification navigateur)
- **Périmètre** : `src/components/sections/vitrine/hero/HeroCurtainStage.tsx`, `src/app/globals.css`, `src/components/sections/vitrine/{audio-extracts,visit,donations}/`, `GATES.md`, `.agents/memory/frontend_public.md`.

#### 1. Problème Réel & Contrainte Principale
Après le recouvrement vertical du Hero par la section `01 — L’Église` (`ChurchSection`), les piliers suivants (`02 — Enseignements`, `03 — Nous Rejoindre`, `04 — Soutenir`) doivent s'empiler à l'horizontal depuis la droite sur tablette et desktop (`>= 768px`), en pivotant leurs bandeaux numérotés en tranches verticales latérales gauches cliquables tout en préservant l'empilement vertical actuel sur mobile (`< 768px`) et l'accessibilité sous `prefers-reduced-motion: reduce`. Quatre contraintes techniques critiques doivent être maîtrisées simultanément : éviter tout mouvement diagonal parasite avant l'ancrage sous `VitrineHeader`, garantir zéro démontage React et zéro mismatch d'hydratation SSR entre `< 768px` et `>= 768px`, absorber les contenus internes plus hauts que le viewport disponible sans briser la pile, et conserver le fonctionnement exact de toutes les ancres (`#eglise`, `#enseignements`, `#rejoindre`, `#dons`).

#### 2. Alternative Technique Examinée et Rejetée
- **Piste examinée** : Dupliquer l'arbre React selon la largeur d'écran (`isDesktop ? <HorizontalDeck /> : <VerticalDeck />`) ou animer directement `left`/`width` sur des panneaux sticky verticaux individuels.
- **Statut** : *(Déconseillé)*
- **Motif dialectique du rejet** : Un branchement conditionnel React crée un mismatch d'hydratation SSR et réinitialise l'état local des onglets (`ChurchSection`, `VisitSection`) lors d'un redimensionnement autour de `768px`. Par ailleurs, animer `left`/`width` ou combiner une translation horizontale à un flux sticky vertical individuel déclenche des reflows à chaque frame et produit une trajectoire diagonale non maîtrisée tant que la section n'a pas atteint `headerOffset`.

#### 3. Solution Retenue & Justification
- **Piste retenue** : *(Recommandé)* Encapsuler la scène hybride dans le module profond `HeroCurtainStage.tsx` autour d'un arbre DOM unique (`.vitrine-deck-track > .vitrine-deck-stage`), transparent via `display: contents` sur `< 768px` (préservant intact l'empilement vertical mobile) et transformé sur `>= 768px` en scène `position: sticky` verrouillée à `top: headerOffset` alimentée par une piste verticale calculée (`deckHeight + cursor`), où chaque pilier `i >= 1` occupe `left: k * spineWidth` et `width: calc(100% - k * spineWidth)`, glisse en GPU pur (`translate3d(100%, 0, 0)` → `translate3d(0, 0, 0)`), pivote `VitrineSectionHeader` en tranche verticale cliquable à gauche et isole son défilement interne dans `.vitrine-stack-viewport`.

#### 4. Clôture à Chaud Post-Implémentation
- **Résultat observable** : Tokens `--vitrine-spine-w` (`0px` mobile, `52px` `md`, `62px` `lg`, `72px` `xl`), classes `.vitrine-deck-track` / `.vitrine-deck-stage` (`display: contents` sous `768px`, scène sticky horizontale dès `768px`), tranches verticales `.vitrine-stack-header__*` et `.hero-stack-body-scrim` implémentés dans [globals.css](file:///home/fabien/Documents/Projets/Pro/charis_web/src/app/globals.css) ; machine à états `'reduced' | 'vertical' | 'horizontal'` et navigation d'ancres unifiée implémentées dans [HeroCurtainStage.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/hero/HeroCurtainStage.tsx) ; grilles responsives ajustées dans [AudioExtractsSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/audio-extracts/AudioExtractsSection.tsx), [VisitSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/visit/VisitSection.tsx) et [DonationsSection.tsx](file:///home/fabien/Documents/Projets/Pro/charis_web/src/components/sections/vitrine/donations/DonationsSection.tsx) ; gate `VITRINE-HSTACK-04` ajoutée dans [GATES.md](file:///home/fabien/Documents/Projets/Pro/charis_web/GATES.md). Validation : `npx tsc --noEmit` (code 0), `npm run lint` (code 0), `npm run build` (`Compiled successfully in 13.4s`, 12/12 routes) et `node scripts/verify-gates.mjs`. L'inspection visuelle automatisée via `chrome-devtools-mcp` n'a pas pu s'exécuter (`/home/fabien/.config/google-chrome/DevToolsActivePort` absent).
- **Leçon retenue** : Encapsuler les piliers dans `.vitrine-deck-track > .vitrine-deck-stage` en `display: contents` sur `< 768px` puis en scène `position: sticky` sur `>= 768px` permet de basculer d'un empilement vertical à un empilement horizontal en tranches latérales sans démontage React ni mismatch d'hydratation.
