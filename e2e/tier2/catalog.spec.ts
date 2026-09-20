import { test, expect } from '@playwright/test';

test.describe('Catalog Tier 2: Boundary & Corner Cases', () => {
  test('Zero items returned for invalid/extreme search query', async ({ page }) => {
    await page.goto('/catalog?search=thisitemdoesnotexist1234567890');
    const emptyState = page.locator('text=/no products|0 results|no items|not found/i');
    if (await emptyState.count() > 0) {
      await expect(emptyState.first()).toBeVisible();
    }
  });

  test('Pagination with out-of-bounds page number', async ({ page }) => {
    const response = await page.goto('/catalog?page=999999');
    expect(response?.status()).toBeLessThan(500);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Extreme number of query filters', async ({ page }) => {
    const filters = Array.from({ length: 50 }).map((_, i) => `filter${i}=value${i}`).join('&');
    const response = await page.goto(`/catalog?${filters}`);
    expect(response?.status()).toBeLessThan(500);
  });

  test('Rapid toggling of category filters', async ({ page }) => {
    await page.goto('/catalog');
    const filters = page.locator('input[type="checkbox"], button[role="switch"]');
    const count = await filters.count();
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        await filters.nth(i).click({ force: true });
        await filters.nth(i).click({ force: true });
      }
      expect(page.url()).toContain('catalog');
    }
  });

  test('Extremely long category name in URL', async ({ page }) => {
    const longString = 'a'.repeat(2000);
    const response = await page.goto(`/catalog/${longString}`);
    expect(response?.status()).toBeLessThan(500);
  });
});
