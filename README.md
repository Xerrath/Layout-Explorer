# Layout Explorer

A small website of example layouts and styles for West-MEC Coding Year 1.

Run it through a local server (VS Code Live Server, or `python -m http.server` in this folder) or GitHub Pages. The menu links point to folders (`pages/layouts/one-col/`), so opening `index.html` straight from the file system will not follow them.

## How each example works

Every example has its own folder:

```text
pages/layouts/two-col-right/
├── index.html                    ← the viewer page (Phone / Tablet / Desktop + Make it responsive)
├── demo.html                     ← the actual example website
├── two-col-right.css             ← the desktop layout
└── two-col-right-responsive.css  ← the media queries
```

The responsive file loads with `media="not all"` (off). "Make it responsive" reloads the example as `demo.html?responsive=1`, and `shared/js/demo.js` switches it on. The example runs in a frame that is really 390px, 768px, or 1280px wide, so the media queries fire for real.

Style pages (`pages/styles/`) all reuse the 2-column layout and add one style file.

## Show wireframe

Every layout page has a **Show wireframe** switch. It works the same way as responsive: `demo.html?wireframe=1` turns on `shared/css/wireframe.css`. Gray is what the user can see. Light red dashed boxes are the invisible containers that line things up (`.site`, `.site-brand`, `.site-nav-list`, `.main-hero`, `.menu-cards`, `.menu-card`, `.hours-list li`, `.signup-form`). If you add a new container to the example HTML, add its class to the red list in `wireframe.css`. The Wireframe page under Styles uses the same file.

## Screen sizes (mobile first)

Each `-responsive.css` file is written mobile first: the phone layout is plain CSS with no media query, then `min-width` queries add columns. With "Make it responsive" OFF, only the desktop file (`<id>.css`) loads, so students can see a desktop layout break on a phone. With it ON, the responsive file rebuilds the page mobile first, and the desktop view matches the OFF view exactly.

| Screen | Width | Media query |
|---|---|---|
| Phone | up to 599px | none, this is the base CSS |
| Tablet | 600px and up | `@media (min-width: 600px)` |
| Desktop | 1024px and up | `@media (min-width: 1024px)` |

## Adding a page

1. Copy an existing example folder and rename it and its CSS files.
2. Update the `<link>` tags in its `demo.html`, and `data-id` on the `<body>` of its `index.html`.
3. Add an entry to `layouts` or `styles` in `shared/js/data.js`. The nav menus, home page cards, and previous / next links update from that list.
4. Optional: add a thumbnail at `assets/images/thumbs/layouts-<id>.jpg` (or `styles-<id>.jpg`), 640 x 400. Cards without one still work.

## Shared files

- `shared/css/global.css`: the site around the examples (header, menus, viewer)
- `shared/css/demo.css`: the shared look of the example coffee shop website
- `shared/js/data.js`: the list of pages and screen sizes
- `shared/js/navbar.js`: header menus and previous / next links
- `shared/js/viewer.js`: Phone / Tablet / Desktop and Make it responsive
- `shared/js/demo.js`: runs inside each example

`assets/images/mug.jpg` and `shop.jpg` are spare photos not used yet.

Photos from Unsplash: Karl Fredrickson, Daniel Ruswick, Carli Jean, Shyamanta Baruah, Vee O, Sonja Langford, Clark Street Mercantile, sergee bee, Matthew Wiebe.
