import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXContent } from "@content-collections/mdx/react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProjectCard } from "@/components/projects/project-card";
import { GitHubIcon } from "@/components/shared/icons";
import { mdxComponents } from "@/lib/mdx-components";
import { formatDate } from "@/lib/utils";
import {
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/content";
import { buildMetadata, projectJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: "article",
    publishedTime: project.date,
    tags: project.tags,
  });
}

const statusLabels: Record<string, string> = {
  completed: "Completado",
  "in-progress": "En progreso",
  archived: "Archivado",
};

const difficultyLabels: Record<string, string> = {
  beginner: "Nivel inicial",
  intermediate: "Nivel intermedio",
  advanced: "Nivel avanzado",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />

      <Container className="py-16 sm:py-20">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/projects" />}>
          <ArrowLeft className="size-4" />
          Todos los proyectos
        </Button>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{project.category}</Badge>
          <Badge variant="secondary">{statusLabels[project.status]}</Badge>
          {project.difficulty ? <Badge variant="secondary">{difficultyLabels[project.difficulty]}</Badge> : null}
        </div>

        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{project.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {formatDate(project.date)}
          </span>
          {project.duration ? <span>{project.duration}</span> : null}
          {project.role ? (
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {project.role}
              {project.teamSize ? ` · ${project.teamSize} persona${project.teamSize > 1 ? "s" : ""}` : ""}
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <Button render={<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
              <GitHubIcon className="size-4" />
              Ver código
            </Button>
          ) : null}
          {project.liveUrl ? (
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink className="size-4" />
              Demo en vivo
            </Button>
          ) : null}
          {project.youtubeUrl ? (
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" />}
            >
              <PlayCircle className="size-4" />
              Video demo
            </Button>
          ) : null}
        </div>

        {project.coverImage ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>
        ) : null}

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0">
            <MDXContent code={project.mdx} components={mdxComponents} />

            {project.gallery.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold tracking-tight">Galería</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((src) => (
                    <div key={src} className="overflow-hidden rounded-xl border border-border">
                      <Image src={src} alt="" width={800} height={500} className="h-auto w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="space-y-6">
            {project.technologies.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold">Stack técnico</h3>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-normal">
                      {tech}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            )}

            {project.futureImprovements.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                    <Sparkles className="size-4" />
                    Próximas mejoras
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                    {project.futureImprovements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {project.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold">Tags</h3>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border/60 pt-12">
            <h2 className="text-xl font-semibold tracking-tight">Proyectos relacionados</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}

        {(prev || next) && (
          <div className="mt-16 flex items-center justify-between gap-4 border-t border-border/60 pt-8">
            {prev ? (
              <Button variant="ghost" nativeButton={false} render={<Link href={`/projects/${prev.slug}`} />}>
                <ArrowLeft className="size-4" />
                {prev.title}
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button variant="ghost" nativeButton={false} render={<Link href={`/projects/${next.slug}`} />}>
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
