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
