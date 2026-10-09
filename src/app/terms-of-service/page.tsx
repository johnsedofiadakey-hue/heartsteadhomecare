import { getSiteData } from "@/lib/content";

export const metadata = { title: "Terms of Service" };
export default async function TermsPage() {
  const site = await getSiteData();
  return <section className="content-section container legal-page"><h1>Terms of Service</h1><p>{site.pages.termsOfService}</p><p>For questions, contact <a href={`mailto:${site.settings.publicEmail}`}>{site.settings.publicEmail}</a>.</p></section>;
}
