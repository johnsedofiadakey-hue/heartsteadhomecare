import Link from "next/link";
import { CareInquiryForm } from "@/components/CareInquiryForm";
import type { SiteData } from "@/lib/site-data";

export function ContactBand({ site }: { site: SiteData }) {
  const { settings } = site;
  return <section className="form-band"><div className="container"><div className="form-band-heading"><h2>Get Started with {settings.brandName}</h2><p>Complete the form below and our team will get back to you to set up a time to talk about working together.</p></div><div className="form-band-grid"><CareInquiryForm services={site.services} phone={settings.phone}/><aside><div className="contact-aside"><h3>Want to talk now?</h3><p>Give us a call today.</p><a className="button" href={`tel:${settings.phone.replace(/\D/g, "")}`}>{settings.phone}</a></div><div className="contact-aside"><h3>Payment Methods for Home Care</h3><p>Explore the options available for your care plan.</p><Link className="button" href="/payment-options">Payment Options</Link></div></aside></div></div></section>;
}
