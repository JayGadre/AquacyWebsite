import { test, expect } from '@playwright/test';

test.describe('Responsiveness Tier 2: Boundary & Corner Cases', () => {
  test('Exact breakpoint boundary (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(768);
  });

  test('Exact breakpoint boundary (1024px)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/catalog');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(1024);
  });

  test('Extreme aspect ratio (200x800)', async ({ page }) => {
    await page.setViewportSize({ width: 200, height: 800 });
    await page.goto('/about');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Changing orientation (Portrait to Landscape)', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(100);
    await page.setViewportSize({ width: 812, height: 375 });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(812);
  });

  test('Continuous window resizing', async ({ page }) => {
    await page.goto('/');
    for (let w = 400; w <= 800; w += 100) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.waitForTimeout(50);
    }
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
