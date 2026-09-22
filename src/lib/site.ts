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
// Populate only when a signed, verified public release is ready.
export const release: {
  url: string | null;
  version: string | null;
  date: string | null;
  sha256: string | null;
  notesUrl: string | null;
} = { url: null, version: null, date: null, sha256: null, notesUrl: null };
export const features = [
  [
    "Guided analysis workflow",
    "Move from a biological question to a structured analysis, with decisions you can review.",
  ],
  [
    "Local R / Python execution",
    "Run scientific tools in local environments, close to your data.",
  ],
  [
    "Project-aware AI assistance",
    "Work with an agent that uses your project context to support the next step.",
  ],
  [
    "Reference-resource handling",
    "Acquire supported reference resources automatically when an analysis needs them.",
  ],
  [
    "Reproducible figures and reports",
    "Keep generated figures and reports connected to the analysis that produced them.",
  ],
  [
    "Versioned analysis guidance",
    "Use maintained guidance with versions that can be traced across your work.",
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
