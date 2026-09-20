# Scope: E2E Test Suite Creation

## Architecture
- Playwright for E2E testing of the Next.js application.
- Tests will be located in the `e2e/` directory at the project root.
- Tiers separated into `e2e/tier1`, `e2e/tier2`, etc.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Setup & Tier 1 | Install Playwright, configure `playwright.config.ts`, implement >=5 Tier 1 tests per feature. | none | DONE |
| 2 | Tier 2 | Implement >=5 Tier 2 tests per feature. | M1 | DONE |
| 3 | Tier 3 | Implement pairwise Tier 3 tests. | M2 | DONE |
| 4 | Tier 4 | Implement >=5 Tier 4 realistic scenarios. | M3 | DONE |

## Interface Contracts
### Test Suite ↔ Next.js App
- The application will run on `http://localhost:3000` via Next.js webServer configured in `playwright.config.ts`.
- Tests must be opaque-box and not depend on internal state, purely using DOM elements, standard navigation, and locators.
