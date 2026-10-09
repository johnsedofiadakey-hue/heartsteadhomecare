import Link from "next/link";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Open Caregiver Jobs" };
export default async function OpenCasesPage() {
  const site = await getSiteData();
  const jobs = site.jobs.filter((job) => job.published);
  return <section className="content-section container listing-page"><div className="center-heading"><h1>View Open Cases</h1><p>Current caregiver opportunities serving {site.settings.serviceArea}.</p></div>{jobs.length ? <div className="job-list">{jobs.map((job) => <article className="job-list-card" key={job.id}><div><p className="eyebrow">{job.employmentType} · {job.location}</p><h2>{job.title}</h2><p>{job.summary}</p></div><Link className="button-outline" href={`/caregiver-jobs/apply?job=${encodeURIComponent(job.id)}`}>Apply Now ›</Link></article>)}</div> : <div className="empty-state"><h2>No openings are posted right now.</h2><p>Our opportunities change. You can send a general application and we’ll keep your interest on file according to our privacy policy.</p><Link className="button" href="/caregiver-jobs/apply">Send a General Application</Link></div>}</section>;
}
