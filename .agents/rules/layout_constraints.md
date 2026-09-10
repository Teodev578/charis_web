# Layout & Responsivité — Invariants transversaux

Ces règles s'appliquent à tous les agents de l'équipe Charis Nation qui produisent du CSS ou des composants React avec du style. Aucune exception sans justification documentée dans un commentaire.

---

## Overflow et texte variable

- Jamais de largeur fixe en `px` sur un conteneur texte. Utiliser `max-width` + `width: 100%`.
- Tout texte dynamique (titres de messages, noms d'orateurs, descriptions de séries) porte soit :
  - `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` — pour les textes sur une ligne.
  - `overflow-wrap: break-word` — pour les blocs de texte multi-lignes.
- Jamais de `height` fixe sur un conteneur qui peut recevoir du texte variable. Utiliser `min-height` si un plancher est nécessaire.
- Jamais de `overflow: hidden` posé pour *masquer* un débordement sans comprendre et documenter sa cause.

## Responsivité — mobile-first

- Mobile-first obligatoire. Les styles de base ciblent le mobile, les breakpoints (`min-width`) ajoutent des adaptations pour les écrans plus larges. Ne jamais inverser.
- Tester systématiquement à trois points de rupture avant de déclarer terminé :
  - 375 px — iPhone SE (cas le plus contraint)
  - 768 px — tablette portrait
  - 1280 px — desktop standard

## Grilles et Flexbox

- Les grilles CSS utilisent `minmax(0, 1fr)` et non `1fr` seul. `1fr` seul ne contraint pas la taille minimale des enfants et provoque des débordements sur les contenus flex/grid imbriqués.
- `gap` est préféré à `margin` pour l'espacement interne des grilles et flex. `margin` sur les enfants crée des effets de bord imprévisibles selon le contexte parent.
- Jamais de `position: absolute` sans que le parent direct ait `position: relative` explicite et documenté.

## Éléments flottants et positionnement fixe

Ces règles concernent principalement `AudioPlayer` mais s'appliquent à tout élément en `position: fixed` ou `position: sticky`.

- `position: fixed` avec `bottom`, `left`, `right` explicites. Jamais `left: 0; width: 100%` sans `box-sizing: border-box`.
- Le layout racine de l'espace public doit réserver un `padding-bottom` égal à la hauteur du lecteur flottant pour éviter que le contenu de la page passe sous l'AudioPlayer.
- Sur mobile, le clavier virtuel remonte les éléments `fixed`. Le layout principal utilise `height: 100dvh` (dynamic viewport height), pas `100vh`, pour absorber ce comportement.
- Sur iOS Safari : les éléments fixes en bas portent `padding-bottom: env(safe-area-inset-bottom)` pour respecter la zone de sécurité de l'encoche.

## Ce qu'on ne fait pas

- Jamais de style inline (`style={{}}`) dans un composant React pour des valeurs de layout. Tout passe par les variables CSS de `globals.css`.
- Jamais de valeur de couleur, d'espacement ou de taille hardcodée hors du fichier de thème.
- Jamais de règle CSS ajoutée "pour voir" sans comprendre son effet sur le reste du design system.

---

## Checklist de validation visuelle — obligatoire avant de déclarer terminé

Tout composant ou page UI produit par un agent doit passer cette checklist. La passer mentalement ne suffit pas — simuler chaque cas.

### Viewports à tester

| Viewport | Largeur | Représente |
|---|---|---|
| Mobile S | 375 px | iPhone SE — cas le plus contraint |
| Mobile L | 430 px | iPhone 14 Pro Max |
| Tablet | 768 px | iPad portrait |
| Desktop | 1280 px | Laptop standard |
| Wide | 1440 px | Desktop large |

### Cas de contenu à tester

**Texte court** : vérifier que les éléments ne sont pas étirés ou mal alignés quand le contenu est court.

**Texte très long** : injecter un titre fictif de 80+ caractères. Le texte doit être tronqué (`ellipsis`) ou coupé (`line-clamp`). Il ne doit *jamais* déborder du conteneur ni pousser un élément adjacent hors de son slot.

**Contenu vide** : tester le composant sans données (liste vide, image manquante, description absente). L'interface ne doit pas s'effondrer — prévoir un état vide ou des valeurs par défaut.

**Dark mode** : basculer le thème. Vérifier que les textes restent lisibles et qu'aucun élément n'a une couleur hardcodée qui disparaît dans le thème sombre.

### Vérifications structurelles

- [ ] Aucune scrollbar horizontale apparaît à aucun viewport.
- [ ] Le contenu de la page ne passe pas sous l'`AudioPlayer` quand un message est actif.
- [ ] Le `Header` ne masque pas le début du contenu sur les pages avec ancre ou scroll.
- [ ] Les images gardent leur ratio et ne se déforment pas entre viewports.
- [ ] La sidebar (sur mobile) s'ouvre et se ferme sans créer de scroll horizontal sur le body.
- [ ] Les éléments `position: fixed` restent dans les limites du viewport sur iOS Safari.

### Références obligatoires

Avant d'écrire du CSS de layout, consulter :
- `ui_patterns.md` — modèles à suivre (grille, liste, app shell, player, image)
- `ui_forbidden.md` — anti-patterns à éviter (10 erreurs nommées avec corrections)

---

*Ces invariants complètent les règles de style définies dans `globals.css` et les conventions de l'`AGENTS.md`.*
