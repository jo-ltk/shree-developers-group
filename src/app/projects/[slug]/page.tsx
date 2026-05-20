import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects-data";
import { ProjectDetailClient } from "./ProjectDetailClient";

export function generateStaticParams() {
  return [{ slug: "sydney-oaks" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "sydney-oaks") return { title: "Project Not Found" };
  const project = getProjectBySlug("sydney-oaks");
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Shree Developers Group`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "sydney-oaks") notFound();
  const project = getProjectBySlug("sydney-oaks");
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
