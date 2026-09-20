# Milestone 5.2 Accessibility Investigation Handoff

## 1. Observation
- **ARIA Labels:** In `src/components/InquiryModal/InquiryModal.tsx` (line 52), the close button (`<button className={styles.closeBtn} onClick={closeModal}> &times; </button>`) is missing an `aria-label`.
- **Form Accessibility:** In `src/components/ContactForm.tsx` and `src/app/admin/login/page.tsx`, the input fields lack `aria-invalid` and `aria-describedby` attributes to associate validation error messages with their respective input fields for screen readers.
- **Color Contrast:** In `src/app/globals.css` (lines 192-200), the `.btn-primary` class has `color: #ffffff;` on a `background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);`. The contrast ratio between white and this cyan background is approximately 2.5:1, failing the WCAG AA minimum of 4.5:1 for normal text.
- **Semantic HTML & Keyboard Navigability:** Pages consistently use `<main>`, `<aside>` (in Sidebar), `<article>` (in ProductCard). Image `alt` tags are descriptive. Keyboard navigability is supported via `.btn:focus-visible` and similar outline styles in `globals.css`.

## 2. Logic Chain
- Non-text buttons like the `&times;` modal close button require `aria-label` attributes to ensure screen reader users can identify their function.
- Without `aria-invalid` and `aria-describedby`, screen readers may not announce validation errors when users interact with the invalid form fields.
- The low contrast ratio on primary buttons makes them difficult to read for visually impaired users. Changing the text color to a dark shade like `#0f172a` (Slate 900) against the cyan background will increase the contrast ratio to > 5:1, satisfying accessibility standards without compromising the glassmorphism theme.
- Semantic HTML and keyboard focus rings are already well-implemented, requiring no further changes in those areas.

## 3. Caveats
- I did not test the app with a real screen reader (e.g., NVDA, VoiceOver). Verification relies on static code analysis of HTML attributes.
- The Tailwind v4 config is embedded within `src/app/globals.css`, so there is no separate `tailwind.config.ts` file to review for contrast colors.

## 4. Conclusion
The codebase has a strong foundation for accessibility (semantic HTML, focus states), but it requires a few localized fixes: improving primary button text contrast and adding ARIA attributes to modals and forms to fully meet Milestone 5.2 requirements.

## 5. Verification Method & Implementation Plan

The Implementer (Worker) should apply the following changes:

1. **`src/app/globals.css`**: 
   - Under `.btn-primary`, change `color: #ffffff;` to `color: #0f172a;`.
2. **`src/components/InquiryModal/InquiryModal.tsx`**: 
   - Update line 52 to: `<button className={styles.closeBtn} onClick={closeModal} aria-label="Close modal">`
3. **`src/components/ContactForm.tsx`**:
   - For `name` input: add `aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}`. Add `id="name-error"` to the error `<p>` tag.
   - For `email` input: add `aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}`. Add `id="email-error"` to the error `<p>` tag.
   - For `mobile` input: add `aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? "mobile-error" : undefined}`. Add `id="mobile-error"` to the error `<p>` tag.
4. **`src/app/admin/login/page.tsx`**:
   - For `password` input: add `aria-invalid={!!error} aria-describedby={error ? "login-error" : undefined}`. Add `id="login-error"` to the error `<p>` tag.

**Verification commands:**
Run `npm run lint` and `npm run build` after making the changes to ensure no syntax or type errors were introduced.
