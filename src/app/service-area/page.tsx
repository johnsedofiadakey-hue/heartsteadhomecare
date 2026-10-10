import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Service Area" };
export default async function ServiceAreaPage() {
  const site = await getSiteData();
  return <><section className="simple-hero"><div className="container"><h1>Our Service Area</h1><p>{site.pages.serviceAreaLead}</p></div></section><section className="content-section container two-col"><div><p className="eyebrow">One office, personal service</p><h2>Care close to home</h2><p>Heartstead Home Care is based at {site.settings.address}. Contact our team to confirm availability at your ZIP code.</p><p>{site.settings.serviceArea}</p><Link className="button" href="/contact">Ask About Care in Your Area</Link></div><div className="soft-card"><h3>Visit or call</h3><p>{site.settings.address}</p><a href={`tel:${site.settings.phone.replace(/\D/g, "")}`}>{site.settings.phone}</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.settings.address)}`} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8}/></a></div></section></>;
}
