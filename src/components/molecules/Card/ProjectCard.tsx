"use client";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/common";

interface ProjectCardProps {
  project: Project
}
export function ProjectCard({ project }: ProjectCardProps) {
  return <Card>
    <CardHeader>
      <Badge variant="default" className="relative mb-2">
        <h2 className="text-sm font-semibold">{project.topic}</h2>
        <div className="absolute top-1 -right-0.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-dot"></div>
      </Badge>
      <Image src={project.cover} alt={project.title} width={600} height={400} className="h-40 w-full object-cover rounded-xl" />
      <CardTitle className="text-base mt-2">{project.title}</CardTitle>
    </CardHeader>

    <CardContent className="space-y-3">
      <p className="line-clamp-2 text-sm text-muted-foreground">{project.blurb}</p>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((t) => (
          <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
}