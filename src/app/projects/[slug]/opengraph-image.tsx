import { ImageResponse } from "next/og";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #18181b 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 26, color: "#8b8b96", display: "flex" }}>
          {project?.category ?? "Proyecto"}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 18, display: "flex", maxWidth: 1000 }}>
          {project?.title ?? "Proyecto"}
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 24, display: "flex", maxWidth: 900 }}>
          {project?.description ?? ""}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          {(project?.technologies ?? []).slice(0, 4).map((tech) => (
            <div
              key={tech}
              style={{
                fontSize: 22,
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid #3f3f46",
                color: "#d4d4d8",
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
