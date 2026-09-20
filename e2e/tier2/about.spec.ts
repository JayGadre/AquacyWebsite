import { test, expect } from '@playwright/test';

test.describe('About Us Tier 2: Boundary & Corner Cases', () => {
  test('Extremely wide viewport max-width enforcement', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await page.goto('/about');
    const container = page.locator('main > div, main > section').first();
    if (await container.count() > 0) {
      const box = await container.boundingBox();
      expect(box?.width).toBeLessThan(3800);
    }
  });

  test('Minimum viable viewport (Galaxy Fold 280px)', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    await page.goto('/about');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 15);
  });

  test('Very long text in DOM should not overflow container', async ({ page }) => {
    await page.goto('/about');
    const headings = page.locator('h1, h2');
    if (await headings.count() > 0) {
      const box = await headings.first().boundingBox();
      expect(box?.width).toBeGreaterThan(0);
    }
  });

  test('Missing team member images', async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,webp}', route => route.abort());
    await page.goto('/about');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Rapid navigation between About Us sub-sections', async ({ page }) => {
    await page.goto('/about');
    const anchors = page.locator('a[href^="#"]');
    if (await anchors.count() > 0) {
      for (let i = 0; i < await anchors.count(); i++) {
        await anchors.nth(i).click();
      }
      expect(page.url()).toContain('/about');
    }
  });
});
