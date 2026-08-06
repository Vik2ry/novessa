import sanitizeHtml from "sanitize-html";

// Allowlist matches what the Quill rich-text editor in Django Admin produces.
// Anything outside this list (scripts, iframes, inline event handlers, styles) is stripped.
const options: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "ul",
    "ol",
    "li",
    "blockquote",
    "span",
    "code",
    "pre"
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"]
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" })
  }
};

/**
 * Sanitizes rich text HTML (authored via the Quill editor in Django Admin) for safe
 * rendering with dangerouslySetInnerHTML. Plain, untagged text passes through unchanged.
 */
export function sanitizeRichText(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html, options);
}
