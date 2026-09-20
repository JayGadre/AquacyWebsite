# Handoff Report: Milestone 1.3 - Global Footer

## 1. Observation
- The codebase contains a completed, Tailwind-styled `Footer` component located at `src/components/Footer/Footer.tsx`.
- Currently, there is **no global footer** in `src/app/layout.tsx`. The `RootLayout` only wraps `children` with a `Sidebar` and a `<main>` container:
  ```tsx
  <body className="min-h-screen flex relative overflow-x-hidden font-sans bg-background text-foreground">
    <Sidebar />
    <main className="flex-1 min-w-0 flex flex-col p-4 pt-20 md:p-6 md:pt-6">
      {children}
    </main>
  </body>
  ```
- The `<Footer />` component is being manually imported and rendered at the bottom of specific individual page components (e.g., `src/app/page.tsx`, `src/app/communication-modules/page.tsx`, `src/app/instruments/page.tsx`, `src/app/systems-monitoring/page.tsx`).
- Several pages completely lack the footer because it was not manually included, specifically: `src/app/about-us/page.tsx`, `src/app/catalog/page.tsx` (and `CatalogClient.tsx`), and `src/app/contact/page.tsx`.
- Individual page components (like `page.tsx`, `contact/page.tsx`, etc.) already define their own `<main>` HTML tags. Wrapping them inside `layout.tsx`'s `<main>` tag results in semantically invalid nested `<main>` elements.
- The root layout (`src/app/layout.tsx`) applies to all routes, including `/admin`. Thus, adding a global footer here will cause it to appear on admin pages (which currently also inadvertently inherit the public `Sidebar`).

## 2. Logic Chain
1. To satisfy the requirement of "Create/update a global footer if necessary or ensure existing layout handles it" (Milestone 1.3), we must stop manually importing the footer into individual pages and instead render it globally.
2. The most appropriate place for a global footer is within `src/app/layout.tsx`, below `{children}` inside the right-hand flex column.
3. Because the individual pages already use `<main>` tags for their primary content, the wrapping element in `src/app/layout.tsx` should be changed from `<main>` to a generic block container like `<div>`. This fixes the nested `<main>` validation issue while preserving the layout.
4. Once added to `layout.tsx`, the manual `<Footer />` imports and tags must be removed from `page.tsx`, `communication-modules/page.tsx`, `instruments/page.tsx`, and `systems-monitoring/page.tsx` to prevent the footer from rendering twice on those pages.
5. The layout issue regarding `/admin` inheriting public components (Sidebar, and soon Footer) needs to be addressed. The standard Next.js solution is to group public routes into an `app/(public)` or `app/(main)` Route Group to segregate the layout.

## 3. Caveats
- Moving the footer to the layout might slightly change padding or margins depending on how the flexbox grows on short pages. `layout.tsx` wrapper has `flex-1 min-w-0 flex flex-col`, which will correctly push the footer to the bottom if `{children}` is also flexible, but this should be tested.
- `Footer.tsx` is a Server Component, so you cannot easily use `usePathname` to hide it on `/admin` without converting it to a Client Component or wrapping it. Route Groups are the better architectural solution.
- A Route Group refactor for `(public)` is technically outside the strict scope of "Milestone 1.3 Footer", but is highly recommended to fix the admin layout bleed. 

## 4. Conclusion
**Recommended Implementation Strategy for Milestone 1.3:**
1. **Update `src/app/layout.tsx`:** 
   - Change the `<main className="flex-1 ...">` wrapper to `<div className="flex-1 ...">`.
   - Import `Footer` from `@/components/Footer/Footer` and place `<Footer />` directly below `{children}` inside that `<div>`.
2. **Clean up individual pages:**
   - Remove `<Footer />` and its import from:
     - `src/app/page.tsx`
     - `src/app/communication-modules/page.tsx`
     - `src/app/instruments/page.tsx`
     - `src/app/systems-monitoring/page.tsx`
3. (Optional but recommended Architecture fix): Move the public pages (and `layout.tsx`) into a `(public)` route group to prevent the public Sidebar and Footer from rendering on `app/admin/layout.tsx`. If this is skipped, the footer will appear on admin pages.

## 5. Verification Method
- **To Verify Global Footer:** Run the Next.js dev server and visit `/about-us`, `/catalog`, and `/contact` to confirm the footer now appears correctly at the bottom of the page.
- **To Verify No Duplicates:** Visit `/`, `/instruments`, and `/communication-modules` to ensure only one footer renders.
- **To Verify Semantic HTML:** Inspect the DOM in the browser to confirm there are no `<main>` tags nested inside other `<main>` tags.
