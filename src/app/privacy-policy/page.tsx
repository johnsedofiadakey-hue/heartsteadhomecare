import { getSiteData } from "@/lib/content";

export const metadata = { title: "Privacy Policy" };
export default async function PrivacyPage() {
  const site = await getSiteData();
  return <section className="content-section container legal-page"><h1>Privacy Policy</h1><p>{site.pages.privacyPolicy}</p><p>Questions about this policy can be sent to <a href={`mailto:${site.settings.publicEmail}`}>{site.settings.publicEmail}</a>.</p></section>;
}
