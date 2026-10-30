import { Hero, Section, Button } from "@/components/ui";
import { TrialDetails } from "@/components/research-beta";
import { metadata } from "@/lib/site";
export const generateMetadata = () => metadata("Free research beta", "Free seven-day research evaluation after email verification. No payment or credit card required.", "/pricing/");
// Retain the existing URL for old bookmarks; no pricing or purchasing flow.
export default function Page() {
  return <>
    <Hero eyebrow="scRNA-agent / Research evaluation" title="Free 7-day research beta" description="Email registration required — no credit card needed. Register inside the installed Workbench when the approved Windows installer becomes available." />
    <Section className="tinted"><TrialDetails /><Button href="/download">Windows research beta & setup</Button></Section>
  </>;
}
