import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`project-card ${featured ? "project-card-featured" : ""}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-visual-link"
        aria-label={`Read the ${project.name} case study`}
      >
        <ProjectVisual slug={project.slug} />
      </Link>
      <div className="project-card-content">
        <Link className="project-title-link" href={`/projects/${project.slug}`}>
          <h3>{project.name}</h3>
        </Link>
        <p>{project.summary}</p>
        <div className="tags">
          {project.stack.slice(0, featured ? 5 : 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link
          className="text-link case-link"
          href={`/projects/${project.slug}`}
        >
          Read the case study <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
