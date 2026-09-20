# SEO & Meta Investigation Handoff Report

## Overview
This report outlines the implementation plan for adding comprehensive SEO meta tags across all main pages of the Aquacy website. The project uses the **Next.js App Router** (confirmed by the presence of `src/app` directory and `page.tsx` files). Thus, the Next.js `Metadata` API and JSON-LD scripts should be used rather than the legacy `<Head>` component.

## 1. Observation
- The project follows the Next.js App Router model with files located in `src/app/*`.
- `src/app/layout.tsx` (lines 12-27) exports a base `Metadata` object with `metadataBase: new URL("https://www.aquacy.in")` and a default canonical `alternates: { canonical: "/" }`.
- `src/app/page.tsx` contains some JSON-LD setup (`Organization` and `LocalBusiness`) but lacks `alternates.canonical` in its exported `Metadata` object to enforce its specific canonical structure. 
- Most other pages (`src/app/about-us/page.tsx`, `src/app/contact/page.tsx`, `src/app/catalog/page.tsx`, etc.) export a basic `Metadata` object but do **not** define `alternates: { canonical: '/pathname' }`. This causes them to inherit or miss explicit canonical URLs which can impact SEO.
- Dynamic routes like `src/app/product/[id]/page.tsx` (lines 14-35) use `generateMetadata` but lack the explicit definition of `alternates: { canonical: ... }` which is critical for product pages. The JSON-LD schema inside the dynamic product page uses a hardcoded URL string: `https://www.aquacyindia.com/products/${product.id}.png`, while the `metadataBase` in `layout.tsx` is set to `https://www.aquacy.in`.
- JSON-LD schemas exist on `page.tsx`, `product/[id]/page.tsx` and `catalog/page.tsx` but are completely absent on pages like `about-us/page.tsx`, `contact/page.tsx`, `instruments/page.tsx`, `systems-monitoring/page.tsx`, and `communication-modules/page.tsx`.
- OpenGraph (OG) properties are inconsistent across pages.

## 2. Logic Chain
- Because the project uses Next.js App Router, all SEO metadata must be provided via the `Metadata` export or `generateMetadata` function in the respective `page.tsx` or `layout.tsx` files.
- Setting explicit `alternates: { canonical: '/[route-path]' }` in each `page.tsx` will merge with the `metadataBase` defined in `layout.tsx` and output a correct absolute canonical URL (`https://www.aquacy.in/[route-path]`), preventing duplicate content issues.
- The inconsistencies in domain names within JSON-LD (`www.aquacyindia.com` vs `aquacyindia.com` vs `www.aquacy.in`) must be standardized to `https://www.aquacy.in` to match `metadataBase`.
- Adding JSON-LD for pages like `Contact` (using `ContactPage` schema) and `About Us` (using `AboutPage` schema) will provide structured context to search engines.
- Keywords can be added to the `Metadata` object for comprehensive on-page SEO targeting specific industry terms like "ultrasonic water meters, AMR, AMI, IoT water meters, ADM meters".

## 3. Caveats
- `metadataBase` is set to `https://www.aquacy.in`. If the production domain is supposed to be `aquacyindia.com`, this needs to be checked. For now, we will stick to `https://www.aquacy.in` as it is set in `layout.tsx` and is the base for canonical URLs.
- Admin pages (`src/app/admin`) should explicitly set `robots: { index: false, follow: false }` to prevent search engine indexing.

## 4. Conclusion & Actionable Next Steps
**For the Implementation Worker:**

1. **Update `src/app/layout.tsx`:**
   - Remove `alternates: { canonical: "/" }` from the root layout, as it's better to explicitly define it per-page or it can incorrectly cascade.

2. **Update all main `page.tsx` files:**
   Add/Update `Metadata` object in the following pages to include `keywords`, updated `openGraph`, and `alternates: { canonical: '/[path]' }`:
   - `src/app/page.tsx`: Add `alternates: { canonical: '/' }`, update JSON-LD URLs to standard domain.
   - `src/app/about-us/page.tsx`: Add `alternates: { canonical: '/about-us' }`, add `JSON-LD` (AboutPage).
   - `src/app/contact/page.tsx`: Add `alternates: { canonical: '/contact' }`, add `JSON-LD` (ContactPage).
   - `src/app/catalog/page.tsx`: Add `alternates: { canonical: '/catalog' }`, fix URL mismatch in `JSON-LD` to use `https://www.aquacy.in`.
   - `src/app/communication-modules/page.tsx`: Expand metadata with OG and `alternates: { canonical: '/communication-modules' }`. Add `JSON-LD` (ItemList or CollectionPage).
   - `src/app/instruments/page.tsx`: Expand metadata, add `alternates: { canonical: '/instruments' }`, add `JSON-LD`.
   - `src/app/systems-monitoring/page.tsx`: Expand metadata, add `alternates: { canonical: '/systems-monitoring' }`, add `JSON-LD`.
   
3. **Update Dynamic Routes (`src/app/product/[id]/page.tsx`):**
   - In `generateMetadata`, add `alternates: { canonical: \`/product/\${resolvedParams.id}\` }`.
   - In `ProductPage` component, fix the `jsonLd` URLs to use `https://www.aquacy.in/product/${product.id}` and `https://www.aquacy.in/products/${product.id}.png`.

4. **Add robots noindex to admin:**
   - In `src/app/admin/layout.tsx` or `page.tsx`, add `export const metadata: Metadata = { robots: { index: false, follow: false } };`.

## 5. Verification Method
- **Static Check**: Review `page.tsx` files using `view_file` to ensure `export const metadata` (or `generateMetadata`) includes the necessary fields (`title`, `description`, `alternates.canonical`, `openGraph`) and `<script type="application/ld+json">` tags.
- **Build Check**: Run `npm run build` from the project root to verify that the Next.js static generation succeeds without metadata type errors.
