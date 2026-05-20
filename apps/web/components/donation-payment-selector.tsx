"use client";

import { ArrowRight, Building2, CreditCard, Landmark, WalletCards } from "lucide-react";
import { useState } from "react";

const methods = [
  {
    id: "card",
    label: "Credit or Debit Card",
    detail: "Visa, Mastercard, and Verve through Paystack.",
    icon: CreditCard
  },
  {
    id: "bank",
    label: "Bank Transfer",
    detail: "Direct transfer using your secure donation reference.",
    icon: Landmark
  },
  {
    id: "wallet",
    label: "Digital Wallet",
    detail: "Compatible methods available within the Paystack flow.",
    icon: WalletCards
  },
  {
    id: "corporate",
    label: "Corporate Payment",
    detail: "Best for organizations processing larger gifts.",
    icon: Building2
  }
] as const;

export function DonationPaymentSelector({
  checkoutUrl,
  summaryLine,
  impactLine
}: {
  checkoutUrl: string;
  summaryLine: string;
  impactLine: string;
}) {
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("card");

  return (
    <div className="paymentFlowGrid">
      <section className="panel">
        <div className="sectionCopy">
          <p className="eyebrow">Donation Flow</p>
          <h1>Select Payment Method</h1>
          <p>Choose your preferred route to complete a secure donation.</p>
        </div>

        <div className="paymentMethodList">
          {methods.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={method === item.id ? "paymentMethod active" : "paymentMethod"}
                key={item.id}
                onClick={() => setMethod(item.id)}
                type="button"
              >
                <div className="paymentMethodIcon">
                  <Icon size={18} />
                </div>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.detail}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="panel summaryPanel">
        <h2>Donation Summary</h2>
        <div className="summaryRows">
          <div>
            <span>Support Type</span>
            <strong>{summaryLine}</strong>
          </div>
          <div>
            <span>Impact</span>
            <strong>{impactLine}</strong>
          </div>
        </div>
        <a className="button buttonPrimary buttonFull" href={checkoutUrl}>
          Continue to Payment <ArrowRight size={16} />
        </a>
        <p className="formMeta">Your secure checkout is processed by Paystack using an encrypted session.</p>
      </aside>
    </div>
  );
}
