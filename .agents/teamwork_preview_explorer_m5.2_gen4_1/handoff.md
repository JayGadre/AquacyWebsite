# Accessibility Investigation Report

## Observation
- Exact searches and file inspections for `<Image>`, `<img>`, `<button>`, and link tags across the codebase (specifically in `src/app/` and `src/components/`).
- Verified that all `<Image>` instances in `page.tsx`, `product/[id]/page.tsx`, `systems-monitoring/page.tsx`, `communication-modules/page.tsx`, `instruments/page.tsx`, `AnimatedLogo.tsx`, and `ProductCard.tsx` properly implement the `alt` attribute.
- Verified that form inputs in `ContactForm.tsx`, `admin/login/page.tsx`, and `InquiryModal.tsx` have explicitly associated `<label>` tags with matching `htmlFor` and `id` attributes. 
- Discovered that the root `layout.tsx` (`src/app/layout.tsx`) does not include a "Skip to main content" link for keyboard navigation.
- Observed in `src/components/Sidebar/Sidebar.tsx` that the mobile sidebar uses a backdrop `div` with an `onClick` to close the menu, but it lacks an `Escape` key listener and does not manage focus (focus trap) when opened.
- Observed in `src/components/InquiryModal/InquiryModal.tsx` that the modal is built using a `<div role="dialog" aria-modal="true">` structure instead of the native `<dialog>` element. While it implements an `Escape` key listener, it lacks focus trapping, allowing keyboard users to tab out of the modal into the inert background.
- Found that several purely decorative SVG icons from `lucide-react` (e.g., `MapPin`, `Phone`, `Mail`, `FileDown` in `Footer.tsx`; `ArrowRight`, `Activity` in `page.tsx`; `Sparkles` in `CatalogClient.tsx`) lack the `aria-hidden="true"` attribute, meaning screen readers may read them inconsistently or clutter the output. Some icons (like `CheckCircle2` in `about-us/page.tsx`) correctly implement `aria-hidden="true"`.

## Logic Chain
1. **Semantic HTML & Media:** The application currently maintains a strong baseline for standard semantic HTML (e.g., `<main>`, `<nav>`, `<footer>`) and properly labels images and forms. This ensures screen readers can parse the document structure and describe visual content.
2. **Keyboard Accessibility - Navigation:** The lack of a "Skip to main content" link forces keyboard-only and screen-reader users to tab through the entire `Sidebar` navigation on every page before reaching the main content, which severely degrades the user experience.
3. **Keyboard Accessibility - Overlays:** The `InquiryModal` and `Sidebar` (on mobile) act as overlays. Without focus trapping, keyboard focus can escape the overlay and interact with hidden or background elements. For `Sidebar.tsx`, the missing `Escape` key listener means keyboard users have no standard way to dismiss the mobile menu.
4. **ARIA & Screen Readers:** Lucide icons render as `<svg>` elements. Without `aria-hidden="true"`, screen readers may attempt to announce them. For decorative icons, this adds noise and harms accessibility.

## Caveats
- No automated accessibility tools (like Axe or Lighthouse) were run. Findings are based on static code analysis.
- Focus trapping implementation was not tested in the browser, but static analysis shows no `useRef` or focus trapping logic in the overlay components.
- Standard semantic HTML is largely followed, but migrating custom `div` modals to the native `<dialog>` element is recommended as best practice to automatically resolve focus trapping issues.

## Conclusion
The codebase has a good accessibility foundation (proper semantic landmarks, `alt` text, associated form labels). However, keyboard navigation and screen reader experience can be significantly improved by implementing the following fix strategies:
1. **Skip Link:** Add a visually hidden, focusable "Skip to main content" link at the top of `src/app/layout.tsx` targeting the `<main>` element.
2. **Focus Management:** Update `InquiryModal.tsx` to use the native HTML5 `<dialog>` element instead of `div`s. This provides native focus trapping, keyboard support (Escape key), and better semantics.
3. **Sidebar Accessibility:** Add an `Escape` key listener to close the mobile sidebar in `src/components/Sidebar/Sidebar.tsx` and implement focus trapping when the mobile sidebar is open.
4. **Decorative Icons:** Audit and append `aria-hidden="true"` to all decorative `lucide-react` icons across the application (specifically in `Footer.tsx`, `page.tsx`, and `CatalogClient.tsx`).

## Verification Method
1. Open `src/app/layout.tsx` to verify the addition of the Skip Link.
2. Open `src/components/InquiryModal/InquiryModal.tsx` to confirm the use of `<dialog>`.
3. Open `src/components/Sidebar/Sidebar.tsx` to ensure `Escape` key support is added.
4. Use standard IDE search (`grep '<[A-Z][a-zA-Z]* .*lucide-react'`) to confirm icons have `aria-hidden="true"`.
5. Run `npm run build` and `npm run lint` to ensure no regressions were introduced by the HTML modifications.
