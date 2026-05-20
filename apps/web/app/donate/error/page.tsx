import Link from "next/link";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SearchProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getValue(value: string | string[] | undefined, fallback = "") {
  return Array.isArray(value) ? value[0] ?? fallback : value ?? fallback;
}

export default async function DonationErrorPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const reason = getValue(params.reason, "The transaction could not be completed.");

  return (
    <>
      <SiteHeader activeHref="/donate" />
      <main className="pageSurface">
        <section className="section">
          <div className="container centeredStack">
            <div className="errorStateCard">
              <div className="successIcon error">
                <AlertCircle size={28} />
              </div>
              <p className="eyebrow">Transaction Declined</p>
              <h1>We could not complete your donation.</h1>
              <p>{reason.replace(/-/g, " ")}</p>
              <ul className="reasonList">
                <li>Insufficient funds or temporary bank restrictions.</li>
                <li>Payment session expired before completion.</li>
                <li>Bank verification or card authorization interrupted.</li>
              </ul>
              <div className="buttonRow centered">
                <Link className="button buttonPrimary" href="/donate">
                  <RefreshCcw size={16} /> Try Again
                </Link>
                <Link className="button buttonGhost" href="/contact">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/donate" />
    </>
  );
}
