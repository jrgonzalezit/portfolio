import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX, type Options as MdxOptions } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

const mdxOptions: MdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [
      rehypePrettyCode,
      {
        theme: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
        keepBackground: false,
      },
    ],
  ],
};

function slugFromPath(path: string) {
  return path.split("/").pop()!.replace(/\.mdx?$/, "");
}

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    category: z.string(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    status: z.enum(["completed", "in-progress", "archived"]).default("completed"),
    featured: z.boolean().default(false),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    youtubeUrl: z.string().url().optional(),
    date: z.string(),
    duration: z.string().optional(),
    teamSize: z.number().optional(),
    role: z.string().optional(),
    architectureDiagram: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    futureImprovements: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, mdxOptions);
    return {
      ...doc,
      slug: slugFromPath(doc._meta.path),
      mdx,
    };
  },
});

const blogPosts = defineCollection({
  name: "blogPosts",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, mdxOptions);
    return {
      ...doc,
      slug: slugFromPath(doc._meta.path),
      mdx,
    };
  },
});

const experience = defineCollection({
  name: "experience",
  directory: "content/experience",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    dateLabel: z.string().optional(),
    current: z.boolean().default(false),
    type: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, mdxOptions);
    return {
      ...doc,
      slug: slugFromPath(doc._meta.path),
      mdx,
    };
  },
});

const certificates = defineCollection({
  name: "certificates",
  directory: "content/certificates",
  include: "**/*.mdx",
  schema: z.object({
    content: z.string(),
    title: z.string(),
    issuer: z.string(),
    type: z.enum(["certificate", "education"]).default("certificate"),
    status: z.enum(["completed", "in-progress"]).default("completed"),
    date: z.string().optional(),
    dateLabel: z.string().optional(),
    url: z.string().url().optional(),
    credentialId: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, mdxOptions);
    return {
      ...doc,
      slug: slugFromPath(doc._meta.path),
      mdx,
    };
  },
});

export default defineConfig({
  content: [projects, blogPosts, experience, certificates],
});
