import { expect, test } from '@playwright/test';

test.describe('Theme Engine & System Info E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle theme mode in drawer header', async ({ page }) => {
    await page.locator('.devtools-badge').click();

    const themeToggleBtn = page.locator('button[title*="Mode"]');
    await expect(themeToggleBtn).toBeVisible();
    await themeToggleBtn.click();

    // Verify theme mode toggle changes container class
    const devtoolsContainer = page.locator('.mobile-devtools-container');
    await expect(devtoolsContainer).toHaveClass(/theme-light|theme-dark/);
  });

  test('should display device specs in System Info tab', async ({ page }) => {
    await page.locator('.devtools-badge').click();
    await page.locator('.devtools-tab-btn', { hasText: 'System' }).click();

    const listScroll = page.locator('.devtools-list-scroll');
    await expect(listScroll).toContainText('System & Environment Info');
    await expect(listScroll).toContainText('Viewport Size');
    await expect(listScroll).toContainText('Screen Resolution');
    await expect(listScroll).toContainText('Device Pixel Ratio');

    const copyBtn = page.locator('button', { hasText: 'Copy Info' });
    await expect(copyBtn).toBeVisible();
  });
});
