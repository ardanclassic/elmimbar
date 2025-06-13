import { LucideIcon } from "lucide-react";

export interface MasjidProfile {
  mosque_name: string;
  location: string;
  phone: string;
  email: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface Program {
  title: string;
  description: string;
  time: string;
  participants: string;
  image: string;
}

export interface Achievement {
  number: string;
  label: string;
  icon: LucideIcon;
}
