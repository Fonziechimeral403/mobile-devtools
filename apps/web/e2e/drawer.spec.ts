import { test, expect } from '@playwright/test';

test.describe('Drawer Overlay E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open drawer when floating badge is clicked', async ({ page }) => {
    const drawer = page.locator('.devtools-drawer');
    await expect(drawer).not.toHaveClass(/open/);

    const badge = page.locator('.devtools-badge');
    await badge.click();

    await expect(drawer).toHaveClass(/open/);
  });

  test('should switch tabs inside drawer', async ({ page }) => {
    const badge = page.locator('.devtools-badge');
    await badge.click();

    const networkTab = page.locator('.devtools-tab-btn', { hasText: 'Network' });
    await networkTab.click();
    await expect(networkTab).toHaveClass(/active/);

    const storageTab = page.locator('.devtools-tab-btn', { hasText: 'Storage' });
    await storageTab.click();
    await expect(storageTab).toHaveClass(/active/);

    const systemTab = page.locator('.devtools-tab-btn', { hasText: 'System' });
    await systemTab.click();
    await expect(systemTab).toHaveClass(/active/);
  });

  test('should close drawer when close button is clicked', async ({ page }) => {
    const badge = page.locator('.devtools-badge');
    await badge.click();

    const drawer = page.locator('.devtools-drawer');
    await expect(drawer).toHaveClass(/open/);

    const closeBtn = page.locator('.devtools-close-btn');
    await closeBtn.click();

    await expect(drawer).not.toHaveClass(/open/);
  });
});
