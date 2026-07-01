import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { getAllExperience } from "@/lib/content";

export function TimelinePreview() {
  const experience = getAllExperience().slice(0, 3);
  if (experience.length === 0) return null;

  return (
    <section className="border-t border-border/60 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Experiencia" title="Trayectoria reciente" />
          <Button variant="ghost" nativeButton={false} render={<Link href="/experience" />}>
            Ver todo
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <ol className="mt-10 space-y-8 border-l border-border/60 pl-6">
          {experience.map((item) => (
            <li key={item.slug} className="relative">
              <Reveal>
                <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-brand" />
                <p className="text-sm text-muted-foreground">{item.dateLabel ?? item.startDate}</p>
                <h3 className="mt-1 font-semibold">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
