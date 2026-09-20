# Handoff Report: Milestone 1.2 Sidebar Hover Jump Fix

## Observation
1. In `src/app/globals.css` (line 151), `.glass-card:hover` applies the legacy transform property: `transform: translateY(-4px);`.
2. In `src/components/Sidebar/Sidebar.tsx` (line 42), the `<aside>` element uses the classes `glass-card hover:translate-y-0`. 
3. Tailwind v4's `translate-y-0` utility sets the native CSS `translate` property (e.g., `translate: 0 0`), not the legacy `transform` property. 
4. Because `transform` and `translate` are distinct CSS properties, they do not override each other. Consequently, the `hover:translate-y-0` utility fails to cancel the `-4px` movement on the Sidebar component, causing it to compound and jump on hover.

## Logic Chain
1. To stop the Sidebar from jumping on hover without losing the other hover styles from `.glass-card` (like shadow and background changes), we need the movement property to be overridable by Tailwind utilities.
2. Tailwind v4 favors individual native CSS properties (`translate`, `scale`, `rotate`) over the legacy combined `transform` property. 
3. If we update `.glass-card:hover` to use the native `translate: 0 -4px;` instead of `transform: translateY(-4px);`, both the custom component layer and the Tailwind utility layer will target the exact same CSS property (`translate`).
4. Because Tailwind's utilities layer has higher specificity (or appears later in the cascade) than the `@layer components`, `hover:translate-y-0` will cleanly override `translate: 0 -4px;` with `translate: 0 0;`.
5. Alternatively, adding `hover:transform-none` to the Sidebar component would override the legacy `transform` property, but this approach is more brittle as it would cancel all transforms (e.g., scaling or rotating) if they were ever added. Aligning the CSS with modern native properties is the cleaner structural fix.

## Caveats
- I did not check if `.btn-primary:hover` or `.btn-glass:hover` also use legacy `transform: translateY(-2px)`. If they are used alongside Tailwind native movement utilities, they will suffer from the same bug. Updating all `transform: translateY(...)` instances in `globals.css` to `translate: 0 ...` is highly recommended.

## Conclusion
The structural fix is to align the custom CSS in `globals.css` with Tailwind v4's use of native CSS properties. 

**Proposed Changes:**
1. In `src/app/globals.css`, change line 151 from `transform: translateY(-4px);` to `translate: 0 -4px;`.
2. Keep `hover:translate-y-0` in `src/components/Sidebar/Sidebar.tsx`.

*Alternative if CSS change is not desired:*
1. In `src/components/Sidebar/Sidebar.tsx`, replace `hover:translate-y-0` with `hover:transform-none`.

## Verification Method
1. Implement the proposed change in `globals.css`.
2. Run the application (`npm run dev`).
3. Hover over the Sidebar component; it should no longer jump vertically.
4. Hover over other `.glass-card` elements on the page; they should still jump up by 4px.
