import { BadgeCheck, CircleDot, HeartHandshake, Target } from "lucide-react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To empower individuals and communities by promoting mental wellbeing and expanding access to quality education."
  },
  {
    icon: HeartHandshake,
    title: "Our Vision",
    body: "Inclusive, thriving communities where youth, women, and vulnerable groups can lead, innovate, and flourish."
  },
  {
    icon: BadgeCheck,
    title: "Our Values",
    body: "Empathy, transparency, and reliable follow-through shape every program, partnership, and decision."
  }
];

const milestones = [
  {
    year: "2026",
    title: "The Foundation Begins",
    body: "Novessa launched to confront the silence, stigma, and misinformation surrounding mental health in Nigeria."
  },
  {
    year: "2027",
    title: "First Community Circles",
    body: "Awareness sessions and caregiver conversations expanded into schools, churches, and local neighborhoods."
  },
  {
    year: "2028",
    title: "Education Partnerships",
    body: "Scholarship and mentoring support began linking mental wellbeing work to practical opportunity."
  }
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader activeHref="/about" />
      <main className="pageSurface">
        <section className="heroBanner dark">
          <div className="heroBackdrop">
            <img
              alt="Novessa Foundation community workshop"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80"
            />
          </div>
          <div className="container heroBannerContent centered">
            <p className="eyebrow">About Us</p>
            <h1>Novessa Empowerment Foundation</h1>
            <p>
              Transforming lives through mental health advocacy, education, community development, and empowerment initiatives across Nigeria.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="contentBlock">
              <h2>Who We Are</h2>
              <p>
                Novessa Empowerment Foundation is a non-profit organization dedicated to transforming lives through mental health advocacy, education, community development, and empowerment initiatives across Nigeria. We believe that every individual deserves the opportunity to thrive, regardless of their background, circumstances, or challenges.
              </p>
              <p>
                Founded with a passion for creating positive social impact, our foundation works to address critical issues affecting vulnerable individuals and communities, particularly in the areas of mental health awareness, youth development, educational support, and social inclusion. Through outreach programs, advocacy campaigns, training workshops, and strategic partnerships, we strive to break barriers, reduce stigma, and provide practical support that empowers people to reach their full potential.
              </p>
              <p>
                At Novessa Empowerment Foundation, we recognize that mental well-being is essential to personal and community growth. Mental health challenges remain highly stigmatized across many communities, limiting access to support and care. Our work is therefore focused on raising awareness, promoting mental health literacy, encouraging early intervention, and connecting individuals with appropriate resources and support systems. These approaches align with broader efforts by mental health organizations across Nigeria and Africa to improve awareness, reduce stigma, and strengthen community support systems.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="infoGrid threeUp">
              {values.map((item) => {
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
          <div className="container">
            <div className="sectionHeader centered">
              <h2>Our Journey</h2>
              <p>A community-rooted mission growing into a wider movement for resilience, understanding, and access.</p>
            </div>
            <div className="timeline">
              {milestones.map((item) => (
                <article className="timelineItem" key={item.year}>
                  <div className="timelineMarker">
                    <CircleDot size={18} />
                  </div>
                  <div className="timelineCard">
                    <span>{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container splitShowcase">
            <div className="leadershipCard dark">
              <img
                alt="Samson Adedeji"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
              />
              <div>
                <p className="eyebrow">Founder & Executive Director</p>
                <h2>Samson Adedeji</h2>
                <p>
                  Samson is a health and social care professional currently gaining clinical exposure within ADHD and
                  Autism services, with a strong interest in mental health nursing and person-centred care.
                </p>
              </div>
            </div>
            <div className="documentPanel">
              <div className="sectionHeader">
                <p className="eyebrow">Transparency</p>
                <h2>Trust is part of the work.</h2>
              </div>
              <div className="documentList">
                <a href="/reports">2023 Annual Impact Report</a>
                <a href="/reports">Q4 Financial Audit</a>
                <a href="/reports">Governance & Ethical Guidelines</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/about" />
    </>
  );
}
