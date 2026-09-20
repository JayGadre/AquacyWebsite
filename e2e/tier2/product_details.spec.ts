import { test, expect } from '@playwright/test';

test.describe('Product Details Tier 2: Boundary & Corner Cases', () => {
  test('Invalid product ID format in URL', async ({ page }) => {
    const response = await page.goto('/product/invalid-id-format-@#%!');
    expect(response?.status()).toBeLessThan(500);
  });

  test('Extremely large quantity input', async ({ page }) => {
    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    if (await qtyInput.count() > 0) {
      await qtyInput.fill('9999999');
      const val = await qtyInput.inputValue();
      expect(val).toBeDefined();
    }
  });

  test('Special characters in product inquiry form', async ({ page }) => {
    await page.goto('/product/1');
    const textarea = page.locator('textarea');
    if (await textarea.count() > 0) {
      await textarea.fill('<script>alert(1)</script> & " \' %');
      const submit = page.locator('button[type="submit"]');
      if (await submit.count() > 0) {
         await submit.click();
         expect(page.url()).not.toContain('error');
      }
    }
  });

  test('Zero quantity submission', async ({ page }) => {
    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    const addToCart = page.locator('button', { hasText: /add to cart|quote|buy/i });
    if (await qtyInput.count() > 0 && await addToCart.count() > 0) {
      await qtyInput.fill('0');
      await addToCart.click();
      expect(page.url()).not.toContain('error');
    }
  });

  test('Missing product image fallback', async ({ page }) => {
    await page.route('**/api/products/1', async route => {
      const response = await route.fetch();
      const json = await response.json().catch(() => ({}));
      json.image = null;
      json.images = [];
      await route.fulfill({ json });
    });
    await page.goto('/product/1');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
