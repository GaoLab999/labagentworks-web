import Link from "next/link";
import { ScRNAAgentLogo } from "@/components/scrna-agent-logo";
import { Hero, Section, Badge, Button, FeatureCard } from "@/components/ui";
import { TrialDetails } from "@/components/research-beta";
import { metadata, release, macRelease, site } from "@/lib/site";
export const generateMetadata = () => metadata("scRNA-agent for Windows and Mac — Research beta", "Free 7-day research beta after email verification. No credit card needed. Windows and Apple Silicon Mac setup and installer availability.", "/download/");
export default function Page() {
  const downloadAvailable = release.approved && Boolean(release.url);
  return (
    <>
      <Hero eyebrow="scRNA-agent / Research beta" title="scRNA-agent for Windows and Mac" description="From your first annotated dataset to your next biological question. A local scientific workspace, with guided setup.">
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
            <p className="caption">Windows x64</p>
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
      <Section id="mac" eyebrow="Apple Silicon research beta" title="Download for Mac">
        <div className="download-panel">
          <div>
            <h3>Local science on your Apple Silicon Mac</h3>
            <p>The native Mac launcher prepares R and Python in a local Lima Ubuntu ARM64 virtual machine. Intel Macs are not supported.</p>
            {macRelease.approved && macRelease.url ? <Button href={macRelease.url}>Download for Mac — Apple Silicon</Button> : <p>Mac installer verification is in progress.</p>}
            <p className="caption">macOS 14 or later · Apple Silicon · 16 GiB RAM · at least 50 GiB free disk, plus space for data. Larger studies may need more resources.</p>
            <h3>Install and set up</h3>
            <ol>
              <li>Download the DMG, open it, and drag scRNA-agent into Applications.</li>
              <li>Open scRNA-agent and choose Set Up. Approve the Lima, Ubuntu and scientific-package downloads. When replacing an earlier version, stop its Workbench first and run Set Up again; projects and intact environments are preserved.</li>
              <li>Choose Open Workbench, connect your Codex account, and verify your email. Place input files in <code>~/scRNA-agent-import</code>; projects and results are stored in the local VM.</li>
            </ol>
            <p>The app is ad-hoc signed, without Apple Developer ID signing or notarization. macOS Gatekeeper or institutional policies may block opening it. Warning-free installation is not guaranteed; do not disable security protections.</p>
          </div>
          <div className="release-card">
            <p className="eyebrow">Mac research beta</p><h3>Installer verification</h3>
            <dl className="release-details">
              <div><dt>Application version</dt><dd>{macRelease.version}</dd></div>
              <div><dt>Architecture</dt><dd>Apple Silicon (ARM64)</dd></div>
              <div><dt>Source commit</dt><dd><code>{macRelease.sourceCommit}</code></dd></div>
              <div><dt>Signing</dt><dd>Ad-hoc signed; not notarized</dd></div>
              <div><dt>Installer SHA-256</dt><dd><code>{macRelease.sha256}</code></dd></div>
            </dl>
            {macRelease.notesUrl && <p><a className="text-link" href={macRelease.notesUrl}>Release notes &amp; checksum file ↗</a></p>}
            <p className="caption">Automated ARM64 runtime and Mac packaging checks are separate from physical-Mac acceptance. Lima startup on a physical Mac, live Codex login and optional AUCell installation remain unverified.</p>
            <p className="caption">R/Python packages require Workbench approval and persist inside the managed guest environment. AUCell is optional, not preinstalled.</p>
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
