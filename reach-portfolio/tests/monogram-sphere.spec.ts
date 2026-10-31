import { expect, test, type Page } from "@playwright/test";

async function countDraws(page: Page) {
  return page.evaluate(() =>
    Number(document.documentElement.dataset.testSphereDraws || 0),
  );
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const original = WebGL2RenderingContext.prototype.drawElements;
    let draws = 0;
    WebGL2RenderingContext.prototype.drawElements = function (...args) {
      if (
        this.canvas instanceof HTMLCanvasElement &&
        this.canvas.closest(".monogram-sphere")
      ) {
        document.documentElement.dataset.testSphereDraws = String(++draws);
      }
      return original.apply(this, args);
    };
  });
});

test("sphere has bounded rendering cost and stops when paused or offscreen", async ({
  page,
}) => {
  await page.goto("/");
  const canvas = page.locator(".monogram-sphere canvas");
  await expect(canvas).toHaveAttribute("data-render-state", "running", {
    timeout: 20000,
  });
  await expect(canvas).toHaveAttribute("data-draw-calls", "1");
  await expect(canvas).toHaveAttribute("data-triangles", "1472");
  expect(
    await canvas.evaluate((element: HTMLCanvasElement) =>
      Math.max(element.width, element.height),
    ),
  ).toBeLessThanOrEqual(160);

  const before = await countDraws(page);
  const started = Date.now();
  await page.waitForTimeout(1000);
  const draws = (await countDraws(page)) - before;
  expect(draws).toBeGreaterThan(0);
  expect(draws).toBeLessThanOrEqual(
    Math.ceil(((Date.now() - started) * 30) / 1000) + 2,
  );

  await page.getByRole("button", { name: "Pause orbit animation" }).click();
  await expect(canvas).toHaveAttribute("data-render-state", "idle");
  const pausedDraws = await countDraws(page);
  await page.waitForTimeout(200);
  expect(await countDraws(page)).toBe(pausedDraws);

  await page.getByRole("button", { name: "Play orbit animation" }).click();
  await expect(canvas).toHaveAttribute("data-render-state", "running");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-render-state", "idle");
  const offscreenDraws = await countDraws(page);
  await page.waitForTimeout(200);
  expect(await countDraws(page)).toBe(offscreenDraws);
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-render-state", "running");

  // Exercise the visibility-change handler without depending on headless tab focus.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(canvas).toHaveAttribute("data-render-state", "idle");
  const hiddenDraws = await countDraws(page);
  await page.waitForTimeout(200);
  expect(await countDraws(page)).toBe(hiddenDraws);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(canvas).toHaveAttribute("data-render-state", "running");
});

test("sphere uses the static fallback for reduced motion and follows live changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const host = page.locator(".monogram-sphere");
  await expect(host).toHaveAttribute("data-sphere-state", "fallback");
  await expect(host.locator("canvas")).toHaveCount(0);
  await expect(host.locator(".monogram-sphere-fallback")).toBeVisible();

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(host).toHaveAttribute("data-sphere-state", "ready", {
    timeout: 20000,
  });
  const canvas = host.locator("canvas");
  await expect(canvas).toHaveAttribute("data-render-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(canvas).toBeHidden();
  await expect(canvas).toHaveAttribute("data-render-state", "idle");
  await expect(host.locator(".monogram-sphere-fallback")).toBeVisible();
});

test("sphere falls back when WebGL is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl2") {
        document.documentElement.dataset.testWebglAttempted = "true";
        return null;
      }
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-test-webgl-attempted",
    "true",
    { timeout: 20000 },
  );
  await expect(page.locator(".monogram-sphere")).toHaveAttribute(
    "data-sphere-state",
    "fallback",
  );
  await expect(page.locator(".monogram-sphere canvas")).toHaveCount(0);
  await expect(page.locator(".monogram-sphere-fallback")).toBeVisible();
  expect(errors).toEqual([]);
});

test("sphere releases a lost context and can be recreated after navigation", async ({
  page,
}) => {
  await page.goto("/");
  const host = page.locator(".monogram-sphere");
  await expect(host).toHaveAttribute("data-sphere-state", "ready", {
    timeout: 20000,
  });
  const supported = await host
    .locator("canvas")
    .evaluate((canvas: HTMLCanvasElement) => {
      const extension = canvas
        .getContext("webgl2")
        ?.getExtension("WEBGL_lose_context");
      extension?.loseContext();
      return Boolean(extension);
    });
  expect(supported).toBe(true);
  await expect(host).toHaveAttribute("data-sphere-state", "fallback");
  await expect(host.locator("canvas")).toHaveCount(0);
  await page.getByRole("link", { name: "OnboardHQ", exact: true }).click();
  await page.getByRole("link", { name: "Reach, home", exact: true }).click();
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect(host).toHaveAttribute("data-sphere-state", "ready", {
    timeout: 20000,
  });
  await expect(host.locator("canvas")).toHaveCount(1);
});
