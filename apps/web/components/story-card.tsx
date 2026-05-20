import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentItem } from "@/lib/api";

export function StoryCard({ item, compact = false }: { item: ContentItem; compact?: boolean }) {
  const readTime = String(item.metadata.readTime ?? "5 min read");

  return (
    <article className={compact ? "storyCard compact" : "storyCard"}>
      <div className="storyCardMedia">
        <img alt={item.title} src={item.imageUrl} />
      </div>
      <div className="storyCardBody">
        <div className="storyCardMeta">
          <span>{item.category}</span>
          <span>{readTime}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <Link href={`/blog/${item.slug}`}>
          Read Story <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
