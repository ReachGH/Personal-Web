import { MapPin } from "lucide-react";
import { experience } from "@/data/profile";
import styles from "./experience.module.css";
import { cn } from "@/lib/classnames";

export function Experience() {
  return (
    <section
      id="experience"
      className={cn(styles["experience-section"], "page-section")}
      aria-labelledby="experience-title"
    >
      <div className="container">
        <div className="section-heading">
          <h2 id="experience-title" className="section-title">
            Experience
          </h2>
        </div>
        <div className={styles["experience-list"]}>
          {experience.map((job) => (
            <article className={styles["experience-row"]} key={job.company}>
              <div className={styles["experience-role"]}>
                <h3>{job.company}</h3>
                <p>{job.role}</p>
                <div className={styles["experience-meta"]}>
                  <span className={styles["experience-period"]}>
                    {job.period}
                  </span>
                  <span>
                    <MapPin size={13} aria-hidden="true" /> {job.location}
                  </span>
                </div>
              </div>
              <ul className={styles["experience-highlights"]}>
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
