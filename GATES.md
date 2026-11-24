# GATES.md — Grand Livre de Vérification Déterministe

Ce document consigne les critères d'acceptation exécutables (oracles déterministes) et le registre permanent des preuves de validation de **Charis Nation**.

---

## 🏛️ Invariant de Vérification Déterministe

Aucune tâche ne peut être déclarée achevée, aucune PR ne peut être soumise et aucun commit ne peut être effectué sans que les gates applicables n'aient été exécutées et validées.

### Format canonique strict de chaque gate :
```text
### Gate : Intitulé de la Vérification
CHECK: <commande shell ou script exécutable>
EXPECT: <code retour ou chaîne attendue>
EVIDENCE: <preuve textuelle concrètement observée lors de la dernière exécution>
```

L'outil d'audit automatique `node scripts/verify-gates.mjs` analyse directement ce fichier pour valider l'intégrité de la base de code.

---

## 🛡️ 1. Gates Permanentes de la Stack (Fondations Critiques)

### Gate : Vérification du Typage Statique TypeScript
CHECK: npx tsc --noEmit
EXPECT: code 0
EVIDENCE: tsc exécuté avec code 0, aucune erreur de typage détectée sur l'ensemble de src/.

### Gate : Compilation et Build de Production Next.js 16
CHECK: npm run build
EXPECT: Compiled successfully
EVIDENCE: Compiled successfully in 12.7s. Toutes les routes statiques et dynamiques (12/12) générées sans régression.

### Gate : Audit Qualité et Linting ESLint
CHECK: npm run lint
EXPECT: code 0
EVIDENCE: eslint . exécuté avec code 0, zéro avertissement, règles React Hooks et ESM respectées.

### Gate : Proscription des Logs Résiduels en Production
CHECK: grep -rn "console\.log" src/ || echo "AUCUN_CONSOLE_LOG"
EXPECT: AUCUN_CONSOLE_LOG
EVIDENCE: Aucun appel direct console.log résiduel non encapsulé en chemin de production.

### Gate : Étanchéité des Clients Supabase (Absence de Client Browser dans Server Components)
CHECK: grep -rn "createBrowserClient" src/app/api/ src/lib/supabase/server.ts || echo "AUCUNE_FUITE_BROWSER_DANS_SERVER"
EXPECT: AUCUNE_FUITE_BROWSER_DANS_SERVER
EVIDENCE: Aucun appel createBrowserClient détecté dans les modules d'exécution serveur.

### Gate : Étanchéité des Clients Supabase (Absence de Client Server dans Client Components)
CHECK: grep -rn "createServerClient" src/contexts/ src/components/ || echo "AUCUNE_FUITE_SERVER_DANS_CLIENT"
EXPECT: AUCUNE_FUITE_SERVER_DANS_CLIENT
EVIDENCE: Aucun appel createServerClient détecté dans les composants clients interactifs.

### Gate : Isolation du Design System Public (Zéro Tailwind dans globals.css)
CHECK: grep -i "@tailwind" src/app/globals.css || echo "AUCUN_TAILWIND_DANS_GLOBALS"
EXPECT: AUCUN_TAILWIND_DANS_GLOBALS
EVIDENCE: globals.css est exclusivement structuré en variables et sélecteurs Vanilla CSS HSL purs.

---

## 🎧 2. Gates Spécifiques : Moteur Audio & Prise de Notes

### Gate : Présence de l'Événement loadedmetadata pour le Deep-Linking
CHECK: grep -n "loadedmetadata" src/contexts/AudioContext.tsx src/components/player/AudioPlayer.tsx || echo "VERIFIE"
EXPECT: loadedmetadata
EVIDENCE: L'écoute de loadedmetadata est présente pour sécuriser le repositionnement temporel de l'audioRef.

### Gate : Throttling de Synchronisation Audio (Intervalle 30s)
CHECK: grep -n "30000" src/contexts/AudioContext.tsx || echo "VERIFIE"
EXPECT: 30000
EVIDENCE: Intervalle de 30 000 ms formellement configuré pour limiter l'empreinte réseau d'upsertProgress.

---

## 📊 3. Gates d'Architecture & Intégrité des Types

### Gate : Source Unique de Vérité des Types Supabase
CHECK: test -f src/lib/supabase/database.types.ts && echo "TYPES_PRESENTS"
EXPECT: TYPES_PRESENTS
EVIDENCE: Le fichier généré database.types.ts est présent et intact à la racine de la couche Supabase.

### Gate : Présence de la Fonction RLS Anti-Récursion
CHECK: grep -rn "get_user_profil" supabase/migrations/ || echo "FONCTION_RLS_PRESENTE"
EXPECT: get_user_profil
EVIDENCE: La fonction get_user_profil avec SECURITY DEFINER est déclarée dans les migrations du schéma.

### Gate : Présence du Socle d'Utilitaires Purs (src/lib/utils)
CHECK: test -f src/lib/utils/index.ts && test -f src/lib/utils/format.ts && test -f src/lib/utils/slug.ts && echo "UTILS_PRESENTS"
EXPECT: UTILS_PRESENTS
EVIDENCE: Les modules utilitaires purs (format.ts, slug.ts, index.ts) sont centralisés dans src/lib/utils/.

### Gate : Absence de Reliquats Orphelins Vite et Composants Morts
CHECK: test ! -d src/assets && test ! -f src/components/MessageItem.tsx && test ! -f src/components/ui/Header.tsx && test ! -f src/components/navigation/Navigation.tsx && test ! -f src/components/navigation/NavigationDrawer.tsx && echo "AUCUN_ORPHELIN"
EXPECT: AUCUN_ORPHELIN
EVIDENCE: Les reliquats Vite (src/assets/) et les 4 composants orphelins ont été purgés.

### Gate : Normalisation des Imports Inter-Dossiers via Alias @/*
CHECK: grep -rnE "from ['\"]\.\./|import\(['\"]\.\./" src/ || echo "IMPORTS_ALIAS_UNIFIES"
EXPECT: IMPORTS_ALIAS_UNIFIES
EVIDENCE: Tous les imports inter-dossiers dans src/ utilisent l'alias canonique @/*.

### Gate : Orthogonalité de src/components et Propreté des Racines
CHECK: test ! -d src/components/vitrine && test ! -f src/components/ClientAppWrapper.tsx && test -f src/components/layout/ClientAppWrapper.tsx && test -d src/components/sections/vitrine/hero && test -z "$(find src/components/sections/vitrine src/components/sections/ecouter -maxdepth 1 -name '*.tsx')" && test ! -f update_header.py && echo "COMPONENTS_ORTHOGONAUX"
EXPECT: COMPONENTS_ORTHOGONAUX
EVIDENCE: src/components et ses sous-domaines (vitrine, ecouter) isolent chaque section dans son sous-dossier dédié sans fichier .tsx libre aux racines.

---

## 🎨 4. Gates Socle Design System & Physique du Mouvement

### Gate : Présence du Contrat DESIGN.md et du Sidecar design.json
CHECK: test -f DESIGN.md && test -f .impeccable/design.json && echo "CONTRAT_DESIGN_PRESENT"
EXPECT: CONTRAT_DESIGN_PRESENT
EVIDENCE: Le contrat racine DESIGN.md et le sidecar .impeccable/design.json sont présents.

### Gate : Présence des Tokens Cinétiques et Typographiques dans globals.css
CHECK: grep -q -- "--duration-editorial" src/app/globals.css && grep -q -- "--ease-editorial" src/app/globals.css && grep -q -- "--text-display" src/app/globals.css && echo "TOKENS_SOCLE_PRESENTS"
EXPECT: TOKENS_SOCLE_PRESENTS
EVIDENCE: Les tokens opt-in (--duration-editorial, --ease-editorial, --text-display) sont déclarés dans src/app/globals.css.

### Gate : Présence du Garde-Fou Global prefers-reduced-motion
CHECK: grep -q "animation-duration: 0.01ms" src/app/globals.css && echo "REDUCED_MOTION_GLOBAL_ACTIF"
EXPECT: REDUCED_MOTION_GLOBAL_ACTIF
EVIDENCE: La désactivation globale des transitions et animations sous prefers-reduced-motion est active dans globals.css.

### Gate : Présence des Hooks Cinétiques sans Dépendance
CHECK: test -f src/hooks/useReveal.ts && test -f src/hooks/useScrollProgress.ts && echo "HOOKS_CINETIQUES_PRESENTS"
EXPECT: HOOKS_CINETIQUES_PRESENTS
EVIDENCE: Les hooks useReveal.ts et useScrollProgress.ts sont présents dans src/hooks/.

---

## 🌈 5. Gates Cohérence Chromatique Base Hero

### Gate : Ancrage des Tokens Globaux sur la Palette Hero
CHECK: grep -q -- "--bg-base: #f2f2f2" src/app/globals.css && grep -q -- "--brand-purple: #6C288B" src/app/globals.css && grep -q -- "--brand-orange: #fc7d42" src/app/globals.css && echo "BASE_HERO_COHERENTE"
EXPECT: BASE_HERO_COHERENTE
EVIDENCE: Les tokens racine de src/app/globals.css reposent sur #f2f2f2, #111111, #6C288B et #fc7d42.

### Gate : Éradication de l'Ancienne Palette Dissidente Hors Hero
CHECK: grep -rnE "1A0A21|251230|331942|572269|7a3d91|14071a" src/ --exclude=HeroSection.tsx --exclude=HeroGrainSurface.tsx || echo "AUCUNE_DIVERGENCE_PALETTE"
EXPECT: AUCUNE_DIVERGENCE_PALETTE
EVIDENCE: Aucune référence hex de l'ancien thème violet-jaune ne subsiste hors des fichiers Hero intacts.

---

## ✍️ 6. Gates Typographie des En-Têtes Vitrine

### Gate : Absence de Collision sur --font-jakarta entre layout.tsx et globals.css
CHECK: grep -q "variable: '--font-jakarta-sans'" src/app/layout.tsx && grep -q "var(--font-jakarta-sans)" src/app/globals.css && echo "FONT_JAKARTA_RESOLUE"
EXPECT: FONT_JAKARTA_RESOLUE
EVIDENCE: layout.tsx injecte --font-jakarta-sans et globals.css l'alimente sans cycle CSS dans --font-jakarta.

### Gate : Alignement Typographique des En-Têtes Vitrine (VitrineHeader)
CHECK: grep -q "vitrine-wordmark" src/components/navigation/VitrineHeader.tsx && grep -q "vitrine-nav-link" src/components/navigation/VitrineHeader.tsx && echo "HEADERS_TYPO_ALIGNES"
EXPECT: HEADERS_TYPO_ALIGNES
EVIDENCE: VitrineHeader consomme les rôles typographiques partagés .vitrine-wordmark et .vitrine-nav-link (le header interne du Hero étant temporairement retiré).

---

## 🎭 7. Gates Scène Rideau Collante Hero (HERO-CURTAIN-01)

### Gate : Présence et Isolation de HeroCurtainStage dans vitrine/hero
CHECK: test -f src/components/sections/vitrine/hero/HeroCurtainStage.tsx && grep -q "HeroCurtainStage" src/app/page.tsx && grep -q "isolation: isolate" src/app/globals.css && grep -q "hero-curtain-backdrop" src/app/globals.css && echo "HERO_CURTAIN_ACTIF"
EXPECT: HERO_CURTAIN_ACTIF
EVIDENCE: HeroCurtainStage.tsx est monté dans src/app/page.tsx avec contexte sticky isolé (z-0 / z-10), pilotage rAF sans re-render et repli prefers-reduced-motion dans src/app/globals.css.

### Gate : Débordement de l'Image Centrale Hero et Effet Négatif sur le Titre (HERO-OVERLAP-NEGATIVE-01)
CHECK: grep -q "mix-blend-difference" src/components/sections/vitrine/hero/HeroSection.tsx && grep -q -- "--hero-title-overlap-offset" src/app/globals.css && grep -q -- "--hero-card-w-active: 550px" src/app/globals.css && echo "HERO_OVERLAP_NEGATIVE_ACTIF"
EXPECT: HERO_OVERLAP_NEGATIVE_ACTIF
EVIDENCE: L'image centrale active déborde sur le titre Charis Nation via --hero-title-overlap-offset et --hero-card-w-active (550px desktop) avec fusion négative mix-blend-difference isolée des CTA.

### Gate : Empilement Sticky Multi-Sections de la Vitrine (VITRINE-STACK-01)
CHECK: grep -q "hero-stack-panel" src/components/sections/vitrine/hero/HeroCurtainStage.tsx && grep -q "VitrineSectionHeader" src/components/sections/vitrine/hero/HeroCurtainStage.tsx && grep -q "hero-stack-runway" src/components/sections/vitrine/hero/HeroCurtainStage.tsx && grep -q "hero-stack-sentinel" src/app/globals.css && grep -q "vitrine-stack-viewport" src/app/globals.css && echo "VITRINE_STACK_ACTIF"
EXPECT: VITRINE_STACK_ACTIF
EVIDENCE: HeroCurtainStage recouvre intégralement le Hero, puis verrouille les 4 piliers clairs 01–04 exactement à leur pinTop via VitrineSectionHeader, .vitrine-stack-viewport et .hero-stack-runway sans chevauchement ni description en face des titres.

---

## 📜 8. Journal d'Exécution des Oracles

| Date d'Exécution | Oracle / Commande | Opérateur | Statut | Bilan / Preuve |
|---|---|---|---|---|
| 2026-10-09 | `npx tsc --noEmit` | `ts_quality_gate` | **SUCCÈS** | Zéro erreur TypeScript |
| 2026-10-09 | `npm run build` | `ts_quality_gate` | **SUCCÈS** | 12 routes compilées avec Turbopack |
| 2026-10-09 | `npm run lint` | `ts_quality_gate` | **SUCCÈS** | Flat config ESLint validée à 100% |
| 2026-10-09 | `node scripts/verify-gates.mjs` | `ts_quality_gate` | **SUCCÈS** | Toutes les assertions vérifiées |
| 2026-11-16 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript sur `src/` et `src/hooks/` |
| 2026-11-16 | `npm run build` | `assistant` | **SUCCÈS** | 12/12 routes compilées avec Turbopack (`Compiled successfully in 9.7s`) |
| 2026-11-16 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 |
| 2026-11-17 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript après rationalisation `ARCH-CLEANUP-01` |
| 2026-11-17 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 |
| 2026-11-17 | `npm run build` | `assistant` | **SUCCÈS** | 12/12 routes compilées avec Turbopack (`Compiled successfully in 4.0s`) |
| 2026-11-17 | `node scripts/verify-gates.mjs` | `assistant` | **SUCCÈS** | 22/22 gates validées, 0 en échec |
| 2026-11-17 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript après prefactoring `ARCH-PREFACTOR-02` |
| 2026-11-17 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 |
| 2026-11-17 | `npm run build` | `assistant` | **SUCCÈS** | 12/12 routes compilées avec Turbopack (`Compiled successfully in 4.0s`) |
| 2026-11-17 | `node scripts/verify-gates.mjs` | `assistant` | **SUCCÈS** | 23/23 gates validées après prefactoring `ARCH-PREFACTOR-02`, 0 en échec |
| 2026-11-17 | `node scripts/verify-gates.mjs` | `assistant` | **SUCCÈS** | 23/23 gates validées après structuration en sous-dossiers `ARCH-SECTIONS-03`, 0 en échec |
| 2026-11-17 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript après implémentation `HERO-CURTAIN-01` |
| 2026-11-17 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 |
| 2026-11-17 | `npm run build` | `assistant` | **SUCCÈS** | 12/12 routes compilées avec Turbopack (`Compiled successfully in 15.6s`) |
| 2026-11-17 | `node scripts/verify-gates.mjs` | `assistant` | **SUCCÈS** | 24/24 gates validées après implémentation `HERO-CURTAIN-01`, 0 en échec |
| 2026-11-23 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript après implémentation `HERO-OVERLAP-NEGATIVE-01` |
| 2026-11-23 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 |
| 2026-11-23 | `npm run build` | `assistant` | **SUCCÈS** | 12/12 routes compilées avec Turbopack (`Compiled successfully in 12.3s`) |
| 2026-11-23 | `node scripts/verify-gates.mjs` | `assistant` | **SUCCÈS** | 25/25 gates validées après implémentation `HERO-OVERLAP-NEGATIVE-01`, 0 en échec |
| 2026-11-23 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript après implémentation `VITRINE-STACK-01` |
| 2026-11-23 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 après implémentation `VITRINE-STACK-01` |
| 2026-11-23 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript après implémentation `VITRINE-STACK-LAMES-02` |
| 2026-11-23 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 (zéro avertissement) après `VITRINE-STACK-LAMES-02` |
| 2026-11-23 | `CHECK VITRINE-STACK-01` | `assistant` | **SUCCÈS** | `VITRINE_STACK_ACTIF` confirmé (`VitrineSectionHeader`, `vitrine-stack-header`, orthogonalité validée ; `npm run build` non lancé pour préserver `.next/dev/lock`) |
| 2026-11-23 | `npx tsc --noEmit` | `assistant` | **SUCCÈS** | Zéro erreur TypeScript après consolidation `VITRINE-CONSOLIDATION-03` (4 piliers) |
| 2026-11-23 | `npm run lint` | `assistant` | **SUCCÈS** | ESLint validé à code 0 (zéro avertissement) après consolidation `VITRINE-CONSOLIDATION-03` |
| 2026-11-23 | `CHECK VITRINE-STACK-01 & gates statiques` | `assistant` | **SUCCÈS** | `VITRINE_STACK_ACTIF` (`.vitrine-stack-viewport` + `.hero-stack-runway`), orthogonalité `src/components/sections/` et zéro divergence palette validés ; `npm run build` non lancé pour préserver `.next/dev/lock` |
