import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { sections as roseSections } from "@/content";
import { foundersBySection as roseFounders, marqueeQuotes as roseQuotes } from "@/content/founders";
import { chaatSections } from "@/content-chaat/sections";
import { foundersBySection as chaatFounders, marqueeQuotes as chaatQuotes } from "@/content-chaat/founders";
import roseHero from "@/assets/hero.jpg";
import chaatHero from "@/assets/hero-chaat.jpg";
import type { Section } from "@/content/types";
import type { Founder } from "@/content/founders";

export interface Deck {
  brandName: string;
  brandTag: string;
  brandLogo: string;
  brandVibe: string;
  sections: Section[];
  foundersBySection: Record<string, Founder>;
  marqueeQuotes: { text: string; author: string }[];
  heroImage: string;
  heroBadge: string;
  heroTitleA: string;
  heroTitleAccent: string;
  heroTitleB: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  homeQuote: string;
  homeQuoteBy: string;
}

const roseDeck: Deck = {
  brandName: "AIML-Kpop",
  brandTag: "Rosé Bloom",
  brandLogo: "A",
  brandVibe: "K-Pop Study",
  sections: roseSections,
  foundersBySection: roseFounders,
  marqueeQuotes: roseQuotes,
  heroImage: roseHero,
  heroBadge: "Stage-Grade Prep",
  heroTitleA: "Learn like the ones who ",
  heroTitleAccent: "own the stage",
  heroTitleB: ".",
  heroSubtitle:
    "Five focused decks. Real questions, real code, real production scenarios — coached by the archetypes of pop's most magnetic performers.",
  ctaPrimary: "Enter the studio",
  ctaSecondary: "Jump to Programs",
  homeQuote: "Own the spotlight — hesitation reads on camera.",
  homeQuoteBy: "— The Icon",
};

const chaatDeck: Deck = {
  brandName: "ChaatDeck",
  brandTag: "Tawa & Tamarind",
  brandLogo: "C",
  brandVibe: "Indian Street Food",
  sections: chaatSections,
  foundersBySection: chaatFounders,
  marqueeQuotes: chaatQuotes,
  heroImage: chaatHero,
  heroBadge: "Stall-Grade Craft",
  heroTitleA: "Cook like the stalls that ",
  heroTitleAccent: "feed the city",
  heroTitleB: ".",
  heroSubtitle:
    "Five focused decks. Real recipes, real ratios, real peak-hour scenarios — mentored by the archetypes of India's most iconic street cooks.",
  ctaPrimary: "Enter the kitchen",
  ctaSecondary: "Jump to Recipes",
  homeQuote: "Every plate is a performance — timing is the recipe.",
  homeQuoteBy: "— The Chaatwala",
};

export function useDeck(): Deck {
  const { theme } = useTheme();
  return useMemo(() => (theme === "chaat" ? chaatDeck : roseDeck), [theme]);
}

export function useSection(slug: string) {
  const deck = useDeck();
  return deck.sections.find((s) => s.slug === slug);
}
