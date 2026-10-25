import type { StaticImageData } from "next/image";

interface TimelineData {
  year: string;
  roles: {
    title: string;
    organization: string;
    dateRange: string;
    description: string;
    link?: string;
  }[];
}

interface ProjectData {
  slug: string;
  image: string | StaticImageData;
  title: string;
  description: string;
  link: string;
  demoLink?: string;
  date: string;
  tags: string[];
  details?: string[];
}

interface AchievementData {
  slug: string;
  image: string | StaticImageData;
  title: string;
  description: string;
  link: string;
  demoLink?: string;
  date: string;
  category: string;
  details?: string[];
}
