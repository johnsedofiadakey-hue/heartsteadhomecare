import { CareInquiryForm } from "@/components/CareInquiryForm";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Contact" };
export default async function ContactPage() {
  const site = await getSiteData();
  return <>
    <section className="contact-page-hero"><div className="container contact-page-grid"><div><h1>Contact</h1><p>{site.pages.contactLead}</p><p>{site.pages.contactFollowUp}</p><CareInquiryForm services={site.services} phone={site.settings.phone} contactMode/></div><aside><div className="contact-aside"><h3>Want to talk now?</h3><p>Give us a call today.</p><a className="button" href={`tel:${site.settings.phone.replace(/\D/g, "")}`}>{site.settings.phone}</a></div></aside></div></section>
    <section className="content-section container"><div className="center-heading"><h2>Visit Our Office</h2><p>One location, one team to contact.</p></div><div className="office-card"><div><h3>Heartstead Home Care</h3><p>{site.settings.address}</p><a href={`tel:${site.settings.phone.replace(/\D/g, "")}`}>{site.settings.phone}</a><a href={`mailto:${site.settings.publicEmail}`}>{site.settings.publicEmail}</a></div><a className="button-outline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.settings.address)}`} target="_blank" rel="noopener noreferrer">Get Directions ↗</a></div></section>
  </>;
}
