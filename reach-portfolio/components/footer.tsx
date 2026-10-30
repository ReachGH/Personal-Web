import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Brand } from "./brand";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <Link href="/" className="brand-link">
          <Brand />
        </Link>
        <p>Made with care. And a little curiosity.</p>
        <a href="#top" className="back-top">
          Back to top <ArrowUp size={15} />
        </a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Sovanreach In</span>
        <span>Built with Next.js & TypeScript</span>
        <div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
