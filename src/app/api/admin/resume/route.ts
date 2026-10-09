import { verifyOwner } from "@/lib/admin-guard";
import { adminBucket, adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const guard = await verifyOwner(request);
  if (!guard.ok) return Response.json({ error: guard.error }, { status: guard.status });
  const db = adminDb(); const bucket = adminBucket();
  if (!db || !bucket) return Response.json({ error: "Firebase is not configured." }, { status: 503 });
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[A-Za-z0-9]{20}$/.test(id)) return Response.json({ error: "Invalid application." }, { status: 400 });
  try {
    const doc = await db.collection("applications").doc(id).get();
    const resume = doc.get("resume") as { path?: string; fileName?: string; contentType?: string } | null | undefined;
    if (!doc.exists || !resume?.path) return Response.json({ error: "This application has no resume." }, { status: 404 });
    const [bytes] = await bucket.file(resume.path).download();
    const fileName = resume.fileName ?? "resume";
    return new Response(new Uint8Array(bytes), {
      headers: {
        "content-type": resume.contentType ?? "application/octet-stream",
        "content-disposition": `attachment; filename="${fileName.replace(/"/g, "")}"`,
        "cache-control": "private, no-store",
        "x-content-type-options": "nosniff",
      },
    });
  } catch { return Response.json({ error: "Could not download the resume." }, { status: 503 }); }
}
