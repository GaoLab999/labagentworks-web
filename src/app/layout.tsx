import type { Metadata } from "next";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/ui";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://labagentworks.com"),
  title: {
    default: "Lab Agent Works — scRNA-agent Research Beta",
    template: "%s | Lab Agent Works",
  },
  description:
    "From single-cell data to biological insight with scRNA-agent. Local scientific computation, interactive exploration and a free seven-day research beta.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Lab Agent Works",
    title: "Lab Agent Works — scRNA-agent Research Beta",
    description:
      "Researcher-directed analysis. Local scientific computation. Specialized guidance.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
