"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
import type { PostSummary } from "@/lib/content";

export function BlogExplorer({ posts, tags }: { posts: PostSummary[]; tags: string[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const fuse = useMemo(
    () => new Fuse(posts, { keys: ["title", "description", "tags"], threshold: 0.35 }),
    [posts],
  );

  const filtered = useMemo(() => {
    let results = query ? fuse.search(query).map((r) => r.item) : posts;
    if (activeTag) {
      results = results.filter((p) => p.tags.includes(activeTag));
    }
    return results;
  }, [query, activeTag, fuse, posts]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar posts..."
          className="pl-9 sm:max-w-sm"
          aria-label="Buscar posts"
        />
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer select-none"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-muted-foreground">
          No encontré posts con esos filtros.
        </div>
      )}
    </div>
  );
}
