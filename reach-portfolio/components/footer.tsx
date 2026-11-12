import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import styles from "./footer.module.css";
import { cn } from "@/lib/classnames";

export function Footer() {
  return (
    <footer className={styles["site-footer"]}>
      <div className={cn("container", styles["footer-main"])}>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top" className={styles["back-top"]}>
          Back to top <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
