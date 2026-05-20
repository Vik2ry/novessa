import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { DonationForm } from "@/components/donation-form";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ProgramCard } from "@/components/program-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteIcon } from "@/components/site-icon";
import { StoryCard } from "@/components/story-card";
import { getSitePayload } from "@/lib/api";

export default async function Home() {
  const site = await getSitePayload();
  const featuredStory = site.stories[0];
  const donationCampaign = site.campaigns[0];

  return (
    <>
      <SiteHeader activeHref="/" />
      <main className="pageSurface">
        <section className="heroSplit homeHero">
          <div className="heroMedia">
            <img
              alt="Students and community members supported by Novessa Foundation"
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80"
            />
          </div>
          <div className="heroPanel dark">
            <p className="eyebrow">{site.hero.eyebrow}</p>
            <h1>{site.hero.title}</h1>
            <p>{site.hero.summary}</p>
            <div className="buttonRow">
              <Link className="button buttonAccent" href={site.hero.primaryAction?.href ?? "/donate"}>
                {site.hero.primaryAction?.label ?? "Donate Now"}
              </Link>
              <Link className="button buttonOutlineLight" href={site.hero.secondaryAction?.href ?? "/about"}>
                {site.hero.secondaryAction?.label ?? "Learn Our Story"}
              </Link>
            </div>
          </div>
        </section>

        <section className="statBand dark">
          <div className="container statGrid">
            {site.impactMetrics.map((metric) => (
              <article className="statItem" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHeader centered">
              <h2>Why Novessa?</h2>
              <p>Professional stewardship, human-centred care, and measurable action.</p>
            </div>
            <div className="infoGrid threeUp">
              {site.trustPillars.map((item) => (
                <article className="panel trustPanel" key={item.title}>
                  <div className="trustIcon">
                    <SiteIcon name={item.icon as "shield-check" | "wallet" | "gauge"} size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="sectionHeader split">
              <div>
                <p className="eyebrow">Our Programs</p>
                <h2>Strategic initiatives creating sustainable change.</h2>
              </div>
              <Link className="sectionLink" href="/programs">
                View All Programs <ArrowRight size={16} />
              </Link>
            </div>
            <div className="programGrid">
              {site.programs.slice(0, 3).map((program) => (
                <ProgramCard item={program} key={program.slug} />
              ))}
            </div>
          </div>
        </section>

        {featuredStory ? (
          <section className="section">
            <div className="container featureGrid">
              <div className="featureArt" />
              <article className="featureStoryCard">
                <p className="eyebrow">Success Story</p>
                <h2>{featuredStory.title}</h2>
                <p>{featuredStory.summary}</p>
                <Link className="button buttonLight" href={`/blog/${featuredStory.slug}`}>
                  Read Full Impact Story
                </Link>
              </article>
            </div>
          </section>
        ) : null}

        <section className="section donateZone">
          <div className="container">
            <DonationForm campaignSlug={donationCampaign?.slug ?? "community-care-fund"} tiers={site.donationTiers} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHeader centered">
              <h2>Voices of Impact</h2>
              <p>What supporters, families, and community partners say about the work.</p>
            </div>
            <div className="quoteGrid">
              {[
                "Novessa is creating the kind of mental health awareness our communities have needed for years.",
                "The education work is practical, transparent, and rooted in what families actually need.",
                "Their programs make it easier for people to seek support without shame or silence."
              ].map((quote) => (
                <blockquote className="quoteCard" key={quote}>
                  <HeartHandshake size={18} />
                  <p>{quote}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHeader split">
              <div>
                <p className="eyebrow">Stories & News</p>
                <h2>Follow the work on the ground.</h2>
              </div>
              <Link className="sectionLink" href="/blog">
                Visit the blog <ArrowRight size={16} />
              </Link>
            </div>
            <div className="storyGrid">
              {site.stories.slice(0, 3).map((story) => (
                <StoryCard item={story} key={story.slug} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter variant="light" />
      <MobileBottomNav activeHref="/" />
    </>
  );
}
