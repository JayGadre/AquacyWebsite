# Handoff Report - Milestone 5.1 SEO Meta (Explorer 3)

## 1. Observation
- The project uses **Next.js App Router** (`src/app/`).
- `src/app/layout.tsx` sets `metadataBase: new URL("https://www.aquacy.in")` and a default `canonical: '/'`.
- `src/app/page.tsx` and `src/app/catalog/page.tsx` already export strongly typed `metadata` and inject `jsonLd`. However, they lack specific `alternates: { canonical: '...' }` at the page level.
- `src/app/about-us/page.tsx` and `src/app/contact/page.tsx` export typed `metadata` with `openGraph` but lack `canonical` URLs and `jsonLd` structured data.
- Sub-category pages (`communication-modules`, `instruments`, `systems-monitoring`) export loosely typed `metadata` without `Metadata` from `'next'`, lack `openGraph`, `canonical` URLs, and `jsonLd`.
- `src/app/product/[id]/page.tsx` has `generateMetadata` and `jsonLd`, but no `alternates: { canonical }` in the returned metadata object. Also, there's a domain inconsistency: `layout.tsx` uses `aquacy.in`, while `product/[id]/page.tsx` and `catalog/page.tsx` hardcode `aquacyindia.com` in their `jsonLd`.

## 2. Logic Chain
- To implement comprehensive SEO across all main pages using the Next.js App Router, we must rely on the **Metadata API** (`export const metadata: Metadata`) and inject **JSON-LD** (`<script type="application/ld+json">`).
- **Canonical URLs** must be set for each page. Because `layout.tsx` defines `metadataBase`, relative canonicals (like `'/about-us'`) will automatically resolve to absolute URLs (e.g., `https://www.aquacy.in/about-us`).
- **Semantic HTML (JSON-LD)** helps search engines understand the page content. We need:
  - `Organization` / `AboutPage` schema for About Us.
  - `LocalBusiness` / `ContactPage` schema for Contact.
  - `ItemList` schema for the sub-category pages listing products (similar to what is done in `catalog`).
- We need to standardize the domain in JSON-LD and OG metadata. Since `metadataBase` uses `https://www.aquacy.in`, it's safest to align hardcoded URLs to `https://www.aquacy.in` to avoid SEO penalties for conflicting domains.

## 3. Caveats
- The domain `aquacy.in` vs `aquacyindia.com` is used interchangeably in the codebase. I will propose sticking to `https://www.aquacy.in` to align with `layout.tsx` and avoid canonical mismatches.
- `communication-modules`, `instruments`, and `systems-monitoring` define their product lists directly in the component. We will need to map these arrays into the JSON-LD `ItemList` inside the component.

## 4. Conclusion & Action Plan
The Worker agent should execute the following file-by-file changes:

**1. `src/app/page.tsx`**
- Add `alternates: { canonical: '/' }` to `metadata`.

**2. `src/app/about-us/page.tsx`**
- Add `alternates: { canonical: '/about-us' }` to `metadata`.
- Create a `jsonLd` object of `@type: 'AboutPage'` or `'Organization'` and inject it via `<script type="application/ld+json">`.

**3. `src/app/contact/page.tsx`**
- Add `alternates: { canonical: '/contact' }` to `metadata`.
- Create a `jsonLd` object of `@type: 'ContactPage'` or `'LocalBusiness'` and inject it via `<script type="application/ld+json">`.

**4. `src/app/catalog/page.tsx`**
- Add `alternates: { canonical: '/catalog' }` to `metadata`.
- Update `jsonLd` URLs to use `https://www.aquacy.in/product/...` instead of `aquacyindia.com`.

**5. `src/app/communication-modules/page.tsx`**, **`src/app/instruments/page.tsx`**, **`src/app/systems-monitoring/page.tsx`**
- Import `Metadata` from `next`.
- Change `export const metadata = { ... }` to `export const metadata: Metadata = { ... }`.
- Add `openGraph` properties to `metadata`.
- Add `alternates: { canonical: '/<route-name>' }` to `metadata`.
- Create a `jsonLd` object of `@type: 'ItemList'` mapping the local `modules`/`products` array to `ListItem`s, and inject it in the return statement.

**6. `src/app/product/[id]/page.tsx`**
- In `generateMetadata`, add `alternates: { canonical: \`/product/\${product.id}\` }`.
- In both `generateMetadata` and `jsonLd`, replace `https://www.aquacyindia.com` with `https://www.aquacy.in`.

## 5. Verification Method
- **Static checks**: Run `npm run lint` or `npm run build` to verify Next.js Metadata API typings.
- **Visual/DOM checks**: After building or running `npm run dev`, open each page route in the browser and inspect the `<head>` for `<title>`, `<meta name="description">`, `<meta property="og:...">`, `<link rel="canonical" href="...">`, and `<script type="application/ld+json">`.
