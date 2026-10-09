import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { applicationSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const db = adminDb();
  if (!db) return Response.json({ error: "Online applications are not connected yet. Please contact the office." }, { status: 503 });
  let payload: unknown;
  try { payload = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = applicationSchema.safeParse(payload);
  if (!parsed.success) return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
  if (parsed.data.website) return Response.json({ ok: true });
  const { website: _honeypot, ...record } = parsed.data;
  try {
    await db.collection("applications").add({ ...record, createdAt: FieldValue.serverTimestamp(), status: "new", source: "website" });
    return Response.json({ ok: true }, { status: 201 });
  } catch { return Response.json({ error: "We could not send your application. Please contact the office." }, { status: 503 }); }
}
