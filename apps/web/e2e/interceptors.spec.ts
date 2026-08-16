import { test, expect } from '@playwright/test';

test.describe('Console & Network Interceptors E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should capture console log, warn, error in Console Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'console.log()' }).click();
    await page.getByRole('button', { name: 'console.warn()' }).click();

    await page.locator('.devtools-badge').click();
    await page.locator('.devtools-tab-btn', { hasText: 'Console' }).click();

    const listScroll = page.locator('.devtools-list-scroll');
    await expect(listScroll).toContainText('User triggered console log');
    await expect(listScroll).toContainText('Performance Warning');
  });

  test('should capture fetch requests in Network Tab', async ({ page }) => {
    await page.getByRole('button', { name: 'GET /users/1 (200)' }).click();

    await page.locator('.devtools-badge').click();
    await page.locator('.devtools-tab-btn', { hasText: 'Network' }).click();

    const networkRow = page.locator('.devtools-network-row').first();
    await expect(networkRow).toBeVisible();
    await expect(networkRow).toContainText('GET');
  });
});
