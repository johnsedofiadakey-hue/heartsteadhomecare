import Link from "next/link";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Request Time Off" };
export default async function TimeOffPage() {
  const site = await getSiteData();
  return <section className="content-section container listing-page"><div className="center-heading"><h1>Request Time Off</h1><p>Contact the Heartstead office to discuss a time-off request.</p></div><div className="office-card single"><div><h2>Heartstead Home Care</h2><p>{site.settings.address}</p><p>For privacy, schedule requests are handled directly with the office.</p><a href={`tel:${site.settings.phone.replace(/\D/g, "")}`}>{site.settings.phone}</a><a href={`mailto:${site.settings.publicEmail}?subject=Time%20Off%20Request`}>{site.settings.publicEmail}</a></div><Link className="button-outline" href="/caregiver-jobs">Back to Caregiver Jobs</Link></div></section>;
}
