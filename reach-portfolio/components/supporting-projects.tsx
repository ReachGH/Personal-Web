import { otherProjects } from "@/data/projects";

export function SupportingProjects() {
  return (
    <ul className="other-projects" aria-label="More projects">
      {otherProjects.map((project) => (
        <li className="other-project" key={project.name}>
          <div className="other-project-heading">
            <h3>{project.name}</h3>
            {project.href && (
              <a
                className="other-source"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name} source on GitHub`}
              >
                Source
              </a>
            )}
          </div>
          <p>{project.description}</p>
        </li>
      ))}
    </ul>
  );
}
