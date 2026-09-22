import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/products",
    "/products/scrna-agent",
    "/how-it-works",
    "/privacy",
    "/pricing",
    "/download",
    "/docs",
    "/contact",
  ].map((path) => ({ url: `${site.url}${path}/` }));
}
