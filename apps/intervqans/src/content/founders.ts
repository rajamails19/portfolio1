import visionary from "@/assets/founder-visionary.jpg";
import coder from "@/assets/founder-coder.jpg";
import rocket from "@/assets/founder-rocket.jpg";
import creative from "@/assets/founder-creative.jpg";
import mentor from "@/assets/founder-mentor.jpg";

export interface Founder {
  name: string;
  title: string;
  image: string;
  quote: string;
}

export const foundersBySection: Record<string, Founder> = {
  qans: {
    name: "The Visionary",
    title: "Inspired by Steve Jobs",
    image: visionary,
    quote:
      "Stay hungry. Stay foolish. The ones who are crazy enough to think they can change the world are the ones who do.",
  },
  programs: {
    name: "The Builder",
    title: "Inspired by Mark Zuckerberg",
    image: coder,
    quote:
      "Move fast and build things. The biggest risk is not taking any risk — in a world changing quickly, the only strategy guaranteed to fail is not taking risks.",
  },
  realtime: {
    name: "The Rocketeer",
    title: "Inspired by Elon Musk",
    image: rocket,
    quote:
      "When something is important enough, you do it even if the odds are not in your favor. Failure is an option here — if things are not failing, you are not innovating.",
  },
  projects: {
    name: "The Creator",
    title: "Inspired by Sara Blakely",
    image: creative,
    quote:
      "Don't be intimidated by what you don't know. That can be your greatest strength and ensure that you do things differently from everyone else.",
  },
  others: {
    name: "The Mentor",
    title: "Inspired by Warren Buffett",
    image: mentor,
    quote:
      "The best investment you can make is in yourself. The more you learn, the more you earn. Compound interest applies to knowledge too.",
  },
};

export const marqueeQuotes: { text: string; author: string }[] = [
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Move fast and build things.", author: "Mark Zuckerberg" },
  { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Ideas are easy. Execution is everything.", author: "John Doerr" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Rob Siltanen" },
  { text: "If you are not embarrassed by the first version of your product, you've launched too late.", author: "Reid Hoffman" },
  { text: "Fall in love with the problem, not the solution.", author: "Uri Levine" },
];
