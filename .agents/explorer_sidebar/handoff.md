# Handoff Report: Sidebar Glassmorphism Strategy

**Summary**: The `Sidebar.tsx` component is currently functioning but relies on outdated utility classes and hardcoded colors rather than the design tokens introduced in Milestone 1.1. To properly implement the glassmorphism theme, the sidebar should transition to a floating `glass-card` on desktop while maintaining edge-to-edge slide-out behavior on mobile, and all hardcoded hex values should be migrated to `primary` tailwind variables.

## 1. Observation
- `src/components/Sidebar/Sidebar.tsx` currently wraps the `aside` element with the `glass` utility class instead of `glass-card`.
- The `aside` is pinned edge-to-edge (`top-0 left-0 h-screen w-64`).
- Active link states, icons, and gradients within `Sidebar.tsx` use hardcoded hex values (e.g. `#0ea5e9`, `#38bdf8`) rather than the tailwind `@theme` variables (`primary`, `primary-hover`) defined in `src/app/globals.css`.
- The mobile hamburger button uses the `glass` class instead of the `btn-glass` class provided in `globals.css`.
- `src/app/layout.tsx` adds `md:p-6 md:pt-6` padding to the `<main>` container on desktop viewports.

## 2. Logic Chain
1. To fulfill the requirement of "using the `.glass-card` classes", the `aside` container must transition from `glass` to `glass-card`.
2. `glass-card` applies rounded corners (`border-radius: 20px`). Anchoring it directly to the viewport edges without margins on desktop looks visually broken and contradicts the "glass card" aesthetic. Thus, it must become a floating card on desktop with margins that align with the `<main>` element's padding (`md:top-6`, `md:ml-6`, `md:h-[calc(100vh-3rem)]`).
3. On mobile devices, a full-height slide-out drawer is preferred for navigation. Therefore, the border radius should be reset (`rounded-none md:rounded-2xl`) and it should remain edge-anchored (`top-0 left-0 h-screen`) when the `md:` breakpoint is inactive.
4. Hardcoded hex values must be updated to tailwind classes (`text-primary`, `bg-primary`, `border-primary/40`, `from-primary/20`) to map to the central theme variables, allowing consistent active states and cyan/blue gradients.
5. The hamburger button should use the predefined `.btn-glass` class for visual consistency with the overarching glassmorphism design language.

## 3. Caveats
- No exact visual mockups provided for the mobile menu interaction; assuming standard edge-to-edge slide-out on mobile and floating card on desktop.
- Updating `h-screen` to a calculated floating height (`h-[calc(100vh-3rem)]`) on desktop requires verifying that overflow scrolling on navigation items still functions seamlessly if the item list grows.

## 4. Conclusion
Implement the following step-by-step strategy for `Sidebar.tsx`:

**Step 1: Container & Layout Update**
Change the `aside` element classes to:
`className="fixed md:sticky md:top-6 md:ml-6 top-0 left-0 h-screen md:h-[calc(100vh-3rem)] w-64 glass-card rounded-none md:rounded-2xl flex flex-col transition-all duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}"`
*(Note: removed `border-r border-[var(--glass-border)] shadow-[...]` as `glass-card` provides its own borders and shadows)*

**Step 2: Color Variable Migration**
Replace hardcoded hex codes with `@theme` variable utilities:
- Change `bg-gradient-to-r from-[#0ea5e9]/10` to `from-primary/10`
- Change `from-[#0ea5e9]/30 to-[#0284c7]/10 border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.3)]` to `from-primary/30 to-primary/10 border-primary/40 shadow-[0_0_15px_var(--primary-glow)]`
- Change `text-[#38bdf8]` and `text-[#0ea5e9]` to `text-primary` or `text-primary-hover`
- Change nav link active state classes to use `from-primary/20 to-primary/5 text-foreground border-primary/40` and corresponding primary shadow classes.
- Change active dot/line to use `bg-primary` and primary shadows.

**Step 3: Hamburger Button Upgrade**
Update the mobile toggle button to use `btn-glass`:
`className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl btn-glass transition-all duration-200 shadow-lg"`

## 5. Verification Method
1. Open the application in a desktop browser viewport. Verify that the sidebar is a floating glass card with a uniform 24px (1.5rem / unit 6) gap on the top and left, and that the border radius is visible.
2. Switch to a mobile viewport. Ensure the slide-out menu fills the screen vertically edge-to-edge without left/top margins, and the hamburger button is visible and styled as glass.
3. Use text search in `Sidebar.tsx` to verify zero instances of `#0ea5e9` and `#38bdf8` remain.
