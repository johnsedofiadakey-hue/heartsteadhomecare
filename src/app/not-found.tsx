import Link from "next/link";

export const metadata = { title: "Page Not Found" };
export default function NotFound() {
  return <section className="simple-hero not-found"><div className="container"><p className="eyebrow">Page not found</p><h1>We couldn’t find that page.</h1><p>The link may be old or mistyped. You can head back to the homepage or contact our office for help.</p><div className="not-found-actions"><Link className="button" href="/">Back to Home</Link><Link className="button-outline" href="/contact">Contact Us</Link></div></div></section>;
}
