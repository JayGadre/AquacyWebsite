## 2026-09-18T00:56:31Z
Your task is to implement the global footer fix for Milestone 1.3 of the Aquacy website redesign.
Working Directory: d:/Coding Projects/AquacyWebsite/Aquacy_New_Website/.agents/worker_1.3

Here is the synthesized strategy from the Explorers:
1. `src/components/Footer/Footer.tsx` exists but is manually imported in only some pages.
2. It should be made global by adding it to `src/app/layout.tsx`.
3. The `<main>` wrapper inside `src/app/layout.tsx` should be changed to a `<div>` because each page has its own `<main>`. (Explorer 3 recommendation)
4. All manual `<Footer />` imports and usages must be removed from the individual page files (e.g. `src/app/page.tsx`, `src/app/instruments/page.tsx`, `src/app/communication-modules/page.tsx`, `src/app/systems-monitoring/page.tsx`).

Please implement these changes. You must run the build command (e.g., `npm run build` or similar) to ensure your changes compile correctly, and document the results in your handoff report.
Once complete, write your handoff report to `handoff.md` in your working directory and message me with the outcome.

MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT
hardcode test results, create dummy/facade implementations, or
circumvent the intended task. A Forensic Auditor will independently
verify your work. Integrity violations WILL be detected and your
work WILL be rejected.
