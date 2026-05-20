import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoryCard } from "@/components/story-card";
import { getSitePayload } from "@/lib/api";

export default async function ImpactPage() {
  const site = await getSitePayload();
  const maxGrowth = Math.max(...site.dashboard.growth.map((point) => point.value));

  return (
    <>
      <SiteHeader activeHref="/impact" />
      <main className="pageSurface">
        <section className="heroHeader light">
          <div className="container">
            <p className="eyebrow">Impact Dashboard</p>
            <h1>Foundation Transparency Dashboard</h1>
            <p>Trace the direction of resources, outcomes, and stories across our programs in Nigeria.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="metricGrid">
              {site.dashboard.totals.map((metric) => (
                <article className="metricTile" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </article>
              ))}
            </div>

            <div className="dashboardSplit">
              <article className="panel chartPanel">
                <div className="panelHeader">
                  <h2>Donation Growth</h2>
                </div>
                <div className="barChart">
                  {site.dashboard.growth.map((point) => (
                    <div className="barChartItem" key={point.month}>
                      <div className="barChartTrack">
                        <div className="barChartFill" style={{ height: `${(point.value / maxGrowth) * 100}%` }} />
                      </div>
                      <span>{point.month}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel regionPanel">
                <div className="panelHeader">
                  <h2>Geographic Impact</h2>
                </div>
                <div className="regionList">
                  {site.dashboard.regions.map((region) => (
                    <div className="regionRow" key={region.label}>
                      <span>{region.label}</span>
                      <strong>{region.value}%</strong>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="sectionHeader split">
              <div>
                <p className="eyebrow">Field Stories</p>
                <h2>Signals from the communities we serve.</h2>
              </div>
              <Link className="sectionLink" href="/blog">
                View All Stories <ArrowRight size={16} />
              </Link>
            </div>
            <div className="storyGrid">
              {site.stories.slice(0, 3).map((story) => (
                <StoryCard compact item={story} key={story.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="reportsPanel dark">
              <div className="sectionHeader">
                <p className="eyebrow">Reports & Transparency</p>
                <h2>Public documentation that keeps our stewardship visible.</h2>
              </div>
              <div className="documentList inverted">
                {site.dashboard.reports.map((report) => (
                  <a href="/reports" key={report.title}>
                    {report.title}
                    <span>{report.type}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/impact" />
    </>
  );
}
