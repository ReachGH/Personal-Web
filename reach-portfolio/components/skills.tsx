import { skills } from "@/data/profile";
import styles from "./skills.module.css";
import { cn } from "@/lib/classnames";

export function Skills() {
  return (
    <section
      id="skills"
      className={cn(styles["skills-section"], "page-section")}
      aria-labelledby="skills-title"
    >
      <div className={cn("container", styles["skills-layout"])}>
        <div className={styles["skills-intro"]}>
          <h2 id="skills-title" className="section-title">
            Skills & tools
          </h2>
        </div>
        <div className={styles["skills-list"]}>
          {skills.map((group) => (
            <div className={styles["skill-group"]} key={group.title}>
              <div>
                <h3>{group.title}</h3>
                {group.context && (
                  <p className={styles["skill-context"]}>{group.context}</p>
                )}
                <div className={styles["skill-items"]}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
