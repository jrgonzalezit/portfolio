import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { skillCategories } from "@content/skills/skills";

export const metadata: Metadata = buildMetadata({
  title: "Skills",
  description: "Con qué tecnologías y herramientas trabajo hoy, entre soporte técnico y desarrollo.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Skills"
        title="Con qué trabajo"
        description="Sin inflar niveles: esto es lo que uso en el día a día de soporte y lo que estoy sumando activamente en la Tecnicatura."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <h2 className="font-semibold">{category.title}</h2>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
