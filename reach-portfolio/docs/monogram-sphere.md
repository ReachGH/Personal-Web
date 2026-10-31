# Three.js monogram sphere

The orbiting `r.` is a matte Three.js sphere with very light diffuse shading, without reflections or cast shadows. Strong ambient fill (0.94π) and a weak directional light (0.10π) compensate for Lambert's 1/π response, keeping brightness around 94–104% of the base colour in linear space. It spins upright around its vertical axis once every ten seconds, with matching monograms on opposite hemispheres and no tumbling or rocking. Pausing stops both the spin and the orbit; resuming preserves their positions. Reduced motion disables both animations.

The tilted CSS orbit takes 24 seconds. A registered CSS phase drives a smooth speed curve: approximately 20% faster on the near pass and 20% slower on the far pass. Position and scale share the same progress value, with a continuous sine curve ranging from 0.66 at the far side to 1.3 at the near side. This eases into both extremes and joins smoothly across the loop. The trailing dots repeat the exact motion 0.72 and 1.2 seconds behind the moon, naturally spreading out near the viewer and tightening on the far side. The front/back stacking switches at the adjusted path crossings.

The SVG track samples the same ellipse with 96 short, rounded dashes; their length, stroke weight and opacity vary continuously with depth. SVG values are serialized to three decimal places to avoid hydration mismatches from tiny server/browser trigonometric differences. The two track halves share the same formula at their joins and sit behind/in front of the portrait, as does the orbiting sphere. The path, trail and depth animation need no JavaScript frame loop.

## Rendering budget

- One mesh, one material, one draw call per update, and 1,472 triangles (`SphereGeometry(1, 32, 24)`).
- A small transparent WebGL canvas follows the badge. Its drawing buffer uses at most 2× device resolution and never exceeds 160 × 160 pixels. The portrait, track and trail remain DOM/CSS.
- The spin uses a time-based animation-frame loop capped at 30 fps. WebGL stops when paused, offscreen or in a hidden tab, and for reduced motion. CSS handles the orbit and pauses alongside it.
- One Lambert material, one ambient light and one weak directional light; no specular highlights, shadow maps, post-processing, environment maps, controls, model loaders or React Three Fiber.
- One locally generated 512 × 256 texture; no model or texture network requests. Theme changes redraw the existing texture, and a ResizeObserver updates the buffer only when its size changes. Active frames change only the sphere's rotation and render the existing scene.
- Geometry, material, texture, renderer, WebGL context and observers are released on unmount. Context loss switches to the CSS fallback.

## Loading and fallback

`components/monogram-sphere.tsx` loads `lib/monogram-sphere.ts` through a dynamic import, scheduled during browser idle time after the portrait enters the viewport. The original CSS monogram remains visible until the first 3D frame is ready. Initial reduced-motion preferences skip the Three.js import entirely. Unsupported WebGL and failed imports retain the CSS fallback, and changes to reduced-motion preferences are handled live.

Three.js adds JavaScript compared with the earlier CSS-only badge. In the measured production build, the deferred sphere chunk was about **130 KiB gzip**. This is a local gzip estimate, not a guaranteed hosting transfer size. That chunk was absent from the reduced-motion page's network requests.

## Local measurements

Measured with installed Chrome on Windows on 31 October 2026, using a production build, a 1440 × 900 viewport and device scale factor 2:

| Measurement                              | Result                                            |
| ---------------------------------------- | ------------------------------------------------- |
| Active spin rendering budget             | Capped at 30 frames per second                    |
| Draw calls / triangles per update        | 1 / 1,472                                         |
| Drawing buffer in this configuration     | 124 × 124 pixels                                  |
| Draws during a 200 ms pause              | 0                                                 |
| Draws during a 200 ms offscreen interval | 0                                                 |
| Cleanup after client navigation          | 4 buffers, 1 texture and 1 shader program deleted |
| Initial reduced-motion page              | No WebGL canvas or deferred sphere chunks         |

These measurements check the rendering budget and lifecycle behavior; they are not a battery benchmark or a guarantee of frame rate on every device. The browser tests additionally check hidden-tab event handling, live reduced-motion changes, unavailable WebGL, context loss and remounting after navigation. The hidden-tab test dispatches a visibility-change event with an overridden visibility value, so it exercises the handler without depending on headless tab focus.

The implementation follows the Three.js guides on [bounded drawing-buffer resolution](https://threejs.org/manual/pages/responsive.html), [rendering only when needed](https://threejs.org/manual/pages/rendering-on-demand.html), and [disposing GPU resources](https://threejs.org/manual/pages/how-to-dispose-of-objects.html).
