import { test, expect } from '@playwright/test';

test.describe('Floating Badge E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render floating badge with title', async ({ page }) => {
    const badge = page.locator('.devtools-badge');
    await expect(badge).toBeVisible();

    const label = page.locator('.devtools-badge-label');
    await expect(label).toHaveText('DevTools');
  });

  test('should update error counter badge when console error occurs', async ({ page }) => {
    const triggerErrorBtn = page.getByRole('button', { name: 'console.error()' });
    await triggerErrorBtn.click();

    const errorCountBadge = page.locator('.devtools-badge-count');
    await expect(errorCountBadge).toBeVisible();
    await expect(errorCountBadge).toHaveText('1');
  });
});
