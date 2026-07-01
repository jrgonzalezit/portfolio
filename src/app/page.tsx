import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { SkillsPreview } from "@/components/home/skills-preview";
import { TimelinePreview } from "@/components/home/timeline-preview";
import { LatestPosts } from "@/components/home/latest-posts";
import { GithubStatsCard } from "@/components/home/github-stats-card";
import { ContactCta } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
      <TimelinePreview />
      <LatestPosts />
      <GithubStatsCard />
      <ContactCta />
    </>
  );
}
