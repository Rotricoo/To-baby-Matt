const openBtn = document.getElementById("openBtn");
const timer = document.getElementById("timer");

// Data alvo: 17 de julho de 2025 à meia-noite
const openDate = new Date("2025-07-17T00:00:00");

function updateTimer() {
  if (!openBtn || !timer) return;

  const now = new Date();
  const diff = openDate - now;

  if (diff <= 0) {
    openBtn.disabled = false;
    openBtn.textContent = "💌 Open with Love";
    timer.textContent = "You can open your letter!";
    return;
  } else {
    openBtn.disabled = true;
    openBtn.textContent = "Almost there!";
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  timer.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

updateTimer();
setInterval(updateTimer, 1000);
