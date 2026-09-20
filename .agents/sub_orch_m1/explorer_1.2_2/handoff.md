# Handoff Report: CSS Cascade Layer Conflicts in Sidebar

## 1. Observation
- In `src/app/globals.css`, custom component classes such as `.glass-card` are defined globally without any `@layer` directives (lines 98-122).
- `.glass-card` defines `position: relative;` and `.glass-card:hover` defines `transform: translateY(-4px);`.
- `src/components/Sidebar/Sidebar.tsx` attempts to override these properties using Tailwind v4 utility classes on the `<aside>` element: `fixed md:sticky` and `hover:translate-y-0` (line 42).
- Tailwind CSS v4 relies on standard CSS Cascade Layers (`@layer theme, base, components, utilities`).
- According to the CSS Cascade specification, styles defined outside of any layer (unlayered styles) have a **higher precedence** than styles defined within a layer, regardless of specificity or source order.

## 2. Logic Chain
1. Because `globals.css` does not wrap its custom classes (like `.glass-card`) in a CSS layer, they are treated as unlayered by the browser.
2. Tailwind v4 generates all of its utility classes (e.g., `.fixed`, `.md\:sticky`, `.hover\:translate-y-0`) inside `@layer utilities`.
3. Due to CSS Cascade Layer rules, the unlayered `position: relative` in `.glass-card` overrides the layered `position: fixed` from `.fixed` and `position: sticky` from `.md\:sticky`, which breaks the sidebar's positioning.
4. Similarly, the unlayered `.glass-card:hover` transform (`translateY(-4px)`) overrides the layered `.hover\:translate-y-0` transform, causing the sidebar to jump on hover and disrupting the UI layout.
5. Wrapping the custom component classes in `globals.css` with `@layer components { ... }` will place them in the `components` layer.
6. Since Tailwind defines the layer order such that `utilities` comes after `components` (`@layer theme, base, components, utilities`), the utility classes in `Sidebar.tsx` will correctly override the component baseline styles.

## 3. Caveats
- Moving `.glass-card` and other custom classes into `@layer components` will allow *all* Tailwind utility classes to override them. This is generally the intended behavior of Tailwind, but if other components were accidentally relying on the unlayered styles to forcibly override utilities, they might experience minor visual changes (e.g., border-radius or transition timings).
- Element selectors (`h1`, `p`, `a`, `input`, etc.) in `globals.css` should ideally be wrapped in `@layer base { ... }` to fully conform to Tailwind's layer architecture.

## 4. Conclusion
The positioning and hover-jump bugs are caused by CSS Cascade Layer conflicts between unlayered custom CSS and layered Tailwind v4 utilities. 

**Recommended Fix Strategy:**
Update `src/app/globals.css` to properly use standard CSS layers for custom styles:
1. Wrap the element selectors (typography and forms, lines 133-147 and 224-238) in `@layer base { ... }`.
2. Wrap the custom component classes (`.glass`, `.glass-card`, `.glass-pill`, `.container`, `.btn`, `.btn-primary`, `.btn-glass`, `.text-gradient`, etc., lines 90-130 and 150-221) in `@layer components { ... }`.

This will allow the `fixed`, `md:sticky`, and `hover:translate-y-0` utilities in `Sidebar.tsx` to successfully override the base `.glass-card` styles, fixing both the positioning and the hover jump.

## 5. Verification Method
1. Implement the suggested `@layer` wrappers in `src/app/globals.css`.
2. Run the development server (`npm run dev`).
3. **Verify Positioning**: Inspect the Sidebar on both mobile (ensure it is `fixed` and hidden until opened) and desktop (ensure it is `sticky` and stays in the viewport).
4. **Verify Hover**: Hover over the Sidebar on desktop. It should no longer jump or translate upwards (`hover:translate-y-0` should take effect).
5. **Verify Inspector**: Check the browser's developer tools to confirm that `.glass-card` styles are correctly placed in the `components` layer and are being struck through (overridden) by the active `utilities` layer styles.
