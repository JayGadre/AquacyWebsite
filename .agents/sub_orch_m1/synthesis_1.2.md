# Exploration Synthesis: M1.2 Sidebar/Navigation

## Implementation Strategy for Worker

### Update `src/components/Sidebar/Sidebar.tsx`

1. **Floating Sidebar (Desktop)**: Change the `<aside>` wrapper class from `glass` to `glass-card hover:translate-y-0`. Update its desktop dimensions to be floating: `md:sticky md:top-4 md:left-4 md:h-[calc(100vh-32px)] rounded-r-2xl md:rounded-2xl`. (Remove or override the hover transform so it doesn't jump).
2. **Theme Colors**: Replace all hardcoded hex colors (e.g., `#0ea5e9`, `#38bdf8`) with the new Tailwind theme variables (`primary`, `primary-hover`). Use classes like `text-primary`, `bg-primary/20`, `border-primary/40`.
3. **Typography & Assets**: Replace the hardcoded text gradient in the logo with `.text-gradient-cyan` (if defined) or use `bg-gradient-to-r from-primary to-primary-hover text-transparent bg-clip-text`.
4. **Mobile Toggle**: Update the hamburger menu button to use `.btn-glass` instead of the generic `.glass` class.

### Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
