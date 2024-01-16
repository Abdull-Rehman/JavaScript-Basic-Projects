let increment_btn = document.querySelector(".increment-button");
let decrement_btn = document.querySelector(".decrement-button");
let reset_btn = document.querySelector(".reset-button");
let screen = document.querySelector(".count");

increment_btn.addEventListener("click", () => {
  let value = Number(screen.innerHTML);
  screen.innerHTML = eval(value + 1);
});

decrement_btn.addEventListener("click", () => {
  let value = Number(screen.innerHTML);
  screen.innerHTML = eval(value + -1);
});

reset_btn.addEventListener("click", () => {
  screen.innerHTML = "0";
});
