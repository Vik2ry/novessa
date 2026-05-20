"use client";

import { Heart, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { postJson, type DonationTier } from "@/lib/api";

type DonationResponse = {
  reference: string;
  checkoutUrl: string;
};

const frequencies = ["One-time", "Monthly"] as const;

export function DonationForm({
  tiers,
  campaignSlug
}: {
  tiers: DonationTier[];
  campaignSlug: string;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(tiers[1]?.amount ?? tiers[0]?.amount ?? 15000);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [frequency, setFrequency] = useState<(typeof frequencies)[number]>("One-time");
  const [status, setStatus] = useState("");

  const selectedAmount = useMemo(() => {
    const custom = Number(customAmount);
    return custom > 0 ? custom : amount;
  }, [amount, customAmount]);

  const impactText =
    tiers.find((tier) => tier.amount === amount)?.impact ?? `${selectedAmount.toLocaleString()} toward practical support.`;

  async function submit() {
    setStatus("Preparing your secure donation flow...");
    try {
      const response = await postJson<DonationResponse>("/donations/", {
        amountMinor: selectedAmount * 100,
        donorName,
        donorEmail,
        currency,
        campaignSlug,
        provider: "paystack",
        metadata: {
          frequency,
          customAmount: customAmount || null,
          selectedTier: tiers.find((tier) => tier.amount === amount)?.label ?? "Custom",
          messageToDonor: impactText,
          sourcePage: "/donate"
        }
      });
      const search = new URLSearchParams({
        reference: response.reference,
        amount: String(selectedAmount),
        currency,
        frequency,
        donorName,
        impact: impactText
      });
      router.push(`/donate/payment?${search.toString()}`);
    } catch {
      setStatus("We could not start the donation flow. Please try again.");
    }
  }

  return (
    <div className="donationWizardCard">
      <div className="wizardStepper">
        {["Amount", "Program", "Details", "Payment"].map((step, index) => (
          <div className="wizardStep" key={step}>
            <div className={index === 0 ? "wizardStepDot active" : "wizardStepDot"}>{index + 1}</div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <form action={submit} className="stackForm">
        <div className="sectionCopy centered">
          <p className="eyebrow">Make an Immediate Difference</p>
          <h2>Select your gift amount</h2>
          <p>Choose how you want to show up for communities today.</p>
        </div>

        <div className="toggleRow">
          {frequencies.map((item) => (
            <button
              className={frequency === item ? "toggleButton active" : "toggleButton"}
              key={item}
              onClick={() => setFrequency(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="formGrid twoUp">
          <div className="field">
            <label htmlFor="currency">Currency</label>
            <select id="currency" name="currency" onChange={(event) => setCurrency(event.target.value)} value={currency}>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="USD">USD - US Dollar</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="customAmount">Custom Amount</label>
            <input
              id="customAmount"
              inputMode="numeric"
              onChange={(event) => setCustomAmount(event.target.value)}
              placeholder="Enter amount"
              value={customAmount}
            />
          </div>
        </div>

        <div className="tierGrid">
          {tiers.map((tier) => (
            <button
              className={customAmount ? "tierCard" : amount === tier.amount ? "tierCard active" : "tierCard"}
              key={tier.amount}
              onClick={() => {
                setCustomAmount("");
                setAmount(tier.amount);
              }}
              type="button"
            >
              <strong>N{tier.amount.toLocaleString()}</strong>
              <span>{tier.impact}</span>
            </button>
          ))}
        </div>

        <div className="impactNote">
          <Heart size={18} />
          <span>
            Your <strong>N{selectedAmount.toLocaleString()}</strong> gift helps us {impactText.toLowerCase()}.
          </span>
        </div>

        <div className="formGrid twoUp">
          <div className="field">
            <label htmlFor="donorName">Full Name</label>
            <input id="donorName" onChange={(event) => setDonorName(event.target.value)} required value={donorName} />
          </div>
          <div className="field">
            <label htmlFor="donorEmail">Email Address</label>
            <input
              id="donorEmail"
              onChange={(event) => setDonorEmail(event.target.value)}
              required
              type="email"
              value={donorEmail}
            />
          </div>
        </div>

        <div className="formActions end">
          <p className="formMeta">
            {status || (
              <>
                <ShieldCheck size={14} /> Secure transaction processed through Paystack.
              </>
            )}
          </p>
          <button className="button buttonPrimary" type="submit">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
