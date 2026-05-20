import Link from "next/link";
import { CheckCircle2, Download, Share2 } from "lucide-react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDonation } from "@/lib/api";

type SearchProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getValue(value: string | string[] | undefined, fallback = "") {
  return Array.isArray(value) ? value[0] ?? fallback : value ?? fallback;
}

export default async function DonationSuccessPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const reference = getValue(params.reference);
  const donation = reference ? await getDonation(reference) : null;
  const donorName = typeof donation?.donorName === "string" && donation.donorName ? donation.donorName : "Friend";
  const amount = typeof donation?.amountDisplay === "string" ? donation.amountDisplay : "NGN 15,000.00";

  return (
    <>
      <SiteHeader activeHref="/donate" />
      <main className="pageSurface">
        <section className="section">
          <div className="container centeredStack">
            <div className="successStateCard">
              <div className="successIcon">
                <CheckCircle2 size={28} />
              </div>
              <p className="eyebrow">Donation Confirmed</p>
              <h1>Thank you, {donorName}.</h1>
              <p>Your generosity is helping fund counseling, scholarships, and community-led support right now.</p>
              <div className="summaryRows">
                <div>
                  <span>Donation reference</span>
                  <strong>{reference || "pending"}</strong>
                </div>
                <div>
                  <span>Total amount</span>
                  <strong>{amount}</strong>
                </div>
              </div>
              <div className="buttonRow centered">
                <a className="button buttonGhost" href="/">
                  <Download size={16} /> Download Receipt
                </a>
                <a className="button buttonLight" href="/">
                  <Share2 size={16} /> Share
                </a>
              </div>
              <Link className="button buttonPrimary" href="/impact">
                See where your money goes
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/donate" />
    </>
  );
}
