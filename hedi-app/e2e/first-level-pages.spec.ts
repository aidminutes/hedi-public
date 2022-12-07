import { test, expect } from "@playwright/test";

test("should navigate to all the first level pages", async ({ page }) => {
  test.setTimeout(0);
  // GO TO STARTPAGE
  await page.goto("/");
  // Check if page is available
  await expect(page.locator("h1")).toContainText("rund um die Schwangerschaft");
  // click on über hedi button
  await page.locator('[aria-label="Über HEDI"]').click();
  // check if on right page
  await expect(page).toHaveURL("/de/ueber-hedi");
  // check if content is available
  await expect(
    page.locator(".hedi--about-page__intro__headline")
  ).toContainText("Was ist");
  // click on glossar button
  await page.locator('[aria-label="Glossar"]').click();
  // check if on right page
  await expect(page).toHaveURL("/de/glossar");
  // check if h1 is available
  await expect(page.locator("h1")).toContainText("Glossar");
  // click on faq button
  await page.locator('[aria-label="Häufig gestellte Fragen"]').click();
  // check if on right page
  await expect(page).toHaveURL("/de/faq");
  // check if h1 is available
  await expect(page.locator("h1")).toContainText("Häufig gestellte Fragen");
  // click on contact button
  await page
    .locator(".hedi--footer__menu-item", { hasText: "Kontakt" })
    .first()
    .click();
  // check if on right page
  await expect(page).toHaveURL("/de/kontakt");
  // check if h1 is available
  await expect(page.locator("h1")).toContainText("Kontakt");
  // click on imprint button
  await page
    .locator(".hedi--footer__menu-item", { hasText: "Impressum" })
    .first()
    .click();
  // check if on right page
  await expect(page).toHaveURL("/de/impressum");
  // check if h1 is available
  await expect(page.locator("h1")).toContainText("Impressum");
  // click on data safety button
  await page
    .locator(".hedi--footer__menu-item", { hasText: "Datenschutz" })
    .first()
    .click();
  // check if on right page
  await expect(page).toHaveURL("/de/datenschutz");
  // check if h1 is available
  await expect(page.locator("h1")).toContainText("Datenschutz");
});
