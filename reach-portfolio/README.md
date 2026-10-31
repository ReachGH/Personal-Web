# Reach portfolio

A personal software developer portfolio for Sovanreach In (Reach). The design uses warm ivory, charcoal, muted sage and a restrained terracotta accent, with locally hosted DM Sans and Space Grotesk fonts. The application is independent of the OnboardHQ and CRM codebases.

## Local development

Use Node.js 20.9 or newer and npm. Node.js 24 was used during implementation.

```powershell
cd reach-portfolio
npm ci
npm run dev
```

Visit <http://localhost:3000>.

```powershell
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run start
```

The production build prerenders the homepage, three case studies, social image, icons, robots and sitemap. There is no database, contact backend, analytics or authentication. Email opens the visitor’s email application.

## Light and dark themes

The header toggle follows the system colour preference until a visitor chooses a theme. Choices are saved locally, work across page navigation and reloads, and synchronise between tabs. If browser storage is unavailable, the toggle still works for the current page session. A small head script applies the theme before React loads to avoid a light flash.

Dark colours are in `app/themes.css`; shared light colours and layout styles remain in `app/globals.css`. Theme behaviour lives in `components/theme-toggle.tsx` and `lib/theme.ts`. No theme library or server-side preference storage is required.

## Hero portrait

The hero uses the owner's supplied photo with its background removed. The transparent asset is `public/images/reach-portrait.png`; the layout is in `app/page.tsx` and `app/globals.css`. The layout crops the bottom 10%, keeping most of the folded arms visible, with a gradual fade over the final 15% of the frame. The portrait sits close to the headline, with a compact greeting directly below it; on narrow screens, the portrait precedes the headline. See [portrait provenance and the exact edit prompt](docs/portrait-asset.md) for the built-in imagegen workflow used to prepare the asset.

The original `r.` monogram is a matte Three.js sphere that stays facing the viewer while circling the portrait on a tilted, 24-second CSS orbit. A fine halo and two trailing dots accompany its near/far depth changes. `components/portrait-orbit.tsx` provides a pause/resume control. The renderer loads on demand, bounds its drawing-buffer size, and redraws only when the theme or size changes. Reduced motion and unavailable WebGL use the stationary or orbiting CSS fallback as appropriate. See [the sphere rendering budget and measured optimizations](docs/monogram-sphere.md).

## Browser checks

```powershell
npm run build
npm run test:e2e
```

Tests use installed Google Chrome, start a production server on `127.0.0.1:3100` when needed, and run desktop and Pixel-sized Chromium profiles. To use Playwright’s bundled Chromium instead, remove `channel: "chrome"` from both projects in `playwright.config.ts` and run `npx playwright install chromium`.

The suite covers the four public pages, automated WCAG A/AA checks, runtime errors, case-study navigation, inline screenshot loading, mobile-menu dismissal and focus, résumé downloads, contact destinations, metadata, missing routes, keyboard skip navigation, reduced motion and 320px overflow. It saves local full-page screenshots under `test-results/`. Browser automation supplements manual visual review; it is not a claim of universal browser or assistive-technology compatibility.

## Structure

```text
app/                  Homepage, case studies, layout, styles and metadata
components/           Navigation, project screenshots, infrastructure diagram and shared sections
data/profile.ts       Contact, experience and skill categories
data/projects.ts      Three featured stories and three supporting projects
data/screenshots.ts   Original project images, descriptions and captions
lib/site.ts           Deployment origin and indexing configuration
public/               Sanitised résumé, hero portrait and approved project screenshots
scripts/              Optional résumé preparation tool
tests/                Browser and accessibility checks
```

## Content updates

- Edit `data/profile.ts` for contact links, experience and skills. Education and the short introduction are in `app/page.tsx`.
- Edit `data/projects.ts` for project copy, contribution summaries, technologies and supporting-project links. Featured project routes are generated from this data. Keep project slugs stable when revising copy.
- The homepage leads with professional work (Carelever and Sabai Code), then personal projects (hosting and the status bot), then study projects. The `kind` field in `data/projects.ts` determines each group; both professional case studies get a larger card. Case-study headings also identify professional or personal work.
- OnboardHQ and Sabai Code use the supplied original screenshots, approved by the owner for the portfolio and repository. The Sabai Code images show the EzePick grocery prototype. `data/screenshots.ts` stores static image imports, alternative text and captions; `components/project-screenshots.tsx` renders responsive inline images. The original files are preserved in `public/projects/`, while `next/image` serves appropriately sized previews.
- Homepage cards use layered real screenshots: overlapping CRM/client windows for OnboardHQ, and one main EzePick phone with a smaller product-detail card. `components/screenshot-artwork.tsx` and `app/screenshot-artwork.css` control the composition, light/dark backgrounds and hover/focus motion. CSS clips the grocery images' surrounding artboard margins and selects the product detail; the image files remain unchanged. Motion respects the existing reduced-motion setting.
- Case-study screenshots are displayed directly with short titles and captions. Their layouts are in `app/project-screenshots.css`. OnboardHQ has a dashboard cover and three additional screenshots; Sabai Code retains all three prototype screens, stacked on narrow screens.
- The infrastructure illustration remains code-native in `components/project-visual.tsx`, styled in `app/globals.css`. It distinguishes the Minecraft and Palworld setups and is explicitly labelled conceptual.
- To add or replace a screenshot, place the reviewed image in `public/projects/`, update its entry in `data/screenshots.ts` and the project's `visualNote` if needed. Check permission and visible information for new assets before including them.
- There are no invented GitHub project links. Only the verified CIFAR-10 repository is linked for the supporting projects.

## Updating the résumé

The public file is `public/Sovanreach_In_Resume.pdf`. The original supplied PDF remains outside the application and is excluded from Git. The public derivative removes the phone number and a company-specific quantitative result pending disclosure approval. The original is untouched.

For a replacement, export a reviewed public PDF directly to that filename. For the original supplied format, the optional helper performs actual PDF redaction:

```powershell
python -m pip install pymupdf
python scripts/prepare-resume.py ../In_Sovanreach_Resume.pdf
```

The helper is tailored to the supplied résumé. It fails if expected private fields cannot be found. Always check text extraction, links and appearance after replacing a PDF. Do not copy an unreviewed original into `public/`.

## Vercel deployment

Deploy only after the owner approves publication and the company-project wording has been reviewed.

1. Import the GitHub repository into Vercel.
2. Set the **Root Directory** to `reach-portfolio` and the framework to **Next.js**.
3. Use the standard `npm run build` command. No custom output directory is needed.
4. Set `NEXT_PUBLIC_SITE_URL` to the approved HTTPS origin, such as your actual custom domain, without a path.
5. Build and inspect the deployment, social preview, download and contact links.

Local builds and previews default to `noindex` with `Disallow: /` and an empty sitemap. Setting `NEXT_PUBLIC_SITE_URL` enables indexing, canonical URLs and the four-page sitemap. Unset builds use Vercel’s provided origin for metadata when available, or localhost locally. Robots directives do not provide access control.

No credentials or service environment variables are required. Do not connect an automatic production deployment before publication approval. Pushing source to GitHub is separate from publishing the website.

## Publication review

The private `PUBLICATION_REVIEW.md` in the workspace root is intentionally Git-ignored. It records facts requiring review, evidence sources and excluded assets. The supplied screenshots were explicitly approved by the owner; other company internals and trial figures remain excluded. Degree completion is still stated as expected November 2026. The Sabai Code work is explicitly a prototype; OnboardHQ is not described as a production launch.

## Technical references

- [Next.js App Router setup](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

All npm versions are pinned, with a committed lockfile. Fonts are served from the application itself, so builds and visitors do not require Google Fonts requests.
