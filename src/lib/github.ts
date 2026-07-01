import { siteConfig } from "@config/site";

export type GithubRepoStats = {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
};

/**
 * Fetch de datos públicos de un repo puntual (server-side, cacheado).
 * No requiere token; si se define GITHUB_TOKEN en env, se usa para subir
 * el rate limit de 60 a 5000 req/hora.
 */
export async function getFeaturedRepo(): Promise<GithubRepoStats | null> {
  const { username, featuredRepo } = siteConfig.github;

  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${featuredRepo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      updatedAt: data.updated_at,
    };
  } catch {
    return null;
  }
}
