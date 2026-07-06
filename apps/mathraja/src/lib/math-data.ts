import fractionsImg from "@/assets/topic-fractions.jpg";
import additionImg from "@/assets/topic-addition.jpg";
import subtractionImg from "@/assets/topic-subtraction.jpg";
import multiplicationImg from "@/assets/topic-multiplication.jpg";
import divisionImg from "@/assets/topic-division.jpg";
import geometryImg from "@/assets/topic-geometry.jpg";
import algebraImg from "@/assets/topic-algebra.jpg";
import wordImg from "@/assets/topic-wordproblems.jpg";

export type Topic = {
  slug: string;
  name: string;
  tagline: string;
  emoji: string;
  image: string;
  grades: number[];
  accent: string;
  tips: string[];
  tricks: string[];
  examples: { question: string; steps: string[]; answer: string }[];
  quiz: { q: string; options: string[]; answer: number; hint?: string }[];
};

export const TOPICS: Topic[] = [
  {
    slug: "addition",
    name: "Addition",
    tagline: "Put things together and count them all!",
    emoji: "➕",
    image: additionImg,
    grades: [1, 2, 3, 4],
    accent: "from-amber-300/70 to-orange-200/60",
    tips: [
      "Start with the bigger number, then count up.",
      "Group numbers that make 10 first — it's faster.",
      "Line up the columns: ones under ones, tens under tens.",
    ],
    tricks: [
      "9 + anything? Take 1 from the other number and turn 9 into 10.",
      "Doubles are your superpower: 6+6=12, 7+7=14. Learn them by heart.",
      "Near-doubles: 6+7 = (6+6)+1 = 13.",
    ],
    examples: [
      {
        question: "27 + 48 = ?",
        steps: [
          "Add the ones: 7 + 8 = 15. Write 5, carry 1.",
          "Add the tens: 2 + 4 = 6, plus the carried 1 = 7.",
          "Answer: 75.",
        ],
        answer: "75",
      },
      {
        question: "199 + 46 = ?",
        steps: [
          "199 is close to 200. Add 1 to make it 200, and take 1 from 46 to make 45.",
          "Now do 200 + 45 = 245.",
        ],
        answer: "245",
      },
    ],
    quiz: [
      { q: "14 + 9 = ?", options: ["21", "22", "23", "24"], answer: 2, hint: "Try 14 + 10 − 1." },
      { q: "36 + 47 = ?", options: ["73", "83", "81", "93"], answer: 1 },
      { q: "Which pair makes 10?", options: ["3 + 6", "4 + 6", "5 + 4", "2 + 7"], answer: 1 },
    ],
  },
  {
    slug: "subtraction",
    name: "Subtraction",
    tagline: "Take away, and find what's left.",
    emoji: "➖",
    image: subtractionImg,
    grades: [1, 2, 3, 4],
    accent: "from-orange-300/70 to-red-200/60",
    tips: [
      "Think of subtraction as 'how far apart' two numbers are.",
      "Count up from the smaller number — often faster than counting down.",
      "Check by adding back: if 12 − 5 = 7, then 7 + 5 should give 12.",
    ],
    tricks: [
      "Subtracting 9? Subtract 10, then add 1 back.",
      "Round to a friendly number: 83 − 28 = 83 − 30 + 2 = 55.",
    ],
    examples: [
      {
        question: "62 − 27 = ?",
        steps: [
          "Ones: 2 − 7 doesn't work, so borrow. 12 − 7 = 5.",
          "Tens: 5 (after borrowing) − 2 = 3.",
          "Answer: 35.",
        ],
        answer: "35",
      },
    ],
    quiz: [
      { q: "15 − 8 = ?", options: ["6", "7", "8", "9"], answer: 1 },
      { q: "100 − 37 = ?", options: ["53", "63", "73", "67"], answer: 1 },
    ],
  },
  {
    slug: "multiplication",
    name: "Multiplication",
    tagline: "Speedy adding of equal groups.",
    emoji: "✖️",
    image: multiplicationImg,
    grades: [2, 3, 4, 5],
    accent: "from-teal-300/70 to-emerald-200/60",
    tips: [
      "Multiplication is repeated addition: 4 × 3 means 3 + 3 + 3 + 3.",
      "Order doesn't matter: 6 × 7 = 7 × 6.",
      "Anything × 0 is always 0. Anything × 1 stays the same.",
    ],
    tricks: [
      "× 5: multiply by 10, then halve. 5 × 8 = 80 ÷ 2 = 40.",
      "× 9 trick with fingers: hold down finger #n, count left/right.",
      "× 11 for two-digit: 11 × 24 → split 2_4 and put 2+4 in the middle = 264.",
    ],
    examples: [
      {
        question: "23 × 4 = ?",
        steps: ["Break it: 20 × 4 = 80, and 3 × 4 = 12.", "Add: 80 + 12 = 92."],
        answer: "92",
      },
    ],
    quiz: [
      { q: "7 × 8 = ?", options: ["48", "54", "56", "64"], answer: 2 },
      { q: "12 × 6 = ?", options: ["62", "72", "76", "84"], answer: 1 },
    ],
  },
  {
    slug: "division",
    name: "Division",
    tagline: "Sharing fairly into equal parts.",
    emoji: "➗",
    image: divisionImg,
    grades: [3, 4, 5, 6],
    accent: "from-yellow-300/70 to-amber-200/60",
    tips: [
      "Division undoes multiplication. If 6 × 4 = 24, then 24 ÷ 4 = 6.",
      "Think 'how many groups?' or 'how many in each group?'",
    ],
    tricks: [
      "÷ 5: divide by 10, then double.",
      "A number is divisible by 3 if its digits sum to a multiple of 3.",
    ],
    examples: [
      {
        question: "84 ÷ 4 = ?",
        steps: ["8 ÷ 4 = 2 (tens).", "4 ÷ 4 = 1 (ones).", "Answer: 21."],
        answer: "21",
      },
    ],
    quiz: [
      { q: "72 ÷ 8 = ?", options: ["7", "8", "9", "12"], answer: 2 },
      { q: "45 ÷ 5 = ?", options: ["8", "9", "10", "11"], answer: 1 },
    ],
  },
  {
    slug: "fractions",
    name: "Fractions",
    tagline: "Parts of a whole — pizza, cake, and pie!",
    emoji: "🍕",
    image: fractionsImg,
    grades: [3, 4, 5, 6],
    accent: "from-red-300/70 to-orange-200/60",
    tips: [
      "The top number (numerator) is how many pieces you have.",
      "The bottom (denominator) is how many equal pieces the whole is cut into.",
      "Same denominator? Just add or subtract the tops.",
    ],
    tricks: [
      "To compare fractions, cross-multiply: 3/4 vs 5/7 → 3×7=21 vs 5×4=20, so 3/4 is bigger.",
      "Simplify by dividing top and bottom by the same number.",
    ],
    examples: [
      {
        question: "1/4 + 2/4 = ?",
        steps: ["Same bottom, so add tops: 1 + 2 = 3.", "Answer: 3/4."],
        answer: "3/4",
      },
      {
        question: "Simplify 8/12",
        steps: ["Both divide by 4.", "8 ÷ 4 = 2, 12 ÷ 4 = 3.", "Answer: 2/3."],
        answer: "2/3",
      },
    ],
    quiz: [
      { q: "Which is bigger?", options: ["1/3", "1/4", "1/5", "1/6"], answer: 0 },
      { q: "1/2 + 1/2 = ?", options: ["1/4", "2/4", "1", "2"], answer: 2 },
    ],
  },
  {
    slug: "geometry",
    name: "Geometry",
    tagline: "Shapes, angles, and the world around us.",
    emoji: "📐",
    image: geometryImg,
    grades: [1, 2, 3, 4, 5, 6],
    accent: "from-emerald-300/70 to-teal-200/60",
    tips: [
      "A triangle always has 3 sides. A quadrilateral has 4.",
      "A right angle is exactly 90° — like the corner of a book.",
      "Perimeter = go around. Area = space inside.",
    ],
    tricks: [
      "Rectangle area = length × width.",
      "Triangle area = (base × height) ÷ 2.",
      "Circle area ≈ 3.14 × radius × radius.",
    ],
    examples: [
      {
        question: "A rectangle is 8 cm × 5 cm. Find its area and perimeter.",
        steps: [
          "Area = 8 × 5 = 40 cm².",
          "Perimeter = 2 × (8 + 5) = 26 cm.",
        ],
        answer: "Area 40 cm², Perimeter 26 cm",
      },
    ],
    quiz: [
      { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
      { q: "A right angle equals…", options: ["45°", "60°", "90°", "180°"], answer: 2 },
    ],
  },
  {
    slug: "word-problems",
    name: "Word Problems",
    tagline: "Turn stories into math you can solve.",
    emoji: "📖",
    image: wordImg,
    grades: [1, 2, 3, 4, 5, 6],
    accent: "from-orange-200/70 to-amber-300/60",
    tips: [
      "Read the whole problem twice before doing anything.",
      "Underline the numbers and circle the question.",
      "Ask: am I combining, taking away, sharing, or grouping?",
    ],
    tricks: [
      "Draw a picture or bar model — it helps you 'see' the math.",
      "Write a small equation before jumping to the answer.",
    ],
    examples: [
      {
        question: "Maya has 24 stickers. She gives 3 friends 5 stickers each. How many are left?",
        steps: [
          "Given away: 3 × 5 = 15.",
          "Left: 24 − 15 = 9.",
        ],
        answer: "9 stickers",
      },
    ],
    quiz: [
      {
        q: "A box has 12 apples. You add 3 more boxes of 12. Total apples?",
        options: ["24", "36", "48", "60"],
        answer: 2,
      },
    ],
  },
  {
    slug: "algebra",
    name: "Pre-Algebra",
    tagline: "Meet x — the mystery number.",
    emoji: "🔤",
    image: algebraImg,
    grades: [5, 6],
    accent: "from-teal-400/70 to-cyan-200/60",
    tips: [
      "A letter (like x) is just a number in disguise.",
      "Whatever you do to one side of the equation, do to the other.",
      "Get x alone on one side — that's the whole game.",
    ],
    tricks: [
      "See a plus? Subtract from both sides. See a times? Divide both sides.",
      "Check your answer by plugging it back in.",
    ],
    examples: [
      {
        question: "Solve: x + 7 = 15",
        steps: ["Subtract 7 from both sides.", "x = 15 − 7 = 8."],
        answer: "x = 8",
      },
      {
        question: "Solve: 3x = 21",
        steps: ["Divide both sides by 3.", "x = 7."],
        answer: "x = 7",
      },
    ],
    quiz: [
      { q: "If x + 4 = 10, x = ?", options: ["4", "6", "14", "40"], answer: 1 },
      { q: "If 2x = 18, x = ?", options: ["6", "8", "9", "16"], answer: 2 },
    ],
  },
];

export const GRADES = [
  { grade: 1, title: "Grade 1", subtitle: "Little counters", color: "from-amber-200 to-orange-300", topics: ["addition", "subtraction", "geometry", "word-problems"] },
  { grade: 2, title: "Grade 2", subtitle: "Number explorers", color: "from-orange-200 to-red-300", topics: ["addition", "subtraction", "multiplication", "geometry", "word-problems"] },
  { grade: 3, title: "Grade 3", subtitle: "Times-tables champs", color: "from-yellow-200 to-amber-300", topics: ["multiplication", "division", "fractions", "geometry", "word-problems"] },
  { grade: 4, title: "Grade 4", subtitle: "Fraction wizards", color: "from-teal-200 to-emerald-300", topics: ["multiplication", "division", "fractions", "geometry", "word-problems"] },
  { grade: 5, title: "Grade 5", subtitle: "Decimal detectives", color: "from-emerald-200 to-teal-400", topics: ["fractions", "division", "geometry", "word-problems", "algebra"] },
  { grade: 6, title: "Grade 6", subtitle: "Pre-algebra pros", color: "from-cyan-200 to-teal-400", topics: ["fractions", "division", "geometry", "word-problems", "algebra"] },
];

export const FORMULAS = [
  { category: "Perimeter & Area", items: [
    { name: "Square area", formula: "A = s × s", example: "s = 4 → A = 16" },
    { name: "Rectangle area", formula: "A = l × w", example: "6×3 → 18" },
    { name: "Triangle area", formula: "A = (b × h) ÷ 2", example: "b=6,h=4 → 12" },
    { name: "Circle area", formula: "A = π × r²", example: "r=5 → ~78.5" },
    { name: "Rectangle perimeter", formula: "P = 2(l + w)", example: "5,3 → 16" },
    { name: "Circle circumference", formula: "C = 2 × π × r", example: "r=7 → ~44" },
  ]},
  { category: "Volume", items: [
    { name: "Cube", formula: "V = s³", example: "s=3 → 27" },
    { name: "Rectangular prism", formula: "V = l × w × h", example: "2×3×4 → 24" },
    { name: "Cylinder", formula: "V = π × r² × h", example: "r=2,h=5 → ~62.8" },
  ]},
  { category: "Fractions", items: [
    { name: "Add (same bottom)", formula: "a/n + b/n = (a+b)/n", example: "1/5+2/5=3/5" },
    { name: "Multiply", formula: "a/b × c/d = (a×c)/(b×d)", example: "2/3×3/4=1/2" },
    { name: "Divide", formula: "a/b ÷ c/d = a/b × d/c", example: "1/2÷1/4=2" },
  ]},
  { category: "Number sense", items: [
    { name: "Average (mean)", formula: "sum ÷ count", example: "(2+4+6)/3 = 4" },
    { name: "Percent of", formula: "(part ÷ whole) × 100", example: "15/60 = 25%" },
  ]},
];

export const DICTIONARY = [
  { term: "Sum", def: "The answer to an addition problem.", ex: "5 + 3 = 8. The sum is 8." },
  { term: "Difference", def: "The answer to a subtraction problem.", ex: "10 − 4 = 6." },
  { term: "Product", def: "The answer to a multiplication problem.", ex: "6 × 7 = 42." },
  { term: "Quotient", def: "The answer to a division problem.", ex: "20 ÷ 4 = 5." },
  { term: "Numerator", def: "The top number of a fraction — how many parts you have.", ex: "In 3/4, the 3 is the numerator." },
  { term: "Denominator", def: "The bottom number — how many equal parts make the whole.", ex: "In 3/4, the 4 is the denominator." },
  { term: "Prime number", def: "A number greater than 1 with only two factors: 1 and itself.", ex: "2, 3, 5, 7, 11 …" },
  { term: "Factor", def: "A number that divides another number exactly.", ex: "Factors of 12: 1, 2, 3, 4, 6, 12." },
  { term: "Multiple", def: "The result of multiplying a number by any whole number.", ex: "Multiples of 4: 4, 8, 12, 16…" },
  { term: "Perimeter", def: "The distance around a shape.", ex: "A 3×5 rectangle has perimeter 16." },
  { term: "Area", def: "How much flat space a shape covers.", ex: "3×5 rectangle → area 15." },
  { term: "Angle", def: "The space between two lines meeting at a point.", ex: "A right angle is 90°." },
  { term: "Equation", def: "A math sentence with an equals sign.", ex: "x + 2 = 5." },
  { term: "Variable", def: "A letter that stands for a number.", ex: "In x + 3 = 7, x is a variable." },
];

export const PUZZLES = [
  { title: "The Missing Number", diff: "Easy", body: "1, 3, 5, 7, __, 11. What's missing?", answer: "9 — the pattern skips by 2." },
  { title: "Magic Square", diff: "Medium", body: "Arrange 1–9 in a 3×3 grid so every row, column and diagonal sums to 15.", answer: "One solution: 2,7,6 / 9,5,1 / 4,3,8." },
  { title: "Farmer's Fence", diff: "Medium", body: "A farmer has 20m of fence. What's the largest rectangle he can make?", answer: "A 5×5 square — area 25 m²." },
  { title: "Coin Riddle", diff: "Hard", body: "You have 8 coins; one is fake and lighter. Using a balance twice, how do you find it?", answer: "Split into 3-3-2, weigh the 3s; narrow down and weigh 1v1." },
  { title: "Pizza Party", diff: "Easy", body: "A pizza is cut into 8 slices. You eat 3, your friend eats 2. What fraction is left?", answer: "3/8." },
  { title: "Age Puzzle", diff: "Medium", body: "In 5 years, Mia will be twice as old as she was 5 years ago. How old is she now?", answer: "15." },
];

export const GAMES = [
  { title: "Number Ninja", desc: "Slice the correct answers before the timer runs out.", topic: "Addition & subtraction", difficulty: "All grades", emoji: "🥷" },
  { title: "Fraction Bakery", desc: "Bake the exact fraction of pie a customer orders.", topic: "Fractions", difficulty: "Grades 3–5", emoji: "🥧" },
  { title: "Shape Safari", desc: "Spot triangles, hexagons and cylinders hiding in the jungle.", topic: "Geometry", difficulty: "Grades 1–3", emoji: "🦒" },
  { title: "Times Table Racers", desc: "Race a rocket by answering multiplication questions.", topic: "Multiplication", difficulty: "Grades 2–4", emoji: "🚀" },
  { title: "Word Problem Detective", desc: "Solve mystery cases by finding the hidden math.", topic: "Word problems", difficulty: "Grades 3–6", emoji: "🕵️" },
  { title: "Algebra Alchemist", desc: "Balance potions on a scale — one side must equal the other.", topic: "Pre-Algebra", difficulty: "Grades 5–6", emoji: "⚗️" },
];

export const TIPS = [
  { icon: "🌱", title: "5 minutes a day beats 1 hour a week", body: "Small daily practice builds strong number sense. Try one warm-up problem before breakfast." },
  { icon: "🖍️", title: "Draw it before you solve it", body: "Bars, circles, arrays — pictures unlock word problems." },
  { icon: "🎯", title: "Estimate first", body: "Guess the answer before calculating. It teaches you to catch big mistakes fast." },
  { icon: "🔁", title: "Explain it back", body: "If you can teach a step to a stuffed animal, you truly understand it." },
  { icon: "🧩", title: "Mistakes are clues", body: "A wrong answer tells you exactly where to look — celebrate them." },
  { icon: "🎮", title: "Play, don't drill", body: "Games and puzzles wire math into long-term memory much better than repetition alone." },
];
