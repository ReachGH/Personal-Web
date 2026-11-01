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

function InfrastructureVisual() {
  return (
    <div className="infra-scene">
      <div className="infra-grid" />
      <div className="infra-topline">
        <Terminal size={14} />
        <span>the things behind the screen</span>
        <span className="infra-green-dot" />
      </div>
      <div className="infra-title">
        Beyond
        <br />
        <span>localhost_</span>
      </div>
      <div className="infra-paths">
        <div className="infra-path">
          <span className="infra-label">MINECRAFT / TCP</span>
          <div className="infra-node">
            <Network size={18} />
            <span>VPS gateway</span>
          </div>
          <div className="infra-connector">
            <ArrowDown size={14} />
            <span>SSH reverse tunnel</span>
          </div>
          <div className="infra-node">
            <Server size={18} />
            <span>Home-hosted server</span>
          </div>
        </div>
        <div className="infra-path">
          <span className="infra-label">PALWORLD / UDP</span>
          <div className="infra-node">
            <Server size={18} />
            <span>Windows host</span>
          </div>
          <div className="infra-connector">
            <ArrowDown size={14} />
            <span>Docker Compose</span>
          </div>
          <div className="infra-node">
            <ShieldCheck size={18} />
            <span>Persistent game data</span>
          </div>
        </div>
      </div>
      <div className="infra-mobile-paths">
        <div>
          <strong>Minecraft</strong>
          <span>VPS + SSH tunnel</span>
        </div>
        <div>
          <strong>Palworld</strong>
          <span>Windows + Docker</span>
        </div>
      </div>
      <span className="scene-caption">
        TWO SETUPS. DIFFERENT ENGINEERING CHALLENGES.
      </span>
    </div>
  );
}

export function ProjectVisual({
  slug,
  large = false,
}: {
  slug: ProjectSlug;
  large?: boolean;
}) {
  if (projectScreenshots[slug]) {
    return <ScreenshotPreview slug={slug} large={large} />;
  }
  return (
    <div
      className={`project-visual visual-${slug} ${large ? "visual-large" : ""}`}
      role="img"
      aria-label="Two separate hosting paths: Minecraft through a VPS and SSH tunnel; Palworld on a Windows host with Docker and persistent data."
    >
      <div aria-hidden="true">
        <InfrastructureVisual />
      </div>
      <span className="concept-label" aria-hidden="true">
        Concept illustration
      </span>
    </div>
  );
}
