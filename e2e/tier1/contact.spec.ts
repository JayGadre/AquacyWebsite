import { test, expect } from '@playwright/test';

test.describe('Contact Page & Form', () => {
  test('should load contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL(/.*contact.*/);
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form');
    await expect(form.first()).toBeVisible();
  });

  test('should have name, email, and message inputs', async ({ page }) => {
    await page.goto('/contact');
    const nameInput = page.locator('input[name*="name" i], input[id*="name" i], input[type="text"]').first();
    const emailInput = page.locator('input[type="email"], input[name*="email" i]').first();
    const messageInput = page.locator('textarea, input[name*="message" i]').first();
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test('should have a submit button', async ({ page }) => {
    await page.goto('/contact');
    const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await expect(submitBtn).toBeVisible();
  });

  test('should display company contact information (address, phone, email)', async ({ page }) => {
    await page.goto('/contact');
    const contactInfo = page.locator('text=/phone|email|address/i').first();
    await expect(contactInfo).toBeVisible();
  });
});
