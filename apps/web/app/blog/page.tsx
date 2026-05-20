import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { NewsletterForm } from "@/components/newsletter-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoryCard } from "@/components/story-card";
import { getSitePayload } from "@/lib/api";

export default async function BlogPage() {
  const site = await getSitePayload();
  const featured = site.stories[0];

  return (
    <>
      <SiteHeader activeHref="/blog" />
      <main className="pageSurface">
        <section className="heroHeader light">
          <div className="container">
            <p className="eyebrow">Stories & News</p>
            <h1>Stories of hope, momentum, and visible impact.</h1>
            <p>Follow the field work, donor stories, and practical signals of change as they unfold.</p>
          </div>
        </section>

        <section className="section">
          <div className="container blogLayout">
            <div className="blogMain">
              {featured ? (
                <article className="featuredStoryPanel">
                  <div className="featuredStoryMedia">
                    <img alt={featured.title} src={featured.imageUrl} />
                  </div>
                  <div className="featuredStoryBody">
                    <p className="eyebrow">Featured Story</p>
                    <h2>{featured.title}</h2>
                    <p>{featured.summary}</p>
                    <Link className="button buttonPrimary" href={`/blog/${featured.slug}`}>
                      Read Story <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ) : null}

              <div className="storyGrid full">
                {site.stories.slice(1).map((story) => (
                  <StoryCard item={story} key={story.slug} />
                ))}
              </div>
            </div>

            <aside className="blogSidebar">
              <div className="panel sidebarPanel">
                <p className="eyebrow">Stay Updated</p>
                <h3>Join our monthly impact digest.</h3>
                <NewsletterForm />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/blog" />
    </>
  );
}
