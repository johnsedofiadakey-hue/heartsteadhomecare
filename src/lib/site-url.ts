import { headers } from "next/headers";

/** Public address of the live site. Used for canonical links, the sitemap and structured data. */
export const SITE_URL = (process.env.SITE_URL || "https://heartsteadhomecarenj.com").replace(/\/$/, "");
export const indexingEnabled = () => process.env.SITE_READY_FOR_INDEXING === "true";

const allowedHost = /^(?:(?:www\.)?heartsteadhomecarenj\.com|[a-z0-9-]+--heartsteadhomecare-27e56\.[a-z0-9-]+\.hosted\.app|localhost(?::\d+)?)$/;

/**
 * Origin the visitor (or link-preview crawler) actually requested, so preview images are fetched
 * from an address that works. Falls back to SITE_URL for anything not on the allowlist.
 */
export async function requestOrigin() {
  const list = await headers();
  const host = (list.get("x-forwarded-host") ?? list.get("host") ?? "").split(",")[0].trim().toLowerCase();
  if (!allowedHost.test(host)) return SITE_URL;
  return `${host.startsWith("localhost") ? "http" : "https"}://${host}`;
}
