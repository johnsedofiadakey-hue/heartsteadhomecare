import Link from "next/link";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Testimonials" };
export default async function TestimonialsPage() {
  const site = await getSiteData();
  const testimonials = site.testimonials.filter((item) => item.published);
  return <><section className="simple-hero"><div className="container"><h1>Our Testimonials</h1><p>{site.pages.testimonialsLead}</p></div></section><section className="content-section container">{testimonials.length ? <div className="testimonial-grid">{testimonials.map((item) => <blockquote key={item.id}><p>“{item.quote}”</p><footer>— {item.name}{item.location ? `, ${item.location}` : ""}</footer></blockquote>)}</div> : <div className="empty-state"><h2>Family stories are coming soon.</h2><p>We’ll share approved testimonials here when they are available. For now, please contact us to learn how care begins.</p><Link className="button" href="/contact">Get in Touch</Link></div>}</section></>;
}
