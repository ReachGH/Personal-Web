# Local validation

Application, theme and screenshot checks updated on 31 October 2026 with Node.js 24, Next.js 16.4.3 and installed Google Chrome on Windows. Dependency and PDF checks are retained from the initial validation on 30 October.

| Check                                 | Result                                                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Dependency installation and npm audit | Successful; zero reported vulnerabilities                                                                                          |
| ESLint, with zero warnings allowed    | Passed                                                                                                                             |
| TypeScript, strict mode               | Passed                                                                                                                             |
| Prettier formatting                   | Passed                                                                                                                             |
| Next.js production build              | Passed; public pages prerendered                                                                                                   |
| Playwright desktop and mobile suite   | 36 checks passed across the full suite and targeted reruns after the screenshot layout and contrast fixes                          |
| Automated accessibility               | No WCAG 2 A/AA or 2.1 AA rule violations reported by axe on the homepage and three case studies at the tested desktop/mobile sizes |
| Responsive layout                     | Checked at 320, 390, 768 and 1440 CSS pixels; no document overflow                                                                 |
| Manual visual review                  | Desktop/mobile homepage, project cards, case studies, social preview and public résumé reviewed                                    |
| Public PDF privacy                    | Phone and unapproved company metric absent from text extraction and decoded PDF objects                                            |
| Screenshot assets                     | Seven owner-approved images included, with responsive previews, descriptive alternatives and working full-size links               |
| Git exclusions                        | Original résumé, source Images/ folder, private checklist and local QA/tooling excluded; approved screenshot copies are included   |

The browser suite checks public-page responses, client runtime errors, accessibility in both themes, featured-project count, screenshot loading and full-size destinations, case-study navigation, next-project links, mobile menu behaviour, Escape focus restoration, email/social links, an actual résumé download, metadata, icons, social image, review-mode robots/sitemap, 404s, keyboard skip navigation, reduced motion and narrow-screen overflow. All 18 accessibility and screenshot checks were rerun after correcting the screenshot caption contrast and mobile preview height.

Theme checks cover live system preference changes, keyboard switching, persistence across reloads and navigation, browser toolbar colour, cross-tab synchronisation, unavailable browser storage and applying the saved theme before React loads. Dark-mode screenshots were also reviewed on desktop and mobile.

The original OnboardHQ and EzePick images replace the two conceptual interfaces. The supplied images were confirmed safe by the owner. Desktop and mobile screenshot previews, the OnboardHQ gallery and the three EzePick screens were visually reviewed in light and dark themes. The infrastructure diagram remains explicitly conceptual.

Automated checks do not replace testing with actual assistive technology or every browser/device. The website has not been deployed. Publication wording and the final hosting domain still need the owner’s review.
