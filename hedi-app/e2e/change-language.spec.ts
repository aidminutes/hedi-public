import { test, expect } from "@playwright/test";

test("should switch through all languages", async ({ page }) => {
  test.setTimeout(0);
  // GO TO STARTPAGE
  await page.goto("/");
  // Check if page is available
  await expect(page.locator("h1")).toContainText("rund um die Schwangerschaft");
  // Click on language switch button
  await page.locator('[aria-label="Sprache ändern"]').first().click();
  // Click on english
  await page.locator('[aria-label="Englisch"]').click();
  // Check if language is switched
  await expect(page).toHaveURL("/en");
  // Click on language switch button
  await page.locator('[aria-label="Change language"]').first().click();
  // Click on french
  await page.locator('[aria-label="French"]').click();
  // Check if language is switched
  await expect(page).toHaveURL("/fr");
  // Click on language switch button
  await page.locator('[aria-label="Changer de langue"]').first().click();
  // Click on ukrainian
  await page.locator('[aria-label="Ukrainien"]').click();
  // Check if language is switched
  await expect(page).toHaveURL("/uk");
  // Click on language switch button
  await page.locator('[aria-label="Змінити мову"]').first().click();
  // Click on persian
  await page.locator('[aria-label="Перська"]').click();
  // Check if language is switched
  await expect(page).toHaveURL("/fa");
});
