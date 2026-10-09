/** Public address of the live site. Used for canonical links, the sitemap and link previews. */
export const SITE_URL = (process.env.SITE_URL || "https://heartsteadhomecarenj.com").replace(/\/$/, "");
export const indexingEnabled = () => process.env.SITE_READY_FOR_INDEXING === "true";
