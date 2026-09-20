# Project: Aquacy New Website

## Architecture
- **Next.js 16/19 application** with Tailwind CSS and glassmorphism styling in `globals.css`.
- Pages: Homepage, Catalog, Product Details, About Us, Contact.
- Shared Components: Sidebar/Header, Footer, Glass cards, Buttons.
- Global styles defined in `src/app/globals.css`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Shared Components | Review & refine Sidebar, layout.tsx, Header/Footer. Ensure glassmorphism theme and responsive design applied to shell | none | DONE |
| 2 | Homepage Redesign | Redesign `src/app/page.tsx` with glassmorphism, responsive sections, actual content, no horizontal overflow | M1 | DONE |
| 3 | Catalog & Product Pages | Redesign `src/app/catalog/page.tsx` and `src/app/product/[id]/page.tsx` (if exists). Apply glassmorphism product grids and filters | M1 | DONE |
| 4 | About Us & Contact | Redesign `src/app/about-us/page.tsx` and `src/app/contact/page.tsx`. Include forms and correct data | M1 | DONE |
| 5 | SEO & Final Validation | Run Next.js build, fix all issues, ensure technical SEO, a11y, performance. Pass 100% checks | M2, M3, M4 | DONE |
| 6 | E2E Tests & Hardening | Pass 100% of E2E test suite (Tiers 1-4) sequentially, followed by Tier 5 Adversarial Hardening. | M5 | IN_PROGRESS |

## Code Layout
- Root: `package.json`, `next.config.ts`, `ORIGINAL_REQUEST.md`
- Source: `src/app/...`
- Components: `src/components/...`
- Global CSS: `src/app/globals.css`
