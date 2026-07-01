import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { skillCategories } from "@content/skills/skills";

export function SkillsPreview() {
  return (
    <section className="border-t border-border/60 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Skills" title="Con qué trabajo" />
          <Button variant="ghost" nativeButton={false} render={<Link href="/skills" />}>
            Ver todo
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.05}>
              <Card>
                <CardHeader>
                  <h3 className="text-sm font-semibold text-muted-foreground">{category.title}</h3>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="font-normal">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
