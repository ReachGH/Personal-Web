"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { otherProjects } from "@/data/projects";

function SupportingProject({
  project,
}: {
  project: (typeof otherProjects)[number];
}) {
  const [open, setOpen] = useState(false);
  const buttonId = `project-toggle-${project.icon}`;
  const summaryId = `project-summary-${project.icon}`;
  const detailsId = `project-details-${project.icon}`;

  return (
    <li
      className="other-project"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          event.currentTarget.querySelector("button")?.focus();
        }
      }}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          className="other-project-toggle"
          aria-expanded={open}
          aria-controls={detailsId}
          aria-describedby={summaryId}
          onClick={() => setOpen((previous) => !previous)}
        >
          <span>{project.name}</span>
          <span className="other-project-affordance" aria-hidden="true">
            <ChevronDown size={16} className="other-project-chevron" />
          </span>
        </button>
      </h3>
      <p id={summaryId} className="other-project-summary">
        {project.summary}
      </p>
      <div
        id={detailsId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        inert={!open}
        className="other-project-details"
        data-open={open}
      >
        <div className="other-project-details-inner">
          <div className="other-project-body">
            {project.description.map((paragraph) => (
              <p className="other-project-overview" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <p className="other-project-stack">{project.stack.join(" · ")}</p>
            {project.href && (
              <a
                className="other-source"
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
    <ul className="other-projects" aria-label="More projects">
      {otherProjects.map((project) => (
        <SupportingProject project={project} key={project.name} />
      ))}
    </ul>
  );
}
