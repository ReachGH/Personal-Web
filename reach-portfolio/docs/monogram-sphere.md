# Three.js monogram sphere

The orbiting `r.` is a matte Three.js sphere with soft diffuse shading and no specular reflection. It keeps a fixed, front-facing orientation so the visible monogram stays readable. Matching monograms remain on opposite hemispheres. The sphere follows the existing 24-second tilted CSS orbit, including its near/far size changes and occlusion behind the portrait. Pausing stops the orbit; resuming preserves its position.

## Rendering budget

- One mesh, one material, one draw call per update, and 1,472 triangles (`SphereGeometry(1, 32, 24)`).
- A small transparent WebGL canvas follows the badge. Its drawing buffer uses at most 2× device resolution and never exceeds 160 × 160 pixels. The portrait, track and trail remain DOM/CSS.
- On-demand rendering: draw at initialization and when the theme or drawing-buffer size changes. There is no WebGL animation-frame loop. CSS handles the orbit and pauses when requested, offscreen or in a hidden tab.
- No specular highlights, shadows, post-processing, environment maps, controls, model loaders or React Three Fiber. Soft diffuse lighting uses one hemisphere light and two directional lights with a Lambert material.
- One locally generated 512 × 256 texture; no model or texture network requests. Theme changes redraw the existing texture, and a ResizeObserver updates the buffer only when its size changes. No per-frame JavaScript work is needed for the sphere.
- Geometry, material, texture, renderer, WebGL context and observers are released on unmount. Context loss switches to the CSS fallback.

## Loading and fallback

`components/monogram-sphere.tsx` loads `lib/monogram-sphere.ts` through a dynamic import, scheduled during browser idle time after the portrait enters the viewport. The original CSS monogram remains visible until the first 3D frame is ready. Initial reduced-motion preferences skip the Three.js import entirely. Unsupported WebGL and failed imports retain the CSS fallback, and changes to reduced-motion preferences are handled live.

Three.js adds JavaScript compared with the earlier CSS-only badge. In the measured production build, the deferred sphere chunk was about **130 KiB gzip**. This is a local gzip estimate, not a guaranteed hosting transfer size. That chunk was absent from the reduced-motion page's network requests.

## Local measurements

Measured with installed Chrome on Windows on 31 October 2026, using a production build, a 1440 × 900 viewport and device scale factor 2:

| Measurement                                          | Result                                            |
| ---------------------------------------------------- | ------------------------------------------------- |
| WebGL redraws while the CSS orbit moves for 1 second | 0                                                 |
| Draw calls / triangles per update                    | 1 / 1,472                                         |
| Drawing buffer in this configuration                 | 124 × 124 pixels                                  |
| Draws during a 200 ms pause                          | 0                                                 |
| Draws during a 200 ms offscreen interval             | 0                                                 |
| Cleanup after client navigation                      | 4 buffers, 1 texture and 1 shader program deleted |
| Initial reduced-motion page                          | No WebGL canvas or deferred sphere chunks         |

These measurements check the rendering budget and lifecycle behavior; they are not a battery benchmark or a guarantee of frame rate on every device. The browser tests additionally check hidden-tab event handling, live reduced-motion changes, unavailable WebGL, context loss and remounting after navigation. The hidden-tab test dispatches a visibility-change event with an overridden visibility value, so it exercises the handler without depending on headless tab focus.

The implementation follows the Three.js guides on [bounded drawing-buffer resolution](https://threejs.org/manual/pages/responsive.html), [rendering only when needed](https://threejs.org/manual/pages/rendering-on-demand.html), and [disposing GPU resources](https://threejs.org/manual/pages/how-to-dispose-of-objects.html).
