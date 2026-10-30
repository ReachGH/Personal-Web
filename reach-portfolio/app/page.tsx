import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Braces,
  CheckCheck,
  GraduationCap,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";
import { Asterisk } from "@/components/brand";
import { Contact } from "@/components/contact";
import { ProjectCard } from "@/components/project-card";
import { experience, profile, skills } from "@/data/profile";
import { otherProjects, projects } from "@/data/projects";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-intro">
          <span className="eyebrow">
            <span className="status-dot" /> OPEN TO MY NEXT CHAPTER
          </span>
          <span className="hero-edition">PORTFOLIO / 2026</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-greeting">
              Hi, I’m Reach. <span className="greeting-line" />
            </p>
            <h1 id="hero-title">
              A little curiosity.
              <br />A lot of{" "}
              <span className="hero-building">
                building
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
            <p className="hero-description">
              I build software that solves real problems — from web and mobile
              apps to the systems that keep them running.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-dark">
                Explore my work <ArrowDownRight size={18} />
              </a>
              <a href="#contact" className="hero-contact">
                Let’s talk <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" />
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-circle" />
            <div className="art-glyph">
              r<span>.</span>
            </div>
            <Asterisk className="art-asterisk" />
            <span className="art-coordinate">27.99° S / 153.40° E</span>
            <div className="art-note">
              <span className="art-note-dot" />
              <span>
                Curious by nature.
                <br />
                <strong>Developer by practice.</strong>
              </span>
              <Braces size={24} />
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            <MapPin size={14} /> Gold Coast, Australia
          </span>
          <span>Computer Science @ Griffith University</span>
          <a href="#work">
            A few things I’ve built <ArrowDown size={15} />
          </a>
        </div>
      </section>

      <section
        id="work"
        className="work-section section-pad"
        aria-labelledby="work-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-kicker">01 / SELECTED WORK</span>
              <h2 id="work-title">
                Different problems.
                <br />
                <span className="muted-heading">Same curiosity.</span>
              </h2>
            </div>
            <p>
              A few projects that have shaped
              <br />
              how I think, build and solve.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                featured={index === 0}
              />
            ))}
          </div>
          <div className="other-heading">
            <h3>Also on my workbench</h3>
            <span>Smaller builds. Useful lessons.</span>
          </div>
          <div className="other-projects">
            {otherProjects.map((project) => {
              const Icon =
                project.icon === "bot"
                  ? Bot
                  : project.icon === "tasks"
                    ? CheckCheck
                    : ImageIcon;
              return (
                <article className="other-project" key={project.name}>
                  <div className="other-project-top">
                    <span className={`other-icon other-icon-${project.icon}`}>
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    {project.href && (
                      <a
                        className="small-arrow"
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.subtitle} source on GitHub`}
                      >
                        <ArrowUpRight size={21} />
                      </a>
                    )}
                  </div>
                  <span className="small-label">{project.category}</span>
                  <h4>{project.name}</h4>
                  <h5>{project.subtitle}</h5>
                  <p>{project.description}</p>
                  <div className="other-stack">{project.stack.join(" · ")}</div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="about-section section-pad"
        aria-labelledby="about-title"
      >
        <div className="container about-grid">
          <div className="about-heading">
            <span className="eyebrow section-kicker">
              02 / A LITTLE ABOUT ME
            </span>
            <h2 id="about-title">
              I like figuring
              <br />
              things <span className="serif-word">out.</span>
            </h2>
            <Asterisk className="about-asterisk" />
            <span className="about-caption">
              THAT’S USUALLY WHERE IT STARTS.
            </span>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              I’m Sovanreach In — Reach for short. A Computer Science student
              who enjoys solving problems and finding a way forward when they
              don’t.
            </p>
            <p>
              My path into software has taken me from meeting farmers in
              Cambodia to building business workflows in Australia. Along the
              way, I’ve worked on mobile apps, full-stack web applications and
              the occasional stubborn game server.
            </p>
            <p>
              I’m at my best when there’s something practical to understand,
              build or make work a little better. I ask questions, get into the
              details and keep learning as I go.
            </p>
            <p>
              I’m completing my Bachelor of Computer Science at Griffith
              University in November 2026, and looking for a graduate or junior
              software engineering role where I can contribute and grow.
            </p>
            <a className="text-link" href={profile.resume} download>
              A little more about my background <ArrowUpRight size={16} />
            </a>
            <div className="about-principles">
              <span>
                <Braces size={17} /> Build with purpose
              </span>
              <span>
                <Sparkles size={17} /> Stay curious
              </span>
              <span>
                <CheckCheck size={17} /> Check the details
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="experience-section section-pad"
        aria-labelledby="experience-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-kicker">03 / EXPERIENCE</span>
              <h2 id="experience-title">Learning by doing.</h2>
            </div>
            <a className="text-link" href={profile.resume} download>
              Download my résumé <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="experience-list">
            {experience.map((job, index) => (
              <article className="experience-row" key={job.company}>
                <div className="experience-date">
                  <span
                    className={`timeline-dot ${index === 0 ? "active-dot" : ""}`}
                  />
                  <span>{job.period}</span>
                </div>
                <div className="experience-role">
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                  <span>
                    <MapPin size={12} /> {job.location}
                  </span>
                </div>
                <div className="experience-detail">
                  <p>{job.description}</p>
                  <div className="experience-tags">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="skills-section section-pad"
        aria-labelledby="skills-title"
      >
        <div className="container skills-layout">
          <div className="skills-intro">
            <span className="eyebrow section-kicker">04 / THE TOOLKIT</span>
            <h2 id="skills-title">
              Tools I’ve
              <br />
              worked with.
            </h2>
            <p>
              Different projects, different tools.
              <br />
              Always more to learn.
            </p>
            <Terminal size={34} strokeWidth={1} className="toolkit-icon" />
          </div>
          <div className="skills-list">
            {skills.map((group, index) => (
              <div className="skill-group" key={group.title}>
                <span className="skill-number">0{index + 1}</span>
                <div>
                  <h3>{group.title}</h3>
                  <p className="skill-context">{group.context}</p>
                  <div className="skill-items">
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

      <section
        id="education"
        className="education-section section-pad"
        aria-labelledby="education-title"
      >
        <div className="container">
          <div className="education-heading">
            <span className="eyebrow section-kicker">
              05 / EDUCATION & RECOGNITION
            </span>
            <h2 id="education-title">A foundation to build on.</h2>
          </div>
          <div className="education-grid">
            <div className="degree-card">
              <GraduationCap size={25} strokeWidth={1.5} />
              <div>
                <h3>Bachelor of Computer Science</h3>
                <p>Griffith University</p>
                <span>Expected completion · November 2026</span>
              </div>
            </div>
            <div className="degree-card">
              <GraduationCap size={25} strokeWidth={1.5} />
              <div>
                <h3>Diploma of Information Technology</h3>
                <p>Griffith College</p>
                <span>Completed · 2025</span>
              </div>
            </div>
            <div className="award-card">
              <Trophy size={25} strokeWidth={1.5} />
              <div>
                <span className="small-label">GRIFFITH UNIVERSITY / 2025</span>
                <h3>Academic Excellence Award</h3>
                <p>
                  Recognised among the top 5% of Griffith students for academic
                  achievement.
                </p>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
