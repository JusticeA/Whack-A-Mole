"use strict";

// Get variables

var moles = document.querySelectorAll("img");
var arr = [];
var score = document.querySelector("span");
var missed = document.querySelector(".missed");
var displayMiss = document.querySelector(".miss");
var speed = document.querySelector(".speed");
var start = document.querySelector(".start");

// Functions

function show() {
  // Randomly displays a mole.
  var x = Math.floor(Math.random() * 5);
  //console.log(x);
  arr.push(x);

  // Removes the "active" class from the previous display
  moles.forEach(function (mole) {
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
  var contain = e.target.classList;
  if (contain.contains("active")) {
    +score.textContent++;
  } else if (contain.contains("first") || contain.contains("second") || contain.contains("third") || contain.contains("fourth") || contain.contains("fifth") || contain.contains("hole-inside")) {
    miss();
  }
}

function miss() {
  +missed.textContent++;
  displayMiss.classList.add("active-miss");
  if (missed.childNodes[0].nodeValue == 5) {
    alert("Game Over");
    score.textContent = 0;
    missed.textContent = 0;
  }
}

// Add listeners
var pump1 = void 0;
start.addEventListener("click", function () {
  clearInterval(pump1);
  pump1 = setInterval(show, 1200);
});
var pump2 = void 0;
//window.addEventListener("click", show);
speed.addEventListener("change", function () {
  clearInterval(pump1);
  clearInterval(pump2);
  pump2 = setInterval(show, speed.value);
});