---
name: 11-memoire-et-apprentissage
description: Protocole de capitalisation de la mémoire et d'apprentissage continu — Détection des erreurs récurrentes, création de fiches Knowledge Items (KI) et cycle d'escalade vers les règles permanentes.
---

# 11 — Protocole de Mémoire Continue & Knowledge Items (KI)

L'apprentissage continu est le garant de la progression d'un écosystème d'ingénierie logicielle. Une erreur commise une fois est un incident d'exploration ; la même erreur répétée deux fois constitue une faute méthodologique. Ce protocole formalise la capture, l'indexation et l'escalade des apprentissages critiques du projet.

---

## 🔁 1. Critère de Déclenchement d'un Knowledge Item

### Le Seuil de Récurrence Strict (N ≥ 2)
Tout agent ou développeur doit consigner une nouvelle entrée de mémoire dans [`.agents/knowledge/`](../knowledge/) dès lors que :
1. Une erreur de compilation, un piège d'hydratation, une régression SSR/CSR ou un comportement silencieux inattendu est rencontré pour la **deuxième fois**.
2. Un contournement technique spécifique à la stack de Charis Nation (ex: timing du deep-link audio après `loadedmetadata`, anti-récursion RLS avec `get_user_profil`) a nécessité plus de 15 minutes d'investigation.

---

## 🪜 2. La Pyramide d'Escalade de la Mémoire

La mémoire du projet ne doit pas rester statique. Elle s'élève selon un cycle à trois niveaux en fonction de la criticité et de la persistance de l'anomalie :

```text
       ▲
      / \     Niveau 3 : Oracle Exécutable (Script déterministe / Gate automatisée)
     /   \    
    /-----\   Niveau 2 : Règle Permanente (.agents/rules/XX-*.md)
   /       \  
  /---------\ Niveau 1 : Fiche de Connaissance (.agents/knowledge/KI-*.md)
```

1. **Niveau 1 — Fiche KI Localisée** :
   - Fiche markdown documentant l'anomalie, sa cause racine technique et la solution éprouvée.
   - Indexation immédiate dans [`.agents/knowledge/INDEX.md`](../knowledge/INDEX.md).
2. **Niveau 2 — Érection en Règle Permanente** :
   - Si une typologie d'erreur documentée dans un KI survient à nouveau ou si elle engage la sécurité du système (ex: fuite RLS, écrasement d'état audio), elle est intégrée sous forme d'invariant formel dans une des règles de [`.agents/rules/`](./).
3. **Niveau 3 — Oracle Exécutable Infranchissable** :
   - Pour les invariants critiques, un test automatisé ou une gate déterministe (`scripts/verify-gates.mjs` ou script ad-hoc) est écrit dans [GATES.md](../../GATES.md) pour interdire mécaniquement tout retour en arrière lors du build.

---

## 📝 3. Format Canonique d'une Fiche KI

Chaque fiche créée dans `.agents/knowledge/` doit adopter le nommage `KI-<DOMAINE>-<ID>.md` (ex: `KI-AUDIO-01.md`, `KI-SUPABASE-01.md`) et respecter la structure suivante :

```markdown
# KI-DOMAINE-XX : Titre Explicite de l'Anomalie

- **Date d'identification** : AAAA-MM-JJ
- **Composants concernés** : `chemin/du/fichier.ts`
- **Fréquence observée** : 2+ occurrences

## 1. Symptôme Observable
Description précise du comportement indésirable ou de l'erreur levée.

## 2. Cause Racine Analytique
Explication technique profonde du mécanisme en jeu (pourquoi cela se produit).

## 3. Solution Éprouvée & Invariant
Code ou démarche adoptée pour éradiquer le problème définitivement.

## 4. Préconisation pour les Futurs Développements
Ce que les agents doivent vérifier avant de manipuler ce domaine.
```

---

## ⚖️ 4. Recommandations sur la Gestion de la Mémoire

1. **Enregistrement à chaud post-résolution**
   - **Statut** : *(Recommandé)*
   - **Justification** : Noter la cause racine immédiatement après résolution garantit la fraîcheur des détails techniques et évite d'oublier des nuances critiques de contexte.
2. **Prolifération de fiches pour des erreurs banales d'inattention**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Documenter de simples fautes de frappe sature le registre. Seules les anomalies architecturales ou subtiles doivent faire l'objet d'un KI.
