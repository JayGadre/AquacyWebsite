# Accessibility Investigation Report

## Observation
1. **Decorative Icons Lack `aria-hidden`**: Across the codebase, `lucide-react` icons and raw inline `<svg>` elements are used decoratively alongside text but lack `aria-hidden="true"`. Examples:
   - `src/app/page.tsx`: `<ArrowRight className="..." />` (lines 99, 157, etc.)
   - `src/components/Sidebar/Sidebar.tsx`: `<Icon size={20} ... />` (line 81)
   - `src/components/InquiryModal/InquiryModal.tsx`: Raw `<svg viewBox="0 0 24 24" ...>` (line 72)
2. **Missing `aria-labelledby` on Dialog**: The custom modal in `src/components/InquiryModal/InquiryModal.tsx` uses `<div role="dialog" aria-modal="true">` (line 65) but lacks an `aria-labelledby` attribute to associate it with its title (`<h2 className={styles.modalTitle}>`).
3. **Modal Focus Management**: `InquiryModal.tsx` relies on a simple React state (`isOpen`) to show/hide the modal. There is no logic to trap focus inside the modal while open, nor does it return focus to the trigger button when closed.
4. **Missing Skip Link**: `src/app/layout.tsx` does not include a "Skip to main content" link for keyboard users. Furthermore, `<main>` tags across the application (`src/app/page.tsx`, `src/app/catalog/CatalogClient.tsx`, etc.) do not have an `id="main-content"` attribute.
5. **Empty Hash Links**: In `src/components/Footer/Footer.tsx` (lines 71, 72), placeholder links for Privacy Policy and Terms of Use use `href="#"`, which can cause page reloads or unexpected scroll jumps without proper `e.preventDefault()`.
6. **Images**: All Next.js `<Image>` components inspected (`src/app/page.tsx`, `src/components/ui/ProductCard.tsx`, `src/components/AnimatedLogo/AnimatedLogo.tsx`, etc.) correctly implement descriptive `alt` tags.

## Logic Chain
1. Screen readers often announce inline SVG elements unless explicitly hidden. Adding `aria-hidden="true"` to decorative icons ensures screen reader users are not overwhelmed with redundant or unpronounceable icon names.
2. A `<div role="dialog">` must have an accessible name to announce its purpose when opened. Without `aria-labelledby`, screen readers will just announce "dialog" without context.
3. Without focus trapping, keyboard users can Tab out of the modal and interact with the underlying hidden page, which is a critical accessibility violation for modals (WCAG 2.4.3).
4. A skip link is a standard WCAG 2.4.1 requirement to allow keyboard users to bypass repetitive navigation links (like the Sidebar).
5. Empty `href="#"` links are anti-patterns in React/Next.js and can interfere with keyboard navigation by resetting focus to the top of the page.
6. The existing `<Image>` components already meet the baseline requirement for non-text content (WCAG 1.1.1).

## Caveats
- I did not test the rendered site with an actual screen reader (e.g., NVDA, VoiceOver) due to the read-only file investigation constraint.
- Third-party UI libraries weren't audited heavily, but standard HTML/React components are standardizing on these best practices.

## Conclusion
The overall semantic structure and image accessibility are good. However, the site suffers from minor to moderate a11y issues primarily related to dynamic content (modals), keyboard navigation (skip links, focus trapping), and decorative SVGs. 

**Recommended Fix Strategies:**
1. **Icons**: Globally search for `lucide-react` icons and add `aria-hidden="true"` where they are decorative. Do the same for the raw SVG in `InquiryModal.tsx`.
2. **Modal Context**: In `InquiryModal.tsx`, add `id="modal-title"` to the `<h2>` and `aria-labelledby="modal-title"` to the `<div role="dialog">`.
3. **Modal Focus**: Implement a focus trap in `InquiryModal.tsx` using a library like `react-focus-lock` or refactor it to use the native HTML `<dialog>` element, which handles focus trapping natively.
4. **Skip Link**: Add `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>` at the top of `src/app/layout.tsx`. Ensure all `<main>` tags are updated with `id="main-content"`.
5. **Footer Links**: Change `href="#"` to `href="#!"` or replace them with a `<button>` if they are meant to be non-navigational placeholders, or point them to an actual `/legal` page.

## Verification Method
- **Icons**: Search `lucide-react` in the codebase and verify `aria-hidden="true"` is applied.
- **Modal**: Open the Inquiry Modal, verify the title is read by a screen reader, and attempt to `Tab` outside of the modal constraints. Keyboard focus must remain trapped inside until `Escape` is pressed.
- **Skip Link**: `Tab` immediately after page load. The first element focused should be "Skip to main content".
- Run `npm run build` to verify no Next.js/React linting errors were introduced during the fixes.
