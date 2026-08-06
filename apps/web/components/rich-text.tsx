import { sanitizeRichText } from "@/lib/sanitize";

type RichTextProps = {
  html: string | null | undefined;
  className?: string;
};

/**
 * Renders content authored via the rich-text editor in Django Admin (or plain text,
 * which passes through untouched). Always sanitized before insertion — never render
 * unsanitized content with this component.
 */
export function RichText({ html, className }: RichTextProps) {
  const clean = sanitizeRichText(html);
  if (!clean.trim()) return null;
  return <div className={className ?? "richText"} dangerouslySetInnerHTML={{ __html: clean }} />;
}
