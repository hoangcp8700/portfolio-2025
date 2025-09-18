"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { projects } from "@/shared/constants/data";

import { Section } from "../atoms/Section";
import { ProjectCard } from "../molecules/Card/ProjectCard";


export function ProjectsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Section id="projects" title="Projects">
      <div>
        <motion.div
          ref={ref}
          className="flex gap-4"
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
        >
          {projects.map((p) => (
            <motion.div key={p.slug} whileHover={{ y: -4 }} className="w-[300px] shrink-0">
              <Link href={`/projects/${p.slug}`}>
                <ProjectCard project={p} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}