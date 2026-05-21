import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  DEDICATED_PROJECT_SLUGS,
  isDedicatedProjectSlug,
} from "@/lib/projects-data";
import { ProjectDetailClient } from "./ProjectDetailClient";

export function generateStaticParams() {
  return DEDICATED_PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDedicatedProjectSlug(slug)) return { title: "Project Not Found" };
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Shree Developers Group`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDedicatedProjectSlug(slug)) notFound();
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
