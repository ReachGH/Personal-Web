import Image from "next/image";
import type { ProjectSlug } from "@/data/projects";
import { projectScreenshots, type ProjectScreenshot } from "@/data/screenshots";
import { ScreenshotArtwork } from "./screenshot-artwork";
import styles from "./project-screenshots.module.css";
import { cn } from "@/lib/classnames";

function ScreenshotImage({
  screenshot,
  sizes,
}: {
  screenshot: ProjectScreenshot;
  sizes: string;
}) {
  return (
    <div className={styles["screenshot-item"]}>
      <Image src={screenshot.image} alt={screenshot.alt} sizes={sizes} />
      <p className={styles["screenshot-title"]}>{screenshot.title}</p>
    </div>
  );
}

export function ScreenshotPreview({
  slug,
  large,
  featured,
  className,
}: {
  slug: ProjectSlug;
  large: boolean;
  featured: boolean;
  className: string;
}) {
  const screenshots = projectScreenshots[slug];
  if (!screenshots) return null;
  if (!large)
    return (
      <ScreenshotArtwork
        slug={slug}
        className={className}
        featured={featured}
      />
    );
  const mobile = slug === "sabai-code";
  const visibleScreenshots = mobile ? screenshots : screenshots.slice(0, 1);
  const sizes = mobile
    ? "(max-width: 640px) 300px, (max-width: 1000px) 28vw, 300px"
    : "(max-width: 1400px) 90vw, 1240px";
  return (
    <div
      className={cn(
        className,
        styles["screenshot-preview"],
        mobile ? styles["screenshot-mobile"] : "",
      )}
      data-ui={`project-visual screenshot-preview ${mobile ? "screenshot-mobile" : "screenshot-desktop"} visual-large`}
    >
      <div className={styles["screenshot-preview-grid"]}>
        {visibleScreenshots.map((screenshot) => (
          <ScreenshotImage
            key={screenshot.image.src}
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
      className={cn("container", styles["screenshot-gallery"])}
      id="screenshots"
      aria-labelledby="screenshots-heading"
      data-ui="container screenshot-gallery"
    >
      <h2 id="screenshots-heading" className="section-title">
        Inside the workflow
      </h2>
      <div className={styles["screenshot-gallery-grid"]}>
        {screenshots.map((screenshot, index) => (
          <figure key={screenshot.image.src}>
            <ScreenshotImage
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
