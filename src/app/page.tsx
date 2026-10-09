import Link from "next/link";
import { Paragraphs } from "@/components/Paragraphs";
import { ContactBand } from "@/components/ContactBand";
import { getSiteData } from "@/lib/content";

export default async function HomePage() {
  const site = await getSiteData();
  const { settings, home } = site;
  const featured = site.services.filter((item) => item.featured).slice(0, 4);
  return <>
    <section className="hero"><div className="container hero-inner"><h1>{home.heroTitle}</h1><Link className="button button-large" href="/contact">Get Care Now</Link><p className="hero-phone">or call us at <a href={`tel:${settings.phone.replace(/\D/g, "")}`}>{settings.phone}</a></p><p className="hero-line">{settings.tagline}</p></div></section>
    <section className="hero-banner container"><img src={settings.heroImage} alt={settings.heroImageAlt}/></section>
    <section className="intro intro-full section container"><div className="intro-copy"><h2>{home.introTitle}</h2><Paragraphs text={home.introText}/><Link className="button-outline" href="/about-us">Learn More About Us</Link></div></section>
    <section className="editorial section container"><div className="editorial-image"><img src={settings.familyImage} alt={settings.familyImageAlt}/></div><div className="editorial-copy"><h2>{home.careTitle}</h2><p>{home.careText}</p><Link className="button-outline" href="/care-services">Our Services</Link></div></section>
    <section className="editorial section container reverse"><div className="editorial-image"><img src={settings.caregiverImage} alt={settings.caregiverImageAlt}/></div><div className="editorial-copy"><h2>{home.teamTitle}</h2><p>{home.teamText}</p><Link className="button-outline" href="/caregiver-jobs">Learn About Caregiver Jobs</Link></div></section>
    <section className="service-preview"><div className="container"><div className="center-heading"><p className="eyebrow">Care for every situation</p><h2>{home.serviceTitle}</h2><p>{home.serviceText}</p></div><div className="services-grid">{featured.map((item, index) => <Link className="service-card" href={`/care-services/${item.slug}`} key={item.slug}><span className="service-icon" aria-hidden="true">{["⌂", "◷", "☾", "♡"][index]}</span><h3>{item.title}</h3><p>{item.summary}</p><span className="text-link">Learn More ›</span></Link>)}</div><div className="center-link"><Link className="button-outline" href="/care-services">View All Care Services</Link></div></div></section>
    <ContactBand site={site}/>
    <section className="founder-placeholder container"><p className="eyebrow">The Heartstead promise</p><h2>{home.promiseTitle}</h2><p>{home.promiseText}</p></section>
    <section className="benefits container"><div className="center-heading"><h2>{home.benefitsTitle}</h2></div><div className="benefit-grid"><div><span>♡</span><h3>{home.benefit1Title}</h3><p>{home.benefit1Text}</p></div><div><span>⌂</span><h3>{home.benefit2Title}</h3><p>{home.benefit2Text}</p></div><div><span>◷</span><h3>{home.benefit3Title}</h3><p>{home.benefit3Text}</p></div><div><span>✦</span><h3>{home.benefit4Title}</h3><p>{home.benefit4Text}</p></div></div><div className="center-link"><Link className="button-outline" href="/about-us">Learn More About Heartstead</Link></div></section>
    {site.testimonials.some((item) => item.published) && <section className="testimonial-highlight"><div className="container"><h2>What Families Are Saying</h2><blockquote>“{site.testimonials.find((item) => item.published)?.quote}”</blockquote><p>— {site.testimonials.find((item) => item.published)?.name}</p><Link className="button-outline" href="/testimonials">See All Testimonials</Link></div></section>}
  </>;
}
