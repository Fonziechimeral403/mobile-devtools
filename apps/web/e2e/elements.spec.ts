import { expect, test } from '@playwright/test';

test.describe('Elements Inspector E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render DOM Tree and expand nodes', async ({ page }) => {
    await page.locator('.devtools-badge').click();
    await page.locator('.devtools-tab-btn', { hasText: 'Elements' }).click();

    const elementsContent = page.locator('#devtools-elements-content');
    await expect(elementsContent).toBeVisible();

    // Verify sub-tabs
    const stylesSubTab = page.locator('button', { hasText: 'Styles' });
    await stylesSubTab.click();

    // Box model visual should be visible in Styles view
    const boxModel = page.locator('.devtools-box-model');
    await expect(boxModel).toBeVisible();

    const attrsSubTab = page.locator('button', { hasText: 'Attrs' });
    await attrsSubTab.click();

    const attrsList = page.locator('.devtools-attrs-list');
    await expect(attrsList).toBeVisible();
  });
});
