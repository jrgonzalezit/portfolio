import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { getAllBlogTags, getPostSummaries } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Notas sobre soporte técnico, la Tecnicatura en Programación y lo que voy construyendo.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPostSummaries();
  const tags = getAllBlogTags();

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading eyebrow="Blog" title="Notas y aprendizajes" />

      {posts.length > 0 ? (
        <div className="mt-10">
          <BlogExplorer posts={posts} tags={tags} />
        </div>
      ) : (
        <div className="mt-16 rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Todavía no publiqué nada acá — está en camino. Mientras tanto, mirá los{" "}
          <Link href="/projects" className="font-medium text-brand underline underline-offset-4">
            proyectos
          </Link>
          .
        </div>
      )}
    </Container>
  );
}
