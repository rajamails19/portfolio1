export interface HandyLink {
  name: string;
  /** What the page is about, in a few words. */
  topic: string;
  href: string;
  /** Tailwind classes that colour the site name. */
  nameClass: string;
  /** Tailwind ring/glow classes for the card. */
  cardClass: string;
}

export const handyLinks: HandyLink[] = [
  {
    name: "Microsoft Learn",
    topic: "Fundamentals of machine learning",
    href: "https://learn.microsoft.com/en-us/training/modules/fundamentals-machine-learning/",
    nameClass: "bg-gradient-to-r from-[#7fd0ff] to-[#3b8cff] bg-clip-text text-transparent",
    cardClass: "ring-[#3b8cff]/25 hover:ring-[#3b8cff]/55 hover:shadow-[0_18px_50px_-20px_#3b8cff]",
  },
  {
    name: "TutorialsPoint",
    topic: "Machine learning basics",
    href: "https://www.tutorialspoint.com/machine_learning/machine_learning_basics.htm",
    nameClass: "bg-gradient-to-r from-[#7be3b0] to-[#1fae78] bg-clip-text text-transparent",
    cardClass: "ring-[#1fae78]/25 hover:ring-[#1fae78]/55 hover:shadow-[0_18px_50px_-20px_#1fae78]",
  },
  {
    name: "IBM Think",
    topic: "What is machine learning?",
    href: "https://www.ibm.com/think/machine-learning",
    nameClass: "bg-gradient-to-r from-[#a6c8ff] to-[#4589ff] bg-clip-text text-transparent",
    cardClass: "ring-[#4589ff]/25 hover:ring-[#4589ff]/55 hover:shadow-[0_18px_50px_-20px_#4589ff]",
  },
  {
    name: "Google for Developers",
    topic: "Intro to ML — what is machine learning?",
    href: "https://developers.google.com/machine-learning/intro-to-ml/what-is-ml",
    nameClass:
      "bg-gradient-to-r from-[#6ea8fe] via-[#f2766b] via-55% to-[#5fd68a] bg-clip-text text-transparent",
    cardClass: "ring-[#fbbc05]/25 hover:ring-[#fbbc05]/55 hover:shadow-[0_18px_50px_-20px_#fbbc05]",
  },
  {
    name: "Kaizen",
    topic: "Basic concepts of machine learning",
    href: "https://kaizen.com/insights/basic-concepts-machine-learning/",
    nameClass: "bg-gradient-to-r from-[#ffb36b] to-[#ff6b3d] bg-clip-text text-transparent",
    cardClass: "ring-[#ff6b3d]/25 hover:ring-[#ff6b3d]/55 hover:shadow-[0_18px_50px_-20px_#ff6b3d]",
  },
  {
    name: "GeeksforGeeks",
    topic: "Machine learning tutorial",
    href: "https://www.geeksforgeeks.org/machine-learning/machine-learning-tutorial/",
    nameClass: "bg-gradient-to-r from-[#8ae59a] to-[#2f9e4f] bg-clip-text text-transparent",
    cardClass: "ring-[#2f9e4f]/25 hover:ring-[#2f9e4f]/55 hover:shadow-[0_18px_50px_-20px_#2f9e4f]",
  },
];
