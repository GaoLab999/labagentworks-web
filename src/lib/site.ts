import type { Metadata } from "next";
export const site = {
  name: "Lab Agent Works",
  url: "https://labagentworks.com",
  email: "support@labagentworks.com",
};
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: ["/og-image.png"] },
  };
}
// Public distribution approved; automated build checks passed.
// Interactive Windows/WSL qualification remains pending (see download page).
// Keep version/checksum and the versioned asset together when publishing updates.
export const release = {
  approved: true,
  version: "0.3.0-beta.1",
  runtimeVersion: "0.1.0-alpha.3",
  url: "https://github.com/GaoLab999/labagentworks-web/releases/download/scrna-agent-windows-0.3.0-beta.1-9ef73fb/scRNA-agent-Setup.exe",
  versionedUrl: "https://github.com/GaoLab999/labagentworks-web/releases/download/scrna-agent-windows-0.3.0-beta.1-9ef73fb/scrna-agent-setup-0.3.0-beta.1.exe",
  notesUrl: "https://github.com/GaoLab999/labagentworks-web/releases/tag/scrna-agent-windows-0.3.0-beta.1-9ef73fb",
  sourceCommit: "9ef73fb33dfe0f14245d378588cf3ec483d3c9f4",
  sha256: "4cf3c42eef954d5eef29b77633626fe402b4944c595c24ab6bdc4f25bc796656",
};
// Verified against the Actions artifact and an anonymous public download.
// Mac remains a prerelease; preserve the Windows latest-release alias when publishing.
export const macRelease = {
  approved: true,
  version: "0.3.0-beta.1",
  url: "https://github.com/GaoLab999/labagentworks-web/releases/download/scrna-agent-macos-0.3.0-beta.1/scRNA-agent-macos-arm64.dmg",
  notesUrl: "https://github.com/GaoLab999/labagentworks-web/releases/tag/scrna-agent-macos-0.3.0-beta.1",
  sourceCommit: "7b0fec72c8f029327fa016f7eafcbca2acf58680",
  sha256: "b4067adf5cc62ab849400f76b9453971ff89edf36457384025db728b82643b7e",
};
export const features = [
  [
    "AutoRun & Guided Run",
    "Generate an initial annotated dataset automatically, or work through analysis with researcher oversight.",
  ],
  [
    "Local R / Python execution",
    "Run scientific tools in local environments, close to your data.",
  ],
  [
    "Interactive exploration with Codex",
    "Ask new biological questions, revise earlier decisions and continue analyzing your annotated dataset.",
  ],
  [
    "Differential expression & enrichment",
    "Investigate biological comparisons with differential expression, pathway enrichment and GSEA.",
  ],
  [
    "Reproducible figures and reports",
    "Keep generated figures and reports connected to the analysis that produced them.",
  ],
  [
    "Reusable annotated datasets",
    "Keep annotated datasets, figures and reports available for further investigation.",
  ],
  [
    "Protected scientific skills",
    "Access specialized analysis skills through the protected Core service.",
  ],
  [
    "Traceable project outputs",
    "Retain analysis artifacts, parameters, and provenance in your project.",
  ],
  [
    "Local-first data handling",
    "Keep raw matrices and project files under your control.",
  ],
  [
    "Maintained workflow improvements",
    "Benefit from developer-maintained guidance and reusable analysis experience.",
  ],
];
