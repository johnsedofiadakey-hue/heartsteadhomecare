import { FieldValue } from "firebase-admin/firestore";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { readResume } from "@/lib/resume";
import { applicationSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const db = adminDb();
  if (!db) return Response.json({ error: "Online applications are not connected yet. Please contact the office." }, { status: 503 });
  let form: FormData;
  try { form = await request.formData(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const fields = Object.fromEntries([...form.entries()].filter(([key, value]) => key !== "resume" && typeof value === "string"));
  const parsed = applicationSchema.safeParse(fields);
  if (!parsed.success) return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
  if (parsed.data.website) return Response.json({ ok: true });
  const { website: _honeypot, ...record } = parsed.data;

  const upload = await readResume(form.get("resume"));
  if (!upload.ok) return Response.json({ error: upload.error }, { status: 400 });
  const { resume } = upload;
  const bucket = resume ? adminBucket() : null;
  if (resume && !bucket) return Response.json({ error: "Resume uploads are not connected yet. Please submit without a resume or contact the office." }, { status: 503 });

  const ref = db.collection("applications").doc();
  const path = resume ? `resumes/${ref.id}/resume.${resume.extension}` : null;
  try {
    if (resume && bucket && path) {
      await bucket.file(path).save(resume.bytes, { resumable: false, contentType: resume.contentType, metadata: { contentDisposition: `attachment; filename="${resume.fileName}"` } });
    }
    await ref.set({
      ...record,
      resume: resume && path ? { path, fileName: resume.fileName, contentType: resume.contentType, size: resume.size } : null,
      createdAt: FieldValue.serverTimestamp(), status: "new", source: "website",
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    if (bucket && path) await bucket.file(path).delete({ ignoreNotFound: true }).catch(() => undefined);
    return Response.json({ error: "We could not send your application. Please contact the office." }, { status: 503 });
  }
}
