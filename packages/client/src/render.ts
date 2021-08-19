import confetti from "canvas-confetti";

const images = [
  "🎉",
  "🚚",
  "☀️",
  "⭐️",
  "🍉",
  "⛱",
  "✨",
  "🌍",
  "👀",
  "🤡",
  "👻",
  "🐹",
];

export const SLOTS_PER_REEL = 12;
const REEL_RADIUS = 150;

export const spinButton = document.querySelector<HTMLButtonElement>("#spin")!;

export function spin(result: number[]) {
  const animationLength = (wheelNumber: number) => 2 + wheelNumber * 0.5;

  wheels.forEach((el, i) => {
    const seed = result[i];
    el.style.animation =
      "back-spin 1s, spin-" + seed + " " + animationLength(i) + "s";
    el.setAttribute("class", "wheel spin-" + seed);
  });

  // Wait until animations are done
  return new Promise((resolve) => {
    setTimeout(resolve, animationLength(wheels.length - 1) * 1000);
  });
}

const wheels = Array.from(
  document.querySelectorAll<HTMLDivElement>(".wheel")
).map((el) => createSlots(el));

export function createSlots<T extends Element>(wheel: T) {
  var slotAngle = 360 / SLOTS_PER_REEL;

  for (var i = 0; i < SLOTS_PER_REEL; i++) {
    var slot = document.createElement("div");

    slot.className = "slot";

    // compute and assign the transform for this slot
    var transform =
      "rotateX(" + slotAngle * i + "deg) translateZ(" + REEL_RADIUS + "px)";

    slot.style.transform = transform;

    // setup the number to show inside the slots
    // the position is randomized to

    slot.innerHTML = "<p>" + images[i % 12] + "</p>";

    // add the poster to the row
    wheel.append(slot);
  }

  return wheel;
}

const confettiCanvas = document.createElement("canvas");

document.getElementById("wheels")!.appendChild(confettiCanvas);

var myConfetti = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

export function launchConfetti() {
  return myConfetti({
    particleCount: 300,
    spread: 100,
  });
}
