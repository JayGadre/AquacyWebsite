# Handoff Report: Milestone 5.1 SEO & Meta

**Summary:** The application currently has basic SEO and Open Graph metadata on most pages, but it lacks a global Open Graph image fallback, has a broken logo URL in its JSON-LD structured data, and is missing strict TypeScript typings for `Metadata` on several pages. 

## 1. Observation
- **Global Layout:** `src/app/layout.tsx` defines default metadata and a `metadataBase` (`https://www.aquacy.in`), but the `openGraph` object lacks a default `images` array.
- **Structured Data:** `src/app/page.tsx` and `src/app/about-us/page.tsx` include a `jsonLd` script referencing `https://www.aquacy.in/logo.png`. However, checking the `public/` directory reveals that the actual logo file is named `aquacy_logo.png`.
- **Missing Typings:** `src/app/communication-modules/page.tsx`, `src/app/instruments/page.tsx`, and `src/app/systems-monitoring/page.tsx` export a `metadata` object but omit the Next.js `Metadata` type annotation (`export const metadata: Metadata =`), which violates the SCOPE.md requirement: "All pages should export a valid Next.js Metadata object."
- **Missing OG Images on Static Pages:** Static pages like Home, About, Catalog, and Contact do not define an explicit `images` property in their local `openGraph` metadata. They rely on a global fallback that is currently undefined. (Note: `product/[id]/page.tsx` correctly handles its own OG images).
- **Admin Section:** `src/app/admin/layout.tsx` correctly defines `robots: { index: false, follow: false }`. However, `src/app/admin/page.tsx` (a Server Component) lacks a `title`. Client components in the admin area cannot export metadata by Next.js design.

## 2. Logic Chain
- According to SCOPE.md for Milestone 5.1, we must "Fix missing meta tags, titles, descriptions, open graph tags. Ensure basic SEO tags are present across all pages."
- The missing `Metadata` type annotations in the 3 aforementioned product pages mean they don't fulfill the strictly typed Next.js metadata interface contract. This can lead to TS errors or inconsistencies.
- The missing global Open Graph image in `layout.tsx` means that sharing any non-product page (e.g. Home, About, Contact) on social media will not display a preview image.
- The hardcoded `/logo.png` in JSON-LD is a 404 since the file is actually `/aquacy_logo.png`. This will negatively affect rich snippet structured data SEO and trigger warnings in Google Search Console.

## 3. Caveats
- Client components (`admin/login/page.tsx`, `admin/settings/page.tsx`) cannot export metadata. They will inherit from `admin/layout.tsx`, which is acceptable because these routes are explicitly `noindex`.
- No new image generation is proposed for Open Graph; we are utilizing the existing `aquacy_logo.png` as a site-wide fallback.

## 4. Conclusion & Proposed Strategy
To fully resolve Milestone 5.1, the following changes should be implemented:

1. **Global Open Graph Image:** In `src/app/layout.tsx`, add an `images` property to the `openGraph` object using the existing logo, and optionally add Twitter cards:
   ```typescript
   openGraph: {
     // ... existing properties
     images: [{ url: '/aquacy_logo.png', width: 1200, height: 630, alt: 'Aquacy Logo' }],
   },
   twitter: {
     card: 'summary_large_image',
   }
   ```
2. **Fix JSON-LD Logo URLs:** In `src/app/page.tsx` and `src/app/about-us/page.tsx`, update all instances of `https://www.aquacy.in/logo.png` to `https://www.aquacy.in/aquacy_logo.png`.
3. **Add TypeScript `Metadata` Typings:** In `src/app/communication-modules/page.tsx`, `src/app/instruments/page.tsx`, and `src/app/systems-monitoring/page.tsx`:
   - Add: `import { Metadata } from 'next';`
   - Change: `export const metadata = {` to `export const metadata: Metadata = {`
4. **Improve Admin Titles:** In `src/app/admin/page.tsx`, export a basic title for better UX:
   ```typescript
   import { Metadata } from 'next';
   export const metadata: Metadata = { title: 'Admin Dashboard | Aquacy' };
   ```

## 5. Verification Method
- **Implementation check:** Ensure `layout.tsx` and all modified pages match the proposed changes.
- **Build test:** Run `npm run build` to confirm no TypeScript errors result from the newly added `Metadata` types.
- **Output validation:** Inspect the `<head>` of the locally running application (`npm run dev`) or static build to verify that `<meta property="og:image" content="https://www.aquacy.in/aquacy_logo.png">` is present on the homepage and that the JSON-LD script contains the correct image path.
