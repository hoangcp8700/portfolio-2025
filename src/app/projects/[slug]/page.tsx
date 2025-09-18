import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/templates/ProjectDetail";
import { projects } from "@/shared/constants/data";



export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <ProjectDetail project={project} />
  );
}