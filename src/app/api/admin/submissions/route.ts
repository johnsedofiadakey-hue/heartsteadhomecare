import { verifyOwner } from "@/lib/admin-guard";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const guard = await verifyOwner(request);
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });
  const db = adminDb();
  if (!db) return Response.json({ error: "Firebase is not configured." }, { status: 503 });
  const [inquiries, applications] = await Promise.all([
    db.collection("inquiries").orderBy("createdAt", "desc").limit(50).get(),
    db.collection("applications").orderBy("createdAt", "desc").limit(50).get(),
  ]);
  const map = (snapshot: FirebaseFirestore.QuerySnapshot) => snapshot.docs.map((item) => ({ id: item.id, ...item.data(), createdAt: item.get("createdAt")?.toDate?.()?.toISOString() ?? null }));
  return Response.json({ inquiries: map(inquiries), applications: map(applications) }, { headers: { "cache-control": "private, no-store" } });
}

export async function PATCH(request: Request) {
  const guard = await verifyOwner(request);
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });
  const db = adminDb();
  if (!db) return Response.json({ error: "Firebase is not configured." }, { status: 503 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
  const { kind, id, status, interviewedBy, interviewDate } = body as Record<string, unknown>;
  const updatingInterview = kind === "applications" && status === undefined;
  if ((kind !== "inquiries" && kind !== "applications") || typeof id !== "string" || !/^[A-Za-z0-9]{20}$/.test(id) ||
    (updatingInterview
      ? typeof interviewedBy !== "string" || interviewedBy.trim().length > 120 || typeof interviewDate !== "string" || (interviewDate !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(interviewDate))
      : !["new", "in_progress", "closed"].includes(String(status)))) {
    return Response.json({ error: "Invalid submission update." }, { status: 400 });
  }
  const ref = db.collection(kind).doc(id);
  try {
    const doc = await ref.get();
    if (!doc.exists) return Response.json({ error: "Submission not found." }, { status: 404 });
    await ref.update(updatingInterview
      ? { interviewedBy: (interviewedBy as string).trim(), interviewDate, updatedAt: FieldValue.serverTimestamp(), updatedBy: guard.uid }
      : { status, updatedAt: FieldValue.serverTimestamp(), updatedBy: guard.uid });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Could not update submission." }, { status: 503 }); }
}
