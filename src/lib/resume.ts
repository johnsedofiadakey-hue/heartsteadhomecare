import "server-only";

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

const types = {
  pdf: { contentType: "application/pdf", matches: (b: Uint8Array) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 },
  docx: { contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", matches: (b: Uint8Array) => b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04 },
  doc: { contentType: "application/msword", matches: (b: Uint8Array) => b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0 },
} as const;

export type Resume = { bytes: Buffer; extension: keyof typeof types; contentType: string; fileName: string; size: number };

/** Checks an uploaded resume by extension, size and file signature. Returns null for an empty field. */
export async function readResume(entry: FormDataEntryValue | null): Promise<{ ok: true; resume: Resume | null } | { ok: false; error: string }> {
  if (!entry || typeof entry === "string" || entry.size === 0) return { ok: true, resume: null };
  if (entry.size > RESUME_MAX_BYTES) return { ok: false, error: "Your resume must be 5 MB or smaller." };
  const extension = entry.name.toLowerCase().split(".").pop() ?? "";
  if (!(extension in types)) return { ok: false, error: "Please upload your resume as a PDF or Word document." };
  const type = types[extension as keyof typeof types];
  const bytes = Buffer.from(await entry.arrayBuffer());
  if (bytes.length < 4 || !type.matches(bytes)) return { ok: false, error: "That file does not look like a PDF or Word document." };
  const base = entry.name.replace(/\.[^.]*$/, "").replace(/[^A-Za-z0-9 _-]+/g, "").trim().slice(0, 80) || "resume";
  return { ok: true, resume: { bytes, extension: extension as keyof typeof types, contentType: type.contentType, fileName: `${base}.${extension}`, size: bytes.length } };
}
