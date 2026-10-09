/** Renders text that uses blank lines between paragraphs (as typed in the admin) as separate paragraphs. */
export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return <>{text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean).map((part, index) => <p className={className} key={index}>{part}</p>)}</>;
}
