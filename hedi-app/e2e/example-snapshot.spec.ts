import { test, expect } from "@playwright/test";

test("Make a Snaphot and compare", async ({ page }) => {
  test.setTimeout(0);
  // go to startpage
  await page.goto("/");
  // Screenshot
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixels: 1050 });
});
