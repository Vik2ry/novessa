import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ProgramCard } from "@/components/program-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSitePayload } from "@/lib/api";

export default async function ProgramsPage() {
  const site = await getSitePayload();
  const categories = ["All Programs", "Mental Health", "Education", "Skills", "Outreach"];

  return (
    <>
      <SiteHeader activeHref="/programs" />
      <main className="pageSurface">
        <section className="heroHeader dark compact">
          <div className="container">
            <p className="eyebrow">Programs</p>
            <h1>Our Strategic Initiatives</h1>
            <p>
              Sustainable programs designed to support wellbeing, learning, inclusion, and resilient local systems.
            </p>
          </div>
        </section>

        <section className="filterBar">
          <div className="container filterBarRow">
            <div className="filterTabs">
              {categories.map((item, index) => (
                <button className={index === 0 ? "filterTab active" : "filterTab"} key={item} type="button">
                  {item}
                </button>
              ))}
            </div>
            <button className="navIconButton desktopOnly" type="button">
              <Search size={16} />
            </button>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="programGrid full">
              {site.programs.map((program) => (
                <ProgramCard item={program} key={program.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container ctaBand dark">
            <div>
              <p className="eyebrow">Stay Updated</p>
              <h2>Follow our progress and monthly program updates.</h2>
            </div>
            <Link className="button buttonAccent" href="/contact">
              Connect with Novessa <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileBottomNav activeHref="/programs" />
    </>
  );
}
