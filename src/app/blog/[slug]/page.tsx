import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXContent } from "@content-collections/mdx/react";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { mdxComponents } from "@/lib/mdx-components";
import { formatDate, getReadingTime } from "@/lib/utils";
import { extractToc } from "@/lib/toc";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/content";
import { buildMetadata, articleJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />

      <Container className="py-16 sm:py-20">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/blog" />}>
          <ArrowLeft className="size-4" />
          Todos los posts
        </Button>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{post.description}</p>

        <div className="mt-6 flex items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {getReadingTime(post.content)}
          </span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_220px]">
          <article className="min-w-0">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </article>
          <TableOfContents items={toc} />
        </div>

        {(prev || next) && (
          <div className="mt-16 flex items-center justify-between gap-4 border-t border-border/60 pt-8">
            {prev ? (
              <Button variant="ghost" nativeButton={false} render={<Link href={`/blog/${prev.slug}`} />}>
                <ArrowLeft className="size-4" />
                {prev.title}
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button variant="ghost" nativeButton={false} render={<Link href={`/blog/${next.slug}`} />}>
                {next.title}
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <span />
            )}
          </div>
        )}
      </Container>
    </>
  );
}
