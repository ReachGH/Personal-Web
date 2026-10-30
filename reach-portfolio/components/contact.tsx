import { ArrowUpRight, Download, GitFork, ContactRound } from "lucide-react";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        <div>
          <h2>Let’s talk.</h2>
          <p>
            I’m looking for a graduate or junior software engineering role in
            Australia. Have an opportunity or a project in mind? Get in touch.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight />
          </a>
        </div>
        <div className="contact-side">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitFork size={18} /> GitHub <ArrowUpRight size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <ContactRound size={18} /> LinkedIn <ArrowUpRight size={16} />
          </a>
          <a href={profile.resume} download>
            <Download size={18} /> Download résumé <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
