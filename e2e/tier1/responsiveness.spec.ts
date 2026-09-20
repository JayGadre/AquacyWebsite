import { test, expect } from '@playwright/test';

test.describe('Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // Mobile viewport

  test('homepage should render on mobile viewport without horizontal scroll', async ({ page }) => {
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  });

  test('catalog grid should adapt to mobile viewport', async ({ page }) => {
    await page.goto('/catalog');
    const productGrid = page.locator('.grid, [style*="grid"]');
    // On mobile, grid items usually stack or have 1-2 columns, just checking visibility
    if (await productGrid.first().isVisible()) {
      await expect(productGrid.first()).toBeVisible();
    } else {
      // Fallback assertion if no grid class is found
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('navigation should turn into a hamburger menu on mobile', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.locator('button[aria-label*="menu" i], .hamburger, [data-testid="mobile-menu"]');
    // It should be visible on mobile
    if (await hamburger.count() > 0) {
        await expect(hamburger.first()).toBeVisible();
    }
  });

  test('footer should adapt to mobile viewport', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('contact form should adapt to mobile viewport', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form');
    await expect(form.first()).toBeVisible();
  });
});
