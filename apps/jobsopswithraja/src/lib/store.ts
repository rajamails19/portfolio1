import { create } from "zustand";
import type { JobFilters } from "@/types/job";

interface UIState {
  filters: JobFilters;
  setFilters: (patch: Partial<JobFilters>) => void;
  resetFilters: () => void;
  view: "table" | "cards";
  setView: (v: "table" | "cards") => void;
  selectedJobId: string | null;
  openJob: (id: string | null) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const defaultFilters: JobFilters = {
  minMatch: 35,
  maxMatch: 100,
  postedWithin: "all",
  sortBy: "match",
  fullTimeOnly: true,
};

export const useUI = create<UIState>((set) => ({
  filters: defaultFilters,
  setFilters: (patch) => set((s) => ({ filters: { ...s.filters, ...patch } })),
  resetFilters: () => set({ filters: defaultFilters }),
  view: "table",
  setView: (v) => set({ view: v }),
  selectedJobId: null,
  openJob: (id) => set({ selectedJobId: id }),
  theme: "light",
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "light" ? "dark" : "light";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next === "dark");
      }
      return { theme: next };
    }),
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
