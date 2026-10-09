# Plan Séquentiel d'Exécution (`plan.md`)

Ce document consigne l'ordonnancement linéaire des tâches complexes ou fastidieuses (Niveau 4 et 5 selon [10-taches-fastidieuses.md](rules/10-taches-fastidieuses.md)). Il sert de registre d'avancement déterministe pour prévenir la fatigue de contexte et les omissions mécaniques.

---

## 🚦 Règles d'Usage

1. **Inscription préalable obligatoire** : Toute tâche modifiant plus de 2 fichiers ou comportant plus de 5 étapes séquentielles doit être détaillée ici avant d'entamer l'écriture du code.
2. **Progression atomique** : Chaque sous-tâche est cochée `- [x]` immédiatement après sa réalisation et sa vérification par `npx tsc --noEmit`.
3. **Clôture formelle** : Une section ne peut être archivée que si l'intégralité des oracles associés dans [`GATES.md`](../GATES.md) renvoient un succès.

---

## 📌 Tâche Active : Déploiement du Socle Agentique Autonome

- **Identifiant** : `SETUP-AGENT-01`
- **Statut** : En cours de finalisation
- **Référence Gates** : Section « Socle et Infrastructure Agentique » dans `GATES.md`

### Étapes Séquentielles :
- [x] **Étape 1** : Cartographie technique de la stack (`package.json`, App Router, Supabase, Tailwind v4 vs CSS HSL, Zustand/AudioContext).
- [x] **Étape 2** : Conception et écriture du script d'oracle automatisé `scripts/verify-gates.mjs`.
- [x] **Étape 3** : Écriture des règles permanentes modulaires :
  - [x] `01-engineering-standards.md` (Ousterhout, modularité profonde, YAGNI, anti-slop)
  - [x] `02-conventions-stack.md` (Next.js 16, React 19, Supabase RLS, AudioContext, CSS isolation)
  - [x] `08-skills-activation.md` (Matrice déterministe de déclenchement)
  - [x] `10-taches-fastidieuses.md` (Échelle de gradation de complexité)
  - [x] `11-memoire-et-apprentissage.md` (Protocole Knowledge Items & escalade)
- [x] **Étape 4** : Mise en place du registre de mémoire :
  - [x] `.agents/knowledge/README.md`
  - [x] `.agents/knowledge/INDEX.md`
- [x] **Étape 5** : Initialisation du journal dialectique d'arbitrage `.agents/WRITING_IMPROVEMENT.md`.
- [x] **Étape 6** : Rédaction du `README.md` canonique pour l'équipe locale `charis-team` (`.agents/plugins/charis-team/README.md`).
- [x] **Étape 7** : Consolidation et rédaction du grand livre de vérification déterministe `GATES.md` à la racine.
- [x] **Étape 8** : Mise à jour et alignement de la constitution `AGENTS.md` à la racine (gouvernance, 5 invariants, Ousterhout, passerelles d'équipe).
- [x] **Étape 9** : Exécution de l'oracle `node scripts/verify-gates.mjs` et validation globale du build (`tsc --noEmit`, `npm run build`, `npm run lint`).

---

## 🏁 Bilan de Clôture : Tâche SETUP-AGENT-01 Validée (11/11 Gates au vert)
- Typage TypeScript : Code 0 (Zéro erreur)
- Build Next.js 16 : Code 0 (12/12 routes statiques et dynamiques compilées)
- Audit ESLint : Code 0 (Zéro erreur, zéro warning)
- Oracle déterministe `verify-gates.mjs` : Validé avec succès.
