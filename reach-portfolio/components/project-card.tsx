import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./project-visual";
import styles from "./project-card.module.css";
import { cn } from "@/lib/classnames";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        styles["project-card"],
        featured
          ? styles["project-card-featured"]
          : styles["project-card-personal"],
      )}
      data-ui={`project-card ${featured ? "project-card-featured" : "project-card-personal"}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={styles["project-visual-link"]}
        aria-label={`Read the ${project.name} case study`}
        data-ui="project-visual-link"
      >
        <ProjectVisual
          slug={project.slug}
          presentation={featured ? "featured" : "personal"}
        />
      </Link>
      <div className={styles["project-card-content"]}>
        <Link
          className={styles["project-title-link"]}
          href={`/projects/${project.slug}`}
          data-ui="project-title-link"
        >
          <h3>{project.name}</h3>
        </Link>
        <p>{project.summary}</p>
        <div className={styles["tags"]}>
          {project.stack.slice(0, featured ? 5 : 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link
          className={cn("text-link", styles["case-link"])}
          href={`/projects/${project.slug}`}
        >
          Read the case study <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
