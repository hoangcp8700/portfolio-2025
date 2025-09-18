"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/shared/constants/data";

import { Section } from "../atoms/Section";


export function ProjectsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Section id="projects" title="Projects">
      <div className="overflow-hidden">
        <motion.div
          ref={ref}
          className="flex gap-4"
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
        >
          {projects.map((p) => (
            <motion.div key={p.slug} whileHover={{ y: -4 }} className="w-[300px] shrink-0">
              <Link href={`/projects/${p.slug}`}>
                <Card className="overflow-hidden">
                  <Image src={p.cover} alt={p.title} width={600} height={400} className="h-40 w-full object-cover" />
                  <CardHeader>
                    <CardTitle className="text-base">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{p.blurb}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}