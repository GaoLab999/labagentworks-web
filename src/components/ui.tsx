import Link from "next/link";
import type { ReactNode } from "react";
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`button${secondary ? " button-secondary" : ""}`}
      href={href}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="badge">
      <span className="status-dot" />
      {children}
    </span>
  );
}
export function Section({
  eyebrow,
  title,
  description,
  children,
  id,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2>{title}</h2>}
        {description && <p className="section-description">{description}</p>}
        {children}
      </div>
    </section>
  );
}
export function Hero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      {children}
    </section>
  );
}
export function FeatureCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <article className="feature-card">
      {index !== undefined && (
        <span className="feature-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
export function CTASection() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">Your next biological question</p>
          <h2>
            Closer to your data.
            <br />
            Further in your research.
          </h2>
          <p>Meet scRNA-agent, the first tool from Lab Agent Works.</p>
        </div>
        <Button href="/download">Explore download & setup</Button>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <Link href="/" className="wordmark">
            Lab Agent Works<span className="brand-period">.</span>
          </Link>
          <p>
            Scientific software.
            <br />
            Researcher-directed analysis.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/products">Products</Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Lab Agent Works</span>
        <span>Built around the way science works.</span>
      </div>
    </footer>
  );
}
export function FAQ() {
  const items = [
    [
      "Who is scRNA-agent for?",
      "Primarily biologists who want to work directly with their single-cell RNA-seq data, with structured computational guidance. Complex study design and interpretation may still benefit from expert bioinformatics support.",
    ],
    [
      "Does it replace scientific judgment?",
      "No. Researchers review analysis choices, assess quality, and interpret findings. AI assistance and workflow guidance do not guarantee scientific correctness.",
    ],
    [
      "Where does my data go?",
      "Raw matrices and large scientific datasets stay in your local workspace. The protected Core supplies guidance and product services without needing the raw dataset. Your model provider is a separate service; review what context you share and its data policies.",
    ],
    [
      "Do I need my own AI access?",
      "Yes. scRNA-agent uses your own model authentication for AI reasoning and execution. Provider availability, terms, and charges are separate from Lab Agent Works membership.",
    ],
    [
      "What happens when membership ends?",
      "Existing local projects and results remain available. Active membership is required for new protected scientific analysis.",
    ],
    [
      "Can I download it now?",
      "The Windows installer is coming soon. The download page will carry the signed installer and verified release details when available.",
    ],
  ];
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
