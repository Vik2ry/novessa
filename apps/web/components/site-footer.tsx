import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { fallbackSite } from "@/lib/api";

export function SiteFooter({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const footer = fallbackSite.footer;

  return (
    <footer className={variant === "dark" ? "siteFooter dark" : "siteFooter light"}>
      <div className="container footerGrid">
        <div className="footerBrandBlock">
          <h2>Novessa Foundation</h2>
          <p>{footer.summary}</p>
          <div className="footerSocials" aria-label="Social links">
            <a href="https://instagram.com/novessafoundation" rel="noreferrer" target="_blank">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com/novessafoundation" rel="noreferrer" target="_blank">
              <Facebook size={16} />
            </a>
            <a href="https://linkedin.com/company/novessafoundation" rel="noreferrer" target="_blank">
              <Linkedin size={16} />
            </a>
            <a href="mailto:hello@novessafoundation.org">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3>Quick Links</h3>
          {footer.quickLinks.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h3>Resources</h3>
          {footer.resources.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>

        <div>
          <h3>Stay Updated</h3>
          <p>Join our monthly impact digest for stories, milestones, and ways to help.</p>
          <NewsletterForm compact />
        </div>
      </div>

      <div className="container footerBottom">
        <span>© 2026 Novessa Foundation. Empowering communities across Nigeria.</span>
        <div>
          <a href={`mailto:${fallbackSite.contact.email}`}>{fallbackSite.contact.email}</a>
          <span>{fallbackSite.contact.address}</span>
        </div>
      </div>
    </footer>
  );
}
