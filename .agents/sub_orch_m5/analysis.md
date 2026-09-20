# Accessibility & Lint Fixes Implementation Plan (Iteration 2)

Based on the investigation by Gen 2 Explorers, implement the following fixes to resolve the `InquiryModal.tsx` accessibility bug and the `npm run lint` failures.

## 1. Fix `src/components/InquiryModal/InquiryModal.tsx` and `InquiryModal.module.css`
*InquiryModal.module.css*:
Add a new container and update the overlay styles:
```css
.modalContainer {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1000;
}

.modalOverlay {
  position: absolute; /* Changed from fixed */
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  /* z-index removed, display flex removed */
  animation: fadeIn 0.3s ease-out forwards;
}

.modalWrapper {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
```

*InquiryModal.tsx*:
Change the JSX wrapping the modal (around lines 61-63) to separate the `aria-hidden` overlay from the modal content hierarchy:
```tsx
      {isOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalOverlay} onClick={closeModal} aria-hidden="true"></div>
          <div className={styles.modalWrapper} onClick={closeModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
```
Ensure you close the extra `div` tags correctly before `)}`.

## 2. Update `eslint.config.mjs`
Add `.agents/**` and `*.js` to the `globalIgnores` array (around line 14) so external test scripts are ignored by ESLint:
```javascript
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".agents/**",
    "*.js",
  ]),
```

## 3. Fix Source Code Lint Errors
1. **`src/app/catalog/CatalogClient.tsx` (Line 94)**:
   Replace unescaped quotes with HTML entities:
   `We couldn&apos;t find any water meters matching the &quot;{activeTab}&quot; technology category.`
2. **`src/app/api/cron/daily-report/route.ts`**:
   Define an interface above the function:
   ```typescript
   interface InquiryData {
     product: string;
     name: string;
     email: string;
     mobile: string;
     requirement: string;
     date: string | number | Date;
   }
   ```
   Replace the usage of `(inq: any)` with `(inq: InquiryData)` around lines 40 and 52.
3. **`e2e/tier3/pairwise.spec.ts`**:
   Around lines 35-36, change `let box1` and `let box2` to `const`.
4. **`e2e/tier1/homepage.spec.ts`**:
   Remove the unused variable declaration `const features = ...` (around line 24).
5. **`e2e/tier4/real_world.spec.ts`**:
   Remove the unused assignment `const activeElementOutline = ` (around line 163). Just leave `await page.evaluate(() => { ... })`.

## Verification
- Run `npm run lint` - MUST have 0 errors and 0 warnings (or just 0 errors).
- Run `npm run build` - MUST pass.
