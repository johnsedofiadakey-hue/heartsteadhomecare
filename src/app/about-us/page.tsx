import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactBand } from "@/components/ContactBand";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "About Us" };
export default async function AboutPage() {
  const site = await getSiteData();
  return <>
    <PageHero title="About Us" lead={site.about.lead} image={site.settings.familyImage} tone="cream"/>
    <section className="content-section container about-intro"><p className="eyebrow">About our company</p><h2>Care begins with understanding.</h2><p>{site.about.team}</p></section>
    <section className="content-section tinted"><div className="container two-col"><img className="section-photo" src={site.settings.caregiverImage} alt={site.settings.caregiverImageAlt}/><div><p className="eyebrow">Our caring team</p><h2>People at the heart of care</h2><p>{site.about.approach}</p><Link className="button-outline" href="/care-services">Explore Our Services</Link></div></div></section>
    <section className="content-section container two-col"><div><p className="eyebrow">Our purpose</p><h2>Our Mission</h2><p>{site.about.mission}</p><h2>Our Story</h2><p>{site.about.story}</p></div><div className="soft-card"><h3>Our office</h3><p>{site.settings.address}</p><p>Get to know how Heartstead can support a loved one at home.</p><Link className="button-outline" href="/contact">Get in Touch</Link></div></section>
    <section className="content-section about-values"><div className="container"><div className="center-heading"><h2>Why Choose Us</h2><p>A thoughtful approach to everyday support at home.</p></div><div className="benefit-grid"><div><span>♡</span><h3>Personalized Care</h3><p>Support discussed around the individual and the routines that matter.</p></div><div><span>⌂</span><h3>Care at Home</h3><p>Help in the familiar surroundings of home.</p></div><div><span>◷</span><h3>Flexible Options</h3><p>Explore the schedule and service that suits your family.</p></div><div><span>✦</span><h3>Clear Next Steps</h3><p>A conversation to understand needs before choosing care.</p></div></div></div></section>
    <section className="content-section container two-col"><div><p className="eyebrow">Our services</p><h2>Support for the way life happens</h2><p>Explore companionship, personal care, overnight support, and other home care options. We can help you discuss what kind of support might fit.</p><Link className="button-outline" href="/care-services">Learn More About Our Services</Link></div><img className="section-photo" src={site.settings.familyImage} alt={site.settings.familyImageAlt}/></section>
    <section className="about-note"><div className="container"><p className="eyebrow">A note from Heartstead</p><blockquote>“{site.about.note}”</blockquote><Link className="button-outline" href="/contact">Get Care for a Loved One</Link></div></section>
    <ContactBand site={site}/>
  </>;
}
