import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="section">
        <div className="container">
          <div className="sectionTitle center">
            <h1>Privacy Policy</h1>
            <p>How we collect, use, and protect your information</p>
          </div>

          <div style={{ maxWidth: "900px", margin: "0 auto" }} className="copyStack">
            <section>
              <h2>1. Introduction</h2>
              <p>
                Novessa Foundation ("we," "us," or "our") is committed to protecting your privacy and ensuring you have a
                positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                We collect information you provide directly to us, such as:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Name and contact information (email, phone, address)</li>
                <li>Donation and payment information (processed securely by third-party providers)</li>
                <li>Volunteer application details</li>
                <li>Newsletter subscription preferences</li>
                <li>Comments, messages, or feedback you submit</li>
              </ul>

              <h3>Automatic Information</h3>
              <p>
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Browser type and version</li>
                <li>IP address</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring URL</li>
              </ul>
              <p>
                This information helps us understand how visitors use our website and improve our services.
              </p>
            </section>

            <section>
              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Process donations and provide donation receipts</li>
                <li>Send newsletters and updates (only if you opt-in)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website, programs, and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
                <li>Analyze website usage and trends</li>
              </ul>
            </section>

            <section>
              <h2>4. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share information with:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li><strong>Payment Processors:</strong> Secure third-party providers to process donations (Paystack, Stripe, PayPal)</li>
                <li><strong>Service Providers:</strong> Email service providers, hosting providers, and analytics platforms</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Trusted Partners:</strong> Organizations working with us on joint initiatives (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2>5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>SSL encryption for all data transmission</li>
                <li>Secure password policies</li>
                <li>Regular security audits</li>
                <li>Limited access to personal information</li>
              </ul>
              <p>
                However, no method of transmission over the internet is completely secure. We cannot guarantee absolute security of your information.
              </p>
            </section>

            <section>
              <h2>6. Cookies and Tracking</h2>
              <p>
                Our website may use cookies to enhance your experience. Cookies are small text files stored on your device that help us:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Improve our services</li>
              </ul>
              <p>
                You can control cookie settings through your browser. Disabling cookies may affect your website experience.
              </p>
            </section>

            <section>
              <h2>7. Your Privacy Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, contact us at hello@novessafoundation.org.
              </p>
            </section>

            <section>
              <h2>8. Children's Privacy</h2>
              <p>
                This website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information immediately.
              </p>
            </section>

            <section>
              <h2>9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. This Privacy Policy does not apply to external websites. We recommend reviewing the privacy policies of those websites before providing any personal information.
              </p>
            </section>

            <section>
              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be effective immediately upon posting. Your continued use of the website constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2>11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
                <br />
                Email: hello@novessafoundation.org
                <br />
                Phone: +234 907 555 0144
                <br />
                Address: Lagos, Nigeria
              </p>
            </section>

            <p style={{ marginTop: "40px", fontSize: "0.9rem", color: "var(--ink-soft)" }}>
              Last updated: May 2026
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
