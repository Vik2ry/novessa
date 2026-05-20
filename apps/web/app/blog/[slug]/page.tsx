import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { NewsletterForm } from "@/components/newsletter-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoryCard } from "@/components/story-card";
import { getContentItem, getSitePayload } from "@/lib/api";

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, story] = await Promise.all([getSitePayload(), getContentItem("story", slug)]);

  if (!story) {
    notFound();
  }

  const article = (story.metadata.article as string[] | undefined) ?? [story.body];
  const stats = (story.metadata.stats as { label: string; value: string }[] | undefined) ?? [];
  const relatedSlugs = (story.metadata.relatedSlugs as string[] | undefined) ?? [];
  const relatedStories = site.stories.filter((item) => relatedSlugs.includes(item.slug));

  return (
    <>
      <SiteHeader activeHref="/blog" />
      <main className="pageSurface">
        <section className="storyHero">
          <div className="container storyHeroShell">
            <p className="eyebrow">{story.category}</p>
            <h1>{story.title}</h1>
            <p>{story.summary}</p>
            <div className="authorMeta">
              <span>{String(story.metadata.authorName ?? "Novessa Team")}</span>
              <span>{String(story.metadata.authorRole ?? "Impact Story")}</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container storyDetailGrid">
            <article className="storyBodyPanel">
              {story.imageUrl?.trim() ? (
                <img alt={story.title} className="storyLeadImage" src={story.imageUrl} />
              ) : null}
              <div className="copyStack">
                {article.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {story.metadata.pullQuote ? <blockquote>{String(story.metadata.pullQuote)}</blockquote> : null}
            </article>

            <aside className="storySidebar">
              <div className="panel sidebarPanel">
                <h2>Impact Pulse</h2>
                <div className="metricList">
                  {stats.map((stat) => (
                    <div className="metricListRow" key={stat.label}>
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>
                <Link className="button buttonPrimary buttonFull" href="/donate">
                  Sponsor a Student <ArrowRight size={16} />
                </Link>
              </div>

              <div className="panel sidebarPanel">
                <p className="eyebrow">Join the Circle</p>
                <h3>Get our monthly impact stories first.</h3>
                <NewsletterForm />
              </div>
            </aside>
          </div>
        </section>

        {relatedStories.length ? (
          <section className="section alt">
            <div className="container">
              <div className="sectionHeader split">
                <div>
                  <p className="eyebrow">Related Stories</p>
                  <h2>More field notes and outcomes from the work.</h2>
                </div>
              </div>
              <div className="storyGrid">
                {relatedStories.map((item) => (
                  <StoryCard compact item={item} key={item.slug} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/blog" />
    </>
  );
}
