import Image from "next/image";

// Product identity only. Keep the approved artwork unchanged and pair it with
// visible scRNA-agent text; the umbrella brand uses its own text-based identity.
export function ScRNAAgentLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      className={`scrna-agent-logo${compact ? " scrna-agent-logo-compact" : ""}`}
      src="/products/scrna-agent-logo.png"
      width={1254}
      height={1254}
      alt=""
      unoptimized
    />
  );
}
