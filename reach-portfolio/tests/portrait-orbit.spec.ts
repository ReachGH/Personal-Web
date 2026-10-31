import { expect, test } from "@playwright/test";

test("portrait orbit moves and can be paused and resumed", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const moon = page.locator(".portrait-moon");
  const first = await moon.evaluate((element) => {
    element.getAnimations()[0].currentTime = 3000;
    const { x, y } = element.getBoundingClientRect();
    return { x, y };
  });
  const second = await moon.evaluate((element) => {
    element.getAnimations()[0].currentTime = 9000;
    const { x, y } = element.getBoundingClientRect();
    return { x, y };
  });
  expect(Math.hypot(second.x - first.x, second.y - first.y)).toBeGreaterThan(
    30,
  );

  await page.getByRole("button", { name: "Pause orbit animation" }).click();
  const pausedTime = await moon.evaluate(
    (element) => element.getAnimations()[0].currentTime,
  );
  await expect
    .poll(() =>
      moon.evaluate((element) => element.getAnimations()[0].playState),
    )
    .toBe("paused");
  expect(
    await moon.evaluate((element) => element.getAnimations()[0].currentTime),
  ).toBe(pausedTime);
  await page.getByRole("button", { name: "Play orbit animation" }).click();
  await expect
    .poll(() =>
      moon.evaluate((element) => element.getAnimations()[0].playState),
    )
    .toBe("running");
});

test("portrait orbit stays still when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".portrait-moon")).toBeVisible();
  expect(
    await page
      .locator(".portrait-moon")
      .evaluate((element) => element.getAnimations().length),
  ).toBe(0);
  await expect(
    page.getByRole("button", { name: "Pause orbit animation" }),
  ).toBeHidden();
});

test("full portrait orbit stays inside the screen and above the greeting", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const positions: number[] = [];
  for (let second = 0; second < 24; second++) {
    const bounds = await page
      .locator(".portrait-stage")
      .evaluate((stage, time) => {
        for (const animation of stage.getAnimations({ subtree: true })) {
          animation.pause();
          animation.currentTime = time;
        }
        const moon = stage
          .querySelector(".portrait-moon")!
          .getBoundingClientRect();
        const caption = document
          .querySelector(".hero-greeting")!
          .getBoundingClientRect();
        return {
          left: moon.left,
          right: moon.right,
          top: moon.top,
          bottom: moon.bottom,
          captionTop: caption.top,
          stageHeight: stage.getBoundingClientRect().height,
          viewportWidth: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
        };
      }, second * 1000);
    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(bounds.viewportWidth);
    expect(bounds.documentWidth).toBeLessThanOrEqual(bounds.viewportWidth);
    expect(bounds.bottom).toBeLessThan(bounds.captionTop);
    positions.push(bounds.top / bounds.stageHeight);
  }
  expect(Math.max(...positions) - Math.min(...positions)).toBeGreaterThan(0.75);
});
