import "server-only";
import { adminDb } from "@/lib/firebase-admin";
import { defaultSite, type SiteData } from "@/lib/site-data";

export async function getSiteData(): Promise<SiteData> {
  const db = adminDb();
  if (!db) return defaultSite;
  try {
    const snapshot = await db.doc("site/published").get();
    return snapshot.exists ? normalizeSite(snapshot.data() as Partial<SiteData>) : defaultSite;
  } catch (error) {
    // Keep the public site up with seeded content if Firestore is unreachable or not yet provisioned.
    console.error("Failed to load published site content; using defaults.", error);
    return defaultSite;
  }
}

export async function getDraftData(): Promise<SiteData> {
  const db = adminDb();
  if (!db) return defaultSite;
  const draft = await db.doc("site/draft").get();
  if (draft.exists) return normalizeSite(draft.data() as Partial<SiteData>);
  return getSiteData();
}

function normalizeSite(saved: Partial<SiteData>): SiteData {
  const settings = { ...defaultSite.settings, ...saved.settings };
  settings.address = settings.address.replace(/,\s*NJ(?=\s+\d{5}(?:-\d{4})?$)/i, ", New Jersey");
  return { ...defaultSite, ...saved, settings, home: { ...defaultSite.home, ...saved.home }, about: { ...defaultSite.about, ...saved.about }, pages: { ...defaultSite.pages, ...saved.pages }, services: saved.services ?? defaultSite.services, jobs: saved.jobs ?? defaultSite.jobs, testimonials: saved.testimonials ?? defaultSite.testimonials, posts: saved.posts ?? defaultSite.posts };
}
