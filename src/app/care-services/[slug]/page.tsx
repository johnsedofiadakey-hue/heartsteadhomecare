import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactBand } from "@/components/ContactBand";
import { getSiteData } from "@/lib/content";
import { defaultSite } from "@/lib/site-data";

export const dynamic = "force-dynamic";
export function generateStaticParams() { return defaultSite.services.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getSiteData()).services.find((item) => item.slug === slug);
  if (!service) return { title: "Care Service" };
  // Keep the inherited preview image; only the text changes per service.
  const { openGraph, twitter } = await parent;
  return { title: service.title, description: service.summary, openGraph: { ...openGraph, description: service.summary }, twitter: { ...twitter, description: service.summary } };
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getSiteData();
  const item = site.services.find((service) => service.slug === slug);
  if (!item) notFound();
  const related = site.services.filter((service) => service.slug !== slug && service.category === item.category).slice(0, 3);
  return <>
    <PageHero title={item.title} lead={item.summary} image={item.image}/>
    <section className="content-section container two-col"><div><p className="eyebrow">Care at home</p><h2>What Is {item.title}?</h2><p>{item.intro}</p><p>Every person’s situation is different. Our team can talk through the practical support needed, the schedule that may work, and the next steps for your family.</p><Link className="button-outline" href="/contact">Ask About {item.title}</Link></div><div className="soft-card"><h3>Let’s plan the right support</h3><p>Tell us what daily life looks like and where help would make a difference.</p><a className="button" href={`tel:${site.settings.phone.replace(/\D/g, "")}`}>Call {site.settings.phone}</a></div></section>
    <section className="content-section tinted"><div className="container"><div className="center-heading"><h2>How Care Starts</h2></div><div className="steps-grid"><div><strong>01</strong><h3>Talk with us</h3><p>Tell us about your loved one and your questions.</p></div><div><strong>02</strong><h3>Explore a plan</h3><p>Discuss the type and timing of support.</p></div><div><strong>03</strong><h3>Begin with confidence</h3><p>Agree on the next steps before care begins.</p></div></div></div></section>
    {related.length > 0 && <section className="content-section container"><div className="center-heading"><h2>Explore Related Care</h2></div><div className="services-grid">{related.map((service) => <Link className="service-card" href={`/care-services/${service.slug}`} key={service.slug}><span className="service-icon">♡</span><h3>{service.title}</h3><p>{service.summary}</p><span className="text-link">Learn More ›</span></Link>)}</div></section>}
    <ContactBand site={site}/>
  </>;
}
