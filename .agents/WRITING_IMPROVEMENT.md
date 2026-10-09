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
