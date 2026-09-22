import Link from "next/link";
import {
  Badge,
  Button,
  Section,
  CTASection,
  FeatureCard,
} from "@/components/ui";
import {
  CellAtlas,
  ArchitectureDiagram,
  WorkflowDiagram,
  Outputs,
} from "@/components/diagrams";
import { features } from "@/lib/site";
export default function Home() {
  return (
    <>
      <section className="home-hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-line" /> Science, with you at the center
          </p>
          <h1>
            Scientific analysis
            <br />
            agents built for
            <br />
            <em>researchers.</em>
          </h1>
          <p className="lead">
            Work directly with your data. Keep scientific computation under your
            control.
          </p>
          <p className="hero-detail">
            Lab Agent Works develops specialized AI-assisted tools that bring
            biological questions and computational analysis closer together. Our
            first product is scRNA-agent, for single-cell RNA-seq analysis.
          </p>
          <div className="button-row">
            <Button href="/products/scrna-agent">Explore scRNA-agent</Button>
            <Button href="/how-it-works" secondary>
              How it works
            </Button>
          </div>
        </div>
        <CellAtlas />
      </section>
      <div className="principles-strip">
        <div className="container">
          <span>
            <i aria-hidden="true">◉</i> Local scientific computation
          </span>
          <span>
            <i aria-hidden="true">◇</i> Your data, under your control
          </span>
          <span>
            <i aria-hidden="true">↗</i> Guided by science. Directed by you.
          </span>
        </div>
      </div>
      <Section eyebrow="01 / Meet the first agent" className="product-section">
        <div className="product-intro">
          <div>
            <Badge>From Lab Agent Works · Coming soon</Badge>
            <p className="product-name">scRNA-agent</p>
            <h2>
              Single-cell RNA-seq
              <br />
              analysis for biologists.
            </h2>
          </div>
          <div className="product-description">
            <p className="large-copy">
              Your biological questions shouldn’t have to wait at the command
              line.
            </p>
            <p>
              scRNA-agent helps you work from raw or processed single-cell data
              through quality control, annotation, downstream analysis, figures,
              and reports.
            </p>
            <p>
              A local scientific workspace. Specialized protected guidance. You
              stay involved in the decisions that matter.
            </p>
            <Link className="text-link" href="/products/scrna-agent">
              Get to know scRNA-agent <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="three-grid product-benefits">
          <FeatureCard
            index={0}
            title="Ask biological questions"
            description="Explore your data with project-aware AI assistance and structured scientific guidance."
          />
          <FeatureCard
            index={1}
            title="Run the analysis locally"
            description="Use local R and Python environments while raw scientific data stay on your computer."
          />
          <FeatureCard
            index={2}
            title="Keep a traceable record"
            description="Review figures, reports, and analysis artifacts in a project you control."
          />
        </div>
      </Section>
      <Section
        eyebrow="02 / Local by design"
        title={"Your data stay close.\nYour analysis moves forward."}
        description="Raw matrices stay on your computer, where R and Python run the analysis. The protected Core provides maintained workflows and scientific guidance without needing your raw dataset."
        className="tinted"
      >
        <ArchitectureDiagram />
        <Link className="text-link" href="/how-it-works">
          Explore the architecture <span aria-hidden="true">↗</span>
        </Link>
      </Section>
      <Section
        eyebrow="03 / From question to insight"
        title="A framework for the way you explore."
        description="Move through single-cell analysis with guidance at each stage, and room to revisit decisions as the biology becomes clearer."
      >
        <WorkflowDiagram />
      </Section>
      <Section
        eyebrow="04 / Work you can build on"
        title="More than an answer. A scientific record."
        description="Keep useful outputs connected to the work behind them."
        className="tinted"
      >
        <Outputs />
      </Section>
      <Section
        eyebrow="05 / Purpose-built assistance"
        title="Scientific tools. Thoughtfully connected."
      >
        <div className="feature-grid">
          {features.slice(0, 6).map(([title, description], index) => (
            <FeatureCard key={title} {...{ title, description, index }} />
          ))}
        </div>
      </Section>
      <section className="privacy-band container">
        <span className="privacy-mark" aria-hidden="true">
          ⌑
        </span>
        <div>
          <p className="eyebrow">Local-first data handling</p>
          <h2>Your scientific data stay on your computer.</h2>
          <p>
            Raw matrices stay local. Project files remain under your control.
            The protected Core provides guidance without needing your raw
            dataset.
          </p>
        </div>
        <Link className="text-link" href="/privacy">
          Our privacy model <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <CTASection />
    </>
  );
}
