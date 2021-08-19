import { SpinResult } from "@typescript-slots/server/src/spin";

export async function getCredits() {
  const res = await fetch("/api/credits");
  return res.json();
}

export async function requestSpin() {
  const res = await fetch("/api/spin");
  return res.json() as Promise<SpinResult>;
}
