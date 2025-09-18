import { About } from "@/components/templates/About";
import { ContactForm } from "@/components/templates/ContactForm";
import { ExperienceTimeline } from "@/components/templates/ExperienceTimeline";
import { HeroSection } from "@/components/templates/HeroSection";
import { ProjectsCarousel } from "@/components/templates/ProjectsCarousel";
import { Skills } from "@/components/templates/Skills";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <About />
      <Skills />
      <ProjectsCarousel />
      <ExperienceTimeline />
      <ContactForm />
    </div>
  );
}
