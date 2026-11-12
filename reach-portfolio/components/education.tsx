import { GraduationCap, Trophy } from "lucide-react";
import styles from "./education.module.css";
import { cn } from "@/lib/classnames";

export function Education() {
  return (
    <section
      id="education"
      className={cn(styles["education-section"], "page-section")}
      aria-labelledby="education-title"
    >
      <div className="container">
        <div className={styles["education-heading"]}>
          <h2 id="education-title" className="section-title">
            Education & recognition
          </h2>
        </div>
        <div className={styles["education-grid"]}>
          <div className={styles["degree-card"]}>
            <GraduationCap size={25} strokeWidth={1.5} />
            <div>
              <h3>Bachelor of Computer Science</h3>
              <p>Griffith University</p>
              <span>Expected completion · November 2026</span>
            </div>
          </div>
          <div className={styles["degree-card"]}>
            <GraduationCap size={25} strokeWidth={1.5} />
            <div>
              <h3>Diploma of Information Technology</h3>
              <p>Griffith College</p>
              <span>Completed · 2025</span>
            </div>
          </div>
          <div className={styles["award-card"]}>
            <Trophy size={25} strokeWidth={1.5} />
            <div>
              <span className="small-label">GRIFFITH UNIVERSITY / 2025</span>
              <h3>Academic Excellence Award</h3>
              <p>
                Recognised among the <strong>top 5%</strong> of Griffith
                students for academic achievement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
