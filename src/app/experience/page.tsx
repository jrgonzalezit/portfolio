import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { getAllExperience } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Experiencia",
  description: "Trayectoria laboral: soporte técnico N1/N2, atención al cliente y operación de sistemas.",
  path: "/experience",
});

export default function ExperiencePage() {
  const experience = getAllExperience();

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading eyebrow="Experiencia" title="Trayectoria laboral" />

      <ol className="mt-10 space-y-12 border-l border-border/60 pl-6 sm:pl-8">
        {experience.map((item) => (
          <li key={item.slug} className="relative">
            <span className="absolute top-1.5 -left-[31px] size-2.5 rounded-full bg-brand sm:-left-[35px]" />

            <p className="text-sm text-muted-foreground">{item.dateLabel ?? item.startDate}</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">{item.role}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{item.company}</span>
              {item.location ? (
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {item.location}
                </span>
              ) : null}
              {item.type ? <Badge variant="outline">{item.type}</Badge> : null}
            </div>

            {item.highlights.length > 0 && (
              <ul className="mt-4 list-disc space-y-2 pl-4 text-muted-foreground">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Container>
  );
}
