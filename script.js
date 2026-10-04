

const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const dist = (dx , dy) => Math.hypot(dx , dy);
// cursor animation

const cursor = document.querySelector(".cursor");

///initial position 
let mouseX = 9999;
let mouseY = 9999;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let cx = mouseX,  //current
  cy = mouseY,
  lastX = mouseX,
  lastY = mouseY;

function animate() {
  // move the custom cursor toward the real cursor a little each frame (0.1 -> 10%)
  cx = lerp(cx, mouseX, 0.18);
  cy = lerp(cy, mouseY, 0.18);

  // strech based on  distance traveled (elapsed) from how far the mouse moved since last frame
  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  lastX = mouseX;
  lastY = mouseY;
  const clampedDist = clamp(dist(dx , dy), 0, 40);
  const stretch = 1 + clampedDist / 60;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotate(${angle}deg) scaleX(${stretch}) scaleY(${1 / (stretch * 0.4 + 0.6)}) `;

  requestAnimationFrame(animate); // we dont need throttle for this , bcz the animation is happening in the base of fps , the event is only storing variables each times it calls  . so its not costly .
}
animate();
