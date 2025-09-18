import { Facebook, Linkedin } from 'lucide-react';

import { Profile, Skill, Experience, Project } from '@/types/common';

export const NAV = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
];

export const profile: Profile = {
  name: 'Hoang Cong Phan',
  role: 'Frontend Developer',
  avatar: '/avatar.jpg',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'hoangcp219@gmail.com',
  phone: '+84362152176',
  intro:
    'I craft fast, accessible web experiences. Specialized in Next.js, design systems, and delightful motion.',
  education: 'B.Sc. in Computer Science, HCMUT',
  yearsOfExperience: 3,
  completedProjects: 24,
};

export const skills: Skill[] = [
  { name: 'Next.js', level: 'Expert' },
  { name: 'React', level: 'Expert' },
  { name: 'TypeScript', level: 'Expert' },
  { name: 'TailwindCSS', level: 'Expert' },
  { name: 'shadcn/ui', level: 'Advanced' },
  { name: 'Framer Motion', level: 'Advanced' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Figma', level: 'Advanced' },
];

export const experiences: Experience[] = [
  {
    company: 'Acme Co.',
    role: 'Senior Frontend Engineer',
    start: '2023',
    summary: [
      'Led design system with shadcn/ui and Tailwind.',
      'Cut LCP by 35% with Next.js optimization.',
    ],
  },
  {
    company: 'Startup XYZ',
    role: 'Frontend Engineer',
    start: '2021',
    end: '2023',
    summary: ['Built SSR commerce site.', 'Introduced CI lint/format gates.'],
  },
];

export const projects: Project[] = [
  {
    slug: 'ai-medcast',
    title: 'AI Medcast',
    topic: 'Healthcare',
    tags: ['AI'],
    blurb: 'Evidence-based medical QA platform with streaming answers.',
    cover: '/project.jpeg',
    images: ['/project.jpeg', '/project.jpeg', '/project.jpeg'],
    tech: ['Next.js', 'Tailwind', 'Framer Motion', 'OpenAI'],
    content:
      '<p>Built a modular chat interface with SSE streaming, verification pipeline, and rich citations.</p>',
  },
  {
    slug: 'finance-raven',
    title: 'Raven Commercial Finance',
    topic: 'Fintech',
    tags: ['Dashboard'],
    blurb: 'Loan origination platform with complex forms & charts.',
    cover: '/project.jpeg',
    images: ['/project.jpeg'],
    tech: ['Next.js', 'Tailwind', 'React Query'],
    content: '<p>Dynamic schemas, validation, and real-time analytics.</p>',
  },
];

export const SOCIALS = [
  {
    href: 'https://www.linkedin.com/in/your-handle',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  {
    href: 'https://www.facebook.com/your-handle',
    label: 'Facebook',
    Icon: Facebook,
  },
];
