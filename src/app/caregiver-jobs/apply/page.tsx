import { JobApplicationForm } from "@/components/JobApplicationForm";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Apply for a Caregiver Job" };
export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ job?: string }> }) {
  const { job: jobId } = await searchParams;
  const site = await getSiteData();
  const job = site.jobs.find((item) => item.id === jobId && item.published);
  return <section className="content-section container application-page"><div className="center-heading"><h1>Apply to Join Heartstead</h1><p>{job ? `Application for ${job.title}` : "Tell us about your interest in a caregiving role."}</p></div><div className="application-wrap"><JobApplicationForm jobId={job?.id}/></div></section>;
}
