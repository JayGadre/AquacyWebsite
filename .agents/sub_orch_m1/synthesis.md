# Exploration Synthesis: M1.1 Layout & CSS

## Consensus Findings
1. **Critical Bug**: `src/app/globals.css` is missing the Tailwind v4 `@import "tailwindcss";` directive. Without this, no Tailwind utility classes are working anywhere in the application.
2. **Tailwind v4 Theming**: The existing CSS variables for glassmorphism (deep navy, aqua, etc.) need to be exposed to Tailwind via the new `@theme` directive in `globals.css` so we can use classes like `bg-background` and `text-primary`.
3. **Layout Semantics & Responsiveness**: `src/app/layout.tsx` uses a `div` for the main content area instead of `<main>`. Additionally, to prevent overlap with the mobile sidebar toggle (which is `fixed top-4`), the main wrapper should include appropriate top padding on mobile screens.
4. **Scrolling/Height Fixes**: `globals.css` has `height: 100%` on `html, body`. This should be removed, and `layout.tsx` should use Tailwind's `min-h-screen` on `body` instead, ensuring content doesn't get cut off and avoiding nested scrollbar issues.

## Implementation Strategy for Worker

### 1. Update `src/app/globals.css`
- Add `@import "tailwindcss";` at the very top.
- Add a `@theme` block immediately following the import:
  ```css
  @theme {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-primary: var(--primary);
    --color-primary-hover: var(--primary-hover);
    --color-secondary: var(--secondary);
    --font-sans: var(--font-sans);
  }
  ```
- Keep the existing `:root` variables and custom `.glass` / `.glass-card` utilities.
- Remove `height: 100%;` from the `html, body` rule in `globals.css`.

### 2. Update `src/app/layout.tsx`
- Replace arbitrary color classes (like `bg-[var(--background)]`) with the new theme colors (`bg-background text-foreground`).
- Ensure `body` has `min-h-screen`, `flex`, and `relative overflow-x-hidden`.
- Wrap `{children}` in a semantic `<main>` tag.
- Apply responsive padding to the `<main>` tag so that on mobile, the top padding accommodates the absolute/fixed mobile sidebar toggle (e.g., `p-4 pt-20 md:p-6 md:pt-6`).

### Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
