const hhand = document.querySelector(".hours");
const mhand = document.querySelector(".minutes");
const shand = document.querySelector(".seconds");
let deg = 6;
setInterval(() => {
  let date = new Date();
  let miliseconds = date.getMilliseconds() * deg;
  let hours = date.getHours() * 30;
  let minutes = date.getMinutes() * deg;
  let seconds = date.getSeconds() * deg + miliseconds / 1000;

  hhand.style.transform = `rotateZ(${hours + minutes / 12}deg)`;
  mhand.style.transform = `rotateZ(${minutes}deg)`;
  shand.style.transform = `rotateZ(${seconds}deg)`;
}, 1);
