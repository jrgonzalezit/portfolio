import { Feed } from "feed";
import { getAllPosts } from "@/lib/content";
import { siteConfig } from "@config/site";

export function GET() {
  const feed = new Feed({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    id: siteConfig.siteUrl,
    link: siteConfig.siteUrl,
    language: "es",
    favicon: `${siteConfig.siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    feedLinks: {
      rss: `${siteConfig.siteUrl}/blog/rss.xml`,
    },
    author: {
      name: siteConfig.name,
      email: siteConfig.email,
      link: siteConfig.siteUrl,
    },
  });

  for (const post of getAllPosts()) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.siteUrl}/blog/${post.slug}`,
      link: `${siteConfig.siteUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
