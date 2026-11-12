import {
  ArrowDown,
  Network,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import type { ProjectSlug } from "@/data/projects";
import { projectScreenshots } from "@/data/screenshots";
import { ScreenshotPreview } from "./project-screenshots";
import styles from "./project-visual.module.css";
import { cn } from "@/lib/classnames";

function InfrastructureVisual() {
  return (
    <div className={styles["infra-scene"]}>
      <div className={styles["infra-grid"]} />
      <div className={styles["infra-topline"]}>
        <Terminal size={14} />
        <span>the things behind the screen</span>
        <span className={styles["infra-green-dot"]} />
      </div>
      <div className={styles["infra-title"]}>
        Beyond
        <br />
        <span>localhost_</span>
      </div>
      <div className={styles["infra-paths"]}>
        <div>
          <span className={styles["infra-label"]}>MINECRAFT / TCP</span>
          <div className={styles["infra-node"]}>
            <Network size={18} />
            <span>VPS gateway</span>
          </div>
          <div className={styles["infra-connector"]}>
            <ArrowDown size={14} />
            <span>SSH reverse tunnel</span>
          </div>
          <div className={styles["infra-node"]}>
            <Server size={18} />
            <span>Home-hosted server</span>
          </div>
        </div>
        <div>
          <span className={styles["infra-label"]}>PALWORLD / UDP</span>
          <div className={styles["infra-node"]}>
            <Server size={18} />
            <span>Windows host</span>
          </div>
          <div className={styles["infra-connector"]}>
            <ArrowDown size={14} />
            <span>Docker Compose</span>
          </div>
          <div className={styles["infra-node"]}>
            <ShieldCheck size={18} />
            <span>Persistent game data</span>
          </div>
        </div>
      </div>
      <div className={styles["infra-mobile-paths"]}>
        <div>
          <strong>Minecraft</strong>
          <span>VPS + SSH tunnel</span>
        </div>
        <div>
          <strong>Palworld</strong>
          <span>Windows + Docker</span>
        </div>
      </div>
      <span className={styles["scene-caption"]}>
        TWO SETUPS. DIFFERENT ENGINEERING CHALLENGES.
      </span>
    </div>
  );
}

export function ProjectVisual({
  slug,
  presentation = "personal",
}: {
  slug: ProjectSlug;
  presentation?: "personal" | "featured" | "case";
}) {
  const large = presentation === "case";
  const visualClassName = cn(
    styles["project-visual"],
    presentation === "featured" && styles["visual-featured"],
    presentation === "personal" && styles["visual-personal"],
  );
  if (projectScreenshots[slug]) {
    return (
      <ScreenshotPreview
        slug={slug}
        large={large}
        featured={presentation === "featured"}
        className={visualClassName}
      />
    );
  }
  return (
    <div
      className={cn(
        visualClassName,
        styles["visual-self-hosted-infrastructure"],
        large && styles["visual-large"],
      )}
      data-ui={`project-visual visual-${slug} ${large ? "visual-large" : ""}`}
      role="img"
      aria-label="Two separate hosting paths: Minecraft through a VPS and SSH tunnel; Palworld on a Windows host with Docker and persistent data."
    >
      <div aria-hidden="true">
        <InfrastructureVisual />
      </div>
      <span
        className={styles["concept-label"]}
        aria-hidden="true"
        data-ui="concept-label"
      >
        Concept illustration
      </span>
    </div>
  );
}
