// Every example page on the site. The nav menus, home page cards, and next/previous links are built from these lists.
// To add a page: add an entry here, then add its folder in pages/layouts/ or pages/styles/

const layouts = [
  {
    id: "one-col",
    group: "1-Column",
    name: "1-Column (Stacked)",
    bestFor: "Phones and small screens",
    description: "Everything stacks in one column: header, main content, the two asides, then the footer. Nothing competes for side-by-side space, so small screens stay uncluttered."
  },
  {
    id: "two-col-right",
    group: "2-Column",
    name: "2-Column: Main Left, Aside Right",
    bestFor: "Tablets, medium screens, blogs",
    description: "A wide column for the main content and a thin column for extras like hours, sign-ups, or ads. This is the classic blog layout."
  },
  {
    id: "two-col-left",
    group: "2-Column",
    name: "2-Column: Aside Left, Main Right",
    bestFor: "Tablets, medium screens, docs sites",
    description: "Same idea as the blog layout, but flipped. Side navigation on the left is common on documentation and shopping sites."
  },
  {
    id: "three-col-center",
    group: "3-Column",
    name: "3-Column: Asides on Both Sides",
    bestFor: "Large desktop screens only",
    description: "Main content sits in the middle with an aside on each side. Many desktop users do not browse full screen, so this can get squeezed."
  },
  {
    id: "three-col-left",
    group: "3-Column",
    name: "3-Column: Both Asides Left",
    bestFor: "Large desktop screens only",
    description: "Two thin columns side by side on the left and the main content on the right."
  },
  {
    id: "three-col-right",
    group: "3-Column",
    name: "3-Column: Both Asides Right",
    bestFor: "Large desktop screens only",
    description: "Main content on the left and two thin columns side by side on the right."
  },
  {
    id: "mixed-main-top",
    group: "Mixed",
    name: "Mixed: Main on Top, Asides Below",
    bestFor: "Landing pages, product pages",
    description: "Main content takes the full width, then the two asides sit side by side underneath it."
  },
  {
    id: "mixed-aside-row",
    group: "Mixed",
    name: "Mixed: Aside Row Underneath",
    bestFor: "News and article pages",
    description: "Main content and one aside share the first row. The second aside stretches across the whole second row."
  },
  {
    id: "mixed-main-right",
    group: "Mixed",
    name: "Mixed: Tall Aside Left, Main Right",
    bestFor: "Dashboards, shopping filters",
    description: "One tall aside runs down the left side. Main content is on the right with the second aside tucked underneath it."
  },
  {
    id: "float-trap",
    group: "Real Site Tricks",
    name: "It's a Trap! Floating Asides",
    bestFor: "Art and portfolio sites",
    description: "Looks like 3 columns, but it is not. The asides float and the main content flows around them, like the MICA example on MDN."
  },
  {
    id: "overlap-header",
    group: "Real Site Tricks",
    name: "Overlapping Header",
    bestFor: "Brand and event sites",
    description: "A 2-column layout where the header sits on top of the main image, like the Opera de Paris example on MDN. The header and main content feel like one unit."
  }
];

const styles = [
  {
    id: "wireframe",
    name: "Wireframe",
    description: "The plan before the paint. Gray boxes, and X placeholders where the photos will go."
  },
  {
    id: "clean",
    name: "Clean and Modern",
    description: "Soft colors, one serif and one sans-serif font, and lots of space."
  },
  {
    id: "bold",
    name: "Bold and Colorful",
    description: "Big type, bright color blocks, and thick black outlines."
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Light text on a dark background."
  },
  {
    id: "high-contrast",
    name: "High Contrast",
    description: "Black, white, and yellow with large text and underlined links."
  },
  {
    id: "retro",
    name: "Retro 1998",
    description: "Inspired by websites from the late 1990s."
  },
  {
    id: "low-contrast",
    name: "Low Contrast",
    description: "Soft grays and thin text."
  },
  {
    id: "cluttered",
    name: "Cluttered",
    description: "Lots of fonts, colors, and boxes packed together."
  },
  {
    id: "rule-breaker",
    name: "Rule Breaker",
    description: "Something on this page is not where you expect it to be."
  }
];

// Screen sizes used by the Phone / Tablet / Desktop buttons and the mobile-first media queries in every -responsive.css file
const screens = [
  { id: "phone", name: "Phone", width: 390, height: 780, query: "base CSS, no query" },
  { id: "tablet", name: "Tablet", width: 768, height: 960, query: "min-width: 600px" },
  { id: "desktop", name: "Desktop", width: 1280, height: 820, query: "min-width: 1024px" }
];
