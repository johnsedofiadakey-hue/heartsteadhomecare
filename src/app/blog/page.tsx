import Link from "next/link";
import { getSiteData } from "@/lib/content";

export const metadata = { title: "Blog & Resources" };
export default async function BlogPage() {
  const site = await getSiteData();
  const posts = site.posts.filter((post) => post.published);
  return <><section className="simple-hero"><div className="container"><h1>Our Blog & Resources</h1><p>Advice and insights about caregiving and living well at home.</p></div></section><section className="content-section container"><div className="blog-grid">{posts.map((post) => <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}><img src={post.image} alt=""/><div><h2>{post.title}</h2><p>{post.excerpt}</p><span>Read More ›</span></div></Link>)}</div>{!posts.length && <div className="empty-state"><h2>Resources are coming soon.</h2><p>Contact our team if you have a question about home care.</p><Link className="button" href="/contact">Contact Us</Link></div>}</section></>;
}
