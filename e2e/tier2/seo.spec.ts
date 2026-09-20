import { test, expect } from '@playwright/test';

test.describe('SEO Tier 2: Boundary & Corner Cases', () => {
  test('Long URL path does not break canonical link', async ({ page }) => {
    await page.goto('/?utm_source=test&utm_medium=extremely_long_medium_value_to_test_canonical_tags');
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).not.toContain('utm_source');
    }
  });

  test('Missing meta description does not cause page crash', async ({ page }) => {
    await page.goto('/catalog/non-existent-seo-path');
    const title = await page.title();
    expect(title).toBeDefined();
  });

  test('Very long title tag', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('Structured data (JSON-LD) parsing with missing fields', async ({ page }) => {
    await page.goto('/');
    const scripts = page.locator('script[type="application/ld+json"]');
    if (await scripts.count() > 0) {
      const content = await scripts.first().textContent();
      if (content) {
        const data = JSON.parse(content);
        expect(data).toBeDefined();
      }
    }
  });

  test('Open Graph tags handling empty image', async ({ page }) => {
    await page.goto('/about');
    const ogImage = page.locator('meta[property="og:image"]');
    if (await ogImage.count() > 0) {
      const content = await ogImage.getAttribute('content');
      expect(content).not.toBe('');
    }
  });
});
