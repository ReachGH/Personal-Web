import Image from "next/image";
import { Leaf } from "lucide-react";
import type { ProjectSlug } from "@/data/projects";
import { projectScreenshots, type ProjectScreenshot } from "@/data/screenshots";

function PhoneScreen({
  screenshot,
  className,
}: {
  screenshot: ProjectScreenshot;
  className: string;
}) {
  return (
    <div className={`art-phone ${className}`}>
      <div className="art-phone-screen">
        <Image
          src={screenshot.image}
          alt={screenshot.alt}
          sizes="(max-width: 767px) 170px, (max-width: 1400px) 22vw, 250px"
        />
      </div>
    </div>
  );
}

export function ScreenshotArtwork({ slug }: { slug: ProjectSlug }) {
  const screenshots = projectScreenshots[slug];
  if (!screenshots) return null;
  const mobile = slug === "sabai-code";

  return (
    <div
      className={`project-visual screenshot-preview screenshot-art ${mobile ? "art-marketplace" : "art-onboarding"}`}
    >
      <div className="screenshot-art-canvas">
        {mobile ? (
          <>
            <Leaf className="art-produce-leaf leaf-one" aria-hidden="true" />
            <Leaf className="art-produce-leaf leaf-two" aria-hidden="true" />
            <PhoneScreen
              screenshot={screenshots[1]}
              className="art-phone-shop"
            />
            <PhoneScreen
              screenshot={screenshots[2]}
              className="art-phone-product"
            />
            <PhoneScreen
              screenshot={screenshots[0]}
              className="art-phone-home"
            />
          </>
        ) : (
          <>
            <div className="art-app-window art-app-dashboard">
              <Image
                src={screenshots[0].image}
                alt={screenshots[0].alt}
                sizes="(max-width: 767px) 80vw, (max-width: 1400px) 45vw, 620px"
              />
            </div>
            <div className="art-app-window art-app-client">
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
