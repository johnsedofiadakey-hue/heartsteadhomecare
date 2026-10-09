import type { ReactNode } from "react";
import { Paragraphs } from "@/components/Paragraphs";

export function PageHero({ title, lead, image, tone = "mint" }: { title: string; lead: ReactNode; image?: string; tone?: "mint" | "cream" | "yellow" }) {
  return <section className={`page-hero page-hero-${tone} ${image ? "with-image" : "centered"}`}>
    <div className="page-hero-copy"><h1>{title}</h1><div className="page-hero-lead">{typeof lead === "string" ? <Paragraphs text={lead}/> : lead}</div></div>
    {image && <div className="page-hero-image"><img src={image} alt=""/></div>}
  </section>;
}
