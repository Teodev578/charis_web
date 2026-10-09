---
name: 01-engineering-standards
description: Standards d'ingénierie logicielle avancée — Philosophie d'Ousterhout (A Philosophy of Software Design), modularité profonde, information hiding, YAGNI strict et lutte contre le code slop.
---

# 01 — Standards d'Ingénierie Logicielle & Conception Profonde

Ce document consigne les principes directeurs de conception et de développement applicables à l'ensemble du projet. Il transcende les spécificités de framework pour garantir l'intégrité architecturale, la lisibilité et la pérennité du système.

---

## 🏛️ 1. Principes Fondamentaux de John Ousterhout

La complexité est le principal frein à l'évolution d'un logiciel. Elle se caractérise par trois symptômes majeurs : l'amplification des changements, la charge cognitive disproportionnée et l'inconnu (*unknown unknowns*). Notre ingénierie combat ces symptômes par des règles formelles d'architecture.

### 1.1 Modules Profonds (*Deep Modules*) vs Modules Superficiels (*Shallow Modules*)
- **Définition** : Un module profond offre une interface publique compacte, intuitive et épurée, masquant une implémentation substantielle et sophistiquée. À l'inverse, un module superficiel propose une interface complexe pour une valeur métier dérisoire.
- **Règle absolue** : Les fonctions, composants et services doivent être profonds. Si l'effort cognitif requis pour appréhender l'interface d'un module égale ou dépasse celui nécessaire pour comprendre son implémentation directe, le module est mal conçu et doit être restructuré.

#### Recommandations architecturales :
1. **Conception d'APIs et de services à interface réduite**
   - **Statut** : *(Recommandé)*
   - **Justification** : Réduire le nombre de paramètres, dissimuler les détails de plomberie (connexions, sérialisation, timers internes) et n'exposer que des intentions métier claires limite la surface de contact et prévient les couplages vicieux.
2. **Décomposition temporelle (*Temporal Decomposition*)**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Découper le code selon l'ordre chronologique des opérations (ex: `etape1Initialiser()`, `etape2Valider()`, `etape3Executer()`) disperse la logique d'un même problème dans plusieurs classes ou fonctions superficielles, forçant l'appelant à connaître l'ordonnancement interne. Préférer un point d'entrée unique encapsulant la séquence complète.

### 1.2 Dissimulation de l'Information (*Information Hiding*) & Fuite d'Abstraction
- Chaque unité de code doit encapsuler une décision de conception unique (structure de données, algorithme d'optimisation, mécanisme de persistance).
- **Interdiction formelle de fuite de détails** : Aucun composant de vue ne doit manipuler de concepts de bas niveau (tels que la construction manuelle de requêtes SQL, la manipulation brute de payloads réseau ou l'exposition de handles audio). Ces détails relèvent exclusivement des services et des contextes dédiés.

---

## 🎯 2. Frugalité et YAGNI Strict (*You Aren't Gonna Need It*)

Le code le plus robuste et le plus performant est le code qui n'a pas besoin d'exister.

### 2.1 Refus de la Sur-Ingénierie Spéculative
- Ne jamais concevoir d'abstractions prématurées pour anticiper des besoins hypothétiques à 6 mois.
- Résoudre le problème concret posé aujourd'hui, avec la forme la plus directe et la plus propre possible, sans créer de couches d'indirection inutiles (pas de wrappers sans valeur ajoutée, pas de factories génériques pour une seule implémentation).

### 2.2 Recommandations sur les patterns d'abstraction :
1. **Abstraction justifiée par la duplication avérée (Règle de Trois)**
   - **Statut** : *(Recommandé)*
   - **Justification** : Factoriser uniquement lorsqu'un comportement identique réapparaît pour la troisième fois avec des invariants stables. L'isolation préalable évite de figer de mauvaises abstractions.
2. **Généralisation préventive (*Premature Generalization*)**
   - **Statut** : *(Déconseillé)*
   - **Justification** : Créer des interfaces génériques ou des composants polymorphes pour un cas d'usage unique complexifie le système sans bénéfice tangible et induit une dette cognitive immédiate.

---

## 🚫 3. Lutte contre le Code Slop et Hygiène de la Base

### 3.1 Définition et Proscription du "Slop"
Le "slop" désigne le code généré sans discernement, volumineux, répétitif, ou empilant des garde-fous superficiels sans traiter la cause racine :
- Pas de blocs `try/catch` purement décoratifs qui avalent les erreurs ou loggent sans propager.
- Pas de commentaires redondants paraphrasant trivialement le code (ex: `// incrémente le compteur`). Les commentaires doivent expliquer le *pourquoi* (raisons métier, contraintes techniques non évidentes), jamais le *comment*.
- Pas d'imports morts, de variables inutilisées ou de typages lâches (`any`).

### 3.2 Actions Destructives et Nettoyage de Code Mort
- Tout refactoring doit supprimer le code remplacé. Aucun bloc de code obsolète ne doit subsister commenté.
- Avant toute suppression de fichier, de table ou d'interface, un audit d'impact exhaustif (`grep_search`) doit être réalisé sur l'intégralité du dépôt pour garantir l'absence totale de consommateurs résiduels.

---

## 🛡️ 4. Invariants de Gouvernance et de Sécurité

### 4.1 Intégrité Absolue des Versions (Règle Inviolable)
- **Interdiction formelle de modification unilatérale** : L'agent ou le développeur ne doit JAMAIS mettre à jour, rétrograder ou ajouter une dépendance dans `package.json`, ni basculer de version d'outils système (Node, pnpm, npm) sans en avoir formulé expressément la demande à l'utilisateur et obtenu son accord explicite.
- **Transparence d'impact** : Si une évolution requiert une dépendance ou une montée de version, motiver précisément le choix, détailler les risques de rupture (*breaking changes*) et attendre la validation écrite.

### 4.2 Préavis Systématique avant Modification Structurelle
Toute intervention touchant à l'architecture (schéma de base de données, déplacement de modules centraux, modification d'un Provider React global) exige un préavis formulé en 3 à 6 phrases contenant :
1. **L'action projetée** : description précise des fichiers et entités modifiés.
2. **La justification technique** : nécessité fonctionnelle ou correction d'un défaut structurel.
3. **Les effets de bord potentiels** : impacts sur les consommateurs, l'hydratation ou la sécurité.
4. **L'alternative moins risquée examinée** : avec la raison de son rejet.
