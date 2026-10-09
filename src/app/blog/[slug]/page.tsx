import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/content";
import { defaultSite } from "@/lib/site-data";

export const dynamic = "force-dynamic";
export function generateStaticParams() { return defaultSite.posts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = (await getSiteData()).posts.find((item) => item.slug === slug); return { title: post?.title ?? "Blog", description: post?.excerpt, openGraph: post ? { type: "article", description: post.excerpt } : undefined, twitter: post ? { description: post.excerpt } : undefined }; }
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const site = await getSiteData(); const post = site.posts.find((item) => item.slug === slug && item.published); if (!post) notFound();
  return <article><section className="simple-hero article-hero"><div className="container"><p className="eyebrow">Heartstead resources</p><h1>{post.title}</h1><p>{post.excerpt}</p></div></section><div className="article-body container"><img src={post.image} alt=""/><div><p>{post.body}</p><p>Questions about care at home? Our team can help you talk through your situation.</p><Link className="button" href="/contact">Contact Heartstead</Link></div></div></article>;
}
