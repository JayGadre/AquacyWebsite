import { test, expect } from '@playwright/test';

test.describe('Homepage Redesign', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*localhost:3000.*/);
  });

  test('should display main hero section', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toBeVisible();
  });

  test('should have call-to-action buttons', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('button', { name: /explore|shop|contact/i }).first();
    await expect(cta).toBeVisible();
  });

  test('should display key features or services section', async ({ page }) => {
    await page.goto('/');
    // Assuming there might not be exact text, we just check for multiple sections
    const sections = page.locator('section');
    await expect(async () => {
      expect(await sections.count()).toBeGreaterThan(1);
    }).toPass();
  });

  test('should have a footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
