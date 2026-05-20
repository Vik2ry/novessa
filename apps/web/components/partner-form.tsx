"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

export function PartnerForm() {
  const [status, setStatus] = useState("");

  async function submit(formData: FormData) {
    setStatus("Sending your inquiry...");
    try {
      await postJson("/forms/partner/", {
        organizationName: formData.get("organizationName"),
        contactName: formData.get("contactName"),
        email: formData.get("email"),
        industry: formData.get("industry"),
        collaborationInterest: formData.get("collaborationInterest"),
        message: formData.get("message")
      });
      setStatus("Your inquiry has been received. Our partnerships team will follow up shortly.");
    } catch {
      setStatus("We could not send your inquiry. Please try again.");
    }
  }

  return (
    <form action={submit} className="stackForm">
      <div className="formGrid twoUp">
        <div className="field">
          <label htmlFor="organizationName">Organization Name</label>
          <input id="organizationName" name="organizationName" required />
        </div>
        <div className="field">
          <label htmlFor="contactName">Contact Name</label>
          <input id="contactName" name="contactName" required />
        </div>
      </div>
      <div className="formGrid twoUp">
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" required type="email" />
        </div>
        <div className="field">
          <label htmlFor="industry">Industry</label>
          <input id="industry" name="industry" placeholder="Finance, healthcare, technology..." />
        </div>
      </div>
      <div className="field">
        <label htmlFor="collaborationInterest">Collaboration Interest</label>
        <select defaultValue="Strategic Sponsorship" id="collaborationInterest" name="collaborationInterest">
          <option>Strategic Sponsorship</option>
          <option>Employee Engagement</option>
          <option>Program Co-delivery</option>
          <option>Financial Infrastructure</option>
          <option>Knowledge Sharing</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">How would you like to partner?</label>
        <textarea id="message" name="message" placeholder="Tell us about your goals, scope, and timing." />
      </div>
      <div className="formActions">
        <button className="button buttonPrimary" type="submit">
          Send Inquiry
        </button>
        <p className="formMeta">{status || "We usually respond within two business days."}</p>
      </div>
    </form>
  );
}
