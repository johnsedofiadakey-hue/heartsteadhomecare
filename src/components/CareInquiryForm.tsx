"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { SiteData } from "@/lib/site-data";
import { BriefcaseBusiness, CircleHelp, HeartHandshake } from "lucide-react";

export function CareInquiryForm({ services, phone, contactMode = false }: { services: SiteData["services"]; phone: string; contactMode?: boolean }) {
  const [intent, setIntent] = useState<"care" | "work" | "question">("care");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting"); setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, intent, smsOptIn: false }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your request.");
      form.reset(); setState("done");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "We could not send your request."); setState("error"); }
  }

  return <form className="care-form" onSubmit={submit}>
    <div className="form-grid"><label>First Name <b>*</b><input name="firstName" required maxLength={80} autoComplete="given-name" placeholder="Enter your first name"/></label><label>Last Name <b>*</b><input name="lastName" required maxLength={80} autoComplete="family-name" placeholder="Enter your last name"/></label><label>Email <b>*</b><input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Enter your email address"/></label><label>Phone <b>*</b><input name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="Enter your phone number"/></label></div>
    {contactMode && <fieldset className="intent-options"><legend>What are you looking for? <b>*</b></legend><button type="button" aria-pressed={intent === "care"} className={intent === "care" ? "selected" : ""} onClick={() => setIntent("care")}><HeartHandshake size={35} strokeWidth={1.6} aria-hidden="true"/><span>I’m looking for care.</span></button><button type="button" aria-pressed={intent === "work"} className={intent === "work" ? "selected" : ""} onClick={() => setIntent("work")}><BriefcaseBusiness size={35} strokeWidth={1.6} aria-hidden="true"/><span>I’m looking for work.</span></button><button type="button" aria-pressed={intent === "question"} className={intent === "question" ? "selected" : ""} onClick={() => setIntent("question")}><CircleHelp size={35} strokeWidth={1.6} aria-hidden="true"/><span>I have a question.</span></button></fieldset>}
    <div className="form-grid"><label>Where is care needed? (ZIP code) <b>*</b><input name="careZipCode" inputMode="numeric" pattern="[0-9]{5}" required maxLength={5} placeholder="ZIP code"/></label><label>Type of Care needed <b>*</b><select name="typeOfCare" required defaultValue=""><option value="" disabled>Please Select</option>{services.filter((item) => item.category !== "Care guides").map((item) => <option key={item.slug} value={item.title}>{item.title}</option>)}<option value="Not sure yet">Not sure yet</option></select></label></div>
    <label className="hidden-field" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <p className="form-note">By submitting, you agree to our <Link href="/privacy-policy">Privacy Policy</Link> and allow Heartstead Home Care to contact you about this request. Please do not include medical information in this form.</p>
    <button className="button" disabled={state === "submitting"} type="submit">{state === "submitting" ? "Sending…" : "Submit"}</button>
    {state === "done" && <p role="status" className="form-success">Thank you. Your request has been received.</p>}
    {state === "error" && <p role="alert" className="form-error">{error} You can also call {phone}.</p>}
  </form>;
}
