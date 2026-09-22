import {
  Hero,
  Section,
  Badge,
  Button,
  FeatureCard,
  CTASection,
} from "@/components/ui";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Scientific analysis tools",
    "Specialized scientific agents for researcher-directed analysis, starting with scRNA-agent.",
    "/products/",
  );
export default function Products() {
  return (
    <>
      <Hero
        eyebrow="The Lab Agent Works platform"
        title="Specialized agents. A shared scientific foundation."
        description="Tools built around distinct scientific workflows, connected by local computation, maintained guidance, and researcher control."
      />
      <Section className="tinted">
        <div className="split">
          <div>
            <Badge>First product · Download coming soon</Badge>
            <h2 className="mt-title">scRNA-agent</h2>
            <p className="large-copy">
              Single-cell RNA-seq analysis for biologists.
            </p>
            <p>
              Explore your own data with guided local analysis, from quality
              control and annotation to downstream comparisons and reports.
            </p>
            <div className="button-row">
              <Button href="/products/scrna-agent">Explore the product</Button>
            </div>
          </div>
          <div className="product-note">
            <p className="eyebrow">The shared foundation</p>
            <h3>
              Your question.
              <br />
              Your workspace.
              <br />
              Specialized guidance.
            </h3>
            <p>Scientific judgment stays with the researcher.</p>
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Looking ahead"
        title="Built to grow across scientific disciplines."
        description="Potential future directions for the platform. These agents are not currently available, and release plans have not been announced."
      >
        <div className="three-grid">
          {[
            "Spatial analysis agent",
            "Flow cytometry agent",
            "Transcriptomics agent",
          ].map((title) => (
            <div key={title}>
              <Badge>Future direction</Badge>
              <FeatureCard
                title={title}
                description="A potential extension of researcher-directed, AI-assisted scientific analysis."
              />
            </div>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}
