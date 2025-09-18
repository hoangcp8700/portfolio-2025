import { experiences } from "@/shared/constants/data";

import { Section } from "../atoms/Section";


export function ExperienceTimeline() {
  return (
    <Section id="experience" title="Work Experience">
      <ol className="relative border-s border-muted-foreground/20">
        {experiences.map((e, i) => (
          <li key={i} className="ml-6 py-4">
            <span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-primary" />
            <h3 className="font-semibold">{e.role} — {e.company}</h3>
            <div className="text-xs text-muted-foreground">{e.start} {e.end ? `– ${e.end}` : "– Present"}</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              {e.summary.map((s) => (<li key={s}>{s}</li>))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}