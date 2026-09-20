import { test, expect } from '@playwright/test';

test.describe('About Us Page', () => {
  test('should load about us page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/.*about.*/);
  });

  test('should display company history/mission', async ({ page }) => {
    await page.goto('/about');
    const missionText = page.locator('text=/mission|history|story/i').first();
    await expect(missionText).toBeVisible();
  });

  test('should display team or leadership section', async ({ page }) => {
    await page.goto('/about');
    // It's possible the team section might not exist, but let's test for it or generic content
    const teamSection = page.locator('text=/team|leadership|founders/i').first();
    await expect(teamSection).toBeVisible();
  });

  test('should have a company image or graphic', async ({ page }) => {
    await page.goto('/about');
    const images = page.locator('img');
    await expect(async () => {
      expect(await images.count()).toBeGreaterThan(0);
    }).toPass();
  });

  test('should have correct heading', async ({ page }) => {
    await page.goto('/about');
    const heading = page.locator('h1', { hasText: /about|who we are/i });
    await expect(heading).toBeVisible();
  });
});
