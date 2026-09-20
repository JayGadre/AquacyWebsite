# SEO & Meta Implementation Handoff

## 1. Observation
The project is built with Next.js 16 (App Router). Metadata is configured in `src/app/layout.tsx` and individually in page files via `export const metadata: Metadata` or `export async function generateMetadata`.

While `src/app/about-us/page.tsx` is highly comprehensive with canonical URLs, OpenGraph, keywords, and JSON-LD, the rest of the pages are inconsistent. 

**Observations by file:**
- `src/app/page.tsx`: Missing `alternates.canonical` and explicit `openGraph` block (relies solely on layout inheritance).
- `src/app/catalog/page.tsx`: Missing `alternates.canonical` and `openGraph.url`.
- `src/app/communication-modules/page.tsx`: Only has basic `title` and `description`. Missing `Metadata` typing, `alternates`, `openGraph`, and JSON-LD.
- `src/app/contact/page.tsx`: Missing `alternates.canonical`, `openGraph.url`, and JSON-LD.
- `src/app/instruments/page.tsx`: Only has basic `title` and `description`. Missing `Metadata` typing, `alternates`, `openGraph`, and JSON-LD.
- `src/app/systems-monitoring/page.tsx`: Only has basic `title` and `description`. Missing `Metadata` typing, `alternates`, `openGraph`, and JSON-LD.
- `src/app/product/[id]/page.tsx`: Missing `alternates.canonical` and `openGraph.url`. Additionally, hardcodes `https://www.aquacyindia.com` for images, whereas the main canonical domain in `layout.tsx` is `https://www.aquacy.in`.

## 2. Logic Chain
To achieve comprehensive SEO meta tags across all main pages:
1. Every main page must export a strongly typed `Metadata` object.
2. Every main page must explicitly define `alternates.canonical` to avoid duplicate content issues.
3. Every main page must explicitly define `openGraph.url` mirroring the canonical URL for consistent social sharing.
4. JSON-LD should be injected into pages where applicable (e.g. `ContactPage` for `/contact`, `CollectionPage` or `ItemList` for product category pages).
5. Hardcoded domain names like `aquacyindia.com` in `product/[id]/page.tsx` should be standardized to `aquacy.in` or use relative paths since `metadataBase: new URL("https://www.aquacy.in")` is defined in `layout.tsx`.

## 3. Caveats
- `src/app/admin` and `src/app/api` were intentionally skipped as they do not require public SEO tags.
- While `layout.tsx` defines a base OpenGraph object, Next.js metadata merging is shallow for OpenGraph. It is best practice to re-define `title`, `description`, and `url` within `openGraph` in child pages to ensure they are picked up correctly if overridden.
- The domain `aquacyindia.com` was found in `product/[id]/page.tsx`. I am assuming `aquacy.in` is the correct one based on `layout.tsx` and `page.tsx` configuration.

## 4. Conclusion
The worker agent needs to update the `metadata` exports and add JSON-LD schemas in the aforementioned `src/app/*` files. 

**Actionable Steps for Worker:**
1. **`src/app/page.tsx`**: Add `alternates: { canonical: "/" }` and duplicate `title`/`description` into an `openGraph` object with `url: "https://www.aquacy.in"`.
2. **`src/app/catalog/page.tsx`**: Add `alternates: { canonical: "/catalog" }` and `url: "https://www.aquacy.in/catalog"` to `openGraph`.
3. **`src/app/contact/page.tsx`**: Add `alternates: { canonical: "/contact" }` and `url: "https://www.aquacy.in/contact"` to `openGraph`. Add a JSON-LD script for `ContactPage`.
4. **`src/app/communication-modules/page.tsx`**, **`src/app/instruments/page.tsx`**, **`src/app/systems-monitoring/page.tsx`**: 
   - Import `Metadata` from `next`.
   - Update `export const metadata: Metadata = { ... }`.
   - Add canonical URLs (e.g. `/instruments`).
   - Add full `openGraph` blocks (title, description, url).
   - Add a basic JSON-LD script for `CollectionPage` or `ItemList` (similar to catalog).
5. **`src/app/product/[id]/page.tsx`**: 
   - In `generateMetadata`, add `alternates: { canonical: \`/product/\${product.id}\` }` and `url: \`https://www.aquacy.in/product/\${product.id}\`` to `openGraph`.
   - Change `https://www.aquacyindia.com` to `https://www.aquacy.in` (or use relative paths `/products/...`) in both `generateMetadata` and `jsonLd`.

## 5. Verification Method
1. Run `npm run lint` or `npm run build` to ensure no TypeScript/Metadata errors were introduced.
2. Inspect the generated `<head>` in `npm run dev` or by reviewing source code, ensuring `rel="canonical"`, `og:url`, and `application/ld+json` exist correctly on all main routes.
