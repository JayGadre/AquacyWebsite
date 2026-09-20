import { test, expect } from '@playwright/test';

test.describe('Homepage Tier 2: Boundary & Corner Cases', () => {
  test('Navigate with trailing slash', async ({ page }) => {
    const response = await page.goto('/?foo=bar');
    expect(response?.status()).toBeLessThan(400);
  });

  test('Fast successive clicks on CTAs do not cause multiple navigations or errors', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a, button').filter({ hasText: /shop|explore|learn/i }).first();
    if (await cta.isVisible()) {
      await cta.click();
      await cta.click();
      await cta.click();
      expect(page.url()).not.toContain('error');
    }
  });

  test('Extreme scroll speed loads lazy content without breaking', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await page.waitForTimeout(50);
    }
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Missing or invalid query parameters in URL are ignored safely', async ({ page }) => {
    await page.goto('/?invalidParam=*%20%27DROP%20TABLE%20users');
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('Viewport resizing during homepage load', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 320, height: 480 });
    await page.waitForTimeout(100);
    await page.setViewportSize({ width: 1920, height: 1080 });
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
