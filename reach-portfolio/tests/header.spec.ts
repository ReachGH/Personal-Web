import { expect, test } from "@playwright/test";

test("home header expands on scroll and returns without shifting the page", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  const surface = page.locator(".header-surface");
  const brand = header.locator(".brand-link");
  await expect(header).toHaveAttribute("data-compact", "true");
  await expect(brand).toBeHidden();
  await expect(brand).toHaveAttribute("tabindex", "-1");
  expect((await surface.boundingBox())!.width).toBeLessThan(
    page.viewportSize()!.width * 0.95,
  );
  const heroTop = await page
    .locator(".hero")
    .evaluate((hero) => hero.getBoundingClientRect().top + scrollY);
  await page.evaluate(() => scrollTo({ top: 240, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-compact", "false");
  await expect(brand).toBeVisible();
  await expect
    .poll(async () => Math.round((await surface.boundingBox())!.width))
    .toBe(page.viewportSize()!.width);
  expect(
    await page
      .locator(".hero")
      .evaluate((hero) => hero.getBoundingClientRect().top + scrollY),
  ).toBeCloseTo(heroTop, 1);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-compact", "true");
  await expect(brand).toBeHidden();
});

test("case studies keep the full header and home links restore the right state", async ({
  page,
}) => {
  await page.goto("/projects/onboardhq");
  const header = page.locator(".site-header");
  await expect(header).toHaveAttribute("data-compact", "false");
  await expect(header.getByRole("link", { name: "Reach, home" })).toBeVisible();
  await header.getByRole("link", { name: "Reach, home" }).click();
  await expect(page).toHaveURL("/");
  await expect(header).toHaveAttribute("data-compact", "true");
  await page.goto("/#work");
  await expect(header).toHaveAttribute("data-compact", "false");
  await page.reload();
  await expect(header).toHaveAttribute("data-compact", "false");
});

test("compact mobile menu remains usable and restores focus on Escape", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile menu only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(nav).toBeVisible();
  const bounds = (await nav.boundingBox())!;
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(
    page.viewportSize()!.width,
  );
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL("/#contact");
  await expect(page.locator("#contact h2")).toBeInViewport();
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-compact",
    "false",
  );
});
