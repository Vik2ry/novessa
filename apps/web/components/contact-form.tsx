"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

export function ContactForm() {
  const [status, setStatus] = useState("");

  async function submit(formData: FormData) {
    setStatus("Sending your message...");
    try {
      await postJson("/forms/contact/", {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
      });
      setStatus("Your message has been sent. We usually reply within 24 hours.");
    } catch {
      setStatus("We could not send your message. Please try again.");
    }
  }

  return (
    <form action={submit} className="stackForm">
      <div className="formGrid twoUp">
        <div className="field">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" placeholder="John Doe" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" placeholder="john@example.com" required type="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <select defaultValue="General Inquiry" id="subject" name="subject">
          <option>General Inquiry</option>
          <option>Volunteer Opportunities</option>
          <option>Donation Support</option>
          <option>Partnership Proposal</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Your Message</label>
        <textarea id="message" name="message" placeholder="Tell us how we can help..." required />
      </div>
      <div className="formActions">
        <button className="button buttonPrimary" type="submit">
          Submit Message
        </button>
        <p className="formMeta">{status || "Average response time: 24 hours."}</p>
      </div>
    </form>
  );
}
