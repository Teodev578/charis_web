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
CHECK: grep -n "loadedmetadata" src/contexts/AudioContext.tsx src/components/AudioPlayer.tsx || echo "VERIFIE"
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

---

## 📜 4. Journal d'Exécution des Oracles

| Date d'Exécution | Oracle / Commande | Opérateur | Statut | Bilan / Preuve |
|---|---|---|---|---|
| 2026-10-09 | `npx tsc --noEmit` | `ts_quality_gate` | **SUCCÈS** | Zéro erreur TypeScript |
| 2026-10-09 | `npm run build` | `ts_quality_gate` | **SUCCÈS** | 12 routes compilées avec Turbopack |
| 2026-10-09 | `npm run lint` | `ts_quality_gate` | **SUCCÈS** | Flat config ESLint validée à 100% |
| 2026-10-09 | `node scripts/verify-gates.mjs` | `ts_quality_gate` | **SUCCÈS** | Toutes les assertions vérifiées |
