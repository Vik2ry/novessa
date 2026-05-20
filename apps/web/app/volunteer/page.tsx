import { BriefcaseBusiness, HeartHandshake, Users } from "lucide-react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VolunteerForm } from "@/components/volunteer-form";

const opportunities = [
  {
    icon: Users,
    title: "Mentoring",
    body: "Guide young people through study support, confidence building, and practical next steps."
  },
  {
    icon: HeartHandshake,
    title: "Outreach",
    body: "Support awareness sessions, field coordination, and safe-space programming."
  },
  {
    icon: BriefcaseBusiness,
    title: "Admin",
    body: "Help with communications, operations, scheduling, and program documentation."
  }
];

export default function VolunteerPage() {
  return (
    <>
      <SiteHeader activeHref="/volunteer" />
      <main className="pageSurface">
        <section className="heroSplit volunteerHero">
          <div className="heroMedia dimmed">
            <img
              alt="Volunteers working together"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80"
            />
          </div>
          <div className="heroPanel dark">
            <p className="eyebrow">Join the Movement</p>
            <h1>Your talent is the engine of our collective change.</h1>
            <p>
              We welcome volunteers across mental health advocacy, community education, outreach, partnerships, and
              operations support.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHeader centered">
              <h2>Available Opportunities</h2>
              <p>Discover where your skills can create the greatest local impact.</p>
            </div>
            <div className="infoGrid threeUp">
              {opportunities.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="panel trustPanel" key={item.title}>
                    <div className="trustIcon">
                      <Icon size={24} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container volunteerFormLayout">
            <div className="volunteerChecklist">
              <p className="eyebrow">Make an Impact</p>
              <h2>Ready to volunteer with Novessa?</h2>
              <ul>
                <li>Compassionate, practical support for communities.</li>
                <li>Thoughtful role matching based on your interests and schedule.</li>
                <li>A human review process with follow-up by email.</li>
              </ul>
            </div>
            <div className="formPanel">
              <h2>Volunteer Application</h2>
              <VolunteerForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/volunteer" />
    </>
  );
}
