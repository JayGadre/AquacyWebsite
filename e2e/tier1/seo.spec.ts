import { test, expect } from '@playwright/test';

test.describe('SEO & Meta', () => {
  test('homepage should have a proper title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.toLowerCase()).toContain('aquacy');
  });

  test('homepage should have a meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('catalog page should have proper title', async ({ page }) => {
    await page.goto('/catalog');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.toLowerCase()).toMatch(/catalog|products|aquacy/);
  });

  test('pages should have canonical URLs', async ({ page }) => {
    await page.goto('/');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
  });

  test('about page should have proper title', async ({ page }) => {
    await page.goto('/about');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.toLowerCase()).toMatch(/about|aquacy/);
  });
});
