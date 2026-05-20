import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { DonationPaymentSelector } from "@/components/donation-payment-selector";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDonation } from "@/lib/api";

type SearchProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getValue(value: string | string[] | undefined, fallback = "") {
  return Array.isArray(value) ? value[0] ?? fallback : value ?? fallback;
}

export default async function DonationPaymentPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const reference = getValue(params.reference);
  const amount = getValue(params.amount, "15000");
  const currency = getValue(params.currency, "NGN");
  const frequency = getValue(params.frequency, "One-time");
  const impact = getValue(params.impact, "support local programs");

  const donation = reference ? await getDonation(reference) : null;
  const checkoutUrl =
    typeof donation?.checkoutUrl === "string"
      ? donation.checkoutUrl
      : `/donate/error?reason=missing-checkout&reference=${reference}`;

  return (
    <>
      <SiteHeader activeHref="/donate" />
      <main className="pageSurface">
        <section className="section">
          <div className="container">
            <DonationPaymentSelector
              checkoutUrl={checkoutUrl}
              impactLine={impact}
              summaryLine={`${frequency} donation of ${currency} ${Number(amount).toLocaleString()}`}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/donate" />
    </>
  );
}
