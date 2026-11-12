import Image from "next/image";
import portrait from "@/public/images/reach-portrait.png";
import { PortraitOrbit } from "./portrait-orbit";
import styles from "./hero.module.css";
import { cn } from "@/lib/classnames";

export function Hero() {
  return (
    <section
      className={cn(styles["hero"], "container")}
      aria-labelledby="hero-title"
      data-ui="hero container"
    >
      <div className={styles["hero-grid"]}>
        <div data-ui="hero-copy">
          <h1 id="hero-title">
            Hi, I’m{" "}
            <span className={styles["hero-name"]}>
              Reach
              <svg viewBox="0 0 430 18" fill="none" aria-hidden="true">
                <path
                  d="M3 12C112 2 290 1 427 8M35 16c103-6 211-7 338-3"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="orange">.</span>
          </h1>
          <div className={styles["hero-description"]}>
            <p className={styles["hero-intro"]}>Nice to meet you :)</p>
            <p className={styles["hero-story"]}>
              From talking with farmers in Cambodia to integrating business
              systems in Australia.
            </p>
            <p>
              These days, I’m studying Computer Science on the Gold Coast.
              Outside class, I build apps, tinker with game servers, and follow
              ideas to see where they lead.
            </p>
          </div>
        </div>
        <figure className={styles["hero-portrait"]}>
          <PortraitOrbit>
            <div className={styles["portrait-frame"]}>
              <Image
                src={portrait}
                alt="Reach smiling, wearing glasses and a light blue shirt."
                className={styles["portrait-image"]}
                sizes="(max-width: 767px) 220px, (max-width: 900px) 270px, (max-width: 1100px) 330px, 360px"
                preload
              />
            </div>
          </PortraitOrbit>
        </figure>
      </div>
    </section>
  );
}
