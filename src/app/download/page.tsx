import Link from "next/link";
import { Hero, Section, Badge, Button, FeatureCard } from "@/components/ui";
import { metadata, release } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Download scRNA-agent",
    "Windows installer availability, guided setup, and release information for scRNA-agent.",
    "/download/",
  );
export default function Page() {
  return (
    <>
      <Hero
        eyebrow="Download / scRNA-agent"
        title="Your local workspace for single-cell analysis."
        description="A Windows application with a local scientific workspace and guided setup. Bring your own data, biological questions, and model access."
      />
      <Section className="tinted">
        <div className="download-panel">
          <div>
            <span className="windows-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <Badge>
              {release.url ? "Release available" : "Download coming soon"}
            </Badge>
            <h2>scRNA-agent for Windows</h2>
            <p>
              The local WSL-based scientific runtime is configured automatically
              during guided setup.
            </p>
            {release.url ? (
              <Button href={release.url}>Download signed installer</Button>
            ) : (
              <div className="availability-note">
                <p>
                  The Windows installer is not yet available. The signed
                  download will be published here when it is ready.
                </p>
                <div className="button-row">
                  <Button href="/docs" secondary>
                    Explore setup & documentation
                  </Button>
                </div>
              </div>
            )}
            <p className="caption">
              Installer and system requirements will be published with the
              release.
            </p>
          </div>
          <div className="release-card">
            <p className="eyebrow">Release information</p>
            <h3>
              {release.url ? "Installer details" : "What to expect at release"}
            </h3>
            {!release.url && (
              <ul>
                <li>A signed Windows installer with guided setup</li>
                <li>Supported system requirements and setup instructions</li>
                <li>Version, release notes, and a SHA-256 checksum</li>
              </ul>
            )}
            <details
              className="release-disclosure"
              open={release.url ? true : undefined}
            >
              <summary>Version & verification details</summary>
              <dl className="release-details">
                {[
                  [
                    "Installer",
                    release.url ? "Signed Windows installer" : "Coming soon",
                  ],
                  ["Version", release.version ?? "Not yet published"],
                  ["Release date", release.date ?? "Not yet published"],
                  ["SHA-256", release.sha256 ?? "Published with installer"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                <div>
                  <dt>Release notes</dt>
                  <dd>
                    {release.notesUrl ? (
                      <Link href={release.notesUrl}>Read release notes ↗</Link>
                    ) : (
                      "Available with release"
                    )}
                  </dd>
                </div>
              </dl>
            </details>
          </div>
        </div>
      </Section>
      <Section title="A guided path to your workspace.">
        <div className="three-grid">
          <FeatureCard
            index={0}
            title="Install and set up"
            description="Guided setup prepares the application and local scientific runtime."
          />
          <FeatureCard
            index={1}
            title="Connect your model"
            description="Authenticate using your own supported AI/model access for reasoning and execution."
          />
          <FeatureCard
            index={2}
            title="Create a local project"
            description="Keep your data and project outputs in local storage under your control."
          />
        </div>
        <div className="button-row">
          <Button href="/docs" secondary>
            Explore documentation
          </Button>
          <Button href="/contact" secondary>
            Contact us
          </Button>
        </div>
      </Section>
    </>
  );
}
