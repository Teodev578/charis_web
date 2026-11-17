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
