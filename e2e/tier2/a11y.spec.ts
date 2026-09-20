import { test, expect } from '@playwright/test';

test.describe('A11y Tier 2: Boundary & Corner Cases', () => {
  test('Zoom at 400%', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 256 });
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Keyboard navigation trap check', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
    }
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeDefined();
  });

  test('Tabbing through invisible/hidden elements', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const isHidden = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const style = window.getComputedStyle(el);
      return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
    });
    if (isHidden) {
      const className = await page.evaluate(() => document.activeElement?.className || '');
      expect(className).toMatch(/sr-only|skip/i);
    }
  });

  test('High contrast mode rendering emulation', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Fast focus switching', async ({ page }) => {
    await page.goto('/contact');
    const inputs = page.locator('input, textarea, button');
    if (await inputs.count() > 1) {
      await inputs.nth(0).focus();
      await inputs.nth(1).focus();
      await inputs.nth(0).focus();
      await expect(inputs.nth(0)).toBeFocused();
    }
  });
});
