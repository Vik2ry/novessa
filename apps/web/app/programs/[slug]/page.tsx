import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
// import { DonationForm } from "@/components/donation-form";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getContentItem, getSitePayload } from "@/lib/api";

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, program] = await Promise.all([getSitePayload(), getContentItem("program", slug)]);
  // const campaign = site.campaigns[0];

  if (!program) {
    notFound();
  }

  const heroMetrics = (program.metadata.heroMetrics as { label: string; value: string }[] | undefined) ?? [];
  const whyItMatters = (program.metadata.whyItMatters as string[] | undefined) ?? [];
  const howItWorks =
    (program.metadata.howItWorks as { title: string; body: string }[] | undefined) ?? [];
  const gallery = (program.metadata.gallery as string[] | undefined) ?? [];

  // Split howItWorks: first two are card cards, last one is the full-width dark card
  const howItWorksCards = howItWorks.slice(0, 2);
  const howItWorksFull = howItWorks[2] ?? null;

  return (
    <>
      <SiteHeader activeHref="/programs" />
      <main className="pageSurface">

        {/* ── Hero ── */}
        <section className="programHero dark">
          <div className="container programHeroGrid">
            <div>
              {/* Active Initiative badge matching the design */}
              <div className="programInitiativeBadge">
                <span>●</span>
                Active Initiative
              </div>

              <h1>{program.title}</h1>
              <p style={{ marginTop: "12px" }}>{program.summary}</p>

              {/* Metrics row: large amber numbers */}
              {heroMetrics.length > 0 && (
                <div className="heroMetricRow" style={{ marginTop: "32px" }}>
                  {heroMetrics.map((metric) => (
                    <div className="heroMetricCard" key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hero image with floating goal card */}
            <div style={{ position: "relative" }}>
              <div className="programHeroMedia">
                {program.imageUrl?.trim() ? (
                  <img alt={program.title} src={program.imageUrl} />
                ) : null}
              </div>

              {/* Floating goal callout card — bottom-left of image */}
              <div className="heroGoalCard">
                <div className="heroGoalCardIcon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div>
                  <strong>New Goal</strong>
                  <span>Targeting 20k lives by 2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content Grid ── */}
        <section className="section">
          <div className="container detailGrid">

            {/* Left column: narrative content */}
            <div className="detailMain">

              {/* Why This Matters — no dark panel, just a clean section with amber dash */}
              <div>
                <div className="whyItMattersHeader">
                  <h2>Why This Matters</h2>
                </div>
                <div className="copyStack">
                  {whyItMatters.map((paragraph) => (
                    <p key={paragraph} style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* How It Works — bento-style grid matching the design */}
              <div>
                <h2 style={{
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "var(--primary-soft)",
                  marginBottom: "20px",
                }}>
                  How It Works
                </h2>

                <div className="howItWorksBento">
                  {/* First two steps as individual cards */}
                  {howItWorksCards.map((step, index) => (
                    <div className="howItWorksCard" key={step.title}>
                      <div className="howItWorksStepNum">{`0${index + 1}`}</div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px", color: "var(--ink)" }}>
                        {step.title}
                      </h3>
                      <p style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>{step.body}</p>
                    </div>
                  ))}

                  {/* Third step: full-width dark card with image */}
                  {howItWorksFull && (
                    <div className="howItWorksCard full">
                      <div>
                        <div className="howItWorksStepNum">03</div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "10px" }}>
                          {howItWorksFull.title}
                        </h3>
                        <p>{howItWorksFull.body}</p>
                      </div>
                      {/* Pull the third gallery image into this card if available */}
                      {gallery[2]?.trim() ? (
                        <div className="howItWorksCardMedia">
                          <img alt={howItWorksFull.title} src={gallery[2]} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery — "Regional Workshops" with square aspect tiles + hover scale */}
              {gallery.length > 0 && (
                <div>
                  <div className="sectionHeader split" style={{ marginBottom: "20px" }}>
                    <div>
                      <h2 style={{ fontSize: "1.9rem", fontWeight: 700, color: "var(--primary-soft)" }}>
                        Regional Workshops
                      </h2>
                    </div>
                    <Link className="sectionLink" href="/contact">
                      View All Events <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="galleryGrid">
                    {gallery.map((image) =>
                      image?.trim() ? (
                        <div className="galleryItem" key={image}>
                          <img alt={program.title} src={image} />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right column: sticky donation sidebar */}
            <aside className="detailSidebar">
              <div className="stickyPanel">
                {/* Custom sidebar card matching the design */}
                <div className="donationSidebarCard">
                  {/* Dark navy header */}
                  <div className="donationSidebarHeader">
                    <h4>Support This Program</h4>
                    <p>Your contribution directly funds professional counseling hours.</p>
                  </div>

                  <div className="donationSidebarBody">
                    {/* Amount selection */}
                    <div>
                      <div className="donationAmountLabel">Select Amount</div>
                      <div className="donationAmountGrid">
                        {(site.donationTiers ?? []).map((tier, i) => (
                          <button
                            key={tier.amount}
                            className={`donationAmountButton${i === 2 ? " active" : ""}`}
                          >
                            ₦{tier.amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      {/* Custom amount input */}
                      <div className="donationCustomInput">
                        <span>₦</span>
                        <input type="number" placeholder="Custom Amount" />
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="donationProgress">
                      <div className="donationProgressMeta">
                        <span>Program Progress</span>
                        <span>
                          {program.metadata.raised as string} / {program.metadata.goal as string}
                        </span>
                      </div>
                      <div className="donationProgressTrack">
                        <div
                          className="donationProgressFill"
                          style={{ width: `${program.metadata.progressPercent ?? 0}%` }}
                        />
                      </div>
                    </div>

                    {/* CTA button */}
                    <button className="donationSubmitBtn">
                      Complete Donation
                    </button>

                    {/* Payment logos */}
                    <div className="donationPaymentLogos">
                      <span>VISA</span>
                      <span>MC</span>
                      <span>PayPal</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/programs" />
    </>
  );
}
