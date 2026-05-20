import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { NewsletterForm } from "@/components/newsletter-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSitePayload } from "@/lib/api";

export default async function ContactPage() {
  const site = await getSitePayload();

  return (
    <>
      <SiteHeader activeHref="/contact" />
      <main className="pageSurface">
        <section className="section">
          <div className="container">
            <div className="sectionHeader">
              <p className="eyebrow">Get in Touch</p>
              <h1>Questions, volunteering, partnerships, or donation help.</h1>
              <p>Our team is here to respond with clarity and care.</p>
            </div>

            <div className="contactGrid">
              <div className="contactColumn">
                <article className="contactCard">
                  <MapPin size={20} />
                  <div>
                    <h3>Headquarters</h3>
                    <p>{site.contact.address}</p>
                  </div>
                </article>
                <article className="contactCard">
                  <Mail size={20} />
                  <div>
                    <h3>Email Us</h3>
                    <p>{site.contact.email}</p>
                  </div>
                </article>
                <article className="contactCard whatsappCard">
                  <MessageCircle size={20} />
                  <div>
                    <h3>WhatsApp Us</h3>
                    <p>{site.contact.whatsappLabel}</p>
                  </div>
                </article>
                <article className="mapCard">
                  <img
                    alt="Illustrative map view of Lagos"
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                  />
                  <div className="mapBadge">
                    <MapPin size={16} />
                    <span>{site.contact.address}</span>
                  </div>
                </article>
              </div>

              <div className="formPanel">
                <h2>Send us a message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container newsletterBand">
            <div>
              <p className="eyebrow">Stay Updated</p>
              <h2>Receive monthly stories of impact.</h2>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/contact" />
    </>
  );
}
