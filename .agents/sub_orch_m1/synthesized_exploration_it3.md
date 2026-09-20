# Synthesized Exploration Findings: Milestone 1.2 Sidebar Hover Jump

## Consensus on Root Cause
The `glass-card:hover` class in `globals.css` uses the legacy `transform: translateY(-4px)` property. 
The Sidebar attempts to override this using the Tailwind v4 utility `hover:translate-y-0`. 
However, Tailwind v4 utilities map to native CSS properties (e.g., `translate: 0 0`). Because `transform` and `translate` are distinct CSS properties, they compound instead of overriding. Thus, the sidebar still jumps by 4px on hover.

## Resolved Conflicts / Recommended Approach
Two fixes were proposed:
1. Update `globals.css` to use the native `translate: 0 -4px` instead of `transform: translateY(-4px)`. (Recommended for architectural consistency with Tailwind v4).
2. Apply `hover:transform-none` to the Sidebar component to explicitly zero out the legacy transform.

**Decision**: We will proceed with **Option 1**. It is structurally cleaner to align custom CSS with Tailwind v4's modern property usage, preventing future bugs if other utilities are used in combination.

## Implementation Instructions for Worker
1. Edit `src/app/globals.css`. Find instances of `transform: translateY(...)` in hover states (e.g., `.glass-card:hover`, `.btn-primary:hover`, `.btn-glass:hover` if any) and convert them to the native `translate: 0 ...` syntax. 
   - Example: `transform: translateY(-4px);` -> `translate: 0 -4px;`
   - Example: `transform: translateY(-2px);` -> `translate: 0 -2px;`
2. Keep the `hover:translate-y-0` class on the Sidebar in `src/components/Sidebar/Sidebar.tsx` as it will now correctly override the new `translate` property.
3. Build and test the application to ensure it works.

> **MANDATORY INTEGRITY WARNING**
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
