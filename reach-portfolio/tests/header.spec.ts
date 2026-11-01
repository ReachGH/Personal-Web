import { expect, test, type Page } from "@playwright/test";

async function scroll(page: Page, top: number) {
  await page.evaluate(async (y) => {
    scrollTo({ top: y, behavior: "instant" });
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  }, top);
}

test("header stays full-width while scrolling and the name returns to the top", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const header = page.locator(".site-header");
  const surface = page.locator(".header-surface");
  const brand = header.getByRole("link", { name: "sovanreach in, home" });
  const initial = (await surface.boundingBox())!;
  expect(Math.round(initial.width)).toBe(page.viewportSize()!.width);
  await expect(brand).toBeVisible();
  await expect(page.locator(".brand")).toHaveText("sovanreach in.");
  const resume = page.locator(".header-utilities .nav-resume");
  await expect(resume).toHaveAttribute("href", "/Sovanreach_In_Resume.pdf");
  await expect(resume).toHaveAttribute("download", "");
  for (const top of [100, 650, 200, 900]) {
    await scroll(page, top);
    await expect(brand).toBeVisible();
    expect(await surface.boundingBox()).toEqual(initial);
    expect(await surface.evaluate((el) => el.getAnimations().length)).toBe(0);
  }
  // Use the actual sticky control without automation scrolling it first.
  const bounds = (await brand.boundingBox())!;
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2;
  if (testInfo.project.name === "mobile") await page.touchscreen.tap(x, y);
  else await page.mouse.click(x, y);
  await expect(page).toHaveURL("/#top");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expect(brand).toBeVisible();
});

test("case studies and homepage anchors keep the same header", async ({
  page,
}) => {
  await page.goto("/projects/onboardhq");
  const brand = page.getByRole("link", { name: "sovanreach in, home" });
  await expect(brand).toBeVisible();
  await brand.click();
  await expect(page).toHaveURL("/");
  await expect(brand).toBeVisible();
  await page.goto("/#work");
  await expect(brand).toBeVisible();
  await page.reload();
  await expect(brand).toBeVisible();
});

test("full name and controls fit a narrow phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const name = (await page.locator(".brand").boundingBox())!;
  const link = (await page.locator(".brand-link").boundingBox())!;
  const controls = (await page.locator(".header-actions").boundingBox())!;
  expect(link.width).toBeGreaterThanOrEqual(name.width - 1);
  expect(name.x + name.width + 4).toBeLessThanOrEqual(controls.x);
  await expect(page.locator(".nav-resume")).toBeVisible();
  await expect(page.locator(".theme-toggle")).toBeVisible();
});

test("mobile menu remains usable and restores focus on Escape", async ({
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
  await expect(
    page.getByRole("link", { name: "sovanreach in, home" }),
  ).toBeVisible();
});
