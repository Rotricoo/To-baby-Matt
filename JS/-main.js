// Main initialization file - loads components and handles shared elements

import { initDomElements } from "./dom-elements.js";
import initBackground from "./background.js";

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - initializing elements");

  // Initialize DOM element references first
  initDomElements();

  // Then initialize components
  import("./timer.js");
  import("./letter.js");

  console.log("About to initialize background");
  initBackground();
  console.log("Background initialized");
});
