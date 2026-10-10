import Link from "next/link";
import { Paragraphs } from "@/components/Paragraphs";
import { ContactBand } from "@/components/ContactBand";
import { getSiteData } from "@/lib/content";

export default async function HomePage() {
  const site = await getSiteData();
  const { settings, home } = site;
  const featured = site.services.filter((item) => item.featured).slice(0, 4);
  return <>
    <section className="hero hero-cover">
      <div className="hero-cover-media">
        <img className="hero-cover-desktop" src={settings.heroCoverImage} alt={settings.heroCoverImageAlt} fetchPriority="high"/>
        <img className="hero-cover-mobile" src={settings.heroMobileImage} alt={settings.heroMobileImageAlt} fetchPriority="high"/>
      </div>
      <div className="hero-cover-shade" aria-hidden="true"/>
      <div className="container hero-cover-content">
        <p className="hero-kicker">Heartstead Home Care <span aria-hidden="true">✦</span> Skillman, New Jersey</p>
        <h1>{home.heroTitle}</h1>
        <p className="hero-line">{settings.tagline}</p>
        <div className="hero-actions">
          <Link className="button button-large" href="/contact">Get Care Now <span aria-hidden="true">↗</span></Link>
          <a className="button-outline hero-call" href={`tel:${settings.phone.replace(/\D/g, "")}`}>Call {settings.phone}</a>
        </div>
      </div>
      <div className="container hero-cover-bottom">
        <div className="hero-motion" aria-hidden="true">
          <svg viewBox="0 0 180 180" fill="none">
            <circle className="hero-motion-ring" cx="90" cy="90" r="70"/>
            <circle className="hero-motion-inner-ring" cx="90" cy="90" r="59"/>
            <circle className="hero-motion-dot" cx="90" cy="20" r="4"/>
            <path className="hero-motion-home" pathLength="1" d="M53 83 90 51l37 32M62 76v48h56V76"/>
            <path className="hero-motion-heart" pathLength="1" d="M90 112c-10-8-19-15-19-25 0-8 10-13 19-4 9-9 19-4 19 4 0 10-9 17-19 25Z"/>
          </svg>
        </div>
        <a className="hero-scroll" href="#why-heartstead">Discover our approach <span aria-hidden="true">↓</span></a>
      </div>
    </section>
    <section id="why-heartstead" className="intro intro-full section container" data-reveal><div className="intro-copy"><p className="eyebrow">The Heartstead approach</p><h2>{home.introTitle}</h2><Paragraphs text={home.introText}/><Link className="button-outline" href="/about-us">Learn More About Us <span aria-hidden="true">↗</span></Link></div></section>
    <section className="editorial section container" data-reveal><div className="editorial-image"><img src={settings.familyImage} alt={settings.familyImageAlt}/></div><div className="editorial-copy"><p className="eyebrow">Care, centered on you</p><h2>{home.careTitle}</h2><p>{home.careText}</p><Link className="button-outline" href="/care-services">Our Services <span aria-hidden="true">↗</span></Link></div></section>
    <section className="editorial section container reverse" data-reveal><div className="editorial-image"><img src={settings.caregiverImage} alt={settings.caregiverImageAlt}/></div><div className="editorial-copy"><p className="eyebrow">People make the difference</p><h2>{home.teamTitle}</h2><p>{home.teamText}</p><Link className="button-outline" href="/caregiver-jobs">Learn About Caregiver Jobs <span aria-hidden="true">↗</span></Link></div></section>
    <section className="service-preview"><div className="container"><div className="center-heading"><p className="eyebrow">Care for every situation</p><h2>{home.serviceTitle}</h2><p>{home.serviceText}</p></div><div className="services-grid">{featured.map((item, index) => <Link className="service-card" href={`/care-services/${item.slug}`} key={item.slug}><span className="service-icon" aria-hidden="true">{["⌂", "◷", "☾", "♡"][index]}</span><h3>{item.title}</h3><p>{item.summary}</p><span className="text-link">Learn More ›</span></Link>)}</div><div className="center-link"><Link className="button-outline" href="/care-services">View All Care Services</Link></div></div></section>
    <ContactBand site={site}/>
    <section className="founder-placeholder container"><p className="eyebrow">The Heartstead promise</p><h2>{home.promiseTitle}</h2><p>{home.promiseText}</p></section>
    <section className="benefits container"><div className="center-heading"><h2>{home.benefitsTitle}</h2></div><div className="benefit-grid"><div><span>♡</span><h3>{home.benefit1Title}</h3><p>{home.benefit1Text}</p></div><div><span>⌂</span><h3>{home.benefit2Title}</h3><p>{home.benefit2Text}</p></div><div><span>◷</span><h3>{home.benefit3Title}</h3><p>{home.benefit3Text}</p></div><div><span>✦</span><h3>{home.benefit4Title}</h3><p>{home.benefit4Text}</p></div></div><div className="center-link"><Link className="button-outline" href="/about-us">Learn More About Heartstead</Link></div></section>
    {site.testimonials.some((item) => item.published) && <section className="testimonial-highlight"><div className="container"><h2>What Families Are Saying</h2><blockquote>“{site.testimonials.find((item) => item.published)?.quote}”</blockquote><p>— {site.testimonials.find((item) => item.published)?.name}</p><Link className="button-outline" href="/testimonials">See All Testimonials</Link></div></section>}
  </>;
}
