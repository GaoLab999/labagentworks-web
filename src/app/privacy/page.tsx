import { Hero, Section, FeatureCard, Button } from "@/components/ui";
import { ArchitectureDiagram } from "@/components/diagrams";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Scientific-data privacy model",
    "How local scientific computation, protected guidance, and your model provider fit into the data-handling architecture.",
    "/privacy/",
  );
export default function Page() {
  return (
    <>
      <Hero
        eyebrow="Scientific-data privacy model"
        title="Your scientific data stay on your computer."
        description="Local-first is an architectural choice: raw matrices and large scientific datasets stay in your local workspace, where scientific computation takes place."
      />
      <Section className="tinted">
        <ArchitectureDiagram />
      </Section>
      <Section title="Understand each part of the boundary.">
        <div className="feature-grid">
          <FeatureCard
            title="Raw data and computation"
            description="Raw matrices are handled locally by R/Python scientific environments. The protected Core does not need to receive the raw dataset."
          />
          <FeatureCard
            title="Project files and outputs"
            description="Local project files, figures, tables, and reports remain under your control. You choose how to store, back up, and share them."
          />
          <FeatureCard
            title="Protected Core services"
            description="The Core provides workflow guidance, scientific skills, account and entitlement services, and updates. These connected services are distinct from raw-data computation."
          />
          <FeatureCard
            title="Your AI/model provider"
            description="Your chosen provider supports reasoning and execution. Prompts and shared project context may leave your computer; local computation does not mean all AI interaction is offline."
          />
        </div>
      </Section>
      <Section
        className="tinted"
        title="Make informed choices about shared context."
      >
        <div className="prose">
          <p>
            Review your model provider’s policies and your institution’s
            requirements before sharing sensitive information. Do not include
            identifiable or restricted information in prompts unless you have an
            appropriate basis to do so.
          </p>
          <p>
            This page explains the product’s data-handling architecture. It is
            not a blanket guarantee about every external provider or a complete
            legal privacy policy. Detailed service data disclosures will be
            published with the application release.
          </p>
          <Button href="/contact" secondary>
            Ask about data handling
          </Button>
        </div>
      </Section>
    </>
  );
}
