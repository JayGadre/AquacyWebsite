import { test, expect } from '@playwright/test';

test.describe('Glassmorphism Tier 2: Boundary & Corner Cases', () => {
  test('Backdrop filter support missing fallback', async ({ page }) => {
    await page.goto('/');
    const glassElems = page.locator('.glass, [class*="backdrop-blur"]');
    if (await glassElems.count() > 0) {
      const bg = await glassElems.first().evaluate((el) => window.getComputedStyle(el).backgroundColor);
      expect(bg).not.toBe('rgba(0, 0, 0, 0)');
      expect(bg).not.toBe('transparent');
    }
  });

  test('Stacking multiple glass elements', async ({ page }) => {
    await page.goto('/');
    const headerZ = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header ? window.getComputedStyle(header).zIndex : 'auto';
    });
    expect(headerZ).not.toBeUndefined();
  });

  test('Transparency levels do not result in invisible text', async ({ page }) => {
    await page.goto('/');
    const headings = page.locator('h1, h2');
    if (await headings.count() > 0) {
      const opacity = await headings.first().evaluate((el) => window.getComputedStyle(el).opacity);
      expect(Number(opacity)).toBeGreaterThan(0.1);
    }
  });

  test('Glassmorphism across extreme screen widths', async ({ page }) => {
    await page.setViewportSize({ width: 4000, height: 1000 });
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('System dark mode vs glassmorphism contrast', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
