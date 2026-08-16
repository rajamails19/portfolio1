import type { QAItem, Section } from "./types";
import { programsSection } from "./programs";

const javaPrograms: QAItem[] = [
  {
    id: "java-largest-number-array",
    category: "Java",
    question: "Find the Largest Number in an Array",
    tags: ["Java", "Arrays", "Loops"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "java",
        content: `public class LargestNumber {
    public static void main(String[] args) {

        int[] numbers = {10, 45, 23, 78, 34};

        int largest = numbers[0];

        for (int number : numbers) {
            if (number > largest) {
                largest = number;
            }
        }

        System.out.println("Largest number = " + largest);
    }
}`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "Largest number = 78" },
    ],
  },
  {
    id: "java-reverse-string",
    category: "Java",
    question: "Reverse a String",
    tags: ["Java", "Strings", "Loops"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "java",
        content: `public class ReverseString {
    public static void main(String[] args) {

        String text = "Java";
        String reversed = "";

        for (int i = text.length() - 1; i >= 0; i--) {
            reversed = reversed + text.charAt(i);
        }

        System.out.println(reversed);
    }
}`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "avaJ" },
    ],
  },
  {
    id: "java-check-prime-number",
    category: "Java",
    question: "Create a Method to Check Prime Number",
    tags: ["Java", "Methods", "Prime Numbers"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "java",
        content: `public class PrimeNumber {

    public static boolean isPrime(int number) {

        if (number <= 1) {
            return false;
        }

        for (int i = 2; i < number; i++) {
            if (number % i == 0) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {

        int number = 7;

        if (isPrime(number)) {
            System.out.println(number + " is Prime");
        } else {
            System.out.println(number + " is Not Prime");
        }
    }
}`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "7 is Prime" },
    ],
  },
];

const javaScriptPrograms: QAItem[] = [
  {
    id: "javascript-largest-number-array",
    category: "JScript",
    question: "Find the Largest Number in an Array",
    tags: ["JavaScript", "Arrays", "Loops"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "javascript",
        content: `const numbers = [10, 45, 23, 78, 34];

let largest = numbers[0];

for (const number of numbers) {
  if (number > largest) {
    largest = number;
  }
}

console.log("Largest number = " + largest);`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "Largest number = 78" },
    ],
  },
  {
    id: "javascript-reverse-string",
    category: "JScript",
    question: "Reverse a String",
    tags: ["JavaScript", "Strings", "Loops"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "javascript",
        content: `const text = "Java";
let reversed = "";

for (let i = text.length - 1; i >= 0; i--) {
  reversed = reversed + text[i];
}

console.log(reversed);`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "avaJ" },
    ],
  },
  {
    id: "javascript-check-prime-number",
    category: "JScript",
    question: "Create a Function to Check Prime Number",
    tags: ["JavaScript", "Functions", "Prime Numbers"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "javascript",
        content: `function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const number = 7;

if (isPrime(number)) {
  console.log(number + " is Prime");
} else {
  console.log(number + " is Not Prime");
}`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "7 is Prime" },
    ],
  },
];

const pythonPrograms: QAItem[] = [
  {
    id: "python-largest-number-array",
    category: "Python",
    question: "Find the Largest Number in an Array",
    tags: ["Python", "Lists", "Loops"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "python",
        content: `numbers = [10, 45, 23, 78, 34]

largest = numbers[0]

for number in numbers:
    if number > largest:
        largest = number

print("Largest number =", largest)`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "Largest number = 78" },
    ],
  },
  {
    id: "python-reverse-string",
    category: "Python",
    question: "Reverse a String",
    tags: ["Python", "Strings", "Loops"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "python",
        content: `text = "Java"
reversed_text = ""

for i in range(len(text) - 1, -1, -1):
    reversed_text = reversed_text + text[i]

print(reversed_text)`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "avaJ" },
    ],
  },
  {
    id: "python-check-prime-number",
    category: "Python",
    question: "Create a Function to Check Prime Number",
    tags: ["Python", "Functions", "Prime Numbers"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "python",
        content: `def is_prime(number):
    if number <= 1:
        return False

    for i in range(2, number):
        if number % i == 0:
            return False

    return True


number = 7

if is_prime(number):
    print(number, "is Prime")
else:
    print(number, "is Not Prime")`,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: "7 is Prime" },
    ],
  },
];

function createDotNetProgram(program: {
  id: string;
  question: string;
  tags: string[];
  code: string;
  output: string;
  concepts: string[];
  visualization?: string;
}): QAItem {
  const answer: QAItem["answer"] = [
    { type: "code", language: "csharp", content: program.code },
    { type: "heading", content: "Output" },
    { type: "code", language: "text", content: program.output },
  ];

  if (program.visualization) {
    answer.push(
      { type: "heading", content: "Visualize it" },
      { type: "code", language: "text", content: program.visualization },
    );
  }

  answer.push({ type: "heading", content: "Concepts" }, { type: "list", items: program.concepts });

  return {
    id: `dotnet-${program.id}`,
    category: ".NET",
    question: program.question,
    tags: [".NET", "C#", ...program.tags],
    difficulty: "Easy",
    answer,
  };
}

const dotNetPrograms: QAItem[] = [
  createDotNetProgram({
    id: "largest-number-array",
    question: "Find the Largest Number in an Array",
    tags: ["Arrays", "Loops"],
    output: "Largest number = 78",
    concepts: ["Arrays", "foreach loop", "if condition", "Tracking a value"],
    code: `using System;

public class LargestNumber
{
    public static void Main()
    {
        int[] numbers = { 10, 45, 23, 78, 34 };

        int largest = numbers[0];

        foreach (int number in numbers)
        {
            if (number > largest)
            {
                largest = number;
            }
        }

        Console.WriteLine("Largest number = " + largest);
    }
}`,
  }),
  createDotNetProgram({
    id: "reverse-string",
    question: "Reverse a String",
    tags: ["Strings", "Loops"],
    output: "avaJ",
    concepts: ["String", "Character indexing", "for loop", "String concatenation"],
    code: `using System;

public class ReverseString
{
    public static void Main()
    {
        string text = "Java";
        string reversed = "";

        for (int i = text.Length - 1; i >= 0; i--)
        {
            reversed = reversed + text[i];
        }

        Console.WriteLine(reversed);
    }
}`,
  }),
  createDotNetProgram({
    id: "check-prime-number",
    question: "Create a Method to Check Prime Number",
    tags: ["Methods", "Prime Numbers"],
    output: "7 is Prime",
    concepts: ["Methods", "bool return type", "Modulo operator", "Loops"],
    code: `using System;

public class PrimeNumber
{
    public static bool IsPrime(int number)
    {
        if (number <= 1)
        {
            return false;
        }

        for (int i = 2; i < number; i++)
        {
            if (number % i == 0)
            {
                return false;
            }
        }

        return true;
    }

    public static void Main()
    {
        int number = 7;

        if (IsPrime(number))
        {
            Console.WriteLine(number + " is Prime");
        }
        else
        {
            Console.WriteLine(number + " is Not Prime");
        }
    }
}`,
  }),
  createDotNetProgram({
    id: "count-vowels-string",
    question: "Count Vowels in a String",
    tags: ["Strings", "Loops"],
    output: "Number of vowels = 4",
    concepts: ["String", "Character indexing", "for loop", "if condition", "logical OR ||"],
    code: `using System;

public class CountVowels
{
    public static void Main()
    {
        string text = "Hello Java";
        int count = 0;

        for (int i = 0; i < text.Length; i++)
        {
            char ch = text[i];

            if (ch == 'a' || ch == 'e' || ch == 'i' ||
                ch == 'o' || ch == 'u')
            {
                count++;
            }
        }

        Console.WriteLine("Number of vowels = " + count);
    }
}`,
  }),
  createDotNetProgram({
    id: "sum-numbers-array",
    question: "Find Sum of Numbers in an Array",
    tags: ["Arrays", "Loops"],
    output: "Total = 150",
    concepts: ["Arrays", "foreach loop", "Accumulator variable", "Addition"],
    code: `using System;

public class ArraySum
{
    public static void Main()
    {
        int[] numbers = { 10, 20, 30, 40, 50 };

        int sum = 0;

        foreach (int number in numbers)
        {
            sum = sum + number;
        }

        Console.WriteLine("Total = " + sum);
    }
}`,
  }),
  createDotNetProgram({
    id: "second-largest-number-array",
    question: "Find the Second Largest Number in an Array",
    tags: ["Arrays", "Conditions"],
    output: "Second Largest = 45",
    concepts: ["Arrays", "Loops", "if / else-if", "Tracking multiple values"],
    code: `using System;

public class SecondLargest
{
    public static void Main()
    {
        int[] numbers = { 10, 45, 23, 78, 34 };

        int largest = int.MinValue;
        int secondLargest = int.MinValue;

        foreach (int number in numbers)
        {
            if (number > largest)
            {
                secondLargest = largest;
                largest = number;
            }
            else if (number > secondLargest && number != largest)
            {
                secondLargest = number;
            }
        }

        Console.WriteLine("Second Largest = " + secondLargest);
    }
}`,
  }),
  createDotNetProgram({
    id: "count-character-frequency",
    question: "Count Frequency of a Character",
    tags: ["Strings", "Counters"],
    output: "a appears 3 times",
    concepts: ["String traversal", "char", "Loops", "Conditions", "Counter"],
    visualization: `b  a  n  a  n  a
   ✓     ✓     ✓

Count = 3`,
    code: `using System;

public class CharacterCount
{
    public static void Main()
    {
        string text = "banana";
        char target = 'a';

        int count = 0;

        for (int i = 0; i < text.Length; i++)
        {
            if (text[i] == target)
            {
                count++;
            }
        }

        Console.WriteLine(target + " appears " + count + " times");
    }
}`,
  }),
  createDotNetProgram({
    id: "find-duplicate-numbers-array",
    question: "Find Duplicate Numbers in an Array",
    tags: ["Arrays", "Nested Loops"],
    output: "Duplicate = 10\nDuplicate = 20",
    concepts: ["Arrays", "Nested loops", "Comparison", "Duplicate detection"],
    code: `using System;

public class FindDuplicates
{
    public static void Main()
    {
        int[] numbers = { 10, 20, 30, 20, 40, 10 };

        for (int i = 0; i < numbers.Length; i++)
        {
            for (int j = i + 1; j < numbers.Length; j++)
            {
                if (numbers[i] == numbers[j])
                {
                    Console.WriteLine("Duplicate = " + numbers[i]);
                }
            }
        }
    }
}`,
  }),
  createDotNetProgram({
    id: "sort-array",
    question: "Sort an Array",
    tags: ["Arrays", "Sorting"],
    output: "[10, 20, 30, 40, 50]",
    concepts: ["Arrays", "Array.Sort()", "string.Join()", "Method calls"],
    code: `using System;

public class SortNumbers
{
    public static void Main()
    {
        int[] numbers = { 40, 10, 50, 20, 30 };

        Array.Sort(numbers);

        Console.WriteLine("[" + string.Join(", ", numbers) + "]");
    }
}`,
  }),
  createDotNetProgram({
    id: "count-word-frequency",
    question: "Count Words Using Dictionary",
    tags: ["Dictionary", "Frequency"],
    output: "{java=3, python=1, react=1}",
    concepts: ["Dictionary", "Key-value pairs", "Loops", "ContainsKey()", "Frequency counting"],
    code: `using System;
using System.Collections.Generic;
using System.Linq;

public class WordFrequency
{
    public static void Main()
    {
        string[] words = { "java", "python", "java", "react", "java" };

        Dictionary<string, int> count = new Dictionary<string, int>();

        foreach (string word in words)
        {
            if (count.ContainsKey(word))
            {
                count[word]++;
            }
            else
            {
                count[word] = 1;
            }
        }

        string result = string.Join(
            ", ",
            count.Select(pair => pair.Key + "=" + pair.Value)
        );

        Console.WriteLine("{" + result + "}");
    }
}`,
  }),
];

type ProgramLanguage = "Java" | "JScript" | "Python";

interface AdditionalProgramDefinition {
  id: string;
  question: Partial<Record<ProgramLanguage, string>> & { Java: string };
  visualization?: string;
  implementations: Record<
    ProgramLanguage,
    {
      codeLanguage: string;
      code: string;
      output: string;
      concepts: string[];
      tags: string[];
    }
  >;
}

const additionalProgramDefinitions: AdditionalProgramDefinition[] = [
  {
    id: "count-vowels-string",
    question: { Java: "Count Vowels in a String" },
    implementations: {
      Java: {
        codeLanguage: "java",
        tags: ["Java", "Strings", "Loops"],
        concepts: ["String", "charAt()", "for loop", "if condition", "logical OR ||"],
        output: "Number of vowels = 4",
        code: `public class CountVowels {
    public static void main(String[] args) {

        String text = "Hello Java";
        int count = 0;

        for (int i = 0; i < text.length(); i++) {

            char ch = text.charAt(i);

            if (ch == 'a' || ch == 'e' || ch == 'i' ||
                ch == 'o' || ch == 'u') {
                count++;
            }
        }

        System.out.println("Number of vowels = " + count);
    }
}`,
      },
      JScript: {
        codeLanguage: "javascript",
        tags: ["JavaScript", "Strings", "Loops"],
        concepts: ["String", "Character access", "for loop", "if condition", "logical OR ||"],
        output: "Number of vowels = 4",
        code: `const text = "Hello Java";
let count = 0;

for (let i = 0; i < text.length; i++) {
  const ch = text[i];

  if (
    ch === "a" ||
    ch === "e" ||
    ch === "i" ||
    ch === "o" ||
    ch === "u"
  ) {
    count++;
  }
}

console.log("Number of vowels = " + count);`,
      },
      Python: {
        codeLanguage: "python",
        tags: ["Python", "Strings", "Loops"],
        concepts: [
          "String",
          "Character traversal",
          "for loop",
          "if condition",
          "membership operator",
        ],
        output: "Number of vowels = 4",
        code: `text = "Hello Java"
count = 0

for ch in text:
    if ch in "aeiou":
        count += 1

print("Number of vowels =", count)`,
      },
    },
  },
  {
    id: "sum-numbers-array",
    question: { Java: "Find Sum of Numbers in an Array" },
    implementations: {
      Java: {
        codeLanguage: "java",
        tags: ["Java", "Arrays", "Loops"],
        concepts: ["Arrays", "for-each loop", "Accumulator variable", "Addition"],
        output: "Total = 150",
        code: `public class ArraySum {
    public static void main(String[] args) {

        int[] numbers = {10, 20, 30, 40, 50};

        int sum = 0;

        for (int number : numbers) {
            sum = sum + number;
        }

        System.out.println("Total = " + sum);
    }
}`,
      },
      JScript: {
        codeLanguage: "javascript",
        tags: ["JavaScript", "Arrays", "Loops"],
        concepts: ["Arrays", "for-of loop", "Accumulator variable", "Addition"],
        output: "Total = 150",
        code: `const numbers = [10, 20, 30, 40, 50];

let sum = 0;

for (const number of numbers) {
  sum = sum + number;
}

console.log("Total = " + sum);`,
      },
      Python: {
        codeLanguage: "python",
        tags: ["Python", "Lists", "Loops"],
        concepts: ["Lists", "for loop", "Accumulator variable", "Addition"],
        output: "Total = 150",
        code: `numbers = [10, 20, 30, 40, 50]

total = 0

for number in numbers:
    total = total + number

print("Total =", total)`,
      },
    },
  },
  {
    id: "second-largest-number-array",
    question: { Java: "Find the Second Largest Number in an Array" },
    implementations: {
      Java: {
        codeLanguage: "java",
        tags: ["Java", "Arrays", "Conditions"],
        concepts: ["Arrays", "Loops", "if / else-if", "Tracking multiple values"],
        output: "Second Largest = 45",
        code: `public class SecondLargest {
    public static void main(String[] args) {

        int[] numbers = {10, 45, 23, 78, 34};

        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;

        for (int number : numbers) {
            if (number > largest) {
                secondLargest = largest;
                largest = number;
            } else if (number > secondLargest && number != largest) {
                secondLargest = number;
            }
        }

        System.out.println("Second Largest = " + secondLargest);
    }
}`,
      },
      JScript: {
        codeLanguage: "javascript",
        tags: ["JavaScript", "Arrays", "Conditions"],
        concepts: ["Arrays", "Loops", "if / else-if", "Tracking multiple values"],
        output: "Second Largest = 45",
        code: `const numbers = [10, 45, 23, 78, 34];

let largest = -Infinity;
let secondLargest = -Infinity;

for (const number of numbers) {
  if (number > largest) {
    secondLargest = largest;
    largest = number;
  } else if (number > secondLargest && number !== largest) {
    secondLargest = number;
  }
}

console.log("Second Largest = " + secondLargest);`,
      },
      Python: {
        codeLanguage: "python",
        tags: ["Python", "Lists", "Conditions"],
        concepts: ["Lists", "Loops", "if / elif", "Tracking multiple values"],
        output: "Second Largest = 45",
        code: `numbers = [10, 45, 23, 78, 34]

largest = float("-inf")
second_largest = float("-inf")

for number in numbers:
    if number > largest:
        second_largest = largest
        largest = number
    elif number > second_largest and number != largest:
        second_largest = number

print("Second Largest =", second_largest)`,
      },
    },
  },
  {
    id: "count-character-frequency",
    question: { Java: "Count Frequency of a Character" },
    visualization: `b  a  n  a  n  a
   ✓     ✓     ✓

Count = 3`,
    implementations: {
      Java: {
        codeLanguage: "java",
        tags: ["Java", "Strings", "Counters"],
        concepts: ["String traversal", "char", "Loops", "Conditions", "Counter"],
        output: "a appears 3 times",
        code: `public class CharacterCount {
    public static void main(String[] args) {

        String text = "banana";
        char target = 'a';

        int count = 0;

        for (int i = 0; i < text.length(); i++) {

            if (text.charAt(i) == target) {
                count++;
            }
        }

        System.out.println(target + " appears " + count + " times");
    }
}`,
      },
      JScript: {
        codeLanguage: "javascript",
        tags: ["JavaScript", "Strings", "Counters"],
        concepts: ["String traversal", "Characters", "Loops", "Conditions", "Counter"],
        output: "a appears 3 times",
        code: `const text = "banana";
const target = "a";

let count = 0;

for (let i = 0; i < text.length; i++) {
  if (text[i] === target) {
    count++;
  }
}

console.log(target + " appears " + count + " times");`,
      },
      Python: {
        codeLanguage: "python",
        tags: ["Python", "Strings", "Counters"],
        concepts: ["String traversal", "Characters", "Loops", "Conditions", "Counter"],
        output: "a appears 3 times",
        code: `text = "banana"
target = "a"

count = 0

for ch in text:
    if ch == target:
        count += 1

print(target, "appears", count, "times")`,
      },
    },
  },
  {
    id: "find-duplicate-numbers-array",
    question: { Java: "Find Duplicate Numbers in an Array" },
    implementations: {
      Java: {
        codeLanguage: "java",
        tags: ["Java", "Arrays", "Nested Loops"],
        concepts: ["Arrays", "Nested loops", "Comparison", "Duplicate detection"],
        output: "Duplicate = 10\nDuplicate = 20",
        code: `public class FindDuplicates {
    public static void main(String[] args) {

        int[] numbers = {10, 20, 30, 20, 40, 10};

        for (int i = 0; i < numbers.length; i++) {

            for (int j = i + 1; j < numbers.length; j++) {

                if (numbers[i] == numbers[j]) {
                    System.out.println("Duplicate = " + numbers[i]);
                }
            }
        }
    }
}`,
      },
      JScript: {
        codeLanguage: "javascript",
        tags: ["JavaScript", "Arrays", "Nested Loops"],
        concepts: ["Arrays", "Nested loops", "Comparison", "Duplicate detection"],
        output: "Duplicate = 10\nDuplicate = 20",
        code: `const numbers = [10, 20, 30, 20, 40, 10];

for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] === numbers[j]) {
      console.log("Duplicate = " + numbers[i]);
    }
  }
}`,
      },
      Python: {
        codeLanguage: "python",
        tags: ["Python", "Lists", "Nested Loops"],
        concepts: ["Lists", "Nested loops", "Comparison", "Duplicate detection"],
        output: "Duplicate = 10\nDuplicate = 20",
        code: `numbers = [10, 20, 30, 20, 40, 10]

for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        if numbers[i] == numbers[j]:
            print("Duplicate =", numbers[i])`,
      },
    },
  },
  {
    id: "sort-array",
    question: { Java: "Sort an Array" },
    implementations: {
      Java: {
        codeLanguage: "java",
        tags: ["Java", "Arrays", "Sorting"],
        concepts: ["Arrays", "Arrays.sort()", "Java utility classes", "Method calls"],
        output: "[10, 20, 30, 40, 50]",
        code: `import java.util.Arrays;

public class SortNumbers {
    public static void main(String[] args) {

        int[] numbers = {40, 10, 50, 20, 30};

        Arrays.sort(numbers);

        System.out.println(Arrays.toString(numbers));
    }
}`,
      },
      JScript: {
        codeLanguage: "javascript",
        tags: ["JavaScript", "Arrays", "Sorting"],
        concepts: ["Arrays", "sort()", "Compare functions", "Method calls"],
        output: "[10, 20, 30, 40, 50]",
        code: `const numbers = [40, 10, 50, 20, 30];

numbers.sort((a, b) => a - b);

console.log(numbers);`,
      },
      Python: {
        codeLanguage: "python",
        tags: ["Python", "Lists", "Sorting"],
        concepts: ["Lists", "sort()", "Numeric sorting", "Method calls"],
        output: "[10, 20, 30, 40, 50]",
        code: `numbers = [40, 10, 50, 20, 30]

numbers.sort()

print(numbers)`,
      },
    },
  },
  {
    id: "count-word-frequency",
    question: {
      Java: "Count Words Using HashMap",
      JScript: "Count Words Using Map",
      Python: "Count Words Using Dictionary",
    },
    implementations: {
      Java: {
        codeLanguage: "java",
        tags: ["Java", "HashMap", "Frequency"],
        concepts: ["HashMap", "Key-value pairs", "Loops", "getOrDefault()", "Frequency counting"],
        output: "{python=1, java=3, react=1}",
        code: `import java.util.HashMap;

public class WordFrequency {
    public static void main(String[] args) {

        String[] words = {"java", "python", "java", "react", "java"};

        HashMap<String, Integer> count = new HashMap<>();

        for (String word : words) {
            count.put(word, count.getOrDefault(word, 0) + 1);
        }

        System.out.println(count);
    }
}`,
      },
      JScript: {
        codeLanguage: "javascript",
        tags: ["JavaScript", "Map", "Frequency"],
        concepts: ["Map", "Key-value pairs", "Loops", "get()", "Frequency counting"],
        output: "{ java: 3, python: 1, react: 1 }",
        code: `const words = ["java", "python", "java", "react", "java"];

const count = new Map();

for (const word of words) {
  count.set(word, (count.get(word) || 0) + 1);
}

console.log(Object.fromEntries(count));`,
      },
      Python: {
        codeLanguage: "python",
        tags: ["Python", "Dictionary", "Frequency"],
        concepts: ["Dictionary", "Key-value pairs", "Loops", "get()", "Frequency counting"],
        output: "{'java': 3, 'python': 1, 'react': 1}",
        code: `words = ["java", "python", "java", "react", "java"]

count = {}

for word in words:
    count[word] = count.get(word, 0) + 1

print(count)`,
      },
    },
  },
];

function createAdditionalPrograms(language: ProgramLanguage): QAItem[] {
  return additionalProgramDefinitions.map((program) => {
    const implementation = program.implementations[language];
    const answer: QAItem["answer"] = [
      {
        type: "code",
        language: implementation.codeLanguage,
        content: implementation.code,
      },
      { type: "heading", content: "Output" },
      { type: "code", language: "text", content: implementation.output },
    ];

    if (program.visualization) {
      answer.push(
        { type: "heading", content: "Visualize it" },
        { type: "code", language: "text", content: program.visualization },
      );
    }

    answer.push(
      { type: "heading", content: "Concepts" },
      { type: "list", items: implementation.concepts },
    );

    return {
      id: `${language.toLowerCase()}-${program.id}`,
      category: language,
      question: program.question[language] ?? program.question.Java,
      tags: implementation.tags,
      difficulty: "Easy",
      answer,
    };
  });
}

const playwrightPrograms: QAItem[] = [
  {
    id: "playwright-verify-page-title",
    category: "QAutoPrograms",
    subCategory: "Playwright",
    question: "Launch Browser and Verify Page Title",
    tags: ["Playwright", "Navigation", "Assertions"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "typescript",
        content: `import { test, expect } from '@playwright/test';

test('verify page title', async ({ page }) => {

  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example Domain/);

});`,
      },
      { type: "heading", content: "Concepts" },
      {
        type: "list",
        items: ["test()", "page.goto()", "expect()", "toHaveTitle()"],
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Simple analogy:** Open a shop, look at the signboard, and confirm you entered the correct shop.",
      },
    ],
  },
  {
    id: "playwright-login-application",
    category: "QAutoPrograms",
    subCategory: "Playwright",
    question: "Login to an Application",
    tags: ["Playwright", "Locators", "Login"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "typescript",
        content: `import { test, expect } from '@playwright/test';

test('user login', async ({ page }) => {

  await page.goto('https://example.com/login');

  await page.getByLabel('Username').fill('testuser');

  await page.getByLabel('Password').fill('password123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);

});`,
      },
      { type: "heading", content: "Concepts" },
      {
        type: "list",
        items: ["Locators", "getByLabel()", "getByRole()", "fill()", "click()", "URL validation"],
      },
      { type: "heading", content: "Simple analogy" },
      {
        type: "flow",
        direction: "vertical",
        nodes: [
          { label: "Open Login Page", tone: "gold" },
          { label: "Enter Username", tone: "ember" },
          { label: "Enter Password", tone: "ember" },
          { label: "Click Login", tone: "sky" },
          { label: "Verify Dashboard", tone: "mint" },
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "**Interviewer expectation:** Prefer reliable locators such as `getByRole()` and `getByLabel()` instead of fragile XPath everywhere.",
      },
    ],
  },
  {
    id: "playwright-verify-product-list",
    category: "QAutoPrograms",
    subCategory: "Playwright",
    question: "Verify Items in a Product List",
    tags: ["Playwright", "Locators", "Assertions"],
    difficulty: "Easy",
    answer: [
      {
        type: "code",
        language: "typescript",
        content: `import { test, expect } from '@playwright/test';

test('verify product list', async ({ page }) => {

  await page.goto('https://example.com/products');

  const products = page.locator('.product');

  await expect(products).toHaveCount(5);

  await expect(products.first()).toContainText('Laptop');

});`,
      },
      { type: "heading", content: "Concepts" },
      {
        type: "list",
        items: ["locator()", "toHaveCount()", "first()", "toContainText()", "Assertions"],
      },
      { type: "heading", content: "Visualize it" },
      {
        type: "code",
        language: "text",
        content: `Products Page

1. Laptop
2. Phone
3. Tablet
4. Monitor
5. Keyboard

        ↓

Count = 5 ✅
First item contains "Laptop" ✅`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Simple analogy:** Imagine checking a grocery shelf: first count how many items are there, then inspect a specific item to make sure the expected product is present.",
      },
    ],
  },
];

export const programsChaatSection: Section = {
  ...programsSection,
  items: [
    ...javaPrograms,
    ...createAdditionalPrograms("Java"),
    ...javaScriptPrograms,
    ...createAdditionalPrograms("JScript"),
    ...dotNetPrograms,
    ...pythonPrograms,
    ...createAdditionalPrograms("Python"),
    ...playwrightPrograms,
  ],
};
