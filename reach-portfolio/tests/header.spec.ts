import { expect, test } from "@playwright/test";

test("home header expands on scroll and returns without shifting the page", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const header = page.locator(".site-header");
  const surface = page.locator(".header-surface");
  const brand = header.locator(".brand-link");
  async function pressLogo() {
    // Click the visible sticky control without automation scrolling it into
    // the document's scroll-padding area and collapsing it before the click.
    const bounds = (await brand.boundingBox())!;
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    if (testInfo.project.name === "mobile") await page.touchscreen.tap(x, y);
    else await page.mouse.click(x, y);
  }
  await expect(header).toHaveAttribute("data-compact", "true");
  await expect(brand).toBeHidden();
  await expect(brand).toHaveAttribute("tabindex", "-1");
  const resume = page.locator(".header-utilities .nav-resume");
  await expect(resume).toBeVisible();
  await expect(resume).toHaveAttribute("href", "/Sovanreach_In_Resume.pdf");
  await expect(resume).toHaveAttribute("download", "");
  expect((await surface.boundingBox())!.width).toBeLessThan(
    page.viewportSize()!.width * 0.95,
  );
  const heroTop = await page
    .locator(".hero")
    .evaluate((hero) => hero.getBoundingClientRect().top + scrollY);
  await page.evaluate(() => scrollTo({ top: 240, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-compact", "false");
  await expect(brand).toBeVisible();
  await expect(resume).toBeVisible();
  await expect
    .poll(async () => Math.round((await surface.boundingBox())!.width))
    .toBe(page.viewportSize()!.width);
  expect(
    await page
      .locator(".hero")
      .evaluate((hero) => hero.getBoundingClientRect().top + scrollY),
  ).toBeCloseTo(heroTop, 1);
  await expect
    .poll(() =>
      header.evaluate(
        (element) => element.getAnimations({ subtree: true }).length,
      ),
    )
    .toBe(0);
  await pressLogo();
  await expect(page).toHaveURL("/#top");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expect(header).toHaveAttribute("data-compact", "true");
  await expect(brand).toBeHidden();
  // It must also work when the URL already ends in #top.
  await page.evaluate(() => scrollTo({ top: 240, behavior: "instant" }));
  await expect(brand).toBeVisible();
  await expect
    .poll(() =>
      header.evaluate(
        (element) => element.getAnimations({ subtree: true }).length,
      ),
    )
    .toBe(0);
  await pressLogo();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
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

test("small scroll reversals do not repeatedly toggle the header", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  async function scroll(top: number) {
    await page.evaluate(async (y) => {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    }, top);
  }
  await scroll(140);
  await expect(header).toHaveAttribute("data-compact", "false");
  for (const top of [88, 64, 92, 48]) {
    await scroll(top);
    await expect(header).toHaveAttribute("data-compact", "false");
  }
  await scroll(0);
  await expect(header).toHaveAttribute("data-compact", "true");
  for (const top of [48, 88, 64, 92]) {
    await scroll(top);
    await expect(header).toHaveAttribute("data-compact", "true");
  }
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
