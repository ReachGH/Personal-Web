# Hero portrait

Asset: `public/images/reach-portrait.png` (1086 × 1448 PNG with transparency).

Source: the owner's supplied photograph. The background was removed using the built-in imagegen tool in background-extraction edit mode. The transparent output is stored in this repository; the original photograph is not included. Next.js serves responsive versions through `next/image`.

The homepage crops the bottom 10% of the portrait, keeping the face and most of the folded arms visible. A gradual CSS gradient fades the final 15% of the visible frame into the page. The PNG itself remains unchanged. A compact greeting sits below the photo, with room for the orbit above it. The `r.` monogram is a lit Three.js sphere on a tilted, full-height CSS path, passing behind the portrait on the far side. Changing scale, a fine halo and two trailing dots suggest an orbiting planet. The animation can be paused, and reduced motion uses a static CSS fallback. See [the sphere implementation and rendering budget](monogram-sphere.md). On narrow screens, the portrait and greeting precede the headline.

## Edit prompt

The first supplied image was the portrait; the second was a screenshot of the portfolio for layout context. Transparent background output was enabled.

```text
Use case: background-extraction. Edit target: the FIRST of the two supplied images, the actual photograph of Reach wearing round black glasses and a pale blue short-sleeved shirt, with a beige shoulder strap and folded arms. The SECOND image is a website screenshot for context only; do not include or edit that screenshot. Remove ONLY the photographic background around the person and make it genuinely transparent with an alpha channel. Preserve the photographed person exactly: same facial identity, facial features, smile, expression, hair, glasses, skin texture and colour, shirt, shoulder strap, pose, arms, framing and proportions. Do not redraw, beautify, retouch, relight, stylize, change clothes, or invent any body parts. Retain fine hair edges, and preserve the original cutoffs at the lower and side edges of the photograph. Remove all walls, furniture, staircase, vehicles, ceiling and other background objects. No replacement scenery, no solid or checkerboard background, no text, no border, no added shadow. Output a clean photographic cutout of this exact person on actual transparency for use in a portfolio hero.
```
