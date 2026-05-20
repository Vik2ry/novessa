"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postJson } from "@/lib/api";

const roles = [
  "Community Outreach",
  "Education Mentoring",
  "Mental Health Advocacy",
  "Events and Logistics",
  "Content and Storytelling",
  "Partnerships and Fundraising"
];

const availabilityOptions = ["Weekdays", "Weekends", "Mornings", "Afternoons"];

export function VolunteerForm() {
  const router = useRouter();
  const [availability, setAvailability] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  function toggleAvailability(value: string) {
    setAvailability((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  async function submit(formData: FormData) {
    setStatus("Sending your application...");
    try {
      await postJson("/forms/volunteer/", {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        roleInterest: formData.get("roleInterest"),
        location: formData.get("location"),
        message: formData.get("message"),
        availability
      });
      router.push("/volunteer/success");
    } catch {
      setStatus("We could not submit your application. Please try again.");
    }
  }

  return (
    <form action={submit} className="stackForm">
      <div className="formGrid twoUp">
        <div className="field">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" required type="email" />
        </div>
      </div>

      <div className="formGrid twoUp">
        <div className="field">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" />
        </div>
        <div className="field">
          <label htmlFor="roleInterest">Area of Interest</label>
          <select id="roleInterest" name="roleInterest">
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="location">Location</label>
        <input id="location" name="location" placeholder="City, state, or region" />
      </div>

      <div className="field">
        <label>Availability</label>
        <div className="availabilityGrid">
          {availabilityOptions.map((option) => (
            <label className="availabilityOption" key={option}>
              <input
                checked={availability.includes(option)}
                onChange={() => toggleAvailability(option)}
                type="checkbox"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Why would you like to volunteer?</label>
        <textarea id="message" name="message" placeholder="Tell us what you care about and how you would like to help." />
      </div>

      <div className="formActions">
        <button className="button buttonPrimary" type="submit">
          Submit Application
        </button>
        <p className="formMeta">{status || "We review every application with care and follow up by email."}</p>
      </div>
    </form>
  );
}
