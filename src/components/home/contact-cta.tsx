import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@config/site";

export function ContactCta() {
  return (
    <section className="border-t border-border/60 py-20 sm:py-24">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            ¿Tenés una posición de soporte IT o un rol junior de desarrollo?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Estoy disponible y con ganas de sumar. Escribime.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/contact" />}>
              <Mail className="size-4" />
              Contactarme
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" />}
            >
              LinkedIn
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
