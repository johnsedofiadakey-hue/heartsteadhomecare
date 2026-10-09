"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";

export function JobApplicationForm({ jobId }: { jobId?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; setState("submitting"); setMessage("");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/applications", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, jobId: jobId ?? "general" }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your application.");
      form.reset(); setState("done");
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "We could not send your application."); setState("error"); }
  }
  return <form className="care-form job-form" onSubmit={submit}>
    <div className="form-grid"><label>First Name <b>*</b><input name="firstName" required maxLength={80} autoComplete="given-name"/></label><label>Last Name <b>*</b><input name="lastName" required maxLength={80} autoComplete="family-name"/></label><label>Email <b>*</b><input name="email" type="email" required maxLength={200} autoComplete="email"/></label><label>Phone <b>*</b><input name="phone" type="tel" required maxLength={30} autoComplete="tel"/></label></div>
    <h3>Your Address</h3><div className="form-grid"><label>Address 1 <b>*</b><input name="address1" required maxLength={200} autoComplete="address-line1"/></label><label>Address 2<input name="address2" maxLength={200} autoComplete="address-line2"/></label><label>City <b>*</b><input name="city" required maxLength={100} autoComplete="address-level2"/></label><label>State <b>*</b><select name="state" required defaultValue=""><option value="" disabled>Please Select</option><option value="NJ">New Jersey</option><option value="PA">Pennsylvania</option><option value="NY">New York</option><option value="Other">Other</option></select></label><label>ZIP Code <b>*</b><input name="zipCode" required inputMode="numeric" maxLength={10} autoComplete="postal-code"/></label></div>
    <h3>Your Position</h3><div className="form-grid"><label>Position <b>*</b><select name="position" required defaultValue=""><option value="" disabled>Please Select</option><option>Home Caregiver</option><option>Home Health Aide</option><option>Companion Caregiver</option><option>Care Coordinator</option><option>Other</option></select></label><label>Do you drive? <b>*</b><select name="drives" required defaultValue=""><option value="" disabled>Please Select</option><option>Yes</option><option>No</option></select></label><label>Do you hold an active home care certification? <b>*</b><select name="hasStateLicense" required defaultValue=""><option value="" disabled>Please Select</option><option>Yes</option><option>No</option><option>In progress</option></select></label><label>Where did you hear about us?<input name="referralSource" maxLength={120}/></label></div>
    <label className="hidden-field" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <p className="form-note">By submitting, you agree to our <Link href="/privacy-policy">Privacy Policy</Link>. We will contact you about your application. Please do not submit a Social Security number or medical information here.</p>
    <button type="submit" className="button" disabled={state === "submitting"}>{state === "submitting" ? "Sending…" : "Submit Application"}</button>
    {state === "done" && <p className="form-success" role="status">Your application has been received. Thank you for your interest.</p>}
    {state === "error" && <p className="form-error" role="alert">{message}</p>}
  </form>;
}
