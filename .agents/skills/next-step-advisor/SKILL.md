---
name: next-step-advisor
description: Propose strategic next steps, unblocking advice, and high-impact prioritized actions when the user is stuck, wondering what to do next, asking where to take the project, or looking for roadmap progression. Generates copy-paste ready agent prompts. Use when the user says 'que faire ensuite', 'je bloque', 'next steps', 'conseille-moi', 'par quoi continuer', 'priorités', 'où en est le projet', 'aide-moi à choisir', or asks Arthur for guidance.
---

# 🧭 Skill : Next-Step Advisor (Boussole Projet Stockly)

## 📌 Présentation & Objectif

Ce skill permet à **Arthur** (ou à l'agent invoqué) d'analyser l'état réel du projet **Stockly** pour orienter le développeur avec lucidité et pragmatisme :
1. **Évaluer la situation en 30 secondes** (fichiers récents, anomalies, santé du code, chantiers en cours).
2. **Identifier les trous dans la raquette** (services sans écrans, modèles sans tests, écrans sans gestion offline).
3. **Proposer 3 pistes d'action claires et hiérarchisées** (Déblocage immédiat, Jalon Roadmap, Consolidation).
4. **Générer des prompts prêts à l'emploi** pour déléguer directement aux spécialistes de l'équipe (Florian, Antoine, Camille, Damien, Théo, Diane, etc.).

---

## 🔍 Processus d'Analyse en 4 Étapes

Quand ce skill est activé, suivre systématiquement ces 4 étapes :

### Étape 1 : Diagnostic Éclair du Dépôt
Effectuer un scan non-destructif pour capter le contexte immédiat :
- **Git & Activité récente** : Quels fichiers sont modifiés ou en cours d'édition ?
- **Santé globale** : Y a-t-il des erreurs ou avertissements évidents dans le code ouvert ou via analyse ?
- **Repérage des TODOs** : Chercher rapidement les `TODO` ou `FIXME` dans la zone active.

### Étape 2 : Matrice de Complétude Métier Stockly
Vérifier l'alignement entre les 4 piliers d'un domaine métier Stockly :
```
Domaine Métier (ex: Achats, Ventes, Caisse, Stock)
 ├── 1. Modèle (lib/models/[domaine]/)       → Présent & typé ?
 ├── 2. Service (lib/services/[domaine]/)   → CRUD offline-first + Stream + executeWrite ?
 ├── 3. Écran / Vue (lib/screens/[domaine]/)→ Screen responsive présent ?
 ├── 4. Widgets & UI (lib/widgets/)          → Composants & formulaires MD3 ?
 └── 5. Tests (test/)                       → Tests unitaires / widgets existants ?
```

### Étape 3 : Formulation des 3 Pistes d'Action
Classer les recommandations en 3 trajectoires distinctes pour laisser le choix au développeur :

* 🟢 **Piste 1 : [Immédiat] Déblocage & Quick Win (< 30 min)**
  * *Objectif* : Résoudre la friction actuelle, finir la fonction en cours ou réparer un bug gênant.
* 🔵 **Piste 2 : [Roadmap] Prochain Jalon Métier Prioritaire**
  * *Objectif* : Faire progresser la valeur business de l'application (ex: relier un service existant à son interface utilisateur).
* 🟠 **Piste 3 : [Consolidation] Dette Technique & Robustesse**
  * *Objectif* : Renforcer la stabilité (tests unitaires avec Théo, sécurisation Supabase avec Simon, optimisation perfs avec Paul, ou documentation Notion avec Diane).

### Étape 4 : Génération des Prompts Prêts à l'Emploi
Pour chaque piste, formuler un prompt précis et contextualisé que le développeur peut copier-coller directement dans le chat pour activer le bon agent spécialiste.

---

## 📋 Format de Réponse Standardisé

Toujours structurer la réponse selon ce modèle lisible et percutant :

````markdown
## 🧭 Diagnostic & Boussole Projet — Stockly

### 📍 1. Où en est le projet (État des lieux express)
- **Focus actuel détecté** : [ex: Refactorisation des services du domaine Logistique / Stock]
- **Forces en place** : [ex: Modèles et services CRUD offline-first opérationnels]
- **Trous dans la raquette repérés** : [ex: Pas d'écran d'inventaire relié, tests unitaires absents sur les transferts de stock]

---

### 🎯 2. Vos 3 options pour continuer :

#### 🟢 Option A : [Quick Win] Débloquer le chantier en cours
- **Action** : [Description concise de l'action à mener]
- **Pourquoi maintenant** : [Bénéfice immédiat]
- **Agent assigné** : [Nom de l'agent recommandé]
- **Prompt à copier-coller** :
```text
"[Nom de l'agent], [instruction précise mentionnant le fichier cible et le comportement attendu]"
```

#### 🔵 Option B : [Roadmap] Construire la prochaine brique métier
- **Action** : [Description de la feature métier prioritaire suivante]
- **Pourquoi cette brique** : [Valeur fonctionnelle pour l'utilisateur de l'ERP]
- **Agent assigné** : [Nom de l'agent recommandé]
- **Prompt à copier-coller** :
```text
"[Nom de l'agent], [instruction précise pour implémenter la feature selon les standards Stockly]"
```

#### 🟠 Option C : [Consolidation] Sécurité, Tests & Documentation
- **Action** : [Description du renforcement de qualité / test / doc / perfs]
- **Pourquoi consolider** : [Prévention des régressions ou traçabilité métier]
- **Agent assigné** : [Nom de l'agent recommandé]
- **Prompt à copier-coller** :
```text
"[Nom de l'agent], [instruction précise de validation, test ou documentation]"
```

---

### 💡 Le Conseil du Tech Lead (Arthur)
> [!TIP]
> [1 à 2 phrases de recommandation personnelle sur l'option la plus judicieuse selon le stade actuel].
````

---

## 🎯 Annuaire Rapide des Spécialistes pour les Prompts

| Domaine du Prompt | Agent Spécialiste à invoquer |
|---|---|
| Widget Flutter, Provider, mise en page Dart | **Florian** (`flutter-expert`) |
| Service métier, CRUD offline, Stream SQLite | **Antoine** (`api-patterns`) |
| Table SQLite, schéma BDD, synchronisation | **Damien** (`database`) |
| Formulaire progiciel, Material 3, responsive | **Camille** (`ui-consistency`) |
| Bug étrange, setState() lifecycle, cause racine | **Raphaël** (`reasoner`) |
| Sécurité Supabase, règles RLS, permissions | **Simon** (`supabase-guardian`) |
| Tests unitaires, mocks, tests de widgets | **Théo** (`testing`) |
| Documentation Dartdoc, fiches Notion | **Diane** (`documentation`) |
| Lenteur, saccades, profiling mémoire | **Paul** (`performance`) |
| Contrôle qualité global multi-experts | **Quentin** (`qa-verifier`) |
| Lint, build et préparation du commit Git | **Félix** (`finalize`) |

---

## ⚠️ Règles d'Or du Skill

- **Ne jamais laisser l'utilisateur sans prompt concret** : chaque option DOIT inclure un prompt prêt à l'emploi.
- **Rester ancré dans la réalité de Stockly** : tenir compte de l'architecture duale (SQLite / Supabase) et des règles du projet (zéro `print()`, Material 3, `executeWrite`).
- **Éviter le déluge d'options** : toujours limiter à 3 pistes ciblées pour ne pas créer de surcharge décisionnelle.
