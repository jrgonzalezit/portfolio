import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacidad",
  description: "Qué datos se recolectan en este sitio y cómo se usan.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <SectionHeading eyebrow="Legal" title="Política de privacidad" />

      <div className="mt-10 space-y-6 text-muted-foreground">
        <p>
          Este es un sitio personal. No vendo ni comparto datos con terceros. Esta página
          explica, en términos simples, qué información se recolecta y para qué.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Formulario de contacto</h2>
          <p className="mt-2">
            Si completás el formulario de contacto, el nombre, email y mensaje que enviás se
            reenvían directamente a mi casilla de email ({siteConfig.email}) para poder
            responderte. No se guardan en ninguna base de datos ni se usan con otro fin.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Datos técnicos del hosting</h2>
          <p className="mt-2">
            El sitio está alojado en Vercel, que recolecta automáticamente registros técnicos
            estándar (dirección IP, tipo de navegador, páginas visitadas) con fines de
            infraestructura y seguridad. No agrego herramientas de analítica o publicidad de
            terceros por fuera de eso.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Contacto</h2>
          <p className="mt-2">
            Ante cualquier consulta sobre esta política, podés escribirme a{" "}
            <a href={siteConfig.social.email} className="text-brand underline underline-offset-4">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
