---
name: 08-skills-activation
description: Matrice déterministe de déclenchement des compétences (skills) et des protocoles opérationnels en fonction des signaux du contexte et de la typologie des tâches.
---

# 08 — Matrice Déterministe d'Activation des Skills & Protocoles

Ce document régit l'aiguillage automatique des compétences et des protocoles d'intervention pour le dépôt **Charis Nation**. Il élimine l'arbitraire et garantit que chaque tâche est traitée par le bon profil méthodologique avec les garde-fous appropriés.

---

## 🧭 1. Principes d'Aiguillage Déterministe

L'activation d'un skill ou d'un protocole ne découle pas d'une intuition mais de la conjonction de deux facteurs :
1. **Le type d'artefact manipulé** (fichiers SQL, composants React, flux audio, services Supabase).
2. **Le niveau d'incertitude et de complexité** (tâche mécanique vs refactoring structurel).

### Règle d'or :
Toute modification impliquant du code applicatif exige l'application préalable du protocole de rigueur : reformulation du besoin, formalisation du plan dans [`.agents/plan.md`](../plan.md) si la tâche est complexe, et validation par les oracles de [GATES.md](../../GATES.md).

---

## 📊 2. Matrice de Déclenchement par Signal

| Signal Détecté dans le Contexte | Domaine d'Impact | Protocole Local | Agent / Skill Référent |
|---|---|---|---|
| Fichiers `src/contexts/AudioContext.tsx`, `AudioPlayer.tsx`, `NotesPanel.tsx`, deep-link `?t=X` | Moteur Audio & Prise de notes | Protocole `component-quality` + invariant audio | `audio_ux_specialist` |
| Fichiers `src/app/dashboard/**`, `dashboard.css`, écrans CRUD admin | Panneau d'administration & Tailwind v4 | Protocole `component-quality` | `admin_dashboard_dev` |
| Fichiers `src/app/**` (hors dashboard), `src/components/**`, `globals.css` | Espace Public & Vitrine | Protocole `component-quality` + `ui-consistency` | `nextjs_frontend_dev` |
| Fichiers `src/lib/services/**`, requêtes Supabase, RLS, types | Accès données & persistance | Protocole `service-patterns` | `supabase_guardian` |
| Migrations SQL `supabase/migrations/**`, altération de tables/fonctions | Schéma PostgreSQL & Sécurité | Protocole `database` | `supabase_guardian` |
| Erreur TypeScript, bug d'hydratation, panne inexpliquée | Débogage & diagnostic | Protocole `reasoner` | `ts_quality_gate` |
| Clôture de tâche, étape avant commit, audit final | Validation déterministe | Protocole `finalize` | `ts_quality_gate` |
| Tâche touchant plus de 2 fichiers ou > 5 étapes séquentielles | Tâche fastidieuse / complexe | Protocole `tech-lead` + `unlazy` | Tech Lead & Équipe Stack |

---

## 🔄 3. Chaînes d'Exécution Méthodologiques

### 3.1 Chaîne Standard : Nouvelle Fonctionnalité Métier
```text
Cadrage conceptuel (Winston / Architecte)
   ↓
Brouillon dialectique (WRITING_IMPROVEMENT.md pour complexité ≥ Moyen)
   ↓
Définition des Gates d'acceptation (GATES.md : CHECK / EXPECT)
   ↓
Implémentation par l'agent spécialisé (Frontend / Audio / Supabase / Admin)
   ↓
Validation déterministe (verify-gates.mjs : tsc --noEmit, build, lint)
   ↓
Clôture à chaud & Enregistrement des leçons (WRITING_IMPROVEMENT.md & KI)
```

### 3.2 Chaîne de Correction d'Anomalie Critique (*Bugfix*)
```text
Isolation et reproduction du symptôme (Écriture de l'oracle d'échec dans GATES.md)
   ↓
Diagnostic de cause racine (sans modification précipitée du code)
   ↓
Patch chirurgical minimal au niveau de la couche responsable
   ↓
Validation de la correction par retour au vert de l'oracle
   ↓
Vérification des non-régressions globales (npm run build)
```

---

## ⚖️ 4. Recommandations sur les Stratégies d'Orchestration

1. **Isolation stricte des domaines d'agents**
   - **Statut** : *(Recommandé)*
   - **Justification** : Confier la modification de l'`AudioContext` exclusivement à `audio_ux_specialist` et les requêtes Supabase à `supabase_guardian` prévient les effets de bord silencieux sur la persistance et le flux temporel.
2. **Intervention transverse d'un agent généraliste sur tout le dépôt**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Un agent généraliste a tendance à mélanger les deux systèmes CSS (Tailwind et HSL pur) ou à utiliser indistinctement le client Supabase serveur et client, brisant les invariants fondamentaux.
