'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/types/common';

export function projectLayoutIds(slug: string) {
  return {
    card: `project-${slug}`,
    image: `project-img-${slug}`,
  } as const;
}

interface ProjectCardProps {
  project: Project;
  /** Called when card is clicked (e.g., open dialog). */
  onClick?: () => void;
  /** Hover lift amount; set 0 to disable */
  hoverLift?: number;
  /** Optional extra class on the outer wrapper */
  className?: string;
}

/**
 * ProjectCard — reusable card that includes Framer Motion shared-element ids.
 * The wrapper and the cover image are given stable layoutIds that match the dialog.
 */
export function ProjectCard({
  project,
  onClick,
  hoverLift = 4,
  className,
}: ProjectCardProps) {
  const ids = projectLayoutIds(project.slug);

  return (
    <motion.div whileHover={hoverLift ? { y: -hoverLift } : undefined}>
      <Card
        onClick={onClick}
        aria-label={`Open ${project.title}`}
        className={className}
      >
        {/* Shared-element wrapper (must match dialog layoutId) */}
        <motion.div layoutId={ids.card}>
          {/* Topic badge + dot */}
          <div className="px-4">
            {project.topic ? (
              <Badge variant="default" className="relative mb-4">
                <h2 className="text-xs font-semibold">{project.topic}</h2>
                <span className="bg-emerald-dot absolute top-1 -right-0.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full" />
              </Badge>
            ) : null}

            {/* Shared image container (must match dialog image layoutId) */}
            <motion.div layoutId={ids.image} className="relative h-40 w-full">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="rounded-xl object-cover"
              />
            </motion.div>
          </div>

          {/* Card body */}
          <CardHeader>
            <CardTitle className="mt-2 text-base">{project.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {project.blurb}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px]">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
