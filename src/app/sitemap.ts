import type { MetadataRoute } from "next";
import { getSiteData } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";
const pages = ["", "/about-us", "/care-services", "/service-area", "/payment-options", "/caregiver-jobs", "/caregiver-jobs/cases", "/caregiver-jobs/apply", "/testimonials", "/blog", "/contact", "/privacy-policy", "/terms-of-service"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteData();
  const now = new Date();
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: "monthly" as const, priority: path === "" ? 1 : path === "/contact" || path === "/care-services" ? 0.9 : 0.6 })),
    ...site.services.map((service) => ({ url: `${SITE_URL}/care-services/${service.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...site.posts.filter((post) => post.published).map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
