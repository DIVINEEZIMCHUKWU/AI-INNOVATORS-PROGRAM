import { LucideIcon } from "lucide-react";

export interface ModuleItem {
  title: string;
  description: string;
}

export interface CourseModule {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  items: ModuleItem[];
}

export interface AudienceType {
  id: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  url: string;
  color: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}