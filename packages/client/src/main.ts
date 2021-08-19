import { requestSpin } from "./api";
import { spin, SLOTS_PER_REEL, spinButton, launchConfetti } from "./render";
import "./style.css";

let state = {
  wheels: [1, 2, 3, 4, 5],
  credits: 0,
};

spinButton.addEventListener("click", async () => {
  // Start spinning all wheels by changing all of their value
  spin(state.wheels.map((value) => (value + 6) % SLOTS_PER_REEL));

  // Request a spin result from the backend
  const spinResult = await requestSpin();

  if (spinResult.type !== "success") {
    return;
  }

  state.wheels = spinResult.result;

  // Spin the wheel according to the result
  await spin(state.wheels);

  if (spinResult.win > 0) {
    launchConfetti();
  }
  state.credits = spinResult.credits;
});
