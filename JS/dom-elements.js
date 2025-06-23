// This file exports DOM references for other modules

// Initialize empty references
let openBtn = null;
let letter = null;
let timer = null;
let flap = null;
let envelope = null;

// Function to initialize DOM references
function initDomElements() {
  openBtn = document.getElementById("read-button");
  letter = document.getElementById("letter");
  timer = document.getElementById("timer");
  flap = document.querySelector(".envelope-flap");
  envelope = document.querySelector(".envelope");
}

// Export both the references and the init function
export { openBtn, letter, timer, flap, envelope, initDomElements };
