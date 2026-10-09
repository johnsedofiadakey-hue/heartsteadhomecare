import type { MetadataRoute } from "next";
import { SITE_URL, indexingEnabled } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled()) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
