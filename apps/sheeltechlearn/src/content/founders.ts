import icon from "@/assets/mentor-icon.jpg";
import producer from "@/assets/mentor-producer.jpg";
import performer from "@/assets/mentor-performer.jpg";
import storyteller from "@/assets/mentor-storyteller.jpg";
import maestro from "@/assets/mentor-maestro.jpg";

export interface Founder {
  name: string;
  title: string;
  image: string;
  quote: string;
}

export const foundersBySection: Record<string, Founder> = {
  qans: {
    name: "The Icon",
    title: "Presence · Confidence · Range",
    image: icon,
    quote:
      "Own the room the second you walk in. Every question is a spotlight — answer like the camera is on you.",
  },
  programs: {
    name: "The Producer",
    title: "Craft · Composition · Detail",
    image: producer,
    quote:
      "The song exists before the hit. Rehearse the fundamentals until the pattern is muscle memory — then improvise.",
  },
  realtime: {
    name: "The Performer",
    title: "Execution · Nerve · Recovery",
    image: performer,
    quote:
      "The floor is live. When the beat drops and something breaks, keep dancing — the recovery is the performance.",
  },
  projects: {
    name: "The Storyteller",
    title: "Narrative · Vulnerability · Vision",
    image: storyteller,
    quote:
      "A project is a ballad. Choose one truth, arrange it slowly, and let the last note stay in the room.",
  },
  others: {
    name: "The Maestro",
    title: "Vision · Genre · Direction",
    image: maestro,
    quote:
      "Don't chase the trend — set it. The maestro edits the world into a single, unmistakable silhouette.",
  },
};

export const marqueeQuotes: { text: string; author: string }[] = [
  { text: "Own the spotlight — hesitation reads on camera.", author: "The Icon" },
  { text: "Rehearse the fundamentals until the pattern is muscle memory.", author: "The Producer" },
  { text: "When the beat drops and something breaks, keep dancing.", author: "The Performer" },
  { text: "Choose one truth. Arrange it slowly. Let the last note linger.", author: "The Storyteller" },
  { text: "Don't chase the trend. Set the silhouette.", author: "The Maestro" },
  { text: "The comeback is louder than the debut.", author: "StageDeck" },
  { text: "You are not late. You are on the next verse.", author: "The Storyteller" },
  { text: "Practice in the dark. Perform in the light.", author: "The Performer" },
  { text: "A great chorus is the answer everyone remembers.", author: "The Producer" },
  { text: "Wear the mistake like couture — and keep walking.", author: "The Maestro" },
];
