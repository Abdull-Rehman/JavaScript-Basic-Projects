let hamburger = document.querySelector(".hamburger");
let container = document.querySelector(".container");

hamburger.addEventListener("click", () => {
  container.classList.toggle("sub-navbar-active");
});
