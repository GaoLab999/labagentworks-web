import {
  Hero,
  Section,
  FeatureCard,
  Button,
  CTASection,
} from "@/components/ui";
import { ArchitectureDiagram, WorkflowDiagram } from "@/components/diagrams";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "How it works",
    "Understand the local scientific workspace, your model access, and the protected Core.",
    "/how-it-works/",
  );
export default function Page() {
  return (
    <>
      <Hero
        eyebrow="How it works"
        title="Local computation. Connected scientific guidance."
        description="Lab Agent Works separates the scientific workspace from the guidance that supports it. You work with your data locally, while specialized knowledge and workflows are maintained through the protected Core."
      />
      <Section className="tinted">
        <ArchitectureDiagram />
      </Section>
      <Section
        eyebrow="Three parts, clear roles"
        title="Built around your working environment."
      >
        <div className="three-grid">
          <FeatureCard
            index={0}
            title="Your local workspace"
            description="Your data, R/Python environments, analysis artifacts, figures, and reports live on your computer."
          />
          <FeatureCard
            index={1}
            title="Your model access"
            description="Use your own model authentication for reasoning and execution. Review the context sent to your provider and its data policies."
          />
          <FeatureCard
            index={2}
            title="The protected Core"
            description="Connect to versioned workflows, scientific skills, reusable experience, account services, entitlement, and updates."
          />
        </div>
      </Section>
      <Section
        eyebrow="In practice / scRNA-agent"
        title="A guided process, with you in the loop."
        description="Start with a biological question, review the analysis choices, run local tools, and inspect the outputs. Revisit earlier steps as your understanding develops."
        className="tinted"
      >
        <WorkflowDiagram />
      </Section>
      <Section
        title="Scientific judgment remains essential."
        description="Guidance helps you navigate methods; it does not validate every assumption or guarantee a result. Study design, quality assessment, and biological interpretation remain researcher responsibilities."
      >
        <Button href="/products/scrna-agent" secondary>
          Explore scRNA-agent
        </Button>
      </Section>
      <CTASection />
    </>
  );
}
