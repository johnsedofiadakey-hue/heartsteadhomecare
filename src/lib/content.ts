import "server-only";
import { adminDb } from "@/lib/firebase-admin";
import { defaultSite, type SiteData } from "@/lib/site-data";

export async function getSiteData(): Promise<SiteData> {
  const db = adminDb();
  if (!db) return defaultSite;
  const snapshot = await db.doc("site/published").get();
  return snapshot.exists ? normalizeSite(snapshot.data() as Partial<SiteData>) : defaultSite;
}

export async function getDraftData(): Promise<SiteData> {
  const db = adminDb();
  if (!db) return defaultSite;
  const draft = await db.doc("site/draft").get();
  if (draft.exists) return normalizeSite(draft.data() as Partial<SiteData>);
  return getSiteData();
}

function normalizeSite(saved: Partial<SiteData>): SiteData {
  return { ...defaultSite, ...saved, settings: { ...defaultSite.settings, ...saved.settings }, home: { ...defaultSite.home, ...saved.home }, about: { ...defaultSite.about, ...saved.about }, pages: { ...defaultSite.pages, ...saved.pages }, services: saved.services ?? defaultSite.services, jobs: saved.jobs ?? defaultSite.jobs, testimonials: saved.testimonials ?? defaultSite.testimonials, posts: saved.posts ?? defaultSite.posts };
}
