import Link from "next/link";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { GitHubIcon } from "@/components/shared/icons";
import { getFeaturedRepo } from "@/lib/github";
import { siteConfig } from "@config/site";

export async function GithubStatsCard() {
  const repo = await getFeaturedRepo();

  return (
    <section className="border-t border-border/60 py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="GitHub" title="Código en abierto" />

        <Reveal className="mt-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <GitHubIcon className="size-5" />
                <div>
                  <p className="font-semibold">{repo?.fullName ?? `${siteConfig.github.username}/${siteConfig.github.featuredRepo}`}</p>
                  {repo?.description ? (
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                  ) : null}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" />}
              >
                Perfil
                <ArrowUpRight className="size-3.5" />
              </Button>
            </CardHeader>
            {repo ? (
              <CardContent className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="size-4" /> {repo.stars}
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork className="size-4" /> {repo.forks}
                </span>
                {repo.language ? <span>{repo.language}</span> : null}
              </CardContent>
            ) : (
              <CardContent className="text-sm text-muted-foreground">
                Cuenta de GitHub reciente — todavía sin mucho historial público, pero el código está ahí.
              </CardContent>
            )}
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
