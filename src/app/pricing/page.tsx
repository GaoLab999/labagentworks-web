import { Hero, Section, Badge, Button } from "@/components/ui";
import { metadata } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Pricing & membership",
    "A 14-day trial and monthly or annual membership for protected scientific analysis. Pricing will be announced.",
    "/pricing/",
  );
export default function Page() {
  return (
    <>
      <Hero
        eyebrow="scRNA-agent / Pricing & membership"
        title="Start exploring. Build on your work."
        description="Start with a 14-day trial, then choose monthly or annual membership for protected scientific analysis. Prices and enrollment will be announced with the Windows release."
      >
        <div className="button-row">
          <Badge>Membership opens with the application release</Badge>
        </div>
      </Hero>
      <Section>
        <div className="pricing-grid">
          {[
            [
              "14-day free trial",
              "Explore scRNA-agent with your own data.",
              "No credit card required",
              "Full protected analysis access during trial",
              "Trial available with release",
            ],
            [
              "Monthly membership",
              "Monthly access to scRNA-agent.",
              "Price to be announced",
              "Protected scientific analysis and maintained guidance",
              "Monthly membership coming soon",
            ],
            [
              "Annual membership",
              "Annual access to scRNA-agent.",
              "Price to be announced",
              "Protected scientific analysis and maintained guidance",
              "Annual membership coming soon",
            ],
          ].map(([title, sub, price, detail, status], i) => (
            <article
              className={`pricing-card ${i === 0 ? "featured" : ""}`}
              key={title}
            >
              <Badge>{i === 0 ? "14 days" : "Membership"}</Badge>
              <h2>{title}</h2>
              <p>{sub}</p>
              <p className="price-label">{price}</p>
              <p>{detail}</p>
              <p className="availability-note">{status}</p>
            </article>
          ))}
        </div>
        <p className="caption">
          Your own AI/model access is required. Any model-provider charges are
          separate.
        </p>
        <Button href="/download" secondary>
          View release availability
        </Button>
      </Section>
      <Section
        title="Your work remains yours."
        className="tinted"
        description="Existing local projects and results remain available after membership ends. Active membership is required for new protected scientific analysis."
      >
        <Button href="/download" secondary>
          Download & availability
        </Button>
      </Section>
    </>
  );
}
