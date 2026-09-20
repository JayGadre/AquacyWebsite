# Handoff Report: CSS Cascade Layer Conflicts

## 1. Observation
In `src/app/globals.css`, the `.glass-card` class is defined at the root level without being assigned to any CSS cascade layer (lines 98-122).
```css
.glass-card {
  ...
  position: relative;
}

.glass-card:hover {
  transform: translateY(-4px);
  ...
}
```
In `src/components/Sidebar/Sidebar.tsx`, the `aside` element uses the following classes (line 42):
```tsx
className={`fixed md:sticky top-0 md:top-4 left-0 md:left-4 h-screen md:h-[calc(100vh-32px)] w-64 glass-card hover:translate-y-0 ...
```

## 2. Logic Chain
1. Tailwind CSS v4 utilizes native CSS cascade layers (`@layer theme, base, components, utilities;`).
2. Tailwind utility classes (such as `fixed`, `md:sticky`, `hover:translate-y-0`) are placed within the `@layer utilities` layer.
3. Custom styles in `src/app/globals.css` like `.glass-card` are currently unlayered.
4. According to CSS specification, unlayered CSS has higher precedence than layered CSS, regardless of source order or identical specificity.
5. Therefore, the unlayered `position: relative` from `.glass-card` overrides the `fixed` and `md:sticky` utilities. 
6. Similarly, the unlayered `transform: translateY(-4px)` from `.glass-card:hover` overrides the `hover:translate-y-0` utility from Tailwind, causing the sidebar to jump uncontrollably on hover.

## 3. Caveats
- I did not test the fix locally due to read-only constraints, but standard CSS cascade layer mechanics strongly confirm this behavior. 
- Some other custom classes in `globals.css` (e.g., `.btn`, `.glass-pill`) are also unlayered and might cause similar conflicts elsewhere in the application.

## 4. Conclusion
The root cause of the positioning and hover jump issues on the Sidebar is a CSS cascade layer conflict. Because `.glass-card` is unlayered, it overrides Tailwind's layered utilities.

**Fix Strategy:**
Wrap the custom UI component classes (e.g., `.glass`, `.glass-card`, `.glass-pill`, `.btn`, etc.) inside an `@layer components { ... }` block in `src/app/globals.css`. This will lower their layer priority, allowing Tailwind's `@layer utilities` (like `fixed`, `md:sticky`, `hover:translate-y-0`) to correctly override them when applied to the same element.

*Proposed change in `src/app/globals.css`:*
```css
@layer components {
  /* Glassmorphism Panel Utilities */
  .glass { ... }
  .glass-card { ... }
  .glass-card:hover { ... }
  .glass-pill { ... }
  
  /* Buttons */
  .btn { ... }
  ...
}
```

## 5. Verification Method
1. Apply the `@layer components { ... }` wrapper to custom component classes in `src/app/globals.css`.
2. Run the Next.js development server (`npm run dev`).
3. Inspect the Sidebar element in browser DevTools. Verify that `position: fixed` (or sticky) and `transform: translateY(0px)` (from the hover utility) are no longer crossed out and successfully override the `.glass-card` properties.
4. Visually confirm the sidebar stays fixed/sticky and doesn't jump when hovered.
