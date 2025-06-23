// Letter and envelope animation functionality

// Import shared DOM elements
import { openBtn, letter, flap, envelope } from "./dom-elements.js";

// Wait for elements to be ready
setTimeout(() => {
  if (!openBtn || !letter || !flap || !envelope) return;
  
  // Handle letter opening
  openBtn.addEventListener("click", () => {
    letter.classList.remove("hidden");
    flap.classList.add("open");
    letter.classList.add("open");
    document.querySelector("main").classList.add("revealed");

    const paragraph = document.querySelector(".letter-back p");
    if (paragraph) paragraph.classList.add("animate");
  });

  // Handle envelope hover effect
  envelope.addEventListener("mouseenter", () => {
    envelope.classList.add("hovered");
  });

  envelope.addEventListener("mouseleave", () => {
    envelope.classList.remove("hovered");
  });
}, 100);