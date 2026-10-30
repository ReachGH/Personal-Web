import {
  ArrowUpRight,
  Bot,
  Check,
  Image as ImageIcon,
  MessageCircle,
  Server,
} from "lucide-react";
import { otherProjects } from "@/data/projects";

function ProjectSketch({ kind }: { kind: "bot" | "tasks" | "image" }) {
  return (
    <div
      className={`supporting-sketch supporting-sketch-${kind}`}
      aria-hidden="true"
    >
      {kind === "bot" ? (
        <div className="bot-sketch">
          <span className="sketch-endpoint">
            <Server size={20} strokeWidth={1.5} />
          </span>
          <span className="sketch-connection" />
          <span className="sketch-hub">
            <Bot size={32} strokeWidth={1.4} />
          </span>
          <span className="sketch-connection" />
          <span className="sketch-endpoint">
            <MessageCircle size={20} strokeWidth={1.5} />
          </span>
        </div>
      ) : kind === "tasks" ? (
        <div className="task-sketch">
          {[true, false, false].map((done, index) => (
            <div
              key={index}
              className={`sketch-task ${done ? "sketch-task-done" : ""}`}
            >
              <span className="sketch-checkbox">
                {done && <Check size={11} strokeWidth={2} />}
              </span>
              <span className="sketch-task-line" />
            </div>
          ))}
        </div>
      ) : (
        <div className="image-sketch">
          <span className="sketch-image">
            <ImageIcon size={32} strokeWidth={1.3} />
          </span>
          <span className="sketch-connection" />
          <div className="sketch-tiles">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SupportingProjects() {
  return (
    <section className="other-section" aria-labelledby="other-projects-title">
      <div className="other-heading">
        <h3 id="other-projects-title">Other projects</h3>
      </div>
      <div className="other-projects">
        {otherProjects.map((project) => (
          <article
            className={`other-project other-project-${project.icon}`}
            key={project.name}
          >
            <ProjectSketch kind={project.icon} />
            <div className="other-project-content">
              <span className="small-label">{project.category}</span>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <div className="other-project-footer">
                <ul
                  className="other-stack"
                  aria-label={`${project.name} technologies`}
                >
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                {project.href && (
                  <a
                    className="other-source"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} source on GitHub`}
                  >
                    View source <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
