"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/shared/constants/data";

import { Section } from "../atoms/Section";


export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  async function onSubmit(formData: FormData) {
    console.log("🚀 ~ onSubmit ~ formData:", formData);
    setStatus("Thanks! I will get back to you soon.");

    // setStatus(null);
    // const res = await fetch("/api/contact", { method: "POST", body: formData });
    // if (res.ok) setStatus("Thanks! I will get back to you soon.");
    // else setStatus("Something went wrong. Please try again.");
  }
  return (
    <Section id="contact" title="Contact">
      <form action={onSubmit} className="grid gap-4 md:max-w-xl">
        <Input required name="name" placeholder="Your name" />
        <Input required type="email" name="email" placeholder="Email" />
        <Input name="phone" placeholder="Phone" />
        <Textarea required name="message" placeholder="Hi, I'm interested in..." className="min-h-[120px]" />
        <Button type="submit">Send</Button>
        {status && <p className="text-sm text-muted-foreground">{status}</p>}
        <div className="text-sm text-muted-foreground">
          <div>Address: {profile.location}</div>
          <div>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a> · Phone: {profile.phone}</div>
        </div>
      </form>
    </Section>
  );
}