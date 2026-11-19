import { Hero, Section, Badge } from "@/components/ui";
import { NIHDownload } from "@/components/nih-download";
import { metadata } from "@/lib/site";
const description = "An AI-assisted Windows application for discovering, downloading, verifying, and organizing public next-generation sequencing datasets from NCBI GEO, SRA, and ENA. Features a conversational Workbench, sample selection, resumable downloads, and automated file verification.";
export const generateMetadata = () => metadata("NIH Download Agent", description, "/products/nih-download-agent/");
export default function NIHDownloadAgent() {
  return <>
    <Hero eyebrow="NIH Download Agent" title="Public sequencing data. Ready for your research." description={description}>
      <Badge>Private Beta · v0.2.0-beta.1 · Windows x64</Badge>
    </Hero>
    <Section title="Download NIH Download Agent" className="tinted">
      <p>This beta has been tested on Windows and remains under validation. The installer is currently unsigned; Windows may display a publisher warning.</p>
      <p>Access is available with a password from the beta owner. No account is required.</p>
      <div className="button-row"><NIHDownload /></div>
      <p>Installer: NIH-Download-Agent-Setup.exe</p>
      <p>Expected SHA256:</p>
      <code className="nih-checksum">229120f30b6906b0f5e0dbd1c1a01368f689ef334f6bce90e32e9f9d87fa080b</code>
      <p>After downloading, check the file in PowerShell:</p>
      <code className="nih-checksum">Get-FileHash .\NIH-Download-Agent-Setup.exe -Algorithm SHA256</code>
      <p><a href="https://github.com/GaoLab999/nih-download-agent/releases/tag/v0.2.0-beta.1">Source release v0.2.0-beta.1</a> (requires access to the private GitHub repository).</p>
    </Section>
  </>;
}
