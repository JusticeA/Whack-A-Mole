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
// Functions

function show() {
  // Randomly displays a mole.
  let x = Math.floor(Math.random() * 5);
  //console.log(x);
  arr.push(x);

  // Removes the "active" class from the previous display
  moles.forEach(mole => {
    mole.classList.remove("active");
  });
  // Displays a new mole
  //Prevents the math.random from making the mole appear in the same hole twice, incase the previous and random number now are the same.
  if (arr[arr.length - 2] === x) {
    moles[x].classList.remove("active");
    //console.log(x);
  } else {
    moles[x].classList.add("active");
    window.addEventListener("click", hit);
  }
}

function hit(e) {
  //console.log(e.target.classList.contains("active"));
  let contain = e.target.classList;
  if (contain.contains("active")) {
    +score.textContent++;
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

function miss() {
  +missed.textContent++;
  displayMiss.classList.add("active-miss");
  if (missed.childNodes[0].nodeValue == 5) {
    over.classList.add("over-active");
    score.textContent = 0;
    missed.textContent = 0;
  }
}

const begin = () => {
  begins.classList.add("begin-active");
}

// Add listeners
let pump1;
start.addEventListener("click", () => {
  clearInterval(pump1);
  pump1 = setInterval(show, 1200);
});
let pump2;
//window.addEventListener("click", show);
speed.addEventListener("change", () => {
  clearInterval(pump1);
  clearInterval(pump2);
  pump2 = setInterval(show, speed.value);
});

window.addEventListener("load", begin);

document.body.addEventListener("click", () => {
  over.classList.remove("over-active");
  begins.classList.remove("begin-active");
})
