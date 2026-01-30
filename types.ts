
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  isWorking?: boolean;
  imageUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  offerLetter?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  grade?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
