import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactBand } from "@/components/ContactBand";
import { getSiteData } from "@/lib/content";
import type { Service } from "@/lib/site-data";

export const metadata = { title: "Care Services" };
export default async function ServicesPage() {
  const site = await getSiteData();
  const categories: Service["category"][] = ["Care schedules", "Everyday support", "Specialized care", "Care guides"];
  return <>
    <PageHero title="Care Services" lead={site.pages.servicesLead} image={site.settings.heroImage}/>
    <section className="content-section container"><div className="center-heading"><h2>Care Designed to Match Our Clients’ Needs</h2></div>{categories.map((category) => <div className="service-group" key={category}><h3>{category}</h3><div className="services-grid">{site.services.filter((item) => item.category === category).map((item) => <Link className="service-card" href={`/care-services/${item.slug}`} key={item.slug}><span className="service-icon" aria-hidden="true">♡</span><h3>{item.title} ›</h3><p>{item.summary}</p></Link>)}</div></div>)}</section>
    <section className="mini-cta"><div className="container"><h2>Have questions or need care today?</h2><p>Reach out to Heartstead Home Care.</p><Link className="button" href="/contact">Get Started</Link></div></section>
    <ContactBand site={site}/>
  </>;
}
