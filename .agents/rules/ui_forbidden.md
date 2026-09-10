# UI Forbidden — Anti-patterns interdits

Liste des erreurs de layout récurrentes. Chaque anti-pattern a un nom, une description du problème, et son remplacement obligatoire. Quand un agent produit du code qui correspond à un anti-pattern listé ici, il s'auto-corrige avant de déclarer la tâche terminée.

---

## ❌ INTERDIT-1 — `1fr` seul dans une grille

```css
/* ❌ INTERDIT */
grid-template-columns: 1fr 1fr;

/* ✅ OBLIGATOIRE */
grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
```

**Pourquoi** : `1fr` a une taille minimale implicite de `auto` (la taille du contenu). Un titre long ou une image non contrainte force la colonne à s'élargir et fait déborder la grille. `minmax(0, 1fr)` autorise la colonne à se rétrécir à zéro — le contenu devient alors responsable de sa propre contrainte.

---

## ❌ INTERDIT-2 — `height` fixe sur un conteneur texte

```css
/* ❌ INTERDIT */
.card { height: 200px; }
.description { height: 80px; }

/* ✅ OBLIGATOIRE */
.card { min-height: 200px; } /* plancher, pas plafond */
.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

**Pourquoi** : un texte plus long que prévu (titre d'enseignement, description de série) déborde d'un conteneur à hauteur fixe. `min-height` établit un plancher sans bloquer l'expansion. Le clamp CSS gère la limite de lignes proprement.

---

## ❌ INTERDIT-3 — `width: 100vw` sans précaution

```css
/* ❌ INTERDIT */
.sidebar { width: 100vw; }
.overlay { width: 100vw; }

/* ✅ OBLIGATOIRE */
.sidebar { width: min(var(--sidebar-width), 85vw); }
.overlay { width: 100%; } /* 100% du parent, pas du viewport */
```

**Pourquoi** : `100vw` inclut la largeur de la scrollbar verticale. Sur les navigateurs qui affichent une scrollbar permanente, ça crée un dépassement horizontal de quelques pixels — une barre de scroll horizontale apparaît sur la page entière.

---

## ❌ INTERDIT-4 — `position: absolute` sans parent `position: relative`

```css
/* ❌ INTERDIT */
/* <div class="card"> */
/*   <span class="badge">Nouveau</span> */
/* </div> */
.badge { position: absolute; top: 8px; right: 8px; } /* se positionne par rapport à l'ancêtre positionné le plus proche — pas la carte */

/* ✅ OBLIGATOIRE */
.card { position: relative; }
.badge { position: absolute; top: 8px; right: 8px; }
```

**Pourquoi** : sans `position: relative` sur le parent direct, l'élément absolu se positionne par rapport au premier ancêtre positionné trouvé dans le DOM — souvent l'écran entier. Le badge sort de la carte et flotte n'importe où.

---

## ❌ INTERDIT-5 — Style inline pour les valeurs de layout

```tsx
/* ❌ INTERDIT */
<div style={{ marginTop: '22px', padding: '13px 17px' }}>
<div style={{ height: '80px', backgroundColor: '#572269' }}>

/* ✅ OBLIGATOIRE */
<div className="card-header">   {/* les valeurs dans globals.css */}
```

**Pourquoi** : les valeurs hardcodées en style inline ne sont pas thémables (dark/light mode), ne suivent pas l'échelle d'espacement, et ne sont pas réutilisables. Elles cassent la cohérence dès que deux composants différents essaient d'aligner leurs dimensions.

---

## ❌ INTERDIT-6 — `overflow: hidden` pour "cacher" un débordement non compris

```css
/* ❌ INTERDIT — poser overflow: hidden sans comprendre pourquoi ça déborde */
.container { overflow: hidden; } /* masque le symptôme, pas la cause */

/* ✅ OBLIGATOIRE — identifier la cause, corriger à la source */
/* Si c'est une grille : ajouter minmax(0, 1fr) */
/* Si c'est un texte : ajouter overflow-wrap: break-word ou text-overflow */
/* Si c'est une image : ajouter max-width: 100% */
/* ENSUITE, si un clip est réellement voulu (ex: card avec image qui dépasse les bords arrondis), documenter : */
.card { overflow: hidden; /* clip intentionnel pour border-radius + image cover */ }
```

**Pourquoi** : `overflow: hidden` posé comme rustine masque un débordement réel qui réapparaîtra ailleurs ou dans un autre contexte viewport. Corriger la cause. Si le clip est intentionnel, le commenter.

---

## ❌ INTERDIT-7 — `100vh` pour le viewport complet

```css
/* ❌ INTERDIT */
.app-shell { min-height: 100vh; }
.sidebar { height: 100vh; }

/* ✅ OBLIGATOIRE */
.app-shell { min-height: 100dvh; }
.sidebar { height: 100dvh; }
```

**Pourquoi** : sur iOS Safari et Android Chrome, `100vh` correspond à la hauteur du viewport *sans* la barre d'adresse rétractée — quand la barre s'affiche à nouveau, le contenu déborde. `100dvh` (dynamic viewport height) se recalcule en temps réel et évite ce bug.

---

## ❌ INTERDIT-8 — Image sans contrainte dans un conteneur flex ou grid

```css
/* ❌ INTERDIT */
.card img { height: 150px; } /* force une hauteur, peut déformer */

/* ✅ OBLIGATOIRE */
.card__image-wrapper {
  aspect-ratio: 16 / 9;   /* ou 1 pour carré */
  overflow: hidden;
  border-radius: var(--radius-md);
}
.card__image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;       /* recadre sans déformer */
}
```

**Pourquoi** : une image sans contrainte de ratio s'étire ou se comprime selon la largeur de son conteneur, produisant des proportions aléatoires. `aspect-ratio` + `object-fit: cover` garantit un recadrage propre quel que soit le contexte.

---

## ❌ INTERDIT-9 — `flex` sans `min-width: 0` sur les enfants texte

```css
/* ❌ INTERDIT */
.track-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.track-row__title { /* pas de min-width: 0 — le texte déborde */ }

/* ✅ OBLIGATOIRE */
.track-row__title {
  min-width: 0;        /* autorise le rétrécissement */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**Pourquoi** : dans un conteneur flex, chaque enfant a `min-width: auto` par défaut. Un titre long refuse de se rétrécir et pousse les autres éléments hors du conteneur. `min-width: 0` sur l'enfant texte résout le problème.

---

## ❌ INTERDIT-10 — Incohérence des systèmes de style et valeurs Tailwind inline arbitraires

```tsx
/* ❌ INTERDIT — valeurs arbitraires et conflits d'infrastructures */
<div className="bg-[#1A0A21] shadow-[0_8px_30px_rgba(87,34,105,0.6)]">

/* ✅ OBLIGATOIRE — Tokens partagés et classes thémées */
<div className="hero-container">
```

**Pourquoi** : Les valeurs arbitraires hardcodées inline (`bg-[#...]`) contournent le système de tokens partagé, empêchent l'adaptation au thème sombre/clair et produisent des disparités visuelles incontrôlables d'un écran à l'autre.

---

## ❌ INTERDIT-11 — Emojis dans les contrôles UI et boutons d'action

```tsx
/* ❌ INTERDIT */
<Link className="btn">
  <Headphones className="w-5 h-5" />
  <span>🎧 Écouter nos enseignements</span>
</Link>

/* ✅ OBLIGATOIRE */
<Link className="btn">
  <Headphones className="w-4 h-4 text-amber-300" />
  <span>Écouter nos enseignements</span>
</Link>
```

**Pourquoi** : Les émojis sont rendus différemment selon le système d'exploitation (Apple, Android, Windows, Linux) et produisent un rendu amateur et hétérogène. Les coupler avec une icône SVG génère un doublon grotesque (`🎧 🎧`). Utiliser exclusivement des icônes SVG filaires homogènes (Lucide).

---

## ❌ INTERDIT-12 — Halos lumineux ponctuels flous non structurés (« Blobs »)

```tsx
/* ❌ INTERDIT — div circulaires ultra-saturées créant des taches boueuses */
<div className="absolute w-[650px] h-[650px] bg-[#572269]/40 rounded-full blur-[140px]" />
<div className="absolute w-[380px] h-[380px] bg-[#FBC906]/15 rounded-full blur-[120px]" />

/* ✅ OBLIGATOIRE — gradients amples, diffus, basse opacité avec grain subtil */
<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(44,18,54,0.35),rgba(13,7,20,0))]" />
```

**Pourquoi** : Les cercles individuels floutés avec `blur-[140px]` à forte saturation créent des taches de couleur locales qui entrent en collision avec le texte et provoquent une impression de saleté visuelle et de bruit chromatique.

---

## ❌ INTERDIT-13 — Sur-empilement dans le Hero (*Hero Over-stacking*) et collision de composants

```tsx
/* ❌ INTERDIT — Forcer badges + titre + sous-titre + double bouton + 3 cartes dans 100vh */
<section className="min-h-screen">
  <Badge />
  <Title />
  <Subtitle />
  <ActionButtons />
  <ThreeFeatureCards /> {/* Collision garantie avec les boutons ! */}
</section>

/* ✅ OBLIGATOIRE — Règle des 3 étages max dans le Hero + section suivante aérée */
<section className="hero-section">
  <Badge />
  <Title />
  <Subtitle />
  <ActionButtons />
</section>
<section className="pillars-section"> {/* Dans son propre espace qui respire */}
  <ThreeFeatureCards />
</section>
```

**Pourquoi** : Empiler plus de 3 étages d'information dans le Hero écrase le contenu et provoque le chevauchement direct des boutons d'action sur les cartes d'information dès que la hauteur de fenêtre se réduit.

---

## ❌ INTERDIT-14 — Dégradé de texte saturé fluorescent sans compensation de lisibilité

```tsx
/* ❌ INTERDIT — Jaune canari fluo juxtaposé à du blanc cru */
<span className="text-white">Bienvenue à</span>
<span className="bg-gradient-to-r from-[#FBC906] to-[#f4ad02] text-transparent bg-clip-text">Charis Nation</span>

/* ✅ OBLIGATOIRE — Dégradé harmonieux or champagne / écru chaleureux */
<span className="bg-gradient-to-b from-[#FDFBF7] via-[#F4EBD9] to-[#E6C687] text-transparent bg-clip-text">
  Bienvenue à Charis Nation
</span>
```

**Pourquoi** : Un dégradé jaune fluo à côté d'un blanc pur crée une rupture de contraste agressive pour l'œil et dégrade la solennité de la marque. Le dégradé doit unir l'ensemble de la phrase avec des nuances d'or doux et d'écru chaleureux.

---

*Ce fichier est une liste vivante. Quand un bug de layout ou un défaut esthétique récurrent est identifié et corrigé, ajouter l'anti-pattern ici pour que tous les agents l'évitent à l'avenir.*

