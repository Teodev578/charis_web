# Mémoire — Validation & Quality Gates (`ts_quality_gate`)

Ce fichier consigne la mémoire persistante des procédures de validation TypeScript, build Next.js et ESLint.
**Règle pour l'agent :** Consulter avant de rendre un verdict et consigner les nouveaux pièges de compilation découverts.

---

## Les Trois Gates Obligatoires

```bash
# Gate 1 : Validation TypeScript stricte
npx tsc --noEmit

# Gate 2 : Compilation et détection SSR/CSR Next.js
npm run build

# Gate 3 : Linter ESLint
npm run lint
```

---

## Pièges Documentés & Règles Déduites

1. **Next.js 16 et la commande de lint :**
   - **Piège :** La commande `next lint` a été dépréciée/retirée dans la CLI Next.js 16 (qui interprète l'argument `lint` comme un nom de répertoire).
   - **Règle :** Le script `"lint"` dans `package.json` doit exécuter directement `"eslint ."`.
2. **ESLint et les artefacts générés (`.next`) :**
   - **Piège :** Sans exclusion explicite dans `eslint.config.js`, ESLint analyse les chunks minifiés de `.next/static/chunks/` et génère des milliers de faux positifs.
   - **Règle :** `globalIgnores(['dist', '.next', 'node_modules', '.agents'])` doit être déclaré en tête du tableau de configuration dans `eslint.config.js`.
3. **Cache de types `.next/types` stale :**
   - **Piège :** Après renommage ou suppression de routes App Router, `.next/types/validator.ts` peut continuer d'importer des fichiers disparus et bloquer `tsc --noEmit`.
   - **Règle :** Exécuter `rm -rf .next && npx tsc --noEmit` pour régénérer le cache de typage propre.

---

## Journal des Évolutions & Décisions

- *Initialisation de la mémoire* : Résolution du blocage ESLint Next.js 16 et assainissement du cache de compilation.
