"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import type { Service, SiteData } from "@/lib/site-data";

export function SiteHeader({ settings, services }: { settings: SiteData["settings"]; services: Service[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const featured = services.filter((item) => item.featured).slice(0, 8);
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <div className="utility-bar"><div className="container utility-inner"><span>To Get Care Today, Call: <a href={`tel:${settings.phone.replace(/\D/g, "")}`}>{settings.phone}</a></span><div><Link href="/contact">Contact</Link><Link href="/blog">Our Blog</Link></div></div></div>
    <header className="main-header"><div className="container nav-inner">
      <Link className="brand" href="/" aria-label={`${settings.brandName} home`} onClick={() => setMenuOpen(false)}><img src="/images/logo-transparent.png" alt={settings.brandName}/></Link>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25}/> : <Menu size={25}/>}</button>
      <nav id="site-nav" className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        <Link href="/payment-options" onClick={() => setMenuOpen(false)}>Payment Options</Link>
        <Link href="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
        <Link href="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link>
        <div className="nav-dropdown"><Link href="/care-services" onClick={() => setMenuOpen(false)}>Care Services <ChevronDown size={15} aria-hidden="true"/></Link><div className="dropdown-panel"><Link href="/care-services" onClick={() => setMenuOpen(false)}>All Care Services</Link>{featured.map((item) => <Link key={item.slug} href={`/care-services/${item.slug}`} onClick={() => setMenuOpen(false)}>{item.title}</Link>)}</div></div>
        <Link href="/service-area" onClick={() => setMenuOpen(false)}>Service Area</Link>
        <Link href="/caregiver-jobs" onClick={() => setMenuOpen(false)}>Caregiver Jobs</Link>
        <Link className="button button-small" href="/contact" onClick={() => setMenuOpen(false)}>Get Care</Link>
      </nav>
    </div></header>
  </>;
}
