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

## ❌ INTERDIT-10 — Tailwind CSS dans l'espace public

```tsx
/* ❌ INTERDIT dans src/app/ et src/components/ (espace public) */
<div className="flex gap-4 p-6 rounded-xl bg-gray-900">

/* ✅ OBLIGATOIRE — classes CSS sémantiques via globals.css */
<div className="track-card">
```

**Pourquoi** : l'espace public utilise des variables CSS HSL dans `globals.css`. Tailwind CSS est réservé au dashboard (`dashboard.css`). Mélanger les deux systèmes casse le thème light/dark et rend les variables CSS inutilisables sur les classes Tailwind.

---

*Ce fichier est une liste vivante. Quand un bug de layout récurrent est identifié et corrigé, ajouter l'anti-pattern ici pour que tous les agents l'évitent à l'avenir.*
