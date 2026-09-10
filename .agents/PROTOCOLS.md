# PROTOCOLS.md — Protocoles Opérationnels de Développement

Ce document définit les séquences, gates et checklists des 8 protocoles opérationnels prescrits par le routeur de tâches de [`AGENTS.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/AGENTS.md).
Tout agent ou développeur intervenant sur **Charis Nation** doit appliquer rigoureusement le protocole assigné à sa tâche.

---

## Sommaire des Protocoles

1. [`service-patterns` — Services métier et accès Supabase](#1-protocole-service-patterns)
2. [`component-quality` — Composants et pages React](#2-protocole-component-quality)
3. [`ui-consistency` — Design system et intégration CSS](#3-protocole-ui-consistency)
4. [`reasoner` — Diagnostic d'anomalies et bugs inexpliqués](#4-protocole-reasoner)
5. [`database` — Schéma SQL, migrations et RLS](#5-protocole-database)
6. [`finalize` — Gates de validation pré-commit](#6-protocole-finalize)
7. [`qa-verifier` — Audit global des invariants](#7-protocole-qa-verifier)
8. [`tech-lead` — Orchestration de tâches complexes et unlazy](#8-protocole-tech-lead)

---

## 1. Protocole `service-patterns`

**Déclencheur :** Création ou modification d'un service dans `src/lib/services/`.  
**Agent référent :** `supabase_guardian`

### Séquence d'intervention
1. **Contrôle d'étanchéité Client/Server :**
   - Identifier le contexte d'exécution du service.
   - Si appel depuis un Client Component ou un formulaire utilisateur : utiliser `createBrowserClient()` via `src/lib/supabase/client.ts`.
   - Si appel depuis un Server Component, Server Action ou Route Handler : utiliser `createServerClient()` via `src/lib/supabase/server.ts`.
   - **Invariant absolu :** Ne jamais mélanger les deux instances dans un même service.
2. **Typage strict dérivé de la base :**
   - Importer les types depuis `src/lib/supabase/database.types.ts`.
   - Dériver les types de retour via `Database['public']['Tables']['<table_name>']['Row']` ou `Insert` / `Update`.
   - Utiliser des `extends` d'interfaces pour tout enrichissement (ex: jointures) ; ne jamais modifier manuellement le fichier généré.
   - Bannir `any`. Tout type partiel ou transitionnel doit être documenté avec `// TODO: typer correctement`.
3. **Gestion des erreurs transparente :**
   - Tout appel Supabase doit vérifier l'attribut `{ data, error }`.
   - Si `error` est présent : faire systématiquement `throw error`. Ne jamais avaler silencieusement une erreur Supabase ni retourner un tableau vide `[]` masquant une panne de réseau ou un refus RLS.
   - La capture et le traitement utilisateur (`try/catch`, notifications, feedback UI) incombent au composant appelant.
4. **Normalisation et slugs :**
   - Pour les slugs (catégories, séries), utiliser exclusivement la fonction utilitaire centralisée (minuscules, normalisation Unicode, tirets). Jamais de regex locale inline.

### Checklist de validation
- [ ] Client Supabase adéquat (browser vs server)
- [ ] Aucun `console.log()` en chemin de production
- [ ] `throw error` présent sur chaque point de contact DB
- [ ] Typage TypeScript strict validé (`npx tsc --noEmit`)

---

## 2. Protocole `component-quality`

**Déclencheur :** Nouveau composant ou nouvelle page dans `src/app/` ou `src/components/`.  
**Agent référent :** `nextjs_frontend_dev` ou `admin_dashboard_dev`

### Séquence d'intervention
1. **Arbitrage architectural SSR vs. CSR :**
   - Le composant est un Server Component par défaut.
   - Ajouter `'use client'` **uniquement** si le composant utilise :
     - Des hooks d'état React (`useState`, `useReducer`, `useContext`)
     - Des effets de cycle de vie (`useEffect`, `useLayoutEffect`)
     - Des écouteurs d'événements DOM (`onClick`, `onScroll`, `onChange`)
     - Des APIs spécifiques au navigateur (`window`, `localStorage`, `IntersectionObserver`)
2. **Respect strict de la frontière SSR/CSR :**
   - Les Server Components ne doivent jamais recevoir de props client non-sérialisables (fonctions, callbacks, symboles, instances de classes).
   - Les contextes React ne s'appliquent qu'aux composants descendants d'un Client Component racine (ex: `ClientAppWrapper.tsx`).
3. **Typage des props et modularité :**
   - Expliciter une interface `interface Props { ... }` typée pour chaque composant.
   - Séparer la présentation visuelle de la logique métier lourde (déléguer l'état global à `AudioContext`, `ThemeContext` ou Zustand).
4. **Hygiène du code :**
   - Proscrire tout `console.log()` hors développement (`if (process.env.NODE_ENV === 'development')`).
   - Importer les icônes et composants de façon unifiée.

### Checklist de validation
- [ ] Statut Server Component préservé si aucun hook n'est requis
- [ ] Zéro prop non-sérialisable transmise au serveur
- [ ] Gestion des états de chargement (`SkeletonLoader`) et d'erreur
- [ ] `npx tsc --noEmit` sans aucune erreur

---

## 3. Protocole `ui-consistency`

**Déclencheur :** Stylisation, intégration CSS, ajustement responsive ou animations.  
**Agent référent :** `nextjs_frontend_dev`, `admin_dashboard_dev` ou `audio_ux_specialist`

### Séquence d'intervention
1. **Ségrégation stricte des systèmes de style :**
   - **Espace Public (`src/app/globals.css`)** : Utiliser exclusivement les variables CSS HSL du thème (`--primary`, `--background`, `--card`, etc.). Pas de classes utilitaires arbitraires ni de style inline `style={{}}` pour le positionnement.
   - **Espace Admin (`src/app/dashboard/dashboard.css`)** : Utiliser Tailwind CSS v4 exclusivement. Ne jamais importer ni référencer les variables HSL de `globals.css` dans le dashboard.
2. **Consultation obligatoire des règles UI :**
   - Consulter [`layout_constraints.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/.agents/rules/layout_constraints.md) pour les invariants d'overflow et de grilles `minmax(0, 1fr)`.
   - Consulter [`ui_forbidden.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/.agents/rules/ui_forbidden.md) pour éviter les 10 anti-patterns critiques.
   - Consulter [`ui_patterns.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/.agents/rules/ui_patterns.md) pour réutiliser les motifs canoniques (cartes, listes, layout shell).
   - Consulter [`ui_motion.md`](file:///home/fabien/Documents/Projets/Pro/charis_web/.agents/rules/ui_motion.md) pour appliquer les tokens de durée (`--duration-fast`, `--ease-out`) et respecter `prefers-reduced-motion`.
3. **Prise en compte de l'AudioPlayer persistant :**
   - Réserver un dégagement inférieur (`padding-bottom`) pour que le contenu ne passe pas sous le lecteur audio fixe.
   - Intégrer `padding-bottom: env(safe-area-inset-bottom)` sur mobile iOS.
   - Utiliser `height: 100dvh` (pas `100vh`) pour gérer le clavier virtuel et les barres d'outils mobiles.

### Checklist de validation
- [ ] Test visuel sur 3 viewports obligatoires : 375px (mobile), 768px (tablette), 1280px (desktop)
- [ ] Aucun débordement horizontal (`overflow-x`) sur toute la largeur de page
- [ ] Contraste lisible en mode clair et en mode sombre
- [ ] Textes longs tronqués proprement (`ellipsis` ou `line-clamp`) sans casser la mise en page

---

## 4. Protocole `reasoner`

**Déclencheur :** Bug complexe, régression inattendue, boucle infinie ou comportement divergent.  
**Agent référent :** Tous (posture investigative)

### Séquence d'intervention
1. **Phase 1 — Enquête passive (Interdiction d'écrire du code) :**
   - Reproduire le problème avec précision ou analyser les traces d'erreur exactes.
   - Isoler la couche fautive : Réseau, Supabase RLS, front-end SSR/CSR, synchro de contexte ou CSS.
   - Vérifier si un Knowledge Item (KI) existe déjà sur le sujet.
2. **Phase 2 — Formulation d'hypothèses étayées :**
   - Poser 2 à 3 hypothèses explicatives avec éléments factuels à l'appui.
   - Vérifier les invariants : récursion RLS ? Erreur d'instance browser/server ? Déréférencement audio ?
3. **Phase 3 — Évaluation et choix de la cible :**
   - Écarter les fausses pistes par déduction logique ou inspection ciblée de fichiers.
   - Sélectionner la cause racine démontrée.
4. **Phase 4 — Patch chirurgical :**
   - Appliquer la modification à la couche la plus étroite possible.
   - Ne pas refactoriser du code adjacent sous prétexte d'opportunité.
5. **Phase 5 — Preuve de résolution :**
   - Vérifier que l'anomalie a disparu.
   - Exécuter la suite de validation pour prouver l'absence de régression de bord.

---

## 5. Protocole `database`

**Déclencheur :** Nouvelle table, modification de colonnes, mise à jour des politiques RLS ou triggers.  
**Agent référent :** `supabase_guardian`

### Séquence d'intervention
1. **Rédaction du fichier de migration :**
   - Créer un script SQL ordonné dans `supabase/migrations/<num>_<nom>.sql`.
   - Rédiger des scripts idempotents (`IF NOT EXISTS`, `IF EXISTS`).
   - Jamais de commande destructive (`DROP TABLE`, `DROP COLUMN`) sans validation formelle préalable.
2. **Garantie RLS obligatoire :**
   - Activer systématiquement RLS : `ALTER TABLE <nom_table> ENABLE ROW LEVEL SECURITY;`.
   - Utiliser impérativement la fonction `get_user_profil(auth.uid())` (`SECURITY DEFINER`) pour inspecter le rôle d'un utilisateur, afin de bannir la récursion infinie sur la table `utilisateurs`.
   - Définir les 4 opérations : SELECT, INSERT, UPDATE, DELETE avec des prédicats étanches.
3. **Production du `GATES.md` :**
   - Documenter dans un artefact ou fichier temporaire `GATES.md` :
     - Les tables impactées et les contraintes FK
     - Les matrices d'accès RLS (Anonyme, Membre, Admin)
     - Le plan de test et les requêtes SQL de vérification
4. **Synchronisation des types TypeScript :**
   - Régénérer les types Supabase via `supabase gen types typescript` vers `src/lib/supabase/database.types.ts`.
   - Ne jamais altérer manuellement le fichier généré.

### Checklist de validation
- [ ] RLS activé et testé sur chaque nouvelle entité
- [ ] Aucune boucle de récursion sur `get_user_profil`
- [ ] Types synchronisés dans `database.types.ts`
- [ ] `npx tsc --noEmit` validé sur l'ensemble du projet

---

## 6. Protocole `finalize`

**Déclencheur :** Fin d'une tâche de code, avant proposition de commit ou de PR.  
**Agent référent :** `ts_quality_gate`

### Séquence d'intervention
Exécuter strictement dans l'ordre les trois gates du projet :

#### Gate 1 — Analyse TypeScript stricte
```bash
npx tsc --noEmit
```
*Critère :* 0 erreur, 0 warning. Aucun typage implicite ignoré.

#### Gate 2 — Build de production
```bash
npm run build
```
*Critère :* Compilation Next.js réussie. Valide l'absence d'erreurs SSR, d'imports manquants et la conformité des routes statiques/dynamiques.

#### Gate 3 — Linter ESLint
```bash
npm run lint
```
*Critère :* 0 violation. Interdiction formelle d'ajouter des `// eslint-disable` cosmétiques pour masquer un avertissement.

### Checklist d'intégrité avant commit
- [ ] Aucun secret ou clé d'API exposé (`.env.local` exclu du commit)
- [ ] Aucun fichier binaire (images, audios) committé dans le dépôt (passer par Supabase Storage)
- [ ] Message de commit rédigé au format Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`)

---

## 7. Protocole `qa-verifier`

**Déclencheur :** Audit de santé régulier, revue globale ou fin de phase de sprint.  
**Agent référent :** Tous (coordination qualité)

### Séquence d'intervention
1. **Audit des 6 invariants inviolables :**
   - Invariant 1 : Séparation stricte `createBrowserClient` / `createServerClient`.
   - Invariant 2 : RLS actif sur 100% des tables exposées.
   - Invariant 3 : Zéro prop fonction transmise à un Server Component.
   - Invariant 4 : Zéro `console.log()` sans condition d'environnement.
   - Invariant 5 : Fichier `database.types.ts` intact et conforme au schéma distant.
   - Invariant 6 : Stack technologique respectée sans dérive de dépendances.
2. **Vérification de l'étanchéité des domaines :**
   - Aucun composant ou style du dashboard (`src/app/dashboard/`) n'est injecté dans l'espace public, et réciproquement.
3. **Rapport d'audit :**
   - Émettre un rapport catégorisé : **Bloquant** (interdiction de merger), **Majeur** (à corriger avant release), **Mineur** (amélioration technique).

---

## 8. Protocole `tech-lead`

**Déclencheur :** Tâche complexe (> 2 fichiers modifiés), refonte structurelle, ou orientation indécise.  
**Agent référent :** Tech Lead / Chef d'orchestre

### Séquence d'intervention
1. **Activation automatique d'`unlazy` :**
   - Règle inviolable du dépôt : toute tâche touchant plus de 2 fichiers active le skill `unlazy`.
2. **Rédaction préalable du `PLAN.md` :**
   - Rédiger un fichier de planification détaillant :
     - Contexte et objectifs de la tâche
     - Invariants et contraintes applicables
     - Décomposition en feuilles d'exécution (Depth Tree)
     - Gates de validation par palier
3. **Exécution itérative bracketing :**
   - Exécuter le travail par petits pas vérifiables.
   - Lancer un contrôle TypeScript après chaque modification significative d'interface.
4. **Bilan et transition :**
   - Valider la complétude par rapport aux critères initiaux du plan.
   - Déclencher le protocole `finalize` pour clore l'intervention.
