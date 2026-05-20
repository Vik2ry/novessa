import { ArrowRight } from "lucide-react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { PartnerForm } from "@/components/partner-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSitePayload } from "@/lib/api";

export default async function PartnersPage() {
  const site = await getSitePayload();

  return (
    <>
      <SiteHeader activeHref="/partners" />
      <main className="pageSurface">
        <section className="heroSplit partnersHero">
          <div className="heroMedia dimmed">
            <img
              alt="Professional collaboration meeting"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80"
            />
          </div>
          <div className="heroPanel dark">
            <p className="eyebrow">Global Partners</p>
            <h1>Trusted by organizations helping us scale care with integrity.</h1>
            <p>
              We collaborate across financial infrastructure, logistics, healthcare, and community delivery to move
              resources responsibly.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHeader split">
              <div>
                <p className="eyebrow">Trusted by Industry Leaders</p>
                <h2>Partnerships built on accountability, clarity, and mutual impact.</h2>
              </div>
            </div>
            <div className="partnerGrid">
              {site.partners.map((partner) => (
                <article className="partnerCard" key={partner.slug}>
                  <div className="partnerCardMedia">
                    <img alt={partner.title} src={partner.imageUrl} />
                  </div>
                  <div className="partnerCardBody">
                    <span>{String(partner.metadata.categoryLabel ?? partner.category)}</span>
                    <h3>{partner.title}</h3>
                    <p>{partner.summary}</p>
                    <div className="sectionLink">
                      {String(partner.metadata.ctaLabel ?? "Learn More")} <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container partnerInquiryLayout">
            <div className="partnerModes dark">
              <p className="eyebrow">How We Collaborate</p>
              <h2>Ways to build impact together.</h2>
              <ul>
                <li>Strategic sponsorship for long-term programs.</li>
                <li>Employee engagement and skilled volunteering.</li>
                <li>Financial, health, and logistics infrastructure support.</li>
              </ul>
            </div>
            <div className="formPanel">
              <h2>Become a Partner</h2>
              <PartnerForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/partners" />
    </>
  );
}
