# Aesthetic Standards — Direction Artistique & Noblesse Visuelle

Ce document définit la doctrine esthétique, spatiale et typographique obligatoire pour tous les agents intervenant sur l'espace public de **Charis Nation**.
Tout composant ou mise en page doit refléter la noblesse, la dignité et la sérénité d'un sanctuaire contemporain d'excellence.

---

## 🏛️ Philosophie : La Noblesse par la Retenue

Charis Nation n'est ni une vitrine technologique tape-à-l'œil, ni un site corporate générique. La beauté de l'interface repose sur :
- **L'espace et la respiration** plutôt que l'accumulation et la densité.
- **La lumière feutrée et diffuse** plutôt que des néons ou des halos criards.
- **La clarté typographique et l'équilibre optique** plutôt que des artifices graphiques.
- **Le vide comme élément architectural plein** qui confère de la solennité au propos spirituel.

---

## 📐 Règle 1 — La Sanctuarisation du Vide et de la Respiration Spatiale

### 1.1 Paddings de section généreux
Les sections de l'espace public doivent respirer profondément. Ne jamais coller les sections entre elles.
- **Desktop (>= 1024px)** : `padding-block: clamp(5rem, 10vw, 10rem)` (soit 80px à 160px de dégagement vertical en tête et pied de section).
- **Mobile (< 768px)** : `padding-block: clamp(3.5rem, 8vw, 5rem)` (56px à 80px).
- **Espacement inter-sections** : Les transitions entre blocs narratifs s'effectuent par le vide ou par de très subtils dégradés de transition, jamais par des séparateurs durs ou des empilements compacts.

### 1.2 La Règle des 3 Étages Max pour le Hero
Le viewport initial (Hero) est un espace sacré de première impression. Il est **formellement interdit d'empiler plus de 3 étages d'information** au-dessus de la ligne de flottaison :
1. **Étage 1 (Sur-titre)** : Badge ou mention de contexte sobre et discret (ex : *Sanctuaire de Grâce*).
2. **Étage 2 (Titraille & Accroche)** : Titre monumental équilibré + sous-titre clair et concis (maximum 2 à 3 lignes aérées).
3. **Étage 3 (Call-to-Action)** : Groupe de boutons d'action (maximum 2 boutons : une action primaire noble et une action secondaire sobre).

> **Interdiction absolue** : Les cartes de réassurance, piliers d'enseignement ou grilles d'information (« Parole vivante », « Célébration », etc.) **ne doivent jamais être forcées dans le Hero sous les boutons**. Elles doivent impérativement constituer une section de transition distincte et aérée, découverte naturellement au scroll.

---

## 🎨 Règle 2 — Harmonie Chromatique & Atmosphère Lumineuse

### 2.1 Palette nocturne raffinée
Finis les aplats violets froids et saturés façon néon d'arcade. La palette de Charis Nation s'ancre dans des profondeurs organiques :
- **Fond principal (Base)** : Obsidienne profonde et chaleureuse (`#0D0714` ou `#120919`), évitant le noir pur `#000000` et les violets criards.
- **Surfaces et Cartes** : Teintes subtilement relevées avec transparence optique (`rgba(255, 255, 255, 0.03)` à `0.05`), avec une bordure délicate (`rgba(255, 255, 255, 0.08)`).
- **Accents Dorés & Solennels** : Or champagne, écru et ambre feutré (`#E6C687`, `#F5EBD9`, `#D4AF37`). L'or doit évoquer la lumière et l'élévation, jamais un jaune canari ou fluorescent.
- **Pourpre Spirituel** : Pourpre impérial très assourdi et profond (`#2C1236`, `#3B1A48`), utilisé en ambiance de fond et non en teinte saturée éclatante.

### 2.2 Gestion de la lumière d'ambiance
- **Halos lumineux structurés** : Les « blobs » circulaires ultra-saturés à 40% d'opacité avec `blur-[140px]` sont proscrits. Ils génèrent un rendu boueux et désordonné.
- **La bonne méthode** : Employer de grands gradients radiaux à diffusion lente avec une opacité contenue (entre 6% et 18% maximum), combinés si nécessaire à une texture de grain ultra-fine pour éliminer tout effet de banding (marches d'escalier de couleur).

### 2.3 Traitement des dégradés de texte
- Un dégradé sur un titre doit être d'une douceur absolue : un fondu vertical ou légèrement en diagonale allant d'un écru chaleureux (`#FDFBF7`) vers un or doux (`#E6C687`).
- Ne jamais juxtaposer dans un même mot ou une même phrase un blanc cru (`#FFFFFF`) avec un jaune vif criard (`#FBC906`), ce qui brise l'harmonie et donne un aspect amateur.

---

## ✍️ Règle 3 — Duo Typographique & Hiérarchie Éditoriale

### 3.1 Le Duo Typographique Maître
1. **Police de Titre (Display / Sérif)** : `Cinzel` ou `Playfair Display`. Utilisée pour les titres d'impact (H1, H2 de section).
   - Lettres capitales avec interlettrage raffiné (`letter-spacing: 0.02em` à `0.05em`).
   - Graisses mesurées : privilégier le `SemiBold` (600) ou `Medium` (500) plutôt que le `Black` (900) qui épaissit et alourdit le dessin de lettre.
2. **Police de Corps et Labellisation (Sans-Sérif)** : `Plus Jakarta Sans` ou `Inter`.
   - Utilisée pour les paragraphes, citations, badges, métadonnées et boutons.
   - Excellente lisibilité même en petits corps (`12px` à `14px`).
   - Badges et sur-titres en capitales avec espacement généreux (`tracking-[0.2em]`).

### 3.2 Respect des diacritiques français
- L'interlignage (`line-height`) des grands titres doit être au minimum de `1.15` à `1.25` afin que les accents sur les majuscules françaises (« É », « À », « È ») ne soient jamais tronqués ni collés à la ligne supérieure.
- Utiliser `text-wrap: balance` sur les titres et `text-wrap: pretty` sur les paragraphes d'accroche pour garantir une rupture de ligne harmonieuse.

---

## 💎 Règle 4 — Rigueur des Composants & Anti-Amateurisme

### 4.1 Proscription des émojis dans l'interface
- **Zéro émoji dans les boutons d'action, onglets, badges ou menus**.
- Utiliser exclusivement des icônes SVG filaires ultra-nettes de la bibliothèque **Lucide React** (ex: `<Headphones className="w-4 h-4 text-amber-300" />`).
- Ne jamais combiner une icône Lucide et un émoji pour le même libellé (anti-pattern `🎧 🎧`).

### 4.2 Anatomie d'un bouton noble
- Forme : `rounded-full` ou `rounded-2xl` avec une courbure douce.
- Padding proportionné : par exemple `padding: 0.875rem 2rem` (14px vertical, 32px horizontal). Jamais de boutons étroits ou étouffés.
- Traitement de surface :
  - **Bouton primaire** : Dégradé sombre et royal (`#381547` vers `#4E1F63`) rehaussé d'une bordure fine dorée semi-transparente et d'une ombre feutrée diffuse (`box-shadow: 0 10px 25px -5px rgba(56, 21, 71, 0.5)`).
  - **Bouton secondaire** : Fond transparent ou verre dépoli subtil (`rgba(255, 255, 255, 0.04)`), bordure fine (`rgba(255, 255, 255, 0.12)`), texte lumineux au survol.
- Typographie du bouton : Poids `medium` (500) ou `semibold` (600), taille `0.9375rem` (15px), interlettrage légèrement délié (`tracking-wide`).

### 4.3 Cartes & Conteneurs d'information
- Jamais de fond blanc opaque sur thème sombre, ni d'aplats violets trop agressifs.
- Utiliser le principe du « verre architectural » : fond sombre translucide, `backdrop-filter: blur(16px)`, bordure subtile de 1px avec gradient linéaire simulant un reflet de lumière en haut.

---

## 📋 Checklist d'Auto-Évaluation Esthétique (Obligatoire)

Avant de déclarer toute tâche front-end ou vitrine terminée, l'agent valide les points suivants :
- [ ] Le premier écran (Hero) respire-t-il sans aucune sensation d'étouffement ?
- [ ] Les boutons d'action sont-ils parfaitement dégagés de tout élément adjacent (aucun chevauchement à 100%, 75% ou 125% de zoom) ?
- [ ] Les 3 cartes de piliers sont-elles dans leur propre section avec leur propre espace ?
- [ ] Le fond évite-t-il les taches circulaires saturées et propose-t-il une atmosphère profonde, feutrée et noble ?
- [ ] Aucun émoji n'apparaît dans les boutons ou étiquettes interactives ?
- [ ] La titraille utilise-t-elle le duo typographique avec le contraste or/écru doux sans jaune criard ?
- [ ] Le padding vertical de chaque section est-il d'au moins 80px sur mobile et 120px sur desktop ?
