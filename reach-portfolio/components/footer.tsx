import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top" className="back-top">
          Back to top <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
