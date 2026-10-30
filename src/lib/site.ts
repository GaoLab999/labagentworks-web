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
// Keep disabled until final interactive Windows acceptance AND publication approval.
// The candidate checksum is supplied for review; it is not proof of acceptance.
export const release: {
  approved: boolean;
  url: string | null;
  sourceCommit: string;
  sha256: string;
} = {
  approved: false,
  url: null,
  sourceCommit: "e55d85e",
  sha256: "c166067f8fe0c1ad532c52e7e0770ec1f5e7a5f0b6e2ff6c1bce870bd9f9a541",
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
