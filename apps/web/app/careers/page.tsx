import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Briefcase, ArrowRight } from "lucide-react";

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="heroHeader compact">
          <div className="container">
            <div className="sectionTitle">
              <p className="eyebrow">Join Our Team</p>
              <h1>Careers at Novessa</h1>
              <p style={{ marginTop: "12px", color: "rgba(255, 255, 255, 0.84)" }}>
                Be part of a movement transforming communities through education, mental health, and empowerment.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                textAlign: "center",
                display: "grid",
                gap: "24px"
              }}
            >
              <div
                style={{
                  background: "var(--surface-low)",
                  border: "2px solid var(--surface-mid)",
                  borderRadius: "20px",
                  padding: "40px 24px",
                  display: "grid",
                  gap: "16px",
                  justifyItems: "center"
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    color: "var(--secondary)",
                    opacity: 0.5
                  }}
                >
                  <Briefcase size={60} />
                </div>
                <h2>No Open Positions at This Time</h2>
                <p style={{ color: "var(--ink-soft)", lineHeight: "1.8", maxWidth: "500px" }}>
                  We're not currently hiring, but we're always interested in hearing from talented individuals who share our passion for impact and community empowerment.
                </p>
                <div style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                  <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--primary)" }}>
                    Check back soon for new opportunities!
                  </p>
                  <a
                    href="mailto:careers@novessafoundation.org?subject=Career%20Inquiry"
                    className="button buttonGhost"
                  >
                    Express Your Interest
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
                <h3>Why Work With Us?</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px"
                  }}
                >
                  {[
                    {
                      title: "Mission-Driven",
                      desc: "Work towards meaningful social change in communities across Nigeria."
                    },
                    {
                      title: "Growing Team",
                      desc: "Join a passionate, collaborative team committed to excellence."
                    },
                    {
                      title: "Professional Growth",
                      desc: "Develop your skills and career while making a real difference."
                    },
                    {
                      title: "Flexible Environment",
                      desc: "We support work-life balance and professional development."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="trustPanel">
                      <strong style={{ color: "var(--primary)" }}>{item.title}</strong>
                      <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                display: "grid",
                gap: "24px"
              }}
            >
              <div>
                <h2 style={{ marginBottom: "16px" }}>Get in Touch</h2>
                <p style={{ color: "var(--ink-soft)", lineHeight: "1.8", marginBottom: "16px" }}>
                  Interested in contributing to Novessa's mission? Reach out to us directly—whether you're looking for employment or want to explore partnership opportunities.
                </p>
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--line)",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "grid",
                    gap: "12px"
                  }}
                >
                  <div>
                    <strong style={{ color: "var(--primary)", fontSize: "0.9rem", textTransform: "uppercase" }}>
                      Email
                    </strong>
                    <a
                      href="mailto:careers@novessafoundation.org"
                      style={{
                        color: "var(--primary)",
                        fontWeight: "600",
                        textDecoration: "underline"
                      }}
                    >
                      careers@novessafoundation.org
                    </a>
                  </div>
                  <div>
                    <strong style={{ color: "var(--primary)", fontSize: "0.9rem", textTransform: "uppercase" }}>
                      Phone
                    </strong>
                    <p>+234 907 555 0144</p>
                  </div>
                </div>
              </div>

              <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ marginBottom: "12px" }}>Volunteer Opportunities</h3>
                <p style={{ color: "var(--ink-soft)", lineHeight: "1.8", marginBottom: "16px" }}>
                  If you're not ready for a full-time role but still want to contribute, consider volunteering with us! We offer various volunteer roles across our programs.
                </p>
                <a href="/volunteer" className="button buttonPrimary">
                  Explore Volunteering
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
