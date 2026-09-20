import { test, expect } from '@playwright/test';

test.describe('A11y & Navigation', () => {
  test('main navigation should be present', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('main navigation should contain links to Core pages', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav.locator('a[href*="catalog"], a[href*="products"]')).toBeVisible();
    await expect(nav.locator('a[href*="about"]')).toBeVisible();
    await expect(nav.locator('a[href*="contact"]')).toBeVisible();
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });

  test('buttons should be accessible (have discernible text)', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const text = await buttons.nth(i).textContent();
      const ariaLabel = await buttons.nth(i).getAttribute('aria-label');
      expect((text && text.trim().length > 0) || (ariaLabel && ariaLabel.trim().length > 0)).toBeTruthy();
    }
  });

  test('should have semantic main and header tags', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main').first()).toBeVisible();
  });
});
