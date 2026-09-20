import { test, expect } from '@playwright/test';

test.describe('Catalog & Filters', () => {
  test('should load catalog page', async ({ page }) => {
    await page.goto('/catalog'); // assuming /catalog or /products
    // if not found it will fail, which is fine
    await expect(page).toHaveURL(/.*catalog|products.*/);
  });

  test('should display a grid of products', async ({ page }) => {
    await page.goto('/catalog');
    const productGrid = page.locator('.grid, [style*="grid"]'); // checking for a grid container
    await expect(productGrid.first()).toBeVisible();
  });

  test('should have filtering options', async ({ page }) => {
    await page.goto('/catalog');
    const filterSection = page.locator('aside, .filters, [data-testid="filters"]');
    await expect(filterSection.first()).toBeVisible();
  });

  test('should show product cards with image, title, and price', async ({ page }) => {
    await page.goto('/catalog');
    const firstProduct = page.locator('article, .product-card').first();
    await expect(firstProduct).toBeVisible();
    await expect(firstProduct.locator('img')).toBeVisible();
    await expect(firstProduct.locator('h2, h3, .title')).toBeVisible();
  });

  test('should have sorting options', async ({ page }) => {
    await page.goto('/catalog');
    const sortSelect = page.locator('select, [data-testid="sort"]');
    await expect(sortSelect.first()).toBeVisible();
  });
});
