# Handoff Report: Milestone 1.2 Sidebar Hover Jump Fix

## 1. Observation
- In `src/app/globals.css` (lines 150-151), the hover state for `.glass-card` uses the legacy CSS transform property:
  ```css
  .glass-card:hover {
    transform: translateY(-4px);
  ```
- In `src/components/Sidebar/Sidebar.tsx` (lines 42-44), the `<aside>` element implements the `.glass-card` class along with `hover:translate-y-0` to try to prevent the hover jump. It also uses Tailwind's `translate-x-0` and `-translate-x-full` for mobile toggling.
- Tailwind v4 uses the native `translate` CSS property for its translate utilities (like `hover:translate-y-0`), whereas `.glass-card:hover` uses the legacy `transform` property. 

## 2. Logic Chain
1. Because `transform` and `translate` are distinct CSS properties, the browser applies both independently. 
2. When the user hovers over the Sidebar, `hover:translate-y-0` sets the native `translate` property, but `.glass-card:hover` still successfully applies `transform: translateY(-4px)`.
3. This compounding causes the Sidebar to shift upward on hover despite the Tailwind utility class.
4. **Fix Option 1 (Update `globals.css`)**: Changing `.glass-card:hover` to `translate: 0 -4px;` would unify the properties. However, this modifies a global component class (`.glass-card`), which might break hover effects on other cards if they rely on the `transform` stack.
5. **Fix Option 2 (Update `Sidebar.tsx`)**: Applying `hover:transform-none` directly to the Sidebar overrides the global `transform: translateY(-4px)` by setting `transform: none;` on hover. Since Tailwind's mobile toggle (`-translate-x-full`) relies on the native `translate` property in v4, `transform-none` will not interfere with the sidebar's open/close animation.

## 3. Caveats
- No caveats regarding Option 2. It cleanly separates the mobile toggle state (`translate` property) from the hover effect cancellation (`transform` property). 
- If Option 1 were chosen, it could inadvertently override horizontal translation (e.g., `-translate-x-full`) on mobile if native translate values overwrite each other instead of composing via CSS variables.

## 4. Conclusion
The most robust and localized structural fix is to replace `hover:translate-y-0` with `hover:transform-none` on the `<aside>` element in `src/components/Sidebar/Sidebar.tsx`. This zeroes out the legacy `transform` rule inherited from `.glass-card:hover` without interfering with Tailwind v4's native `translate` mechanics used for the responsive sidebar toggle.

**Recommended Change in `src/components/Sidebar/Sidebar.tsx`:**
```tsx
// Before (Line 42)
className={`... w-64 glass-card hover:translate-y-0 rounded-r-2xl ...`}

// After
className={`... w-64 glass-card hover:transform-none rounded-r-2xl ...`}
```

## 5. Verification Method
- **Method**: Run the application and view the sidebar. Hover over the sidebar on desktop to ensure it no longer jumps vertically by 4px. Toggle the mobile hamburger menu to ensure the slide-in/slide-out (`-translate-x-full` to `translate-x-0`) animation still functions flawlessly.
- **Files to Inspect**: `src/components/Sidebar/Sidebar.tsx`
