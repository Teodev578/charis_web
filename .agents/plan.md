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

---

## 📌 Tâche Active : Préparation du Terrain Design System & Socle Cinétique (`PREP-DESIGN-SYSTEM-01`)

- **Identifiant** : `PREP-DESIGN-SYSTEM-01`
- **Statut** : Validé et clôturé
- **Contrainte stricte** : Zéro changement visuel immédiat sur les pages rendues ; zéro modification de `package.json`.
- **Référence Gates** : Section « Socle Design System & Physique du Mouvement » dans `GATES.md`.

### Étapes Séquentielles :
- [x] **Étape 1** : Rédaction de l'arbitrage initial dans `.agents/WRITING_IMPROVEMENT.md` et inscription du plan dans `.agents/plan.md`.
- [x] **Étape 2** : Création de `DESIGN.md` à la racine et du sidecar `.impeccable/design.json` (spécification officielle `DESIGN.md` + grammaire éditoriale et cinétique).
- [x] **Étape 3** : Harmonisation de `.agents/rules/ui_motion.md` avec les courbes et hooks réels du socle.
- [x] **Étape 4** : Ajout des tokens cinétiques, échelle typographique opt-in, primitives GPU-only, View Transitions et garde-fou global `prefers-reduced-motion` dans `src/app/globals.css`.
- [x] **Étape 5** : Implémentation de `src/hooks/useReveal.ts`, `src/hooks/useScrollProgress.ts` et `src/hooks/index.ts`.
- [x] **Étape 6** : Ajout des oracles dans `GATES.md`, exécution de `npx tsc --noEmit`, `npm run lint`, `npm run build`, `node scripts/verify-gates.mjs` et clôture dans `WRITING_IMPROVEMENT.md`.

---

## 📌 Tâche Active : Unification Chromatique Globale sur la Base du Hero (`COLOR-COHERENCE-01`)

- **Identifiant** : `COLOR-COHERENCE-01`
- **Statut** : Validé et clôturé
- **Contrainte absolue** : Ne jamais modifier `HeroSection.tsx`, `HeroGrainSurface.tsx`, `src/hooks/*`, ni `package.json`.
- **Référence Gates** : Section « Cohérence Chromatique Base Hero » dans `GATES.md`.

### Étapes Séquentielles :
- [x] **Étape 1** : Audit exhaustif des couleurs du Hero et des divergences dans la Vitrine et l'Espace Écoute ; inscription de l'arbitrage dans `WRITING_IMPROVEMENT.md`.
- [x] **Étape 2** : Consolidation des tokens lumière/sombre, accents `#6C288B` / `#fc7d42` et alias `@theme` dans `src/app/globals.css` (et `src/app/dashboard/dashboard.css`).
- [x] **Étape 3** : Harmonisation de `src/app/page.tsx`, `VitrineHeader.tsx`, `VitrineFooter.tsx` et des 6 sections Vitrine hors Hero (`VisionMissionSection`, `PastoralTeamSection`, `AudioExtractsSection`, `EventsSection`, `LocationHoursSection`, `DonationsSection`).
- [x] **Étape 4** : Harmonisation de l'Espace Écoute et des composants communs (`NavigationSidebar`, `NavigationDrawer`, `StickyAudioPlayer`, `RightPanel`, `TrackCard`, `Announcements`, `AnnouncementCard`, `ecouter/page.tsx`, `explorer/page.tsx`, `message/[id]/page.tsx`, `ui/Header.tsx`).
- [x] **Étape 5** : Mise à jour de `DESIGN.md`, `.impeccable/design.json` et des règles `.agents/rules/aesthetic_standards.md` / `ui_forbidden.md`.
- [x] **Étape 6** : Ajout des gates chromatiques dans `GATES.md` et validation complète (`tsc --noEmit`, `lint`, `impeccable detect`, `npm run build`, `verify-gates.mjs`).

---

## 📌 Tâche Active : Alignement Typographique des En-Têtes Vitrine (`HEADER-TYPO-01`)

- **Identifiant** : `HEADER-TYPO-01`
- **Statut** : Validé et clôturé
- **Contrainte absolue** : Préserver les animations, l'anneau Hero, le grain et les couleurs du Hero ; zéro modification de `package.json`.
- **Référence Gates** : Section « Typographie des En-Têtes Vitrine » dans `GATES.md`.

### Étapes Séquentielles :
- [x] **Étape 1** : Diagnostic de la collision `--font-jakarta` (`layout.tsx` vs `globals.css`), validation de la direction avec l'utilisateur et inscription de l'arbitrage dans `WRITING_IMPROVEMENT.md`.
- [x] **Étape 2** : Correction de la variable `--font-jakarta-sans` dans `src/app/layout.tsx` et ajout des rôles `.vitrine-wordmark`, `.vitrine-nav-link`, `.vitrine-nav-cta` dans `src/app/globals.css`.
- [x] **Étape 3** : Application unifiée sur le `<header>` de `HeroSection.tsx` (sans altérer ses couleurs ni animations) et sur `VitrineHeader.tsx`.
- [x] **Étape 4** : Mise à jour de la rampe typographique (`wordmark`, `nav`) dans `DESIGN.md` et `.impeccable/design.json`.
- [x] **Étape 5** : Ajout des oracles typographiques dans `GATES.md`, exécution de `npx tsc --noEmit`, `npm run lint`, `impeccable detect --scope type`, `node scripts/verify-gates.mjs` et clôture.

---

## 📌 Tâche Active : Rationalisation Architecturale Idiomatique Next.js 16 (`ARCH-CLEANUP-01`)

- **Identifiant** : `ARCH-CLEANUP-01`
- **Statut** : Validé et clôturé
- **Contrainte absolue** : Préserver `src/app/`, `src/contexts/`, `src/hooks/`, `src/store/`, `src/lib/supabase/`, `HeroSection.tsx`, `HeroGrainSurface.tsx` et `package.json`.
- **Référence Gates** : Section « Gates d'Architecture & Intégrité des Types » dans `GATES.md`.

### Étapes Séquentielles :
- [x] **Étape 1** : Gouvernance préalable : inscription dans `.agents/WRITING_IMPROVEMENT.md` et `.agents/plan.md`.
- [x] **Étape 2** : Création du socle d'utilitaires purs `src/lib/utils/` (`format.ts`, `slug.ts`, `index.ts`).
- [x] **Étape 3** : Purge des reliquats Vite (`src/assets/`) et des 4 composants orphelins (`MessageItem.tsx`, `ui/Header.tsx`, `navigation/Navigation.tsx`, `navigation/NavigationDrawer.tsx`).
- [x] **Étape 4** : Factorisation des helpers dupliqués (`formatTime`, `formatDateFr`, `slugify`) et normalisation de tous les imports inter-dossiers vers `@/*`.
- [x] **Étape 5** : Synchronisation de `AGENTS.md` (carte `src/`) et `GATES.md` (chemin `AudioPlayer.tsx` + 3 nouvelles gates architecturales).
- [x] **Étape 6** : Vérification déterministe (`npx tsc --noEmit`, `npm run lint`, `npm run build`, `node scripts/verify-gates.mjs`) et clôture.

---

## 📌 Tâche Active : Prefactoring d'Orthogonalité de `src/components/` et Assainissement de la Racine (`ARCH-PREFACTOR-02`)

- **Identifiant** : `ARCH-PREFACTOR-02`
- **Statut** : Validé et clôturé
- **Contrainte absolue** : Ne modifier aucune ligne dans `HeroSection.tsx` ni `HeroGrainSurface.tsx` lors de leur déplacement vers `src/components/sections/hero/` ; zéro modification de `package.json`.
- **Référence Gates** : Gate « Orthogonalité de src/components et Propreté des Racines » dans `GATES.md`.

### Étapes Séquentielles :
- [x] **Étape 1** : Gouvernance préalable dans `.agents/WRITING_IMPROVEMENT.md` et `.agents/plan.md`.
- [x] **Étape 2** : Réorganisation orthogonale de `src/components/` (`layout/`, `navigation/`, `sections/{hero,vitrine,ecouter}/`), suppression de `src/components/vitrine/` et `update_header.py`, déplacement de `architecture.md` vers `docs/architecture.md`.
- [x] **Étape 3** : Mise à jour des imports `@/components/...` dans les 5 fichiers consommateurs (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/ecouter/page.tsx`, `src/app/explorer/page.tsx`, `src/components/sections/ecouter/Announcements.tsx`).
- [x] **Étape 4** : Synchronisation de `AGENTS.md` (carte `src/`) et `GATES.md` (chemin mis à jour + nouvelle gate d'orthogonalité).
- [x] **Étape 5** : Vérification déterministe (`npx tsc --noEmit`, `npm run lint`, `node scripts/verify-gates.mjs`) après la dernière édition et clôture.
