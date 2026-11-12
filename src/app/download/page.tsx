import Link from "next/link";
import { ScRNAAgentLogo } from "@/components/scrna-agent-logo";
import { Hero, Section, Badge, Button, FeatureCard } from "@/components/ui";
import { TrialDetails } from "@/components/research-beta";
import { metadata, release, site } from "@/lib/site";
export const generateMetadata = () => metadata("scRNA-agent for Windows — Research beta", "Free 7-day research beta after email verification. No credit card needed. Windows setup and installer availability.", "/download/");
export default function Page() {
  const downloadAvailable = release.approved && Boolean(release.url);
  return (
    <>
      <Hero eyebrow="scRNA-agent / Windows research beta" title="scRNA-agent for Windows" description="From your first annotated dataset to your next biological question. A local scientific workspace, with guided setup.">
        <div className="button-row"><Badge>Free 7-day research beta</Badge></div>
        <p className="beta-registration">Public download — no GitHub account needed. Email registration in Workbench is required for beta access; no credit card needed.</p>
      </Hero>
      <Section className="tinted">
        <div className="download-panel">
          <div>
            <h2 className="product-lockup"><ScRNAAgentLogo /><span>Your research starts here.</span></h2>
            <p>Install once, then open scRNA-agent from the Windows Start menu. Setup prepares your local scientific environment.</p>
            {downloadAvailable && release.url ? <Button href={release.url}>Download for Windows</Button> : <>
              <button className="button download-disabled" disabled aria-describedby="download-status">Download for Windows <span aria-hidden="true">↓</span></button>
              <p id="download-status" className="availability-note">Download not yet available. This candidate is awaiting final interactive Windows acceptance.</p>
            </>}
            <p className="caption">Windows x64 · macOS support is not yet available.</p>
            <Link href="#installation" className="text-link">See the three setup steps ↓</Link>
          </div>
          <div className="release-card">
            <p className="eyebrow">Windows research beta</p><h3>Installer verification</h3>
            <p>The EXE is not Authenticode-signed. Automated build checks passed; full interactive Windows / WSL qualification remains pending.</p>
            <dl className="release-details">
              <div><dt>Installer version</dt><dd>{release.version}</dd></div>
              <div><dt>Source commit</dt><dd><code>{release.sourceCommit}</code></dd></div>
              <div><dt>Status</dt><dd>{downloadAvailable ? "Public research beta" : "Windows acceptance pending"}</dd></div>
              <div><dt>Installer SHA-256</dt><dd><code>{release.sha256}</code></dd></div>
            </dl>
            <p><a className="text-link" href={release.versionedUrl}>Download this exact version ↗</a></p>
            <p><a className="text-link" href={release.notesUrl}>Release notes &amp; checksum file ↗</a></p>
            <p className="caption">SHA-256 independently verified against the GitHub Actions artifact. This checksum applies to version {release.version}. The main download button follows the latest published installer.</p>
          </div>
        </div>
      </Section>
      <Section id="installation" eyebrow="Getting started" title="Three steps to your first analysis." description="You do not need Linux or programming experience for normal guided setup.">
        <div className="three-grid">
          <FeatureCard index={0} title="Install" description="Download and double-click scRNA-agent-Setup.exe. It checks for WSL 2 and Ubuntu 24.04 and offers to install missing components. Windows administrator approval and a restart may be required." />
          <FeatureCard index={1} title="Set up" description="Complete Ubuntu’s native username/password setup if prompted. scRNA-agent continues scientific environment preparation. Connect and authenticate Codex, then register your email and enter the verification code in Workbench." />
          <FeatureCard index={2} title="Analyze" description="Receive seven days of research-beta access. Create a project, import single-cell RNA-seq data, and start AutoRun or Guided Run. Continue exploring the annotated dataset using natural-language questions." />
        </div>
      </Section>
      <Section id="requirements" eyebrow="Before you install" title="Prepare your Windows computer." className="tinted">
        <dl className="requirements-list">
          <div><dt>Windows & processor</dt><dd>Windows 11 on Intel/AMD x64 is the current installation target. Earlier beta documentation also lists Windows 10 build 19041 or later; compatibility remains subject to final Windows acceptance. ARM64 is not supported in this beta.</dd></div>
          <div><dt>Scientific environment</dt><dd>WSL 2, Ubuntu 24.04 and hardware virtualization. Setup checks for missing components and offers to install them.</dd></div>
          <div><dt>Memory & storage</dt><dd>No validated numeric RAM or disk minimum has been published. Allow ample free disk space for the scientific environments, input data and project outputs. Resource needs depend on your dataset; confirmed guidance is pending release acceptance.</dd></div>
          <div><dt>Internet & Codex</dt><dd>Internet access is needed for setup downloads, account authentication and Codex-related services. Authenticate your own Codex account with device login permitted.</dd></div>
          <div><dt>Permissions</dt><dd>Windows administrator privileges may be needed to enable WSL and install prerequisites. A restart may be required. Institutional policies may restrict virtualization or unsigned installers.</dd></div>
        </dl>
      </Section>
      <Section id="trial" eyebrow="Access & accounts" title="Free research evaluation. No payment."><TrialDetails /></Section>
      <Section eyebrow="Research use & support" title="Explore carefully. Keep control of your work." className="tinted">
        <div className="split">
          <div><h3>Research beta, with researcher review</h3><p>This is evaluation software. Review analysis choices, annotations and biological interpretations. Results are not guaranteed to be accurate, and the application is not for clinical diagnostic use.</p><p>Scientific computation and project storage are local. Prompts and shared context may be sent to Codex-related services; review the <Link className="text-link" href="/privacy">privacy model</Link> and your institution’s requirements.</p></div>
          <div><h3>Unsigned Windows installer</h3><p>The EXE is not Authenticode-signed. Windows may show an Unknown Publisher or SmartScreen warning, and institutional security policies may block installation. Do not disable security protections. Ask your IT team or wait for a signed release if your organization requires one.</p><p>Questions about installation or evaluation access? <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a></p><Link className="text-link" href="/contact">Contact & support ↗</Link></div>
        </div>
      </Section>
    </>
  );
}
