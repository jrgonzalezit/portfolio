"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectSummary } from "@/lib/content";

const PAGE_SIZE = 9;

type SortOption = "newest" | "oldest" | "title";

export function ProjectsExplorer({
  projects,
  categories,
  tags,
}: {
  projects: ProjectSummary[];
  categories: string[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fuse = useMemo(
    () => new Fuse(projects, { keys: ["title", "description", "tags", "technologies"], threshold: 0.35 }),
    [projects],
  );

  const filtered = useMemo(() => {
    let results = query ? fuse.search(query).map((r) => r.item) : projects;

    if (category !== "all") {
      results = results.filter((p) => p.category === category);
    }
    if (activeTag) {
      results = results.filter((p) => p.tags.includes(activeTag));
    }

    const sorted = [...results].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      const diff = +new Date(b.date) - +new Date(a.date);
      return sort === "newest" ? diff : -diff;
    });

    return sorted;
  }, [query, category, activeTag, sort, fuse, projects]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Buscar proyectos..."
            className="pl-9"
            aria-label="Buscar proyectos"
          />
        </div>

        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value ?? "all");
            setVisibleCount(PAGE_SIZE);
          }}
        >
          <SelectTrigger className="sm:w-48" aria-label="Filtrar por categoría">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
          <SelectTrigger className="sm:w-40" aria-label="Ordenar por">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="oldest">Más antiguos</SelectItem>
            <SelectItem value="title">Título A-Z</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <Button
            variant={layout === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            aria-label="Vista de grilla"
            aria-pressed={layout === "grid"}
            onClick={() => setLayout("grid")}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant={layout === "list" ? "secondary" : "ghost"}
            size="icon-sm"
            aria-label="Vista de lista"
            aria-pressed={layout === "list"}
            onClick={() => setLayout("list")}
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer select-none"
              onClick={() => {
                setActiveTag(activeTag === tag ? null : tag);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}
      </p>

      {visible.length > 0 ? (
        <div
          className={
            layout === "grid"
              ? "mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-4 flex flex-col gap-4"
          }
        >
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} layout={layout} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-muted-foreground">
          No encontré proyectos con esos filtros.
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
            Cargar más
          </Button>
        </div>
      )}
    </div>
  );
}
