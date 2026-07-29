import visionary from "@/assets/founder-visionary.jpg";
import coder from "@/assets/founder-coder.jpg";
import rocket from "@/assets/founder-rocket.jpg";
import creative from "@/assets/founder-creative.jpg";
import mentor from "@/assets/founder-mentor.jpg";
import heroNoir from "@/assets/hero.jpg";

import chaatSamosa from "@/assets/chaat-samosa.jpg";
import chaatPani from "@/assets/chaat-panipoori.jpg";
import chaatDosa from "@/assets/chaat-dosa.jpg";
import chaatChai from "@/assets/chaat-chai.jpg";
import chaatMithai from "@/assets/chaat-mithai.jpg";
import heroChaat from "@/assets/hero-chaat.jpg";

import fifaPlaymaker from "@/assets/fifa-playmaker.jpg";
import fifaStriker from "@/assets/fifa-striker.jpg";
import fifaForward from "@/assets/fifa-forward.jpg";
import fifaKeeper from "@/assets/fifa-keeper.jpg";
import fifaCoach from "@/assets/fifa-coach.jpg";
import heroFifa from "@/assets/hero-fifa.jpg";

import rockyRunner from "@/assets/rocky-runner.jpg";
import rockyBag from "@/assets/rocky-bag.jpg";
import rockyRope from "@/assets/rocky-rope.jpg";
import rockyCoach from "@/assets/rocky-coach.jpg";
import rockyChamp from "@/assets/rocky-champ.jpg";
import heroRocky from "@/assets/hero-rocky.jpg";

export type ThemeKey = "noir" | "chaat" | "fifa" | "rocky";

export interface ThemeMascot {
  name: string;
  title: string;
  image: string;
  quote: string;
}

export interface ThemeSectionMeta {
  title: string;
  tagline: string;
  emoji: string;
  mascot: ThemeMascot;
}

export interface ThemeDef {
  key: ThemeKey;
  label: string; // switcher pill
  short: string; // 1-char / emoji indicator
  brandName: string;
  brandKicker: string;
  hero: {
    image: string;
    eyebrow: string;
    headA: string;
    headAccent: string;
    headB: string;
    sub: string;
    cta1: string;
    cta2: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat3Value: string;
  };
  sections: Record<string, ThemeSectionMeta>;
  marquee: { text: string; author: string }[];
}

export const themes: Record<ThemeKey, ThemeDef> = {
  noir: {
    key: "noir",
    label: "Noir",
    short: "★",
    brandName: "StudyDeck",
    brandKicker: "Noir Edition",
    hero: {
      image: heroNoir,
      eyebrow: "Founder-Grade Prep",
      headA: "Study like the ones who ",
      headAccent: "changed everything",
      headB: ".",
      sub: "Five focused decks. Real questions, real code, real production scenarios — mentored by the archetypes of the greatest founders of our time.",
      cta1: "Enter the vault",
      cta2: "Jump to Programs",
      stat1Label: "entries",
      stat2Label: "decks",
      stat3Label: "late nights saved",
      stat3Value: "∞",
    },
    sections: {
      qans: {
        title: "Q & Answers",
        tagline: "Concept-level React, hooks, and interviews.",
        emoji: "✨",
        mascot: {
          name: "The Visionary",
          title: "Inspired by Steve Jobs",
          image: visionary,
          quote:
            "Stay hungry. Stay foolish. The ones who are crazy enough to think they can change the world are the ones who do.",
        },
      },
      programs: {
        title: "Programs",
        tagline: "Production-quality code, dark IDE format.",
        emoji: "💻",
        mascot: {
          name: "The Builder",
          title: "Inspired by Mark Zuckerberg",
          image: coder,
          quote: "Move fast and build things. The biggest risk is not taking any risk.",
        },
      },
      realtime: {
        title: "Realtime Scenarios",
        tagline: "The 3AM production questions.",
        emoji: "⚡",
        mascot: {
          name: "The Rocketeer",
          title: "Inspired by Elon Musk",
          image: rocket,
          quote:
            "When something is important enough, you do it even if the odds are not in your favor.",
        },
      },
      projects: {
        title: "Projects",
        tagline: "Portfolio-worthy end-to-end builds.",
        emoji: "🚀",
        mascot: {
          name: "The Creator",
          title: "Inspired by Sara Blakely",
          image: creative,
          quote: "Don't be intimidated by what you don't know. That can be your greatest strength.",
        },
      },
      others: {
        title: "All Others",
        tagline: "AI eng, systems, and everything else.",
        emoji: "📚",
        mascot: {
          name: "The Mentor",
          title: "Inspired by Warren Buffett",
          image: mentor,
          quote: "The best investment you can make is in yourself.",
        },
      },
    },
    marquee: [
      { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
      { text: "Move fast and build things.", author: "Mark Zuckerberg" },
      { text: "When something is important enough, you do it.", author: "Elon Musk" },
      { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
      { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
      { text: "Ideas are easy. Execution is everything.", author: "John Doerr" },
    ],
  },

  chaat: {
    key: "chaat",
    label: "Chaat",
    short: "🌶️",
    brandName: "ChaatDeck",
    brandKicker: "Street-Food Edition",
    hero: {
      image: heroChaat,
      eyebrow: "Tawa-Hot Prep",
      headA: "Learn like the ones who ",
      headAccent: "spice up the streets",
      headB: ".",
      sub: "Five sizzling stalls of knowledge. Crispy answers, hot code, and secret masalas from the halwais of the internet.",
      cta1: "Open the tiffin",
      cta2: "Head to Programs",
      stat1Label: "plates",
      stat2Label: "stalls",
      stat3Label: "cups of chai",
      stat3Value: "∞",
    },
    sections: {
      qans: {
        title: "Q & Answers",
        tagline: "Crispy concepts, hot & fresh off the tawa.",
        emoji: "🥟",
        mascot: {
          name: "Samosa Uncle",
          title: "Master of Golden Q&A",
          image: chaatSamosa,
          quote: "A good samosa and a good answer share one secret — layers, folded with patience.",
        },
      },
      programs: {
        title: "Programs",
        tagline: "Recipes for code that actually compiles.",
        emoji: "💧",
        mascot: {
          name: "Pani-Poori Bhaiya",
          title: "Six shots of pure logic",
          image: chaatPani,
          quote:
            "Six poori, six shots, six edge-cases. Never leave a plate half-eaten or a function half-written.",
        },
      },
      realtime: {
        title: "Realtime Scenarios",
        tagline: "Rush hour. Server down. Chai on stove.",
        emoji: "🍵",
        mascot: {
          name: "Chaiwala Bhai",
          title: "Cutting chai, cutting incidents",
          image: chaatChai,
          quote: "Everything in prod is fixable — as long as the chai is strong.",
        },
      },
      projects: {
        title: "Projects",
        tagline: "Full-course thali of end-to-end builds.",
        emoji: "🥞",
        mascot: {
          name: "Dosa Anna",
          title: "Spins builds like paper dosa",
          image: chaatDosa,
          quote: "The pan is hot, the batter is ready. Ship the dosa before it sticks.",
        },
      },
      others: {
        title: "All Others",
        tagline: "The mithai counter — sweet extras.",
        emoji: "🍬",
        mascot: {
          name: "Halwai Ji",
          title: "Sweet, sticky, unforgettable",
          image: chaatMithai,
          quote: "The best knowledge is like jalebi — messy, golden, and worth the sugar rush.",
        },
      },
    },
    marquee: [
      { text: "Zyada masala, zyada learning.", author: "Halwai Ji" },
      { text: "Debug like you eat pani-poori — one shot at a time.", author: "Pani-Poori Bhaiya" },
      { text: "Prod down? Boil more chai.", author: "Chaiwala Bhai" },
      { text: "A crispy edge is worth more than a soggy feature.", author: "Samosa Uncle" },
      { text: "Flip the dosa before the bug settles.", author: "Dosa Anna" },
      { text: "Sweet code, spicy tests, sour bugs — full thali life.", author: "Street Wisdom" },
    ],
  },

  fifa: {
    key: "fifa",
    label: "FIFA",
    short: "⚽",
    brandName: "MatchDeck",
    brandKicker: "Stadium Edition",
    hero: {
      image: heroFifa,
      eyebrow: "90-Minute Prep",
      headA: "Train like the ones who ",
      headAccent: "own the pitch",
      headB: ".",
      sub: "Five squads of drills. Tactical questions, precision code, and stoppage-time scenarios — coached by the legends of the beautiful game.",
      cta1: "Kick off",
      cta2: "Head to Programs",
      stat1Label: "drills",
      stat2Label: "squads",
      stat3Label: "hat-tricks",
      stat3Value: "∞",
    },
    sections: {
      qans: {
        title: "Q & Answers",
        tagline: "First-touch fundamentals. Ball on the ground.",
        emoji: "🎯",
        mascot: {
          name: "The Playmaker",
          title: "Inspired by Lionel Messi",
          image: fifaPlaymaker,
          quote:
            "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
        },
      },
      programs: {
        title: "Programs",
        tagline: "Set-piece code. Rehearsed, executed.",
        emoji: "🥅",
        mascot: {
          name: "The Striker",
          title: "Inspired by Cristiano Ronaldo",
          image: fifaStriker,
          quote: "Talent without working hard is nothing. Repeat. Repeat. Repeat.",
        },
      },
      realtime: {
        title: "Realtime Scenarios",
        tagline: "Stoppage time. Down a goal. Deploy.",
        emoji: "⏱️",
        mascot: {
          name: "The Forward",
          title: "Inspired by Kylian Mbappé",
          image: fifaForward,
          quote: "Speed alone is nothing without a plan for the ninetieth minute.",
        },
      },
      projects: {
        title: "Projects",
        tagline: "Tournament-run builds. Group to final.",
        emoji: "🏆",
        mascot: {
          name: "The Keeper",
          title: "The last line of defense",
          image: fifaKeeper,
          quote: "Every save is a launch. Catch the incident before it becomes the highlight.",
        },
      },
      others: {
        title: "All Others",
        tagline: "The tactics board. Everything off the ball.",
        emoji: "📋",
        mascot: {
          name: "The Manager",
          title: "Inspired by Pep Guardiola",
          image: fifaCoach,
          quote: "I would rather lose because of my decision than win because of yours.",
        },
      },
    },
    marquee: [
      { text: "Play what you see, not what you memorized.", author: "The Playmaker" },
      { text: "Ninety minutes. Nothing else matters.", author: "The Manager" },
      { text: "Talent without work is nothing.", author: "The Striker" },
      { text: "First touch wins the second touch.", author: "Coaching Wisdom" },
      { text: "The best defense is the next attack.", author: "The Forward" },
      { text: "Every save is a launch.", author: "The Keeper" },
    ],
  },

  rocky: {
    key: "rocky",
    label: "Rocky",
    short: "🥊",
    brandName: "RingDeck",
    brandKicker: "Gym Edition",
    hero: {
      image: heroRocky,
      eyebrow: "Dawn-Run Prep",
      headA: "Fight like the ones who ",
      headAccent: "never quit",
      headB: ".",
      sub: "Five rounds of grind. Sweat-soaked answers, one-more-rep code, and take-a-punch scenarios — trained on the steps of Philadelphia.",
      cta1: "Ring the bell",
      cta2: "Head to Programs",
      stat1Label: "rounds",
      stat2Label: "corners",
      stat3Label: "rounds gone the distance",
      stat3Value: "∞",
    },
    sections: {
      qans: {
        title: "Q & Answers",
        tagline: "Roadwork. Before dawn. No shortcuts.",
        emoji: "🏃",
        mascot: {
          name: "The Contender",
          title: "Sunrise on the Rocky Steps",
          image: rockyRunner,
          quote:
            "It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward.",
        },
      },
      programs: {
        title: "Programs",
        tagline: "Bag work. Combos drilled into muscle memory.",
        emoji: "🥊",
        mascot: {
          name: "The Puncher",
          title: "Heavy-bag Hall of Fame",
          image: rockyBag,
          quote: "One more rep. Then one more. That's the whole secret.",
        },
      },
      realtime: {
        title: "Realtime Scenarios",
        tagline: "Round 12. Cut over the eye. Keep swinging.",
        emoji: "⏱️",
        mascot: {
          name: "The Dancer",
          title: "Ropework and footwork",
          image: rockyRope,
          quote: "Speed doesn't come from your feet. It comes from your refusal to be tired.",
        },
      },
      projects: {
        title: "Projects",
        tagline: "Title fights. Full-camp, twelve-round builds.",
        emoji: "🏆",
        mascot: {
          name: "The Champion",
          title: "Belt earned, not given",
          image: rockyChamp,
          quote: "Every champion was once a contender who refused to give up.",
        },
      },
      others: {
        title: "All Others",
        tagline: "The corner. Cutman. Coach. Everything else.",
        emoji: "🎯",
        mascot: {
          name: "Coach Mickey",
          title: "The voice in the corner",
          image: rockyCoach,
          quote: "You're gonna eat lightning and you're gonna crap thunder. Now get up.",
        },
      },
    },
    marquee: [
      {
        text: "It ain't about how hard you hit. It's about how hard you can get hit.",
        author: "The Contender",
      },
      { text: "One more rep. Then one more.", author: "The Puncher" },
      { text: "Yo Adrian — we did it.", author: "Rocky" },
      { text: "Every champion was once a contender who refused to quit.", author: "The Champion" },
      { text: "Get up. You're gonna eat lightning.", author: "Coach Mickey" },
      { text: "Going the distance is the win.", author: "Corner Wisdom" },
    ],
  },
};

export const themeKeys: ThemeKey[] = ["noir", "chaat", "fifa", "rocky"];
