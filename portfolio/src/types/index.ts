export interface ERPModule {
  id: string;
  name: string;
  badge: string;
  description: string;
  features: string[];
  techStack: string[];
  engineeringHighlight: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  status: 'Production' | 'Case Study' | 'In Development';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: 'Core' | 'Familiar' }[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  type: 'Freelance / Contract' | 'Open Source' | 'Education';
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}
