import { test, expect } from "@playwright/test";

test("Enter 'Schwangerschaft' in search-input and get 20 results", async ({
  page,
}) => {
  test.setTimeout(0);
  // go to search page
  await page.goto("/suche");
  // fill in "Schwangerschaft into search input"
  await page.fill("#search-results", "Schwangerschaft");
  // get search results
  const searchResults = page.locator(".hedi--search__results .hedi--entry");
  // check if 20 search results exits
  await expect(searchResults).toHaveCount(20);
});
