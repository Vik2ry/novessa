"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");
    try {
      const response = await postJson<{ message: string }>("/forms/newsletter/", {
        email,
        source: compact ? "footer" : "page",
        preferences: { updates: true }
      });
      setStatus(response.message);
      setEmail("");
    } catch {
      setStatus("We could not save your email. Please try again.");
    }
  }

  return (
    <form className={compact ? "newsletterForm compact" : "newsletterForm"} onSubmit={submit}>
      <div className="newsletterFields">
        <input
          aria-label="Email address"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          type="email"
          value={email}
          required
        />
        <button className="button buttonPrimary" type="submit">
          Subscribe
        </button>
      </div>
      <p className="formMeta">{status || "Monthly stories, impact updates, and ways to help."}</p>
    </form>
  );
}
