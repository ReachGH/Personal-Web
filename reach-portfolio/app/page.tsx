import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { ProjectCard } from "@/components/project-card";
import { SupportingProjects } from "@/components/supporting-projects";
import { projects } from "@/data/projects";
import styles from "./home.module.css";
import { cn } from "@/lib/classnames";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <section
        id="work"
        className={cn(styles["work-section"], "page-section")}
        aria-labelledby="work-title"
      >
        <div className="container">
          <div className="section-heading">
            <h2 id="work-title" className="section-title">
              Professional work
            </h2>
          </div>
          <div className={styles["projects-grid"]}>
            {projects
              .filter((project) => project.kind === "professional")
              .map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
          </div>
        </div>
      </section>
      <section
        id="personal-projects"
        className={cn(styles["project-collection"], "page-section")}
        aria-labelledby="personal-projects-title"
      >
        <div className="container">
          <div className="section-heading">
            <h2 id="personal-projects-title" className="section-title">
              Personal projects
            </h2>
          </div>
          <div className={styles["personal-projects-grid"]}>
            {projects
              .filter((project) => project.kind === "personal")
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            <SupportingProjects />
          </div>
        </div>
      </section>
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
