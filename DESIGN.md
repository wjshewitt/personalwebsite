# DESIGN.md

> Superseded. This describes the earlier centred typographic direction. The live site is the ocean landing page in `src/pages/OceanPage.tsx`; see `AGENTS.md`.

## Design direction

This site is a centred, typographic personal website for Will Hewitt.

The design should feel editorial, technical, restrained, precise, calm, lightweight, readable, and slightly old-web/manual-adjacent, without becoming theatrical.

The site should not feel like a generic SaaS portfolio, a startup landing page, a personal brand splash page, or an over-styled art project.

The distinctive quality comes from typography, spacing, alignment, small blue interface details, thin rules, structured lists, a subtle grid/paper texture, and a disciplined content width.

The prose should remain plain and direct. Do not make the copy perform the aesthetic.

## Reference image

The visual direction is based on the approved homepage render:

- centred single-column page
- large pixel-style blue wordmark
- warm off-white background
- faint dotted grid texture
- serif body copy
- mono labels and navigation
- cobalt blue accents
- thin horizontal rules
- index-like lists
- restrained footer
- no large illustrations
- no heavy animation

The site should look like a highly designed personal index rather than a conventional portfolio.

## Core principles

### 1. Centred, not sprawling

The site should use a narrow centred content column.

Recommended max width:

```css
--site-width: 820px;
```

The page should have generous horizontal whitespace on desktop. The content should feel deliberately placed, not merely constrained.

### 2. Typography first

The visual identity depends more on type than imagery.

Use:

- a pixel/modular display treatment for the main wordmark
- a readable serif for body copy
- a mono or technical sans for labels, metadata, nav, numbers, and small UI details

Avoid overusing the pixel style. It should mostly be reserved for the main wordmark and potentially tiny accents.

### 3. Plain language

The copy should be simple and normal.

Good:

> I work on software, editorial products, analytics tools, and writing.

Bad:

> A living field manual for unfinished systems, institutions, and useful machinery.

The design can be unusual. The language should not be.

### 4. No illustration dependency

The site should not rely on large images, isometric drawings, or ornamental hero graphics.

Small functional details are fine:

- blue square bullets
- tiny arrows
- section numbers
- dotted dividers
- thin rules
- small footer mark

But the site should remain fully expressive as a typographic system.

### 5. Quiet precision

Every element should feel placed. Avoid casual spacing, inconsistent row heights, or arbitrary decoration.

The site should have a strong invisible grid.

## Page structure

The homepage should follow this structure:

```text
WILL HEWITT

I work on software, editorial products, analytics tools, and writing.
Currently at Works in Progress.

PROJECTS    WRITING    NOTES    ABOUT    CONTACT

────────────────────────────────────────

■ ABOUT

Body copy

────────────────────────────────────────

■ SELECTED WORK

01   WipHub                 Workflow and analytics tooling for editorial teams.              →
02   Editorial tools        Small internal systems for editing, planning, and publishing.     →
03   Brunel Prize website   A website and visual system for a data-centre design competition. →
04   Essays                 Writing on software, media, institutions, and infrastructure.     →

────────────────────────────────────────

■ RECENT WRITING

2026   The binarisation of modern life             →
2026   Why dashboards usually fail                 →
2025   Software as institutional memory            →
2025   Notes on useful internal tools              →

────────────────────────────────────────

■ CONTACT

Email / LinkedIn / GitHub / X

────────────────────────────────────────

© 2026 Will Hewitt                         Last updated: May 2026
```

## Layout

### Site shell

The page should be vertically centred near the top of the viewport, not exactly middle-screen.

Suggested desktop values:

```css
body {
  min-height: 100vh;
}

.site {
  max-width: var(--site-width);
  margin-inline: auto;
  padding: 56px 24px 40px;
}
```

The content column should be visually centred. Avoid sidebars on the homepage.

### Section rhythm

Sections should be separated by fine horizontal rules.

Approximate vertical spacing:

```css
.header {
  margin-bottom: 28px;
}

.section {
  padding: 22px 0 24px;
  border-top: 1px solid var(--rule);
}

.footer {
  border-top: 1px solid var(--rule);
  padding-top: 14px;
  margin-top: 10px;
}
```

The approved render has a compact but not cramped rhythm. Avoid large marketing-site spacing.

### Section layout

Each section label should sit above the content or slightly inset from the left edge.

Recommended pattern:

```html
<section class="section">
  <h2 class="section-label">
    <span class="section-marker" aria-hidden="true"></span>
    About
  </h2>
  <div class="section-body">
    ...
  </div>
</section>
```

For list-heavy sections, rows should use a grid.

Example:

```css
.index-row {
  display: grid;
  grid-template-columns: 56px minmax(120px, 180px) 1fr 24px;
  gap: 16px;
  align-items: baseline;
}
```

On mobile, collapse this into a simpler stacked layout.

## Colour system

The palette should be minimal.

Use warm paper tones, charcoal text, pale rules, and a strong cobalt accent.

Recommended CSS variables:

```css
:root {
  --color-bg: #f8f6ef;
  --color-bg-soft: #fbfaf5;
  --color-text: #171b1f;
  --color-muted: #5f6872;
  --color-faint: #8a929a;

  --color-blue: #2457ff;
  --color-blue-dark: #1740d6;
  --color-rule: #d8d4c8;
  --color-rule-soft: #e6e1d7;

  --color-grid: rgba(36, 87, 255, 0.055);
}
```

### Blue

The blue should be saturated and slightly electric. It is used for:

- wordmark
- nav links
- section markers
- section labels
- row numbers
- dates
- arrows
- text links
- tiny footer mark

Do not use blue for large filled areas. It should remain a fine accent.

### Background

The background should be warm off-white, not pure white.

Avoid grey SaaS backgrounds. Avoid beige so dark that it looks nostalgic or parchment-like.

### Rules

Rules should be visible but quiet.

Use:

```css
border-color: var(--color-rule);
```

For row dividers:

```css
border-color: var(--color-rule-soft);
```

## Background texture

The page should have a faint dotted or technical grid texture.

It must be subtle. It should be noticeable only after looking for a moment.

Example:

```css
body {
  background-color: var(--color-bg);
  background-image:
    radial-gradient(var(--color-grid) 0.7px, transparent 0.7px);
  background-size: 8px 8px;
}
```

Keep contrast low. The grid should not interfere with reading.

Avoid heavy graph paper, strong blueprint grids, or decorative noise.

## Typography

### Wordmark

The wordmark should read:

```text
WILL HEWITT
```

It should be centred, uppercase, blue, pixel/modular/bitmap-like, large, and the dominant visual element.

Approximate desktop styling:

```css
.wordmark {
  color: var(--color-blue);
  font-family: var(--font-pixel);
  font-size: clamp(48px, 6vw, 78px);
  line-height: 0.95;
  letter-spacing: 0.08em;
  text-align: center;
  margin: 0 0 14px;
}
```

If a suitable pixel font is not available, create a CSS/SVG wordmark or use a mono fallback temporarily.

Possible approaches:

1. Use a local pixel font.
2. Render the wordmark as SVG.
3. Use a heavy mono fallback during development.

Do not use a generic futuristic display font.

### Body copy

Body text should be serif.

Recommended options:

- Source Serif 4
- Charter
- Georgia
- Literata
- Tiempos-style equivalent if licensed
- Lyon-style equivalent if licensed

Approximate body styling:

```css
body {
  font-family: var(--font-serif);
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-text);
}
```

The body copy should feel literary and readable, not corporate.

### Mono labels

Navigation, section labels, dates, numbers, metadata, and arrows should use mono or a technical sans.

Recommended options:

- IBM Plex Mono
- JetBrains Mono
- Berkeley Mono if available
- GT America Mono-style equivalent if licensed

Example:

```css
.nav,
.section-label,
.index-number,
.index-date,
.index-arrow {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

### Font sizing

Suggested scale:

```css
--text-xs: 11px;
--text-sm: 13px;
--text-base: 16px;
--text-md: 18px;
--text-lg: 22px;
--text-wordmark: clamp(48px, 6vw, 78px);
```

Use restraint. Avoid too many type sizes.

## Header

The header is centred and compact.

Structure:

```html
<header class="site-header">
  <h1 class="wordmark">Will Hewitt</h1>
  <p class="intro">
    I work on software, editorial products, analytics tools, and writing.
    <br />
    Currently at Works in Progress.
  </p>
  <nav class="site-nav">
    ...
  </nav>
</header>
```

### Intro

The intro should be serif, centred, and smaller than the wordmark.

```css
.intro {
  max-width: 620px;
  margin: 0 auto;
  text-align: center;
  font-size: var(--text-base);
  line-height: 1.45;
}
```

### Navigation

Nav should be small, blue, mono, uppercase, and spaced evenly.

```css
.site-nav {
  display: flex;
  justify-content: center;
  gap: 34px;
  margin-top: 22px;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  text-transform: uppercase;
}
```

Links should have subtle hover states.

```css
a {
  color: var(--color-blue);
  text-decoration: none;
}

a:hover {
  color: var(--color-blue-dark);
}
```

Do not use button-like nav pills.

## Sections

### Section labels

Section labels should be small, blue, uppercase, mono, and preceded by a tiny blue square.

Example:

```css
.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-blue);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 18px;
}

.section-marker {
  width: 5px;
  height: 5px;
  background: var(--color-blue);
  display: inline-block;
}
```

The marker should be square, not a bullet circle.

### About section

The About section should contain two short paragraphs.

Text:

```text
I work at Works in Progress, where I build software and tools for editorial, analytics, and operations. I’m interested in useful interfaces, clear systems, infrastructure, and the ways institutions use software.

Most of my work sits at the intersection of software and publishing. I care about products that are practical, legible, and built to last.
```

The paragraphs should be slightly indented from the section label, or aligned with the list body below.

Avoid making the about text too wide.

## Index rows

The Selected Work and Recent Writing sections should look like small indexes or tables.

### Selected work row

Columns:

1. number
2. title
3. description
4. arrow

Desktop example:

```css
.work-row {
  display: grid;
  grid-template-columns: 42px 160px 1fr 24px;
  gap: 14px;
  align-items: baseline;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-rule-soft);
}
```

The number and arrow should be blue.

```css
.index-number,
.index-arrow {
  color: var(--color-blue);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}
```

The title should be serif and slightly more prominent.

```css
.index-title {
  font-weight: 600;
}
```

The description should be smaller and calm.

```css
.index-description {
  font-size: var(--text-sm);
  color: var(--color-text);
}
```

### Recent writing row

Columns:

1. year
2. title
3. arrow

Example:

```css
.writing-row {
  display: grid;
  grid-template-columns: 72px 1fr 24px;
  gap: 18px;
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-rule-soft);
}
```

Years should be blue mono. Titles should be serif.

## Content

### Homepage copy

Use the following copy for the homepage unless deliberately revised.

#### Intro

```text
I work on software, editorial products, analytics tools, and writing.
Currently at Works in Progress.
```

#### About

```text
I work at Works in Progress, where I build software and tools for editorial, analytics, and operations. I’m interested in useful interfaces, clear systems, infrastructure, and the ways institutions use software.

Most of my work sits at the intersection of software and publishing. I care about products that are practical, legible, and built to last.
```

#### Selected work

```text
01 WipHub — Workflow and analytics tooling for editorial teams.
02 Editorial tools — Small internal systems for editing, planning, and publishing.
03 Brunel Prize website — A website and visual system for a data-centre design competition.
04 Essays — Writing on software, media, institutions, and infrastructure.
```

#### Recent writing

```text
2026 — The binarisation of modern life
2026 — Why dashboards usually fail
2025 — Software as institutional memory
2025 — Notes on useful internal tools
```

#### Contact

```text
Email / LinkedIn / GitHub / X
```

## Links and interaction

The site should feel mostly static. Interactions should be tiny and precise.

Allowed interactions:

- link colour darkens slightly on hover
- arrows move 2px to the right on hover
- row background very subtly changes on hover
- focus ring appears for keyboard navigation

Avoid:

- scroll animations
- parallax
- animated backgrounds
- large hover transforms
- page transition theatrics
- cursor effects

Example row hover:

```css
.index-row {
  transition: background-color 120ms ease;
}

.index-row:hover {
  background-color: rgba(36, 87, 255, 0.025);
}

.index-row:hover .index-arrow {
  transform: translateX(2px);
}

.index-arrow {
  transition: transform 120ms ease;
}
```

### Focus states

Accessible focus states are required.

```css
:focus-visible {
  outline: 2px solid var(--color-blue);
  outline-offset: 3px;
}
```

## Footer

The footer should be small, quiet, and aligned with the main content width.

Desktop:

- left: `© 2026 Will Hewitt`
- centre: tiny blue mark
- right: `Last updated: May 2026`

Example:

```css
.footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  font-size: var(--text-sm);
}

.footer-updated {
  justify-self: end;
}

.footer-mark {
  width: 5px;
  height: 5px;
  background: var(--color-blue);
  transform: rotate(45deg);
}
```

On mobile, stack or simplify.

## Responsive behaviour

### Desktop

- max width around 820px
- centred content
- wordmark large
- index rows use columns
- ample page margins

### Tablet

- maintain centred column
- slightly reduce wordmark size
- keep rows mostly tabular if space allows

### Mobile

- reduce top padding
- nav may wrap
- wordmark should scale down but remain prominent
- index rows should become simpler

Mobile row example:

```css
@media (max-width: 640px) {
  .site {
    padding: 36px 18px 28px;
  }

  .site-nav {
    flex-wrap: wrap;
    gap: 14px 22px;
  }

  .work-row {
    grid-template-columns: 36px 1fr 20px;
  }

  .work-row .index-description {
    grid-column: 2 / -1;
    margin-top: 2px;
  }

  .writing-row {
    grid-template-columns: 52px 1fr 20px;
  }
}
```

Avoid a mobile design that feels like a generic card stack.

## Accessibility

Requirements:

- semantic HTML
- one `h1`
- section headings should be real headings
- nav should be inside `<nav>`
- lists should use `<ul>` / `<li>` where appropriate
- link text should be meaningful
- keyboard focus should be visible
- colour contrast should be checked
- body text should not be below 15px
- avoid decorative elements that are read by screen readers

Decorative markers should use:

```html
<span aria-hidden="true" class="section-marker"></span>
```

## Performance

The site should be fast by default.

Guidelines:

- no heavy animation libraries
- no large image dependency
- no unnecessary client-side data fetching
- avoid webfont bloat
- prefer system or self-hosted fonts
- keep JavaScript minimal
- use static generation where possible

The homepage should feel instant.

## Implementation notes

### Suggested component structure

```text
src/
  components/
    SiteHeader.tsx
    SiteNav.tsx
    Section.tsx
    IndexRow.tsx
    WorkList.tsx
    WritingList.tsx
    SiteFooter.tsx
  styles/
    reset.css
    tokens.css
    base.css
    layout.css
    typography.css
    components.css
```

### Suggested data shape

```ts
export type WorkItem = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export type WritingItem = {
  year: string;
  title: string;
  href: string;
};
```

### Avoid premature abstraction

This is a small personal website. Do not overengineer the component system.

A few simple, well-named components are better than a full design system.

## What not to do

Do not add:

- Tailwind
- shadcn/ui
- Framer Motion
- Three.js
- scroll-jacking
- CMS dependencies
- large hero illustrations
- generic rounded SaaS cards
- gradients as the main identity
- fake terminal styling
- faux-manual or pseudo-archival copy
- unnecessary dark mode for v1
- background music, cursor trails, or other gimmicks

Do not make the site look like:

- a startup landing page
- a generic developer portfolio
- a Notion export
- a Linktree page
- a design agency homepage
- a brutalist meme site
- a nostalgic personal blog parody

## Quality bar

The finished site should feel deliberate, quiet, sharp, readable, lightweight, personal but not self-indulgent, and distinctive without being decorative.

A good test:

> If all colour were removed, the site should still look well-designed because of its spacing, alignment, typography, and structure.

Another good test:

> If the wordmark were removed, the page should still feel coherent and carefully designed.

## Future extensions

The design can later support:

- individual project pages
- writing pages
- notes index
- RSS feed
- small changelog
- colophon
- reading list
- selected links
- lightweight search

Future pages should inherit the same core system:

- centred column
- serif reading text
- mono metadata
- blue accents
- thin rules
- plain language
- restrained layout

Project pages may include screenshots or images, but they should be treated as documentary evidence, not decoration.

Writing pages should prioritise reading quality over layout novelty.

## Summary

This design is a centred personal index built from typography, spacing, fine rules, and blue technical accents.

It should be simple to maintain, fast to load, easy to read, and visually distinctive without relying on illustration or overwrought copy.

The site should feel like a polished editorial object, not a performance.
