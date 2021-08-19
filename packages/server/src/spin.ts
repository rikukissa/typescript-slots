import { Error, inSufficientCredits } from "./error";

function calculateWin(result: number[]) {
  const nSame = result.reduce(
    (memo, value) => memo.set(value, (memo.get(value) || 0) + 1),
    new Map<number, number>()
  );

  return Array.from(nSame.entries())
    .map(([value, times]) => value * Math.max(0, times - 1))
    .reduce((memo, number) => memo + number, 0);
}

export type SpinResult =
  | Error
  | {
      type: "success";
      credits: number;
      result: number[];
      win: number;
    };

export function spin(credits: number): SpinResult {
  credits -= 1;

  if (credits < 0) {
    return inSufficientCredits(credits);
  }

  const result = [
    Math.round(Math.random() * 11),
    Math.round(Math.random() * 11),
    Math.round(Math.random() * 11),
    Math.round(Math.random() * 11),
    Math.round(Math.random() * 11),
  ];

  const win = calculateWin(result);

  credits += win;

  return {
    type: "success",
    credits,
    result,
    win,
  };
}
