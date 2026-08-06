import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FileText, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Annual Reports & Documentation | Novessa Foundation",
  description:
    "Access Novessa Foundation's annual reports, financial audits, and governance documents for full transparency and accountability.",
  alternates: { canonical: "/reports" },
  openGraph: {
    title: "Annual Reports & Documentation | Novessa Foundation",
    description:
      "Access Novessa Foundation's annual reports, financial audits, and governance documents for full transparency and accountability.",
    url: "/reports"
  }
};

// TODO(backend): these four reports are still hardcoded here because there is no
// Report model/media library on the Django backend yet. Until real PDF files are
// uploaded and served from the API, each "Download" button opens a pre-filled
// email request instead of a dead "#" link, so nothing on this page is a broken link.
export default function ReportsPage() {
  const reportsEmail = "hello@novessafoundation.org";
  const reports = [
    {
      title: "2023 Annual Impact Report",
      description: "Comprehensive overview of our programs, reach, and impact in 2023.",
      size: "4.2 MB",
      date: "December 2023"
    },
    {
      title: "Q4 2023 Financial Audit",
      description: "Audited financial statements and detailed breakdown of fund allocation.",
      size: "2.8 MB",
      date: "January 2024"
    },
    {
      title: "Governance & Ethical Guidelines",
      description: "Our organizational structure, policies, and ethical standards.",
      size: "1.5 MB",
      date: "Ongoing"
    },
    {
      title: "2024 Mid-Year Progress Report",
      description: "Achievements and milestones from January to June 2024.",
      size: "3.1 MB",
      date: "July 2024"
    }
  ].map((report) => ({
    ...report,
    downloadUrl: `mailto:${reportsEmail}?subject=${encodeURIComponent(
      `Request: ${report.title}`
    )}&body=${encodeURIComponent(`Hi Novessa team, could you send me a copy of the "${report.title}"? Thank you.`)}`
  }));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="heroHeader light">
          <div className="container">
            <div className="sectionTitle">
              <p className="eyebrow">Transparency & Accountability</p>
              <h1>Annual Reports & Documentation</h1>
              <p style={{ marginTop: "12px", color: "var(--ink-soft)", maxWidth: "600px" }}>
                At Novessa Foundation, we believe in full accountability. Download our annual reports, financial audits, and governance documents to see exactly how your support creates impact.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ display: "grid", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
              {reports.map((report, idx) => (
                <div
                  key={idx}
                  className="panel"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: "20px",
                    alignItems: "center"
                  }}
                >
                  <div style={{ color: "var(--primary)", fontSize: "2rem" }}>
                    <FileText size={40} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: "6px" }}>{report.title}</h3>
                    <p style={{ fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "8px" }}>
                      {report.description}
                    </p>
                    <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--ink-soft)" }}>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                  <a
                    href={report.downloadUrl}
                    className="button buttonPrimary"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <Download size={18} />
                    Request Copy
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                textAlign: "center",
                display: "grid",
                gap: "16px"
              }}
            >
              <h2>Our Commitment to Transparency</h2>
              <p style={{ color: "var(--ink-soft)", lineHeight: "1.8" }}>
                We believe that transparency builds trust. Every year, we publish detailed reports on our programs, finances, and impact. Our work is independently audited, and we maintain the highest standards of governance and accountability.
              </p>
              <p style={{ color: "var(--ink-soft)", lineHeight: "1.8" }}>
                If you have questions about our reports or would like additional information, please contact us at{" "}
                <a href="mailto:hello@novessafoundation.org" style={{ color: "var(--primary)", fontWeight: "600" }}>
                  hello@novessafoundation.org
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
