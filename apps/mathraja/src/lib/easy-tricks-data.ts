import {
  Asterisk,
  Hash,
  Minus,
  Percent,
  PieChart,
  Sparkles,
  Split,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type TrickDifficulty = "Easy" | "Medium" | "Fast Pattern";

export type Trick = {
  id: string;
  title: string;
  summary: string;
  difficulty: TrickDifficulty;
  explanation: string;
  steps: string[];
  example: {
    question: string;
    working: string[];
    answer: string;
  };
  practice: {
    question: string;
    hint: string;
    answer: string;
  };
};

export type TrickLesson = {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tricks: Trick[];
};

export type TrickCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  status: "ready" | "coming-soon";
  lessons: TrickLesson[];
};

export const DEFAULT_LESSON_ID = "multiplication-shortcuts";

export const TRICK_CATEGORIES: TrickCategory[] = [
  {
    id: "multiplication",
    title: "Multiplication",
    icon: Asterisk,
    status: "ready",
    lessons: [
      {
        id: "multiplication-shortcuts",
        categoryId: "multiplication",
        title: "Multiplication Shortcuts",
        description: "Use friendly numbers first, then fix the extra part.",
        icon: Asterisk,
        tricks: [
          {
            id: "close-to-10-20-50-100",
            title: "Close to 10, 20, 50, or 100",
            summary: "Round to a friendly neighbor, then fix the difference.",
            difficulty: "Medium",
            explanation:
              "Round one number to an easier neighbor, multiply, then subtract or add the difference.",
            steps: [
              "Round 19 up to the nearest friendly number: 20.",
              "Multiply using the rounded number: 18 x 20 = 360.",
              "Subtract the extra group you added: 360 - 18 = 342.",
            ],
            example: {
              question: "18 x 19 = ?",
              working: ["18 x 20 = 360", "360 - 18 = 342"],
              answer: "342",
            },
            practice: {
              question: "24 x 29 = ?",
              hint: "Round 29 up to 30, multiply, then subtract one group of 24.",
              answer: "696",
            },
          },
          {
            id: "double-then-double-again",
            title: "Double, then double again",
            summary: "Times 4 is just doubling twice.",
            difficulty: "Easy",
            explanation: "Multiplying by 4 is just doubling twice.",
            steps: [
              "Double the number once: 23 x 2 = 46.",
              "Double the result again: 46 x 2 = 92.",
            ],
            example: {
              question: "23 x 4 = ?",
              working: ["23 x 2 = 46", "46 x 2 = 92"],
              answer: "92",
            },
            practice: {
              question: "37 x 4 = ?",
              hint: "Double 37, then double that result.",
              answer: "148",
            },
          },
          {
            id: "half-then-times-10",
            title: "Half, then times 10",
            summary: "Times 5 is times 10, then take half.",
            difficulty: "Easy",
            explanation: "To multiply by 5, multiply by 10 and take half.",
            steps: [
              "Multiply the number by 10: 48 x 10 = 480.",
              "Take half of that result: 480 ÷ 2 = 240.",
            ],
            example: {
              question: "48 x 5 = ?",
              working: ["48 x 10 = 480", "480 ÷ 2 = 240"],
              answer: "240",
            },
            practice: {
              question: "86 x 5 = ?",
              hint: "Multiply 86 by 10, then take half.",
              answer: "430",
            },
          },
          {
            id: "times-9-minus-one-group",
            title: "Times 9 is times 10 minus one group",
            summary: "Nine groups are almost ten groups.",
            difficulty: "Easy",
            explanation: "Nine groups are almost ten groups.",
            steps: [
              "Multiply by 10 instead: 34 x 10 = 340.",
              "Subtract one group of the number: 340 - 34 = 306.",
            ],
            example: {
              question: "34 x 9 = ?",
              working: ["34 x 10 = 340", "340 - 34 = 306"],
              answer: "306",
            },
            practice: {
              question: "27 x 9 = ?",
              hint: "Multiply 27 by 10, then subtract one group of 27.",
              answer: "243",
            },
          },
        ],
      },
      {
        id: "fast-patterns",
        categoryId: "multiplication",
        title: "Fast Patterns",
        description: "Some number patterns save a lot of scratch work.",
        icon: Zap,
        tricks: [
          {
            id: "multiply-by-11",
            title: "Multiply by 11",
            summary: "Add the digits, drop the sum in the middle.",
            difficulty: "Fast Pattern",
            explanation: "For a two-digit number, add the digits and place the sum in the middle.",
            steps: [
              "Add the two digits of the number: 3 + 2 = 5.",
              "Place that sum in the middle of the original digits: 3_5_2 → 352.",
            ],
            example: {
              question: "32 x 11 = ?",
              working: ["3 + 2 = 5", "Place 5 in the middle of 3 and 2 → 352"],
              answer: "352",
            },
            practice: {
              question: "45 x 11 = ?",
              hint: "Add 4 + 5, then place the sum between the two digits.",
              answer: "495",
            },
          },
          {
            id: "square-numbers-ending-in-5",
            title: "Square numbers ending in 5",
            summary: "Multiply the tens digit up one, then attach 25.",
            difficulty: "Fast Pattern",
            explanation: "Multiply the first digit by the next number, then add 25.",
            steps: [
              "Multiply the first digit by the number one more than it: 3 x 4 = 12.",
              "Write 25 right after that result: 12 → 1225.",
            ],
            example: {
              question: "35 x 35 = ?",
              working: ["3 x 4 = 12", "Attach 25 after 12 → 1225"],
              answer: "1225",
            },
            practice: {
              question: "65 x 65 = ?",
              hint: "Multiply 6 by 7, then attach 25 after the result.",
              answer: "4225",
            },
          },
          {
            id: "near-100",
            title: "Near 100",
            summary: "Use each number's distance below 100.",
            difficulty: "Fast Pattern",
            explanation: "For numbers close to 100, use how far each number is from 100.",
            steps: [
              "Find how far each number is below 100: 98 is 2 below, 97 is 3 below.",
              "Subtract one number's deficiency from the other number: 98 - 3 = 95.",
              "Multiply the two deficiencies together: 2 x 3 = 6, written as 06.",
              "Put the pieces together: 95 and 06 → 9506.",
            ],
            example: {
              question: "98 x 97 = ?",
              working: ["98 - 3 = 95", "2 x 3 = 06", "95 and 06 → 9506"],
              answer: "9506",
            },
            practice: {
              question: "96 x 98 = ?",
              hint: "96 is 4 below 100, 98 is 2 below 100 — combine the subtraction and the product of deficiencies.",
              answer: "9408",
            },
          },
          {
            id: "even-number-times-15",
            title: "Even number times 15",
            summary: "Times 10, then add half again.",
            difficulty: "Fast Pattern",
            explanation: "Times 15 means times 10 plus half of that again.",
            steps: [
              "Multiply the number by 10: 28 x 10 = 280.",
              "Take half of that result: 280 ÷ 2 = 140.",
              "Add the two parts together: 280 + 140 = 420.",
            ],
            example: {
              question: "28 x 15 = ?",
              working: ["28 x 10 = 280", "280 ÷ 2 = 140", "280 + 140 = 420"],
              answer: "420",
            },
            practice: {
              question: "46 x 15 = ?",
              hint: "Multiply 46 by 10, take half of that, then add the two parts.",
              answer: "690",
            },
          },
        ],
      },
    ],
  },
  {
    id: "number-skills",
    title: "Number Skills",
    icon: Hash,
    status: "ready",
    lessons: [
      {
        id: "number-sense-tricks",
        categoryId: "number-skills",
        title: "Number Sense Tricks",
        description: "Break numbers into pieces your brain likes.",
        icon: Split,
        tricks: [
          {
            id: "split-and-multiply",
            title: "Split and multiply",
            summary: "Break the bigger number into tens and ones.",
            difficulty: "Medium",
            explanation: "Break the bigger number into tens and ones.",
            steps: [
              "Split 16 into 10 and 6.",
              "Multiply each part: 10 x 7 = 70 and 6 x 7 = 42.",
              "Add the two results: 70 + 42 = 112.",
            ],
            example: {
              question: "16 x 7 = ?",
              working: ["10 x 7 = 70", "6 x 7 = 42", "70 + 42 = 112"],
              answer: "112",
            },
            practice: {
              question: "18 x 6 = ?",
              hint: "Split 18 into 10 and 8, multiply each by 6, then add.",
              answer: "108",
            },
          },
          {
            id: "make-a-ten",
            title: "Make a ten",
            summary: "Move a little from one number to the other.",
            difficulty: "Easy",
            explanation: "Move a little from one number to another so addition becomes easier.",
            steps: [
              "Move 2 from 27 to 38 to make a friendly ten: 38 becomes 40.",
              "Subtract that same 2 from 27: 27 becomes 25.",
              "Add the friendlier numbers: 40 + 25 = 65.",
            ],
            example: {
              question: "38 + 27 = ?",
              working: ["38 + 2 = 40, 27 - 2 = 25", "40 + 25 = 65"],
              answer: "65",
            },
            practice: {
              question: "49 + 36 = ?",
              hint: "Move 1 from 36 to 49 to make 50, then add what's left.",
              answer: "85",
            },
          },
          {
            id: "subtract-by-adding-up",
            title: "Subtract by adding up",
            summary: "Count the jump from small to big.",
            difficulty: "Medium",
            explanation:
              "For subtraction, count the jump from the smaller number to the bigger number.",
            steps: [
              "Jump from 67 up to the next friendly ten: 67 to 70 is 3.",
              "Jump from 70 up to 92: that's 22.",
              "Add the two jumps together: 3 + 22 = 25.",
            ],
            example: {
              question: "92 - 67 = ?",
              working: ["67 to 70 = 3", "70 to 92 = 22", "3 + 22 = 25"],
              answer: "25",
            },
            practice: {
              question: "84 - 58 = ?",
              hint: "Jump from 58 to 60, then from 60 to 84, and add the jumps.",
              answer: "26",
            },
          },
          {
            id: "same-difference",
            title: "Same difference",
            summary: "Shift both numbers by the same amount.",
            difficulty: "Easy",
            explanation:
              "Add or subtract the same amount from both numbers to make subtraction friendlier.",
            steps: [
              "Add 1 to both numbers so the second becomes a friendly ten: 39 becomes 40, 73 becomes 74.",
              "Subtract using the friendlier numbers: 74 - 40 = 34.",
            ],
            example: {
              question: "73 - 39 = ?",
              working: ["73 + 1 = 74, 39 + 1 = 40", "74 - 40 = 34"],
              answer: "34",
            },
            practice: {
              question: "96 - 48 = ?",
              hint: "Add 2 to both numbers so 48 becomes 50, then subtract.",
              answer: "48",
            },
          },
        ],
      },
    ],
  },
  { id: "subtraction", title: "Subtraction", icon: Minus, status: "coming-soon", lessons: [] },
  { id: "fractions", title: "Fractions", icon: PieChart, status: "coming-soon", lessons: [] },
  { id: "percentages", title: "Percentages", icon: Percent, status: "coming-soon", lessons: [] },
  { id: "other-tricks", title: "Other Tricks", icon: Sparkles, status: "coming-soon", lessons: [] },
];

export function getAllLessons(): TrickLesson[] {
  return TRICK_CATEGORIES.flatMap((category) => category.lessons);
}

export function getLessonById(id: string | undefined): TrickLesson {
  const lessons = getAllLessons();
  return (
    lessons.find((lesson) => lesson.id === id) ??
    lessons.find((lesson) => lesson.id === DEFAULT_LESSON_ID)!
  );
}

export function getCategoryForLesson(lessonId: string): TrickCategory | undefined {
  return TRICK_CATEGORIES.find((category) =>
    category.lessons.some((lesson) => lesson.id === lessonId),
  );
}

export function isValidLessonId(id: string | undefined): boolean {
  if (!id) return false;
  return getAllLessons().some((lesson) => lesson.id === id);
}
