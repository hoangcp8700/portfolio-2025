'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { Project } from "@/types/common";

import { Badge } from "../ui/badge";



export interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
      </div>


      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Image src={project.cover} alt={project.title} width={1280} height={720} className="rounded-xl border" />
      </motion.div>


      <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />


      <div className="grid gap-4 sm:grid-cols-2">
        {/* {project.images.map((src, i) => (
        <motion.div key={src} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Image src={src} alt={`${project.title} ${i + 1}`} width={1200} height={800} className="rounded-lg border" />
        </motion.div>
      ))} */}
      </div>


      <div>
        <h2 className="mb-3 text-xl font-semibold">Tech</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}