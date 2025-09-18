'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { projects } from '@/shared/constants/data';

import { Section } from '../atoms/Section';
import { ProjectCard } from '../molecules/Card/ProjectCard';

import { ProjectModal } from './ProjectModal';

export function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selected]);

  const selectedProject = projects.find((p) => p.slug === selected) || null;

  return (
    <Section id="projects" title="Projects">
      <div className="-m-2 overflow-hidden p-2">
        <motion.div
          ref={trackRef}
          className="flex gap-4"
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              onClick={() => setSelected(p.slug)}
              className="w-[300px] shrink-0"
            />
          ))}
        </motion.div>
      </div>

      {/* Modal with shared-element transition */}
      <AnimatePresence>
        <ProjectModal
          open={!!selectedProject}
          project={selectedProject}
          onClose={() => setSelected(null)}
        />
      </AnimatePresence>
    </Section>
  );
}
