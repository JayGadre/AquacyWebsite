# E2E Test Infra: Aquacy New Website

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.
- Framework: Playwright (to be installed by E2E Worker)

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Homepage Redesign | ORIGINAL_REQUEST §R2 | 5      | 5      | ✓      |
| 2 | Catalog & Filters | ORIGINAL_REQUEST §R2 | 5      | 5      | ✓      |
| 3 | Product Details | ORIGINAL_REQUEST §R2 | 5      | 5      | ✓      |
| 4 | About Us Page | ORIGINAL_REQUEST §R2 | 5      | 5      | ✓      |
| 5 | Contact Page & Form | ORIGINAL_REQUEST §R2 | 5      | 5      | ✓      |
| 6 | SEO & Meta | ORIGINAL_REQUEST §R3 | 5      | 5      | ✓      |
| 7 | A11y & Navigation | ORIGINAL_REQUEST §R3 | 5      | 5      | ✓      |
| 8 | Responsiveness | ORIGINAL_REQUEST §R4 | 5      | 5      | ✓      |
| 9 | Glassmorphism Theme | ORIGINAL_REQUEST §R1 | 5      | 5      | ✓      |

## Test Architecture
- Test runner: `npx playwright test`
- Framework: Playwright Testing
- Configuration: `playwright.config.ts` (Next.js webServer integration)
- Directory layout:
  - `e2e/tier1/` - Feature Coverage
  - `e2e/tier2/` - Boundary & Corner Cases
  - `e2e/tier3/` - Cross-Feature
  - `e2e/tier4/` - Real-World Scenarios

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Full site traversal (Home -> About -> Contact) | F1, F4, F5, F7, F8 | Medium     |
| 2 | Catalog browsing and filtering | F2, F7, F8, F9 | Medium     |
| 3 | Catalog to Product details flow | F2, F3, F6, F7 | Medium     |
| 4 | Mobile view traversal | F1, F2, F8 | High       |
| 5 | Screen reader / Keyboard navigation flow | F7 | High       |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature (where boundaries exist)
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios
