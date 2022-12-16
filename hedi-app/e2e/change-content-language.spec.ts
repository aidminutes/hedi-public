import { test, expect } from "@playwright/test";
test("change content language", async ({ page }) => {
  test.setTimeout(0);
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");
  // Click text=Themen >> nth=0
  await page.locator("text=Themen").first().click();
  // Click [aria-label="Schwangerschaft"] >> text=Schwangerschaft
  await page
    .locator('[aria-label="Schwangerschaft"] >> text=Schwangerschaft')
    .click();
  // Go to http://localhost:3000/de/schwangerschaft
  await page.goto("http://localhost:3000/de/schwangerschaft");
  // Click text=Übelkeit und Erbrechen
  await page.locator("text=Übelkeit und Erbrechen").click();
  // Go to http://localhost:3000/de/schwangerschaft/schwangerschaftsbeschwerden/uebelkeit-und-erbrechen
  await page.goto(
    "http://localhost:3000/de/schwangerschaft/schwangerschaftsbeschwerden/uebelkeit-und-erbrechen"
  );
  // Expect h1 to have text "Übelkeit und Erbrechen"
  await expect(page.locator("h1")).toContainText("Übelkeit und Erbrechen");
  // Click [aria-label="open and close list of options"] >> nth=2
  await page
    .locator('[aria-label="open and close list of options"]')
    .nth(2)
    .click();
  // Click button[role="menuitem"]:has-text("Englisch")
  await page.locator('button[role="menuitem"]:has-text("Englisch")').click();
  // Expect h1 to have text "Nausea and Vomiting"
  await expect(page.locator("h1")).toContainText("Nausea and Vomiting");
});
