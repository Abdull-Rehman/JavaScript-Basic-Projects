//targeting elements click button, color screen, body
let btn = document.querySelector(".btn");
let color_screen = document.querySelector(".color-name");
let section = document.querySelector(".section");

//targeting buttons rgb and hexa
let rgb_btn = document.querySelector(".rgb");
let hexa_btn = document.querySelector(".hexa");

rgb_btn.addEventListener("click", () => {
  if (!rgb_btn.classList.contains("active")) {
    rgb_btn.classList.add("active");
    hexa_btn.classList.remove("active");
  }
});

hexa_btn.addEventListener("click", () => {
  if (!hexa_btn.classList.contains("active")) {
    hexa_btn.classList.add("active");
    rgb_btn.classList.remove("active");
  }
});

let color = "";
function generateRGB() {
  // creating 3 random numbers between range 0-256
  let r = 0 + Math.floor(Math.random() * (256 - 0 + 1));
  let g = 0 + Math.floor(Math.random() * (256 - 0 + 1));
  let b = 0 + Math.floor(Math.random() * (256 - 0 + 1));
  color = `rgb(${r},${g},${b})`;
}

function generateHEXA() {
  let randomNumber = Math.floor(Math.random() * 16777215).toString(16);
  color = `#${randomNumber}`;
}

btn.addEventListener("click", () => {
  if (rgb_btn.classList.contains("active")) {
    generateRGB();
  } else {
    generateHEXA();
  }

  color_screen.innerHTML = color;
  section.style.backgroundColor = color;
});
