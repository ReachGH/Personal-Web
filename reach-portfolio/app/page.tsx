import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  GraduationCap,
  MapPin,
  Trophy,
} from "lucide-react";
import portrait from "@/public/images/reach-portrait.png";
import { Contact } from "@/components/contact";
import { PortraitOrbit } from "@/components/portrait-orbit";
import { ProjectCard } from "@/components/project-card";
import { SupportingProjects } from "@/components/supporting-projects";
import { experience, skills } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
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
          <figure className="hero-portrait">
            <PortraitOrbit>
              <div className="portrait-frame">
                <Image
                  src={portrait}
                  alt="Reach smiling, wearing glasses and a light blue shirt."
                  className="portrait-image"
                  sizes="(max-width: 767px) 220px, (max-width: 900px) 270px, (max-width: 1100px) 330px, 360px"
                  preload
                />
              </div>
            </PortraitOrbit>
            <figcaption className="hero-greeting">Hi, I’m Reach !</figcaption>
          </figure>
        </div>
      </section>

      <section
        id="work"
        className="work-section section-pad"
        aria-labelledby="work-title"
      >
        <div className="container">
          <div className="section-heading">
            <h2 id="work-title">Professional work</h2>
          </div>
          <div className="projects-grid professional-projects">
            {projects
              .filter((project) => project.kind === "professional")
              .map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
          </div>
        </div>
      </section>

      <section
        id="personal-projects"
        className="container project-collection"
        aria-labelledby="personal-projects-title"
      >
        <div className="section-heading">
          <h2 id="personal-projects-title">Personal projects</h2>
        </div>
        <div className="personal-projects-grid">
          {projects
            .filter((project) => project.kind === "personal")
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          <SupportingProjects kind="personal" />
        </div>
      </section>

      <section
        id="study-projects"
        className="container project-collection study-projects"
        aria-labelledby="study-projects-title"
      >
        <div className="section-heading">
          <h2 id="study-projects-title">Study projects</h2>
        </div>
        <SupportingProjects kind="study" />
      </section>

      <section
        id="about"
        className="about-section section-pad"
        aria-labelledby="about-title"
      >
        <div className="container about-grid">
          <div className="about-heading">
            <h2 id="about-title">About me</h2>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              I’m Sovanreach In — Reach for short. I’m a Computer Science
              student based on the Gold Coast, Australia.
            </p>
            <p>
              My path into software has taken me from meeting farmers in
              Cambodia to building business workflows in Australia. Along the
              way, I’ve worked on mobile apps, full-stack web applications and
              the occasional stubborn game server.
            </p>
            <p>
              I enjoy working through unfamiliar problems, whether that means
              understanding a user’s workflow, debugging an integration or
              getting a self-hosted service running reliably.
            </p>
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
            <h2 id="experience-title">Experience</h2>
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
            <h2 id="skills-title">Skills & tools</h2>
          </div>
          <div className="skills-list">
            {skills.map((group) => (
              <div className="skill-group" key={group.title}>
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
            <h2 id="education-title">Education & recognition</h2>
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
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
