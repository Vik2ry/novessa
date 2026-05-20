import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function VolunteerSuccessPage() {
  return (
    <>
      <SiteHeader activeHref="/volunteer" />
      <main className="pageSurface">
        <section className="section">
          <div className="container centeredStack">
            <div className="successStateCard">
              <div className="successIcon">
                <CheckCircle2 size={28} />
              </div>
              <p className="eyebrow">Application Received</p>
              <h1>Thank you for stepping in.</h1>
              <p>
                Your volunteer application has been received. Our team will review your interests and follow up by
                email with the next steps.
              </p>
              <ul className="reasonList">
                <li>Application review and role matching.</li>
                <li>Follow-up email from our team.</li>
                <li>Orientation details where relevant.</li>
              </ul>
              <div className="buttonRow centered">
                <Link className="button buttonPrimary" href="/volunteer">
                  Back to Volunteer
                </Link>
                <Link className="button buttonGhost" href="/">
                  Back Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/volunteer" />
    </>
  );
}
