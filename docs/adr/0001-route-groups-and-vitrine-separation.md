# 0001. Séparation de la Vitrine et de l'Espace Écoute via les Route Groups Next.js

## Contexte
La racine du projet (`/`) servait initialement d'écran d'accueil direct pour le lecteur audio et l'exploration des enseignements, enfermé dans un shell applicatif rigide à trois colonnes (`ClientAppWrapper` avec sidebar et panneau de notes persistants). L'arrivée de la Vitrine institutionnelle (OnePage publique à défilement vertical complet avec Hero, vision, pasteurs, horaires et dons) nécessite une composition graphique en pleine largeur avec son propre en-tête et pied de page, optimisée pour le SEO.

## Décision
Nous structurons l'App Router en deux groupes de routes distincts (*Route Groups*) :
1. `app/(vitrine)` : héberge la page d'accueil racine (`/`) sous la forme d'un Server Component léger avec sa navigation fluide et son footer.
2. `app/(app)` : regroupe les fonctionnalités applicatives d'écoute (`/ecouter`, `/explorer`, `/message/:id`), enveloppées dans le layout applicatif à 3 colonnes avec gestion de l'état audio et prise de notes.

## Justification
Cette séparation évite d'alourdir la page d'accueil publique avec des contextes React superflus au premier affichage, prévient tout flash d'hydratation de la sidebar applicative, garantit un référencement naturel optimal et préserve une séparation claire des responsabilités entre la vitrine d'accueil et l'outil d'écoute quotidienne des fidèles.
