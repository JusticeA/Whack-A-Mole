// Get variables

const moles = document.querySelectorAll("img");
const arr = [];
const score = document.querySelector("span");
const missed = document.querySelector(".missed");
const displayMiss = document.querySelector(".miss");
const speed = document.querySelector(".speed");
const start = document.querySelector(".start");
const over = document.querySelector(".over");
const begins = document.querySelector(".begin");
const audio = document.querySelectorAll("audio");
// Functions

function show() {
  // Randomly displays a mole.
  let x = Math.floor(Math.random() * 5);
  arr.push(x);

  // Removes the "active" class from the previous display
  moles.forEach(mole => {
    mole.classList.remove("active");
  });
  // Displays a new mole
  //Prevents the math.random from making the mole appear in the same hole twice, incase the previous and random number now are the same.
  if (arr[arr.length - 2] === x) {
    moles[x].classList.remove("active");
  } else {
    moles[x].classList.add("active");
    window.addEventListener("click", hit);
  }
}
// Handles a hit.
function hit(e) {
  let contain = e.target.classList;
  if (contain.contains("active")) {
    +score.textContent++;
    audio[2].play();
  } else if (
    contain.contains("first") ||
    contain.contains("second") ||
    contain.contains("third") ||
    contain.contains("fourth") ||
    contain.contains("fifth") ||
    contain.contains("hole-inside")
  ) {
    miss();
  }
}
// Handles a miss
function miss() {
  +missed.textContent++;
  audio[3].currentTime = 0;
  audio[3].play();
  displayMiss.classList.add("active-miss");
  if (missed.childNodes[0].nodeValue == 5) {
    over.classList.add("over-active");
    score.textContent = 0;
    missed.textContent = 0;
  }
}
// Renders "begin" lay over.
const begin = () => {
  begins.classList.add("begin-active");
};
// Removes active lay overs.
const removeActive = () => {
  over.classList.remove("over-active");
  begins.classList.remove("begin-active");
};

// Add listeners
let pump1;
start.addEventListener("click", () => {
  audio[0].play();
  clearInterval(pump1);
  pump1 = setInterval(show, 900);
});
let pump2;

speed.addEventListener("change", () => {
  clearInterval(pump1);
  clearInterval(pump2);
  pump2 = setInterval(show, speed.value);
});

window.addEventListener("load", begin);

document.body.addEventListener("click", removeActive);

setTimeout(removeActive, 3000);
