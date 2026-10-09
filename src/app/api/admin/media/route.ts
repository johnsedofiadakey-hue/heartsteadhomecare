import { randomUUID } from "crypto";
import sharp from "sharp";
import { FieldValue } from "firebase-admin/firestore";
import { verifyOwner } from "@/lib/admin-guard";
import { adminBucket, adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const guard = await verifyOwner(request);
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });
  const db = adminDb();
  if (!db) return Response.json({ error: "Firebase is not configured." }, { status: 503 });
  const list = await db.collection("media").orderBy("createdAt", "desc").limit(100).get();
  return Response.json({ media: list.docs.map((item) => ({ id: item.id, ...item.data() })) });
}

export async function POST(request: Request) {
  const guard = await verifyOwner(request);
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });
  const bucket = adminBucket(); const db = adminDb();
  if (!bucket || !db) return Response.json({ error: "Firebase Storage is not configured." }, { status: 503 });
  let form: FormData;
  try { form = await request.formData(); } catch { return Response.json({ error: "Invalid upload." }, { status: 400 }); }
  const file = form.get("file"); const alt = String(form.get("alt") ?? "").trim();
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size > 10_000_000 || file.size < 1 || alt.length < 3 || alt.length > 250) return Response.json({ error: "Use an image under 10 MB and provide descriptive alt text." }, { status: 400 });
  let output: Buffer;
  try { output = await sharp(Buffer.from(await file.arrayBuffer())).rotate().resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer(); }
  catch { return Response.json({ error: "This image could not be processed." }, { status: 400 }); }
  const id = randomUUID(); const objectPath = `site-media/${id}.webp`; const token = randomUUID();
  try {
    await bucket.file(objectPath).save(output, { resumable: false, contentType: "image/webp", metadata: { metadata: { firebaseStorageDownloadTokens: token } } });
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
    const media = { url, alt, objectPath, createdAt: FieldValue.serverTimestamp(), uploadedBy: guard.uid };
    await db.collection("media").doc(id).set(media);
    return Response.json({ id, url, alt }, { status: 201 });
  } catch { return Response.json({ error: "The image could not be uploaded." }, { status: 503 }); }
}
