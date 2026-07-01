import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProjectSummary } from "@/lib/content";

export function ProjectCard({
  project,
  layout = "grid",
}: {
  project: ProjectSummary;
  layout?: "grid" | "list";
}) {
  return (
    <Card
      className={cn(
        "group relative h-full transition-colors hover:ring-brand/40",
        layout === "grid" ? "flex flex-col" : "sm:flex sm:flex-row sm:items-center sm:gap-6",
      )}
    >
      <CardHeader className={layout === "list" ? "sm:w-72 sm:shrink-0" : undefined}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground">{project.category}</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">
              <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
                {project.title}
              </Link>
            </h3>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
      {project.technologies.length > 0 && (
        <CardFooter
          className={cn(
            "flex flex-wrap gap-1.5",
            layout === "list" && "sm:w-56 sm:shrink-0 sm:border-t-0 sm:bg-transparent",
          )}
        >
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
