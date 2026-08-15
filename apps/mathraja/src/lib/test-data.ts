export type TestProblem = {
  q: string;
  a: string;
  hint?: string[];
  grid?: { a: number; b: number; op: "+" | "-" };
};

export type TestSection = {
  emoji: string;
  title: string;
  analogy?: string;
  problems: TestProblem[];
};

export type Test = {
  slug: string;
  title: string;
  subtitle: string;
  grade: number;
  sections: TestSection[];
};

export const TESTS: Test[] = [
  {
    slug: "test1",
    title: "Test 1",
    subtitle: "4th Grade Math Practice — 50 Problems",
    grade: 4,
    sections: [
      {
        emoji: "➕",
        title: "Addition",
        problems: [
          { q: "3,478 + 2,965 = ?", a: "6,443", grid: { a: 3478, b: 2965, op: "+" } },
          { q: "6,729 + 1,846 = ?", a: "8,575", grid: { a: 6729, b: 1846, op: "+" } },
          { q: "4,567 + 3,888 = ?", a: "8,455", grid: { a: 4567, b: 3888, op: "+" } },
          {
            q: "A library has 2,450 storybooks and buys 1,875 more. How many books now?",
            a: "4,325 books",
            grid: { a: 2450, b: 1875, op: "+" },
          },
          {
            q: "Mia scored 1,275 points in one game and 2,890 in another. Total?",
            a: "4,165 points",
            grid: { a: 1275, b: 2890, op: "+" },
          },
        ],
      },
      {
        emoji: "➖",
        title: "Subtraction",
        problems: [
          { q: "8,432 − 3,567 = ?", a: "4,865", grid: { a: 8432, b: 3567, op: "-" } },
          { q: "10,000 − 4,786 = ?", a: "5,214", grid: { a: 10000, b: 4786, op: "-" } },
          { q: "7,205 − 2,948 = ?", a: "4,257", grid: { a: 7205, b: 2948, op: "-" } },
          {
            q: "A store had 6,500 toys and sold 2,785. How many remain?",
            a: "3,715 toys",
            grid: { a: 6500, b: 2785, op: "-" },
          },
          {
            q: "A stadium has 9,000 seats. If 7,456 are occupied, how many are empty?",
            a: "1,544 seats",
            grid: { a: 9000, b: 7456, op: "-" },
          },
        ],
      },
      {
        emoji: "✖️",
        title: "Multiplication",
        analogy: "Think of multiplication as equal groups: 24 × 8 means 24 groups with 8 in each group.",
        problems: [
          { q: "27 × 6 = ?", a: "162", hint: ["27 = 20 + 7", "20 × 6 = 120", "7 × 6 = 42", "120 + 42 = 162"] },
          { q: "48 × 7 = ?", a: "336", hint: ["48 = 40 + 8", "40 × 7 = 280", "8 × 7 = 56", "280 + 56 = 336"] },
          { q: "125 × 4 = ?", a: "500", hint: ["125 = 100 + 25", "100 × 4 = 400", "25 × 4 = 100", "400 + 100 = 500"] },
          {
            q: "A classroom has 24 students. Each student receives 8 pencils. How many pencils are needed?",
            a: "192 pencils",
            hint: ["24 × 8", "20 × 8 = 160", "4 × 8 = 32", "160 + 32 = 192"],
          },
          {
            q: "A theater has 35 rows with 12 seats in each row. How many seats?",
            a: "420 seats",
            hint: ["35 × 12", "35 × 10 = 350", "35 × 2 = 70", "350 + 70 = 420"],
          },
        ],
      },
      {
        emoji: "➗",
        title: "Division",
        analogy: "Division is like sharing pizza equally — everyone should receive the same amount.",
        problems: [
          { q: "144 ÷ 12 = ?", a: "12", hint: ["12 × 10 = 120", "144 − 120 = 24", "24 ÷ 12 = 2", "10 + 2 = 12"] },
          { q: "225 ÷ 9 = ?", a: "25", hint: ["9 × 20 = 180", "225 − 180 = 45", "45 ÷ 9 = 5", "20 + 5 = 25"] },
          { q: "156 ÷ 6 = ?", a: "26", hint: ["6 × 20 = 120", "156 − 120 = 36", "36 ÷ 6 = 6", "20 + 6 = 26"] },
          {
            q: "168 candies are shared equally among 8 children. How many does each get?",
            a: "21 candies",
            hint: ["168 ÷ 8", "8 × 20 = 160", "168 − 160 = 8", "8 ÷ 8 = 1", "20 + 1 = 21"],
          },
          {
            q: "250 students are placed equally into 10 buses. How many per bus?",
            a: "25 students",
            hint: ["250 ÷ 10", "drop one zero from each → 25 ÷ 1"],
          },
        ],
      },
      {
        emoji: "🍕",
        title: "Fractions",
        analogy: "Fractions are easiest to imagine as pizza. 3/8 means the pizza was cut into 8 equal pieces, and you have 3 pieces.",
        problems: [
          { q: "Which is larger: 3/4 or 2/4?", a: "3/4", hint: ["same bottom (4)", "compare tops: 3 vs 2", "3 > 2"] },
          { q: "2/8 + 3/8 = ?", a: "5/8", hint: ["same bottom (8)", "add tops: 2 + 3 = 5", "→ 5/8"] },
          { q: "7/10 − 3/10 = ?", a: "4/10 (or 2/5)", hint: ["same bottom (10)", "subtract tops: 7 − 3 = 4", "→ 4/10", "simplify: 4 ÷ 2 = 2, 10 ÷ 2 = 5 → 2/5"] },
          { q: "A pizza has 8 slices. Sam eats 3. What fraction remains?", a: "5/8", hint: ["total slices = 8 (bottom)", "left = 8 − 3 = 5 (top)", "→ 5/8"] },
          { q: "Which fraction is equivalent to 1/2: 2/4, 3/4, or 1/3?", a: "2/4", hint: ["2/4 → 2 ÷ 2 = 1, 4 ÷ 2 = 2 → 1/2 ✓", "3/4 → not 1/2", "1/3 → not 1/2"] },
        ],
      },
      {
        emoji: "📐",
        title: "Geometry",
        problems: [
          { q: "A rectangle is 8 cm long and 5 cm wide. What is its perimeter?", a: "8 + 5 + 8 + 5 = 26 → 26 cm", hint: ["8 + 5 + 8 + 5", "= 2 × (8 + 5)", "= 2 × 13", "= 26 cm"] },
          { q: "What is its area?", a: "8 × 5 = 40 → 40 cm²", hint: ["length × width", "8 × 5 = 40 cm²"] },
          { q: "A square has sides of 7 cm. What is its perimeter?", a: "7 × 4 = 28 → 28 cm", hint: ["4 equal sides", "7 × 4 = 28 cm"] },
          { q: "A triangle has angles of 50° and 60°. What is the third angle?", a: "180 − 50 − 60 = 70 → 70°", hint: ["angles sum to 180°", "180 − 50 = 130", "130 − 60 = 70°"] },
          { q: "How many lines of symmetry does a square have?", a: "4", hint: ["2 through the middle (↕ ↔)", "2 through the corners (⤡ ⤢)", "2 + 2 = 4"] },
        ],
      },
      {
        emoji: "🔎",
        title: "Patterns & Beginning Algebra",
        analogy:
          "The □ is a mystery box — figure out what's hiding inside. For □ + 17 = 45, think backward: 45 − 17 = 28, so □ = 28. That's already the basic idea behind algebra.",
        problems: [
          { q: "□ + 17 = 45", a: "28", hint: ["undo + 17 with − 17", "45 − 17 = 28"] },
          { q: "6 × □ = 42", a: "7", hint: ["undo × 6 with ÷ 6", "42 ÷ 6 = 7"] },
          { q: "□ − 25 = 40", a: "65", hint: ["undo − 25 with + 25", "40 + 25 = 65"] },
          { q: "100 ÷ □ = 10", a: "10", hint: ["10 × □ = 100", "100 ÷ 10 = 10"] },
          { q: "Continue the pattern: 5, 11, 17, 23, ___, ___", a: "29, 35", hint: ["11 − 5 = 6", "17 − 11 = 6", "23 − 17 = 6 → the gap is always 6", "23 + 6 = 29", "29 + 6 = 35"] },
        ],
      },
      {
        emoji: "⏰",
        title: "Time",
        problems: [
          { q: "School starts at 8:15 AM and ends at 2:45 PM. How long is school?", a: "6 hours 30 minutes", hint: ["8:15 → 2:15 = 6 hours", "2:15 → 2:45 = 30 minutes", "6 h + 30 min"] },
          { q: "A movie starts at 4:30 PM and lasts 2 hours. When does it finish?", a: "6:30 PM", hint: ["4:30 + 2 hours", "= 6:30 PM"] },
          { q: "Soccer starts at 5:45 PM and ends at 7:15 PM. How long is practice?", a: "1 hour 30 minutes", hint: ["5:45 → 6:45 = 1 hour", "6:45 → 7:15 = 30 minutes", "1 h + 30 min"] },
          { q: "What time is 45 minutes after 9:35 AM?", a: "10:20 AM", hint: ["9:35 + 25 min = 10:00", "45 − 25 = 20 min left", "10:00 + 20 min = 10:20 AM"] },
          { q: "A flight leaves at 11:20 AM and takes 3 hours 30 minutes. When does it arrive?", a: "2:50 PM", hint: ["11:20 + 3 hours = 2:20 PM", "2:20 + 30 min = 2:50 PM"] },
        ],
      },
      {
        emoji: "💵",
        title: "Money & Decimals",
        analogy: "Decimals with money become much easier when you remember: $1.00 = 100 cents. So $0.25 simply means 25 cents.",
        problems: [
          { q: "$5.75 + $3.25 = ?", a: "$9.00", hint: ["75¢ + 25¢ = 100¢ = $1.00", "$5 + $3 + $1.00", "= $9.00"] },
          { q: "$10.00 − $6.45 = ?", a: "$3.55", hint: ["$10.00 − $6.00 = $4.00", "$4.00 − $0.45 = $3.55"] },
          { q: "A toy costs $12.50. You pay $20. How much change?", a: "$7.50", hint: ["$20.00 − $12.50", "= $7.50"] },
          { q: "Three notebooks cost $4 each. What is the total?", a: "$12", hint: ["3 × $4", "= $12"] },
          { q: "You have $25. You buy a book for $8.75 and a game for $10.25. How much remains?", a: "25 − 8.75 − 10.25 = 6 → $6.00", hint: ["$8.75 + $10.25 = $19.00", "$25.00 − $19.00", "= $6.00"] },
        ],
      },
      {
        emoji: "🧠",
        title: "Multi-Step Word Problems",
        analogy: "These are especially good because you must first decide which math operation to use.",
        problems: [
          {
            q: "A school has 245 boys and 238 girls. If 37 students are absent today, how many students are present?",
            a: "245 + 238 = 483\n483 − 37 = 446\nAnswer: 446 students",
            hint: ["245 + 238 = 483", "483 − 37 = 446"],
          },
          {
            q: "There are 8 boxes. Each contains 24 chocolates. The teacher gives away 35 chocolates. How many remain?",
            a: "8 × 24 = 192\n192 − 35 = 157\nAnswer: 157 chocolates",
            hint: ["8 × 24 = 192", "192 − 35 = 157"],
          },
          {
            q: "A family drives 175 miles on Saturday and 225 miles on Sunday. Their entire trip is 600 miles. How many miles remain?",
            a: "175 + 225 = 400\n600 − 400 = 200\nAnswer: 200 miles",
            hint: ["175 + 225 = 400", "600 − 400 = 200"],
          },
          {
            q: "A farmer collects 144 eggs and places 12 eggs in each carton. He sells 7 cartons. How many cartons remain?",
            a: "144 ÷ 12 = 12 cartons\n12 − 7 = 5 cartons\nAnswer: 5 cartons",
            hint: ["144 ÷ 12 = 12 cartons", "12 − 7 = 5 cartons"],
          },
          {
            q: "Emma has $50. She buys 3 books costing $8 each and a toy costing $15. How much money does she have left?",
            a: "3 × $8 = $24\n$24 + $15 = $39\n$50 − $39 = $11\nAnswer: $11",
            hint: ["3 × $8 = $24", "$24 + $15 = $39", "$50 − $39 = $11"],
          },
        ],
      },
    ],
  },
  {
    slug: "grade3-test1",
    title: "Test 1",
    subtitle: "3rd Grade Math Practice — 50 Problems",
    grade: 3,
    sections: [
      {
        emoji: "➕",
        title: "Addition",
        problems: [
          { q: "234 + 145 = ?", a: "379", grid: { a: 234, b: 145, op: "+" } },
          { q: "356 + 213 = ?", a: "569", grid: { a: 356, b: 213, op: "+" } },
          { q: "478 + 321 = ?", a: "799", grid: { a: 478, b: 321, op: "+" } },
          {
            q: "A class collected 120 cans on Monday and 95 more on Tuesday. How many cans in total?",
            a: "215 cans",
            grid: { a: 120, b: 95, op: "+" },
          },
          {
            q: "Leo has 45 stickers and gets 30 more. How many does he have now?",
            a: "75 stickers",
            grid: { a: 45, b: 30, op: "+" },
          },
        ],
      },
      {
        emoji: "➖",
        title: "Subtraction",
        problems: [
          { q: "486 − 253 = ?", a: "233", grid: { a: 486, b: 253, op: "-" } },
          { q: "620 − 275 = ?", a: "345", grid: { a: 620, b: 275, op: "-" } },
          { q: "500 − 168 = ?", a: "332", grid: { a: 500, b: 168, op: "-" } },
          {
            q: "A parking lot has 350 cars. 120 leave. How many remain?",
            a: "230 cars",
            grid: { a: 350, b: 120, op: "-" },
          },
          {
            q: "Sam had 275 marbles and gave away 89. How many does he have left?",
            a: "186 marbles",
            grid: { a: 275, b: 89, op: "-" },
          },
        ],
      },
      {
        emoji: "✖️",
        title: "Multiplication",
        analogy: "Multiplication is repeated addition: 6 × 7 means 6 groups of 7.",
        problems: [
          { q: "6 × 7 = ?", a: "42", hint: ["6 groups of 7", "7+7+7+7+7+7 = 42"] },
          { q: "8 × 5 = ?", a: "40", hint: ["8 groups of 5", "count by 5s: 5,10,15,20,25,30,35,40"] },
          { q: "9 × 4 = ?", a: "36", hint: ["9 groups of 4", "or 10 × 4 = 40, then 40 − 4 = 36"] },
          {
            q: "6 bags each have 8 apples. How many apples in total?",
            a: "48 apples",
            hint: ["6 × 8", "count by 8s: 8,16,24,32,40,48"],
          },
          {
            q: "A farmer plants 7 rows with 9 trees in each row. How many trees?",
            a: "63 trees",
            hint: ["7 × 9", "or 7 × 10 = 70, then 70 − 7 = 63"],
          },
        ],
      },
      {
        emoji: "➗",
        title: "Division",
        analogy: "Division undoes multiplication — 36 ÷ 6 asks: 6 times what equals 36?",
        problems: [
          { q: "36 ÷ 6 = ?", a: "6", hint: ["6 × ? = 36", "6 × 6 = 36"] },
          { q: "45 ÷ 9 = ?", a: "5", hint: ["9 × ? = 45", "9 × 5 = 45"] },
          { q: "63 ÷ 7 = ?", a: "9", hint: ["7 × ? = 63", "7 × 9 = 63"] },
          {
            q: "48 cookies are shared equally among 6 kids. How many does each get?",
            a: "8 cookies",
            hint: ["48 ÷ 6", "6 × 8 = 48"],
          },
          {
            q: "54 pencils are put into boxes of 9. How many boxes are needed?",
            a: "6 boxes",
            hint: ["54 ÷ 9", "9 × 6 = 54"],
          },
        ],
      },
      {
        emoji: "🍕",
        title: "Fractions",
        analogy: "A fraction like 2/3 means the whole was cut into 3 equal pieces, and you have 2 of them.",
        problems: [
          { q: "Which is larger: 1/3 or 2/3?", a: "2/3", hint: ["same bottom (3)", "compare tops: 1 vs 2", "2 > 1"] },
          { q: "1/5 + 2/5 = ?", a: "3/5", hint: ["same bottom (5)", "add tops: 1 + 2 = 3", "→ 3/5"] },
          { q: "3/6 − 1/6 = ?", a: "2/6 (or 1/3)", hint: ["same bottom (6)", "subtract tops: 3 − 1 = 2", "→ 2/6 = 1/3"] },
          { q: "A cake has 6 slices. Tom eats 2. What fraction remains?", a: "4/6 (or 2/3)", hint: ["total slices = 6 (bottom)", "left = 6 − 2 = 4 (top)", "→ 4/6 = 2/3"] },
          { q: "Which fraction equals 1/2: 2/4, 1/4, or 3/8?", a: "2/4", hint: ["2/4 → 2 ÷ 2 = 1, 4 ÷ 2 = 2 → 1/2 ✓"] },
        ],
      },
      {
        emoji: "📐",
        title: "Geometry",
        problems: [
          { q: "A rectangle is 6 cm long and 3 cm wide. What is its perimeter?", a: "18 cm", hint: ["6 + 3 + 6 + 3", "= 2 × (6 + 3) = 2 × 9", "= 18 cm"] },
          { q: "What is its area?", a: "18 cm²", hint: ["length × width", "6 × 3 = 18 cm²"] },
          { q: "A square has sides of 5 cm. What is its perimeter?", a: "20 cm", hint: ["4 equal sides", "5 × 4 = 20 cm"] },
          { q: "How many sides does a hexagon have?", a: "6", hint: ["hexa- means 6"] },
          { q: "How many corners (vertices) does a triangle have?", a: "3", hint: ["tri- means 3"] },
        ],
      },
      {
        emoji: "🔎",
        title: "Patterns & Beginning Algebra",
        analogy: "The □ is a mystery box — work backward to find what number is hiding inside.",
        problems: [
          { q: "□ + 8 = 15", a: "7", hint: ["undo + 8 with − 8", "15 − 8 = 7"] },
          { q: "4 × □ = 20", a: "5", hint: ["undo × 4 with ÷ 4", "20 ÷ 4 = 5"] },
          { q: "□ − 6 = 9", a: "15", hint: ["undo − 6 with + 6", "9 + 6 = 15"] },
          { q: "20 ÷ □ = 4", a: "5", hint: ["4 × □ = 20", "20 ÷ 4 = 5"] },
          { q: "Continue the pattern: 2, 4, 6, 8, ___, ___", a: "10, 12", hint: ["gap is always 2", "8 + 2 = 10", "10 + 2 = 12"] },
        ],
      },
      {
        emoji: "⏰",
        title: "Time",
        problems: [
          { q: "School starts at 8:00 and ends at 12:00. How long is school?", a: "4 hours", hint: ["8:00 → 12:00", "count the hours: 9,10,11,12 = 4 hours"] },
          { q: "A show starts at 3:00 and lasts 1 hour. When does it end?", a: "4:00", hint: ["3:00 + 1 hour", "= 4:00"] },
          { q: "Recess starts at 10:15 and ends at 10:30. How long is recess?", a: "15 minutes", hint: ["10:15 → 10:30", "= 15 minutes"] },
          { q: "What time is 20 minutes after 2:10?", a: "2:30", hint: ["2:10 + 20 minutes", "= 2:30"] },
          { q: "A trip leaves at 9:00 and takes 2 hours. When does it arrive?", a: "11:00", hint: ["9:00 + 2 hours", "= 11:00"] },
        ],
      },
      {
        emoji: "💵",
        title: "Money & Decimals",
        analogy: "$1.00 = 100 cents, so 50¢ is half a dollar: $0.50.",
        problems: [
          { q: "$2.50 + $1.50 = ?", a: "$4.00", hint: ["50¢ + 50¢ = $1.00", "$2 + $1 + $1.00", "= $4.00"] },
          { q: "$5.00 − $2.25 = ?", a: "$2.75", hint: ["$5.00 − $2.00 = $3.00", "$3.00 − $0.25 = $2.75"] },
          { q: "A toy costs $6. You pay $10. How much change?", a: "$4", hint: ["$10 − $6", "= $4"] },
          { q: "Two candies cost $1.50 each. What is the total?", a: "$3.00", hint: ["2 × $1.50", "= $3.00"] },
          { q: "You have $10. You buy a book for $4.50 and a pencil for $1. How much is left?", a: "$4.50", hint: ["$4.50 + $1.00 = $5.50", "$10.00 − $5.50", "= $4.50"] },
        ],
      },
      {
        emoji: "🧠",
        title: "Multi-Step Word Problems",
        analogy: "Decide which operation to use for each step — some problems need two.",
        problems: [
          {
            q: "A store has 80 toys. It sells 25 and then gets 15 new ones delivered. How many toys now?",
            a: "80 − 25 = 55\n55 + 15 = 70\nAnswer: 70 toys",
            hint: ["80 − 25 = 55", "55 + 15 = 70"],
          },
          {
            q: "4 boxes each hold 6 balls. 5 balls are lost. How many balls remain?",
            a: "4 × 6 = 24\n24 − 5 = 19\nAnswer: 19 balls",
            hint: ["4 × 6 = 24", "24 − 5 = 19"],
          },
          {
            q: "A garden has 40 flowers. 12 wilt and 8 new ones bloom. How many flowers now?",
            a: "40 − 12 = 28\n28 + 8 = 36\nAnswer: 36 flowers",
            hint: ["40 − 12 = 28", "28 + 8 = 36"],
          },
          {
            q: "3 shelves hold 9 books each. 5 books are borrowed. How many books remain?",
            a: "3 × 9 = 27\n27 − 5 = 22\nAnswer: 22 books",
            hint: ["3 × 9 = 27", "27 − 5 = 22"],
          },
          {
            q: "Emma has $20. She buys 2 toys at $5 each. How much money is left?",
            a: "2 × $5 = $10\n$20 − $10 = $10\nAnswer: $10",
            hint: ["2 × $5 = $10", "$20 − $10 = $10"],
          },
        ],
      },
    ],
  },
];
