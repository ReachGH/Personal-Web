import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("summaries stay visible and only clicking expands the overview", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Mouse interaction only");
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "Minecraft status bot",
  });
  const details = page.locator("#project-details-bot");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(details).toHaveAttribute("inert", "");
  await expect(page.locator("#project-summary-bot")).toBeVisible();
  await toggle.hover();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(details).not.toHaveAttribute("inert", "");
  await expect
    .poll(async () => (await details.boundingBox())!.height)
    .toBeGreaterThan(0);
  await page.locator("#personal-projects-title").hover();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("button", {
      name: "React Native To-Do App",
    })
    .focus();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect.poll(async () => (await details.boundingBox())!.height).toBe(0);
  await expect(page.locator("#project-summary-bot")).toBeVisible();
});
test("keyboard users can open details, reach the source, and close with Escape", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "CIFAR-10 Image Classification",
  });
  await toggle.focus();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await toggle.press("Tab");
  const source = page.getByRole("link", {
    name: "View CIFAR-10 Image Classification source on GitHub",
  });
  await expect(source).toBeFocused();
  await expect(source).toHaveAttribute(
    "href",
    "https://github.com/ReachGH/CIFAR-10-Image-Classifier",
  );
  const audit = await new AxeBuilder({
    page,
  })
    .include("#personal-projects")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await source.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(source).toHaveCount(0);
});
test("touch users can tap to open and close a description", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Touch interaction only");
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "React Native To-Do App",
  });
  await expect(page.locator("#project-summary-tasks")).toBeVisible();
  await toggle.tap();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#project-details-tasks")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await page
    .locator('#project-details-tasks [data-ui~="other-project-overview"]')
    .last()
    .tap();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
test("the whole row toggles while source links and text selection stay independent", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "CIFAR-10 Image Classification",
  });
  const row = page.locator('[data-ui~="other-project"]').filter({
    has: toggle,
  });
  await page.locator("#project-summary-image").click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await row.locator('[data-ui~="other-project-overview"]').last().click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await row
    .locator('[data-ui~="other-project-overview"]')
    .first()
    .evaluate((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
      element.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
        }),
      );
    });
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.evaluate(() => window.getSelection()?.removeAllRanges());
  await context.route(
    "https://github.com/ReachGH/CIFAR-10-Image-Classifier",
    (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "Project source",
      }),
  );
  const popupPromise = page.waitForEvent("popup");
  await row
    .getByRole("link", {
      name: /source on GitHub/,
    })
    .click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await expect(popup).toHaveURL(
    "https://github.com/ReachGH/CIFAR-10-Image-Classifier",
  );
  await popup.close();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  // Exercise empty row padding, outside the heading and source link.
  await row.click({
    position: {
      x: 2,
      y: (await row.boundingBox())!.height - 3,
    },
  });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
