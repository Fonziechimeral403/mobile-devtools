import { expect, test } from '@playwright/test';

test.describe('Network Inspector & Detail Modal E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open network detail modal and inspect response/headers', async ({ page }) => {
    // Trigger network request
    const triggerFetchBtn = page.getByRole('button', { name: 'GET /users/1 (200)' });
    if (await triggerFetchBtn.isVisible()) {
      await triggerFetchBtn.click();
    }

    await page.locator('.devtools-badge').click();
    await page.locator('.devtools-tab-btn', { hasText: 'Network' }).click();

    const networkRow = page.locator('.devtools-network-row').first();
    await expect(networkRow).toBeVisible();

    // Click row to open detail modal
    await networkRow.click();

    const detailModal = page.locator('.devtools-detail-modal');
    await expect(detailModal).toBeVisible();

    // Verify sub-tabs inside detail modal
    const respTab = page.locator('.devtools-tab-btn', { hasText: 'Response' });
    const headersTab = page.locator('.devtools-tab-btn', { hasText: 'Headers' });

    await expect(respTab).toBeVisible();
    await headersTab.click();
    await expect(headersTab).toHaveClass(/active/);

    // Back button to close detail modal
    const backBtn = page.locator('button[title="Back to request list"]');
    await backBtn.click();
    await expect(detailModal).not.toBeVisible();
  });

  test('should allow selecting network throttling preset', async ({ page }) => {
    await page.locator('.devtools-badge').click();
    await page.locator('.devtools-tab-btn', { hasText: 'Network' }).click();

    const throttlingSelect = page.locator('select[title*="Network Speed"]');
    await expect(throttlingSelect).toBeVisible();
    await throttlingSelect.selectOption('fast-3g');

    await expect(throttlingSelect).toHaveValue('fast-3g');
  });
});
