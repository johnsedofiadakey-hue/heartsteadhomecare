import { AdminApp } from "@/components/AdminApp";
import { getSiteData } from "@/lib/content";
import { firebaseConfigured } from "@/lib/firebase-admin";
import "./admin.css";

export const metadata = { title: "Website Admin", robots: { index: false, follow: false } };
export default async function AdminPage() {
  const site = await getSiteData();
  return <div className="admin-page"><AdminApp initialSite={site} configured={firebaseConfigured() && Boolean(process.env.FIREBASE_OWNER_UID)}/></div>;
}
