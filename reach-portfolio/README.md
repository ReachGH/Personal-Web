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

## Browser checks

```powershell
npm run build
npm run test:e2e
```

Tests use installed Google Chrome, start a production server on `127.0.0.1:3100` when needed, and run desktop and Pixel-sized Chromium profiles. To use Playwright’s bundled Chromium instead, remove `channel: "chrome"` from both projects in `playwright.config.ts` and run `npx playwright install chromium`.

The suite covers the four public pages, automated WCAG A/AA checks, runtime errors, case-study navigation, mobile-menu dismissal and focus, résumé downloads, contact destinations, metadata, missing routes, keyboard skip navigation, reduced motion and 320px overflow. It saves local full-page screenshots under `test-results/`. Browser automation supplements manual visual review; it is not a claim of universal browser or assistive-technology compatibility.

## Structure

```text
app/                  Homepage, case studies, layout, styles and metadata
components/           Navigation, project cards, concept visuals and shared sections
data/profile.ts       Contact, experience and skill categories
data/projects.ts      Three featured stories and three supporting projects
lib/site.ts           Deployment origin and indexing configuration
public/               Sanitised downloadable résumé
scripts/              Optional résumé preparation tool
tests/                Browser and accessibility checks
```

## Content updates

- Edit `data/profile.ts` for contact links, experience and skills. Education and the short introduction are in `app/page.tsx`.
- Edit `data/projects.ts` for project copy, contribution summaries, technologies and supporting-project links. Featured project routes are generated from this data. Keep project slugs stable when revising copy.
- The three featured visuals are code-native illustrations in `components/project-visual.tsx`, styled in `app/globals.css`. They are deliberately identified as conceptual; no company screenshot is used. The grocery illustration is a new visual interpretation, not the original prototype interface. The infrastructure illustration distinguishes the Minecraft and Palworld setups.
- To replace an illustration with an approved screenshot, place an optimised image in `public/projects/`, render it using `next/image` in `ProjectVisual`, provide accurate alternative text, and update the `visualNote` in project data. Check permission, visible customer information and image metadata first.
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

The private `PUBLICATION_REVIEW.md` in the workspace root is intentionally Git-ignored. It records facts requiring review, evidence sources and excluded assets. Company internals and trial figures are not bundled into this app. Degree completion is still stated as expected November 2026. The Sabai Code work is explicitly a prototype; OnboardHQ is not described as a production launch.

## Technical references

- [Next.js App Router setup](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

All npm versions are pinned, with a committed lockfile. Fonts are served from the application itself, so builds and visitors do not require Google Fonts requests.
