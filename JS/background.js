function initBackground() {
  const sky = document.querySelector(".background-sky");
  const stars = document.querySelector(".background-stars");
  const sun = document.querySelector(".background-sun");
  const moon = document.querySelector(".background-moon");

  function updateTimeBasedBackground() {
    const now = new Date();
    // const hour = now.getHours() + now.getMinutes() / 60;
    const hour = 12;

    // Dia: 6h–18h | Noite: 18h–6h | Blend: 5h–6h e 17h–18h
    let sunOpacity = 0,
      moonOpacity = 0,
      blend = 0;

    // Sol: 6h–18h (com blend das 17h–18h)
    if (hour >= 6 && hour < 17) {
      sunOpacity = 1;
      moonOpacity = 0;
      // Progresso do sol no céu (0 em 6h, 1 em 12h, 2 em 18h)
      let sunProg = (hour - 6) / 12;
      // left: -40vw (6h) → 40vw (12h) → 40vw (18h)
      let left =
        sunProg <= 0.5
          ? -40 + sunProg * 160 // -40vw a 40vw (até meio-dia)
          : 40; // Fica no centro até 18h
      // top: 3rem (6h) → -2rem (12h)
      let top =
        sunProg <= 0.5
          ? 3 - sunProg * 10 // 3rem a -2rem
          : -2; // Fica -2rem até 18h
      sun.style.left = `${left}vw`;
      sun.style.top = `${top}rem`;
      sun.style.transform = `scale(1.1)`;
    } else if (hour >= 17 && hour < 18) {
      // Blend sol→lua
      blend = hour - 17; // 0 a 1
      sunOpacity = 1 - blend;
      moonOpacity = blend;
      sun.style.left = `40vw`;
      sun.style.top = `-2rem`;
      sun.style.transform = `scale(1.1)`;
      moon.style.left = `40vw`;
      moon.style.top = `-2rem`;
      moon.style.transform = `scale(1.1)`;
    } else if (hour >= 18 || hour < 5) {
      // Noite: lua visível
      sunOpacity = 0;
      moonOpacity = 1;
      // Progresso da lua no céu (0 em 18h, 1 em 0h, 2 em 6h)
      let moonHour = hour >= 18 ? hour : hour + 24;
      let moonProg = (moonHour - 18) / 12;
      // left: 40vw (18h) → 100vw (0h) → 100vw (6h)
      let left =
        moonProg <= 0.5
          ? 40 + moonProg * 120 // 40vw a 100vw (até meia-noite)
          : 100; // Fica na direita até 6h
      // top: -2rem (18h) → 3rem (0h)
      let top =
        moonProg <= 0.5
          ? -2 + moonProg * 10 // -2rem a 3rem
          : 3; // Fica 3rem até 6h
      moon.style.left = `${left}vw`;
      moon.style.top = `${top}rem`;
      moon.style.transform = `scale(1.1)`;
    } else if (hour >= 5 && hour < 6) {
      // Blend lua→sol
      blend = hour - 5; // 0 a 1
      sunOpacity = blend;
      moonOpacity = 1 - blend;
      sun.style.left = `-40vw`;
      sun.style.top = `3rem`;
      sun.style.transform = `scale(1.1)`;
      moon.style.left = `100vw`;
      moon.style.top = `3rem`;
      moon.style.transform = `scale(1.1)`;
    }

    // Aplica opacidade e display
    sun.style.display = sunOpacity > 0.01 ? "block" : "none";
    sun.style.opacity = sunOpacity;
    moon.style.display = moonOpacity > 0.01 ? "block" : "none";
    moon.style.opacity = moonOpacity;

    // Fundo: blend só nos horários de transição
    if ((hour >= 17 && hour < 18) || (hour >= 5 && hour < 6)) {
      sky.style.background = blendSky(blend);
      stars.style.opacity = blend;
    } else if (hour >= 6 && hour < 17) {
      sky.style.background = calculateDayTimeSkyColor(1);
      stars.style.opacity = 0;
    } else {
      sky.style.background = calculateNightTimeSkyColor(1);
      stars.style.opacity = 1;
    }

    const clouds = document.querySelectorAll(".cloud, svg");
    if ((hour >= 17 && hour < 18) || (hour >= 5 && hour < 6)) {
      clouds.forEach((cloud) => {
        cloud.style.filter = "brightness(1.2) sepia(0.3) hue-rotate(20deg)";
      });
    } else {
      clouds.forEach((cloud) => {
        cloud.style.filter = "";
      });
    }

    if (hour >= 18 || hour < 6) {
      document.body.classList.add("night");
    } else {
      document.body.classList.remove("night");
    }
  }

  function blendSky(fade) {
    // fade: 0 = dia, 1 = noite
    return `linear-gradient(
      to bottom,
      ${fade < 1 ? "hsl(210, 80%, 75%)" : "hsl(240, 60%, 5%)"},
      ${fade < 1 ? "hsl(200, 70%, 80%)" : "hsl(240, 50%, 10%)"}
    )`;
  }

  function calculateDayTimeSkyColor(progress) {
    return `linear-gradient(to bottom,
      hsl(210, 80%, 75%),
      hsl(200, 70%, 80%))`;
  }

  function calculateNightTimeSkyColor(progress) {
    return `linear-gradient(to bottom,
      hsl(240, 60%, 5%),
      hsl(240, 50%, 10%))`;
  }

  function createStars() {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      const size = 0.1 + Math.random() * 0.3;
      star.style.width = `${size}rem`;
      star.style.height = `${size}rem`;
      star.style.animation = `twinkle ${1 + Math.random() * 3}s ease-in-out infinite`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      stars.appendChild(star);
      if (Math.random() < 0.15) {
        star.classList.add("star-strong");
      }
    }
  }

  function createSVGClouds() {
    const cloudsContainer = document.querySelector(".background-clouds");
    const cloudTypes = ["cloud1", "cloud2", "cloud3"];
    const numClouds = 50;
    for (let i = 0; i < numClouds; i++) {
      const type = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
      const width = 80 + Math.random() * 320;
      const height = 40 + Math.random() * 120;
      const top = 2 + Math.random() * 48;
      const left = -30 + Math.random() * 120;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      svg.setAttribute("viewBox", "0 0 120 60");
      svg.style.position = "absolute";
      svg.style.top = `${top}%`;
      svg.style.left = `${left}vw`;
      svg.style.opacity = 0.7 + Math.random() * 0.3;
      svg.style.pointerEvents = "none";
      svg.style.filter = `blur(${Math.random() * 2 + 1}px) drop-shadow(0 8px 24px rgba(0,0,0,0.12))`;
      svg.style.animation = `float-cloud ${60 + Math.random() * 80}s linear infinite`;
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${type}`);
      svg.appendChild(use);
      cloudsContainer.appendChild(svg);
    }
  }

  sun.addEventListener("click", () => {
    sun.animate(
      [
        { transform: sun.style.transform + " scale(1.1)", filter: "brightness(1.5)" },
        { transform: sun.style.transform, filter: "brightness(1)" },
      ],
      { duration: 400 }
    );
  });

  moon.addEventListener("click", () => {
    moon.animate(
      [
        { transform: moon.style.transform + " scale(1.1)", filter: "brightness(1.5)" },
        { transform: moon.style.transform, filter: "brightness(1)" },
      ],
      { duration: 400 }
    );
  });

  createStars();
  createSVGClouds();
  updateTimeBasedBackground();
  setInterval(updateTimeBasedBackground, 5000);
}

export default initBackground;
