import { Hero, Section } from "@/components/ui";
import { metadata, site } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Contact",
    "Contact Lab Agent Works about scRNA-agent and researcher-directed scientific analysis.",
    "/contact/",
  );
export default function Page() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="Let’s talk about your research workflow."
        description="Questions about scRNA-agent, the local-first architecture, or the direction of Lab Agent Works? Get in touch."
      />
      <Section className="tinted">
        <div className="contact-card">
          <p className="eyebrow">Lab Agent Works</p>
          <h2>
            Scientific software for
            <br />
            researcher-directed analysis.
          </h2>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email} <span aria-hidden="true">↗</span>
          </a>
          <p className="caption">
            Support contact placeholder. Mailbox availability will be confirmed
            before release.
          </p>
          <p>
            Please describe your question without attaching raw scientific data
            or sensitive information.
          </p>
        </div>
      </Section>
    </>
  );
}
