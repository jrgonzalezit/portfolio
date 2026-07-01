import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { getAllProjectCategories, getAllProjectTags, getProjectSummaries } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Proyectos",
  description: "Proyectos de código: herramientas de soporte IT y ejercicios de la Tecnicatura en Programación.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjectSummaries();
  const categories = getAllProjectCategories();
  const tags = getAllProjectTags();

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Proyectos"
        title="Todo lo que fui construyendo"
        description="Cada proyecto acá es código real, publicado y documentado — nada de placeholders."
      />

      <div className="mt-10">
        <ProjectsExplorer projects={projects} categories={categories} tags={tags} />
      </div>
    </Container>
  );
}
