import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteData } from "@/lib/content";
import "./globals.css";
import "./site.css";

export const metadata: Metadata = {
  title: { default: "Heartstead Home Care", template: "%s | Heartstead Home Care" },
  description: "Compassionate home care in Skillman, New Jersey.",
  robots: process.env.SITE_READY_FOR_INDEXING === "true" ? { index: true, follow: true } : { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteData();
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/></head><body><SiteHeader settings={site.settings} services={site.services}/><main id="main">{children}</main><SiteFooter settings={site.settings}/></body></html>;
}
