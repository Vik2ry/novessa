import Link from "next/link";
import { ArrowRight, Circle } from "lucide-react";
import type { ContentItem } from "@/lib/api";

export function ProgramCard({ item }: { item: ContentItem }) {
  const progress = Number(item.metadata.progressPercent ?? 0);
  const raised = String(item.metadata.raised ?? "N0");
  const goal = String(item.metadata.goal ?? "N0");
  const badge = String(item.metadata.statusLabel ?? item.category);

  return (
    <article className="programCard">
      <div className="programCardMedia">
        <img alt={item.title} src={item.imageUrl} />
        <span className="programBadge">
          <Circle fill="currentColor" size={8} strokeWidth={0} />
          {badge}
        </span>
      </div>
      <div className="programCardBody">
        <div className="programMeta">{item.category}</div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <div className="progressMeta">
          <span>{raised} raised</span>
          <span>{goal}</span>
        </div>
        <div className="progressTrack" aria-hidden="true">
          <div className="progressFill" style={{ width: `${progress}%` }} />
        </div>
        <Link className="button buttonGhost buttonFull" href={`/programs/${item.slug}`}>
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
