# Accessibility Investigation Report (Milestone 5.2)

## 1. Observation
- **InquiryModal (`src/components/InquiryModal/InquiryModal.tsx`)**: 
  - Line 52: `<button className={styles.closeBtn} onClick={closeModal}> &times; </button>` is missing an `aria-label`.
  - The component lacks a `useEffect` hook to listen for the `Escape` key to close the modal.
- **Sidebar (`src/components/Sidebar/Sidebar.tsx`)**: 
  - Line 24: The mobile hamburger button (`<button aria-label="Toggle Navigation">`) lacks the `aria-expanded` and `aria-controls` attributes.
  - The `aside` container lacks an `id` that the toggle button can control.
- **ContactForm (`src/components/ContactForm.tsx`)**: 
  - Lines 98, 113, 128: Form `<input>` elements lack the standard `required` attribute despite being marked with `*` visually.
  - Form inputs lack `aria-invalid` bindings for validation errors, and `aria-describedby` linking to the error text.
- **Global Styles (`src/app/globals.css`)**: 
  - Good contrast: `--background` (`#020617`) and `--foreground` (`#f8fafc`) provide high contrast. `--primary` (`#0ea5e9`) has sufficient contrast against dark backgrounds.
  - Focus outlines are present (`:focus-visible` is styled with `outline: 2px solid var(--primary-hover)`).

## 2. Logic Chain
- The close button in `InquiryModal` uses a visual `&times;` (×) character. Without an `aria-label="Close"`, screen readers will read it literally (e.g., "times" or nothing), confusing non-sighted users.
- Without `Escape` key handling in modals, keyboard-only users cannot easily dismiss the overlay, leading to a keyboard trap (violating WCAG 2.1.2).
- The `Sidebar` hamburger button acts as a disclosure widget. Without `aria-expanded` and `aria-controls`, screen readers will not announce whether the menu is open or closed, nor which element it targets.
- For `ContactForm`, adding HTML5 `required`, `aria-invalid={!!errors.field}`, and `aria-describedby="field-error-id"` ensures that assistive technologies correctly announce field requirements and validation errors in real time.

## 3. Caveats
- The investigation focused on shared layout components (`Sidebar`, `InquiryModal`, `ContactForm`, `CatalogClient`, `Hero`) since they impact all pages. 
- Color contrast was evaluated manually. No automated accessibility scanner (like `axe-core`) was run. The cyan gradients on white text may trigger strict WCAG warnings, but they are used sparingly on dark backgrounds.

## 4. Conclusion
The codebase has a strong accessibility baseline with semantic HTML, defined focus states, and good color contrast. However, we need targeted ARIA and keyboard navigation fixes in modals, sidebars, and forms to achieve full compliance for Milestone 5.2.

## 5. Implementation Plan & Verification Method

**To the Implementing Worker:**

Make the following precise changes:

1. **`src/components/InquiryModal/InquiryModal.tsx`**:
   - Change line 52 to: `<button className={styles.closeBtn} onClick={closeModal} aria-label="Close Modal"> &times; </button>`
   - Add a `useEffect` hook to close the modal on `Escape` key press:
     ```javascript
     useEffect(() => {
       const handleEsc = (e: KeyboardEvent) => {
         if (e.key === 'Escape') closeModal();
       };
       if (isOpen) window.addEventListener('keydown', handleEsc);
       return () => window.removeEventListener('keydown', handleEsc);
     }, [isOpen]);
     ```
   - Ensure the `useEffect` import from `'react'` is present.

2. **`src/components/Sidebar/Sidebar.tsx`**:
   - Give the `<aside>` element (around line 41) an ID: `id="sidebar-menu"`.
   - Update the toggle button (line 24) to include:
     `aria-expanded={isOpen}` and `aria-controls="sidebar-menu"`.

3. **`src/components/ContactForm.tsx`**:
   - Add `required` to the name, email, and mobile `<input>` tags.
   - For each input, add an `id` to the error message (e.g., `<p id="name-error">`), and link it to the input using `aria-describedby="name-error"`.
   - Add `aria-invalid={!!errors.name}` (and similarly for email/mobile) to the inputs.

**Verification:**
- Run `npm run build` to ensure Next.js builds successfully.
- Run `npm run lint` to catch any missing React dependency warnings in the new `useEffect`.
