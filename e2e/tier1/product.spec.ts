import { test, expect } from '@playwright/test';

test.describe('Product Details', () => {
  // Assuming there is a product at /product/1 or similar. We can navigate to catalog and click a product.
  test('should load product details page', async ({ page }) => {
    await page.goto('/catalog');
    const firstProductLink = page.locator('a[href*="/product/"], a[href*="/catalog/"]').first();
    if (await firstProductLink.isVisible()) {
      await firstProductLink.click();
    } else {
      await page.goto('/product/sample-product');
    }
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display product title and description', async ({ page }) => {
    await page.goto('/product/sample-product');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('p').first()).toBeVisible();
  });

  test('should display product price', async ({ page }) => {
    await page.goto('/product/sample-product');
    const priceText = page.locator('text=/₹|\\$|€|£/').first();
    await expect(priceText).toBeVisible();
  });

  test('should have an add to cart or contact for quote button', async ({ page }) => {
    await page.goto('/product/sample-product');
    const actionButton = page.getByRole('button', { name: /add to cart|quote|contact/i });
    await expect(actionButton.first()).toBeVisible();
  });

  test('should display product images', async ({ page }) => {
    await page.goto('/product/sample-product');
    const image = page.locator('img').first();
    await expect(image).toBeVisible();
  });
});
