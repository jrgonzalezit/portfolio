import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/icons";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description: "Contactame por email o LinkedIn para posiciones de soporte IT u oportunidades junior en desarrollo.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Contacto"
        title="Hablemos"
        description="Completá el formulario o escribime directo — lo que te resulte más cómodo."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="pt-6">
            <ContactForm />
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                <Mail className="size-4" />
                Email
              </h3>
            </CardHeader>
            <CardContent>
              <Link href={siteConfig.social.email} className="text-sm text-brand">
                {siteConfig.email}
              </Link>
            </CardContent>
          </Card>

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
              <h3 className="text-sm font-semibold">Redes</h3>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GitHubIcon className="size-5" />
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedInIcon className="size-5" />
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </Container>
  );
}
