# Milestone 1.3 Footer - Investigation Handoff

## Observation
1. **Existing Footer:** A styled footer component already exists at `src/components/Footer/Footer.tsx`.
2. **Current Usage:** The `<Footer />` component is being manually imported and rendered at the bottom of specific route files:
   - `src/app/page.tsx`
   - `src/app/communication-modules/page.tsx`
   - `src/app/systems-monitoring/page.tsx`
   - `src/app/instruments/page.tsx`
3. **Missing Footers:** The footer is notably absent from other main pages, such as:
   - `src/app/catalog/page.tsx` (and `CatalogClient.tsx`)
   - `src/app/contact/page.tsx`
4. **Layout Structure:** The root layout (`src/app/layout.tsx`) currently renders the global `<Sidebar />` and a flex `<main>` container for `{children}`, but it lacks a global footer.
5. **Admin Layout Leakage:** There is an admin section (`src/app/admin/layout.tsx`) which provides its own admin sidebar. However, because it's a child of `RootLayout`, it currently inherits the main global `Sidebar`, and will inherit the global `Footer` if it is added to `RootLayout`.

## Logic Chain
1. To satisfy Milestone 1.3 ("Create/update a global footer if necessary or ensure existing layout handles it"), the footer must be centralized so it automatically applies to all public-facing pages (including `/catalog` and `/contact`).
2. Centralizing the footer requires importing and placing `<Footer />` inside `src/app/layout.tsx`. Specifically, it should be placed right after `{children}` within the `<main>` container to preserve its current width and padding layout relative to the sidebar.
3. Once the footer is globalized in `RootLayout`, all manual `<Footer />` imports and JSX tags must be removed from the individual page components (`page.tsx` and the other 3 routes) to prevent duplicate footers from rendering.

## Caveats
- **Admin Layout Conflict:** By placing the `Footer` in `src/app/layout.tsx`, it will appear on `/admin` routes. This is identical to the current behavior where the global `Sidebar` also leaks into the `/admin` route. If the intention is to keep the admin dashboard isolated from the public website layout, the project should be refactored to use **Next.js Route Groups** (e.g., placing all public routes inside `src/app/(public)/` with their own layout, and admin routes in `src/app/(admin)/`). 
- For the immediate scope of Milestone 1.3, implementing it in `RootLayout` fulfills the request of creating a global footer.

## Conclusion
**Implementation Strategy:**
1. **Update `src/app/layout.tsx`:** Import `Footer` from `@/components/Footer/Footer` and place `<Footer />` immediately below `{children}` inside the `<main>` container.
2. **Clean up Individual Pages:** Remove all `import Footer ...` statements and `<Footer />` elements from:
   - `src/app/page.tsx`
   - `src/app/communication-modules/page.tsx`
   - `src/app/systems-monitoring/page.tsx`
   - `src/app/instruments/page.tsx`

## Verification Method
- **Code Audit:** Run `grep -r "import Footer" src/app/` — it should only return `src/app/layout.tsx`.
- **Build/Test:** Run `npm run build` or the project build command to ensure no import errors exist.
- **Visual Testing:** Run `npm run dev` and navigate to `/catalog` and `/contact` to verify the footer now appears there. Check `/` (Home) to ensure only a single footer renders.
