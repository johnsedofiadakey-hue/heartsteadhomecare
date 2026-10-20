import "server-only";
import nodemailer from "nodemailer";
import { applicationDetailGroup, applicationGroups, applicationDetailKeys, checkboxDetailKeys, labelFor } from "@/lib/application-fields";
import type { Resume } from "@/lib/resume";

type Application = Record<string, unknown> & { firstName: string; lastName: string; email: string; phone: string; details: Record<string, string> };

// Optional checkboxes (shifts, "do not contact") read better when only ticked ones are listed.
const isUntickedBox = (key: string) => checkboxDetailKeys.has(key) && key !== "employmentHistoryAuthorized" && key !== "certified";
const escape = (value: string) => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Gmail SMTP with an App Password. Returns null when the password secret is not configured. */
function transport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  // SMTP_HOST/SMTP_PORT exist only for local testing against a capture server.
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({ host: process.env.SMTP_HOST || "smtp.gmail.com", port, secure: port === 465, auth: { user, pass }, ...(process.env.SMTP_HOST ? { tls: { rejectUnauthorized: false } } : {}) });
}

function sections(application: Application) {
  const top: [string, string][] = [
    ["Name", [application.firstName, application.middleName, application.lastName].filter(Boolean).join(" ")],
    ["Email", application.email], ["Phone", application.phone],
    ["Address", [application.address1, application.address2, application.city, application.state, application.zipCode].filter(Boolean).join(", ")],
    ["Position", String(application.position ?? "")], ["Valid CHHA license or certification", String(application.hasStateLicense ?? "")],
    ["How they heard about us", String(application.referralSource ?? "")],
  ];
  const groups = applicationGroups.map((group) => ({
    group,
    rows: applicationDetailKeys
      .filter((key) => applicationDetailGroup(key) === group && Boolean(application.details[key]) && !(isUntickedBox(key) && application.details[key] === "No"))
      .map((key) => [labelFor(key), application.details[key]] as [string, string]),
  })).filter(({ rows }) => rows.length);
  return [{ group: "Applicant", rows: top.filter(([, value]) => value) }, ...groups];
}

export async function sendApplicationEmail(application: Application, resume: Resume | null, adminUrl: string) {
  const mail = transport();
  if (!mail) return "skipped" as const;
  const to = process.env.APPLICATION_NOTIFY_EMAIL || process.env.GMAIL_USER!;
  const name = `${application.firstName} ${application.lastName}`.trim();
  const blocks = sections(application);
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;color:#2b1d15;max-width:720px">
  <h2 style="color:#4a1e02;margin:0 0 4px">New caregiver application</h2>
  <p style="margin:0 0 18px;color:#6f5d51">${escape(name)} applied through heartsteadhomecarenj.com. Reply to this email to contact the applicant${resume ? "; their resume is attached" : ""}.</p>
  ${blocks.map(({ group, rows }) => `<h3 style="color:#4a1e02;border-bottom:1px solid #e4dacb;padding-bottom:4px;margin:22px 0 8px">${escape(group)}</h3>
  <table style="border-collapse:collapse;width:100%">${rows.map(([label, value]) => `<tr><td style="padding:5px 12px 5px 0;vertical-align:top;color:#6f5d51;width:42%">${escape(label)}</td><td style="padding:5px 0;vertical-align:top;white-space:pre-wrap">${escape(value)}</td></tr>`).join("")}</table>`).join("")}
  <p style="margin-top:26px;font-size:13px;color:#6f5d51">Also saved in the website admin Inbox: <a href="${escape(adminUrl)}">${escape(adminUrl)}</a></p>
</div>`;
  const text = [`New caregiver application from ${name}`, "", ...blocks.flatMap(({ group, rows }) => [group.toUpperCase(), ...rows.map(([label, value]) => `${label}: ${value}`), ""]), `Admin Inbox: ${adminUrl}`].join("\n");
  await mail.sendMail({
    from: { name: "Heartstead Website", address: process.env.GMAIL_USER! },
    to, replyTo: { name, address: application.email },
    subject: `New caregiver application: ${name} (${String(application.position ?? "")})`,
    html, text,
    attachments: resume ? [{ filename: resume.fileName, content: resume.bytes, contentType: resume.contentType }] : [],
  });
  return "sent" as const;
}
