# AGENTS

## Project context
- Project type: static marketing website for Berliner Kebab Paris.
- Stack: Next.js (App Router), Tailwind CSS, GSAP.
- Language: French.

## Technical constraints
- Keep the site static-export friendly.
- Do not add server-only features (database, API routes, server actions requiring runtime state).
- Prefer simple, reusable React components in `components/`.
- Prefer Tailwind utility classes for styling whenever possible.
- Keep custom CSS minimal and limited to global tokens, local fonts, and non-trivial animations.
- Keep routes under `app/` for:
  - `/`
  - `/menu`
  - `/faq`
  - `/mentions-legales`
  - `/politique-confidentialite`

## Build and export
- Static export is enabled in `next.config.ts` with `output: "export"`.
- Production build output must be generated in `out/`.
- Root HTML entry point should be `out/index.html`.

## Content integration workflow
- Start with placeholders.
- Replace with final Figma-based content once assets are provided.
- Fonts and images should be integrated from local project files.

## Current design tokens
- Primary color: `#A74C17`
- Secondary color: `#E7CEA0`
- Paragraph text color: `#421800`
- Brand font (local): `public/assets/fonts/e7d21c0fe0214c0e242e4a757f373782.ttf`
- Body paragraph font: Montserrat regular

## Navigation behavior
- Navbar uses a burger-only trigger (no text label).
- Burger opens a floating expandable menu panel (not full-screen), anchored near the top.
- Menu open/close motion should use smooth GSAP timing (height-driven reveal + staggered items).
- Keep logo and burger/cross visible while overlay is open.
- On short viewports, menu content must scroll inside the panel.
- Hide inner menu scrollbar visually and avoid layout shifts from page scrollbar.
- Keep social icons (Instagram/TikTok) in the menu under FAQ.
- Keep city times (Paris, Berlin, Istanbul) visible in the menu bottom area.

## Menu links (current)
- Links order: `Accueil`, `Menu`, `Livraison`, `Horaires & accès`, `FAQ`.
- `Livraison` opens a small cream popup card with buttons for Uber Eats and Deliveroo.

## Dev workflow preferences
- Do not run `build` and `lint` after every small edit.
- Run `build`/`lint` only when explicitly requested, or at milestone checkpoints.

## Quality bar
- Keep responsive behavior clean on mobile and desktop.
- Keep animations tasteful and performant.
- Preserve accessibility basics (semantic markup, visible focus, alt text).
