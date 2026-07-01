import type { Metadata } from "next";
import Link from "next/link";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { getCertificatesByType } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Certificados",
  description: "Certificaciones y formación: Google IT Support, Cisco Cybersecurity y la Tecnicatura en Programación (UTN).",
  path: "/certificates",
});

export default function CertificatesPage() {
  const education = getCertificatesByType("education");
  const certificates = getCertificatesByType("certificate");

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading eyebrow="Certificados" title="Formación y certificaciones" />

      {education.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <GraduationCap className="size-4" />
            Educación
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <CertificateCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}

      {certificates.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Award className="size-4" />
            Certificaciones
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {certificates.map((item) => (
              <CertificateCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

function CertificateCard({
  item,
}: {
  item: ReturnType<typeof getCertificatesByType>[number];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.issuer}</p>
        </div>
        {item.status === "in-progress" ? (
          <Badge variant="secondary">En curso</Badge>
        ) : (
          <Badge variant="outline">Completado</Badge>
        )}
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{item.dateLabel}</p>
        {item.url ? (
          <Link
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-brand"
          >
            Ver credencial
            <ExternalLink className="size-3.5" />
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
