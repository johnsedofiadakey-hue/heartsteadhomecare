import "server-only";
import { adminAuth } from "@/lib/firebase-admin";

export async function verifyOwner(request: Request) {
  const ownerUid = process.env.FIREBASE_OWNER_UID;
  const auth = adminAuth();
  if (!ownerUid || !auth) return { ok: false as const, status: 503, error: "Firebase owner setup is incomplete." };
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return { ok: false as const, status: 401, error: "Sign in required." };
  try {
    const decoded = await auth.verifyIdToken(token, true);
    if (decoded.uid !== ownerUid) return { ok: false as const, status: 403, error: "This account is not authorized for the CMS." };
    return { ok: true as const, uid: decoded.uid };
  } catch {
    return { ok: false as const, status: 401, error: "Your session has expired. Please sign in again." };
  }
}
