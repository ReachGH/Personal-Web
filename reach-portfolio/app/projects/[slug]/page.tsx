import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { ProjectScreenshotGallery } from "@/components/project-screenshots";
import { Contact } from "@/components/contact";
import { projects } from "@/data/projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} — Reach`,
      description: project.summary,
      url: `/projects/${slug}`,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main-content">
      <article>
        <div className="container case-hero">
          <Link href="/#work" className="text-link case-back">
            <ArrowLeft size={16} /> All selected work
          </Link>
          <div className="case-kicker">
            <span className="small-label">{project.category}</span>
          </div>
          <h1>
            {project.name}
            <span className="orange">.</span>
          </h1>
          <p className="case-subtitle">{project.subtitle}</p>
          <span className="case-status">
            <span />
            {project.status}
          </span>
          <dl className="case-facts">
            <div>
              <dt>MY ROLE</dt>
              <dd>{project.role}</dd>
            </div>
            {project.organisation && (
              <div>
                <dt>CONTEXT</dt>
                <dd>{project.organisation}</dd>
              </div>
            )}
            {project.period && (
              <div>
                <dt>PERIOD</dt>
                <dd>{project.period}</dd>
              </div>
            )}
            <div>
              <dt>BUILT WITH</dt>
              <dd>{project.stack.join(" · ")}</dd>
            </div>
          </dl>
        </div>
        <figure className="container case-figure">
          <ProjectVisual slug={project.slug} large />
          <figcaption>{project.visualNote}</figcaption>
        </figure>
        <div className="container case-body">
          <aside className="case-aside">
            <span className="eyebrow">IN THIS CASE STUDY</span>
            <nav aria-label="Case study sections">
              <a href="#overview">The overview</a>
              {project.sections.map((section, index) => (
                <a key={section.title} href={`#section-${index + 1}`}>
                  {section.title}
                </a>
              ))}
              <a href="#takeaway">What I took away</a>
              {project.slug === "onboardhq" && (
                <a href="#screenshots">Screenshots</a>
              )}
            </nav>
          </aside>
          <div className="case-content">
            <section id="overview" className="case-overview">
              <h2>Overview</h2>
              <p className="case-introduction">{project.introduction}</p>
              <div className="contribution-box">
                <h3>Where I contributed</h3>
                <ul>
                  {project.contributions.map((item) => (
                    <li key={item}>
                      <Check size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            {project.sections.map((section, index) => (
              <section
                id={`section-${index + 1}`}
                className="case-section"
                key={section.title}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul className="case-points">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section id="takeaway" className="case-takeaway">
              <span className="eyebrow">WHAT I TOOK AWAY</span>
              <p>{project.takeaway}</p>
            </section>
          </div>
        </div>
        <ProjectScreenshotGallery slug={project.slug} />
        <div className="container next-project">
          <span className="eyebrow">NEXT CASE STUDY</span>
          <Link href={`/projects/${next.slug}`}>
            <span>
              {next.name}
              <small>{next.category}</small>
            </span>
            <ArrowRight size={38} strokeWidth={1.2} />
          </Link>
        </div>
      </article>
      <Contact />
    </main>
  );
}
