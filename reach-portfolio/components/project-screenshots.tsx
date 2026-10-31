import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectSlug } from "@/data/projects";
import { projectScreenshots, type ProjectScreenshot } from "@/data/screenshots";
import { ScreenshotArtwork } from "./screenshot-artwork";

function ScreenshotLink({
  screenshot,
  sizes,
}: {
  screenshot: ProjectScreenshot;
  sizes: string;
}) {
  return (
    <a
      className="screenshot-link"
      href={screenshot.original}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${screenshot.title} screenshot at full size (opens in a new tab)`}
    >
      <Image src={screenshot.image} alt={screenshot.alt} sizes={sizes} />
      <span className="screenshot-link-label">
        {screenshot.title}
        <span>
          Full size <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}

export function ScreenshotPreview({
  slug,
  large,
}: {
  slug: ProjectSlug;
  large: boolean;
}) {
  const screenshots = projectScreenshots[slug];
  if (!screenshots) return null;
  if (!large) return <ScreenshotArtwork slug={slug} />;
  const mobile = slug === "sabai-code";
  const visibleScreenshots = mobile ? screenshots : screenshots.slice(0, 1);
  const sizes = mobile
    ? "(max-width: 640px) 300px, (max-width: 1000px) 28vw, 300px"
    : "(max-width: 1400px) 90vw, 1240px";

  return (
    <div
      className={`project-visual screenshot-preview ${mobile ? "screenshot-mobile" : "screenshot-desktop"} visual-large`}
    >
      <div className="screenshot-preview-grid">
        {visibleScreenshots.map((screenshot) => (
          <ScreenshotLink
            key={screenshot.original}
            screenshot={screenshot}
            sizes={sizes}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectScreenshotGallery({ slug }: { slug: ProjectSlug }) {
  if (slug !== "onboardhq") return null;
  const screenshots = projectScreenshots[slug]?.slice(1);
  if (!screenshots?.length) return null;

  return (
    <section
      className="container screenshot-gallery"
      id="screenshots"
      aria-labelledby="screenshots-heading"
    >
      <h2 id="screenshots-heading">Inside the workflow</h2>
      <div className="screenshot-gallery-grid">
        {screenshots.map((screenshot, index) => (
          <figure key={screenshot.original}>
            <ScreenshotLink
              screenshot={screenshot}
              sizes={
                index === 0
                  ? "(max-width: 1400px) 90vw, 1240px"
                  : "(max-width: 767px) 90vw, (max-width: 1400px) 44vw, 600px"
              }
            />
            <figcaption>{screenshot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
