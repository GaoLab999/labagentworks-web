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
        eyebrow="Pricing & membership"
        title="Start exploring. Build on your work."
        description="A straightforward trial and membership structure for access to protected scientific analysis. Pricing and checkout will be available with the release."
      />
      <Section>
        <div className="pricing-grid">
          {[
            [
              "14-day free trial",
              "A place to start",
              "No credit card required",
              "Full protected analysis access during trial",
              "Trial available with release",
            ],
            [
              "Monthly membership",
              "Room to explore",
              "Price to be announced",
              "Protected scientific analysis and maintained guidance",
              "Monthly checkout coming soon",
            ],
            [
              "Annual membership",
              "A longer research horizon",
              "Price to be announced",
              "Protected scientific analysis and maintained guidance",
              "Annual checkout coming soon",
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
              <button disabled className="button button-placeholder">
                {status}
              </button>
            </article>
          ))}
        </div>
        <p className="caption">
          Your own AI/model access is required. Any model-provider charges are
          separate.
        </p>
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
