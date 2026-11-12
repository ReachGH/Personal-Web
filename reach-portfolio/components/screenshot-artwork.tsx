import Image from "next/image";
import type { ProjectSlug } from "@/data/projects";
import { projectScreenshots, type ProjectScreenshot } from "@/data/screenshots";
import styles from "./screenshot-artwork.module.css";
import { cn } from "@/lib/classnames";

function PhoneScreen({
  screenshot,
  className,
}: {
  screenshot: ProjectScreenshot;
  className: string;
}) {
  return (
    <div className={cn(styles["art-phone"], className)}>
      <div className={styles["art-phone-screen"]}>
        <Image
          src={screenshot.image}
          alt={screenshot.alt}
          sizes="(max-width: 767px) 170px, (max-width: 1400px) 22vw, 250px"
        />
      </div>
    </div>
  );
}

export function ScreenshotArtwork({
  slug,
  className,
  featured,
}: {
  slug: ProjectSlug;
  className: string;
  featured: boolean;
}) {
  const screenshots = projectScreenshots[slug];
  if (!screenshots) return null;
  const mobile = slug === "sabai-code";
  return (
    <div
      className={cn(
        className,
        styles["screenshot-art"],
        mobile ? styles["art-marketplace"] : styles["art-onboarding"],
        featured ? styles["screenshot-art-featured"] : "",
      )}
      data-ui="project-visual screenshot-art"
    >
      <div className={styles["screenshot-art-canvas"]}>
        {mobile ? (
          <>
            <PhoneScreen
              screenshot={screenshots[0]}
              className={styles["art-phone-home"]}
            />
            <div className={styles["art-product-detail"]}>
              <div className={styles["art-product-screen"]}>
                <Image
                  src={screenshots[2].image}
                  alt="Spring onions and their price in riel in the EzePick product screen."
                  sizes="(max-width: 767px) 150px, 210px"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(
                styles["art-app-window"],
                styles["art-app-dashboard"],
              )}
            >
              <Image
                src={screenshots[0].image}
                alt={screenshots[0].alt}
                sizes="(max-width: 767px) 80vw, (max-width: 1400px) 45vw, 620px"
              />
            </div>
            <div
              className={cn(styles["art-app-window"], styles["art-app-client"])}
            >
              <Image
                src={screenshots[1].image}
                alt={screenshots[1].alt}
                sizes="(max-width: 767px) 48vw, (max-width: 1400px) 27vw, 370px"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
