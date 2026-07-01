import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--brand)/0.12,transparent)]"
      />
      <Container>
        <Reveal>
          <Badge variant="outline" className="gap-1.5 py-1">
            <MapPin className="size-3" />
            {siteConfig.location} · {siteConfig.availability}
          </Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {siteConfig.name}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {siteConfig.role} — {siteConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/projects" />}>
              Ver proyectos
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href={siteConfig.resumeUrl} download target="_blank" rel="noopener noreferrer" />}
            >
              <Download className="size-4" />
              Descargar CV
            </Button>
            <Button variant="ghost" size="lg" nativeButton={false} render={<Link href="/contact" />}>
              Contacto
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
