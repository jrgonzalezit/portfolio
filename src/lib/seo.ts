import type { Metadata } from "next";
import { siteConfig } from "@config/site";
import type { BlogPost, Project } from "@/lib/content";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  tags,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.siteUrl).toString();
  const ogImage = image ? new URL(image, siteConfig.siteUrl).toString() : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: tags ?? [...siteConfig.seo.keywords],
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "es_AR",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
    },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: project.date,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: project.tags.join(", "),
    url: new URL(`/projects/${project.slug}`, siteConfig.siteUrl).toString(),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
  };
}

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    url: new URL(`/blog/${post.slug}`, siteConfig.siteUrl).toString(),
  };
}
