import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Paragraphs } from "@/components/Paragraphs";
import { ContactBand } from "@/components/ContactBand";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Payment Options" };
export default async function PaymentPage() {
  const site = await getSiteData();
  return <>
    <PageHero title="Payment Options" lead={site.pages.paymentLead} image={site.settings.paymentImage} tone="cream"/>
    <section className="content-section container two-col"><div><p className="eyebrow">Planning care together</p><h2>Let's Talk About Your Options</h2><Paragraphs text={site.pages.paymentIntro}/><p>{site.pages.paymentHowWeHelp}</p><a className="button-outline" href={`tel:${site.settings.phone.replace(/\D/g, "")}`}>Call {site.settings.phone}</a></div><div className="soft-card"><h3>Before you decide</h3><p>Ask for clear answers about the plan and the cost of care.</p><ul>{site.pages.paymentChecklist.split("\n").filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="content-section payment-methods"><div className="container"><div className="center-heading"><h2>Ways Families May Pay for Care</h2><p>Availability and eligibility depend on the service, policy, and program. Confirm the details with Heartstead before relying on any option.</p></div><div className="benefit-grid"><div><span>01</span><h3>Private Pay</h3><p>Ask our team for current rates, billing terms, and accepted methods before starting care.</p></div><div><span>02</span><h3>Long-Term Care Insurance</h3><p>Review your policy’s benefits, exclusions, and documentation needs with your insurer. We can discuss the care details you may need.</p></div><div><span>03</span><h3>Veteran Benefits</h3><p>Some veterans and families explore benefits that may help with care costs. Eligibility must be confirmed with the program.</p></div><div><span>04</span><h3>Other Programs</h3><p>State and community programs have different rules and provider requirements. Ask us what arrangements Heartstead currently supports.</p></div></div></div></section>
    <section className="content-section container two-col"><div><p className="eyebrow">Questions to ask</p><h2>Know what your care plan includes</h2><p>Find out how many hours are planned, who to contact when needs change, and how billing is handled. A clear conversation now can help your family compare options confidently.</p></div><div className="soft-card"><h3>Ready to talk?</h3><p>Tell us about the support you are considering. We will share the next steps and current information for your situation.</p><Link className="button" href="/contact">Get Care Now</Link></div></section>
    <ContactBand site={site}/>
  </>;
}
