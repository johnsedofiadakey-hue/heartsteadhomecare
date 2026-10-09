import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteData } from "@/lib/content";
import type { SiteData } from "@/lib/site-data";
import { SITE_URL, indexingEnabled, requestOrigin } from "@/lib/site-url";
import "./globals.css";
import "./site.css";

const description = "Compassionate live-in and hourly home care in Skillman, New Jersey, serving Montgomery Township and surrounding Somerset and Mercer County communities.";

// Link-preview titles fall back to each page's <title>, so only shared fields are set here.
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(await requestOrigin()),
    title: { default: "Heartstead Home Care | Home Care in Skillman, NJ", template: "%s | Heartstead Home Care" },
    description,
    applicationName: "Heartstead Home Care",
    openGraph: { type: "website", siteName: "Heartstead Home Care", locale: "en_US", description },
    twitter: { card: "summary_large_image", description },
    robots: indexingEnabled() ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = { themeColor: "#4A1E02", width: "device-width", initialScale: 1 };
export const dynamic = "force-dynamic";

function businessSchema(settings: SiteData["settings"]) {
  const match = settings.address.match(/^(.*),\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})$/);
  const address = match
    ? { "@type": "PostalAddress", streetAddress: match[1], addressLocality: match[2], addressRegion: match[3], postalCode: match[4], addressCountry: "US" }
    : settings.address;
  const digits = settings.phone.replace(/\D/g, "").slice(-10);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: settings.brandName,
    slogan: settings.tagline,
    description,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-transparent.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    telephone: digits.length === 10 ? `+1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}` : settings.phone,
    email: settings.publicEmail,
    address,
    areaServed: ["Skillman, NJ", "Montgomery Township, NJ", "Somerset County, NJ", "Mercer County, NJ"].map((name) => ({ "@type": "Place", name })),
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteData();
  const schema = JSON.stringify(businessSchema(site.settings)).replace(/</g, "\\u003c");
  return <html lang="en-US"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }}/></head><body><SiteHeader settings={site.settings} services={site.services}/><main id="main">{children}</main><SiteFooter settings={site.settings}/></body></html>;
}
