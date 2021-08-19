export function inSufficientCredits(credits: number) {
  return {
    type: "error" as const,
    error: "INSUFFIENT_CREDITS" as const,
    credits,
  };
}

export type Error = ReturnType<typeof inSufficientCredits>;
