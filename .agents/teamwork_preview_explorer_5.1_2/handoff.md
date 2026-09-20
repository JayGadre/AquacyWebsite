# Handoff Report: Milestone 5.1 (SEO & Meta)

## 1. Observation
- `src/app/layout.tsx` (Lines 12-24): Exports `metadata` object with title, description, `metadataBase: new URL("https://www.aquacy.in")`, and `openGraph` tags. However, `openGraph` lacks an `images` array.
- **Pages**: All main public-facing pages (`src/app/page.tsx`, `about-us/page.tsx`, `catalog/page.tsx`, `contact/page.tsx`, `communication-modules/page.tsx`, `instruments/page.tsx`, `systems-monitoring/page.tsx`) explicitly export a `metadata` constant containing `title`, `description`, `keywords`, `alternates.canonical`, and `openGraph`.
- **Dynamic Product Pages**: `src/app/product/[id]/page.tsx` correctly uses `generateMetadata()` to dynamically populate metadata including `title`, `description`, and `openGraph.images` from `products.json`.
- **Admin Section**: `src/app/admin/layout.tsx` exports `metadata = { robots: { index: false, follow: false } }`, which appropriately prevents indexing of all admin routes.
- **Domain Discrepancy**:
  - Codebase pages use the base domain `https://www.aquacy.in` for `openGraph.url` and `metadataBase`.
  - `public/robots.txt` (Line 6) points to `Sitemap: https://www.aquacyindia.com/sitemap.xml`.
  - `public/sitemap.xml` uses `<loc>https://www.aquacyindia.com/...` instead of `https://www.aquacy.in/`.
- **Sitemap Completeness**: `public/sitemap.xml` is a static file that includes hardcoded links for some products, but completely misses newly discovered static pages like `/communication-modules`, `/instruments`, and `/systems-monitoring`. 

## 2. Logic Chain
1. Since `layout.tsx` sets `metadataBase` to `https://www.aquacy.in`, Next.js correctly resolves relative paths (like `alternates.canonical`) for all subpages.
2. The manual export of `metadata` across all frontend pages ensures basic SEO tags (titles, descriptions, OG types) are present as required.
3. The lack of a default OpenGraph image in `layout.tsx` means pages without specific OG images (most static pages) won't show image previews when shared on social media.
4. The hardcoded domain `aquacyindia.com` in `robots.txt` and `sitemap.xml` contradicts the site's apparent primary domain `aquacy.in`, risking search console errors and canonical mismatch penalties.
5. The static XML sitemap is outdated, missing several product categories and routing paths. Moving to Next.js dynamic routing conventions will prevent desyncs in the future.

## 3. Caveats
- I did not verify if the domain `aquacyindia.com` is an old domain that is supposed to redirect to `aquacy.in` or vice-versa. The codebase overwhelmingly prefers `aquacy.in`.
- I have not generated image assets (like `opengraph-image.png`). The strategy relies on adding image references assuming assets can be provided.

## 4. Conclusion
The codebase already implements excellent foundational SEO using Next.js 13+ App Router conventions (`export const metadata`), including proper JSON-LD snippets. However, three critical issues need fixing:
1. **Domain Mismatch & Static Sitemap**: `public/robots.txt` and `public/sitemap.xml` need to be replaced with Next.js dynamic files (`src/app/robots.ts` and `src/app/sitemap.ts`). The sitemap should programmatically map over `products.json` and static paths, ensuring all URLs correctly use `https://www.aquacy.in`.
2. **Missing Global OpenGraph Image**: Add a fallback `images` array in `src/app/layout.tsx`'s `openGraph` object or place a generic `opengraph-image.png` in `src/app/` to ensure all standard pages have a share preview.
3. **Type Consistency**: `src/app/communication-modules/page.tsx`, `instruments/page.tsx`, and `systems-monitoring/page.tsx` should explicitly import and declare the `Metadata` type for their `export const metadata` declarations.

## 5. Verification Method
1. **Sitemap & Robots**: Run `npm run build` and `npm run start`, then navigate to `/sitemap.xml` and `/robots.txt` locally to ensure the domains read `https://www.aquacy.in/...` and all products/pages are listed.
2. **Global OG Image**: Use a local meta-tag inspector or check the `<head>` of the built index page to ensure `<meta property="og:image" content="..." />` is injected.
3. **Admin Indexing**: Verify that navigating to `/admin` contains `<meta name="robots" content="noindex, nofollow" />`.
