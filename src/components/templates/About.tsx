/* eslint-disable react/no-unescaped-entities */
import { profile } from "@/shared/constants/data";

import { Section } from "../atoms/Section";


export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-muted-foreground">
            Hi, I'm {profile.name}. {profile.intro}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="Experience" value={`${profile.yearsOfExperience}+ year`} />
          <Stat label="Projects" value={`${profile.completedProjects}+`} />
          <Stat label="Education" value={profile.education} />
          <Stat label="Location" value={profile.location} />
        </div>
      </div>
    </Section>
  );
}


function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-4 flex justify-center items-center flex-col min-h-32">
      <div className="mt-1 text-lg font-semibold text-center">{value}</div>
      <div className="text-xs text-muted-foreground font-syne">{label}</div>
    </div>
  );
}