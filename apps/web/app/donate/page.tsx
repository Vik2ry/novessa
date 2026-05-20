import { CheckCircle2, LockKeyhole, Repeat2 } from "lucide-react";
import { DonationForm } from "@/components/donation-form";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSitePayload } from "@/lib/api";

export default async function DonatePage() {
  const site = await getSitePayload();
  const campaign = site.campaigns[0];
  const monthlyPlans = (campaign?.metadata.monthlyPlans as
    | { name: string; amount: number; description: string }[]
    | undefined) ?? [];

  return (
    <>
      <SiteHeader activeHref="/donate" />
      <main className="pageSurface">
        <section className="heroSplit donateHero">
          <div className="heroMedia">
            <img
              alt="Young girl supported by Novessa Foundation"
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1800&q=80"
            />
          </div>
          <div className="heroPanel deepGreen">
            <p className="eyebrow">Impact First</p>
            <h1>Give Once. Change Forever.</h1>
            <p>
              Your contribution supports mental wellbeing, education access, and practical care pathways across
              Nigeria.
            </p>
            <div className="tagRow">
              <span><CheckCircle2 size={14} /> Tax Deductible</span>
              <span><LockKeyhole size={14} /> Secure Encryption</span>
              <span><Repeat2 size={14} /> Monthly Giving Available</span>
            </div>
          </div>
        </section>

        <section className="section donateZone">
          <div className="container">
            <DonationForm campaignSlug={campaign?.slug ?? "community-care-fund"} tiers={site.donationTiers} />
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="sectionHeader centered">
              <h2>Become a Monthly Hero</h2>
              <p>Consistent support helps us sustain long-term care, scholarships, and community-led follow-up.</p>
            </div>
            <div className="infoGrid threeUp">
              {monthlyPlans.map((plan) => (
                <article className="planCard" key={plan.name}>
                  <p className="eyebrow">{plan.name}</p>
                  <h3>N{plan.amount.toLocaleString()} / mo</h3>
                  <p>{plan.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/donate" />
    </>
  );
}
