export type ColumnWorking = {
  grid: string[];
  steps: string[];
};

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten-thousands", "hundred-thousands"];

function spaced(arr: string[]): string {
  return arr.map((c) => c || " ").join(" ");
}

export function additionWorking(a: number, b: number): ColumnWorking {
  const as = String(a);
  const bs = String(b);
  const width = Math.max(as.length, bs.length);
  const aArr = as.padStart(width, " ").split("");
  const bArr = bs.padStart(width, " ").split("");
  const resultArr: string[] = Array(width).fill("0");
  const carryArr: string[] = Array(width).fill(" ");
  let carry = 0;
  const steps: string[] = [];

  for (let i = width - 1; i >= 0; i--) {
    const da = aArr[i] === " " ? 0 : Number(aArr[i]);
    const db = bArr[i] === " " ? 0 : Number(bArr[i]);
    const sum = da + db + carry;
    const digit = sum % 10;
    const place = PLACES[width - 1 - i] ?? "place";
    if (!(da === 0 && db === 0 && carry === 0)) {
      const carryPart = carry > 0 ? ` + ${carry}` : "";
      const tail = sum >= 10 ? ` → write ${digit}, carry ${Math.floor(sum / 10)}` : "";
      steps.push(`${place}: ${da} + ${db}${carryPart} = ${sum}${tail}`);
    }
    resultArr[i] = String(digit);
    carry = Math.floor(sum / 10);
    if (carry > 0 && i > 0) carryArr[i - 1] = String(carry);
  }

  let finalWidth = width;
  let leadCarry = "";
  if (carry > 0) {
    leadCarry = String(carry);
    finalWidth = width + 1;
    steps.push(`carry ${carry} lands in a new place → leading digit ${carry}`);
  }

  const pad = (arr: string[]) => Array(finalWidth - width).fill(" ").concat(arr);
  const carryRow = pad(carryArr);
  const resultRow = leadCarry ? [leadCarry, ...resultArr] : pad(resultArr);
  const divider = "-".repeat(finalWidth * 2 - 1);

  const grid = [
    carryRow.some((c) => c !== " ") ? "  " + spaced(carryRow) : "",
    "  " + spaced(pad(aArr)),
    "+ " + spaced(pad(bArr)),
    "  " + divider,
    "  " + spaced(resultRow),
  ].filter(Boolean);

  return { grid, steps };
}

export function subtractionWorking(a: number, b: number): ColumnWorking {
  const as = String(a);
  const bs = String(b);
  const width = Math.max(as.length, bs.length);
  const aArr = as.padStart(width, " ").split("").map((d) => (d === " " ? 0 : Number(d)));
  const bArr = bs.padStart(width, " ").split("").map((d) => (d === " " ? 0 : Number(d)));
  const resultArr: string[] = Array(width).fill("0");
  const borrowRow: string[] = Array(width).fill(" ");
  const steps: string[] = [];

  for (let i = width - 1; i >= 0; i--) {
    const place = PLACES[width - 1 - i] ?? "place";
    if (aArr[i] < bArr[i]) {
      // borrow from the next non-zero column to the left
      let j = i - 1;
      while (j >= 0 && aArr[j] === 0) {
        aArr[j] = 9;
        j--;
      }
      if (j >= 0) aArr[j] -= 1;
      aArr[i] += 10;
      borrowRow[i] = "•";
      steps.push(`${place}: borrow 1 → ${aArr[i]} − ${bArr[i]} = ${aArr[i] - bArr[i]}`);
    } else {
      steps.push(`${place}: ${aArr[i]} − ${bArr[i]} = ${aArr[i] - bArr[i]}`);
    }
    resultArr[i] = String(aArr[i] - bArr[i]);
  }

  const aStrArr = String(a).padStart(width, " ").split("");
  const bStrArr = String(b).padStart(width, " ").split("");
  const divider = "-".repeat(width * 2 - 1);
  const grid = [
    borrowRow.some((c) => c !== " ") ? "  " + spaced(borrowRow) : "",
    "  " + spaced(aStrArr),
    "− " + spaced(bStrArr),
    "  " + divider,
    "  " + spaced(resultArr),
  ].filter(Boolean);

  return { grid, steps };
}
