import { expect, test } from "@playwright/test";

test("orbit SVG matches server and browser despite tiny trig differences", async ({
  page,
  request,
}) => {
  const html = await (await request.get("/")).text();
  const hydrationErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && /hydrat/i.test(message.text())) {
      hydrationErrors.push(message.text());
    }
  });
  await page.addInitScript(() => {
    // Model the last-bit variations seen between Node and browser math engines.
    for (const method of ["sin", "cos"] as const) {
      const original = Math[method];
      Math[method] = (value: number) => original(value) * (1 + Number.EPSILON);
    }
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Pause orbit animation" }).click();
  await expect(page.locator(".portrait-orbit-shell")).toHaveAttribute(
    "data-orbit-paused",
    "true",
  );
  // A client navigation mounts fresh SVG attributes, allowing comparison even
  // when production React leaves mismatched hydration attributes untouched.
  await page.getByRole("link", { name: "OnboardHQ", exact: true }).click();
  await page.waitForURL("**/projects/onboardhq");
  await page.getByRole("link", { name: "Reach, home" }).click();
  await expect(page.locator(".portrait-orbit-track path")).toHaveCount(96);
  const attributes = await page.evaluate((serverHtml) => {
    const server = new DOMParser().parseFromString(serverHtml, "text/html");
    function dashes(root: Document) {
      return [...root.querySelectorAll(".portrait-orbit-track path")].map(
        (dash) =>
          ["d", "stroke-width", "opacity"].map((name) =>
            dash.getAttribute(name),
          ),
      );
    }
    return { server: dashes(server), client: dashes(document) };
  }, html);
  expect(attributes.client).toEqual(attributes.server);
  expect(hydrationErrors).toEqual([]);
});

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
  const sizes: number[] = [];
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
          width: moon.width,
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
    sizes.push(bounds.width);
  }
  expect(Math.max(...positions) - Math.min(...positions)).toBeGreaterThan(0.75);
  expect(Math.max(...sizes) / Math.min(...sizes)).toBeGreaterThan(1.9);

  // Depth slows into each turn instead of snapping between linear ramps.
  for (const turn of [2654, 14420]) {
    const widths = await page
      .locator(".portrait-moon")
      .evaluate((moon, time) => {
        const animation = moon.getAnimations()[0];
        return [time - 200, time, time + 200].map((sample) => {
          animation.currentTime = sample;
          return moon.getBoundingClientRect().width;
        });
      }, turn);
    expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(0.15);
  }
  const loopWidths = await page.locator(".portrait-moon").evaluate((moon) => {
    const animation = moon.getAnimations()[0];
    return [23990, 24010].map((time) => {
      animation.currentTime = time;
      return moon.getBoundingClientRect().width;
    });
  });
  expect(Math.abs(loopWidths[0] - loopWidths[1])).toBeLessThan(0.15);
});

test("near pass is faster and trailing dots follow the same motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const result = await page.locator(".portrait-stage").evaluate((stage) => {
    for (const animation of stage.getAnimations({ subtree: true })) {
      animation.pause();
    }
    const moon = stage.querySelector<HTMLElement>(".portrait-moon")!;
    function position(element: HTMLElement, time: number) {
      element.getAnimations()[0].currentTime = time;
      const bounds = element.getBoundingClientRect();
      return {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
      };
    }
    function distance(
      a: { x: number; y: number },
      b: { x: number; y: number },
    ) {
      return Math.hypot(a.x - b.x, a.y - b.y);
    }
    const near = distance(position(moon, 2454), position(moon, 2854));
    const far = distance(position(moon, 14220), position(moon, 14620));
    const trails = [
      ...stage.querySelectorAll<HTMLElement>(".portrait-moon-trail"),
    ];
    const errors = [6000, 12000, 22000].flatMap((time) =>
      trails.map((trail, index) =>
        distance(
          position(trail, time),
          position(moon, time - (index === 0 ? 720 : 1200)),
        ),
      ),
    );
    return { speedRatio: near / far, errors };
  });
  expect(result.speedRatio).toBeGreaterThan(1.35);
  expect(result.speedRatio).toBeLessThan(1.65);
  for (const error of result.errors) expect(error).toBeLessThan(0.1);
});
