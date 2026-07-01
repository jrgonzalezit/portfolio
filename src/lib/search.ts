import { getAllPosts, getAllProjects } from "@/lib/content";

export type SearchItem = {
  type: "project" | "post";
  title: string;
  description: string;
  url: string;
  tags: string[];
};

export function getSearchIndex(): SearchItem[] {
  const projects: SearchItem[] = getAllProjects().map((p) => ({
    type: "project",
    title: p.title,
    description: p.description,
    url: `/projects/${p.slug}`,
    tags: [...p.tags, ...p.technologies, p.category],
  }));

  const posts: SearchItem[] = getAllPosts().map((p) => ({
    type: "post",
    title: p.title,
    description: p.description,
    url: `/blog/${p.slug}`,
    tags: p.tags,
  }));

  return [...projects, ...posts];
}
