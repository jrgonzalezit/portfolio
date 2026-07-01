import type { Metadata } from "next";
import Link from "next/link";
import { Download, GraduationCap, MapPin, Wrench } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@config/site";
import { getAllCertificates } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Sobre mí",
  description: siteConfig.description,
  path: "/about",
});

export default function AboutPage() {
  const education = getAllCertificates().find((c) => c.type === "education");

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading eyebrow="Sobre mí" title={siteConfig.name} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {siteConfig.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="pt-4">
            <Button render={<Link href={siteConfig.resumeUrl} download target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
              <Download className="size-4" />
              Descargar CV
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                <MapPin className="size-4" />
                Ubicación
              </h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{siteConfig.location}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                <Wrench className="size-4" />
                Rol actual
              </h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{siteConfig.role}</CardContent>
          </Card>

          {education ? (
            <Card>
              <CardHeader>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                  <GraduationCap className="size-4" />
                  Formación
                </h3>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {education.title}
                <br />
                {education.issuer}
              </CardContent>
            </Card>
          ) : null}
        </aside>
      </div>
    </Container>
  );
}
