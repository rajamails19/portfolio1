import { ChefHat, Infinity } from "lucide-react";

export const projectRegistry = [
  {
    name: "Continuum",
    label: "Habit tracker",
    status: "Running on localhost:8085",
    href: "/app",
    external: false,
    icon: Infinity,
    tone: "bg-[#fdaa3e]",
    path: "/Users/rajav/Documents/Coding/CGPT-help/portfolioraja",
  },
  {
    name: "JagsRajKitchen",
    label: "Restaurant site",
    status: "Running on localhost:8086",
    href: "http://localhost:8086/",
    external: true,
    icon: ChefHat,
    tone: "bg-[#5c6b3a]",
    path: "/Users/rajav/Documents/Coding/CGPT-help/portfolioraja/apps/jagsrajkitchen",
  },
] as const;
