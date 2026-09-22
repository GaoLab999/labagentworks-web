import {
  Hero,
  Section,
  Badge,
  Button,
  FeatureCard,
  FAQ,
  CTASection,
} from "@/components/ui";
import {
  ArchitectureDiagram,
  WorkflowDiagram,
  Outputs,
} from "@/components/diagrams";
import { features, metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "scRNA-agent — Single-cell RNA-seq analysis for biologists",
    "Researcher-directed single-cell RNA-seq analysis with local R/Python computation, protected scientific guidance, and traceable outputs.",
    "/products/scrna-agent/",
  );
export default function Product() {
  return (
    <>
      <Hero
        eyebrow="scRNA-agent / By Lab Agent Works"
        title="Single-cell RNA-seq analysis, directed by you."
        description="scRNA-agent helps biologists analyze their own data with local R/Python tools and specialized AI-assisted guidance, from quality control and annotation to figures and reports."
      >
        <div className="button-row">
          <Button href="/download">View Windows availability</Button>
          <Badge>Windows · Coming soon</Badge>
        </div>
      </Hero>
      <Section
        className="tinted"
        eyebrow="Built for biologists"
        title="Less distance between a question and an analysis."
      >
        <div className="split">
          <p className="large-copy">
            Routine analysis can demand substantial computational expertise.
            scRNA-agent helps bridge that gap.
          </p>
          <div>
            <p>
              Interact with an agent that uses project context, executes local
              R/Python tools, and tracks outputs as your analysis develops.
            </p>
            <p>
              It supports iterative biological exploration without replacing
              scientific judgment. Complex study design, unusual datasets, and
              challenging interpretation may still require expert
              bioinformatics.
            </p>
          </div>
        </div>
      </Section>
      <Section
        id="workflow"
        eyebrow="The analysis framework"
        title="Guidance from data intake to interpretation."
      >
        <WorkflowDiagram />
      </Section>
      <Section
        eyebrow="The system concept"
        title="A local workspace. A connected Core."
        description="Local tools perform the computation. Your own model access supports reasoning and execution. The protected Core provides maintained scientific guidance and product services."
        className="tinted"
      >
        <ArchitectureDiagram />
      </Section>
      <Section
        eyebrow="An example interaction"
        title="Ask in the language of your research."
      >
        <div className="interaction">
          <div className="researcher">
            <span className="eyebrow">Researcher</span>
            <blockquote>
              “Compare the annotated T cells and myeloid cells using Hallmark
              GSEA and generate the plots.”
            </blockquote>
          </div>
          <div className="agent-response">
            <span className="eyebrow">scRNA-agent / Illustrative workflow</span>
            <ol>
              <li>Prepare the comparison and clarify the analysis design.</li>
              <li>Acquire supported reference resources when needed.</li>
              <li>Run the analysis in the local scientific environment.</li>
              <li>Generate figures and reports for researcher review.</li>
              <li>Preserve project provenance and analysis artifacts.</li>
            </ol>
            <p className="caption">
              An example of the intended interaction, not a scientific result.
              Method choices require review in the context of the study.
            </p>
          </div>
        </div>
      </Section>
      <Section
        id="outputs"
        eyebrow="What you keep"
        title="Outputs that stay with your project."
        className="tinted"
      >
        <Outputs />
      </Section>
      <Section
        eyebrow="Product capabilities"
        title="Made for careful, iterative work."
      >
        <div className="feature-grid">
          {features.map(([title, description], index) => (
            <FeatureCard key={title} {...{ title, description, index }} />
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Data handling"
        title="Keep raw scientific data local."
        description="The Core does not need your raw dataset. Your model provider is a separate connection, with its own policies for shared context."
      >
        <Button href="/privacy" secondary>
          Read the privacy model
        </Button>
      </Section>
      <Section
        eyebrow="Common questions"
        title="Before you get started."
        className="tinted"
      >
        <FAQ />
      </Section>
      <CTASection />
    </>
  );
}
