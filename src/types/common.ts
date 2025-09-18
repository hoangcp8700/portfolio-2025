export type Skill = {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
};
export type Experience = {
  company: string;
  role: string;
  start: string;
  end?: string;
  summary: string[];
};
export type Project = {
  slug: string;
  title: string;
  tags: string[];
  blurb: string;
  cover: string; // /images/...
  images: string[];
  tech: string[];
  content: string; // markdown or HTML snippet
};
export type Profile = {
  name: string;
  role: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  intro: string;
  education: string;
  yearsOfExperience: number;
  completedProjects: number;
};
