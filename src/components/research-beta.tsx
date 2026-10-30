import { Section } from "@/components/ui";

export function TrialDetails() {
  return (
    <div className="split">
      <div>
        <h3>Seven days to explore your data.</h3>
        <p>Free seven-day research evaluation after email verification, with one trial per new account. Full scientific functionality is available during the admitted trial session.</p>
        <p>Register your email and enter the verification code inside the installed scRNA-agent Workbench. No payment or credit card is required, and no paid plans are offered.</p>
      </div>
      <div>
        <h3>Your project files are preserved.</h3>
        <p>Scientific data and outputs remain on your computer. When the trial expires, new Workbench access requires authorization; existing project files are preserved.</p>
        <p>Internet access is required for account authentication and Codex-related services. Connect and authenticate your own Codex access; provider access requirements are separate from this free beta.</p>
      </div>
    </div>
  );
}

const examples = [
  ["01", "Annotated UMAP", "Explore cell populations and review cell-type annotations."],
  ["02", "Markers & heatmaps", "Examine marker expression to support annotation decisions."],
  ["03", "Differential expression", "Compare groups and inspect volcano plots in the context of your study."],
  ["04", "Pathway enrichment", "Investigate gene sets with GSEA enrichment figures."],
  ["05", "Interactive Workbench", "Ask follow-up questions and revisit analysis choices with Codex."],
  ["06", "Reusable scientific outputs", "Keep figures, reports and annotated datasets with your project."],
];

export function ResultsPreview() {
  return (
    <Section id="results" eyebrow="Scientific capabilities" title="A dataset is the beginning of the investigation." description="From cell identity to biological comparisons, build a scientific record you can review and reuse." className="tinted">
      <p className="preview-disclosure">Screenshot previews are being prepared. The spaces below are placeholders, not scientific results.</p>
      <div className="three-grid results-grid">
        {examples.map(([number, title, description]) => (
          <article className="result-card" key={title}>
            <div className="result-placeholder" aria-label={`${title}: screenshot placeholder`}>
              <span className="result-number" aria-hidden="true">{number}</span>
              <span className="placeholder-label">Verified example forthcoming</span>
            </div>
            <div className="result-copy"><h3>{title}</h3><p>{description}</p></div>
          </article>
        ))}
      </div>
      <p className="caption">Scientific results require researcher review. Method selection and interpretation depend on the dataset and study design.</p>
    </Section>
  );
}

// Replace a card with a reviewed video only when an approved asset is available.
// No players, remote embeds, requests, or video dependencies are loaded here.
export function DemoPreview() {
  return (
    <Section id="demonstrations" eyebrow="Coming later" title="Short guides, from setup to discovery." description="Demonstration videos are planned. No videos are available yet.">
      <div className="demo-grid">
        {["Installation and initial setup", "From scRNA-seq data to annotated cells", "Asking new biological questions after AutoRun", "DE, GSEA and scientific plotting"].map((title, index) => (
          <article className="demo-card" key={title}>
            <span className="feature-index">0{index + 1}</span>
            <h3>{title}</h3><p className="caption">Video forthcoming</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
