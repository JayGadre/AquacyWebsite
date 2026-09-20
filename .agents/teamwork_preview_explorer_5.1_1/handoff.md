# Handoff: Milestone 5.1 SEO & Meta Investigation

## Observation
1. **Default Metadata (`src/app/layout.tsx`)**: Has `metadataBase: new URL("https://www.aquacy.in")`, `title`, `description`, and `openGraph`. However, it lacks a default `og:image` and `twitter` card configuration.
2. **Page-level Metadata**:
   - `page.tsx`, `about-us/page.tsx`, `catalog/page.tsx`, `contact/page.tsx` correctly implement `title`, `description`, `keywords`, `alternates.canonical`, and `openGraph`. However, they all omit OpenGraph images and Twitter cards.
   - `product/[id]/page.tsx` uses `generateMetadata` and successfully includes `openGraph.images` mapped to the specific product image.
   - `communication-modules/page.tsx`, `instruments/page.tsx`, and `systems-monitoring/page.tsx` export a raw `metadata` object. They are missing the explicit `Metadata` type from Next.js, and like the others, lack `og:image` and `twitter` info.
3. **Admin Area**: `src/app/admin/layout.tsx` correctly sets `robots: { index: false, follow: false }`.
4. **Static SEO Assets (`public/sitemap.xml`, `public/robots.txt`)**: 
   - **Critical Mismatch**: Both files hardcode the domain as `https://www.aquacyindia.com`, contradicting the application code which uses `https://www.aquacy.in`.
   - `public/sitemap.xml` is static and does not include the newer category pages (`/communication-modules`, `/instruments`, `/systems-monitoring`).

## Logic Chain
1. Without a default `og:image` and `twitter` card configuration in `layout.tsx`, social shares for non-product pages will lack visual rich previews.
2. The `metadata` exports in `communication-modules`, `instruments`, and `systems-monitoring` should be explicitly typed as `Metadata` to maintain codebase consistency and type safety.
3. The domain mismatch between `sitemap.xml` / `robots.txt` (`aquacyindia.com`) and the app metadata (`aquacy.in`) will cause search engine canonicalization errors and indexing issues.
4. Managing `sitemap.xml` statically in a Next.js App Router project is error-prone. Migrating these to dynamic Next.js files (`app/sitemap.ts` and `app/robots.ts`) will resolve the domain mismatch, automatically include all required routes, and prevent future drift.

## Proposed Strategy
1. **Update `src/app/layout.tsx`**: Add a default `og:image` (e.g., mapping to `/aquacy_logo.png`) and `twitter: { card: 'summary_large_image' }` to the global `metadata` object.
2. **Type Annotations**: Import and apply `Metadata` type to the `metadata` export in `src/app/communication-modules/page.tsx`, `src/app/instruments/page.tsx`, and `src/app/systems-monitoring/page.tsx`.
3. **Dynamic SEO Generation**:
   - Delete `public/sitemap.xml` and `public/robots.txt`.
   - Create `src/app/sitemap.ts` that dynamically maps all static routes (including the 3 new category pages) and product data routes to `<url>` entries, strictly using the `https://www.aquacy.in` domain.
   - Create `src/app/robots.ts` pointing to `https://www.aquacy.in/sitemap.xml` and disallowing `/admin` and `/api/`.

## Caveats
- I assumed `https://www.aquacy.in` is the intended primary domain since it is heavily referenced inside the Next.js `metadataBase` and `openGraph.url` logic in the source code. If `aquacyindia.com` is correct, the `layout.tsx` and all `page.tsx` canonicals need to be rewritten instead.
- We rely on `aquacy_logo.png` being a valid image for social sharing since it is the only logo present in `public/`.

## Conclusion
The application has a strong base for SEO metadata, but suffers from a critical domain mismatch in static assets, missing social preview configurations, and missing Next.js TypeScript typings on a few newer pages. Migrating to dynamic `sitemap.ts` / `robots.ts` and consolidating the global metadata in `layout.tsx` is the most robust way to address these issues.

## Verification Method
1. After implementation, run `npm run build` to verify there are no TypeScript errors regarding the `Metadata` interface.
2. Start the dev server (`npm run dev`) and visit `/sitemap.xml` to ensure all URLs correctly output the `https://www.aquacy.in` domain and include the newer routes.
3. Check `<head>` output of the homepage and `/about-us` to verify the presence of `og:image` and `twitter:card`.
