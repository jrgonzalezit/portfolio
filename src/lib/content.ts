import { allProjects, allBlogPosts, allExperiences, allCertificates } from "content-collections";

export type Project = (typeof allProjects)[number];
export type ProjectSummary = Omit<Project, "mdx" | "content">;
export type BlogPost = (typeof allBlogPosts)[number];
export type PostSummary = Omit<BlogPost, "mdx" | "content">;
export type Experience = (typeof allExperiences)[number];
export type Certificate = (typeof allCertificates)[number];

const isDev = process.env.NODE_ENV === "development";

function byDateDesc(a: { date: string }, b: { date: string }) {
  return +new Date(b.date) - +new Date(a.date);
}

// ---------- Projects ----------

export function getAllProjects(): Project[] {
  return [...allProjects].sort(byDateDesc);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getProjectSummaries(): ProjectSummary[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllProjects().map(({ mdx, content, ...summary }) => summary);
}

export function getAllProjectCategories(): string[] {
  return Array.from(new Set(allProjects.map((p) => p.category))).sort();
}

export function getAllProjectTags(): string[] {
  return Array.from(new Set(allProjects.flatMap((p) => p.tags))).sort();
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const scored = allProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => project.tags.includes(t)).length;
      const sameCategory = p.category === project.category ? 1 : 0;
      return { project: p, score: sharedTags * 2 + sameCategory };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.project);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

// ---------- Blog ----------

export function getAllPosts(): BlogPost[] {
  return [...allBlogPosts].filter((p) => isDev || !p.draft).sort(byDateDesc);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug && (isDev || !p.draft));
}

export function getPostSummaries(): PostSummary[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ mdx, content, ...summary }) => summary);
}

export function getAllBlogTags(): string[] {
  return Array.from(new Set(getAllPosts().flatMap((p) => p.tags))).sort();
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

// ---------- Experience ----------

export function getAllExperience(): Experience[] {
  return [...allExperiences].sort((a, b) => {
    if (b.order !== a.order) return b.order - a.order;
    return +new Date(b.startDate) - +new Date(a.startDate);
  });
}

// ---------- Certificates & Education ----------

export function getAllCertificates(): Certificate[] {
  return [...allCertificates].sort((a, b) => {
    if (a.status !== b.status) return a.status === "in-progress" ? -1 : 1;
    return (b.date ?? "").localeCompare(a.date ?? "");
  });
}

export function getCertificatesByType(type: Certificate["type"]): Certificate[] {
  return getAllCertificates().filter((c) => c.type === type);
}
