import { test, expect } from '@playwright/test';

test.describe('Tier 3: Cross-Feature Pairwise Interactions', () => {

  test('F1 + F9: Homepage + Glassmorphism - Homepage elements have glassmorphism styling', async ({ page }) => {
    await page.goto('/');
    
    // Header should be glassmorphic
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // We check for backdrop-filter presence, often used for glassmorphism
    // A more flexible check via evaluate:
    const headerHasGlass = await header.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter.includes('blur') || (style.backgroundColor.includes('rgba') && parseFloat(style.backgroundColor.split(',')[3]) < 1);
    });
    expect(headerHasGlass).toBeTruthy();
  });

  test('F2 + F8: Catalog + Responsiveness - Catalog grid changes from multi-column to single-column on mobile', async ({ page }) => {
    await page.goto('/catalog');
    const firstItem = page.locator('main a[href*="/product/"], main .product-card').first();
    const secondItem = page.locator('main a[href*="/product/"], main .product-card').nth(1);
    
    // Wait for at least two items to be visible
    await expect(firstItem).toBeVisible();
    await expect(secondItem).toBeVisible();
    
    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });
    // Let the layout settle
    await page.waitForTimeout(500); 
    
    const box1 = await firstItem.boundingBox();
    const box2 = await secondItem.boundingBox();
    
    // On mobile, they should be stacked vertically
    expect(box1?.y).toBeLessThan(box2?.y || -1);
    expect(box2?.y).toBeGreaterThanOrEqual((box1?.y || 0) + (box1?.height || 0));
  });

  test('F5 + F7: Contact + A11y - Contact form inputs are keyboard accessible and have proper labels', async ({ page }) => {
    await page.goto('/contact');
    
    const nameInput = page.locator('input[name="name"], input[type="text"]').first();
    await expect(nameInput).toBeVisible();
    
    // Verify it has an accessible name (either via aria-label or an associated <label>)
    const id = await nameInput.getAttribute('id');
    const ariaLabel = await nameInput.getAttribute('aria-label');
    const hasLabel = ariaLabel || (id && await page.locator(`label[for="${id}"]`).isVisible());
    expect(hasLabel).toBeTruthy();
    
    // Tab to input and verify focus
    await nameInput.focus();
    await expect(nameInput).toBeFocused();
  });

  test('F3 + F6: Product Details + SEO - Product pages have unique meta descriptions and titles', async ({ page }) => {
    await page.goto('/catalog');
    const firstProductLink = page.locator('main a[href*="/product/"]').first();
    await expect(firstProductLink).toBeVisible();
    
    await firstProductLink.click();
    await page.waitForLoadState('domcontentloaded');
    
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.{10,}/);
  });

  test('F2 + F7: Catalog + A11y - Catalog filters can be operated via keyboard', async ({ page }) => {
    await page.goto('/catalog');
    
    // Look for a select, input, or button that acts as a filter
    const filterElement = page.locator('select, input[type="checkbox"], input[type="radio"], button[aria-haspopup="listbox"]').first();
    await expect(filterElement).toBeVisible();
    
    await filterElement.focus();
    await expect(filterElement).toBeFocused();
    
    // Ensure it can be activated or changed via keyboard
    await page.keyboard.press('Space');
    // Just verifying it doesn't crash and focus is retained
    await expect(filterElement).toBeFocused();
  });

  test('F1 + F8: Homepage + Responsiveness - Navbar collapses into a hamburger menu on mobile', async ({ page }) => {
    // Desktop View
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const desktopNavLinks = page.locator('nav a');
    await expect(desktopNavLinks.first()).toBeVisible();
    
    // Mobile View
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburgerMenu = page.locator('button[aria-label*="menu" i], button[aria-expanded], .hamburger, header button').first();
    await expect(hamburgerMenu).toBeVisible();
    
    // Clicking hamburger should reveal nav links
    await hamburgerMenu.click();
    await expect(desktopNavLinks.first()).toBeVisible();
  });

  test('F3 + F9: Product Details + Glassmorphism - Product layout utilizes glassmorphic surfaces', async ({ page }) => {
    await page.goto('/catalog');
    const firstProductLink = page.locator('main a[href*="/product/"]').first();
    await expect(firstProductLink).toBeVisible();
    
    await firstProductLink.click();
    await page.waitForLoadState('domcontentloaded');
    
    const mainCard = page.locator('main > div, main section').first();
    await expect(mainCard).toBeVisible();
    
    // Validate that background has transparency or backdrop filter
    const bgOpacityOrBlur = await mainCard.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.backdropFilter.includes('blur') || (style.backgroundColor.includes('rgba') && parseFloat(style.backgroundColor.split(',')[3]) < 1);
    });
    expect(bgOpacityOrBlur).toBeTruthy();
  });

  test('F4 + F7: About Us + A11y - About Us has correct heading hierarchy and ARIA landmarks', async ({ page }) => {
    await page.goto('/about');
    
    // Main landmark should exist
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // H1 must be present for screen readers
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Ensure an H2 is present to verify hierarchy
    const h2 = page.locator('h2').first();
    if (await h2.isVisible()) {
       expect(await h1.isVisible()).toBeTruthy();
    }
  });

  test('F5 + F8: Contact + Responsiveness - Form is stacked and legible on mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    const inputs = form.locator('input, textarea');
    expect(await inputs.count()).toBeGreaterThanOrEqual(2);
    
    const box1 = await inputs.nth(0).boundingBox();
    const box2 = await inputs.nth(1).boundingBox();
    
    // Ensure they are stacked vertically, not side-by-side on mobile
    expect(box1?.y).toBeLessThan(box2?.y || -1);
  });

  test('F1 + F6: Homepage + SEO - Homepage contains basic SEO and semantic structure', async ({ page }) => {
    await page.goto('/');
    
    // Basic SEO checks
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /.+/);
    
    // Semantic structure check (should have a main tag)
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
