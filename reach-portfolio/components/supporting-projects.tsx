"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { otherProjects } from "@/data/projects";
import styles from "./supporting-projects.module.css";

function SupportingProject({
  project,
}: {
  project: (typeof otherProjects)[number];
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const buttonId = `project-toggle-${project.icon}`;
  const summaryId = `project-summary-${project.icon}`;
  const detailsId = `project-details-${project.icon}`;
  return (
    <li
      className={styles["other-project"]}
      onClick={(event) => {
        if (
          (event.target as HTMLElement).closest("a, button") ||
          window.getSelection()?.isCollapsed === false
        ) {
          return;
        }
        toggleRef.current?.focus({
          preventScroll: true,
        });
        setOpen((previous) => !previous);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus({
            preventScroll: true,
          });
        }
      }}
      data-ui="other-project"
    >
      <h3>
        <button
          ref={toggleRef}
          id={buttonId}
          type="button"
          className={styles["other-project-toggle"]}
          aria-expanded={open}
          aria-controls={detailsId}
          aria-describedby={summaryId}
          onClick={() => setOpen((previous) => !previous)}
          data-ui="other-project-toggle"
        >
          <span>{project.name}</span>
          <span
            className={styles["other-project-affordance"]}
            aria-hidden="true"
          >
            <ChevronDown
              size={16}
              className={styles["other-project-chevron"]}
            />
          </span>
        </button>
      </h3>
      <p id={summaryId} className={styles["other-project-summary"]}>
        {project.summary}
      </p>
      <div
        id={detailsId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        inert={!open}
        className={styles["other-project-details"]}
        data-open={open}
      >
        <div className={styles["other-project-details-inner"]}>
          <div className={styles["other-project-body"]}>
            {project.description.map((paragraph) => (
              <p
                className={styles["other-project-overview"]}
                key={paragraph}
                data-ui="other-project-overview"
              >
                {paragraph}
              </p>
            ))}
            <p className={styles["other-project-stack"]}>
              {project.stack.join(" · ")}
            </p>
            {project.href && (
              <a
                className={styles["other-source"]}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} source on GitHub`}
              >
                View source
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function SupportingProjects() {
  return (
    <ul className={styles["other-projects"]} aria-label="More projects">
      {otherProjects.map((project) => (
        <SupportingProject project={project} key={project.name} />
      ))}
    </ul>
  );
}
