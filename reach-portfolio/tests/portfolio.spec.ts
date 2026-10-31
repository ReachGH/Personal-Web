import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/projects/onboardhq",
  "/projects/sabai-code",
  "/projects/self-hosted-infrastructure",
];

for (const route of routes) {
  test(`${route} is accessible and fits its viewport`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, "No horizontal overflow").toBe(false);
    expect(errors, "No client runtime errors").toEqual([]);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath("page.png"),
      fullPage: true,
    });
  });
}

test("all three case studies open and cycle to the next project", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(3);
  const professional = page.getByRole("region", {
    name: "Professional work",
    exact: true,
  });
  const personal = page.getByRole("region", {
    name: "Personal projects",
    exact: true,
  });
  const study = page.getByRole("region", {
    name: "Study projects",
    exact: true,
  });
  await expect(professional.locator(".project-title-link")).toHaveText([
    "OnboardHQ",
    "Sabai Code",
  ]);
  await expect(personal.locator(".project-title-link")).toHaveText([
    "Minecraft & Palworld",
  ]);
  await expect(personal.locator(".other-project h3")).toHaveText([
    "Minecraft status bot",
  ]);
  await expect(study.locator(".other-project h3")).toHaveText([
    "React Native To-Do App",
    "CIFAR-10 Image Classification",
  ]);
  for (const route of routes.slice(1)) {
    await page.goto("/");
    await page.locator(`.project-visual-link[href="${route}"]`).click();
    await expect(page).toHaveURL(route);
    await expect(page.locator(".case-takeaway")).toBeVisible();
    await page.locator(".next-project > a").click();
    await expect(page.locator(".case-hero h1")).toBeVisible();
    await page.getByRole("link", { name: "All selected work" }).click();
    await expect(page).toHaveURL("/#work");
  }
});

test("project screenshots load as inline images", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".project-card .screenshot-preview")).toHaveCount(
    2,
  );
  await expect(page.locator(".project-card .concept-label")).toHaveCount(1);

  for (const [slug, count] of [
    ["onboardhq", 4],
    ["sabai-code", 3],
  ] as const) {
    await page.goto(`/projects/${slug}`);
    const images = page.locator(".case-figure img, .screenshot-gallery img");
    await expect(images).toHaveCount(count);
    await expect(page.getByText("Full size", { exact: true })).toHaveCount(0);
    await expect(page.locator(".case-figure .concept-label")).toHaveCount(0);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect
        .poll(() =>
          image.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(
        await image.evaluate(
          (element) => element.closest("a, button") !== null,
        ),
        "Screenshots are displayed directly without an open-image control",
      ).toBe(false);
    }
  }
});

test("navigation, contact and resume links work", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    const toggle = page.locator(".menu-toggle");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL("/#contact");
  await expect(page.locator("#contact h2")).toBeInViewport();
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:Justreach555@gmail.com",
  );
  await expect(
    page.locator(".contact-side").getByRole("link", { name: "GitHub" }),
  ).toHaveAttribute("href", "https://github.com/ReachGH");
  await expect(
    page.locator(".contact-side").getByRole("link", { name: "LinkedIn" }),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/sovanreach-in-261477226/",
  );
  const downloadEvent = page.waitForEvent("download");
  await page
    .locator(".contact-side")
    .getByRole("link", { name: "Download résumé" })
    .click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("Sovanreach_In_Resume.pdf");
  expect(await download.failure()).toBeNull();
});

test("metadata, review defaults, assets and missing routes", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Reach — Software Developer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  for (const path of [
    "/Sovanreach_In_Resume.pdf",
    "/icon.svg",
    "/apple-icon",
    "/opengraph-image",
    "/sitemap.xml",
    "/robots.txt",
  ]) {
    const result = await request.get(path);
    expect(result.status(), path).toBe(200);
    if (path.endsWith(".pdf"))
      expect(result.headers()["content-type"]).toContain("application/pdf");
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const missing = await page.goto("/projects/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Back to the portfolio" }),
  ).toBeVisible();
});

test("keyboard skip link and reduced motion are supported", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/#main-content");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("narrow screens have no overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of routes) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
  }
});
