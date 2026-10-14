"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { caregivingSkills, shiftOptions } from "@/lib/application-fields";

type Field = { name: string; label: string; type?: string; required?: boolean; maxLength?: number; choices?: readonly string[]; ariaLabel?: string };
const yesNo = ["Yes", "No"] as const;
const personal: Field[] = [
  { name: "firstName", label: "Legal first name", required: true }, { name: "middleName", label: "Middle name" },
  { name: "lastName", label: "Legal last name", required: true }, { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "email", label: "Email address", type: "email", required: true }, { name: "applicationDate", label: "Application date", type: "date", required: true },
  { name: "address1", label: "Street address", required: true }, { name: "address2", label: "Apartment or suite" },
  { name: "city", label: "City", required: true }, { name: "state", label: "State", required: true },
  { name: "zipCode", label: "ZIP code", required: true }, { name: "dateOfBirth", label: "Date of birth", type: "date" },
  { name: "timeAtAddress", label: "How long have you lived at this address?" },
  { name: "age18OrOlder", label: "Are you 18 years old or older?", choices: yesNo, required: true },
  { name: "hasStateLicense", label: "Do you currently have a valid CHHA license or occupational certification?", choices: yesNo, required: true },
  { name: "validDriverLicense", label: "Do you have a valid driver license?", choices: yesNo, required: true },
  { name: "reliableTransportation", label: "Do you have reliable transportation?", choices: yesNo, required: true },
  { name: "workEligible", label: "Are you legally eligible to work in the United States?", choices: yesNo, required: true },
  { name: "relativeWorksHere", label: "Do you have a relative working for Heartstead Home Care?", choices: yesNo, required: true },
  { name: "relativeName", label: "If yes, relative’s name" },
  { name: "previouslyWorkedHere", label: "Have you previously worked for Heartstead Home Care?", choices: yesNo, required: true },
];
const position: Field[] = [
  { name: "position", label: "Position desired", choices: ["Companion", "Certified Home Health Aide (CHHA)", "Live-in", "Other"], required: true },
  { name: "otherPosition", label: "Other position (if applicable)" },
  { name: "referralSource", label: "How did you hear about this position?" },
  { name: "availableStartDate", label: "Available start date", type: "date" },
  { name: "weeklyHours", label: "How many hours per week can you work?", type: "number" },
  { name: "currentlyWorking", label: "Are you currently working?", choices: yesNo, required: true },
  { name: "currentWorkHours", label: "If yes, hours per week", type: "number" },
  { name: "onLayoffRecall", label: "Are you on layoff and subject to recall by another employer?", choices: yesNo, required: true },
];

function Input({ field }: { field: Field }) {
  const { name, label, type = "text", required = false, maxLength = 200, choices, ariaLabel } = field;
  return <label>{label} {required && <b>*</b>}{choices
    ? <select name={name} aria-label={ariaLabel} required={required} defaultValue=""><option value="">Please select</option>{choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}</select>
    : <input name={name} aria-label={ariaLabel} type={type} required={required} maxLength={type === "text" || type === "tel" || type === "email" ? maxLength : undefined} min={type === "number" ? 0 : undefined} step={type === "number" ? "0.5" : undefined}/>}</label>;
}
function Grid({ fields, context }: { fields: Field[]; context?: string }) { return <div className="form-grid">{fields.map((field) => <Input key={field.name} field={context ? { ...field, ariaLabel: `${context}: ${field.label}` } : field}/>)}</div>; }
function Answer({ name, label }: { name: string; label: string }) { return <label className="application-long-answer">{label}<textarea name={name} rows={4} maxLength={3000}/></label>; }
function Section({ id, number, title, children }: { id: string; number: number; title: string; children: React.ReactNode }) {
  return <section id={id} className="application-section"><span className="application-section-number">{String(number).padStart(2, "0")} / 06</span><h2>{title}</h2>{children}</section>;
}

export function ApplicationCover() {
  return <div className="application-cover"><p>Dear Applicant,</p><p>Home care makes a difference by helping people remain at home with dignity and independence. Caregiving is both professionally challenging and personally rewarding. If selected, you will play an important role in the lives of the people and families we serve.</p><p>Heartstead Home Care values honesty, dependability, competence, and a genuine interest in helping others. Thank you for considering joining our team.</p><p>Heartstead Home Care is an equal opportunity employer. Applicants are considered without regard to race, color, religion, national origin, sex, age, disability, or other status protected by applicable law. Reasonable accommodations will be considered.</p><p className="application-pdf-link">Prefer paper? <a href="/documents/heartstead-employment-application.pdf" download>Download the printable application (PDF)</a>.</p></div>;
}

export function JobApplicationForm({ jobId }: { jobId?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting"); setMessage("");
    try {
      const data = new FormData(form);
      data.set("jobId", jobId ?? "general");
      const resume = data.get("resume");
      if (resume instanceof File && resume.size > 5 * 1024 * 1024) throw new Error("Your resume must be 5 MB or smaller.");
      const response = await fetch("/api/applications", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your application.");
      form.reset(); setState("done");
      document.getElementById("application-result")?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "We could not send your application."); setState("error"); }
  }
  return <form className="care-form job-form full-application" onSubmit={submit}>
    <p className="application-intro">Please complete the sections below. Fields marked <b>*</b> are required. You may attach a resume, but please also answer the application questions.</p>
    <nav className="application-sections" aria-label="Application sections"><a href="#application-personal">Personal</a><a href="#application-position">Position</a><a href="#application-training">Training</a><a href="#application-history">Work history</a><a href="#application-references">References</a><a href="#application-signature">Signature</a></nav>
    <Section id="application-personal" number={1} title="Personal information"><Grid fields={personal}/></Section>
    <Section id="application-position" number={2} title="Position desired & availability"><Grid fields={position}/><fieldset className="application-choice-group"><legend>Are you available for the following shifts? Check all that apply.</legend><div className="application-check-grid">{shiftOptions.map((shift) => <label key={shift}><input type="checkbox" name={`shift${shift.replace(/[^A-Za-z]/g, "")}`}/>{shift}</label>)}</div></fieldset></Section>
    <Section id="application-training" number={3} title="Education, training & skills">
      <Grid fields={[{ name: "highestGrade", label: "Highest grade completed", choices: ["9", "10", "11", "12", "13", "14", "15", "16+"] }]}/>
      <h3>Schools, beginning with high school</h3>{[1, 2, 3].map((n) => <div className="application-repeat" key={n}><strong>School {n}</strong><Grid context={`School ${n}`} fields={[{ name: `school${n}Name`, label: "School" }, { name: `school${n}Award`, label: "Subject or degree awarded" }]}/></div>)}
      <Grid fields={[{ name: "chhaTrainingLocation", label: "CHHA training location" }, { name: "chhaTrainingCompletion", label: "Training completion date", type: "month" }]}/>
      <h3>Professional licenses or certificates</h3>{[1, 2, 3].map((n) => <div className="application-repeat" key={n}><strong>License or certificate {n}</strong><Grid context={`License or certificate ${n}`} fields={[{ name: `license${n}Type`, label: "Type" }, { name: `license${n}Authority`, label: "State or authority" }, { name: `license${n}Number`, label: "License number" }, { name: `license${n}Expiration`, label: "Expiration date", type: "date" }]}/></div>)}
      <Grid fields={[{ name: "cprCertified", label: "Are you CPR certified?", choices: yesNo, required: true }]}/>
      <h3>Caregiving skills & experience</h3><p className="application-help">Mark yes or no and estimate your experience in years.</p><div className="application-skills">{caregivingSkills.map(([key, label]) => <div className="application-skill" key={key}><strong>{label}</strong><Input field={{ name: `skill${key}`, label: "Experience", ariaLabel: `${label}: experience`, choices: yesNo }}/><Input field={{ name: `skill${key}Years`, label: "Years", ariaLabel: `${label}: years of experience`, type: "number" }}/></div>)}</div>
    </Section>
    <Section id="application-history" number={4} title="Employment history">
      <p>I authorize Heartstead Home Care to request and receive pertinent information about my employment with prior employers within one year of the date of this application, including information about the end of my employment.</p>
      <label className="application-consent"><input type="checkbox" name="employmentHistoryAuthorized" required/> I authorize this employment history request. <b>*</b></label>
      <p className="application-help">List your three most recent employers, starting with your current or most recent job. You may indicate if an employer should not be contacted.</p>
      {[1, 2, 3].map((n) => <div className="application-repeat" key={n}><div className="application-repeat-head"><strong>Employer {n}</strong><label><input type="checkbox" name={`employer${n}DoNotContact`} aria-label={`Employer ${n}: do not contact`}/> Do not contact</label></div><Grid context={`Employer ${n}`} fields={[{ name: `employer${n}Name`, label: "Employer name" }, { name: `employer${n}Title`, label: "Position or title" }, { name: `employer${n}Address`, label: "Address (street, suite, city, state, ZIP)" }, { name: `employer${n}Phone`, label: "Phone", type: "tel" }, { name: `employer${n}Supervisor`, label: "Supervisor name" }, { name: `employer${n}From`, label: "Dates employed: from", type: "month" }, { name: `employer${n}To`, label: "Dates employed: to", type: "month" }]}/><Answer name={`employer${n}Duties`} label={`Employer ${n}: briefly describe your duties`}/><Answer name={`employer${n}Reason`} label={`Employer ${n}: reason for leaving`}/></div>)}
    </Section>
    <Section id="application-references" number={5} title="References & general information">
      <p>Please list two references who are not family members.</p>{[1, 2].map((n) => <div className="application-repeat" key={n}><strong>Reference {n}</strong><Grid context={`Reference ${n}`} fields={[{ name: `reference${n}Name`, label: "Name" }, { name: `reference${n}Address`, label: "Address" }, { name: `reference${n}Phone`, label: "Phone", type: "tel" }]}/></div>)}
      <Answer name="caregivingExperience" label="Describe your caregiving experience and any skills, languages, training, volunteer work, or hobbies that qualify you."/>
      <Answer name="whyHeartstead" label="Why do you want to work for Heartstead Home Care?"/>
      <Answer name="mostSatisfying" label="What makes work most satisfying to you?"/>
      <Answer name="leastSatisfying" label="What makes work least satisfying to you?"/>
      <Answer name="reliability" label="How would you describe your reliability?"/>
    </Section>
    <Section id="application-signature" number={6} title="Affidavit & signature">
      <p>I understand employment with Heartstead Home Care is at will, consistent with applicable law, and this application is not a contract or guarantee of employment. I certify that my statements are true and complete. I authorize Heartstead Home Care to verify information relevant to my employment, education, qualifications, and background, and release those providing such information from liability to the extent permitted by law.</p>
      <Grid fields={[{ name: "signatureName", label: "Type your full legal name as your electronic signature", required: true }, { name: "signatureDate", label: "Signature date", type: "date", required: true }]}/>
      <label className="application-consent"><input type="checkbox" name="certified" required/> I have read the statement above and agree to sign this application electronically. <b>*</b></label>
      <h3>Optional resume</h3><label className="resume-field">Resume<input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" aria-describedby="resume-hint"/><span id="resume-hint" className="form-hint">PDF or Word document, up to 5 MB.</span></label>
      <label className="hidden-field" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
      <p className="form-note">By submitting, you agree to our <Link href="/privacy-policy">Privacy Policy</Link>. Please do not enter a Social Security number or medical information in any answer or upload.</p>
      <button type="submit" className="button" disabled={state === "submitting"}>{state === "submitting" ? "Sending…" : "Submit Application"}</button>
      <div id="application-result" aria-live="polite">{state === "done" && <p className="form-success" role="status">Your application has been received. Thank you for your interest.</p>}{state === "error" && <p className="form-error" role="alert">{message}</p>}</div>
    </Section>
  </form>;
}
