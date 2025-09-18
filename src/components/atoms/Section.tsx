import React from "react";

import { cn } from "@/shared/lib/utils";

export function Section({ id, title, className, children }: { id: string; title: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}