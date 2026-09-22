import Link from "next/link";
import { Hero, Section, Badge } from "@/components/ui";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Documentation",
    "Getting started, data, workflows, projects, reports, privacy, and membership documentation for scRNA-agent.",
    "/docs/",
  );
const topics = [
  [
    "getting-started",
    "Getting started",
    "The Windows application will guide runtime setup, model authentication, and local project creation.",
    "Download & setup",
    "/download",
  ],
  [
    "data-formats",
    "Data formats",
    "The supported input formats and preparation requirements will be published with the installer.",
    "Ask about your dataset",
    "/contact",
  ],
  [
    "analysis-workflow",
    "Analysis workflow",
    "Follow an adaptable framework from data intake and quality control through annotation and downstream analysis.",
    "View the workflow",
    "/products/scrna-agent",
  ],
  [
    "projects",
    "Projects",
    "Organize analysis around local project files, decisions, and traceable outputs. Detailed project management instructions are coming with release.",
    "Understand the workspace",
    "/how-it-works",
  ],
  [
    "figures-reports",
    "Figures and reports",
    "Review scientist-facing summaries alongside figures, tables, analysis artifacts, and technical reports. Export instructions are coming with release.",
    "Explore project outputs",
    "/products/scrna-agent",
  ],
  [
    "privacy-data",
    "Privacy and data handling",
    "Understand local computation, the protected Core, and context shared with your chosen model provider.",
    "Read the data model",
    "/privacy",
  ],
  [
    "membership",
    "Account and membership",
    "Learn about the 14-day trial, protected analysis access, and access to existing local results after membership ends.",
    "View membership",
    "/pricing",
  ],
  [
    "troubleshooting",
    "Troubleshooting",
    "Setup diagnostics and troubleshooting instructions will be published with the release. For now, contact support with a description of your question.",
    "Contact support",
    "/contact",
  ],
];
export default function Page() {
  return (
    <>
      <Hero
        eyebrow="Documentation"
        title="Get oriented. Then go deeper."
        description="A starting point for working with scRNA-agent. Detailed operational guides will be published alongside the Windows release."
      />
      <Section>
        <div className="docs-layout">
          <nav className="docs-nav" aria-label="Documentation topics">
            <p className="eyebrow">On this page</p>
            {topics.map(([id, title]) => (
              <a key={id} href={`#${id}`}>
                {title}
              </a>
            ))}
          </nav>
          <div>
            {topics.map(([id, title, body, label, url]) => (
              <article className="doc-topic" id={id} key={id}>
                <Badge>Guide preview</Badge>
                <h2>{title}</h2>
                <p>{body}</p>
                <Link className="text-link" href={url}>
                  {label} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
