import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { getSiteData } from "@/lib/content";
import { BriefcaseBusiness, Clock3 } from "lucide-react";

export const metadata = { title: "Caregiver Jobs" };
export default async function CaregiverJobsPage() {
  const site = await getSiteData();
  return <>
    <PageHero title="Caregiver Jobs" lead={site.pages.careersLead} image={site.settings.caregiverImage} tone="yellow"/>
    <div className="container job-action-grid"><Link href="/caregiver-jobs/cases"><span><BriefcaseBusiness size={31} strokeWidth={1.8} aria-hidden="true"/></span><div><strong>View Open Cases</strong><small>See current caregiver opportunities</small></div><b>›</b></Link><Link href="/caregiver-jobs/time-off"><span><Clock3 size={31} strokeWidth={1.8} aria-hidden="true"/></span><div><strong>Request Time Off</strong><small>Contact the office about time away</small></div><b>›</b></Link></div>
    <section className="content-section container"><div className="resource-panel"><div><p className="eyebrow">Caregiver resources</p><h2>Support for the people who care</h2><p>{site.pages.careersResources}</p></div><a className="button-outline" href={`mailto:${site.settings.publicEmail}?subject=Caregiver%20Resources`}>Contact the Office</a></div></section>
    <section className="content-section careers-application"><div className="container"><div className="center-heading"><h2>Get a Caregiver Job</h2><p>Apply below and our team will review your interest. Required fields are marked with an asterisk.</p></div><div className="application-wrap"><JobApplicationForm/></div></div></section>
    <section className="content-section container"><div className="two-col careers-details"><div><p className="eyebrow">Working with Heartstead</p><h2>Benefits & Opportunities</h2><ul>{site.pages.careersBenefits.split("\n").filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="eyebrow">What we look for</p><h2>Qualifications & Requirements</h2><ul>{site.pages.careersQualifications.split("\n").filter(Boolean).map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="content-section tinted"><div className="container two-col"><div><p className="eyebrow">Why join us</p><h2>Why Join Heartstead?</h2><p>{site.pages.careersWhyJoin}</p></div><img className="section-photo" src={site.settings.familyImage} alt={site.settings.familyImageAlt}/></div></section>
  </>;
}
