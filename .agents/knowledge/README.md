# Répertoire de Connaissance & Mémoire Locale (`.agents/knowledge/`)

Ce dossier abrite les **Knowledge Items (KI)** de **Charis Nation**. Il constitue la mémoire vive et persistante du projet face aux pièges techniques, singularités architecturales et régressions récurrentes.

---

## 🎯 Raison d'Être

Dans un projet fullstack moderne combinant Next.js 16 (App Router), Supabase (RLS & Realtime) et un moteur audio persistant, certaines subtilités d'exécution ne figurent pas dans la documentation standard des frameworks. Ce répertoire consigne ces vérités de terrain afin qu'aucun agent ou ingénieur ne réinvente la roue ou ne retombe dans une anomalie déjà élucidée.

---

## 🧭 Fonctionnement Pratique

1. **Consultation préalable** : Avant toute intervention complexe sur un domaine sensible (Audio, RLS, Design System, Server Components), l'agent consulte [`INDEX.md`](./INDEX.md).
2. **Identification d'une anomalie récurrente (N ≥ 2)** : Dès qu'une difficulté technique ou une erreur se manifeste pour la deuxième fois, une fiche `KI-<DOMAINE>-<ID>.md` est créée.
3. **Escalade vers les règles permanentes** : Dès qu'un apprentissage est consolidé, il remonte dans [`.agents/rules/`](../rules/) ou sous forme d'oracle dans [`GATES.md`](../../GATES.md).

---

## 📚 Domaines d'Indexation Actifs

- **AUDIO** : Synchronisation du lecteur persistant, throttling 30s, timings de deep-linking `?t=X`, gestion des événements `<audio>`.
- **SUPABASE** : Politiques RLS, anti-récursion `get_user_profil`, étanchéité `createBrowserClient` vs `createServerClient`.
- **FRONTEND** : Hydratation React 19, prévention du flash de thème (FOUC), étanchéité globals.css vs dashboard.css.
- **BUILD** : Dépréciations Next.js 16, configurations TypeScript strictes, optimisation Turbopack.
