import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="section">
        <div className="container">
          <div className="sectionTitle center">
            <h1>Terms and Conditions</h1>
            <p>Please read these terms carefully before using our website</p>
          </div>

          <div style={{ maxWidth: "900px", margin: "0 auto" }} className="copyStack">
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2>2. Use of Website</h2>
              <p>
                Novessa Foundation grants you a limited license to access and use this website for lawful purposes only.
                You agree not to use this website:
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>For any illegal purpose or in violation of any laws</li>
                <li>To harass, abuse, or harm any person or group</li>
                <li>To distribute viruses, malware, or any code of a destructive nature</li>
                <li>To infringe upon any intellectual property rights</li>
                <li>To spam or send unsolicited communications</li>
              </ul>
            </section>

            <section>
              <h2>3. Donations and Payments</h2>
              <p>
                Donations made through this website are voluntary gifts. All donations are final and non-refundable unless
                otherwise stated. By making a donation, you represent that you are authorized to make such contribution and
                that the funds are from a lawful source.
              </p>
              <p>
                Novessa Foundation partners with secure payment processors to handle all transactions. We do not store credit
                card information on our servers. All transaction information is encrypted and handled securely.
              </p>
            </section>

            <section>
              <h2>4. Intellectual Property Rights</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of Novessa
                Foundation and protected by international copyright laws. You may not reproduce, distribute, or transmit any
                content without prior written permission from Novessa Foundation.
              </p>
            </section>

            <section>
              <h2>5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Novessa Foundation shall not be liable for any indirect, incidental,
                special, or consequential damages arising from or related to your use of this website, even if we have been
                advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2>6. External Links</h2>
              <p>
                This website may contain links to external websites. Novessa Foundation is not responsible for the content,
                accuracy, or practices of external websites. Your access to external websites is at your own risk and subject
                to the terms and conditions of those websites.
              </p>
            </section>

            <section>
              <h2>7. Changes to Terms</h2>
              <p>
                Novessa Foundation reserves the right to modify these terms and conditions at any time. Changes will be
                effective immediately upon posting to the website. Your continued use of the website following the posting of
                changes constitutes your acceptance of those changes.
              </p>
            </section>

            <section>
              <h2>8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Nigeria, and you
                irrevocably submit to the exclusive jurisdiction of the courts located in Nigeria.
              </p>
            </section>

            <section>
              <h2>9. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
                <br />
                Email: hello@novessafoundation.org
                <br />
                Phone: +234 907 555 0144
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
