import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { PostSummary } from "@/lib/content";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Card className="group relative h-full transition-colors hover:ring-brand/40">
      <CardHeader>
        <p className="text-xs font-medium text-muted-foreground">{formatDate(post.date)}</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{post.description}</p>
      </CardContent>
    </Card>
  );
}
