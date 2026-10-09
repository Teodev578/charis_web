# Plugin : Charis Nation Agent Team (`charis-team`)

Ce plugin instancie l'équipe d'ingénierie technique spécialisée, conçue sur-mesure pour l'architecture et les invariants de **Charis Nation** : **Next.js 16 (App Router) + React 19 + Supabase (PostgreSQL, RLS, Storage) + Double Design System (CSS HSL public vs Tailwind v4 admin) + Moteur Audio Persistant & Synchronisé**.

Chaque agent applique les principes d'ingénierie senior définis dans [`AGENTS.md`](../../../AGENTS.md) et la philosophie de conception d'Ousterhout documentée dans [`01-engineering-standards.md`](../../rules/01-engineering-standards.md).

---

## 👥 Composition de l'Équipe & Spécialisations

| Agent | Rôle Canonique | Domaine d'Intervention Exclusif |
|---|---|---|
| **[`nextjs_frontend_dev`](agents/nextjs_frontend_dev.md)** | Lead Frontend Next.js & Vitrine Publique | Architecture App Router, Server Components vs Client Components, design system HSL dans `globals.css`, performance d'hydratation, accessibilité et ergonomie mobile. |
| **[`audio_ux_specialist`](agents/audio_ux_specialist.md)** | Cœur Fonctionnel & Moteur Audio | `src/contexts/AudioContext.tsx`, lecteur persistant `AudioPlayer.tsx`, panneau de notes synchronisées `NotesPanel.tsx`, deep-links `?t=X`, throttle de 30s vers Supabase. |
| **[`supabase_guardian`](agents/supabase_guardian.md)** | Architecte Données & Sécurité RLS | Migrations SQL idempotentes, politiques RLS anti-récursion (`get_user_profil`), typage strict dérivé de `database.types.ts`, étanchéité `createBrowserClient` vs `createServerClient` dans `src/lib/services/`. |
| **[`admin_dashboard_dev`](agents/admin_dashboard_dev.md)** | Développeur Espace Administration | Panel admin `/dashboard`, Tailwind CSS v4 (`dashboard.css`), formulaires CRUD d'enseignements/séries/catégories, téléversement de médias vers Supabase Storage. |
| **[`ts_quality_gate`](agents/ts_quality_gate.md)** | Oracle de Résilience & Validation Déterministe | Vérification TypeScript stricte (`tsc --noEmit`), build de production Next.js (`npm run build`), audit ESLint (`npm run lint`), exécution des oracles de [`GATES.md`](../../../GATES.md). Agent terminal ne produisant pas de code métier. |

---

## 🔄 Matrice d'Interaction et Passages de Relais

```text
               ┌─────────────────────────────┐
               │    Cadrage & Architecture   │
               │   (Winston / Mary / John)   │
               └──────────────┬──────────────┘
                              │
                    Spécification Validée
                              │
                              ▼
    ┌──────────────────────────────────────────────────┐
    │          Équipe Technique Locale (charis-team)   │
    │                                                  │
    │   ┌─────────────────────┐   ┌─────────────────┐  │
    │   │ nextjs_frontend_dev │   │   audio_ux_     │  │
    │   │  (Vitrine & CSS)    │   │   specialist    │  │
    │   └──────────┬──────────┘   └────────┬────────┘  │
    │              │                       │           │
    │              │       Besoins Données │           │
    │              ▼                       ▼           │
    │   ┌───────────────────────────────────────────┐  │
    │   │            supabase_guardian              │  │
    │   │        (Services, RLS, Migrations)        │  │
    │   └─────────────────────┬─────────────────────┘  │
    │                         │                        │
    │                         ▼                        │
    │   ┌───────────────────────────────────────────┐  │
    │   │           admin_dashboard_dev             │  │
    │   │         (Panel CRUD & Tailwind v4)        │  │
    │   └─────────────────────┬─────────────────────┘  │
    └─────────────────────────┼────────────────────────┘
                              │
                    Implémentation Achevée
                              │
                              ▼
               ┌─────────────────────────────┐
               │       ts_quality_gate       │
               │  (Oracles GATES.md & Build) │
               └─────────────────────────────┘
```

---

## 📋 Directives Générales de Collaboration

- **Frontière Produit / Stack** : L'équipe locale `charis-team` intervient lors des phases de conception technique, d'implémentation, de refactorisation et d'audit. Les phases d'idéation, de cadrage stratégique et d'arbitrage produit relèvent des rôles transverses (Winston, John, Sally, Mary).
- **Isolation des Systèmes CSS** : `nextjs_frontend_dev` et `admin_dashboard_dev` ne partagent jamais leurs feuilles de style. L'espace public est gouverné par les variables HSL de `globals.css` ; l'espace admin est stylisé exclusivement par Tailwind v4 dans `dashboard.css`.
- **Intégrité Audio Absolue** : Aucun agent en dehors d'`audio_ux_specialist` n'est autorisé à modifier `AudioContext.tsx` ou le timing d'interaction avec l'élément `<audio>`.
- **Typage Strict et Centralisé** : Tout échange de données passe par les types de `src/lib/supabase/database.types.ts`. Interdiction d'introduire des types manuels non alignés.
- **Validation Terminale Obligatoire** : Aucune intervention de l'équipe ne peut être déclarée achevée sans l'aval de `ts_quality_gate` validant l'absence totale d'erreur TypeScript et la compilation propre du build de production.

---

## ⚖️ Recommandations sur les Workflows d'Équipe

1. **Validation déterministe par un agent dédié (`ts_quality_gate`)**
   - **Statut** : *(Recommandé)*
   - **Justification** : Séparer l'agent implémenteur de l'agent vérificateur prévient l'auto-complaisance et garantit qu'aucun fichier n'est livré sans validation effective par les oracles du projet.
2. **Implémentation et commit direct par un même agent sans vérification terminale**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Favorise l'apparition de régressions invisibles d'hydratation, d'imports non résolus ou d'erreurs TypeScript subtiles masquées lors des modifications isolées.
