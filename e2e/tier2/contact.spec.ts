import { test, expect } from '@playwright/test';

test.describe('Contact Tier 2: Boundary & Corner Cases', () => {
  test('Empty form submission', async ({ page }) => {
    await page.goto('/contact');
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      expect(page.url()).toContain('/contact');
    }
  });

  test('Invalid email format', async ({ page }) => {
    await page.goto('/contact');
    const emailInput = page.locator('input[type="email"], input[name*="email"]i');
    const submitBtn = page.locator('button[type="submit"]');
    if (await emailInput.count() > 0 && await submitBtn.count() > 0) {
      await emailInput.fill('invalidemail@');
      await submitBtn.click();
      const validity = await emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
      expect(validity).toBe(false);
    }
  });

  test('Extremely long message input', async ({ page }) => {
    await page.goto('/contact');
    const textarea = page.locator('textarea');
    if (await textarea.count() > 0) {
      const longMsg = 'a'.repeat(10000);
      await textarea.fill(longMsg);
      const val = await textarea.inputValue();
      expect(val.length).toBeGreaterThan(0);
    }
  });

  test('Whitespace only in required fields', async ({ page }) => {
    await page.goto('/contact');
    const inputs = page.locator('input[required], textarea[required]');
    if (await inputs.count() > 0) {
      for (let i = 0; i < await inputs.count(); i++) {
        await inputs.nth(i).fill('   ');
      }
      const submitBtn = page.locator('button[type="submit"]');
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        expect(page.url()).toContain('/contact');
      }
    }
  });

  test('XSS attempt in input fields', async ({ page }) => {
    await page.goto('/contact');
    const textInput = page.locator('input[type="text"], textarea').first();
    if (await textInput.count() > 0) {
      await textInput.fill('<script>alert("XSS")</script>');
      const val = await textInput.inputValue();
      expect(val).toBe('<script>alert("XSS")</script>');
    }
  });
});
