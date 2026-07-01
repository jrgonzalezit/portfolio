import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@config/site";
import { Container } from "@/components/shared/container";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">{siteConfig.name}</p>
          <p className="text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>

        <div className="flex items-center gap-4">
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
          <Link
            href={siteConfig.social.email}
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-5" />
          </Link>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border/60 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          {siteConfig.footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
