import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { Project } from '@/types/common';

import { Dialog } from '../molecules/Dialog';

interface ProjectModalProps {
  project?: Project | null;
  open?: boolean;
  onClose: () => void;
}

export function ProjectModal({ open, project, onClose }: ProjectModalProps) {
  // Close on ESC
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onClose();
      }}
    >
      {project ? (
        <motion.div
          layoutId={`project-${project.slug}`}
          // className="pointer-events-auto w-full max-w-3xl rounded-2xl border bg-card shadow-2xl"
          className="overflow-y-auto"
          initial={{ borderRadius: 16 }}
          animate={{ borderRadius: 16 }}
          exit={{ borderRadius: 16 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          <motion.div
            layoutId={`project-img-${project.slug}`}
            className="relative h-[260px] w-full"
          >
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="grid gap-4 p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-semibold">
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:bg-muted rounded-md border px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>

            <p className="text-muted-foreground text-sm">{project.content}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-muted-foreground rounded-full border px-2 py-1 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {project.images.map((src, i) => (
                <div
                  key={`images-${i}`}
                  className="relative h-40 w-full overflow-hidden rounded-lg border"
                >
                  <Image
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </Dialog>
  );
}
