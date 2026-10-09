import { FieldValue } from "firebase-admin/firestore";
import { verifyOwner } from "@/lib/admin-guard";
import { adminDb } from "@/lib/firebase-admin";
import { getDraftData, getSiteData } from "@/lib/content";
import { siteSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const guard = await verifyOwner(request);
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });
  const [draft, published] = await Promise.all([getDraftData(), getSiteData()]);
  return Response.json({ draft, published });
}

export async function PUT(request: Request) {
  const guard = await verifyOwner(request);
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });
  const db = adminDb();
  if (!db) return Response.json({ error: "Firebase is not configured." }, { status: 503 });
  let payload: unknown;
  try { payload = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const envelope = payload as { content?: unknown; mode?: unknown };
  const parsed = siteSchema.safeParse(envelope?.content);
  if (!parsed.success || !["save", "publish"].includes(String(envelope?.mode))) return Response.json({ error: "Content could not be validated." }, { status: 400 });
  try {
    const batch = db.batch();
    batch.set(db.doc("site/draft"), parsed.data);
    if (envelope.mode === "publish") {
      batch.set(db.doc("site/published"), parsed.data);
      batch.set(db.collection("siteRevisions").doc(), { content: parsed.data, publishedAt: FieldValue.serverTimestamp(), publishedBy: guard.uid });
    }
    await batch.commit();
    return Response.json({ ok: true, mode: envelope.mode });
  } catch { return Response.json({ error: "The change could not be saved." }, { status: 503 }); }
}
