import samosa from "@/assets/chef-samosa.jpg";
import dosa from "@/assets/chef-dosa.jpg";
import panipoori from "@/assets/chef-panipoori.jpg";
import biryani from "@/assets/chef-biryani.jpg";
import chai from "@/assets/chef-chai.jpg";

export interface Founder {
  name: string;
  title: string;
  image: string;
  quote: string;
}

export const foundersBySection: Record<string, Founder> = {
  qans: {
    name: "The Chaatwala",
    title: "Crunch · Spice · Showmanship",
    image: samosa,
    quote:
      "Every plate is a performance. The tang, the crunch, the chutney splash — timing is the recipe.",
  },
  programs: {
    name: "The Dosa Maestro",
    title: "Fermentation · Precision · Patience",
    image: dosa,
    quote:
      "A great dosa is a two-day song. Rice, dal, rest — the tawa only sings if the batter breathes.",
  },
  realtime: {
    name: "The Panipoori Prophet",
    title: "Speed · Rhythm · Reflex",
    image: panipoori,
    quote:
      "One puri, one breath, one bite. The line never stops — the wrist must never think.",
  },
  projects: {
    name: "The Biryani Poet",
    title: "Layers · Aroma · Story",
    image: biryani,
    quote:
      "A biryani is not cooked, it is arranged — rice, saffron, meat, memory. Seal the handi and trust the dum.",
  },
  others: {
    name: "The Chai Sage",
    title: "Cardamom · Kettle · Kulhad",
    image: chai,
    quote:
      "Boil, breathe, pour high. Chai is not a drink — it is the pause the whole day rests on.",
  },
};

export const marqueeQuotes: { text: string; author: string }[] = [
  { text: "Crunch first. Chutney second. Silence third.", author: "The Chaatwala" },
  { text: "Great batter needs sleep. So do great cooks.", author: "The Dosa Maestro" },
  { text: "One puri, one breath, one bite.", author: "The Panipoori Prophet" },
  { text: "Seal the handi. Trust the dum.", author: "The Biryani Poet" },
  { text: "Boil, breathe, pour high — chai is patience made loud.", author: "The Chai Sage" },
  { text: "Masala is memory. Season the story, not just the pan.", author: "ChaatDeck" },
  { text: "The tawa is honest. It shows every hesitation.", author: "The Dosa Maestro" },
  { text: "Speed without rhythm is just noise on the counter.", author: "The Panipoori Prophet" },
  { text: "Ghee is not a garnish — it is a signature.", author: "The Biryani Poet" },
  { text: "Two cups, one kettle, endless conversation.", author: "The Chai Sage" },
];
