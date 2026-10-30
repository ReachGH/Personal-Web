import {
  ArrowUpRight,
  Download,
  GitFork,
  ContactRound,
  Mail,
} from "lucide-react";
import { Asterisk } from "./brand";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        <div>
          <span className="eyebrow">
            <span className="status-dot" /> OPEN TO GRADUATE & JUNIOR ROLES
          </span>
          <h2>
            Good things start
            <br />
            with a <span>hello.</span>
            <Asterisk className="contact-asterisk" />
          </h2>
          <p>
            Have an opportunity, a question, or something interesting
            <br className="desktop-break" /> to build? I’d like to hear about
            it.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight />
          </a>
        </div>
        <div className="contact-side">
          <span className="contact-side-label">FIND ME ELSEWHERE</span>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitFork size={18} /> GitHub <ArrowUpRight size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <ContactRound size={18} /> LinkedIn <ArrowUpRight size={16} />
          </a>
          <a href={profile.resume} download>
            <Download size={18} /> Download résumé <ArrowUpRight size={16} />
          </a>
          <div className="contact-location">
            <Mail size={16} />
            <span>
              Based on the Gold Coast.
              <br />
              Looking for my next chapter in Australia.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
