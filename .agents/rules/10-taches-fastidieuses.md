---
name: 10-taches-fastidieuses
description: Protocole de gradation de complexité, planification séquentielle des tâches fastidieuses et prévention de la dérive d'exécution.
---

# 10 — Protocole des Tâches Fastidieuses & Gradation de Complexité

Les agents autonomes et les développeurs sont sujets à la fatigue de contexte, aux hallucinations d'omission et à la tentation de raccourcir les implémentations mécaniques. Ce protocole instaure un cadre déterministe pour graduer l'effort et planifier sans faille les tâches volumineuses.

---

## 🧗 1. Échelle de Gradation de la Complexité

Chaque intervention sur le projet doit être catégorisée selon la grille suivante avant toute écriture de code :

| Niveau | Critères d'Éligibilité | Formalisme Exigé | Registre Requis |
|---|---|---|---|
| **1. Trivial** | Correction typographique, renommage local, retouche isolée ≤ 3 lignes dans 1 fichier | Direct (sans plan formel) | Aucun |
| **2. Simple** | Ajustement d'un composant, ajout d'une prop typée, retouche CSS ciblée (1 seul fichier) | Séquence mentale claire | Vérification locale |
| **3. Moyen** | Nouveau composant complet, ajout d'une méthode de service, nouvelle route API (1 à 2 fichiers) | **Obligatoire** : Brouillon de réflexion avec alternative rejetée | `WRITING_IMPROVEMENT.md` |
| **4. Complexe** | Feature multi-fichiers (UI + Service + Context), refactor de modèle de données (3 à 5 fichiers) | **Obligatoire** : Planification séquentielle + Brouillon dialectique + Gates d'acceptation | `plan.md` + `WRITING_IMPROVEMENT.md` + `GATES.md` |
| **5. Fastidieux / Critique** | Migration de schéma DB, refactor global de styles, refonte de l'AudioContext, batch de plus de 5 fichiers | **Obligatoire** : Mode unlazy, validation pas-à-pas, exécution ordonnée et traçabilité d'oracles | `plan.md` (avec statuts stricts) + `GATES.md` |

---

## 📋 2. Protocole de Planification dans `plan.md`

Dès lors qu'une tâche atteint le niveau **Complexe** ou **Fastidieux/Critique**, elle doit obligatoirement être inscrite dans [`.agents/plan.md`](../plan.md) avant d'exécuter la première action.

### 2.1 Structure d'une Tâche dans le Plan
Chaque plan de travail obéit à la structure canonique suivante :
1. **Intitulé & Contexte** : Objectif précis et motivation technique.
2. **Gates de Vérification Associées** : Liens vers les entrées correspondantes dans [GATES.md](../../GATES.md).
3. **Découpage Linéaire en Étapes Atomiques** :
   - Chaque étape doit représenter une unité de travail vérifiable (durée d'exécution courte, périmètre restreint).
   - Utilisation de cases à cocher standard : `- [ ] Non démarré`, `- [x] Achevé et vérifié`.
4. **Point de Contrôle Intermédiaire** : Validation par `npx tsc --noEmit` après chaque étape modifiant des types ou interfaces.

### 2.2 Règle d'Inviolabilité du Plan
- Il est strictement interdit de déclarer une tâche achevée si toutes ses sous-étapes ne sont pas cochées après vérification effective.
- En cas d'obstacle technique imprévu, le plan est mis à jour en ajoutant les étapes de contournement plutôt que d'abandonner la traçabilité.

---

## ⚖️ 3. Recommandations sur la Conduite des Tâches Volumineuses

1. **Découpage atomique avec validation continue (Petits pas vérifiables)**
   - **Statut** : *(Recommandé)*
   - **Justification** : Valider chaque fichier ou sous-ensemble par une commande déterministe (`tsc`) empêche l'accumulation d'erreurs en cascade et circonscrit immédiatement l'origine d'un défaut.
2. **Génération massive en un seul bloc sans point de contrôle intermédiaire**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Multiplie les risques de régression, sature la fenêtre d'attention et produit des divergences silencieuses difficiles à diagnostiquer lors du build final.
