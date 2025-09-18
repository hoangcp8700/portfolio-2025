"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { profile } from "@/shared/constants/data";


export function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Image src={profile.avatar} alt={profile.name} width={112} height={112} className="h-28 w-28 rounded-full border object-cover" />
      </motion.div>
      <div>
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="mt-2 text-muted-foreground">{profile.role} · {profile.location}</p>
      </div>
      <p className="max-w-2xl text-balance text-muted-foreground">
        {profile.intro}
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <a href="#projects">View Projects</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#contact">Contact Me</a>
        </Button>
      </div>
    </div>
  );
}