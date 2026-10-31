# Local validation

Application, theme, screenshot composition and project grouping checks updated on 31 October 2026 with Node.js 24, Next.js 16.4.3 and installed Google Chrome on Windows. Dependency and PDF checks are retained from the initial validation on 30 October.

| Check                                 | Result                                                                                                                                                                           |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dependency installation and npm audit | Runtime audit: zero vulnerabilities; full audit reports 16 moderate development-tool findings in the existing ESLint/minimatch tree                                              |
| ESLint, with zero warnings allowed    | Passed                                                                                                                                                                           |
| TypeScript, strict mode               | Passed                                                                                                                                                                           |
| Prettier formatting                   | Passed                                                                                                                                                                           |
| Next.js production build              | Passed; public pages prerendered                                                                                                                                                 |
| Playwright desktop and mobile suite   | Full 36-test suite passed previously; 16 orbit/sphere checks rerun for the spinning renderer, smooth depth and variable speed/trails                                             |
| Automated accessibility               | No WCAG 2 A/AA or 2.1 AA rule violations reported by axe on the homepage and three case studies at the tested desktop/mobile sizes                                               |
| Responsive layout                     | Checked at 320, 390, 768, 900 and 1440 CSS pixels; no document overflow or clipped screenshot frames                                                                             |
| Manual visual review                  | Desktop/mobile homepage, project cards, case studies, social preview and public résumé reviewed                                                                                  |
| Public PDF privacy                    | Phone and unapproved company metric absent from text extraction and decoded PDF objects                                                                                          |
| Hero portrait                         | 10% bottom crop verified; full-viewport composition reviewed in both themes from 320 to 1920px, with a gradual 15% lower fade                                                    |
| Portrait orbit                        | Full path checked in both themes at seven widths from 320 to 1920px; smooth depth/speed/trails, pause/resume and reduced motion passed                                           |
| Header navigation                     | 17 desktop/mobile header, navigation and accessibility checks passed (one mobile-only test skipped on desktop); compact/expanded states reviewed in both themes at 320 to 1920px |
| SVG hydration                         | Desktop/mobile development checks passed with simulated last-bit trig variation; server and fresh client SVG attributes match                                                    |
| Three.js sphere                       | 1 draw call per frame, 1,472 triangles; spin capped at 30 fps, zero paused/offscreen draws; very light matte shading, no cast shadows                                            |
| Screenshot assets                     | Seven owner-approved images included, displayed inline with responsive sizing and descriptive alternatives                                                                       |
| Git exclusions                        | Original résumé, source Images/ folder, private checklist and local QA/tooling excluded; approved screenshot copies are included                                                 |

The browser suite checks public-page responses, client runtime errors, accessibility in both themes, project grouping and professional-work priority, featured-project count, inline screenshot loading without open-image controls, case-study navigation, next-project links, mobile menu behaviour, Escape focus restoration, email/social links, an actual résumé download, metadata, icons, social image, review-mode robots/sitemap, 404s, keyboard skip navigation, reduced motion and narrow-screen overflow.

Theme checks cover live system preference changes, keyboard switching, persistence across reloads and navigation, browser toolbar colour, cross-tab synchronisation, unavailable browser storage and applying the saved theme before React loads. Dark-mode screenshots were also reviewed on desktop and mobile.

The original OnboardHQ and EzePick images replace the two conceptual interfaces. The supplied images were confirmed safe by the owner. Desktop and mobile screenshot previews, the OnboardHQ gallery and the three EzePick screens were visually reviewed in light and dark themes. The infrastructure diagram remains explicitly conceptual.

Professional work leads the homepage in two larger cards, followed by distinct personal and study sections. Professional and personal case studies identify their context. The screenshot compositions use overlapping CRM/client windows and one EzePick phone with a smaller product-detail card; case-study screenshots are displayed directly. The EzePick preview uses two screenshots, with all three originals retained in its case study. Screenshot frame bounds were checked in both themes at all five responsive widths above.

Automated checks do not replace testing with actual assistive technology or every browser/device. The website has not been deployed. Publication wording and the final hosting domain still need the owner’s review.
